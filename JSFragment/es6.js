// 检测对象是否为可迭代对象
function isIterable(object) {
  return typeof object[Symbol.iterator] === "function";
}