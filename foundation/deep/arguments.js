// 类数组对象
var arrayLike = {
  '0': 'name',
  '1': 'age',
  '2': 'sex',
  length: 3
};

console.log(Array.prototype.join.call(arrayLike, ';')); // name;age;sex
console.log(Array.prototype.slice.call(arrayLike)); // [ 'name', 'age', 'sex' ]
console.log(Array.prototype.map.call(arrayLike, item => item.toUpperCase())); // [ 'NAME', 'AGE', 'SEX' ]

// Arguments对象
// Arguments对象只定义在函数体中, 包括了函数的参数和其他属性
// length属性: 表示实参的长度
// callee属性: 通过它可以调用函数自身
// 传入的参数, 实参和arguments的值是共享的, 当没有传入时, 实参与arguments值不共享
// 如果在严格模式下, 实参和arguments是不会共享的