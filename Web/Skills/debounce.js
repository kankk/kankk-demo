let count = 1;
let containner = document.getElementById('container');

function getUserAction(e) {
  console.log(e);
  containner.innerHTML = count++;
}

// version 1
function debounce1(fn, wait) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  }
}

// version 2
function debounce2(fn, wait) {
  let timeout;

  return function () {
    const context = this;

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fn.apply(context);
    }, wait);
  }
}

// version 3
function debounce3(fn, wait) {
  let timeout;

  return function () {
    const context = this;
    const args = arguments;

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fn.apply(context, args);
    }, wait);
  }
}

// version 3 - es6
function debounce3Byes6(fn, wait) {
  let timeout;

  return function () {
    const args = arguments;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  }
}

// version 4
function debounce4(fn, wait) {
  let timeout, result;

  return function () {
    const context = this;
    const args = arguments;

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      result = fn.apply(context, args);
    }, wait);

    return result;
  }
}

// version 5
function debounce5(fn, wait, immediate) {
  let timeout, result;

  return function () {
    const context = this;
    const args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      let callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) result = fn.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        result = fn.apply(context, args);
      }, wait);
    }
    return result;
  }
}

// version 6
function debounce6(fn, wait, immediate) {
  let timeout, result;

  let debounced = function () {
    const context = this;
    const args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      let callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) result = fn.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        result = fn.apply(context, args);
      }, wait);
    }
    return result;
  }

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  }

  return debounced;
}


// no debounce
// containner.onmousemove = getUserAction;

// with debounce1
// containner.onmousemove = debounce1(getUserAction, 1000);

// with debounce2
// containner.onmousemove = debounce2(getUserAction, 1000);

// with debounce3
// containner.onmousemove = debounce3(getUserAction, 1000);

// with debounce5
containner.onmousemove = debounce5(getUserAction, 1000, true);