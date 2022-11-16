const userModel = require("../models/userModel");

module.exports.authRequire = (req, res, next) => {
    console.log('ĐỌC COOKIES = req.cookies', req.cookies);

    if (!req.cookies.userId) {
        res.redirect('auth/login');
        return;
    }

    // req.cookies.userId : có giá trị là USER_ID - đc GHI VÀO BROWSER khi LOGIN THÀNH CÔNG
    // check trong DB- nếu không có ID đó - thì REDIRECT về trang LOGIN !
    const currentUser = userModel.find({ _id: req.cookies.userId });

    if (!currentUser) {
        res.redirect('auth/login');
        return;
    }

    next();
}