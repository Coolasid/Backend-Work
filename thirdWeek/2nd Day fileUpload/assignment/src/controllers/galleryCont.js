const express = require("express");

const router = express.Router();

const Gallery = require("../models/galleryModel");

const {uploadPict} = require("../middelware/upload");



router.get("", async (req, res) => {
  try {
    const gallery = await Gallery.find().lean().exec();

    return res.status(200).send(gallery);
  } catch (e) {
    return res.status(500).send(e);
  }
});




router.post("", uploadPict, async(req,res)=>{

    try {
        const filePaths = req.files.map((file)=> file.path);

        const gallery = await Gallery.create({
          userId: req.body.userId,
          pictures: filePaths

        });

        return res.status(200).send(gallery);
    } catch (e) {
        return res.status(500).send(e.message)
    }

});





module.exports = router;
