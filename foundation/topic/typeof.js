// typeof
// typeof是一元运算符, 放在其单个操作数的前面, 操作数可以是任意类型. 返回值为表示操作数类型的一个字符串

// typeof会返回object的类型: Object, Null, Array, Function, Date, RegExp, Error

// 以下是11种：
var number = 1;          // [object Number]
var string = '123';      // [object String]
var boolean = true;      // [object Boolean]
var und = undefined;     // [object Undefined]
var nul = null;          // [object Null]
var obj = {a: 1}         // [object Object]
var array = [1, 2, 3];   // [object Array]
var date = new Date();   // [object Date]
var error = new Error(); // [object Error]
var reg = /a/g;          // [object RegExp]
var func = function a(){}; // [object Function]

function checkType() {
  for (var i = 0; i < arguments.length; i++) {
    console.log(Object.prototype.toString.call(arguments[i]))
  }
}

checkType(number, string, boolean, und, nul, obj, array, date, error, reg, func)
console.log(Object.prototype.toString.call(Math)); // [object Math]
console.log(Object.prototype.toString.call(JSON)); // [object JSON]

// 通用的type方法(jQuery实现)
var class2type = {};
// 生成class2type映射
"Boolean Number String Function Array Date RegExp Object Error".split(" ").map(function(item, index) {
  class2type["[object " + item + "]"] = item.toLowerCase();
})
function type(obj) {
  // 一箭双雕
  if (obj == null) {
    return obj + "";
  }
  return typeof obj === "object" || typeof obj === "function" ?
    class2type[Object.prototype.toString.call(obj)] || "object" :
    typeof obj;
}

// plainObject => 纯粹对象
// 纯粹对象: 改对象是通过'{}'或'new Object'创建的, 该对象含有零个或者多个键值对
// 判断plainObject的目的是为了跟其他JavaScript对象入null, 数组, 宿主对象(documents)等作区分, 以为这些用typeof都会返回object

// jQuery3.0的实现
var class2type = {};
// 相当于 Object.prototype.toString
var toString = class2type.toString;
// 相当于 Object.prototype.hasOwnProperty
var hasOwn = class2type.hasOwnProperty;
function isPlainObject(obj) {
    var proto, Ctor;

    // 排除掉明显不是obj的以及一些宿主对象如Window
    if (!obj || toString.call(obj) !== "[object Object]") {
        return false;
    }

    /**
     * getPrototypeOf es5 方法，获取 obj 的原型
     * 以 new Object 创建的对象为例的话
     * obj.__proto__ === Object.prototype
     */
    proto = Object.getPrototypeOf(obj);

    // 没有原型的对象是纯粹的，Object.create(null) 就在这里返回 true
    if (!proto) {
        return true;
    }

    /**
     * 以下判断通过 new Object 方式创建的对象
     * 判断 proto 是否有 constructor 属性，如果有就让 Ctor 的值为 proto.constructor
     * 如果是 Object 函数创建的对象，Ctor 在这里就等于 Object 构造函数
     */
    Ctor = hasOwn.call(proto, "constructor") && proto.constructor;

    // 在这里判断 Ctor 构造函数是不是 Object 构造函数，用于区分自定义构造函数和 Object 构造函数
    return typeof Ctor === "function" && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object);
}

console.log(isPlainObject({})); // true
console.log(isPlainObject(new Object())); // true
console.log(isPlainObject(global)); // false

// EmptyObject
// jQuery提供isEmptyObject方法来判断是否是空对象
function isEmptyObject (obj) {
  var name;
  // 判断是否有属性
  for (name in obj) {
    return false;
  }
  return true;
}

// isArrayLike
// jQuery实现的isArrayLike, 数组和类数组都会返回true
function isArrayLike(obj) {

  // obj 必须有 length属性
  var length = !!obj && "length" in obj && obj.length;
  var typeRes = type(obj);

  // 排除掉函数和 Window 对象
  if (typeRes === "function" || isWindow(obj)) {
      return false;
  }

  // 至少满足三个条件之一
  // 1. 数组
  // 2. 长度为0
  // 3. lengths属性是大于0的数字类型, 并且obj[length - 1]必须存在
  return typeRes === "array" || length === 0 ||
      typeof length === "number" && length > 0 && (length - 1) in obj;
}

// isElement
// 判断是不是DOM元素
function isElement (obj) {
  return !!(obj && obj.nodeType === 1);
}