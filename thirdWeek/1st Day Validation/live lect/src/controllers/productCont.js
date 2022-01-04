const express = require("express");

const router = express.Router();

const Product = require("../modules/productModel");

const { formatErrors } = require("../utils/validations");

const { body, validationResult } = require("express-validator");

const User = require("../modules/userModel");

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
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name is required & must be atleast 3 characters"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .custom((value) => {
      if (value <= 0) throw new Error("Price must be greater than zreo");

      return true;
    }),

  body("userId")
    .notEmpty()
    .withMessage("User Id is required")
    .custom( async (value) => {

        try {
            const user = await User.findById(value).lean().exec();

            if(!user) return Promise.reject("User dose not exist");

            return true; 

        } catch (e) {
            console.log(e.message)
        }

    }),

  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        //if all the validation is passed then the error array is empty , But if somethings fails the array is not empty
        // console.log("-1")
        return res.status(400).json({ errors: formatErrors(errors.array()) });
      }

      const product = await Product.create(req.body);

      return res.status(201).send({ product });
    } catch (e) {
      return res.status(500).send(e);
    }
  }
);



router.patch(
  "/:id",
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name is required & must be atleast 3 characters"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .custom((value) => {
      if (value <= 0) throw new Error("Price must be greater than zreo");

      return true;
    }),

  body("userId")
    .notEmpty()
    .withMessage("User Id is required")
    .custom(async (value, {req}) => {
      try {
        const user = await User.findById(value).lean().exec();

        if (!user) return Promise.reject("User dose not exist");

        const product = await Product.findById(req.params.id).lean().exec();

        if(!product) return Promise.reject("Product dose not exist");

        if( product.userId !== user._id) return Promise.reject("This user is not allowed to update the product")

        return true;
      } catch (e) {
        console.log(e.message);
      }
    }),

  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        //if all the validation is passed then the error array is empty , But if somethings fails the array is not empty
        // console.log("-1")
        return res.status(400).json({ errors: formatErrors(errors.array()) });
      }

      const product = await Product.findByIdAndUpdate(req.params.id,req.body, {new:1});

      return res.status(201).send({ product });
    } catch (e) {
      return res.status(500).send(e);
    }
  }
);

module.exports = router;
