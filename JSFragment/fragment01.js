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

// 检测是否为QQ号
function isQQ(str) {
  // 1 首位不能是0  ^[1-9]
  // 2 必须是 [5, 11] 位的数字  \d{4, 9}
  var reg = /^[1-9][0-9]{4,9}$/gim;
  if (reg.test(str)) {
    console.log('QQ号码格式输入正确');
    return true;
  } else {
    console.log('请输入正确格式的QQ号码');
    return false;
  }
}

// 检查字符串是否为中国合法手机号码
function isChinaPhoneNumber(str) {
  var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/;
  if (reg.test(str)) {
    console.log('手机号码格式输入正确');
    return true;
  } else {
    console.log('请输入正确格式的手机号码');
    return false;
  }
}

// 检查字符串是否为合法Email地址
function isEmail(str) {
  var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
  if (reg.test(str)) {
    console.log('Email格式输入正确');
    return true;
  } else {
    console.log('请输入正确格式的Email');
    return false;
  }
}

// 检查字符串是否是数字
function isNumber(str) {
  var reg = /^\d+$/;
  if (reg.test(str)) {
    console.log(str + '是数字');
    return true;
  } else {
    console.log(str + '不是数字');
    return false;
  }
}

// 去掉前后空格
function trim(str) {
  var reg = /^\s+|\s+$/g;
  return str.replace(reg, '');
}

// 检查字符串是否存在中文
function includeChinese(str) {
  var reg = /[\u4e00-\u9fa5]/gm;
  if (reg.test(str)) {
    console.log(str + ' 中存在中文');
    return true;
  } else {
    console.log(str + ' 中不存在中文');
    return false;
  }
}

// 检查字符串是否为合法邮政编码
function isPostcode(str) {
  // 起始数字不能为0，然后是5个数字  [1-9]\d{5}
  var reg = /^[1-9]\d{5}$/g;
  // var reg = /^[1-9]\d{5}(?!\d)$/;
  if (reg.test(str)) {
    console.log(str + ' 是合法的邮编格式');
    return true;
  } else {
    console.log(str + ' 是不合法的邮编格式');
    return false;
  }
}

// 检查字符串是否为合法身份证号码
function isIDcard(str) {
  var reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
  if (reg.test(str)) {
    console.log(str + ' 是合法的身份证号码');
    return true;
  } else {
    console.log(str + ' 是不合法的身份证号码');
    return false;
  }
}