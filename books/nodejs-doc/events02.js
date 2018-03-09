const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

// 当新的监听器被添加时, 所有EventEmitter会触发'newListener'事件
// 当移除已存在的监听器时, 则触发'removeListener'事件

// Note:
// 在添加监听器之前触发事件有一个微妙但重要的副作用: 在'newListener'回调函数中,
// 一个监听器的名字如果和已有监听器名字相同, 则在被插入到EventEmitter实例的内部监听器数组时,
// 该监听器会被添加到其他同名监听器的前面
const myEmitter = new MyEmitter();
myEmitter.once('newListener', (event, listener) => {
  if (event === 'event') {
    myEmitter.on('event', () => {
      console.log('B');
    });
  }
});
myEmitter.on('event', () => {
  console.log('A');
});
myEmitter.emit('event');  // B A

// EventEmitter.defaultMaxListeners
// 每个时间默认可以注册最多10个监听器
// 单个EventEmitter实例的限制可以使用emitter.setMaxListeners(n)方法改变
// 所有EventEmitter实例的默认值可以使用EventEmitter.defaultMaxListeners属性改变
// Note:
// 设置EventEmitter.defaultMaxListeners要谨慎, 因为会影响所有EventEmitter实例, 包括之前创建的
// 因而, 调用emitter.setMaxListeners(n)优先于EventEmitter.defaultMaxListeners

// emitter.addListener(eventName, listener)
// eventName <any>
// listener <Function>
// emitter.on()的别名

// emitter.emit(eventName[, ...args])
// eventName <any>
// ...args <any>: 传入触发函数的参数
// 按监听器的注册顺序, 同步地调用每个注册到名为eventName时间的监听器, 并传入提供的参数
// 如果事件有监听器, 则返回true, 否则返回false

// emitter.eventNames()
// 返回一个列出触发器已注册监听器的事件的数组
console.log(myEmitter.eventNames());

// emitter.getMaxListeners()
// 返回EventEmitter当前的最大监听器限制值
// 该值可以通过emitter.setMaxListeners(n)/EventEmitter.defaultMaxListeners设置
console.log(myEmitter.getMaxListeners());

// emitter.listenerCount(eventName)
// eventName <any>: 正在被监听的事件名
// 返回正在监听名为eventName的事件的监听器的数量
console.log(myEmitter.listenerCount('event'));

// emitter.listeners(eventName)
// 返回名为eventName的事件的监听器数组的副本
console.log(myEmitter.listeners('event'));

// emitter.on(eventName, listener)
// eventName <any>: 事件名
// listener <Function>: 回调函数
// 添加listener函数到名为eventName的事件的监听器数组的末尾. 不会检查listener是否已被添加
// 多次调用并传入相同的eventName和listener会导致listener被添加与调用多次
// emitter.prependListener() 可以用于将事件监听器添加到监听器数组的开头

// emitter.once(eventName, listener)
// 添加一个单次listener函数到名为eventName的事件, 下次触发eventName事件时, 监听器会被移除, 然后调用
// 返回一个EventEmitter引用, 可以链式调用
// // emitter.prependOnceListener() 可以用于将事件监听器添加到监听器数组的开头

// emitter.removeAllListeners([eventName])
// 移除全部或指定eventName的监听器
// Note: 在代码中移除其他地方添加的监听器是一个不好的做法, 尤其是当EventEmitter实例时其他组件或模块创建的

// emitter.removeListener(eventName, listener)
// 从名为eventName的事件的监听器数组中移除指定的listener
// removeListener最多只会从监听器数组里移除一个监听实例. 如果任何单一的监听器被多次添加到制定的eventName的监听器数组中
// 则必须多次调用removeListener才能移除每个实例
// 在事件触发后, 最后一个监听器完成执行前, 任何remove调用都不会从emit()中移除它们

// emitter.setMaxListeners(n)
// 默认情况下, 如果为特定事件添加了超过10个监听器, 则EventEmitter会打印一个警告. 此限制有助于寻找内存泄漏. 
// 但是, 并不是所有的事件都要被限制为10个.
// emitter.setMaxListeners()允许修改制定EventEmitter实例的限制.
// 值设为Infinity/0表明不限制监听器的数量