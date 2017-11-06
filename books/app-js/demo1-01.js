var Class = function () {
  var klass = function () {
    this.init.apply(this, arguments);
  }

  klass.prototype.init = function () {

  }

  // 定义prototype的别名
  klass.fn = klass.prototype;

  // 定义类的别名
  klass.fn.parent = klass;

  // 给类添加属性
  klass.extend = function (obj) {
    var extended = object.extended; // 回调函数
    for (var i in obj) {
      klass[i] = obj[i];
    }
    if (extended) {
      extended(klass);
    }
  }

  // 给实例添加属性
  klass.include = function (obj) {
    var included = obj.included;
    for (var i in obj) {
      klass.fn[i] = obj[i];
    }
    if (included) {
      included(klass); // 回调函数
    }
  }

  return klass;
}

var Person = new Class;
Person.extend({
  find: function (id) {},
  exists: function (id) {}
});
var person = Person.find(1);

var Person = new Class;
Person.include({
  save: function (id) {},
  destory: function (id) {}
})