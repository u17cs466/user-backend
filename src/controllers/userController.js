const User = require('../models/user');

const getAllUser = async (req, res) => {
  let data = await User.find().populate('ProfileImage');
  res.status(200).json({
    status: 'success',
    data: data,
  });
};
const createUser = async (req, res) => {
  try {
    const { name, userName, password, confirmPassword, zipCode, ProfileImage } = req.body
    let data = await User.create({ name, userName, password, confirmPassword, ProfileImage, zipCode });
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
const getOneUser = async (req, res) => {
  try {
    let data = await User.findById(req.params.id);
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



module.exports = { getAllUser, createUser, getOneUser };
