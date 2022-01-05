const express = require("express");

const router = express.Router();

const User = require("../models/usersModel");

const { body, validationResult } = require("express-validator");

router.post(
  "",
  body("id").isLength({ min: 1 }),
  body("firstName").isLength({ min: 1 }),
  body("lastName").isLength({ min: 1 }),
  body("email").isEmail(),
  body("gender").isLength({ min: 1 }),
  body("ipAddress").isLength({ min: 1 }),
  body("age").isLength({ min: 1 }),
  async (req, res) => {
      
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ data: errors.array() });
    }

    const user = await User.create(req.body);

    return res.status(201).send({ data: user });
  }
);

module.exports = router;
