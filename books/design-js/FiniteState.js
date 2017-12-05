var Light = function () {
  this.offState = delegate(this, FSM.off);
  this.onState = delegate(this, FSM.on);
  this.currState = this.offState;
  this.button = null;
};

Light.prototype.init = function () {
  var button = document.createElement('button');
  var self = this;

  button.innerHTML = '已关灯';
  this.button = document.body.appendChild(button);

  this.button.onclick = function () {
    self.currState.buttonWasPressed(); // 把请求委托给FSM状态机
  }
};

var delegate = function(client, delegation) {
  return {
    buttonWasPressed: function() {
      return delegation.buttonWasPressed.apply(client, arguments);
    }
  }
};

var FSM = {
  off: {
    buttonWasPressed: function () {
      console.log('关灯');
      this.button.innerHTML = '下一次按我是开灯';
      this.currState = FSM.onState;
    }
  },
  on: {
    buttonWasPressed: function () {
      console.log('开灯');
      this.buttonWasPressed.innerHTML = '下一次按我是关灯';
      this.currState = FSM.offState;
    }
  }
};

var light = new Light();
light.init();