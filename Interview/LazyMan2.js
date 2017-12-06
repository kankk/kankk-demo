var taskList = [];

function subscribe() {
  var param = {},
    args = Array.prototype.slice.call(arguments);

  if (args.length < 1) {
    throw new Error('subscribe参数不能为空');
  }

  param.msg = args[0];
  param.args = args.slice(1);

  if (param.msg === 'sleepFirst') {
    taskList.unshift(param);
  } else {
    taskList.push(param);
  }
}

function publish() {
  if (taskList.length > 0) {
    run(taskList.shift());
  }
}

var LazyMan = function (str) {
  return new _LazyMan(str);
}

var _LazyMan = function (str) {
  subscribe('lazyMan', str);

  setTimeout(function () {
    publish();
  }, 0);
}

_LazyMan.prototype.eat = function (str) {
  subscribe('eat', str);
  return this;
}

_LazyMan.prototype.sleep = function (num) {
  subscribe('sleep', num);
  return this;
}

_LazyMan.prototype.sleepFirst = function (num) {
  subscribe('sleepFirst', num);
  return this;
}

function lazyManLog(str) {
  console.log(str);
}

function lazyMan(str) {
  lazyManLog("Hi!This is " + str + "!");

  publish();
}

function eat(str) {
  lazyManLog("Eat " + str + "~");
  publish();
}

function sleep(num) {
  setTimeout(function () {
    lazyManLog("Wake up after " + num);

    publish();
  }, num * 1000);

}

function sleepFirst(num) {
  setTimeout(function () {
    lazyManLog("Wake up after " + num);

    publish();
  }, num * 1000);
}

function run(option) {
  var msg = option.msg,
    args = option.args;

  switch (msg) {
    case "lazyMan":
      lazyMan.apply(null, args);
      break;
    case "eat":
      eat.apply(null, args);
      break;
    case "sleep":
      sleep.apply(null, args);
      break;
    case "sleepFirst":
      sleepFirst.apply(null, args);
      break;
    default:
      ;
  }
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