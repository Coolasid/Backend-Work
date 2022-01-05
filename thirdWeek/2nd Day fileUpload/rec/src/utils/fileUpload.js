
const path = require("path");

const multer = require("multer");

const storage = multer.diskStorage({

    destination: (req, file, callback) =>{

        callback(null, path.join(__dirname, "../upload"))

    },
    filename: (req, file, callback)=>{

        callback(null, new Date().toISOString() + file.originalname)
    }

})

const fileFilter = (req, file, callback)=>{

    if( file.mimetype === "image/jpeg" || file.mimetype === "image/png"){

        callback(null, true)

    }else{
        callback(null, false);
    }

}


module.exports = multer({
    storage: storage,
    limits: {
      fieldSize:  1024 * 1024 * 5
    },
    fileFilter: fileFilter,

})