const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'name is required']
    },
    userName: {
        type: String,
        unique: true,
        required: [true, 'username must be required also it must be unique']
    },

    email: {
        type: String,
        unique: true,
        required: [true, 'email must be required also it must be unique']

    },
    age: {
        type: Number,
        min: [18, 'Age should be at least 18 years'],
        required: [true, "age field can't be empty"]
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        default: "Other"
    },
    hobby: {
        type: [String]   //an array of string
    },

    password: {
        type: String,
        required: [true, 'password must be required'],
        max: 10
    },
    confirmPassword: {
        type: String,
        required: true,
        max: 10,
        validate: {
            validator: function (confirmPassword) {
                return confirmPassword === this.password;
            },
            message: "password must be same"

        }
    },
    zipCode: {
        type: Number,
        required: true
    },
    ProfileImage: {
        type: mongoose.Schema.ObjectId,
        ref: 'image'
    }

},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }

    })
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = undefined;
    next();
});

const User = mongoose.model('User', userSchema)

module.exports = User;


