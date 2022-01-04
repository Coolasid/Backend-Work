const express = require("express");

const router = express.Router();

const Product = require("../modules/productModel");

const { formatErrors } = require("../utils/validations"); 

const { body, validationResult } = require("express-validator");

router.get("", async (req, res) => {
  try {
    const products = await Product.find().lean().exec();

    return res.status(200).send(products);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post(
  "",
  body("name").isLength({min:3}).withMessage("Name is required & must be atleast 3 characters"),
  body(),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        //if all the validation is passed then the error array is empty , But if somethings fails the array is not empty
        // console.log("-1")
        return res.status(400).json({ errors: formatErrors(errors.array()) });
      }

      const product = await Product.create(req.body);

      return res.status(201).send(product);
    } catch (e) {
      return res.status(500).send(e);
    }
  }
);

module.exports = router;
