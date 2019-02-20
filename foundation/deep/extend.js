// 继承

// 原型链继承
// 缺点: 1. 引用类型的属性被所有实例共享; 2. 在创建Child时, 不能向Parent传参
function Parent1 () {
  this.name = 'parent1';
}
Parent1.prototype.getName = function () {
  console.log(this.name); 
}
function Child1 () {

}
Child1.prototype = new Parent1();
var child1 = new Child1();
console.log(child1.getName());

// 借用构造函数(经典继承)
// 优点: 1. 避免了引用类型的属性被所有实例共享; 2. 可以在Child中向Parent传参
// 缺点: 放在都在构造函数中定义, 每次创建实例都会创建一遍方法
function Parent2 () {
  this.names = [1, 2];
}
function Child2 () {
  Parent2.call(this);
}
var child2_1 = new Child2();
child2_1.names.push(3);
console.log(child2_1.names);  // [ 1, 2, 3 ]
var child2_2 = new Child2();
console.log(child2_2.names);  // [ 1, 2 ]
console.log(child2_2.prototype);  // undefined

// 组合继承
// 优点: 融合原型链继承和构造函数的有点, 是JavaScript中最常见的继承模式
// 缺点: 调用两次父构造函数
function Parent3 (name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}
Parent3.prototype.getName = function () {
  console.log(this.name);
}
function Child3 (name, age) {
  Parent3.call(this, name); // 第二次
  this.age = age;
}
Child3.prototype = new Parent3(); // 第一次
Child3.prototype.constructor = Child3;

var child3_1 = new Child3('kan', 27);
child3_1.colors.push('yellow');
console.log(child3_1.name); // kan
console.log(child3_1.age);  // 27
console.log(child3_1.colors); // [ 'red', 'blue', 'green', 'yellow' ]

var child3_2 = new Child3('mango', 18);
console.log(child3_2.name); // mango
console.log(child3_2.age);  // 18
console.log(child3_2.colors); // [ 'red', 'blue', 'green' ]

// 原型继承
// 这就是Object.create的模拟实现, 将传入的对象作为创建的对象的原型
// 缺点: 包含引用类型的属性值始终都会共享响应的值, 这点跟原型链继承一样
function createObj (o) {
  function F() {};
  F.prototype = o;
  return new F();
}

// 寄生式继承
// 创建一个仅用于封装继承过程的函数, 该函数在内部以某种形式来做增强对象, 最后返回对象
// 缺点: 跟借用构造函数模式一样, 每次创建对象都会创建一遍
function createObj (o) {
  var clone = Object.create(o);
  clone.sayName = function () {
    console.log('hi');
  };
  return clone;
}

// 寄生组合式继承
function Parent4 (name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}
Parent4.prototype.getName = function () {
  console.log(this.name);
}
function Child4 (name, age) {
  Parent4.call(this, name);
  this.age = age;
}
var F = function() {};
F.prototype = Parent4.prototype;
Child4.prototype = new F();

var child4_1 = new Child4('kan', 27);
console.log(child4_1);

// 寄生组合式继承-封装
function object(o) {
  function F() {};
  F.prototype = o;
  return new F();
}
function prototype(child, parent) {
  var prototype = object(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}
prototype(Child, Parent)
// 这种方式值调用了一次Parent构造函数, 并且避免了在Parent.prototype上面创建不必要的, 多余的属性.
// 与此同时, 原型链还能保持不变; 因为能够正常使用instanceof和isPrototypeOf, 是最理想的继承范式