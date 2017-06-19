var int1 = function (str) {
    return +str;
};

var int2 = function (str) {
    return parseInt(str, 10);
};

var int3 = function (str) {
    return Number(str);
};

var number = '100';

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
// 添加测试
suite
    .add('+', function () {
        int1(number);
    })
    .add('parseInt', function () {
        int2(number);
    })
    .add('Number', function () {
        int3(number);
    })
    // 每个测试跑完后，输出信息
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    // 这里的 async 不是 mocha 测试那个 async 的意思，这个选项与它的时间计算有关，默认勾上就好了。
    .run({
        'async': true
    });