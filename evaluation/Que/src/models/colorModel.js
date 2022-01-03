const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema({

    colorName:{ type: String, required: true}

},{

    timestamps:true,
    versionKey:false
})

module.exports = mongoose.model("color", colorSchema);