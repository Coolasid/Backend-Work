

const express = require("express");

const router = express.Router();

const Post = require("../models/postModel");

router.post("", async(req,res)=>{


    try {
        
        const post = await Post.create(req.body);

        return res.status(200).send(post);

    } catch (error) {
        
        res.status(500).send(error.message);
    }

})


router.get("", async(req, res)=>{


    try {

        const posts = await Post.find().populate({ path:"userId", select: { firstName:1}}).populate({path:"tagIds", select:{ name:1}}). lean().exec();

        return res.status(200).send(posts);
        
    } catch (error) {
        return res.status(500).send(error.message);
    }

})


router.get("/:id", async(req, res) => {


    try {

        const post = await Post.findById(req.params.id).populate("userId").populate("tagIds").lean().exec();

        return res.status(200).send(post);

    } catch (err) {
        return res.status(500).send(err.message);
    }

})


module.exports = router;