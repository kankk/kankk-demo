// 实践角度上的闭包
// 1. 即使创建它的上下文已经销毁, 它仍然存在
// 2. 在代码中引用了自由变量

// 执行过程
// 1. 进入全局代码, 创建全局执行上下文, 全局执行上下文压入执行上下文栈
// 2. 全局执行上下文初始化
// 3. 执行checkscope函数, 创建checkscope函数执行上下文, checkscope执行上下文压入执行上下文栈
// 4. checkscope执行上下文初始化, 创建变量对象, 作用域链, this等
// 5. checkscope函数执行完毕, checkscope执行上下文从执行上下文栈弹出
// 6. 执行f函数, 创建f函数执行上下文, f执行上下文被压入执行上下文栈
// 7. f执行上下文初始化, 创建变量对象, 作用域链, this等
// 8. f函数执行完毕, f函数上下文从执行上下文栈中弹出
var scope = 'global scope';
function checkscope () {
  var scope = 'local scope';
  function f () {
    return scope;
  }
  return f;
}

var foo = checkscope();
console.log(foo());

// 即使checkscopeContext被销毁了, 但是JavaScript依然会让checkscopeContext.AO活在内存中
// f函数依然可以通过f函数的作用域链找到它, 从而实现闭包

// 必刷题
var data = [];
// i存在于globalContext.Vo中
for (var i = 0; i < 3; i++) {
  data[i] = function () {
    // 该函数执行上下文中没有i值, 所以只能从globalContext.Vo中查找
    console.log(i);
  };
}
data[0]();  // 3
data[1]();  // 3
data[2]();  // 3
console.log(i); // 3

// 改成闭包
var data2 = [];
for (var j = 0; j < 3; j++) {
  // data[j]Context.AO没有j值, 但是沿着作用域链在匿名函数Context.Ao中查找到
  data[j] = (function(j) {
    return function() {
      console.log(j);
    }
  })(j);
}

data[0]();  // 0: 匿名函数Context.Ao的值
data[1]();  // 1: 匿名函数Context.Ao的值
data[2]();  // 2: 匿名函数Context.Ao的值
console.log(j); // 3: globalContext.VO的值