const express = require("express");

const app = express();

app.use(loggers);

app.get("/",(req, res)=>{

    return res.send({name:"sidPatil"});

})

app.get("/users", oneMoreLogger("sid"),(req, res) =>{

    return res.send("All users")


}) 



function loggers(req, res, next){

    console.log("one");
    next();
    console.log("two")
    
}

function oneMoreLogger(data){

    return function oneML(req, res, next){

        console.log("one more");

        console.log(data);
        next();

        console.log("two more");

    }

}


app.listen(2345,()=>{

    console.log("listening on Port 2345");

})