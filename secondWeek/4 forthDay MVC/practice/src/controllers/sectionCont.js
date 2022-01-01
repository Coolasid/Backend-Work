
const express = require("express");

const router = express.Router();

const Section = require("../models/sectionModel");


router.post("", async(req, res)=>{

    try {

        const section = await Section.create(req.body)

        return res.status(201).send(section);
        
    } catch (error) {
        return res.status(500).send(error.message);
    }


})

router.get("", async(req,res)=>{


    try {

        const sections = await Section.find().lean().exec();

        return res.status(200).send(sections);
        
    } catch (e) {
        return res.status(500).send(e.message);
    }

})

module.exports = router;
