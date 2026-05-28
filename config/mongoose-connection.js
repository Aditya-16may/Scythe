const mongoose = require("mongoose")
const dbg = require("debug")("development:mongoose");
const config = require("config");

mongoose
.connect(`${config.get("MONGODB_URI")}/scythe`)
.then(()=>{
    dbg("Connected");
})
.catch((err)=>{
    dbg(err);
})

module.exports = mongoose.connection;