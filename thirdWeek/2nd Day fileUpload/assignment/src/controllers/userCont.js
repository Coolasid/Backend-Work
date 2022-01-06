const express = require("express");

const router = express.Router();

var fs = require("fs");

const User = require("../models/userModel");

const {uploadDp} = require("../middelware/upload");

router.get("", async (req, res)=>{

    try {
        const users = await User.find().lean().exec();

        return res.status(200).send(users)
    } catch (e) {
        return res.status(500).send(e.message)
    }

})

router.post("", uploadDp, async (req, res) => {
  try {
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      profilePic: req.file.path
    });

    return res.status(200).send(user)

  } catch (e) {
    return res.status(500).send(e);
  }
});


router.delete("/:id", async(req, res)=>{

  try {

    const {profilePic} = await User.findById(req.params.id).lean().exec();

    // console.log(profilePic)
      fs.unlinkSync(profilePic);

      const user = await User.findByIdAndDelete(req.params.id).lean().exec();

      res.status(200).send(user);

    
  } catch (e) {
    return res.status(500).send(e.message)
  }

} )

router.patch("/:id", uploadDp, async(req, res)=>{

  try {

    const { profilePic } = await User.findById(req.params.id).lean().exec();

    // console.log(profilePic)
    fs.unlinkSync(profilePic);

    const user = await User.findByIdAndUpdate(req.params.id, {

      firstName: req.body.firstName,
      lastName: req.body.lastName,
      profilePic: req.file.path

    }, {new:1}).lean().exec();

    res.status(200).send(user);

  } catch (e) {
    return res.status(500).send(e.message);
  }




})




module.exports = router;

