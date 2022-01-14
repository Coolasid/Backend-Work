const express = require("express");


const app = express();

module.exports = app;

app.use(express.json());

const productCont = require("./controllers/productCont");

app.use("/products", productCont);
