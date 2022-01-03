
const express = require("express");

const router = express.Router();

const Product = require("../../models/productModel");




router.get("", async(req, res)=>{

    try {
        
        const products = await  Product.find().lean().exec();

        let white = 0;
        let blue = 0;
        let black = 0;
        let green = 0;
        let yellow = 0;
        let pink = 0;
        let red = 0;
       
        

        products.forEach((el)=>{

         let colorArr =   el.colorAvaliable;

        //  console.log(colorArr);

        for(var i = 0; i < colorArr.length; i++){

            if( colorArr[i] == "white"){
                white++;
            }else if(colorArr[i] == "blue"){
                blue++;
            }else if(colorArr[i] == "black"){
                black++;
            }else if(colorArr[i] == "green"){
                green++;
            }else if(colorArr[i] == "yellow"){
                yellow++;
            }else if(colorArr[i] == "pink"){
                pink++;
            }else if(colorArr[i] == "red"){
                red++;
            }

        }

        })

        // console.log(pink);

        if( white > blue && white > black && white>green && white > yellow && white > pink && white > red){
            return res.status(200).send({white})
        }else if( blue > white && blue > black && blue>green && blue > yellow && blue > pink && blue > red){
            return res.status(200).send({blue})
        }else if( black > white && black > blue && black>green && black > yellow && black > pink && black > red){
            return res.status(200).send({black})
        }else if( green > white && green > blue && green>black && green > yellow && green > pink && green > red){
            return res.status(200).send({green})
        }else if( yellow > white && yellow > blue && yellow>black && yellow > green && yellow > pink && yellow > red){
            return res.status(200).send({yellow})
        }else if( pink > white && pink > blue && pink>black && pink > green && pink > yellow && pink > red){
            return res.status(200).send({pink})
        }else if( red > white && red > blue && red>black && red > green && red > yellow && red > pink){
            return res.status(200).send({red})
        }

     

    } catch (e) {
        return res.status(500).send(e.message)
    }

})




module.exports = router;
