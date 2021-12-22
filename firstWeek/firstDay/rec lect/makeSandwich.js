// function makeS(){
//     console.log("making sandwich")
// }

// module.exports= makeS;



// if we want to export one or more things=>

const makeOpenFS = "open face sandwich";

function makeS(){
    console.log(`make ${makeOpenFS}`);
}

module.exports = {
    makeS:makeS,
    makeOFS:makeOpenFS
}
