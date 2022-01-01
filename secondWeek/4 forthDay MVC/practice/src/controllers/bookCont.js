
const express = require("express");

const router = express.Router();

const Book = require("../models/bookModel");

router.post("", async(req, res)=>{

    try {

        const book = await Book.create(req.body);

        return res.status(200).send(book);
        
    } catch (e) {
        return res.status(500).res(e.message);
    }


})


router.get("", async(req, res)=>{


    try {

        const books = await Book.find().populate({path:"authorIds", select:{firstName:1, lastName:1}}).populate({path:"sectionId", select:{sectionName:1}}).lean().exec();

        return res.status(200).send(books);
        
    } catch (e) {
        return res.status(500).send(e.message);
    }

})

router.delete("/:id", async(req, res)=>{

    try {

        const book = await Book.findByIdAndDelete(req.params.id).lean().exec();

        return res.send(200).send(book);
        
    } catch (e) {
        return res.status(500).send(e.message);
    }


})

router.patch("/:id", async(req, res)=>{


    try {
        
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean().exec();

        return res.status(200).send(book);

    } catch (e) {
        return res.status(500).send(e.message);
    }
})


module.exports = router;