// 偏函数
// 在计算机科学中，局部应用是指固定一个函数的一些参数，然后产生另一个更小元的函数。
// 什么是元？元是指函数参数的个数，比如一个带有两个参数的函数被称为二元函数。

// 基础实现版本
function partial_base(fn) {
  var args = [].slice.call(arguments, 1);
  return function () {
    var newArgs = args.concat([].slice.call(arguments));
    return fn.apply(this, newArgs);
  };
};

// 支持占位符的版本
var _ = {};

function partial(fn) {
  var args = [].slice.call(arguments, 1);
  return function () {
    var position = 0,
      len = args.length;
    for (var i = 0; i < len; i++) {
      args[i] = args[i] === _ ? arguments[position++] : args[i]
    }
    while (position < arguments.length) args.push(arguments[position++]);
    return fn.apply(this, args);
  };
};