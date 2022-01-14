const express = require("express");


const app = express();

module.exports = app;

app.use(express.json());

const postCont = require("./controllers/postCont");

app.use("/posts", postCont);
