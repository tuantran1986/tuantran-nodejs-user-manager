const express = require('express');
const { getAllProductController } = require('../controllers/productController');
// sử dụng EXPRESS.ROUTER
const productRouter = express.Router();


// 1.lấy tất cả product
productRouter.get('/all', getAllProductController);


// nhớ MODULE.EXPORTS (có S) : USER_ROUTER
module.exports = productRouter;