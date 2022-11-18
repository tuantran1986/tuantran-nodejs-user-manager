const express = require('express');
const { getAllProductController, getProductPaginationController } = require('../controllers/productController');
// sử dụng EXPRESS.ROUTER
const productRouter = express.Router();


// 1.lấy tất cả product
productRouter.get('/all', getAllProductController);
// 2.phân trang: product
productRouter.get('/pagination', getProductPaginationController);


// nhớ MODULE.EXPORTS (có S) : USER_ROUTER
module.exports = productRouter;