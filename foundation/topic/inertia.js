// 惰性函数

// 普通方法
// 缺点: 污染了全局变量, 每次调用foo都要判断一次
var t;
function foo() {
  if (t) return t;
  t = new Date();
  return t;
}

// 闭包
var foo_2 = (function() {
  var t;
  return function () {
    if (t) return t;
  t = new Date();
  return t;
  }
})();

// 函数对象
function foo_2 () {
  if (foo_2.t) return foo_2.t;
  foo_2.t = new Date();
  return foo_2.t;
}

// 惰性函数
// 原理: 重写函数
var inertia = function () {
  var t = new Date();
  inertia = function () {
    return t;
  };
  return inertia();
}