

const express = require("express");

const router = express.Router();

const Comment = require("../models/commentModel");

router.post("", async(req, res)=>{


    try {
        
        const comment = await Comment.create(req.body)

        return res.status(200).send(comment);
    } catch (e) {
        return res.status(500).send(e.message)
    }
    
})

router.get("", async(req, res)=>{


    try {
        
        const comments = await Comment.find().lean().exec();

        return res.status(500).send(comments)
    } catch (e) {
        return res.status(500).send(e.message);
    }

})

module.exports = router;
