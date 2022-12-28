const md5 = require('md5');
const userModel = require('../models/userModel');

// cydb - "MODULE.EXPORTS" (có S) : bản chất là 1 OBJECT
// cydb - "MODULE.EXPORTS" (có S) : tương tự - "EXPORT CONST"

// 1 - CHỨC NĂNG : LOGIN
module.exports.login = async (req, res) => {
    res.render('auth/login');
}

module.exports.loginRequest = async (req, res) => {

    const { email, password } = req.body;

    // 1.CHECK: người dùng "có nhập - hay không nhập" - INPUT (middleware: validateFormLogin)
    // 2.CHECK: dữ liệu trong DB
    let errors = [];

    // find: trả ra MẢNG
    // findOne: trả ra PTU ĐẦU TIÊN
    const currentUser = await userModel.findOne({ email: email });
    // console.log('currentUser', currentUser);

    if (!currentUser) {
        errors.push('error: EMAIL is WRONG');
        res.render('auth/login', { errors: errors, lastValueInput: req.body });
        return;
    } else {
        // if (currentUser.password !== password) {
        if (currentUser.password !== md5(password)) {   // 2.MÃ HÓA PASS = "MD5" : [hashPassword = md5(password)]
            errors.push('error: PASSWORD is WRONG');
            res.render('auth/login', { errors: errors, lastValueInput: req.body });
            return;
        } else {
            // LOGIN THÀNH CÔNG - "GHI COOKIE vào BROWSER" : key = 'userId'; value = currentUser._id

                // "COOKIE - THƯỜNG" : chỉ có [ KEY + VALUE ]
                    // res.cookie('userId', currentUser._id);
                // "SIGNED - COOKIE" : thêm OPTION = { signed: true } : để biến thành - "SIGNED_COOKIE"
                await res.cookie('userId', currentUser._id, { signed: true });
            res.redirect('/');  // ĐÚNG PASSWORD => REDIRECT đến HomePage
        }
    }

}

// 2 - CHỨC NĂNG : LOGOUT
module.exports.logout = async (req, res) => {
    // xóa bỏ COOKIE - "USER_ID" + render ra giao diện LOGIN
    res.clearCookie('userId');  // res.clearCookie("key");
    // res.cookie('userId', '');
    
    res.render('auth/login');
}

// 3 - CHỨC NĂNG : ĐĂNG KÝ THÀNH VIÊN
module.exports.register = async (req, res) => {
    res.render('auth/registerForm');
}
module.exports.registerRequest = async (req, res, next) => {

    // "GỬI-NHẬN" DỮ LIỆU - GIỮA CÁC MIDDLEWARE = "res.locals"
    // console.log('******   "GỬI-NHẬN" DỮ LIỆU - GIỮA CÁC MIDDLEWARE = "res.locals"     ******');
    // console.log('res.locals.passValidateCreateUser = ', res.locals.passValidateCreateUser);

    // console.log('req', req);
    // console.log('req.file', req.file);

    let avatarPath = '';
    if (req && req.file) {
        // ĐƯỜNG DẪN MẪU: "/uploads/830b36f504186b08f074ee0840c89edf"
        avatarPath = '/' + req.file.path.split('\\').slice(1).join('/');
    }
    // console.log('=== avatarPath', avatarPath);

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

        const userRegiter = await userModel.create(userInsert);     // thêm = MODEL.CREATE
        // console.log('userRegiter', userRegiter);
        // console.log('userRegiter._id', userRegiter._id);


        // REGISTER THÀNH CÔNG - "GHI COOKIE vào BROWSER" : key = 'userId'; value = userRegiter._id
            // "COOKIE - THƯỜNG" : chỉ có [ KEY + VALUE ]
                // res.cookie('userId', userRegiter._id);
            // "SIGNED - COOKIE" : thêm OPTION = { signed: true } : để biến thành - "SIGNED_COOKIE"
            await res.cookie('userId', userRegiter._id, { signed: true });
        // điều hướng về trang "HOME" = RES.REDIRECT
        res.redirect('/');  // ĐÚNG PASSWORD => REDIRECT đến HomePage

    } else {
        // TH1 - "CÓ LỖI" : truyền vào mảng lỗi ERRORS để hiển thị
        // hiển thị "GIÁ TRỊ CŨ mà USER nhập" = lastValueInput
        // console.log('res.locals.errorsCreateUser = ', res.locals.errorsCreateUser);
        // console.log('res.body = ', res.body);
        res.render('auth/registerForm', { errors: res.locals.errorsCreateUser, lastValueInput: req.body });
    }

}
