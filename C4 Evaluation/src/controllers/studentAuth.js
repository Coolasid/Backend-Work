require("dotenv").config();

const Student = require("../models/studentsModel");

const jwt = require("jsonwebtoken");

const newToken = (student) => {
  return jwt.sign({ user: student }, `${process.env.JWT_SECRET_KEY}`);
};

const register = async (req, res) => {
  try {
    let student = await Student.findOne({ studentCode: req.body.studentCode }).lean().exec();

    if (student)
      return res
        .status(400)
        .send({ message: "student with that Code is already exists" });

    student = await Student.create(req.body);

    const token = newToken(student);

    return res.status(201).send({ student, token });
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const login = async (req, res) => {
  try {
    let student = await Student.findOne({ studentCode: req.body.studentCode });

    if (!student)
      return res
        .status(400)
        .send({ message: " code is incorrect" });

    const match = student.checkCode(req.body.studentCode);

    if (!match)
      return res
        .status(400)
        .send({ message: "code is incorrect" });

    const token = newToken(student);

    return res.status(201).send({ student, token });
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

module.exports = { login, register };
