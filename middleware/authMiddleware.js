const userModel = require("../models/userModel");

module.exports.authRequire = async (req, res, next) => {
    console.log('ĐỌC COOKIES = req.cookies', req.cookies);

    if (!req.cookies.userId) {
        res.redirect('/auth/login');
        return;
    }

    // req.cookies.userId : có giá trị là USER_ID - đc GHI VÀO BROWSER khi LOGIN THÀNH CÔNG
    // check trong DB- nếu không có ID đó - thì REDIRECT về trang LOGIN !
                // cydb - ĐỌC DỮ LIỆU:          DATABASE = "ASYNC + AWAIT"
    const currentUser = await userModel.findOne({ _id: req.cookies.userId });

    if (!currentUser) {
        res.redirect('/auth/login');
        return;
    }

    // truyền USER từ CONTROLLER sang VIEW-LAYOUT: để hiển thị trên NAV = "res.locals" là BIẾN TOÀN CỤC - bản chất OBJECT.
    res.locals.currentUserLocal = currentUser;
        // console.log('currentUser', currentUser);
        // console.log('res.locals.currentUserLocal', res.locals.currentUserLocal);

    next();
}