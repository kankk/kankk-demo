
// predicate(item, index, array)
function findIndex_simple(array, predicate, context) {
  for (var i = 0; i < array.length; i++) {
    if (predicate.call(context, array[i], i, array)) return i;
  }
  return -1;
}

console.log(findIndex_simple([1, 2, 2, 3, 4], function(item, i, array){
  if (item == 2) return true;
})) // 1

function findLastIndex_simple(array, predicate, context) {
  var length = array.length;
  for (var i = length - 1; i >= 0; i--) {
    if (predicate.call(context, array[i], i, array)) return i;
  }
  return -1;
}

console.log(findLastIndex_simple([1, 2, 2, 3, 4], function(item, index, array){
  if (item == 2) return true;
})) // 2

// underscore的思路是根据传参的不同, 返回不同的函数
function createIndexFinder (dir) {
  return function (array, predicate, context) {
    var length = array.length;
    var index = dir > 0 ? 0 : length - 1;

    for (; index >= 0 && index < length; index += dir) {
      if (predicate.call(context, array[index], array)) return index;
    }

    return -1;
  }
}
var findIndex = createIndexFinder(1);
var findlastIndex = createIndexFinder(-1);
console.log(findIndex([1, 2, 2, 3, 4], function(item, i, array){
  if (item == 2) return true;
})) // 1
console.log(findlastIndex([1, 2, 2, 3, 4], function(item, i, array){
  if (item == 2) return true;
})) // 2

// indexOf和lastIndexOf的实现
function createIndexOfFinder (dir) {
  return function (array, item) {
    var length = array.length;
    var index = dir > 0 ? 0 : length - 1;
    for (; index >= 0 && index < length; index +=dir) {
      if (array[index] === item) return index;
    }
  }
}
var indexOf = createIndexOfFinder(1);
var lastIndexOf = createIndexOfFinder(-1);
console.log(indexOf([1, 2, 3, 4, 5], 2)); // 1

// 第二版实现
function createIndexOfFinder2 (dir, predicate) {
  return function (array, item, idx) {
    var length = array.length;
    var i = 0;

    if (typeof idx == 'number') {
      if (dir > 0) {
        i = idx >= 0 ? idx : Math.max(length + idx, 0);
      } else {
        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
      }
    }

    // 判断元素是否是NaN
    if (item !== item) {
      // 在截取好的数组中查找第一个满足isNaN函数的元素下标
      idx = predicate(array.slice(i, length), isNaN)
      return idx >= 0 ? idx + i : -1;
    }

    for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
      if (array[index] === item) return idx;
    }
    return -1;
  }
}

// 最终版实现
function createIndexOfFinder(dir, predicate, sortedIndex) {

  return function(array, item, idx){
      var length = array.length;
      var i = 0;

      if (typeof idx == "number") {
          if (dir > 0) {
              i = idx >= 0 ? idx : Math.max(length + idx, 0);
          }
          else {
              length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
          }
      }
      else if (sortedIndex && idx && length) {
          idx = sortedIndex(array, item);
          // 如果该插入的位置的值正好等于元素的值，说明是第一个符合要求的值
          return array[idx] === item ? idx : -1;
      }

      // 判断是否是 NaN
      if (item !== item) {
          idx = predicate(array.slice(i, length), isNaN)
          return idx >= 0 ? idx + i: -1;
      }

      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
          if (array[idx] === item) return idx;
      }
      return -1;
  }
}

var indexOf = createIndexOfFinder(1, findIndex);
var lastIndexOf = createIndexOfFinder(-1, findLastIndex);