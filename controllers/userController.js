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

    // 1 - CREATE USER: NEXT() : để chuyển sang middleWare sau
    module.exports.createRequest = async (req, res, next) => {

        // "GỬI-NHẬN" DỮ LIỆU - GIỮA CÁC MIDDLEWARE = "res.locals"
        console.log('******   "GỬI-NHẬN" DỮ LIỆU - GIỮA CÁC MIDDLEWARE = "res.locals"     ******');
        console.log('res.locals.passValidateCreateUser = ', res.locals.passValidateCreateUser);

        // console.log('req', req);
        // console.log('req.file', req.file);

        let avatarPath = '';
        if (req && req.file) {
            // ĐƯỜNG DẪN MẪU: "/uploads/830b36f504186b08f074ee0840c89edf"
            avatarPath = '/' + req.file.path.split('\\').slice(1).join('/');
        }
        console.log('=== avatarPath', avatarPath);


        if (res.locals.passValidateCreateUser === true) {
            // TH2 - "KO LỖI" : tạo USER và thêm vào DB
            // const userInsert = req.body;        // lấy dữ liệu từ FORM - POST: "REQ.BODY"

            const hashPassWord = md5(req.body.password);    // 1.mã hóa password = MD5
            const userInsert = {
                name: req.body.name,
                email: req.body.email,
                avatar: avatarPath,         // thêm AVATAR = "chuỗi STRING"
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

    // 2 - GET DETAILS:
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


    // 3 - DELETE USERS:
    module.exports.deleteForm = async (req, res) => {
        // CYDB - DETAILS 3 - lấy dữ liệu từ URL bằng "HAI CHẤM - REQUEST.PARAMS"
        const paramsUrl = req.params;
        const userId = paramsUrl.id;
    
        // CYDB - DETAILS 4 - TRUY VẤN DỮ LIỆU = "Model.findOne"
        const userDetail = await userModel.findOne({ _id: userId });   // cydb - AWAIT
        // Model.findOne : trả về "1 phần tử"   // Model.find : trả về "MẢNG phần tử"
    
        // 1.render ra "giao dien - CONFIRM DELETE USER"
        res.render('users/deleteForm', { user: userDetail });
    }
    module.exports.deleteRequest = async (req, res) => {
        // CYDB - DETAILS 3 - lấy dữ liệu từ URL bằng "HAI CHẤM - REQUEST.PARAMS"
        const paramsUrl = req.params;
        const userId = paramsUrl.id;
    
        // CYDB - DETAILS 4 - XÓA DỮ LIỆU = "Model.deleteOne"
        const userDelete = await userModel.deleteOne({ _id: userId });   // cydb - AWAIT
        
        // Model.find : trả về "MẢNG phần tử"   // Model.findOne : trả về "1 phần tử"
        const userList = await userModel.find({});

        // CYDB - sau khi xóa dữ liệu xong - thì hiển thị LISTUSERS mới
        res.render('users/index', { listUsers: userList || [] });
    }

    // 4 - UPDATE USERS:
    module.exports.updateForm = async (req, res) => {
        // CYDB - DETAILS 3 - lấy dữ liệu từ URL bằng "HAI CHẤM - REQUEST.PARAMS"
        const paramsUrl = req.params;
        const userId = paramsUrl.id;
    
        // CYDB - DETAILS 4 - TRUY VẤN DỮ LIỆU = "Model.findOne"
        const userDetail = await userModel.findOne({ _id: userId });   // cydb - AWAIT
        // Model.findOne : trả về "1 phần tử"   // Model.find : trả về "MẢNG phần tử"
    
        // CHƯA REVERT ĐC: HASH_PASSWORD về PASSWORD THƯỜNG
        const userUpdate = {
            _id: userDetail._id,
            name: userDetail.name,
            email: userDetail.email,
            password: '',
            avatarUser: '',
        }

        // 1.render ra "giao dien - CONFIRM UPDATE USER"
        res.render('users/updateForm', { lastValueInput: userUpdate });
    }
    
    module.exports.updateRequest = async (req, res) => {
        // CYDB - DETAILS 3 - lấy dữ liệu từ URL bằng "HAI CHẤM - REQUEST.PARAMS"
        const paramsUrl = req.params;
        const userId = paramsUrl.id;
        
        let avatarPath = '';
        if (req && req.file) {
            avatarPath = '/' + req.file.path.split('\\').slice(1).join('/');
            // ĐƯỜNG DẪN MẪU: "/uploads/830b36f504186b08f074ee0840c89edf"
        }
        console.log('=== avatarPath', avatarPath);

        if (res.locals.passValidateCreateUser === true) {
            // TH2 - "KO LỖI" : UPDATE USER cập nhật dữ liệu vào DB = MODEL.UPDATE ONE
            // const userInsert = req.body;        // lấy dữ liệu từ FORM - POST: "REQ.BODY"
            const hashPassWord = md5(req.body.password);    // 1.mã hóa password = MD5
            const userInsert = {
                _id: userId,
                name: req.body.name,
                email: req.body.email,
                avatar: avatarPath,         // thêm AVATAR = "chuỗi STRING"
                password: hashPassWord      // 1.mã hóa password = MD5
            };
            
            // CYDB - DETAILS 4 - XÓA DỮ LIỆU = "Model.updateOne"
            const userList = await userModel.updateOne({ _id: userId }, userInsert);     // thêm = MODEL.UPDATE_ONE
            
            // CYDB - sau khi xóa dữ liệu xong - thì hiển thị LISTUSERS mới = điều hướng về trang "/users" = RES.REDIRECT
            res.redirect('/users');
        } else {
            // TH1 - "CÓ LỖI" : truyền vào mảng lỗi ERRORS để hiển thị
            // hiển thị "GIÁ TRỊ CŨ mà USER nhập" = lastValueInput
            console.log('res.locals.errorsCreateUser = ', res.locals.errorsCreateUser);
            res.render('users/updateForm', { errors: res.locals.errorsCreateUser, lastValueInput: {...req.body,
                _id: userId
            } });
        }
    }
