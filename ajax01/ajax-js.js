
// 跨浏览器的XHR对象
function createXHR() {
  if (typeof XMLHttpRequest != "undefined") {
    return new XMLHttpRequest();
  } else if (typeof ActiveXObject != "undefined") {
    // IE7之前的版本
    if (typeof arguments.callee.activeXString != 'string') {
      var versions = [ "MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
          i, len;

      for (i = 0, len = versions.length; i < len; i++) {
        try {
          new ActiveXObject(versions[i]);
          arguments.callee.activeXString = versions[i];
          break;
        } catch (e) {
          // 跳过
        }
      }
    }

    return new ActiveXObject(arguments.callee.activeXString);
  } else {
    throw new Error("No XHR object available.");
  }
}

// 跨浏览器的CORS
function createCORSRequest(method, url) {
  var xhr = createXHR();
  // withCredentials为带凭证的请求
  // Firefox3.5+, Safari4+ 和 Chrome
  if ("withCredentials" in xhr) {
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {  // XDomainRequest为IE8+的跨域资源请求对象
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    xhr = null;
  }
  return xhr;
}

// XMLHttpRequest 1级的使用方法
// 使用了cors跨域, 简单请求
function ajaxLevel1ByCors() {
  var xhr = createXHR();
  xhr.onreadystatechange = function () {
    // 4表示已经接收到全部响应数据, 而且已经可以在客户端使用了
    if(xhr.readyState === 4) {
      // 200, 成功的标志
      // 304, 请求的资源并没有被修改, 可以直接使用浏览器中缓存的版本
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        alert(xhr.responseText);
      } else {
        alert("Request was unsuccessful: " + xhr.status);
      }
    }
  }
  // 饥人谷提供的支持cors跨域的api <http://api.jirengu.com/>
  xhr.open("get", "http://api.jirengu.com/weather.php", true);
  xhr.send();
}

// XMLHttpRequest 2级的使用方法
// 使用了cors跨域, 简单请求
function ajaxLevel2ByCors() {
  // 饥人谷提供的支持cors跨域的api <http://api.jirengu.com/>
  var request = createCORSRequest("get", "http://api.jirengu.com/weather.php");
  if (request) {
    // XMLHttpRequest 2级中代替onreadystatechange检测成功
    request.onload = function () {
      alert(request.responseText);
    };
    // XMLHttpRequest 2级中代替onreadystatechange检测失败
    request.onerror = function () {
      alert("Request was unsuccessful: " + request.status);
    }
    request.send();
  }
}

// 使用了jsonp跨域
function ajaxLevel1ByJsonp() {
  var tag = document.createElement('script');
  // 饥人谷提供的支持jsonp跨域的api <http://api.jirengu.com/>
  tag.src = "http://api.jirengu.com/weather.php?callback=getWeather";
  document.head.appendChild(tag);
  document.head.removeChild(tag);
}
function getWeather(result) {
  // 返回的是json对象
  alert(JSON.stringify(result));
}
