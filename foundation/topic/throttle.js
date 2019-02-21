var count = 1;
var container = document.getElementById('container');

function getUserAction(e) {
  console.log(e);
  console.log(this);
  container.innerHTML = count++;
  return count;
}

// container.onmousemove = throttle1(getUserAction, 500);
// container.onmousemove = throttle2(getUserAction, 500);
// container.onmousemove = throttle3(getUserAction, 500);
// container.onmousemove = throttle4(getUserAction, 1000);
// container.onmousemove = throttle4(getUserAction, 1000, {
//   leading: false
// });
container.onmousemove = throttle4(getUserAction, 1000, {
  trailing: false
});

// 节流
// 每隔一段时间, 只执行一次事件

// 最小实现 - timestamp
// 会立即执行, 停止触发后没有办法再执行事件
function throttle1 (func, wait) {
  var context;
  var args;
  var previous = 0;

  return function () {
    var now = +new Date();
    context = this;
    args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  }
}

// 最小实现 - 定时器
// n秒后第一次执行, 停止触发后依然会再执行一次事件
function throttle2 (func, wait) {
  var context;
  var args;
  var timeout;

  return function () {
    context = this;
    args = arguments;
    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null;
        func.apply(context, args)
      }, wait);
    }
  }
}

// 最小实现 - timestamp + 定时器
function throttle3 (func, wait) {
  var timeout, context, args;
  var previous = 0;

  var later = function () {
    previous = +new Date();
    timeout = null;
    func.apply(context, args);
  }
  
  var throttled = function () {
    var now = +new Date();
    // 下次触发fucn剩余时间
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 如果没有剩余的时间了或者改了系统时间
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
    } else if (!timeout) {
      timeout = setTimeout(later, remaining);
    }
  };

  return throttled;
}

// 优化 - options
// options.leading: false表示禁止第一次执行
// options.trailing: false表示禁止停止触发的回调
function throttle4 (func, wait, options) {
  var timeout, context, args;
  var previous = 0;
  options = options || {};

  var later = function () {
    previous = options.leading === false ? 0 : +new Date();
    timeout = null;
    func.apply(context, args);
    if (!timeout) context = args = null;
  }
  
  var throttled = function () {
    var now = +new Date();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 如果没有剩余的时间了或者改了系统时间
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
  };

  // 添加取消方法
  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = null;
  }

  return throttled;
}