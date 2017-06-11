const express = require('express');

const app = express();

app.get('/', (req, res) => {
    // res.send('Hello World');
    res.send('你好, 世界');
});

app.listen(3000, () => {
    console.log('app is listening at port 3000');
});