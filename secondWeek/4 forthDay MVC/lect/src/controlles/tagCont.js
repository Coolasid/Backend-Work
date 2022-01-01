

const express = require("express");

const router = express.Router();

const Tag = require("../models/tagModel");


router.post("", async(req, res) => {


    try{

        const tags = await Tag.create(req.body)
        
        return res.status(201).send(tags);

    }catch{

        return res.status(500).send(err.message);
    }

})

router.get("", async(req, res)=>{

    try{

        const tags = await Tag.find().lean().exec();

        return res.status(200).send(tags);

        
    } catch (error) {
        
        return res.status(500).send(error.message);
    }

})

router.get("/:id", async(req, res) => {


    try {

        const tags = await Tag.findById(req.params.id).lean().exec();

        return res.status(200).send(tags);
        
    } catch (error) {
        
        return res.status(500).send(error.message);
    }
})


router.patch("/:id", async(req, res) => {

    try {

        const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean().exec();

        return res.status(200).send(tag);
        
    } catch (error) {
        
        return res.status(500).send(error.message);
    }

})


router.delete("/:id", async(req, res)=>{

    try {

        const tag = await Tag.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(200).send(tag);
        
    } catch (error) {
        
        return res.status(500).send(error.message);
    }

})


module.exports = router;
