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
const { validateCreateUser } = require('../validate/validateCreateUser');
const { authRequire } = require('../middleware/authMiddleware');



// TEST-COOKIE:
            // TEST-SET COOKIE: 
            userRouter.get('/test/setCookie', (req, res, next) => {
                res.cookie('key-session-id', 'value-123456');
                res.send('TEST SET-COOKIE: F12 xem HEADER: SET-COOKIE');
            });
            // TEST-GET COOKIE: 
            userRouter.get('/test/getCookie', (req, res, next) => {
                console.log('req.cookies = ', req.cookies);
                res.send('TEST GET-COOKIE: backend - ĐỌC cookies = "cookieParser" + "req.cookies"');
            });



// CRUD - 1 = RETRY = READ: find({})   :   [1. "USERLIST"]
// thêm "MIDDLEWARE = authRequire" - ĐÊ "CHECK - USERID" trong "REQ.COOKIES"
userRouter.get('/', authRequire, userController.index);  // thay CALLBACK = CONTROLLER

// CRUD - 1 = RETRY = SEARCH: find({ name: REGEX })
userRouter.get('/searchPage', authRequire, async (req, res) => {
    res.render('users/searchPage');
});

userRouter.get('/searchRequest', authRequire, userController.searchRequest);

// CRUD - 1 = RETRY = SEARCH: find({ name: REGEX })
userRouter.get('/createPage', authRequire, async (req, res) => {
    res.render('users/createPage');
});


// CYDB - METHOD POST : 2 - CRUD = CREATE
// sử dụng MIDDLEWARE - VALIDATE dữ liệu: "validateCreateUser" => "userController.createRequest"
userRouter.post('/createRequest', authRequire, validateCreateUser, userController.createRequest);


// CRUD - 1 = RETRY = SEARCH: find({ name: REGEX })
// CYDB - DETAILS 2 - "KHAI BÁO BIẾN = userId" bằng dấu HAI CHẤM
userRouter.get('/details/:id', authRequire, userController.getDetails)


// 5. nhớ MODULE.EXPORTS (có S) : USER_ROUTER
module.exports = userRouter;