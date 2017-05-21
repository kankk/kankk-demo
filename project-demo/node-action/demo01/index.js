const CountStream = require('./countstream');
let countStream = new CountStream('baidu');
const http = require('http');

http.get('http://www.baidu.com', res => {
    res.pipe(countStream);
});

countStream.on('total', count => {
    console.log('Total matches:', count);
});