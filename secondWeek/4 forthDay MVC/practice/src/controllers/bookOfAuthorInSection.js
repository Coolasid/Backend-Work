

const express = require("express");


const router = express.Router();

const Book = require("../models/bookModel");



router.get("/:id1/:id2", async(req, res)=>{

// console.log(req.params.id);
    try {
        
        const books = await Book.find({ $and: [{ sectionId: { $eq: req.params.id1}}, { authorIds: { $eq: req.params.id2}} ]}).lean().exec();


        return res.status(200).send(books);


    } catch (e) {
        return res.status(500).send(e.message);
    }

})

module.exports = router;