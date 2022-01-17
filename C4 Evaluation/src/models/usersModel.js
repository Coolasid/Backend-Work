const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
  {
    name:{type:String, required:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePhotoURL:[{type:String, required:false}],
    roles:{type:String, required:true}
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
