


const express = require("express");

const router = express.Router();

const Book = require("../models/bookModel");


router.get("", async(req, res)=>{


    try {
        
        const checkOutBooks = await Book.find({checked: { $eq:true}}).lean().populate({path:"authorIds", select:{firstName:1, lastName:1, _id:0}}).populate({path:"sectionId", select:{sectionName:1, _id:0}}).exec()


        return res.status(200).send(checkOutBooks)
    } catch (e) {
        return res.status(500).send(e.message);
    }

})


module.exports = router;