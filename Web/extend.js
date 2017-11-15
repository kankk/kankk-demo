// 1. 原型链
function SuperType() {
  this.property = true;
}
SuperType.prototype.getSuperValue = function () {
  return this.property;
};

function SubType() {
  this.subproperty = false;
}
// 继承了SuperType
SubType.prototype = new SuperType();

SubType.prototype.getSuperValue = function () {
  return this.subproperty;
};
var instance = new SubType();
console.log(instance.getSuperValue());

// 2. 借用构造函数
function SuperType() {
  this.colors = ["red", "blue", "green"];
}

function SubType() {
  // 继承了SuperType
  SuperType.call(this);
}
var instance1 = new SubType();
instance1.colors.push("black");
console.log(instance1); // "red", "blue", "green", "black"
var instance2 = new SubType();
console.log(instance2); // "red", "blue", "green"

// 3. 组合继承
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function () {
  console.log(this.name);
};

function SubType(name, age) {
  // 继承属性
  SuperType.call(this, name);
}
// 继承方法
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.property.sayAge = function () {
  console.log(this.age);
}

// 4. 原型式继承
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

// 5. 寄生式继承
function createAnother(original) {
  var clone = Object(original); // 通过调用函数创建一个新对象
  clone.sayHi = function () { // 以某种方式来增强这个对象
    console.log('hi');
  };
  return clone; // 返回这个对象
}

// 6. 寄生组合式继承
function inheritPrototype(subType, superType) {
  var prototype = Object(superType.property);
  prototype.constructor = subType;
  subType.property = prototype;
}

// 7. ES6的extend
class SuperType {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}

class SubType extends SuperType {
  constructor(name, age) {
    super(name);
    this.age = age;
  }

  sayAge() {
    console.log(this.age);
  }
}