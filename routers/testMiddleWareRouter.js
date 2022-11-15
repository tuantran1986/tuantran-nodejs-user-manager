const express = require('express');
// 1. sử dụng EXPRESS.ROUTER
const testMiddleWareRouter = express.Router();

// CYDB - MIDDLEWARE có 3 THAM SỐ: ( "REQ" + "RES" + "NEXT" )
    // NEXT() : để chạy sang MIDDLEWARE "SAU"
    // "RES.LOCALS" : là biến toàn cục = OBJECT - dùng để truyền dữ liệu giữa các MIDDLEWARE
const middleWare1 = (req, res, next) => {
    console.log('middleWare 1 - run');
    res.locals.dataMiddleWare1 = '"TRUYỀN" DỮ LIỆU - middleware - 1';
    next();     // NEXT() : để chạy sang MIDDLEWARE "SAU"
}
const middleWare2 = (req, res, next) => {
    console.log('middleWare 2 - run run');
    res.locals.dataMiddleWare2 = '"TRUYỀN" DỮ LIỆU - middleware - 2';
    next();     // NEXT() : để chạy sang MIDDLEWARE "SAU"
}
const middleWare3 = (req, res, next) => {
    console.log('middleWare 3 - run run run');
    console.log('middleWare 3 - "NHẬN" DỮ LIỆU : res.locals = ', res.locals);
    res.send('test middleware - NEXT() để chạy sang MIDDLEWARE phía SAU');
}


testMiddleWareRouter.get('/', middleWare1, middleWare2, middleWare3);


// 2. nhớ MODULE.EXPORTS (có S) : USER_ROUTER
module.exports = testMiddleWareRouter;