const mongoose = require("mongoose");

const stdSchema = new mongoose.Schema(
  {
    studentCode: { type: String, required: true },
    batch: { type: String, required: true, unique: true },
    currentStatus: { type: String, required: true, default:"active" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("student", stdSchema);




stdSchema.pre("save", function (next) {

  if (!this.isModified("studentCode")) return next();

  this.studentCode = bcrypt.hashSync(this.studentCode, 8);

  return next();
});

stdSchema.methods.checkCode = function (studentCode) {
  return bcrypt.compareSync(studentCode, this.studentCode);
};

