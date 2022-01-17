const mongoose = require("mongoose");

module.exports = ()=>{

    mongoose.connect(
      "mongodb+srv://Coolasid:Siddesh9575@cluster0.y7dnh.mongodb.net/test"
    );

}