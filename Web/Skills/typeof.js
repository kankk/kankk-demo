const number = 1; // [object Number]
const string = '123'; // [object String]
const boolean = true; // [object Boolean]
const und = undefined; // [object Undefined]
const nul = null; // [object Null]
const obj = {
  a: 1
} // [object Object]
const array = [1, 2, 3]; // [object Array]
const date = new Date(); // [object Date]
const error = new Error(); // [object Error]
const reg = /a/g; // [object RegExp]
const func = function a() {}; // [object Function]

function checkType() {
  for (let i = 0; i < arguments.length; i++) {
    console.log(Object.prototype.toString.call(arguments[i]));
  }
}

checkType(number, string, boolean, und, nul, obj, array, date, error, reg, func);
console.log(Object.prototype.toString.call(Math)); // [object Math]
console.log(Object.prototype.toString.call(JSON)); // [object JSON]
(function a() {
  console.log(Object.prototype.toString.call(arguments)); // [object Arguments]
})();

// type api
const class2type = {};
"Boolean Number String Function Array Date RegExp Object Error Null Undefined".split(" ").map(function (item, index) {
  class2type["[object " + item + "]"] = item.toLowerCase();
});

// version 1
function type1(obj) {
  return typeof obj === "object" || typeof obj === "function" ? class2type[Object.prototype.toString.call(obj)] || "object" : typeof obj;
}

// version 2
// 由于在IE6中, null和undefined被识别为[object Object]
function type2(obj) {
  if (obj == null) {
    return obj + "";
  }
  return typeof obj === "object" || typeof obj === "function" ? class2type[Object.prototype.toString.call(obj)] || "object" : typeof obj;
}

function isFunction(obj) {
  return type2(obj) === "function";
}

let isArray = Array.isArray || function (obj) {
  return type(obj) === "array";
}

// window属性指向自身
function isWindow(obj) {
  return obj != null && obj === obj.window;
}

function isArrayLike(obj) {
  // obj必须要有length
  let length = !!obj && "length" in obj && obj.length;
  let typeRes = type2(obj);

  // 排除函数和Window对象
  if (typeRes === "function" || isWindow(obj)) {
    return false;
  }

  return typeRes === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj;
}

// 判断是不是DOM元素
function isElement(obj) {
  return !!(obj && obj.nodeType === 1);
}