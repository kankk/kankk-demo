// 检测对象是否为可迭代对象
function isIterable(object) {
  return typeof object[Symbol.iterator] === "function";
}

// 由于可以动态确定使用哪个基类, 因而可以创建不同的继承方法
// 例如下面的mixin
let SerializableMixin = {
  serialize() {
    return JSON.stringify(this);
  }
};

let AreaMixin = {
  getArea() {
    return this.length * this.width;
  }
};

function mixin(...mixins) {
  let base = function () {};
  Object.assign(base.prototype, ...mixins);
  return base;
}

class Square extends mixin(AreaMixin, SerializableMixin) {
  constructor(length) {
    super();
    this.length = length;
    this.width = length;
  }
}

const x = new Square(3);
console.log(x.getArea()); // 9
console.log(x.serialize()); // {"length":3,"width":3}

// 定义抽象基类
class Shape {
  constructor() {
    if (new.target === Shape) {
      // 限制这个类不能使用new创建
      throw new Error("这个类不能被直接实例化");
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    this.length = length;
    this.width = width;
  }
}

// var x = new Shape(); // 抛出错误
// var y = new Rectangle(3, 4); // 没有错误
// console.log(y instanceof Shape);  // true