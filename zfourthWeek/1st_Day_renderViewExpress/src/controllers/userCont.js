
const express = require("express");

const router = express.Router();

const User = require("../modules/userModel")


const crudCont = require("./crudCont");


router.get("/new", (req, res)=>{

    return res.render("new")

})


router.get("/:id/edit", async(req, res)=>{  // /user/:id/edit => edit form

    try {

        const user = await User.findById(req.params.id).lean().exec();

        return res.render("edit", {user: user});
        
    } catch (e) {
        return res.status(500).send(e.message)
    }
     

});

router.get("/:id/delete", async (req, res) => {
  // /user/:id/edit => edit form

  try {
    await User.findByIdAndDelete(req.params.id).lean().exec();

    const users = await User.find().lean().exec();

    return res.render("index", { users: users });
  } catch (e) {
    return res.status(500).send(e.message);
  }
});


// /users

router.post("", crudCont(User).post );
router.get("", crudCont(User, "index").get);
router.get("/:id", crudCont(User).getOne);
router.patch("/:id", crudCont(User, "index").updateOne);
router.delete("/:id", crudCont(User).deleteOne); 


module.exports = router;