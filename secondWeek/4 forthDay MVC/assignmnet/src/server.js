
const connect = require("./configs/db");

const app = require("./Evaluation");


app.listen(2345, async()=>{


    try {
        
        await connect();

        console.log("Listening on port 2345");

    } catch (e) {
        console.log(e.message);
    }


})