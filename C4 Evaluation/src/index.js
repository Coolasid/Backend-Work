const express = require("express");

const app = express();

app.use(express.json());

module.exports = app;

const userCont = require("./controllers/userCont")

const Student = require("./models/studentsModel")


app.use("/users", userCont);

const { login, register } = require("./controllers/studentAuth");

app.post("/register", register);

app.post("/login", login);

app.get("/students", async(req, res)=>{

    try {
        const students = await Student.find().lean().exec();

        return res.status(200).send(students);
        
    } catch (e) {
        return res.status(500).send(e.message)
    }

})



const evalCont = require("./controllers/evaluationCont");

app.use("/evaluations", evalCont);

const subCont = require("./controllers/submissionCont");

app.use("/submissions", subCont);


const deltaCont = require("./controllers/delta")

app.use("/delta", deltaCont);



const charli = require("./controllers/charli");

app.use("/charli", charli);



const bravo = require("./controllers/bravo");

app.use("/bravo", bravo);



const alpha = require("./controllers/alpha");

app.use("/alpha", alpha);


const rep = require("./controllers/repeate");

app.use("/rep", rep);