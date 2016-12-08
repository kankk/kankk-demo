// 工厂模式
function createPerson(name, age, job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function() {
        console.log(this.name);
    };
    return o;
}

var person1 = createPerson("Xiaoming", 20, "Student");
console.log(typeof person1); // object





// 构造函数模式
function Person1(name, age, job) {
    this.name = name;
    this.age = age;
    this.sayName = function() {
        console.log(this.name);
    };
}

var person11 = new Person1("Xiaoming", 20, "Student");
var person12 = new Person1("Xiaohong", 22, "Teacher");
console.log(person11.name == person12.name); // false
console.log(person11.sayName == person12.sayName); // false
console.log(person11.constructor == Person1); // true
console.log(person12.constructor == Person1); // true





// 原型模式
function Person2() {}
Person2.prototype.name = 'name';
Person2.prototype.age = -1;
Person2.prototype.cars = [];
Person2.prototype.sayName = function() {
    console.log(this.name);
};

var person21 = new Person2();
person21.name = 'Xiaoming';
person21.cars.push('hongguang');
console.log(person21.name); // 'Xiaoming', 来自实例
console.log(person21.age); // -1, 来自原型
var person22 = new Person2();
// 原型模式中的实例被共享
console.log(person22.cars); // 'hongguang', 来自原型
console.log(person21.cars === person22.cars); // true, 他们都共享了cars了





// 构造函数模式和原型模式组合
function Person3(name, age) {
    this.name = name;
    this.age = age;
    this.cars = [];
}
Person3.prototype = {
    constructor: Person3,
    sayName: function() {
        console.log(this.name);
    }
};

var person31 = new Person3("Xiaoming", 20, "Student");
var person32 = new Person3("Xiaohong", 22, "Teacher");
console.log(person31.name === person32.name); // false
console.log(person31.sayName === person31.sayName); // true
person31.cars.push('hongguang');
console.log(person31.cars); // ["hongguang"]
console.log(person32.cars); // []
