var exports = this;

jQuery(function($) {
  exports.SearchView = Controller.create({
    // 选择器到局部变量的映射
    elements: {
      "input[type=search]": 'searchInput',
      "form": "searchForm"
    },

    // 实例化时调用
    init: function(element) {
      this.el = $(element);
      this.refreshElements();
      this.searchForm.submit(this.proxy(this.search));
    },

    // 私有

    $: function (selector) {
      // 需要一个'el'属性, 同时传入选择器
      return $(selector, this.el);
    },

    // 设置本地变量
    refreshElements: function() {
      for (var key in this.elements) {
        this[this.elements[key]] = this.$(key);
      }
    }
  });

  new SearchView('#user');
});