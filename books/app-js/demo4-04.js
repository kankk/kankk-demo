var Events = {
  bind: function () {
    if (!this.o) this.o = {};
    this.o.bind.apply(this.o, arguments);
  },

  trigger: function () {
    if (!this.o) this.o = $({});
    this.o.trigger.apply(this.o, arguments);
  }
}

var StateMachine = function() {};
StateMachine.fn = StateMachine.prototype;

// 添加时间绑定或触发行为
$.extend(StateMachine.fn, Event);
StateMachine.fn.add = function(controller) {
  this.bind("change", function(e, current) {
    if(controller == current) {
      controller.active();
    } else {
      controller.deactivate();
    }
  });

  controller.active = $.proxy(function() {
    this.trigger("change", controller);
  }, this);
}

// 用法
var con1 = {
  active: function() {
    $("#con1").addClass("active");
  },
  deactivate: function() {
    $("#con1").removeClass("active");
  }
};

var con2 = {
  active: function() {
    $("#con2").addClass("active");
  },
  deactivate: function() {
    $("#con2").removeClass("active");
  }
};

// 创建一个新的状态机, 并添加状态
var sm = new StateMachine;
sm.add(con1);
sm.add(con2);

// 激活第一个状态
con1.active();