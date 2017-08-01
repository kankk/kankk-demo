function createXHR() {
  if (typeof XMLHttpRequest != "undefined") {
    return new XMLHttpRequest();
  } else if (typeof ActiveXObject != "undefined") {
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
  } else {
    throw new Error("No XHR object available.");
  }
}

function addURLParam(url, name, value) {
  url += (url.indexOf("?") == -1 ? "?" : "&");
  url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
  return url;
}

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if("withCredentials" in xhr) {
    xhr.open(method, url, true);
  } else if(typeof XDomainRequest != "undefined"){
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    xhr = null;
  }

  return xhr;
}

// 使用XHR对象实现HTTP流
function createStreamingClient(url, progress, finished){

  var xhr = new XMLHttpRequest(), received = 0;

  xhr.open("get", url, true);
  xhr.onreadystatechange = function() {
    var result;

    if(xhr.readyState == 3) {

      // 只取得最新数据并调整计数器
      result = xhr.responseText.substring(received);
      received += result.length;

      // 调用progress回调函数
      progress(result);
    } else if (xhr.readyState == 4) {
      finished(xhr.responseText);
    };

    xhr.send(null);
    return xhr;
  }
}