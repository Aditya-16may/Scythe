const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userModal = require("../models/user");

module.exports = async function(req,res,next){
    if(!req.cookies.token){
        req.flash("error", "you need to be logged in...");
        return res.redirect("/");
    } else{
        try{
            let decoded = await jwt.verify(req.cookies.token, process.env.JWT_KEY);
            let user = await userModal.findOne({email: decoded.email}).select("-password");
            req.user = user;
            next();
        } catch(err){
            req.flash("error", "something went wrong..");
            res.redirect("/");
        }
    } 
};