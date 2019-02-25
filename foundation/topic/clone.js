// 深浅拷贝

// 数组的浅拷贝
// 使用数组的slice, concat返回一个新数组的特性来实现拷贝
var arr_1 = ['old', 1, true, null, undefined];
var new_arr_1 = arr_1.concat();
var new_arr_2 = arr_1.slice();

// 如果数组元素是基本类型, 就会拷贝一份, 互不影响
// 而如果是对象或者数组, 就会只拷贝对象和数组的引用, 无论在新旧数组进行了修改, 两者都会发生变化

// JSON实现数组的深拷贝(不能拷贝函数)
var arr_2 = ['old', 1, true, ['old1', 'old2'], {old: 1}]
var new_arr_3 = JSON.parse( JSON.stringify(arr_2) );
console.log(new_arr_3);

// 浅拷贝的实现
var shallowCopy = function (obj) {
  if (typeof obj !== 'object') return;
  var newObj = obj instanceof Array ? [] : {};
  for (var key in obj) {
    newObj[key] = obj[key];
  }
  return newObj;
}

// 深拷贝的实现(递归)
var deepCopy = function (obj) {
  if (typeof obj !== 'object') return;
  var newObj = obj instanceof Array ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
}