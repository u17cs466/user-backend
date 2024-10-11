const Post = require('../models/postmodel');

const getAllPosts = async (req, res) => {
    let data = await Post.find().populate('profileimage');
    res.status(200).json({
        status: 'success',
        data: data,
    });
};
const createPost = async (req, res) => {
    try {
        const { name, description, type } = req.body
        let data = await Post.create({ name, description, type });
        res.status(201).json({
            status: 'success',
            data: data,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            data: err.message,
        });
    }
};
const getOnePost = async (req, res) => {
    try {
        let data = await Post.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: data,
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            data: err.message,
        });
    }
};
const updatePost = async (req, res) => {
    try {

        let data = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(203).json({
            status: 'success',
            data: data
        })
    } catch (err) {
        res.status(500).json({
            status: 'success',
            data: err.message
        })
    }
}
const deletePost = async (req, res) => {
    try {
        let data = await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: 'success',
            data: data
        })
    } catch (err) {
        res.status(500).json({
            status: 'success',
            data: err.message
        })
    }
}



module.exports = { getAllPosts, createPost, getOnePost, updatePost, deletePost };
