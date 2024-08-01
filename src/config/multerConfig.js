// src/config/multerConfig.js
const multer = require("multer");
const path = require("path");

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads")); // specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // append timestamp to the original file name
  },
});

// Initialize upload variable
const upload = multer({ storage: storage });

module.exports = upload;
