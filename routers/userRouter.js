const express = require('express');
const multer = require('multer');

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

// 5. UPLOAD_FILE: thư mục chứa file được upload lên
const upload = multer({ dest: 'public/uploads/'});


// TEST-COOKIE:
            // TEST-SET COOKIE: 
            userRouter.get('/test/setCookie', (req, res, next) => {
                res.cookie('key-session-id', 'value-123456');
                res.send('TEST SET-COOKIE: F12 xem HEADER: SET-COOKIE');
            });
            // TEST-GET COOKIE: 
            userRouter.get('/test/getCookie', (req, res, next) => {
                // console.log('req.cookies = ', req.cookies);
                res.send('TEST GET-COOKIE: backend - ĐỌC cookies = "cookieParser" + "req.cookies"');
            });



// CRUD - 1 = RETRY = READ: find({})   :   [1. "USERLIST"]
// thêm "MIDDLEWARE = authRequire" - ĐÊ "CHECK - USERID" trong "REQ.COOKIES"
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
// sử dụng MIDDLEWARE - VALIDATE dữ liệu: "validateCreateUser" => "userController.createRequest"
// MIDDLEWARE - UPLOAD FILE: 
    // "single" : upload file đơn 
    // tham số "avatarUser" === "tên biến" === "NAME của thẻ INPUT"
userRouter.post('/createRequest', 
    upload.single('avatarUser'), 
    validateCreateUser, 
    userController.createRequest
);


// CRUD - 1 = RETRY = SEARCH: find({ name: REGEX })
// CYDB - DETAILS 2 - "KHAI BÁO BIẾN = userId" bằng dấu HAI CHẤM
userRouter.get('/details/:id', userController.getDetails)

// CRUD - 2 = DELETE USER:
userRouter.get('/delete/:id', userController.deleteForm)
userRouter.post('/deleteRequest/:id', userController.deleteRequest)

// CRUD - 3 = UPDATE USER:
userRouter.get('/update/:id', userController.updateForm)
// VALIDATE FORM: "UPDATE" dùng chung với "CREATE"
userRouter.post('/updateRequest/:id', 
    upload.single('avatarUser'), 
    validateCreateUser, 
    userController.updateRequest
)


// 5. nhớ MODULE.EXPORTS (có S) : USER_ROUTER
module.exports = userRouter;