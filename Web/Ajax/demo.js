// 响应的XHR对象
// respnseText, respnseXML
// status, statusText

var xhr = createXHR();

// readyState
// 0: 为初始化. 尚未调用open()
// 1: 启动. 已经调用open(), 但尚未调用send()
// 2: 发送. 已经调用send(), 但尚未接收到响应
// 3: 接收. 已经接收到部分响应数据
// 4: 完成. 已经接收到全部响应数据, 而且已经可以在客户端使用了
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      console.log(xhr.respnseText);
    } else {
      console.log("Request was unsuccessful: " + xhr.status);
    }
  }
}

// XMLHttpRequest2的onload代替onreadystatechange
xhr.onload = function () {
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
    console.log(xhr.respnseText);
  } else {
    console.log("Request was unsuccessful: " + xhr.status);
  }
}

xhr.onprogress = function (event) {
  var divStatus = document.getElementById("status");
  if (event.lengthComputable) {
    divStatus.innerHTML = "Received " + event.position + " of " + event.totalSize + " bytes";
  }
}

// 并不会真正发送请求, 而只是启动一个请求以备发送
xhr.open("get", "example.text", false);
xhr.setRequestHeader("MyHeader", "MyValue");
xhr.send(null);


// FormData
xhr.open("post", "postexample.php", false);
var form = document.getElementById("user-info");
xhr.send(new FormData(form));