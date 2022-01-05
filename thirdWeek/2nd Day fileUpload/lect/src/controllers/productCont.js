const express = require("express");

const Product = require("../models/productModel");

const router = express.Router();

const { uploadSingle, uploadMultiple } = require("../middelware/upload");

router.get("", async (req, res) => {
  try {
    const product = await Product.find().lean().exec();

    return res.status(200).send(product);
  } catch (e) {
    return res.status(500).send(e);
  }
});



router.post("/single", uploadSingle , async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      imgUrl: req.file.path
    });

    return res.status(200).send(product);
  } catch (e) {
    return res.status(500).send(e);
  }
});


router.post("/multiple", uploadMultiple, async (req, res) => {
  try {
    const filePaths = req.files.map((file) => file.path);
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      imgUrl: filePaths,
    });

    return res.status(200).send(product);
  } catch (e) {
    return res.status(500).send(e);
  }
});



module.exports = router;