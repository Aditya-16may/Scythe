const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owners-model");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const config = require("config");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

if(process.env.NODE_ENV === "development"){
    router.get("/",(req,res)=>{
        res.render("createOwner");
    });

    router.post("/create", async (req,res)=>{
        try{
            let { email , fullname, password, contact, gstin} = req.body;
            let owner = await ownerModel.findOne({email});
            if(owner.length>0){
                req.flash("error", "Owner already exists.. login");
                res.redirect("/");
            } else {
                bcrypt.genSalt(10, (err,salt)=>{
                bcrypt.hash(password, salt, async (err,hash)=>{
                    if(err){
                        req.flash("error",err.message);
                        res.redirect("/");
                    }
                    let owner = await ownerModel.create({
                        fullname,
                        email,
                        password : hash,
                        contact,
                        gstin,
                        isadmin: true,
                    })
                    let token = generateToken(owner);
                    res.cookie("token", token);
                    res.redirect("/login");
                })
            })
            }
        } catch(err){
            req.flash("Something Went wrong");
            res.redirect("/");
            return;
        }
        
    });
};

router.get("/login", (req,res)=>{
    res.render("owner-login");
});

router.post("/login",async (req,res)=>{
    try{
            let {email, password} = req.body;
    
            let owner = await ownerModal.findOne({email});
            if(!owner) return res.status(401).flash("Something went wrong");
            let verification = await bcrypt.compare(password, owner.password);
            if(verification){
                let token = generateToken(owner);
                req.flash("error","you are logged in...");
                res.render("admin");
            } else{
                res.status(401).flash("Something went wrong...");
            }
        } catch(err){
            req.flash("Something Went wrong");
            res.redirect("/");
            return;
        }
})

router.get("/admin", (req,res)=>{
    let success = req.flash("success");
    res.render("createproducts", { success });
});

router.get("/allproducts",(req,res)=>{
    res.render("admin");
})


module.exports = router;