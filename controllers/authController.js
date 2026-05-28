const userModal = require("../models/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const config = require("config");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");


module.exports.registerUser = async function (req,res){

    try{
        let {fullname, email, password} = req.body;
        let user = await userModal.findOne({email});
        if(user){
            req.flash("error","You already have and account");
            res.redirect("/");
        } else{
            bcrypt.genSalt(10, (err,salt)=>{
                bcrypt.hash(password, salt, async (err,hash)=>{
                    if(err){
                        req.flash("error",err.message);
                        res.redirect("/");
                    }
                    let user = await userModal.create({
                        fullname,
                        email,
                        password : hash,
                    })
                })
            })
            let token = generateToken(user);
            res.cookie("token", token);
            req.flash("success","User is registered...");
            res.redirect("/");
            
        }
    }
    catch(err){
        req.flash("error","Something went wrong");
        res.redirect("/");
    }
}

module.exports.loginUser = async function(req,res){
    try{
        let {email, password} = req.body;

        let user = await userModal.findOne({email});
        if(!user){
            req.flash("error","Something went wrong");
            return res.redirect("/");
        } 
        let verification = await bcrypt.compare(password, user.password);
        if(verification){
            let token = generateToken(user);
            res.cookie("token",token);
            res.redirect("/shop");
        } else{
            req.flash("error","Something went wrong");
        }
    } catch(err){
        req.flash("error","Something went wrong");
        res.redirect("/");
    }
    
}

module.exports.logout = function(req,res){
    res.cookie("token", "");
    req.flash("error", "You have been logged out..Login again to access the site...");
    res.redirect("/");
}