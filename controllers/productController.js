const productModel = require("../models/productModel")

module.exports.getAllProductController = async (req, res, next) => {
    const productList = await productModel.find({});

    res.render('products/index', { productList: productList || [] });
}

module.exports.getProductPaginationController = async (req, res, next) => {

    // console.log('req.query', req.query);
    const page = req.query?.page || 1;  // mac dinh = 1
    const rowPerPage = 8;

    const skip = (page -1) * rowPerPage;
    const limit = rowPerPage;

    // PHÂN TRANG = FIND.SKIP.LIMIT
        // SKIP: bỏ qua bao nhiêu phần tử
        // LIMIT: số phần tử 1 trang
    const productList = await productModel.find({}).skip(skip).limit(limit);
    // console.log('productList', productList);

    res.render('products/pagination', { productList: productList || [] });
}