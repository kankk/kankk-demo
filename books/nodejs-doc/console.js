// Console类可用于创建一个具有可配置的输出流的简单记录器
// new Console(stdout[, stderr])
// stdout <Writable>
// stderr <Writable>
const {
  Console
} = require('console');
const fs = require('fs');

const output = fs.createWriteStream('./console-stdout.log');
const errorOutput = fs.createWriteStream('./console-stderr.log');

const logger = new Console(output, errorOutput);
logger.log('jianqihua');
logger.error('error');

// console.assert(value[, message][, ...args])
// value <any>
// message <any>
// ...args <any>
// 一个简单的断言测试, 验证value是否为真. 如果不为真, 则抛出AssertionError
console.assert(true);
// console.assert(false, 'console.log(false)');

// console.count([label])
// label <string>: 计数器的显示标签, 默认为defalut
console.count('count');
console.count('count');
console.count('count');

// console.countReset([label='default'])
// label <string>: 计数器的显示标签, 默认为defalut
console.countReset('count');
console.count('count');
console.count('count');
console.count('count');

// console.dir(obj[, options])
// obj <any>
// options <Object>
// options.showHidden <boolean>: 如果为ture, 则该对象中的不可枚举属性和symbol属性也会显示
// options.depth <number>: 告诉util.inspect()函数当格式化对象要递归多少次
// options.colors <boolean>: 如果为true, 则输出带ANSI颜色代码
// 在obj上使用util.inspect()并打印结果字符串到stdout
console.dir({
  name: 'kankk'
});

// console.error([data][, ...args])
// data <any>
// ...args <any>
// 打印到stderr, 可以传入多个参数, 第一个作为主要信息
console.error('error');

// console.warn([data][, ...args])
// data <any>
// ...args <any>
// console.error()的别名
console.warn('warn');

// console.group([...label])
// ...label <any>
// 将后续行的锁紧增加两个空格
console.group('group');

// console.groupEnd()
// 将后续行的缩进减少两个空格
console.groupEnd();

// console.log([data][, ...args])
// data <any>
// ...args <any>
// 打印到stdout, 并带上换行符, 可以传入多个参数, 第一个作为主要信息
console.log('console.log()');

// console.info([data][, ...args])
// data <any>
// ...args <any>
// console.log()的别名
console.info('console.info()');

// console.trace([message][, ...args])
// data <any>
// ...args <any>
// 打印字符串'Trace:'到stderr
console.trace('console.trace()');

// console.time(label)
// ...label <any>
// 启动一个定时器, 用以计算一个操作的持续时间
// 定时器由一个唯一的label标识
// 当调用console.timeEnd()时, 可以使用相同的label来停止定时器, 并以毫秒为单位将持续时间输出到stdout

// console.timeEnd(label)
// ...label <any>
console.time('time');
setTimeout(() => {
  console.timeEnd('time');
}, 1000);