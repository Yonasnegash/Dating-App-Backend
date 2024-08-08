const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "..", "uploads");

    // Check if the directory exists
    if (!fs.existsSync(uploadPath)) {
      // Create the directory if it does not exist
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath); // specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // append timestamp to the original file name
  },
});

// Initialize upload variable
const upload = multer({ storage: storage });

module.exports = upload;
