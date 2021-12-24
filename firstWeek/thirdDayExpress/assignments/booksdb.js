const express = require("express");

const app = express();

const bookDB = require("./MOCK_DATA.json");

// console.log(bookDB);


 

app.use(logger);

var arr = [];

bookDB.forEach(({ Author, BookName, Pages }) => {

    // console.log(Author);

    // authorLogger(Author)
    arr.push(Author);
})


app.get("/Books", (req, res)=>{

    console.log("your data is appended");

    return res.send(bookDB);

})

app.get("/author", authorLogger(arr.join(",")),(req, res)=>{


    console.log("All Authors Names");

})

app.listen(5000,()=>{

    console.log("listening on Port 5000");

})


function logger(req, res, next){

    console.log("first");
    next();
    console.log("second");

}

function authorLogger(authorsN){


    return function (req, res, next){

        next();
        
        res.send("All Authors Name =>"+authorsN);

    }
}

