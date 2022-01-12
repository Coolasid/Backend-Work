
const express = require("express");

const app = express();

app.use(express.json());



//for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));


app.set("view engine", "ejs");

app.use(express.static("public"));


const userCont = require("./controllers/userCont");

app.use("/users", userCont); 

module.exports = app;