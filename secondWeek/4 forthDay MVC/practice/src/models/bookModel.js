
const mongoose = require("mongoose")



const booksSchema = new mongoose.Schema({

    title: { type: String, required: true},
    content: { type: String, required: true},
    yearOfPublished: {type: Number, required: false, default:2021},
    authorIds:[{type: mongoose.Schema.Types.ObjectId, ref:"author", required: true}],
    sectionId:{ type: mongoose.Schema.Types.ObjectId, ref:"section", required: true},
    checked:{ type: Boolean, required:true, default:false}
    

},{
    versionKey: false,
    timestamps:true
})

module.exports = mongoose.model("book", booksSchema);

