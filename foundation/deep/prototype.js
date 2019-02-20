// 构造函数创建一个对象
function Person () {

}

const person = new Person();
person.name = 'Kan';
console.log(person.name);
// 每个JavaScript对象(除了null)都有一个__proto__属性, 这个属性指向该对象的原型
console.log(`person.__proto__ === Person.prototype => ${ person.__proto__ === Person.prototype }`);

// 每个原型都有一个constructor属性指向关联的构造函数
console.log(`Person === Person.prototype.constructor => ${ Person === Person.prototype.constructor }`);

// 获取实例对象原型
console.log(`Object.getPrototypeOf(person) === Person.prototype => ${ Object.getPrototypeOf(person) === Person.prototype }`);

// Object.prototype表示实例原型
// prototype是函数才会有的属性
// 通过prototype扩展原型
Person.prototype.speak = function (content) {
  console.log(`speak: ${content}`);
}

const person1 = new Person();
const person2 = new Person();
person1.speak('person 1');
person2.speak('person 2');

// Person: 构造函数
// Person.prototype: 实例原型

// 当读取实例的属性时, 如果找不到, 就会查找与对象关联的原型中的属性;
// 如果还查不到, 就去找原型的原型, 一直找到最顶层为止
Person.prototype.age = 0;
var person3 = new Person();
person3.age = 27;
console.log(person3.age); // 27
delete person3.age;
console.log(person.age);  // 0

// 实例的prototype的__proto__指向构造函数的prototype
console.log(`Person.prototype.__proto__ => ${Person.prototype.__proto__}`);
console.log(`Person.prototype.__proto__ === Object.prototype => ${Person.prototype.__proto__ === Object.prototype}`);

// Object.prototype的原型 => null
console.log(`Object.prototype.__proto__ => ${Object.prototype.__proto__}`);
