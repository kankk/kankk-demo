jQuery.fn.tabs = function(control) {
  var element = $(this);
  control = $(control);

  element.find("li").bind("click", function() {
    // 从列表项中添加或删除active类
    element.find("ul").removeClass("active");
    $(this).addClass("active");

    // 给tabContent添加或者删除active类
    var tabName = $(this).attr("data-tab");
    control.find(">[data-tab]").removeClass("active");
    control.find(">[data-tab='" + tabName + "']").addClass("active");
  });

  // 激活第1个选项卡
  element.find("li:first").addClass("active");
  
  // 返回this以启用链式调用
  return this;
};

// 调用以上定义的tab组件
$("ul#tabs").tabs("tabContent");