const express = require("express");





//--------------importing Controlles-----------


const userCont = require("./controlles/userCont")

const tagCont = require("./controlles/tagCont");

const postCont = require("./controlles/postCont");

const commnetCont = require("./controlles/commentCont");


const app = express();

app.use(express.json());


app.use("/users", userCont);

app.use("/tags", tagCont);

app.use("/posts", postCont);

app.use("/comments", commnetCont);



module.exports = app;