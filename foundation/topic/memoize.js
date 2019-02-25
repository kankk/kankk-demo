// 函数记忆
// 将上次的计算结果缓存起来, 当下次调用时, 如果遇到相同的参数, 就直接返回缓存中的数据

function add (a, b) {
  return a + b;
}

// 基本实现 - from: JavaScript权威指南
var memoize = function (f) {
  var cache = {};
  return function () {
    var key = arguments.length + Array.prototype.join.call(arguments, ', ');
    if (key in cache) {
      return cache[key]
    } else {
      return cache[key] = f.apply(this, arguments);
    }
  }
}

var add = function(a, b, c) {
  return a + b + c
}

var memoizedAdd = memoize(add)
console.time('use memoize')
for(var i = 0; i < 100000; i++) {
    memoizedAdd(1, 2, 3)
}
console.timeEnd('use memoize')
console.time('not use memoize')
for(var i = 0; i < 100000; i++) {
    add(1, 2, 3)
}
console.timeEnd('not use memoize')

// 第二版实现
// hasher: 生产key的函数
var memoize = function (func, hasher) {
  var memoize = function (key) {
    var cache = memoize.cache;
    var address = '' + (hasher ? hasher.apply(this, arguments) : key);
    if (!cache[address]) {
      cache[address] = func.apply(this, arguments);
    }
    return cache[address];
  };
  memoize.cache = {};
  return memoize;
}

var memoizedAdd = memoize(add, function(){
  var args = Array.prototype.slice.call(arguments)
  return JSON.stringify(args)
})

console.log(memoizedAdd(1, 2, 3)) // 6
console.log(memoizedAdd(1, 2, 4)) // 7