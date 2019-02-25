function isArrayLike(obj) {
  var length = !!obj && "length" in obj && obj.length;
  var typeRes = type(obj);
  if (typeRes === "function" || isWindow(obj)) {
      return false;
  }
  return typeRes === "array" || length === 0 ||
      typeof length === "number" && length > 0 && (length - 1) in obj;
}

// each方法实现

// 第一版
// call的调用会导致性能损失
function each_1 (obj, callback) {
  var length, i = 0;
  if (isArrayLike(obj)) {
    length = obj.length;
    // for循环遍历数组和arrayLike对象
    for(; i < length; i++) {
      // 中止循环
      // if (callback(i, obj[i]) === false) break;
      // 绑定this的上下文
      if (callback.call(obj[i], i, obj[i]) === false) {
        break;
      }
    }
  } else {
    // for-in遍历对象
    for (i in obj) {
      // 中止循环
      // if (callback(i, obj[i]) === false) break;
      // 绑定this的上下文
      if (callback.call(obj[i], i, obj[i]) === false) {
        break;
      }
    }
  }
  
  return obj;
}