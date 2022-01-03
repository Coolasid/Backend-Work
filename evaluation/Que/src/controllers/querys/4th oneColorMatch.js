
const express = require("express");

const router = express.Router();

const Product = require("../../models/productModel");




router.get("/:id", async(req, res)=>{

    try {
        
        const products = await  Product.find().lean().exec();

        totalProducts = 0;

        const arr = [];

        products.forEach((el)=>{

         let colorIdArr =   el.colorIds;
        //  console.log(req.params.id);

        for(var i = 0; i < colorIdArr.length; i++){

            if( colorIdArr[i] === `new ObjectId("${req.params.id}")`){
                
                arr.push(el);
            }
            // console.log(colorIdArr[i]);
            // console.log(`new ObjectId("${req.params.id}")`)

        }
        })

        // console.log(arr);
        
        return res.status(200).send({arr})

    } catch (e) {
        return res.status(500).send(e.message)
    }

})




module.exports = router;
