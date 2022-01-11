
const express = require("express");

const app = express();

app.use(express.json());

module.exports = app;


app.set("view engine", "ejs");


const userCont = require("./controllers/userCont");

app.use("/users", userCont); 

