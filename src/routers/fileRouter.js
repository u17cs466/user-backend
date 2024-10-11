const express = require('express')
const router = express.Router();
const Image = require("../models/image")
const MulterUpload = require('../controllers/fileController')

router.route("/upload")
  .post(MulterUpload.single('profileimage'), async (req, res) => {
    console.log(req.file);
    try {
      const { filename, path } = req.file
      const savedImage = await Image.create({
        filename: filename,
        path: path,
      })

      res.status(200).json({
        status: "success good",
        data: savedImage
      });
    }
    catch (error) {
      res.status(400).json({
        status: "fail",
        message: "Error Occurred while uploading the image",
        error: error.message
      });

    }
  });


module.exports = router;