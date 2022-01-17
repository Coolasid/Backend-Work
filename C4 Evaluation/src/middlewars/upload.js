const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },

  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniquePrefix + "-" + file.originalname);
  },
});


const fileFilter = (req, file, cb) => {
  

  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" 
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, 
  },
});

const uploadSingle = (req, res, next) => {
  const uploadItem = upload.single("profilePhotoURL");

  uploadItem(req, res, function (err) {
    if (err instanceof multer.MulterError) {

      return res
        .status(400)
        .send({ message: err.message, errorType: "multer error" });
    } else if (err) {
      return res
        .status(400)
        .send({ message: err.message, errorType: "normal error" });
    }


    next();
  });
};



const uploadFile = (req, res, next) => {
  const uploadItem = upload.single("submissionLink");

  uploadItem(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .send({ message: err.message, errorType: "multer error" });
    } else if (err) {
      return res
        .status(400)
        .send({ message: err.message, errorType: "normal error" });
    }

    next();
  });
};


module.exports = { uploadSingle, uploadFile };
