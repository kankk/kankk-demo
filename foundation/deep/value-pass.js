// ECMAScript中所有函数的参数都是按值传递的

// 值传递
var numberValue = 1;
function foo(v) {
  v = 2;
  console.log(v); // 2
}
foo(numberValue);
console.log(numberValue); // 1

// 对象的值传递 -> 共享传递
// 在传递对象的时候, 传递对象的引用的副本
var objectValue = {
  value: 1
};
function bar(o) {
  o.value = 2;
  console.log(o.value); // 2
}
bar(objectValue);
console.log(objectValue.value); // 2

// 该例子表示JavaScript不是引用传递的
function foobar(o) {
  o = 3;
  console.log(o); // 3
}
foobar(objectValue);
console.log(objectValue.value); // 2

// 注意: 按引用传递是传递对象的引用, 而按共享传递是传递对象的引用的副本(副本拷贝也是一种值的拷贝)
// 结论: 如果参数是基本类型是按值传递, 如果是引用类型按共享传递