// CẤU HÌNH - DOT.ENV - PROCESS.ENV : biến môi trường.
    const dotenv = require('dotenv');
    dotenv.config();

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;


// CẤU HÌNH - "COOKIE THƯỜNG"
    // app.use(cookieParser());
// CẤU HÌNH - "SIGNED COOKIE" : có thêm - "SECRET STRING - là 1 chuỗi bất kỳ"
console.log('process.env: ', process.env);
console.log('process.env.SECRET_KEY_SIGNED_COOKIE: ', process.env.SECRET_KEY_SIGNED_COOKIE);
console.log('process.env.BIEN_MOI_TRUONG_CACH_3: ', process.env.BIEN_MOI_TRUONG_CACH_3);
app.use(cookieParser(process.env.SECRET_KEY_SIGNED_COOKIE));
// app.use(cookieParser('secretStringLaMotChuoiBatKy'));

// CẤU HÌNH - FILE TĨNH = "STATIC" : nằm ở thư mục "PUBLIC"
var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now())
    }
};
app.use(express.static('public', options)); // thư mục chứa FILE TĨNH = "PUBLIC"

// CẤU HÌNH - "PUG"
app.set('views', './views');    // LINK đến thư mục ./VIEWS
app.set('view engine', 'pug');  // thiết lạp VIEW ENGINE = PUG

// CẤU HÌNH - "BODY-PARSER"
const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// MVC - MODEL : GỌI VÀO = REQUIRE = IMPORT
let userModel = require('./models/userModel');

// 1. require : userRouter
const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');
const productRouter = require('./routers/productRouter');
// 2. require : test MiddleWare Router
const testMiddleWareRouter = require('./routers/testMiddleWareRouter');
const { authRequire } = require('./middleware/authMiddleware');


// ROUTER
app.get('/', authRequire, (req, res) => {
    // res.send('tuantran - hello world');              // trả về TEXT
    // res.send('<h3>tuantran - hello world</h3>');     // trả về HTML : segment + page

    // RES.RENDER - trả về : "PAGE_HTML"
    // TS1: nội dung trong địa chỉ = "views/index.pug"
    // TS2: truyền "biến pageName" vào VIEWS: bằng toán tử {}
    res.render('index', { pageName: 'HomePage' });
})


// 2. app.use - userRouter
// TS1: "PATH GỐC ROUTER" = '/users' - sẽ được gắn vào PATH CON - của userRouter
// TS2: ROUTER = userRouter
    // "thêm MIDDLEWARE - AUTHREQUIRE" vào "trước USER_ROUTER" : "sẽ AUTHENCATION tất cả ROUTER CON" - USER_ROUTER
    app.use('/users', authRequire, userRouter);
    app.use('/products', authRequire, productRouter);
// rieng router nay - ko check auth
app.use('/auth', authRouter);

// 3. xóa bỏ - các router user

app.use('/testMiddleWare', testMiddleWareRouter);


// BÀI 5 - NODEMON: (đã làm ở bài 1) - PACKAGE.JSON: "start": "nodemon --inspect index.js"

app.listen(PORT, () => console.log(`Node Server running on port = ${PORT}`));