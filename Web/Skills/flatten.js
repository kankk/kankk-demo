const array1 = [1, [2, [3, 4]]];

// method 1 (递归)
function flatten1(arr) {
  let result = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten1(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

// method 2 (toString)
// 使用场景受限, 如果数组是[1, '1', 2, '2']则会产生错误结果
function flatten2(arr) {
  return arr.toString().split(',').map(function (item) {
    return +item;
  });
}

// method 3 (reduce)
function flatten3(arr) {
  return arr.reduce(function (prev, next) {
    return prev.concat(Array.isArray(next) ? flatten3(next) : next);
  }, []);
}

// method 4 (es6 - ...)
function flatten4(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}

// method 5 (from underscore)
// shallow true + strict false ：正常扁平一层
// shallow false + strict false ：正常扁平所有层
// shallow true + strict true ：去掉非数组元素
// shallow false + strict true ： 返回一个[]
function flatten5(input, shallow, strict, output) {
  // 递归使用的时候会用到output
  output = output || [];
  var idx = output.length;

  for (var i = 0, len = input.length; i < len; i++) {

    var value = input[i];
    // 如果是数组，就进行处理
    if (Array.isArray(value)) {
      // 如果是只扁平一层，遍历该数组，依此填入 output
      if (shallow) {
        var j = 0,
          len = value.length;
        while (j < len) output[idx++] = value[j++];
      }
      // 如果是全部扁平就递归，传入已经处理的 output，递归中接着处理 output
      else {
        flatten5(value, shallow, strict, output);
        idx = output.length;
      }
    }
    // 不是数组，根据 strict 的值判断是跳过不处理还是放入 output
    else if (!strict) {
      output[idx++] = value;
    }
  }
  return output;
}

console.log(flatten1(array1));
console.log(flatten2(array1));
console.log(flatten3(array1));
console.log(flatten4(array1));
console.log(flatten5(array1));