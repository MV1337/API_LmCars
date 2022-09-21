const multer = require("multer");
const path = require("path");

//destino das imagens
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "cars";
    cb(null, `public/images/${folder}/`);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        Math.floor(Math.random() * 1000) +
        path.extname(file.originalname)
    );
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error("Envie apenas jpg ou png"));
    }
    cb(undefined, true);
  },
});

module.exports = { imageUpload };
