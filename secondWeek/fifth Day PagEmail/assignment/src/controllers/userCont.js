const express = require("express");

const router = express.Router();

const sendMail = require("../utils/sendMail");

const User = require("../models/userModel");


router.post("", async(req, res)=>{

    try {

        const user = await User.create(req.body);

        sendMail({

            from:"admin@masai.com",
            to:user.email,
            subject: `Welcome to Patil Network Pvt. Ltd. ${user.firstName} ${user.lastName}.`,
            text:`Hi ${user.firstName}, Please confirm your email address.`,
            html: `<h1>Hi ${user.firstName}, Please confirm your email address.</p>`

        });

        sendMail({

            from:"admissionTeam@masai.com",
            to: ["yogesh@admin.com","nrupul@admin.com","prateek@admin.com", "isha@admin.com","dhaval@admin.com"],
            subject: `${user.firstName} ${user.lastName} has register with us.`,
            text:`Please welcome ${user.firstName}`,
            html: `<h1>Please welcome ${user.firstName}</p>`

        })

        return res.status(201).send(user);
        

    } catch (e) {
        
        return res.status(500).send(e.message);
    }


})


router.get("", async(req, res)=>{

    try {
        
        const page = +req.query.page || 2;
        const size = +req.query.size || 2;


        const skip = (page - 1) * size;

        const users = await User.find().skip(skip).limit(size).lean().exec();

        const totalPages = Math.ceil(( await User.find().count()) / size);

        return res.status(200).send({ users, totalPages});

    } catch (e) {
        return res.status(500).send(e.message);
    }

})




module.exports = router;