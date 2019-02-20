// 创建对象的多种方式以及优缺点

// 工厂模式
// 缺点: 对象无法识别, 因为所有的实例都指向一个原型
function createPerson (name) {
  var o = new Object();
  o.name = name;
  o.getName = function () {
    console.log(this.name);
  };
  return o;
}

// 构造函数模式
// 优点: 实例可以识别为一个特定的类型
// 缺点: 每次创建实例时, 每个方法都要被创建一次
function Person_Function (name) {
  this.name = name;
  this.getName = function () {
    console.log(this.name);
  };
}

// 构造函数模式-优化
// 优点: 解决了每个方法都要被重新创建的问题
// 缺点: 写法不友好
function Person_Function_2 (name) {
  this.name = name;
  this.getName = getName;
}
function getName () {
  console.log(this.name);
}

// 原型模式
// 优点: 方法不会重新创建
// 1. 所有的属性和方法都共享; 2. 不能初始化参数
function Person(name) {

}
Person.prototype.name = 'kan';
Person.prototype.getName = function () {
    console.log(this.name);
};

// 原型模式-优化
// 优点: 封装性好了
// 缺点: 重写了原型, 丢失了constructor属性
function Person(name) {

}
Person.prototype = {
  name: 'kan',
  getName: function () {
    console.log(this.name);
  }
}

// 原型模式-再优化
// 优点: 实例可以通过constructor属性找到所属构造函数
// 缺点: 原型模式该有的缺点还是有
function Person(name) {

}
Person.prototype = {
  constructor: Person,
  name: 'kan',
  getName: function () {
    console.log(this.name);
  }
}

// 组合模式 - 构造函数模式和原型模式结合
// 优点: 该共享的共享, 该私有的私有, 使用最广泛的方式
// 缺点: 需要分开写, 不友好
function Person(name) {
  this.name = name;
}
Person.prototype = {
  constructor: Person,
  getName: function () {
    console.log(this.name);
  }
}

// 动态原型模式
// 注意: 使用动态原型模式时, 不能用对象字面量重写原型
function Person (name) {
  this.name = name;
  if (typeof this.getName != 'function') {
    Person.prototype.getName = function () {
      console.log(this.name);
    }
  }
}

// 寄生构造函数模式
function Person (name) {
  var o = new Object();
  o.name = name;
  o.getName = function () {
    console.log(this.name);
  };
  return o;
}

// 稳妥构造函数模式
// 所有稳妥对象, 指的是没有公共属性, 而且其他方法也不引用this对象
// 稳妥对象适合在一些安全的环境中使用
// 无法识别对象所属类型
function Person (name) {
  var o = new Object();
  o.getName = function () {
    console.log(this.name);
  };
  return o;
}