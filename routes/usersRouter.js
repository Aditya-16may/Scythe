const express = require("express");
const router = express.Router(); 
const { registerUser,loginUser,logout } = require("../controllers/authController")
const isLoggedIn = require("../middlewares/isLoggedIn");
const userModal = require("../models/user");
const productModel = require("../models/product")

router.get("/", (req,res)=>{
    res.send("It's the users page");
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/cart",isLoggedIn, async (req,res)=>{
    let user = await userModal.findOne({email : req.user.email}).populate("cart");
    res.render("cart", {user});
})
module.exports = router;