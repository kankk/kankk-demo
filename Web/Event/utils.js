// 跨浏览器的事件处理程序
var EventUtil = {
  addHandler: function (element, type, handler) {
    if (element.addEvenetListener) {
      element.addEvenetListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler
    }
  },

  removeHandler: function (element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = null;
    }
  },

  // 取得event对象
  getEvent: function (event) {
    return event ? event : window.event;
  },

  // 返回事件的目标
  getTarget: function (event) {
    return event.target || event.scrElement;
  },


  // 取消事件的默认行为
  preventDefault: function (event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },


  // 阻止事件流
  stopPropagation: function (event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },

  // 获取相关元素(mouseout, mouseover)
  getRelatedTarget: function (event) {
    if (event.relatedTarget) {
      return event.relatedTarget;
    } else if (event.toElement) {
      return event.toElement;
    } else if (event.fromElement) {
      return event.fromElement;
    } else {
      return null;
    }
  },

  // 获取鼠标滚轮增量值
  getWheelDelta: function (event) {
    if (event.wheelDelta) {
      return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
    } else {
      return -event.detail * 40;
    }
  }
};