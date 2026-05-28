const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name : String,
    price : Number,
    image : Buffer,
    panelcolor : String,
    discount : {
        type : Number,
        default: 0
    },
    bgcolor : String,
    textcolor : String

})

module.exports = mongoose.model("product", productSchema);