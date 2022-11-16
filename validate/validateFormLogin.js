
module.exports.validateFormLogin = (req, res, next) => {

    // khai báo: "MẢNG" chứa các "MESSAGE LỖI"
        // 1.CHECK: người dùng "có nhập - hay không nhập" - INPUT
    let errors = [];

    if (req.body && !req.body.email) {
        errors.push('error: EMAIL is empty');
    }
    if (req.body && !req.body.password) {
        errors.push('error: PASSWORD is empty');
    }

    if (errors.length > 0) {
        // LỖI: gửi lỗi + dữ liệu cũ mà user nhập
        res.render('auth/login', { errors: errors, lastValueInput: req.body });
        return;
    } else {
        next();     
        // ĐỂ CHUYỂN SANG - "MIDDLEWARE SAU" - check dữ liệu
        // 2.CHECK: dữ liệu trong DB
    }
    
}
