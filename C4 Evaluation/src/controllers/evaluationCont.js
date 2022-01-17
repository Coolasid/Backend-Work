const express = require("express");

const Evaluation = require("../models/evaluationModel");

const router = express.Router();



router.get("", async (req, res) => {
  try {
    const evaluations = await Evaluation.find().lean().exec();

    return res.status(200).send(evaluations);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});




router.post("", async(req, res)=>{

    try {
        const evaluation = await Evaluation.create(req.body);
        
        return res.status(201).send(evaluation);
    } catch (e) {
        return res.status(500).send(e.message)
    }

})



module.exports = router