const mongoose = require('mongoose')
const validator = require('validator')

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
})

const User = mongoose.model('User', userSchema)

module.exports = User;


