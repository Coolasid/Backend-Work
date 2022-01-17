const express = require("express");

const Submission = require("../models/submissionModel");

const router = express.Router();

const { uploadFile } = require("../middlewars/upload");

router.get("", async (req, res) => {
  try {
    const submissions = await Submission.find().lean().exec();

    return res.status(200).send(submissions);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post("", uploadFile, async (req, res) => {
  try {
    const submission = await Submission.create({
      evaluationID: req.body.evaluationID,
      answerdeBy: req.body.answerdeBy,
      status: req.body.status,
      submissionTime: req.body.submissionTime,
      score: req.body.score,
      assessedBy: req.body.assessedBy,
      submissionLink: req.file.path
    });

    return res.status(200).send(submission);
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
