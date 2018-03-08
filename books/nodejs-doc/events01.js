const EventEmitter = require('events');
// 所有能触发事件的对象都是EventEmitter类的实例
// eventEmitter.on()函数允许将一个或多个函数绑定到会被对象触发的命名事件上
// 事件名通常是驼峰式的字符串

// 当EventEmitter对象触发一个事件时, 所有绑定在该事件上的函数都被同步地调用, 监听器的返回值会被丢弃

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('触发了event的事件!');
});
myEmitter.emit('event');

// eventEmitter.emit()方法允许将任意参数传给监听函数. 
// 当一个普通的监听器函数被EventEmitter调用时, 标准的this会被设置指向监听器所附加的EventEmitter
const myEmitter2 = new MyEmitter();
myEmitter2.on('event', function (a, b) {
  console.log(a, b, this);
});
myEmitter2.emit('event', 'a', 'b');

// 使用ES6的箭头函数, this关键词不再指向EventEmitter实例
const myEmitter3 = new MyEmitter();
myEmitter3.on('event', (a, b) => {
  console.log(a, b, this);
});
myEmitter3.emit('event', 'a', 'b');

// eventEmitter.once()
// 使用该方法时可以注册一个对于特定时间最多被调用一次的监听器, 当时间别触发时, 监听器会被注销掉, 然后再调用
const myEmitter4 = new MyEmitter();
myEmitter4.once('event', (value) => {
  console.log(value);
});
myEmitter4.emit('event', '第一次');
myEmitter4.emit('event', '第二次');  // 只显示'第一次', 不显示'第二次'

// 错误时间
// 当EventEmitter实例中发生错误时, 会触发一个'error'时间. 这在Node.js中是特殊情况
// 如果EventEmitter没有为'error'时间注册至少一个监听器, 则当'error'时间触发时, 会抛出错误, 打印堆栈跟踪, 且退出Node.js进程
const myEmitter5 = new MyEmitter();
// 在process对象的uncaughtException事件上注册监听器可以防止Node.js进程崩溃
// process.on('uncaughtException', (err) => {
//   console.error('发生错误: UncaughtException');
// });
// myEmitter5.emit('error', new Error('wrong!'));

// 作为最佳实践, 应为始终为'error'时间注册监听器
const myEmitter6 = new MyEmitter();
myEmitter6.on('error', (err) => {
  console.error('有错误');
});
myEmitter6.emit('error', new Error('wrong!'));
