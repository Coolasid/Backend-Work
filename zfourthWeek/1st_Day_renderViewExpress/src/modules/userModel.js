const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName : { type: String, required: true },
    lastName : { type: String, required: false },
    email: { type: String, required: true },
    age: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema); // user => users, users => User
