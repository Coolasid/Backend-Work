const express = require("express");

const app = express();

module.exports = app;

app.use(express.json());


const { login, register} = require("./controllers/authCont");


app.post("/register", register)

app.post("/login", login)
