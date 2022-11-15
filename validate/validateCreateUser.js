
module.exports.validateCreateUser = (req, res, next) => {

    // khai báo: "MẢNG" chứa các "MESSAGE LỖI"
    let errors = [];
    if (req.body && !req.body.name) {
        errors.push('error: NAME is empty');
    }
    if (req.body && !req.body.email) {
        errors.push('error: EMAIL is empty');
    }
    if (req.body && !req.body.password) {
        errors.push('error: PASSWORD is empty');
    }

    // "res.locals" = LÀ 1 OBJECT - TOÀN CỤC
    // "res.locals" = CHUYỀN DỮ LIỆU GIỮA CÁC MIDDLEWARE
    if (errors.length > 0) {
        res.locals.passValidateCreateUser = false;
        res.locals.errorsCreateUser = [...errors];
    } else {
        res.locals.passValidateCreateUser = true;
    }
    next();     // ĐỂ CHUYỂN SANG - "MIDDLEWARE SAU"

}
