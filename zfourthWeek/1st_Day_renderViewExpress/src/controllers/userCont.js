
const express = require("express");

const router = express.Router();

let User


/*
const User = require("../modules/userModel")



*/

const crudCont = require("./crudCont");



router.post("", crudCont(User).post );
router.get("", crudCont(User, "index").get);
router.get("/:id", crudCont(User).getOne);
router.patch("/:id", crudCont(User).updateOne);
router.delete("/:id", crudCont(User).deleteOne); 


module.exports = router;