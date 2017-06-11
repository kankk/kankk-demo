const express = require('express');
const utility = require('utility');

const app = express();

app.get('/', (req, res) => {
    // res.send('Hello World');
    res.send('你好, 世界');
});

app.get('/md5/', (req, res) => {
    const q = req.query.q;
    if (q) {
        const md5Value = utility.md5(q);
        res.send(md5Value);
    } else {
        res.send('请输入q的值');
    }
});

app.get('/sha1/', (req, res) => {
    const q = req.query.q;
    if (q) {
        const md5Value = utility.sha1(q);
        res.send(md5Value);
    } else {
        res.send('请输入q的值');
    }
});

app.listen(3000, function (req, res) {
    console.log('app is running at port 3000');
});