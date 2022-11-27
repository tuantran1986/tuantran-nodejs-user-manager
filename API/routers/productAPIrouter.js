const express = require('express');
const { getAllProductControllerAPI } = require('../controllers/productAPIcontroller');

const productRouterAPI = express.Router();

// ROUTER: '/api/allProduct'
// CONTROLLER : 'getAllProductControllerAPI' = trả về DATA JSON = 'RES.JSON'
productRouterAPI.get('/allProduct', getAllProductControllerAPI);

// nhớ EXPORT
module.exports = productRouterAPI;