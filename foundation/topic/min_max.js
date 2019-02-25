var arr = [6, 4, 1, 8, 2, 11, 23];

// 原始方法
var result = arr[0];
for (var i = 1; i < arr.length; i++) {
  result = Math.max(result, arr[i]);
}
console.log(result);

// reduce
console.log(arr.reduce((prev, next) => Math.max(prev, next)));

// 排序
const result_arr = arr.slice().sort((a, b) => a - b);
console.log(result_arr[result_arr.length - 1]);

// eval
console.log(eval(`Math.max(${arr})`));

// apply
console.log(Math.max.apply(null, arr));

// es6
console.log(Math.max(...arr));