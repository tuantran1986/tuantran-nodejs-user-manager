const express = require('express');
const { getAllProductController, getProductPaginationController, getProductPaginationSearchController } = require('../controllers/productController');
// sử dụng EXPRESS.ROUTER
const productRouter = express.Router();


// 1.lấy tất cả product
productRouter.get('/all', getAllProductController);
// 2.phân trang: product
productRouter.get('/pagination', getProductPaginationController);

// 3.phân trang + TRA CỨU : product - pagination & search
productRouter.get('/paginationSearch', getProductPaginationSearchController);


// nhớ MODULE.EXPORTS (có S) : USER_ROUTER
module.exports = productRouter;