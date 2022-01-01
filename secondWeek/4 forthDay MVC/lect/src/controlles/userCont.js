

const express = require("express");

const User = require("../models/userModel");


const router = express.Router();


router.get("", async (req, res) => {


try {

    const users = await User.find().lean().exec();

    return res.send(users);

}catch(err){
    return res.status(500).json({error: err.message});
}

});


router.post("", async(req, res) =>{

    // console.log(req.body);

    try{

        const user = await User.create(req.body);
        
        return res.status(201).send(user);

    }catch(err){

        return res.status(500).send(err.message);
    }


})

router.get("/:id", async(req, res)=>{

    try{

        const user = await User.findById(req.params.id).lean().exec();

        return res.status(200).send(user);

    }catch(err){

        return res.status(500).send(err.message);

    }

})


router.patch("/:id", async(req, res)=>{


    try{

        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean().exec();

        return res.status(201).send(user)

    }catch(err){
        return res.status(500).send(err.message);
    }

})


router.delete("/:id", async(req, res)=>{

    try{

        const user = await User.findByIdAndDelete(req.params.id).lean().exec()

        return res.status(200).send(user);
    }catch(err){

        return res.status(500).send(err.message); 
    }

})


module.exports = router;