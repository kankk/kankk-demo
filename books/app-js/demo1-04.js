var Class = function(parent) {
  var klass = function() {
    this.init.apply(this, arguments);
  }
  klass.prototype.init = function() {};
  klass.fn = klass.prototype;

  // 添加一个proxy函数
  klass.proxy = function(func) {
    var self = this;
    return (function() {
      return func.apply(self, arguments);
    });
  }

  // 在实例中也添加这个函数
  klass.fn.proxy = klass.proxy;

  return klass;
};

var Button = new Class;

Button.include({
  init: function(element) {
    this.element = jQuery(element);

    // 代理了这个click函数
    this.element.click(this.proxy(this.click));
  },

  click: function() {}
})