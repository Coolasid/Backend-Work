const express = require("express");

const User = require("../model/userModel");


const router = express.Router();

router.post("", async(req, res)=>{


    try {
        
        const user = await User.create(req.body)


        return res.status(201).send(user); 
    } catch (e) {
        return res.status(500).send(e.message)
    }



})

router.get("", async(req, res)=>{

    try {
        
        const users = await User.find().lean().exec();

        return res.status(200).send(users);

    } catch (e) {
        return res.status(500).send(e.message);
    }

})

module.exports = router;