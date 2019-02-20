// call: call()方法在使用一个指定的this值和若干个指定的参数值的前提下调用某个函数和方法
var foo = {
  value: 1
};

function bar(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
}

bar(); // undefined
// call改变了this的指向, 指向到foo
bar.call(foo); // 1

// call的模拟实现
Function.prototype._call = function (context) {
  var context = context || window || global;
  context.fn = this; // 将函数设为对象的属性
  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
  }
  // 这里args会自动调用Array.toString()方法, 等于args.join(',')
  var result = eval('context.fn(' + args + ')');
  // context.fn(); // 执行该函数
  delete context.fn; // 删除该函数
  return result;
}

bar._call(foo, 'kan', 27);
// console.log(bar._call(foo, 'kan', 27));

// apply的模拟实现
Function.prototype._apply = function (context, arr) {
  var context = Object(context) || window || global;
  context.fn = this;

  var result;
  if (!arr) {
    result = context.fn();
  } else {
    var args = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push('arr[' + i + ']');
    }
    result = eval('context.fn(' + args + ')')
  }
  delete context.fn
  return result;
}

bar._apply(foo, ['kan', 27]);