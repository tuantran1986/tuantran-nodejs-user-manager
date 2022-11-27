const productModel = require("../../models/productModel");

// API = RES.JSON
module.exports.getAllProductControllerAPI = async (req, res, next) => {

    const productList_API_JSON = await productModel.find({});
    // RES.JSON : để trả về dữ liệu JSON.
    res.json({productList_API_JSON: productList_API_JSON || []});

}