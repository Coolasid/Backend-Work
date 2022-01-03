const express = require("express");

const router = express.Router();

const Product = require("../models/productModel");



router.post("", async(req, res)=>{

    try {
        
        const product = await Product.create(req.body);

        return res.status(201).send(product);

    } catch (e) {
        return res.status(500).send(e.message)
    }

})



router.get("", async(req, res)=>{

    try {
        
        const products = await Product.find().lean().exec();

        return res.status(200).send(products);

    } catch (e) {
        return res.status(500).send(e.message)
    }

})


router.patch("/:id", async(req, res)=>{

    try {
        
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new:1}).lean().exec();

        return res.status(200).send(product);

    } catch (e) {
        return res.status(500).send(e.message)
    }

})


router.delete("/:id", async(req, res)=>{

    try {
        
        const product = await Product.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(200).send(product);

    } catch (e) {
        return res.status(500).send(e.message)
    }

})











module.exports = router;