const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images');
    },
    filename: (req, file, callback) => {

        callback(null, Date.now() + path.extname(file.originalname));
    }
});

MulterUpload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 } // 5MB file size limit
})
module.exports = MulterUpload