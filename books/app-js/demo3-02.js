var Model = {
  inherited: function () {},
  created: function () {},

  prototype: {
    init: function () {}
  },

  create: function () {
    var object = Object.create(this);
    object.parent = this;

    object.prototype = object.fn = Object.create(this.prototype);

    object.created();
    this.inherited(object);
    return object;
  },

  init: function () {
    var instance = Object.create(this.prototype);
    instance.parent = this;
    instance.init.apply(instance, arguments);
    return instance;
  },

  extend: function (o) {
    var extended = o.extended;
    $.extend(this, o);
    if (extended) {
      extended(this);
    }
  },

  include: function (o) {
    var included = o.included;
    $.extend(this.prototype, o);
    if (included) {
      included(this);
    }
  }

}

// 添加对象属性
$.extend(Model, {
  find: function () {}
});

// 添加实例属性
$.extend(Model.prototype, {
  init: function (atts) {
    if (atts) {
      this.load(attr);
    }
  },

  load: function (attributes) {
    for (var name in attributes) {
      this[name] = attributes[name];
    }
  }
});

// 持久化记录
Model.record = {};

// 增加和删除
Model.include({
  newRecord: true,

  // create: function() {
  //   this.newRecord = false;
  //   this.parent.records[this.id] = this;
  // },

  destory: function () {
    delete this.parent.records[this.id];
  },

  dup: function () {
    return $.extend(true, {}, this);
  }
});

// 更新
Model.include({
  update: function () {
    this.parent.records[this.id] = this;
  }
});

// 查找
Model.extend({
  find: function (id) {
    // return this.records[id];

    // 创建一个复制对象返回, 范围外部修改影响内部数据(引用)
    var record = this.record[id];
    if (!record) throw new Error("Unknown record");
    return record.duo();
  }
});

// 添加guid
Model.extend({
  create: function () {
    if (!this.id) {
      this.id = Math.guid();
      this.newRecord = false;
      this.parent.records[this.id] = this;
    }
  },

  created: function () {
    this.records = {};
  }
});

// 想ORM中添加记录
Model.extend({
  populate: function (value) {
    // 重置model和records
    this.records = {};

    for (var i = 0, il = value.length; i < il; i++) {
      var record = this.init(value[i]);
      record.newRecord = false;
      this.records[record.id] = record;
    }
  }
});
$.getJSON("/assets", function (result) {
  Asset.populate(result);
});

// 给ORM添加本地存储
Model.LocalStorage = {
  saveLocal: function (name) {
    var result = [];
    for (var i in this.records) {
      result.push(this.records[i]);
    }

    localStorage[name] = JSON.stringify(result);
  },

  loadLocal: function (name) {
    var result = JSON.parse(localStorage[name]);
    this.populate(result);
  }
};

// 将新纪录提交给服务器
Model.include({
  createRemote: function (url, callback) {
    $.post(url, this.attributes(), callback);
  },

  updateRemote: function (url, callback) {
    $.ajax({
      url: url,
      data: this.attributes(),
      success: callback,
      type: 'PUT'
    })
  }
})