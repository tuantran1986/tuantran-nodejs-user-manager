const userModel = require('../models/userModel');

// cydb - "MODULE.EXPORTS" (có S) : bản chất là 1 OBJECT
// cydb - "MODULE.EXPORTS" (có S) : tương tự - "EXPORT CONST"

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
        if (currentUser.password !== password) {
            errors.push('error: PASSWORD is WRONG');
            res.render('auth/login', { errors: errors, lastValueInput: req.body });
            return;
        } else {
            // LOGIN THÀNH CÔNG - "GHI COOKIE vào BROWSER" : key = 'userId'; value = currentUser._id
            res.cookie('userId', currentUser._id);
            res.redirect('/');  // ĐÚNG PASSWORD => REDIRECT đến HomePage
        }
    }

}