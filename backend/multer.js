const multer = require("multer");
const path = require("path");
//const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith("image/")) {
        cb(null, true);
    }else{
        cb(new Error("Only images allowed"), false);
    }
};

const upload = multer({storage, fileFilter});

module.exports = upload;