

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({


    body: { type: String, required: true},
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "post", required: true}
 
}, {

    versionKey: false,
    timestamps: true,

})


module.exports = mongoose.model("comment", commentSchema);
