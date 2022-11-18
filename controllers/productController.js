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

    // 1.ĐẾM SỐ LƯỢNG PHẦN TỬ:
    const countDocuments = await productModel.countDocuments({});
    const countPages = Math.floor(countDocuments / rowPerPage) || 1;    // Math.floor: làm tròn - xuống nguyên
    // console.log('countDocuments = ', countDocuments);

    // 2. TRUYỀN BIẾN - VÀO VIEW: "queryParams = countPages + currentPage"
    const queryParams = {
        countPages: countPages,
        currentPage: page || 1
        // currentRowPerPage: rowPerPage || 8 : để 8 sản phẩm 1 trang
    };

    // truyền vào VIEW:
        // productList
        // queryParams
    res.render('products/pagination', { productList: productList || [], queryParams: queryParams });

}