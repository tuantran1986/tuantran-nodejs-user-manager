// 1. require 2.connect 3.schema 4.model
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);  // "tên DB" = webSale
// mongoose.connect('mongodb://localhost:27017/webSale');  // "tên DB" = webSale
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatar: String,     // avatar: STRING
    password: String
});                                                     // "SCHEMA" : cấu trúc 1 DOC
const userModel = mongoose.model('users', userSchema);  // "MODEL": quản lý COLLECTION USER

// CYDB - MODULE.EXPORTS (có S)- bản chất là 1 OBJECT
module.exports = userModel;