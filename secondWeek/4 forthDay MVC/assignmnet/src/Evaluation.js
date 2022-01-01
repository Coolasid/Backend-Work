
const express = require("express");



//---------importing MODELS -----------



const Evaluation = require("./models/evalModel");


//=============================================================================

const userCont = require("./controllers/userCont");

const evalCont = require("./controllers/evalCont");

const studentCont = require("./controllers/studentCont");



const app = express();

module.exports = app;

app.use(express.json());

app.use("/users", userCont);

app.use("/evaluations", evalCont);

app.use("/students", studentCont);



//-------------------fetch all students who gave a particular evaluation-----

const D1 = require("./controllers/givenSpecificEval/evalGD1");


app.use("/evalGiven/D1", D1);


const D2 = require("./controllers/givenSpecificEval/evalGD2");


app.use("/evalGiven/D2", D2);



const D3 = require("./controllers/givenSpecificEval/evalGD3");


app.use("/evalGiven/D3", D3);



const D4 = require("./controllers/givenSpecificEval/evalGD4");


app.use("/evalGiven/D4", D4);



const C1 = require("./controllers/givenSpecificEval/evalGC1");


app.use("/evalGiven/C1", C1);


const C2 = require("./controllers/givenSpecificEval/evalGC2");


app.use("/evalGiven/C2", C2);



//---------------------fetch the student with his personal details who scored the highest mark in the evaluation--------


const HD1 = require("./controllers/highestScore/evalHD1");

app.use("/eval/HighestScore/D1", HD1)



const HD2 = require("./controllers/highestScore/evalHD2");

app.use("/eval/HighestScore/D2", HD2)



const HD3 = require("./controllers/highestScore/evalHD3");

app.use("/eval/HighestScore/D3", HD3)



const HD4 = require("./controllers/highestScore/evalHD4");

app.use("/eval/HighestScore/D4", HD4)



const HC1 = require("./controllers/highestScore/evalHC1");

app.use("/eval/HighestScore/C1", HC1)



const HC2 = require("./controllers/highestScore/evalHC2");

app.use("/eval/HighestScore/C2", HC2)









