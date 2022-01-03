
const express = require("express");

const router = express.Router();

const Product = require("../../models/productModel");




router.get("", async(req, res)=>{

    try {
        
        const products = await Product.find({price: {$gt:500}},{colorAvaliable:0}).populate({path:"colorIds",select:{colorName:1, _id:0}}).lean().exec();

        return res.status(200).send(products);

    } catch (e) {
        return res.status(500).send(e.message)
    }

})




module.exports = router;
