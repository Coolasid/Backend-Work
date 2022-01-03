
const express = require("express");

const router = express.Router();

const Product = require("../../models/productModel");




router.get("", async(req, res)=>{

    try {
        
        const products = await  Product.find().lean().exec();

        totalProducts = 0;

        products.forEach((el)=>{

         let prod =   +el.colors;
         console.log(prod);

            totalProducts += prod;
        })

        
        return res.status(200).send({totalProducts})

    } catch (e) {
        return res.status(500).send(e.message)
    }

})




module.exports = router;
