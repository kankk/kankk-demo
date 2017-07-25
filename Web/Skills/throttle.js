let count = 1;
let containner = document.getElementById('container');

function getUserAction(e) {
  console.log(e);
  containner.innerHTML = count++;
}

// version 1 (timestamp)
function throttle1(fn, wait) {
  let context, args;
  let previous = 0;

  return function () {
    const now = +new Date();
    context = this;
    args = arguments;
    if (now - previous > wait) {
      fn.apply(context, args);
      previous = now;
    }
  }
}

// version 2 (timeout)
function throttle2(fn, wait) {
  let context, args;
  let timeout;

  return function () {
    context = this;
    args = arguments;
    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null;
        fn.apply(context, args);
      }, wait);
    }
  }
}

// version 3 (timestamp + timeout)
function throttle3(fn, wait) {
  let timeout, context, args;
  let previous = 0;

  let later = function () {
    previous = +new Date();
    timeout = null;
    fn.apply(context, args);
  };

  let throttled = function () {
    let now = +new Date();
    let remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      fn.apply(context, args);
    } else if (!timeout) {
      timeout = setTimeout(later, remaining);
    }
  };

  return throttled;
}

// version 4 (tiemstamp + tiemout) upgrade
function throttle4(fn, wait, options) {
  let timeout, context, args, result;
  let previous = 0;
  if (!options) options = {};

  let later = function () {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    fn.apply(context, args);
    if (!timeout) {
      context = args = null;
    }
  };

  let throttled = function () {
    let now = new Date().getTime();
    if (!previous && options.leading === false) {
      previous = now;
    }
    let remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      fn.apply(context, args);
      if (!timeout) {
        context = args = null;
      }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
  };

  return throttled;
}

// version 5 (tiemstamp + tiemout) upgrade with cancel
function throttle5(fn, wait, options) {
  let timeout, context, args, result;
  let previous = 0;
  if (!options) options = {};

  let later = function () {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    fn.apply(context, args);
    if (!timeout) {
      context = args = null;
    }
  };

  let throttled = function () {
    let now = new Date().getTime();
    if (!previous && options.leading === false) {
      previous = now;
    }
    let remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      fn.apply(context, args);
      if (!timeout) {
        context = args = null;
      }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = null;
  }

  return throttled;
}

// container.onmousemove = throttle1(getUserAction, 1000);

// container.onmousemove = throttle2(getUserAction, 1000);

// container.onmousemove = throttle3(getUserAction, 1000);

// container.onmousemove = throttle4(getUserAction, 1000, {
//   leading: false, // 第一次是否执行
// });

container.onmousemove = throttle4(getUserAction, 1000, {
  trailing: false, // 最后一次是否执行
});