
const express = require("express");

const router = express.Router();

const Author = require("../models/aurhorModel");

router.post("", async(req, res)=>{


    try {

        const author = await Author.create(req.body);

        return res.status(201).send(author);
        
    } catch (e) {
        
        return res.status(500).send(e.message);
    }

})

router.get("", async(req, res)=>{

    try {
        const authors = await Author.find().lean().exec();

        return res.status(200).send(authors);
        
    } catch (e) {
        return res.status(500).send(e.message);
    }

})


module.exports = router;