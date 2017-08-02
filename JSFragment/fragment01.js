// 手机类型判断
const BrowserInfo = {
  userAgent: navigator.userAgent.toLocaleLowerCase(),
  isAndroid: Boolean(navigator.userAgent.match(/android/ig)),
  isIPhone: Boolean(navigator.userAgent.match(/iphone|ipod/ig)),
  isIPad: Boolean(navigator.userAgent.match(/ipad/ig)),
  isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/ig))
}

// 返回字符串长度, 汉字计数为2
function strLength(str) {
  let count = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    if (str.charCodeAt(i) > 255) {
      count += 2;
    } else {
      count++;
    }
  }
  return count;
}

// 获取url中的参数
function getQueryStringRegExp(name, url) {
  const reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
  if (reg.test(url)) {
    return decodeURIComponent(RegExp.$2.replace(/\+/g, " "));
  } else {
    return "";
  }
}

// 回车提交
$("id").onkeypress = function (event) {
  event = (event) ? event : ((window.event) ? window.event : "");
  let keyCode = event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode);
  if (keyCode == 13) {
    $("Submit").onclick();
  }
}