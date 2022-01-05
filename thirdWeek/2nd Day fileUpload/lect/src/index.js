const express = require("express");

const app = express();

app.use(express.json());


module.exports = app;


const productCont = require("./controllers/productCont");

app.use("/products", productCont);