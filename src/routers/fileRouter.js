const express = require('express')
const router = express.Router();
const Image = require("../models/image")
const  MulterUpload  = require('../Controllers/FileController')

router.route("/upload").post(MulterUpload.single('profileImage'), async (req, res) => {

  const savedImage = await Image.create(req.file)
  console.log(req.file);

  res.status(200).json({
    status: "success",
    data: savedImage
  })
});

module.exports = router;