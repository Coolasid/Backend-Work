const mongoose = require("mongoose");

const postSechma = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  likes: { type: Number, required: true, default:0 },
},{

    versionKey:false,
    timestamps:true

});

module.exports = mongoose.model("post", postSechma);