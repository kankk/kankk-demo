// 将array-like对象转为数组
// ie8及其更早版本会将NodeList实现为一个COM对象
function convertToArray(nodes) {
  var array = null;
  try {
    array = Array.prototype.slice.call(nodes, 0);
  } catch (ex) {
    // 当为ie8及其更早版本时
    array = new Array();
    for (var i = 0, len = nodes.length; i < len; i++) {
      array.push(nodes[i]);
    }
  }
  return array;
}

// 遍历元素的特性
function outputAttributes(element) {
  var pairs = new Array(),
    attrName, attrValue, i, len;

  for (i = 0, len = element.attributes.length; i < len; i++) {
    attrName = element.attributes[i].nodeName;
    attrValue = element.attributes[i].nodeValue;
    // 兼容ie7及其更早版本的
    if (element.attributes[i].specified) {
      pairs.push(attrName + '="' + attrValue + '"');
    }
  }

  return pairs.join(" ");
}

// 动态脚本
function loadScript(url) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  document.body.appendChild(script); // 当执行这行时才会下载外部js文件
}

// 加载字符串代码
function loadScriptString(code) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  try {
    script.appendChild(document.createTextNode(code));
  } catch (ex) {
    // 因为IE将<scprit>视为一个特殊的元素, 不允许访问DOM访问其节点
    script.text = code;
  }
  document.body.appendChild(script);
}

// 动态样式
function loadStyles(url) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = url;
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(link);
}

// 加载字符串样式
function loadStyleString(css) {
  var style = document.createElement("style");
  style.type = "text/css";
  try {
    style.appendChild(document.createTextNode(css));
  } catch (ex) {
    style.styleSheet.cssText = css;
  }
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(style);
}