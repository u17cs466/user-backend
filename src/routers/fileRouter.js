const express = require('express')
const router = express.Router();
const Image = require("../models/image")
const MulterUpload = require('../controllers/fileController')

router.route("/upload")
  .post(MulterUpload.single('profileimage'), async (req, res) => {
    try {
      const { filename, path } = req.file
      const savedImage = await Image.create(req.file)

      res.status(200).json({
        status: "success good",
        data: savedImage
      });
    }
    catch {
      res.status(400).json({
        status: "fail",
        message: "Error Occurred while uploading the image"
      });

    }
  });


module.exports = router;