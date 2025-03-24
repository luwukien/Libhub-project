const multer = require("multer");

// Cấu hình Multer để lưu file vào bộ nhớ (buffer)
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only images allowed"), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
