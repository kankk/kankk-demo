const express = require('express');

const superagent = require('superagent');
const cheerio = require('cheerio');

const app = express();

app.get('/', (req, res, next) => {
    superagent.get('https://cnodejs.org').end((err, sres) => {
        if (err) {
            return next(err);
        }
        let $ = cheerio.load(sres.text);
        let items = [];
        $('#topic_list .cell').each((idx, element) => {
            let $cell = $(element);
            let $author = $cell.find($('.user_avatar img'));
            let $title = $cell.find($('.topic_title'));
            items.push({
                title: $title.attr('title'),
                href: $title.attr('href'),
                author: $author.attr('title')
            });
        });

        res.send(items);
    });
});

app.listen(3000, function (req, res) {
    console.log('app is running at port 3000');
});