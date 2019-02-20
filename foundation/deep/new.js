// new运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一
// person实例
// 可以访问到Person构造函数里的属性
// 可以访问到Person.prototype中的属性
function Person (name, age) {
  this.name = name;
  this.age = age;

  this.habit = 'games';
}
Person.prototype.strength = 100;
Person.prototype.sayName = function () {
  console.log(`I am ${this.name}`);
}

var kan = new Person('kankk', 27);

console.log(kan.name);
console.log(kan.age);
console.log(kan.strength);
console.log(kan.habit);
kan.sayName();

// new的模拟实现
// 实例的__proto__属性会指向构造函数的prototype
function objectFactory_1() {
  // 用new Object()的方式新建了一个对象obj
  var obj = new Object();
  // 取出第一个参数, 就是我们要传入的构造函数. 此外因为shift会修改原数组, 所以arguments会被去除第一个参数
  Constructor = [].shift.call(arguments);
  // 将obj的原型指向构造函数, 这样obj就可以访问到构造函数原型的属性
  obj.__proto__ = Constructor.prototype;
  // 使用apply, 改变构造函数this的指向到新建的对象, 这样obj就可以访问到构造函数中的属性
  Constructor.apply(obj, arguments);
  // 返回obj
  return obj;
}

var mango = objectFactory_1(Person, 'mangokk', 18);
console.log(mango.name);
console.log(mango.age);
console.log(mango.strength);
console.log(mango.habit);
mango.sayName();

// 构造函数的返回值
// 如果返回值是一个对象, 就返回一个对象
// 如果不是对象, 就相当于没有返回值
function objectFactory_2() {
  // 用new Object()的方式新建了一个对象obj
  var obj = new Object();
  // 取出第一个参数, 就是我们要传入的构造函数. 此外因为shift会修改原数组, 所以arguments会被去除第一个参数
  Constructor = [].shift.call(arguments);
  // 将obj的原型指向构造函数, 这样obj就可以访问到构造函数原型的属性
  obj.__proto__ = Constructor.prototype;
  // 使用apply, 改变构造函数this的指向到新建的对象, 这样obj就可以访问到构造函数中的属性
  var ret = Constructor.apply(obj, arguments);
  // 返回值
  return typeof ret === 'object' ? ret : obj;
}