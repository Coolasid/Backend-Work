const mongoose = require("mongoose");

const evalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId,  ref:"user", required:true },
    startingDate: { type: Date, required: true, },
    endDate: { type: Date, required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("evaluation", evalSchema);
