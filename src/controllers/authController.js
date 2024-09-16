const User = require('../models/usermodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv')

dotenv.config({ path: `${__dirname}/config.env` });


const secretKey = 'demokey123';
const otps = {}
const generateToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {

        return null;
    }
};

const signUp = async (req, res) => {
    try {
        const { name, userName, email, password, confirmPassword, zipCode, gender, age, hobby, phone, ProfileImage } = req.body
        const newUser = await User.create({ name, userName, email, password, confirmPassword, zipCode, gender, age, hobby, phone, ProfileImage })

        res.status(201).json({
            status: "success",
            data: newUser,
        })

    } catch (err) {
        res.status(500).json({
            status: 'fail',
            data: err.message
        })
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            const token = generateToken({ id: user._id, name: user.name, email: user.email });
            res.status(200).json({
                status: 'success',
                token,
                data: user,
            });
        } else {
            res.status(403).json({
                status: 'fail',
                data: "Invalid Password"
            })
        }
    } catch (err) {

        res.status(500).json({
            status: 'fail',
            data: err
        })
    }
};
const generateOtp = async (req, res) => {
    try {
        const { email } = req.body
        const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
        otps[req.body.email] = {
            otp: otp,
            timestamp: Date.now()
        };
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'srikanth.damacharla99@gmail.com',
                pass: process.env.MAIL_PASS
            }
        });
        const mailOptions = {
            from: 'srikanth.damacharla99@gmail.com',
            to: req.body.email,
            subject: 'OTP for Sign Up',
            text: `Please don't share OTP to any one /n
                 Your OTP for sign up is:-${otp}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'OTP sent successfully.' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const storedOTP = otps[email];

        if (!storedOTP) {
            return res.status(400).send({ error: 'OTP not found for this email.' });
        }
        const currentTime = Date.now();
        const otpTimestamp = storedOTP.timestamp;
        const otpExpiration = 30 * 60 * 1000;

        if (currentTime - otpTimestamp > otpExpiration) {
            delete otps[email];
            return res.status(400).send({ error: 'OTP has expired.' });
        }

        if (otp === storedOTP.otp) {
            delete otps[email];
            res.status(200).send({ message: 'OTP verified successfully.' });
        } else {
            res.status(400).send({ error: 'Invalid OTP.' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { signUp, login, verifyOtp, generateOtp }