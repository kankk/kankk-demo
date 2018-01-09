// 检测其参数是否存在
function existy(x) {
  return x != null;
}

// 判断一个对象是否应该被认为是true的同义词
function truthy(x) {
  return (x !== false ) && existy(x);
}

// 判断只有在某个条件为真的情况下执行某些操作, 否则返回类似undefined或者null的值
function doWhen(cond, action) {
  if(truthy(cond)) {
    return action();
  } else {
    return undefined;
  }
}

function executeIfHasField(target, name) {
  return doWhen(existy(target[name]), function() {
    var result = _.result(target, name);
    console.log(['The result is', result]).join(' ');
    return result;
  });
}
