
const express = require("express");

const router = express.Router();

const Book = require("../models/bookModel");



router.get("/:id", async(req, res)=>{

    try {

            const books = await Book.find({sectionId: { $eq: req.params.id}}).lean().exec();

            return res.status(200).send(books);
        
        
    } catch (e) {
        return res.status(500).send(e.message);
    }


})



module.exports = router;
