
let myname = require("./sid1.js");

// console.log(myname.myname);

function one(){

    console.log(`my first name is ${myname.myname}`);

    let a = 5;
    let b = 10;
    console.log(a*b);

}

function two(){
    console.log(`my last name is ${myname.mylastN}`);

}

module.exports = {one, two};