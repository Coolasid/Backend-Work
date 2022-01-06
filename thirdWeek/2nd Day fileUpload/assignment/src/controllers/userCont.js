const express = require("express");

const router = express.Router();

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


// router.delete("/:id", )




module.exports = router;

