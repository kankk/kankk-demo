// ES6
// 检测u修饰符支持
function hasRegExpU() {
  try {
    var pattern = new RegExp(".", "u");
    return true;
  } catch (ex) {
    return false;
  }
}