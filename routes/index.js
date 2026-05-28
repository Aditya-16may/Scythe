const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const router = express.Router();
const productModel = require("../models/product");
const userModal = require("../models/user");

router.get("/",(req,res)=>{
    let error = req.flash("error");
    let success = req.flash("success");
    res.render("index",{ error, success , loggedin: false});
});

router.get("/shop", isLoggedIn, async (req,res)=>{
    let products = await productModel.find()
    let success = req.flash("success");
    res.render("shop",{ products, success });
});

router.get("/addtocart/:id",isLoggedIn, async (req,res)=>{
    try{
        let user = await userModal.findOne({email : req.user.email});
        let product = req.params.id;
        user.cart.push(product);
        await user.save();
        req.flash("success", "Product have been added to cart..");
        res.redirect("/shop");
    } catch(err){
        res.flash("error", err.message);
        res.redirect("/shop");
    }
})


module.exports = router;