const eventproxy = require('eventproxy');
const superagent = require('superagent');
const cheerio = require('cheerio');

const url = require('url');

const cnodeUrl = 'https://cnodejs.org/';

// 使用eventproxy
function useEventproxy() {
    superagent.get(cnodeUrl).end((err, res) => {
        if (err) return console.error(err);
        let topicUrls = [];
        let $ = cheerio.load(res.text);
        $('#topic_list .topic_title').each((idx, element) => {
            let $element = $(element);

            let href = url.resolve(cnodeUrl, $element.attr('href'));
            if (topicUrls.length < 11) {
                topicUrls.push(href);
            }
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
                    comment1: $('.reply_content').eq(0).text().trim(),
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
}

function getTopicUrls() {
    return new Promise((resolve, reject) => {
        superagent.get(cnodeUrl).end((err, res) => {
            if (err) reject(err);
            let topicUrls = [];
            let $ = cheerio.load(res.text);
            $('#topic_list .topic_title').each((idx, element) => {
                let $element = $(element);

                let href = url.resolve(cnodeUrl, $element.attr('href'));
                if (topicUrls.length < 11) {
                    topicUrls.push(href);
                }
            });

            resolve(topicUrls);
        });
    });
}

function getTopicUrl(topicUrl) {
    return new Promise((resolve, reject) => {
        superagent.get(topicUrl).end((err, res) => {
            console.log('fetch ' + topicUrl + ' successful');
            let topicHtml = res.text;
            let $ = cheerio.load(topicHtml);
            resolve({
                title: $('.topic_full_title').text().trim(),
                href: topicUrl,
                comment1: $('.reply_content').eq(0).text().trim(),
                author: $('.changes span').eq(1).find($('a')).text().trim(),
                score: url.resolve(cnodeUrl, $('.changes span').eq(1).find($('a')).attr('href'))
            });
        });
    });
}

function getScore(topicObj) {
    return new Promise((resolve, reject) => {
        const scoreUrl = topicObj.score;
        superagent.get(scoreUrl).end((err, res) => {
            console.log('fetch ' + scoreUrl + ' successful');
            let authorHtml = res.text;
            let $ = cheerio.load(authorHtml);
            Object.assign(topicObj, {
                score: $('.user_profile span.big').text().trim()
            });
            resolve(topicObj);
        });
    });
}

function userPromise() {
    getTopicUrls().then(topicUrls => {
        const ps = [];
        for (let topicUrl of topicUrls) {
            ps.push(getTopicUrl(topicUrl));
        }
        Promise.all(ps).then(topics => {
            const ps2 = [];
            for (let topic of topics) {
                ps2.push(getScore(topic));
            }
            Promise.all(ps2).then(result => {
                console.log(result);
            });
        });
    }).catch(err => {
        console.log(err);
    });
}

// useEventproxy();
userPromise();