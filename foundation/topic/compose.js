// 函数组合

var toUpperCase = function (x) {
  return x.toUpperCase();
}

var hello = function (x) {
  return 'Hello, ' + x;
}

var greet = function (x) {
  return hello(toUpperCase(x));
}


console.log(greet('kan'));

// compose实现
var compose = function (f,g) {
  return function(x) {
    return f(g(x));
  }
}

var greet = compose(hello, toUpperCase);
console.log(greet('kan'));

// underscore的实现
function _compose () {
  var args = arguments;
  var start = args.length - 1;
  return function () {
    var i = start;
    var result = args[start].apply(this, arguments);
    while (i--) result = args[i].call(this, result);
    return result;
  }
}

var greet = _compose(hello, toUpperCase);
console.log(greet('kan'));

// Pointfree的本质是使用一些通用函数, 组合出各种复杂运算
// 上层运算不要直接操作数据, 而是通过底层函数去处理. 即不使用所要处理的值, 只合成运算过程.

// Pointfree模式的好处
// pointfree模式能够帮助我们减少不必要的命名, 让代码保持简洁和通用, 更符合语义, 测试变得更加简单