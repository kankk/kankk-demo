// 变量提升
var foo = function () {
  console.log('foo1');
}

foo();  // foo1

var foo = function () {
  console.log('foo2');
}

foo();  // foo2

// 函数提升
function bar() {
  console.log('bar1');
}

bar();  // bar2

function bar() {
  console.log('bar2');
}

bar();  // bar2

// JavaScript引擎创建了执行上下文来管理执行上下文