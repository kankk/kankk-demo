// 去重

var array = [1, 1, 2, 2, '1', '1', '2'];
// 双层循环
// 兼容性好
function unique(array) {
  var res = [];
  for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
    for (var j = 0, resLen = res.length; j < resLen; j++) {
      if (array[i] === res[j]) {
        break;
      }
    }
    if (j === resLen) {
      res.push(array[i]);
    }
  }
  return res;
}
console.log(unique(array)); // [ 1, 2, '1', '2' ]

// indexOf - 简化双层循环的内层循环
function unique2(array) {
  var res = [];
  for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
    var current = array[i];
    if (res.indexOf(current) === -1) {
      res.push(current);
    }
  }
  return res;
}
console.log(unique2(array)); // [ 1, 2, '1', '2' ]

// 排序后去重
function unique3(array) {
  var res = [];
  var sortedArray = array.concat().sort();
  var seen;
  for (var i = 0, len = sortedArray.length; i < len; i++) {
    // 如果是第一个元素或者相邻元素不相同
    if (!i || seen !== sortedArray[i]) {
      res.push(sortedArray[i]);
    }
    seen = sortedArray[i];
  }
  return res;
}
console.log(unique3(array)); // [ 1, '1', 2, '2' ]

// unique api
var array1 = [1, 2, '1', 2, 1];
var array2 = [1, 1, '1', 2, 2];
function unique_api_1 (array, isSorted) {
  var res = [];
  var seen;

  for (var i = 0, len = array.length; i < len; i++) {
    var value = array[i];
    if (isSorted) {
      if (!i || seen !== value) {
        res.push(value)
      }
      seen = value;
    } else if (res.indexOf(value) === -1) {
      res.push(value);
    }
  }
  return res;
}
console.log(unique_api_1(array1)); // [1, 2, "1"]
console.log(unique_api_1(array2, true)); // [1, "1", 2]

// unique api
var array3 = [1, 1, 'a', 'A', 2, 2];
// array: 表示要去重的数组
// isSorted: 表示函数传入的数组是否已排过序, 如果为true, 将会采用更快的方法进行去重
// iteratee: 传入一个函数, 可以对每个元素进行重新计算, 然后根据处理的结果进行去重
function unique_api_2 (array, isSorted, iteratee) {
  var res = [];
  var seen = [];

  for (var i = 0, len = array.length; i < len; i++) {
    var value = array[i];
    var computed = iteratee ? iteratee(value, i, array) : value;
    if (isSorted) {
      if (!i || seen !== computed) {
        res.push(value)
      }
      seen = computed;
    } else if (iteratee) {
      if (seen.indexOf(computed) === -1) {
        seen.push(computed);
        res.push(value);
      }
    } else if (res.indexOf(value) === -1) {
      res.push(value);
    }
  }
  return res;
}
console.log(unique_api_2(array3, false, function(item){
  return typeof item == 'string' ? item.toLowerCase() : item
})); // [1, "a", 2]

// filter实现
function unique4(array) {
  var res = array.filter((item, index, array) => {
    return array.indexOf(item) === index;
  });
  
  // 排序后去重
  // var res = array.concat().sort().filter(function(item, index, array){
  //   return !index || item !== array[index - 1]
  // })
  return res;
}
console.log(unique4(array)); // [ 1, 2, '1', '2' ]

// Object 键值对
var objArray = [{value: 1}, {value: 1}, {value: 2}];
function unique5 (array) {
  var obj = {};
  return array.filter((item, index, array) => {
    console.log(typeof item + JSON.stringify(item));
    return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
  })
}
console.log(unique5(objArray)); // [ { value: 1 }, { value: 2 } ]

// es6
function unique_es6_1 (array) {
  return Array.from(new Set(array));
}
function unique_es6_2 (array) {
  return [...new Set(array)];
}
var unique_es6_3 = array => [...new Set(array)];
function unique_es6_4 (array) {
  const seen = new Map();
  return array.filter(a => !seen.has(a) && seen.set(a, 1))
}