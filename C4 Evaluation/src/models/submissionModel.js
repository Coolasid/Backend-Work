const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    evaluationID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "evaluation",
      required: true,
    },
    answerdeBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
      required: true,
    },
    status: { type: String, required: true, default: "pending" },
    submissionTime: { type: Date, required: true },
    score: { type: Number, required: true },
    assessedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    submissionLink: [{ type: String, required: true }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("submission", submissionSchema);
