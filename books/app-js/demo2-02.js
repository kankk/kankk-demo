jQuery.fn.tabs = function (control) {
  var element = $(this);
  control = $(control);

  element.delegate("li", "click", function() {
    // 遍历选项卡名称
    var tabName = $(this).attr("data-tab");

    // 在单击选项卡时触发自定义事件
    element.trigger("change.tabs", tabName);
  });

  // 绑定到自定义事件
  element.bind("change.tabs", function(e, tabName) {
    element.find("li").removeClass("active");
    element.find(">[data-tab='" + tabName + "']").addClass("active");
  });

  element.bind("change.tabs", function(e, tabName) {
    control.find(">[data-tabl]").removeClass("active");
    control.find(">[data-tab='" + tabName + "']").addClass("active");
  });

  // 激活第1个选项卡
  var firstName = element.find("li:first").attr("data-tab");
  element.trigger("change.tabs", firstName);

  return this;
};