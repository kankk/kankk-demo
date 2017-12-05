var State = function() {};

State.prototype.buttonWasPressed = function() {
  throw new Error('父类的buttonWasPressed方法必须被重写');
};

var OffLightState = function (light) {
  this.light = light;
};

OffLightState.prototype = new State();
OffLightState.prototype.buttonWasPressed = function () {
  console.log('弱光');
  this.light.setState(this.light.weakLightState);
};

var WeakLightState = function (light) {
  this.light = light;
};

WeakLightState.prototype = new State();
WeakLightState.prototype.buttonWasPressed = function () {
  console.log('强光');
  this.light.setState(this.light.strongLightState);
};

var StrongLightState = function (light) {
  this.light = light;
};

StrongLightState.prototype = new State();
StrongLightState.prototype.buttonWasPressed = function () {
  console.log('超强光');
  this.light.setState(this.light.supperStrongLightState);
};

var SuperStrongLightState = function(light) {
  this.light = light;
};

SuperStrongLightState.prototype = new State();
SuperStrongLightState.prototype.buttonWasPressed = function() {
  console.log('关灯');
  this.light.setState(this.light.OffLightState);
}

var Light = function () {
  this.offLightState = new OffLightState(this);
  this.weakLightState = new WeakLightState(this);
  this.strongLightState = new StrongLightState(this);
  this.supperStrongLightState = new SuperStrongLightState(this);
  this.button = null;
};

Light.prototype.init = function () {
  var button = document.createElement('button');
  var self = this;
  this.button = document.body.appendChild(button);
  this.button.innerHTML = '开关';

  this.currState = this.offlightState;

  this.button.onclick = function () {
    self.currState.buttonWasPressed();
  }
};

Light.prototype.setState = function (newState) {
  this.currState = newState;
};

var light = new Light();
light.init();