const express = require('express');
const app = express();
const PORT = 3000;

// ROUTER
app.get('/', (req, res) => {
    // res.send('tuantran - hello world');          // trả về TEXT
    res.send('<h3>tuantran - hello world</h3>');    // trả về HTML : segment + page
})


app.get('/users', (req, res) => {
    res.send('<h3>userList</h3>');
})



app.listen(PORT, () => console.log(`Node Server running on port = ${PORT}`));