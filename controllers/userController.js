const md5 = require('md5');
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

        // DEBUGGER
        // THÊM "--INSPECT" vào dòng lệnh "SCRIPT:START" - "nodemon --inspect index.js"
        // DEBUGGER
        
        const regexName = paramUrl.keyNameSearch ? new RegExp(`${paramUrl.keyNameSearch}+`, 'i') : new RegExp(` `, 'i');
        const userList = await userModel.find({ name: regexName });     // DB : FIND - REGEX
    
        // truyền dữ liệu vào VIEW = [THAM SỐ THỨ 2] = "listUser" + "keyNameSearch"
        res.render('users/searchPage', { listUsers: userList || [], keyNameSearch: paramUrl.keyNameSearch });
    }

    // NEXT() : để chuyển sang middleWare sau
    module.exports.createRequest = async (req, res, next) => {

        // "GỬI-NHẬN" DỮ LIỆU - GIỮA CÁC MIDDLEWARE = "res.locals"
        console.log('******   "GỬI-NHẬN" DỮ LIỆU - GIỮA CÁC MIDDLEWARE = "res.locals"     ******');
        console.log('res.locals.passValidateCreateUser = ', res.locals.passValidateCreateUser);

        if (res.locals.passValidateCreateUser === true) {
            // TH2 - "KO LỖI" : tạo USER và thêm vào DB
            // const userInsert = req.body;        // lấy dữ liệu từ FORM - POST: "REQ.BODY"

            const hashPassWord = md5(req.body.password);    // 1.mã hóa password = MD5
            const userInsert = {
                name: req.body.name,
                email: req.body.email,
                password: hashPassWord      // 1.mã hóa password = MD5
            };

            const userList = await userModel.create(userInsert);     // thêm = MODEL.CREATE
            
            // điều hướng về trang "/users" = RES.REDIRECT
            res.redirect('/users');
        } else {
            // TH1 - "CÓ LỖI" : truyền vào mảng lỗi ERRORS để hiển thị
            // hiển thị "GIÁ TRỊ CŨ mà USER nhập" = lastValueInput
            console.log('res.locals.errorsCreateUser = ', res.locals.errorsCreateUser);
            res.render('users/createPage', { errors: res.locals.errorsCreateUser, lastValueInput: req.body });
        }
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