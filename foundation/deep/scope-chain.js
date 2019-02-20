// 当查找变量时, 会先从当前上下文的变量对象中查找, 如果没有找到
// 就会从父级(词法层面上的父级)执行上下文的变量对象中查找, 一直找到全局上下文的变量对象, 也就是全局对象
// 这样由多个执行上下文的变量对象构成的链表就叫作用域链

var scope = "global scope";
function checkscope(){
    var scope2 = 'local scope';
    return scope2;
}
console.log(checkscope());  // local scope