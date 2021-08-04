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

MulterUpload = multer({ storage: storage })
module.exports = MulterUpload