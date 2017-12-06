var LazyMan = function (name) {
  return new _LazyMan(name);
};

var _LazyMan = function (name) {
  var _this = this;
  this.tasks = [];
  var task = function () {
    console.log('Hi! This is ' + name + '!');
    _this.next();
  };
  this.tasks.push(task);

  setTimeout(function () {
    _this.next();
  }, 0);
}

_LazyMan.prototype.next = function () {
  var task = this.tasks.shift();
  typeof task === 'function' && task();
}

_LazyMan.prototype.sleep = function (time) {
  var _this = this;
  var task = setTimeout(function () {
    console.log('Wake up after ' + time);
    _this.next();
  }, time * 1000);
  this.tasks.push(task);
  return this;
}

_LazyMan.prototype.eat = function (sth) {
  var _this = this;
  var task = function () {
    console.log('Eat ' + sth + '~');
    _this.next();
  }
  this.tasks.push(task);
  return this;
}

_LazyMan.prototype.sleepFirst = function (time) {
  var _this = this;
  var task = setTimeout(function () {
    console.log('Wake up after ' + time);
    _this.next();
  }, time * 1000);
  this.tasks.unshift(task);
  return this;
}

LazyMan('Hank');
// Hi! This is Hank!

LazyMan('Hank').sleep(10).eat('dinner');
// Hi! This is Hank!
// 等待10秒..
// Wake up after 10
// Eat dinner~

LazyMan('Hank').eat('dinner').eat('supper');
// Hi This is Hank!
// Eat dinner~
// Eat supper~
 
LazyMan('Hank').sleepFirst(5).eat('supper');
// 等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper