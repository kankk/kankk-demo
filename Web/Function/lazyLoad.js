// 惰性载入1
// 在第一次调用的过程中, 该函数会被覆盖为另一个按合适方式执行的函数, 这样对原函数的调用都不用再竟然过执行的分支了
function createXHR() {
  if (typeof XMLHttpRequest != "undefined") {
    createXHR = function () {
      return new XMLHttpRequest();
    };
  } else if (typeof ActiveXObject != "undefined") {
    createXHR = function () {
      if (typeof arguments.callee.activeXString != "string") {
        var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
          i, len;

        for (i = 0, len = versions.length; i < len; i++) {
          try {
            new ActiveXObject(versions[i]);
            arguments.callee.activeXString = versions[i];
            break;
          } catch (ex) {
            // 跳过
          }
        }
      }

      return new ActiveXObject(arguments.callee.activeXString);
    };
  } else {
    createXHR = function () {
      throw new Error("No XHR object available.");
    };
  }
  return createXHR();
}

// 惰性载入2
// 声明函数时就指定适当的函数
var createXHR = (function () {
  if (typeof XMLHttpRequest != "undefined") {
    return function () {
      return new XMLHttpRequest();
    };
  } else if (typeof ActiveXObject != "undefined") {
    return function () {
      if (typeof arguments.callee.activeXString != "string") {
        var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
          i, len;

        for (i = 0, len = versions.length; i < len; i++) {
          try {
            new ActiveXObject(versions[i]);
            arguments.callee.activeXString = versions[i];
            break;
          } catch (ex) {
            // 跳过
          }
        }
      }

      return new ActiveXObject(arguments.callee.activeXString);
    };
  } else {
    return function () {
      throw new Error("No XHR object available.");
    };
  }
})();