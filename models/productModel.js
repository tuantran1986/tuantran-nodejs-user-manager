// 1. require 2.connect 3.schema 4.model
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);  // "tên DB" = webSale
// mongoose.connect('mongodb://localhost:27017/webSale');  // "tên DB" = webSale

const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});                                                             // "SCHEMA" : cấu trúc 1 DOC
const productModel = mongoose.model('products', productSchema); // "MODEL": quản lý COLLECTION PRODUCTs

// CYDB - MODULE.EXPORTS (có S)- bản chất là 1 OBJECT
module.exports = productModel;