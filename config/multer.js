const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio", // your folder in cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

module.exports = upload;