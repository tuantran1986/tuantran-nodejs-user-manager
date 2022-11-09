const express = require('express');

// 1. sử dụng EXPRESS.ROUTER
const userRouter = express.Router();

// nhớ REQUIRE - USER MODEL
// const userModel = require('../models/userModel');

// 2. COPY - CÁC ROUTER USER của INDEX.JS - rồi PARSE sang đây
// 3. ĐỔI : APP thành USERROUTER
// 4. bỏ GỐC_PATH = '/users'


// IMPORT = "REQUIRED CONTROLLER"
const userController = require('../controllers/userController');

// CRUD - 1 = RETRY = READ: find({})
userRouter.get('/', userController.index);  // thay CALLBACK = CONTROLLER

// CRUD - 1 = RETRY = SEARCH: find({ name: REGEX })
userRouter.get('/searchPage', async (req, res) => {
    res.render('users/searchPage');
});

userRouter.get('/searchRequest', userController.searchRequest);

// CRUD - 1 = RETRY = SEARCH: find({ name: REGEX })
userRouter.get('/createPage', async (req, res) => {
    res.render('users/createPage');
});

// CYDB - METHOD POST : 2 - CRUD = CREATE
userRouter.post('/createRequest', userController.createRequest);

// CRUD - 1 = RETRY = SEARCH: find({ name: REGEX })
// CYDB - DETAILS 2 - "KHAI BÁO BIẾN = userId" bằng dấu HAI CHẤM
userRouter.get('/details/:id', userController.getDetails)


// 5. nhớ MODULE.EXPORTS (có S) : USER_ROUTER
module.exports = userRouter;