const mongoose = require("mongoose");


const prodSchema = new mongoose.Schema({

    name: { type: String, required: true},
    price: { type: Number, required: true},
    colors:{ type: Number, required: true},
    colorAvaliable: [{ type: String, required: false}],
    colorIds: [{type: mongoose.Schema.Types.ObjectId, ref:"color", required:true}],
    usedBy: { type: String, required: true}


}, {

    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model("product", prodSchema);