const multer = require('multer');
const path = require('path');

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Please upload only images.", false);
    }
};

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const mainFolder = __dirname;
        const imagePath = path.dirname(mainFolder);
        cb(null, imagePath + "/public/images");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-cms-file-${file.originalname}`);
    },
});

var uploadFile = multer({storage: storage, fileFilter: imageFilter});
module.exports = uploadFile;
