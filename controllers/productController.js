const productModel = require("../models/productModel")

module.exports.getAllProductController = async (req, res, next) => {
    const productList = await productModel.find({});

    res.render('products/index', { productList: productList || [] });
}