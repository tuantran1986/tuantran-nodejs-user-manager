const express = require('express');
const authRouter = express.Router();    // sử dụng EXPRESS.ROUTER

// IMPORT = "REQUIRED CONTROLLER"
const { login, loginRequest, logout } = require('../controllers/authController');
// tích hợp MIDDLEWARE - VALIDATE FORM LOGIN
const { validateFormLogin } = require('../validate/validateFormLogin');



// CRUD - 1 = RETRY = READ: find({})
authRouter.get('/login', login);
authRouter.post('/loginRequest', validateFormLogin, loginRequest); // tích hợp MIDDLEWARE - VALIDATE FORM LOGIN
authRouter.get('/logout', logout);


// nhớ MODULE.EXPORTS (có S) : USER_ROUTER
module.exports = authRouter;