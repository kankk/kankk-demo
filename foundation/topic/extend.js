// extend

// 第一个版本
// jQuery.extend( , target, object1 [, objectN ] )
function extend_1 () {
  var name, options, copy;
  var length = arguments.length;
  var i = 1;
  var target = arguments[0];

  for (; i < length; i++) {
    options = arguments[i];
    if (options != null) {
      for (name in options) {
        copy = options[name];
        if (copy !== undefined) {
          target[name] = copy;
        }
      } 
    }
  }

  return target;
}

// 第二个版本 -> 实现深拷贝
// jQuery.extend( [deep], target, object1 [, objectN ] )
// 注意:
// 1. 需要根据第一个参数的类型, 确定target和要合并的对象的下标起始值
// 2. 如果是深拷贝, 根据copy的类型递归extend
function extend_2() {
  // 默认不进行深拷贝
  var deep = false;
  var name, options, src, copy;
  var length = arguments.length;
  // 记录要复制的对象的下标
  var i = 1;
  // 第一个参数不传布尔值的情况下, target默认是第一个参数
  var target = arguments[0] || {};
  // 如果第一个参数是布尔值, 第二个参数才是target
  if (typeof target == 'boolean') {
    deep = target;
    target = arguments[i] || {};
    i++;
  }
  // 如果target不是对象, 无法进行复制, 所有设为{}
  if (typeof target !== 'object') {
    target = {};
  }

  // 循环遍历要复制的对象
  for (; i < length; i++) {
    // 获取当前对象
    options = arguments[i];
    // 要求不能为空, 避免extend(a,,b)的情况
    if (options != null) {
      for (name in options) {
        // 目标属性
        src = target[name];
        // 要复制的对象的属性值
        copy = options[name];

        if (deep && copy && typeof copy == 'object') {
          target[name] = extend_2(deep, src, copy);
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }

  return target;
}

// jQuery的实现
// isPlainObject 函数来自于  [JavaScript专题之类型判断(下) ](https://github.com/mqyqingfeng/Blog/issues/30)
var class2type = {};
var toString = class2type.toString;
var hasOwn = class2type.hasOwnProperty;

function isPlainObject(obj) {
  var proto, Ctor;
  if (!obj || toString.call(obj) !== "[object Object]") {
    return false;
  }
  proto = Object.getPrototypeOf(obj);
  if (!proto) {
    return true;
  }
  Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
  return typeof Ctor === "function" && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object);
}

function extend() {
  // 默认不进行深拷贝
  var deep = false;
  var name, options, src, copy, clone, copyIsArray;
  var length = arguments.length;
  // 记录要复制的对象的下标
  var i = 1;
  // 第一个参数不传布尔值的情况下，target 默认是第一个参数
  var target = arguments[0] || {};
  // 如果第一个参数是布尔值，第二个参数是 target
  if (typeof target == 'boolean') {
    deep = target;
    target = arguments[i] || {};
    i++;
  }
  // 如果target不是对象，我们是无法进行复制的，所以设为 {}
  if (typeof target !== "object" && !isFunction(target)) {
    target = {};
  }

  // 循环遍历要复制的对象们
  for (; i < length; i++) {
    // 获取当前对象
    options = arguments[i];
    // 要求不能为空 避免 extend(a,,b) 这种情况
    if (options != null) {
      for (name in options) {
        // 目标属性值
        src = target[name];
        // 要复制的对象的属性值
        copy = options[name];

        // 解决循环引用
        if (target === copy) {
          continue;
        }

        // 要递归的对象必须是 plainObject 或者数组
        if (deep && copy && (isPlainObject(copy) ||
            (copyIsArray = Array.isArray(copy)))) {
          // 要复制的对象属性值类型需要与目标属性值相同
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];

          } else {
            clone = src && isPlainObject(src) ? src : {};
          }

          target[name] = extend(deep, clone, copy);

        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }

  return target;
};