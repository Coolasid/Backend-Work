const path = require("path")

const express = require("express");
const  sendMail  = require("../utils/sendEmail");

const router = express.Router();


const Product = require("../model/productModel");

const User = require("../model/userModel");


router.post("", async(req,res)=>{

    // console.log(path.join(__dirname, )

    try {
        
        const product = await Product.create(req.body);

        const user = await User.findById(product.userId).lean().exec();

        sendMail( {
            from: "admin@masai.com",
            to: user.email,
            subject: "New Product updated",
            text: "Product is updated",
            html: "<h1>Product is created</p>"
            
        });


        return res.status(201).send(product);

    } catch (e) {
        return res.status(500).send(e.message);
    }


})

router.get("", async(req, res)=>{


    try {


        const page = +req.query.page || 1;
        const size = +req.query.size || 5;

        


        //when page is 1 we need to send products from 1 to 5

        //when page is 2 we need to send products from 6 to 10

        const skip = (page -1) * size;
        
        
        const products = await Product.find().skip(skip).limit(size).lean().exec();

        const totalPages = Math.ceil((await Product.find().count())/size);

        return res.status(200).send({products, totalPages});



    } catch (e) {
        return res.status(500).send(e.message);
    }

})


module.exports = router;