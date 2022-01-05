const express = require("express");

const router = express.Router();

const Product = require("../models/productModel");

const upload = require("../utils/fileUpload");

router.post("/single", upload.single("productImages"), async (req, res) => {
  const product = await Product.create({
    name: req.body.name,
    price: req.body.price,
    imageUrl: req.file.path,
  });

  res.status(201).json({ data: product });
});

router.post("/multiple", upload.array("productImages"), async (req, res) => {
  const files = req.files.map((file) => file.path);
  const products = await Product.create({
    name: req.body.name,
    price: req.body.price,
    imageUrl: files,
  });

  res.status(201).json({ data: products });
});

module.exports = router;
