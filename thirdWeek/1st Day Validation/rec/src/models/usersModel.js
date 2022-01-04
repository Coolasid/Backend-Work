const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    id: {type: Number, require:true},
    firstName:{type: String, require:true},
    lastName: {type: String, require:true},
    email:{type: String, require:true},
    gender:{type: String, require:true},
    ipAddress: {type: String, require:true},
    age: {type: Number, require:true}

}, {

    timestamps: true,
    versionKey:false
    
})

module.exports = mongoose.model("user", userSchema);