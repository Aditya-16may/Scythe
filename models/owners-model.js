const mongoose = require("mongoose")


const ownerSchema = mongoose.Schema({
    fullname : {
        type : String,
        minLength : 3,
        trim : true,
    },
    email : String,
    password: String,
    isadmin : Boolean,
    products: {
        type : Array,
        default :[],
    },
    contact : Number,
    profilePic : {
        type : String,
        default : "default.png"
    },
    gstin : String
})

module.exports = mongoose.model("owners-model",ownerSchema)