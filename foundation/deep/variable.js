// 每个执行上下文的三个重要属性
// * 变量对象
// * 作用域链
// * this

// 全局上下文 === 全局对象
// 所有非限定性的变量和函数名都会作为全局上下文对象的属性来查询
console.log(`this => ${this}`);
console.log(`this instanceof Object => ${this instanceof Object}`);

// 执行上下文
// 变量对象包括:
// * 函数的所有形参(如果是函数上下文)
// * 函数声明
// * 变量声明

// 执行上下文demo
function foo (a) {
  var b = 2;
  function c() {}
  var d = function() {};

  b = 3;
}
foo(1);

var foo_AO_start = {
  arguments: {
    0: 1,
    length: 1
  },
  a: 1,
  b: undefined,
  // c: reference to function c(){},
  d: undefined
}

var foo_AO_end = {
  arguments: {
    0: 1,
    length: 1
  },
  a: 1,
  b: 3,
  // c: reference to function c(){},
  // d: reference to FunctionExpression "d"
}

// 变量对象总结:
// * 全局上下文的变量对象初始化是全局对象
// * 函数上下文的变量对象初始化只包含Arguments对象
// * 在进入执行上下文时会给变量对象添加形参, 函数声明, 变量声明等初始的属性值
// * 在代码执行阶段, 会再次修改变量对象的属性值

// demo
console.log(bar);
function bar() {
  console.log('bar');
}
var bar = 1;

function fun(a) {
  var a = '2';
  console.log(`a: ${a}`); // 2
}
fun(1);

// 会打印函数, 而不是undefined
// 这是因为在进入执行上下文时, 首先处理函数声明, 其次会处理变量声明
// 如果变量名跟已经声明的形式参数或函数相同, 则变量声明不会干扰已经存在的属性