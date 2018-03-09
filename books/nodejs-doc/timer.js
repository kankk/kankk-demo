// timer
// timer模块暴露了一个全局的API, 用于在某个未来时间段调用调度函数
// timer与浏览器的不同, 它是基于Node.js事件循环构建的

// Immediate类
// 该对象是内部创建的, 并从setImmediate()返回.
// 可以传给clearImmediate()以便取消预订的动作

// Timeout类
// 该对象是内部创建的, 并从setTimeout() / setinterval()返回.
// 可以传给clearTimeout() / setinterval()以便取消预订的动作

// 默认情况下, 当使用setTimeout() / setInterval()预订一个定时器时, 只要定时器处于活动状态, Node.js事件循环就会继续运行.
// 每个由这些函数返回的Timeout对象都导出了可用于控制这个默认行为的timeout.ref()和timeout.unref()函数.

// timeout.ref()
// 调用时, 只要Timeout处于活动状态就要求Node.js事件循环不要退出
// 通常不需要调用timeout.ref(), 除非之前调用了timeout.unref()

// timeout.unref()
// 调用时, 活动的Timeout对象不要求Node.js时间循环保持活动.
// 如果没有其他活动保持时间循环运行, 则进程可能在Timeout对象的回调被调用之前退出
// Note: 调用timeout.unref()会创建一个内部定时器, 它会唤醒Node.js的事件循环
// 创建太多这类的定时器可能会对Node.js应用程序的性能产生负面影响

// setImmediate(callback[, ...args])
// 预定立即执行的callback, 它是在I/O事件的回调之后被触发. 返回一个用于clearImmediate()的Immdiate
// 当多次调用setImmediate()时, callback函数会按照它们被创建的顺序依次执行. 每次事件循环迭代都会处理整个回调队列
// 如果一个立即定时器是被一个正在执行的回调排入队列的, 则该定时器知道下一次事件循环迭代才会被触发
const immediate = setImmediate(() => {
  console.log('setImmediate');
});

// clearImmediate(immediate)
// 取消一个由setImmediate()创建的Immediate对象
clearImmediate(immediate);

// setInterval(callback, delay[, ...args])
// 预定每隔delay毫秒重新执行callback. 返回一个用于clearInterval()的Timeout
const interval = setInterval(() => {
  console.log('setInterval');
});

// clearInterval(timeout)
// 取消一个由setInterval()创建Timeout对象
clearInterval(interval);

// setTimeout(callback, delay[, ...args])
// 预定在delay毫秒之后执行一次callback. 返回一个用于clearTimeout()的Timeout
const timer = setTimeout(() => {
  console.log('setTimeout');
});

// clearTimeout(timeout)
// 取消一个由setTimeout()创建的Timeout对象
clearTimeout(timer);