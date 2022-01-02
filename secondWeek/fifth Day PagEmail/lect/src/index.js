const express = require("express");


const productCont = require("./controllers/prodCont");

const userCont = require("./controllers/userCont");


const app = express();

app.use(express.json());

module.exports = app;

app.use("/products", productCont);

app.use("/users", userCont);