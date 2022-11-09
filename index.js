const express = require('express');
const app = express();
const PORT = 3000;


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


// ROUTER
app.get('/', (req, res) => {
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
app.use('/users', userRouter);

// 3. xóa bỏ - các router user



// BÀI 5 - NODEMON: (đã làm ở bài 1) - PACKAGE.JSON: "start": "nodemon --inspect index.js"

app.listen(PORT, () => console.log(`Node Server running on port = ${PORT}`));