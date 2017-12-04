Function.prototype.before = function (beforefn) {
  var _self = this;
  return function () {
    beforefn.apply(this, arguments);

    return _self.apply(this, arguments);
  }
};

Function.prototype.after = function (afterfn) {
  var _self = this;
  return function () {
    var ret = _self.apply(this, arguments);
    afterfn.apply(this, arguments);
    return ret;
  }
};

var a = function () {
  console.log('b');
};

a = a.before(function () {
  console.log('a');
}).after(function () {
  console.log('c');
});

a();

// 不污染原型的AOP
var before = function (fn, beforefn) {
  return function () {
    beforefn.apply(this, arguments);
    return fn.apply(this, arguments);
  }
}

var b = before(function () {
  console.log('3');
}, function () {
  console.log('2');
});

b = before(b, function () {
  console.log('1')
});
b();