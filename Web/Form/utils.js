// 取得选择的文本
function getSelectedText(textbox) {
  if (typeof textbox.selectionStart == "number") {
    return textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);
  } else if (document.selection) {
    return document.selection.createRange().text;
  }
}

// 选择部分文本
function selectText(textbox, startIndex, stopIndex) {
  if (textbox.setSelectionRange) {
    textbox.setSelectionRange(startIndex, stopIndex);
  } else if (textbox.createTextRange) {
    var range = textbox.createTextRange();
    range.collapse(true);
    range.moveStart("character", startIndex);
    range.moveEnd("character", stopIndex - startIndex);
    range.select();
  }
  textbox.focus();
}

// Form部分的
var EventUtil = {

  // 获取剪切板内容
  getClipboardText: function(event) {
    var clipboardData = (event.clipboardData || window.clipboardData);
    return clipboardData.getData("text");
  },

  // 设置剪切板内容
  setClipboardText: function(event, value) {
    if(event.clipboardData) {
      return event.clipboardData.setData("text/plain", value);
    } else if(window.clipboardData) {
      return window.clipboardData.setData("text", value);
    }
  },
  
}