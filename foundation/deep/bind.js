// bind()方法会创建一个新函数.
// 当这个新函数被调用时, bind()的第一个参数将会作为它运行时的this,
// 之后的一序列参数将会在传递的实参前传入作为它的参数
var foo = {
  value: 1
};
function bar() {
  console.log(this.value);
}
var bindFoo = bar.bind(foo);
bindFoo();  // 1

// bind的模拟实现
Function.prototype._bind = function (context) {
  var self = this;
  // 获取bind函数从第二个参数到最后一个参数
  var args = Array.prototype.slice.call(arguments, 1);
  return function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    // return self.apply(context);
    return self.apply(context, args.concat(bindArgs));
  }
}

var _bindFoo = bar._bind(foo);
_bindFoo();  // 1

function bar2(name, age) {
  console.log(this.value);
  console.log(name);
  console.log(age);
}

var bindFoo2 = bar2.bind(foo, 'kan');
bindFoo2(27); // 1

// bind
// 一个绑定函数也能使用new操作符创建对象
// 这种行为就像把原函当成构造函数
// 提供的this被忽略, 同时调用时的参数被提供给模拟函数
Function.prototype._bind2 = function (context) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    // 当作为构造函数时, this指向实例, 此时结果为true, 将绑定函数的this指向该实例, 可以让实例获得来自绑定函数的值
    // 当作为普通函数时, this指向window, 此时结果为false, 将绑定函数的this指向context
    return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
  }
  fBound.prototype = this.prototype;
  return fBound;
}

// _bind2的写法中, fBound.prototype = this.prototype, 直接修改了fBound.prototype的时候, 也会直接修改绑定函数的prototype
Function.prototype._bind3 = function (context) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
  }
  // 通过一个空函数来进行中转
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}

// 最终版
Function.prototype.bind = Function.prototype.bind || function (context) {

  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};

  var fBound = function () {
      var bindArgs = Array.prototype.slice.call(arguments);
      return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
  }

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}