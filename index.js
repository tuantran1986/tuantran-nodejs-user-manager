const express = require('express');
const app = express();
const PORT = 3000;

// 1. require 2.connect 3.schema 4.model
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/webSale');  // "tên DB" = webSale
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});                                                     // "SCHEMA" : cấu trúc 1 DOC
const userModel = mongoose.model('users', userSchema);  // "MODEL": quản lý COLLECTION USER



// CONFIG - PUG
app.set('views', './views');    // LINK đến thư mục ./VIEWS
app.set('view engine', 'pug');  // thiết lạp VIEW ENGINE = PUG

// ROUTER
app.get('/', (req, res) => {
    // res.send('tuantran - hello world');              // trả về TEXT
    // res.send('<h3>tuantran - hello world</h3>');     // trả về HTML : segment + page

    // RES.RENDER - trả về : "PAGE_HTML"
        // TS1: nội dung trong địa chỉ = "views/index.pug"
        // TS2: truyền "biến pageName" vào VIEWS: bằng toán tử {}
    res.render('index', { pageName: 'HomePage' });
})

app.get('/users', async (req, res) => {

    const userList = await userModel.find({});      // ĐỌC DỮ LIỆU - TỪ : "DATABASE"

    // RES.RENDER - trả về : "PAGE_HTML"
        // TS1: nội dung trong địa chỉ = "views/users/index.pug"
        // TS2: truyền "mảng listUsers" vào VIEWS: bằng toán tử {}
    res.render('users/index', { listUsers: userList});

    // res.render('users/index', { listUsers: [
    //     { id: 1, name: 'tuantran'},
    //     { id: 2, name: 'thanhthu'},
    //     { id: 3, name: 'quocanh'}
    // ]});
})


app.listen(PORT, () => console.log(`Node Server running on port = ${PORT}`));