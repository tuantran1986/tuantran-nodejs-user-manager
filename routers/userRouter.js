const express = require('express');

// 1. sử dụng EXPRESS.ROUTER
const userRouter = express.Router();

// nhớ REQUIRE - USER MODEL
const userModel = require('../models/userModel');

// 2. COPY - CÁC ROUTER USER của INDEX.JS - rồi PARSE sang đây
// 3. ĐỔI : APP thành USERROUTER
// 4. bỏ GỐC_PATH = '/users'

// CRUD - 1 = RETRY = READ: find({})
userRouter.get('/', async (req, res) => {

    const userList = await userModel.find({});      // ĐỌC DỮ LIỆU - TỪ : "DATABASE"
    // console.log('userList', userList);

    // RES.RENDER - trả về : "PAGE_HTML"
        // TS1: nội dung trong địa chỉ = "views/users/index.pug"
        // TS2: truyền "mảng listUsers" vào VIEWS: bằng toán tử {}
    res.render('users/index', { listUsers: userList || []});
})


// CRUD - 1 = RETRY = SEARCH: find({ name: REGEX })
userRouter.get('/searchPage', async (req, res) => {
    res.render('users/searchPage');
})

userRouter.get('/searchRequest', async (req, res) => {
    const paramUrl = req.query;     // lấy dữ liệu từ URL = "REQ.QUERY"

    const regexName = new RegExp(`${paramUrl.keyNameSearch}+`, 'i');
    const userList = await userModel.find({ name: regexName });     // DB : FIND - REGEX

    // truyền dữ liệu vào VIEW = [THAM SỐ THỨ 2] = "listUser" + "keyNameSearch"
    res.render('users/searchPage', { listUsers: userList || [], keyNameSearch: paramUrl.keyNameSearch });
})


// CRUD - 1 = RETRY = SEARCH: find({ name: REGEX })
userRouter.get('/createPage', async (req, res) => {
    res.render('users/createPage');
})
// CYDB - METHOD POST : 2 - CRUD = CREATE
userRouter.post('/createRequest', async (req, res) => {
    const userInsert = req.body;        // lấy dữ liệu từ FORM - POST: "REQ.BODY"
    const userList = await userModel.create(userInsert);     // thêm = MODEL.CREATE

    // điều hướng về trang "/users" = RES.REDIRECT
    res.redirect('/users');
})


// CRUD - 1 = RETRY = SEARCH: find({ name: REGEX })
// CYDB - DETAILS 2 - "KHAI BÁO BIẾN = userId" bằng dấu HAI CHẤM
userRouter.get('/details/:id', async (req, res) => {
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


// 5. nhớ MODULE.EXPORTS (có S) : USER_ROUTER
module.exports = userRouter;