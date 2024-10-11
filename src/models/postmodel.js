const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'name is required']
    },
    description: {
        type: String,
        required: [true, 'Description must be required']
    },
    type: {
        type: String,
        required: [true, 'type is required']
    }

},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }

    })


const Post = mongoose.model('Post', userSchema)

module.exports = Post;


