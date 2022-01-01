

const express = require("express");

const router = express.Router();

const Book = require("../models/bookModel");


router.get("", async(req, res)=>{


    try {
        
        const presentBooks = await Book.find({checked: { $eq: false}}).lean().exec();

        return res.status(200).send(presentBooks);
    } catch (e) {
        return res.status(500).send(e.message);
    }


})


module.exports = router;
