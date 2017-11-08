// 使用全局对象作为上下文, 而不是window对象
// 用来创建全局对象
var exports = this;

(function ($) {
  var mod = {};

  mode.create = function (includes) {
    var result = function () {
      this.init.apply(this, arguments);
    };

    result.fn = result.prototype;
    result.fn.init = function () {};

    result.proxy = function (func) {
      return $.proxy(func, this);
    };

    result.include = function (ob) {
      $.extend(this.fn, ob);
    };
    result.extend = function (ob) {
      $.extend(this, ob);
    };

    if (includes) {
      result.include(includes);
    }

    return result;
  };

  exports.Controller = mod;
})(jQuery);

// 例子
jQuery(function($) {
  var ToggleView = Controller.create({
    init: function(view) {
      this.view = $(view);
      this.view.mouseover(this.proxy(this.toggleClass), true);
      this.view.mouseout(this.proxy(this.toggleClass), false);
    }
  })
});