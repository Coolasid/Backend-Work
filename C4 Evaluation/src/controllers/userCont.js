const express = require("express");

const User = require("../models/usersModel");

const router = express.Router();

const { uploadSingle} = require("../middlewars/upload");

router.get("", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.status(200).send(users);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post("", uploadSingle, async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      profilePhotoURL: req.file.path,
      roles:req.body.roles
    });

    return res.status(200).send(user);
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
