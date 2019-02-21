var count = 1;
var container = document.getElementById('container');

function getUserAction(e) {
  console.log(e);
  console.log(this);
  container.innerHTML = count++;
  return count;
}

// container.onmousemove = getUserAction;
// container.onmousemove = debounce1(getUserAction, 100);
// container.onmousemove = debounce2(getUserAction, 100);
// container.onmousemove = debounce3(getUserAction, 100);
// container.onmousemove = debounce4(getUserAction, 100, true);
container.onmousemove = debounce5(getUserAction, 100, true);

// 防抖

// 最小实现
function debounce1(func, wait) {
  var timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  }
}

// this指向正确的对象
function debounce2(func, wait) {
  var timeout;
  return function () {
    var context = this;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      // 指定func的执行上下文
      func.apply(context);
    }, wait);
  }
}

// 支持event对象
function debounce3(func, wait) {
  var timeout;
  return function () {
    var context = this;
    // 获取所有参数
    var args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      // 在执行回调方法时, 把所有参数传入
      func.apply(context, args);
    }, wait);
  }
}
// ---> 到此为止, 防抖函数已经完善了

// ---> 以下是拓展功能

// 立即执行功能
function debounce4(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    if (timeout) clearTimeout(timeout);
    
    if (immediate) {
      // 如果已经执行过, 不再执行
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
  }
}

// 在immediate=true时带返回值
function debounce5(func, wait, immediate) {
  var timeout;
  var result;
  return function () {
    var context = this;
    var args = arguments;
    if (timeout) clearTimeout(timeout);
    
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) result = func.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
    return result;
  }
}

// 取消
function debounce5(func, wait, immediate) {
  var timeout;
  var result;
  var debounced = function () {
    var context = this;
    var args = arguments;
    if (timeout) clearTimeout(timeout);
    
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) result = func.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
    return result;
  }
  // 取消方法
  debounced.cancel = function () {
    // 清空计时器
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}