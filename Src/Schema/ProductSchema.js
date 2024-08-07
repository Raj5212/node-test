const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:String,
    price:Number,
    size: [String],
    rating:Number
},{
    timestamps: true
})






module.exports = mongoose.model('Product' , productSchema);
