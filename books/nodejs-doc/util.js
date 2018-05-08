const util = require('util');

// util.callbackify(original)
// original <function>: async异步函数
// 返回 <function>: 传统回调函数
// 将async异步函数转换为遵循Node.js回调风格的函数
// 在回调函数中第一个参数err为Promise rejected的原因, 第二个参数则是Promise状态为resolved时的返回值
async function fn01() {
  return await Promise.resolve('hello world');
}
const callbackFn01 = util.callbackify(fn01);
callbackFn01((err, ret) => {
  if (err) throw err;
  console.log(ret);
});
// Note: 回调函数时异步执行的, 并且有异常堆栈错误追踪
// 如果回调函数抛出一个异常, 进程会触发一个'uncaughtException'异常, 如果没有被捕获, 进程将会退出

// util.debuglog(section)
// section <stirng>: 字符串, 指定要为应用的哪些部分创建debuglog函数
// 返回 <function>: 日志函数
// 该方法用于创建一个函数, 基于NODE_DEBUG环境变量的存在与否有条件地写入调试信息stderr.
// 如果section名称在环境变量的值中, 则返回类似于console.error(). 否则, 返回的函数时一个空操作

// util.deprecate(function, string)
// 该函数被调用时, 会返回一个函数, 这个函数会使用process.on('warning')事件触发一个DeprecationWarning
// 默认情况下, 警告只在首次被调用时才能被触发并打印到stderr, 警告被触发之后, 被包装的Function会被调用

// util.format(format[, ...args])
// format <stirng>: 一个类似printf的格式字符串
// 第一个参数是一个字符串, 不包含零个或多个占位符. 每个占位符会被对应参数转换后的值所替换
console.log(util.format('%s %s', 'hello', 'world'));

// util.inherits(constructor, superConstructor)
// 从一个构造函数中继承原型方法到另一个
// Note: 不建议使用, 请使用class和extends

// util.inspect(object[, options])
// object <any>: 任何javascript原始值或对象
// 该方法返回object的字符串表示, 主要用于调试. 附加的options可用于改变格式化字符串

// util.promisify(original)
// 让一个遵循通常的Node.js回调风格的函数返回一个返回值是Promise版本的函数
const fs = require('fs');
const stat = util.promisify(fs.stat);
stat('./temp/fs-test.txt').then( stats => {
  console.log(stats);
}).catch( err => {
  console.log(err);
})