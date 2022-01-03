const express = require("express");

const router = express.Router();

const Color = require("../models/colorModel");


router.post("", async(req, res)=>{

    try {
        
        const color = await Color.create(req.body);

        return res.status(201).send(color);

    } catch (e) {
        return res.status(500).send(e.message)
    }

})

router.get("", async(req, res)=>{

try {
        
        const colors = await Color.find().lean().exec();

        return res.status(200).send(colors);

    } catch (e) {
        return res.status(500).send(e.message)
    }


})


module.exports = router;