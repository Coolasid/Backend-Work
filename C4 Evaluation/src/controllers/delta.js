const express = require("express");

const router = express.Router();

const Submission = require("../models/submissionModel");

router.get("", async (req, res) => {
  try {
    const submissions = await Submission.find({score: {$gt: 7.4}}).lean()
      .exec();

    return res.status(200).send(submissions);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = router;
