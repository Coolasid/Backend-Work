


const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    title: { type: String, required: true},
    content: { type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" ,required: true},

    tagIds: [ { type: mongoose.Schema.Types.ObjectId, ref: "tag", required: true} ]

}, {

    versionKey: false,
    timestamps: true

})

module.exports = mongoose.model("post", postSchema);
