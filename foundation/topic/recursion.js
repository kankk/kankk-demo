// 递归

// 阶乘
function factorial (n) {
  if (n == 1) return n;
  return n * factorial(n - 1);
}
console.log(factorial(5));

// 斐波那契数列
function fibonacci(n){
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(5));

// 递归条件
// 构成递归需具备边界条件, 递归前进段和递归返回段;
// 当边界条件不满足时, 递归前进, 当边界条件满足时, 递归返回.
// 递归的特点：
// 1. 子问题须与原始问题为同样的事，且更为简单；
// 2. 不能无限制地调用本身，须有个出口，化简为非递归状况处理。

// 递归优化 - 尾调用
// 指的是函数内部的最后一个动作是函数调用, 该调用的返回值, 直接返回给函数

// eg
function f(x) {
  return g(x);
}

// 尾调用函数执行栈时, 虽然也调用了一个函数, 但是因为原来的函数执行完毕, 执行上下文会被弹出,
// 执行上下文栈中相当于只多压入了一个执行上下文. 然而非尾调用函数, 就会创建多个执行上下文压入执行上下文栈

// 阶乘函数优化
function factorial2 (n, res) {
  if (n == 1) return res;
  return factorial2(n - 1, n * res);
}

console.log(factorial2(4, 1));