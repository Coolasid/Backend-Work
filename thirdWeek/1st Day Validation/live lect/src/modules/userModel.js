const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    name: {type:String, required:true}

}, {


    versionKey:false,
    timestamps:true

})


module.exports = mongoose.model("user", userSchema);