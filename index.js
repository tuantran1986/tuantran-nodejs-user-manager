const express = require('express');
const app = express();
const PORT = 3000;


// CẤU HÌNH - "PUG"
app.set('views', './views');    // LINK đến thư mục ./VIEWS
app.set('view engine', 'pug');  // thiết lạp VIEW ENGINE = PUG

// CẤU HÌNH - "BODY-PARSER"
const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// BÀI 6 - MONGO DB + MONGOOSE (đã làm ở bài 2)
// 1. require 2.connect 3.schema 4.model
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/webSale');  // "tên DB" = webSale
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});                                                     // "SCHEMA" : cấu trúc 1 DOC
const userModel = mongoose.model('users', userSchema);  // "MODEL": quản lý COLLECTION USER




// ROUTER
app.get('/', (req, res) => {
    // res.send('tuantran - hello world');              // trả về TEXT
    // res.send('<h3>tuantran - hello world</h3>');     // trả về HTML : segment + page

    // RES.RENDER - trả về : "PAGE_HTML"
        // TS1: nội dung trong địa chỉ = "views/index.pug"
        // TS2: truyền "biến pageName" vào VIEWS: bằng toán tử {}
    res.render('index', { pageName: 'HomePage' });
})

// CRUD - 1 = RETRY = READ: find({})
app.get('/users', async (req, res) => {

    const userList = await userModel.find({});      // ĐỌC DỮ LIỆU - TỪ : "DATABASE"
    // console.log('userList', userList);

    // RES.RENDER - trả về : "PAGE_HTML"
        // TS1: nội dung trong địa chỉ = "views/users/index.pug"
        // TS2: truyền "mảng listUsers" vào VIEWS: bằng toán tử {}
    res.render('users/index', { listUsers: userList || []});

    // res.render('users/index', { listUsers: [
    //     { id: 1, name: 'tuantran'},
    //     { id: 2, name: 'thanhthu'},
    //     { id: 3, name: 'quocanh'}
    // ]});
})


// CRUD - 1 = RETRY = SEARCH: find({ name: REGEX })
app.get('/users/searchPage', async (req, res) => {
    res.render('users/searchPage');
})

app.get('/users/searchRequest', async (req, res) => {
    const paramUrl = req.query;     // lấy dữ liệu từ URL = "REQ.QUERY"

    const regexName = new RegExp(`${paramUrl.keyNameSearch}+`, 'i');
    const userList = await userModel.find({ name: regexName });     // DB : FIND - REGEX

    // truyền dữ liệu vào VIEW = [THAM SỐ THỨ 2] = "listUser" + "keyNameSearch"
    res.render('users/searchPage', { listUsers: userList || [], keyNameSearch: paramUrl.keyNameSearch });
})


// CRUD - 1 = RETRY = SEARCH: find({ name: REGEX })
app.get('/users/createPage', async (req, res) => {
    res.render('users/createPage');
})
// CYDB - METHOD POST : 2 - CRUD = CREATE
app.post('/users/createRequest', async (req, res) => {
    const userInsert = req.body;        // lấy dữ liệu từ FORM - POST: "REQ.BODY"
    const userList = await userModel.create(userInsert);     // thêm = MODEL.CREATE

    // điều hướng về trang "/users" = RES.REDIRECT
    res.redirect('/users');
})


// CRUD - 1 = RETRY = SEARCH: find({ name: REGEX })
// CYDB - DETAILS 2 - "KHAI BÁO BIẾN = userId" bằng dấu HAI CHẤM
app.get('/users/details/:id', async (req, res) => {
    // CYDB - DETAILS 3 - lấy dữ liệu từ URL bằng "HAI CHẤM - REQUEST.PARAMS"
    const paramsUrl = req.params;
    const userId = paramsUrl.id;
    // console.log('req.params = ', req.params);


    // CYDB - DETAILS 4 - TRUY VẤN DỮ LIỆU = "Model.findOne"
    const userDetail = await userModel.findOne({ _id: userId });   // cydb - AWAIT
    // Model.findOne : trả về "1 phần tử"
    // Model.find : trả về "MẢNG phần tử"

    // CYDB - DETAILS 5 - truyền USER vào VIEW để hiển thị
    res.render('users/details', { user: userDetail });
})



// BÀI 5 - NODEMON: (đã làm ở bài 1) - PACKAGE.JSON: "start": "nodemon --inspect index.js"

app.listen(PORT, () => console.log(`Node Server running on port = ${PORT}`));