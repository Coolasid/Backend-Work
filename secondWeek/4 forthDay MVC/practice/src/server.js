
const app = require("./library");

const connect = require("./config/db");


app.listen(2345, async()=>{


    try {

        await connect();

        console.log("listening on port 2345");
        
    } catch (error) {
        console.log(error.message);
    }

})