// JavaScript -> 词法作用域 -> 静态作用域

var value = 1;

function foo () {
  console.log(`foo() -> value: ${value}`);  // 1
}

function bar () {
  var value = 2;
  foo();
  console.log(`bar() -> value: ${value}`);  // 2
}

bar();

// demo1
var scope1 = 'global scope1';
function checkscope1 () {
  var scope1 = 'local scope1';
  function f() {
    return scope1;
  }
  return f();
}
console.log(`scope1: ${checkscope1()}`); // local scope1

// demo2
var scope2 = 'global scope2';
function checkscope2 () {
  var scope2 = 'local scope2';
  function f() {
    return scope2;
  }
  return f;
}
console.log(`scope2: ${checkscope2()()}`); // local scope2

// demo1和demo2输出都是local scope
// 因为JavaScript采用的是词法作用域, 函数的作用域基于函数创建的的位置
// from: JavaScript权威指南
// JavaScript函数的执行用到了作用域链, 这个作用域链是在函数定义的时候创建的.