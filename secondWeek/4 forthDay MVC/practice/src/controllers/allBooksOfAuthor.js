

const express = require("express");

const router = express.Router();

const Book = require("../models/bookModel");



router.get("/:id", async(req, res)=>{

    try {
        
        const allBooksOfAnAuthor = await Book.find({authorIds: { $eq: req.params.id}}).populate({path:"authorIds", select:{firstName:1, lastName:1} }).populate({path:"sectionId", select:{sectionName:1}}).lean().exec();

        return res.status(200).send(allBooksOfAnAuthor);

    } catch (e) {
        return res.status(500).send(e.message);
    }

})

module.exports = router;
