const express = require("express")

const app = express();


// app.use(logger);
app.use(express.json());

app.get("/", (req, res) =>{

    res.send("home page get request");

    // console.log("home page get request");

})

app.post("/", (req, res) =>{

    // console.log("req.body", req.body);
    res.status(201).json(req.body);
    console.log("home page post request");

})

// function logger(req, res, next){

//     console.log("logging before");
//     next();
//     console.log("logging after");

// }

app.listen((1234), ()=>{

    console.log("listening on port 1234");
    

})




//get  => retriev a list of something or a single item
//post => save something on the server or the db
//put  => update and item, put replaces the item
//patch => appends to it 
//delete => when you want to delete an item 

//middlewre to parse requsest body

