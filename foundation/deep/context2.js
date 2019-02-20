var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();

// 执行过程
// 1. 执行全局代码, 创建全局执行上下文, 全局上下文被压入执行上下文栈
// 2. 全局上下文初始化, 同时, checkscope函数被创建, 保存作用域链到函数的内部属性[[scope]]
// 3. 执行checkscope函数, 创建checkscope函数执行上下文, checkscope函数执行上下文被压入执行上下文栈
// 4. checkscope函数执行上下文初始化
//    1. 复制函数[[scope]]属性创建作用域链
//    2. 用arguments创建活动对象
//    3. 初始化活动对象, 即加入形参, 函数声明, 变量声明
//    4. 将活动对象压入checkscope作用域链顶端
// 5. 同时, f函数被创建, 保存作用域到f函数的内部[[scope]]
// 6. 执行f函数, 创建f函数的上下文, f函数执行上下文被压入执行上下文栈
// 7. f函数执行上下文执行初始化
//    1. 复制函数[[scope]]属性创建作用域链
//    2. 用arguments创建活动对象
//    3. 初始化活动对象, 即加入形参, 函数声明, 变量声明
//    4. 将活动对象压入f作用域链顶端
// 8. f函数执行, 沿着作用域链查找scope值, 返回scope值
// 9. f函数执行完毕, f函数上下文从执行上下文栈中弹出
// 10. checkscope函数执行完毕, checkscope执行上下文从执行上下文栈中弹出