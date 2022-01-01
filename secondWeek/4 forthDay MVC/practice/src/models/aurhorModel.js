
const mongoose = require("mongoose");



const authorSchema = new mongoose.Schema({

    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age:{ type: Number, required:false},
    

},{
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model("author", authorSchema);

