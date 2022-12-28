const express = require('express');
const authRouter = express.Router();    // sử dụng EXPRESS.ROUTER

// IMPORT = "REQUIRED CONTROLLER"
const { login, loginRequest, register, registerRequest, logout } = require('../controllers/authController');
// tích hợp MIDDLEWARE - VALIDATE FORM LOGIN
const { validateFormLogin } = require('../validate/validateFormLogin');
const { validateCreateUser } = require('../validate/validateCreateUser');

// cấu hình: "UPLOAD_FILE" thư mục chứa file được upload lên
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/'});



// CRUD - 1 = RETRY = READ: find({})
authRouter.get('/login', login);
authRouter.post('/loginRequest', validateFormLogin, loginRequest); // tích hợp MIDDLEWARE - VALIDATE FORM LOGIN
authRouter.get('/register', register);
authRouter.post('/registerRequest', 
    upload.single('avatarUser'), 
    validateCreateUser, 
    registerRequest
); // tích hợp MIDDLEWARE - VALIDATE FORM LOGIN
authRouter.get('/logout', logout);


// nhớ MODULE.EXPORTS (có S) : USER_ROUTER
module.exports = authRouter;