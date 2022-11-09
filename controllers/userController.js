const userModel = require('../models/userModel');

// cydb - "MODULE.EXPORTS" (có S) : bản chất là 1 OBJECT
// cydb - "MODULE.EXPORTS" (có S) : tương tự - "EXPORT CONST"

    module.exports.index = async (req, res) => {

        const userList = await userModel.find({});      // ĐỌC DỮ LIỆU - TỪ : "DATABASE"
        // console.log('userList', userList);

        // RES.RENDER - trả về : "PAGE_HTML"
            // TS1: nội dung trong địa chỉ = "views/users/index.pug"
            // TS2: truyền "mảng listUsers" vào VIEWS: bằng toán tử {}
        res.render('users/index', { listUsers: userList || []});
    }

    module.exports.searchRequest = async (req, res) => {
        const paramUrl = req.query;     // lấy dữ liệu từ URL = "REQ.QUERY"
    
        const regexName = new RegExp(`${paramUrl.keyNameSearch}+`, 'i');
        const userList = await userModel.find({ name: regexName });     // DB : FIND - REGEX
    
        // truyền dữ liệu vào VIEW = [THAM SỐ THỨ 2] = "listUser" + "keyNameSearch"
        res.render('users/searchPage', { listUsers: userList || [], keyNameSearch: paramUrl.keyNameSearch });
    }

    module.exports.createRequest = async (req, res) => {
        const userInsert = req.body;        // lấy dữ liệu từ FORM - POST: "REQ.BODY"
        const userList = await userModel.create(userInsert);     // thêm = MODEL.CREATE
    
        // điều hướng về trang "/users" = RES.REDIRECT
        res.redirect('/users');
    }

    module.exports.getDetails = async (req, res) => {
        // CYDB - DETAILS 3 - lấy dữ liệu từ URL bằng "HAI CHẤM - REQUEST.PARAMS"
        const paramsUrl = req.params;
        const userId = paramsUrl.id;
        // console.log('req.params = ', req.params);
    
        // CYDB - DETAILS 4 - TRUY VẤN DỮ LIỆU = "Model.findOne"
        const userDetail = await userModel.findOne({ _id: userId });   // cydb - AWAIT
        // Model.findOne : trả về "1 phần tử"
        // Model.find : trả về "MẢNG phần tử"
    
        // CYDB - DETAILS 5 - truyền USER vào VIEW để hiển thị
        res.render('users/details', { user: userDetail });
    }

