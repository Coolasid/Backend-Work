

const EventEmitter = require("events");   //we will be importing class of EventEmitter form events.


const eventEmitter = new EventEmitter(); //we will create obj of that class.


const sendVMailFunc = require("./sendVerificationEmail");

const sendWMailFunc = require("./sendWelcomeMail");

const sendAMailFunc = require("./sendAdminMail");




module.exports = function(){

    const user = {firstName: "Siddesh"};

    //1.
    eventEmitter.on("userRegistered", sendVMailFunc); // event has three listeners.So, their name has match exactly with above name. 

    //2.
    eventEmitter.on("userRegistered", sendWMailFunc);

    //3.
    eventEmitter.on("userRegistered", sendAMailFunc);


    eventEmitter.emit("userRegistered", user) // I am emitting an event called userRegistered.

    // console.log("the user has registered");

}