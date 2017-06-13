const eventproxy = require('eventproxy');
const superagent = require('superagent');
const cheerio = require('cheerio');

const url = require('url');

const cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl).end((err, res) => {
    if (err) return console.error(err);
    let topicUrls = [];
    let $ = cheerio.load(res.text);
    $('#topic_list .topic_title').each((idx, element) => {
        let $element = $(element);

        let href = url.resolve(cnodeUrl, $element.attr('href'));
        topicUrls.push(href);
    });

    console.log(topicUrls);
    const ep = new eventproxy();

    ep.after('topic_html', topicUrls.length, topics => {

        topics = topics.map(topicPair => {
            let topicUrl = topicPair[0];
            let topicHtml = topicPair[1];
            let $ = cheerio.load(topicHtml);
            return ({
                title: $('.topic_full_title').text().trim(),
                href: topicUrl,
                author: $('.changes span').eq(1).find($('a')).text().trim()
            });
        });

        console.log('final:');
        console.log(topics);
    });

    topicUrls.forEach(topicUrl => {
        superagent.get(topicUrl).end((err, res) => {
            console.log('fetch ' + topicUrl + ' successful');
            ep.emit('topic_html', [topicUrl, res.text]);
        });
    });
});