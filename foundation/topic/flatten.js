// 扁平化
// 数组的扁平化, 就是讲一个嵌套多层的数组转换为只有一层的数组
var arr = [1, [2, [3, 4]]];

// 递归
function flatten_1 (arr) {
  var result = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten_1(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
console.log(flatten_1(arr));

// reduce
function flatten_2 (arr) {
  return arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? flatten_2(next) : next);
  }, []);
}
console.log(flatten_2(arr));

// es6
// console.log([].concat(...arr));
function flatten_3 (arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}
console.log(flatten_3(arr));

// underscore
// input: 要处理的数组
// shallow: 是否只扁平一层
// strict: 是否严格处理元素
// output: 为了方便递归而传递的参数
function flatten_underscore (input, shallow, strict, output) {
  // 递归使用的时候回用到output
  output = output || [];
  var idx = output.length;

  for (var i = 0, len = input.length; i < len; i++) {
    var value = input[i];
    // 如果是数组, 就进行处理
    if (Array.isArray(value)) {
      // 如果是只扁平一层, 遍历该数组, 一次填入output
      if (shallow) {
        var j = 0, length = value.length;
        while (j < length) {
          output[idx++] = value[j++];
        }
      } else {
        flatten_underscore(value, shallow, strict, output);
        idx = output.length;
      }
    } else if (!strict) {
      // 不是数组, 根据strict的值判断是否跳过不处理还是放入output
      output[idx++] = value;
    }
  }
  return output;
}
console.log(flatten_underscore(arr)); // [ 1, 2, 3, 4 ]
console.log(flatten_underscore(arr, true)); // [ 1, 2, [ 3, 4 ] ]
console.log(flatten_underscore(arr, true, true)); // [ 2, [ 3, 4 ] ]