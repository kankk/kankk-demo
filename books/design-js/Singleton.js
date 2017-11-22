// 1. 代理实现单例模式
var CreateDiv = function(html) {
  this.html = html;
  this.init();
}
CreateDiv.prototype.init = function() {
  var div = document.createElement('div');
  div.innerHTML = this.html;
  document.body.appendChild(div);
}
var ProxySingletonCreateDiv = (function() { // 引入代理类
  var instance;
  return function(html) {
    if(!instance) {
      instance = new CreateDiv(html);
    }
    return instance;
  }
})();
var a = new ProxySingletonCreateDiv('sven1');
var b = new ProxySingletonCreateDiv('sven2');
console.log(a === b);

// 2. 通用的惰性单例
var getSingle = function(fn) {
  var result;
  return function() {
    return result || (result = fn.apply(this, arguments));
  }
}
// 用法
var createLoginLayer = function() {
  var div = document.createElement('div');
  div.innerHTML = 'Login';
  div.style.display = 'none';
  document.body.appendChild(div);
  return div;
};
var createSingleLoginLayer = getSingle(createLoginLayer);
document.getElementById('loginBtn').onclick = function() {
  var loginLayer = createSingleLoginLayer();
  loginLayer.style.display = 'block';
}