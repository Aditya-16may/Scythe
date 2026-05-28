const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config")
const products = require("../models/product");

router.get("/",(req,res)=>{
    let success = req.flash("success")
    res.render("createproducts",{ success });
})

router.post("/create", upload.single("image"), async (req,res)=>{
    try{
        let { name, price, discount, panelcolor, bgcolor, textcolor } = req.body;
        let product = await products.create({
            name,
            price,
            discount,
            image : req.file.buffer,
            panelcolor,
            bgcolor,
            textcolor
        })
        req.flash("success", "product has been created");
        res.redirect("/owners/admin");

    } catch(err){
        res.send(err.message);
    }
});

module.exports = router;