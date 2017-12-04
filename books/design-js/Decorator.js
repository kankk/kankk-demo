var plane = {
  fire: function() {
    console.log('发射普通子弹');
  }
}

var missileDecorator = function() {
  console.log('发射导弹');
}

var atomDecorator = function() {
  console.log('发射原子弹');
}

var fire1 = plane.fire;

plane.fire = function() {
  fire1();
  missileDecorator();
}

var fire2 = plane.fire;

plane.fire = function() {
  fire2();
  atomDecorator();
}

plane.fire();