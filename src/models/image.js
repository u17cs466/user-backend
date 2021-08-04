const mongoose = require('mongoose')

const Image = mongoose.model('image', {
    name: String,
    path: String,
    filename: String
})

module.exports = Image