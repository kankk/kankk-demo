// autofocus
EventUtil.addHandler(window, "load", function (event) {
  var element = document.forms[0].elements[0];
  // 当浏览器不支持autofocus时, 使用js触发
  if (element.autofocus !== true) {
    element.focus();
  }
});

// 过滤输入 (eg. 只允许输入数字)
EventUtil.addHandler(textbox, "keypress", function (event) {
  event = EventUtil.getEvent(event);
  var target = EventUtil.getTarget(event);
  var charCode = EventUtil.getCharCode(event);

  if (!/\d/.test(String.fromCharCode(charCode)) && charCode > 9 && !event.ctrlKey) {
    EventUtil.preventDefault(event);
  }
});

// 获取选择框选项
function getSelectedOptions(selectbox) {
  var result = new Array();
  var option = null;

  for (var i = 0, len = selectbox.option.length; i < len; i++) {
    option = selectbox.option[i];
    if (option.selected) {
      result.push(option);
    }
  }
  return result
}