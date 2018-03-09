// module
// 在Node.js中, 文件和模块是一一对应的(每个文件被视为一个独立的模块)

// 通过在特殊的exports对象上指定额外的属性, 函数和对象可以被添加到模块的根部
// 模块内的本地变量是私有的, 因为模块被Node.js包装在一个函数中
// module.exports属性可以被赋予一个新值(函数/对象)

// 访问主模块
// 当Node.js直接运行一个文件时, require.main会被设为它的module. 这意味着可以通过require.main === module来判断一个文件是否被直接运行
// module提供了一个filename属性(通常等同于__filename), 所以可以通过检查require.main.filename来获取当前应用程序的入口点

// Note:
// 想要获得调用require()时加载的确切的文件名, 使用require.resolve()函数

// 缓存
// 模块在第一次加载会被缓存. 这意味着如果每次调用require()都解析到同一个文件, 则返回相同的对象
// 多次调用require()不会导致模块的代码被执行多次
// Note: 如果想要多次执行一个模块, 可以导出一个函数, 然后调用该函数
// 模板是基于其解析的文件名进行缓存. 由于调用模块的位置不同, 模块可能被解析成不同的文件名

// 核心模块
// 核心模块定义在Node.js源代码的lib/目录下, 被编译成二进制
// require()总是会优先加载核心模块, 即使有同名文件

// 循环
// 当循环调用require()时, 一个模块可能在未完成执行时被返回

// 目录作为模块
// 可以把程序和库放在一个单独的目录, 然后提供一个单一的入口来指向它. 把目录递给require()作为一个参数
// 1. 根目录创建一个package.json文件, 并指定一个main模块
// 2. 从node_modules目录加载
// 3. 从全局目录加载

// 从node_modules目录加载
// 如果传递给require()的模块标识不是核心模块, 也没有'/', '../', './'开头, 则Node.js会从当前模块的父目录开始
// 尝试从它的/node_modules目录里加载
// 如果还是没有找到, 则移动到再上一层父目录, 直到文件系统的根目录

// 从全局目录加载
// 如果NODE_PATH环境变量被设为一个以冒号分割的绝对路径列表, 则当在其他地方找不到Node.js会搜索这些路径
// Note: 强烈建议将所有的依赖放在本地的node_modules目录, 这样将会更快地加载且更可靠

// __dirname
// <string>: 当前目录的文件夹名字, 等同于path.dirname(__filename的值)
const path = require('path');
console.log(__dirname);
console.log(path.dirname(__filename));

// __filename
// <string>: 当前模块的文件名称, 解析后的绝对路径
console.log(__filename);

// exports
// 这是一个对于module.exports的更简短的引用形式

// module
// <Object>: 对当前模块的引用
// module.exports用于指定一个模块所导出的内容, 即可以通过require()访问的内容

// require()
// <Function>: 引入模块

// require.cache
// <Object>: 被引入的模块将缓存在这个对象中. 从此对象中删除键值对将会导致下一次require重新加载被删除的模块
// Note: 不能删除native addons(原生插件),  因为它们的重载将会导致错误

// require.resolve(request[, options])
// request <string>: 需要解析的模块路径
// options <object>
// options.path <Array>: 解析模块的起点路径
// 返回 <string>
// 使用内部的require()机制查询模块的位置, 次操作只会返回解析的文件名, 不会加载该模块
console.log(require.resolve('path'));

// require.resolve.paths(request)
// request <stirng>: 被查询解析路径的模块的路径
// 返回: <Array>
// 返回一个数组, 其中包含解析request过程中被查询的路径
console.log(require.resolve.paths('require'));

// module对象
// <object>: 每个模块中, module的自由变量是一个指向表示当前模块的对象的引用
// module.exports也可以通过全局模块的exports对象访问
// module实际上不是全局的, 而是每个模块本地的

// module.children
// <Array>: 被该模块引用的模块对象

// modules.exports
// <object>: module.exports对象是由模块系统创建的.
// Note: 对module.exports的赋值必须立即完成. 不能在任何回调中完成

// exports快捷方式
// exports变量是在模块的文件级别作用域内有效的, 它在模块被执行前被赋予module.exports的值
// Note: 如果一个新的值被赋值给exports, 它就不再绑定到module.exports
// 当module.exports属性被一个新的对象替代时, 也会重新赋值exports

// require的实现
function require(/* ... */) {
  const module = { exports: {} };
  ((module, exports) => {
    // 模块代码在这。在这个例子中，定义了一个函数。
    function someFunc() {}
    exports = someFunc;
    // 此时，exports 不再是一个 module.exports 的快捷方式，
    // 且这个模块依然导出一个空的默认对象。
    module.exports = someFunc;
    // 此时，该模块导出 someFunc，而不是默认对象。
  })(module, module.exports);
  return module.exports;
}

// module.filename
// <stirng>: 模块的完全解析后的文件名

// module.id
// <string>: 模块的标识符. 通常是完全解析后的文件名

// module.loaded
// <boolean>: 模块是否已经加载完成, 或正在加载中

// module.parent
// <object>: 最先引用该模块的模块

// module.paths
// <stirng>: 模块的搜索路径

// module.require(id)
// id <string>
// 返回 <object>: 已解析的模块的module.exports
// module.require()方法提供了一种类似require()从原始模块被调用的加载方式
// Note:
// 为了做到这个, 需要获得一个module对象的引用.
// 因为require()会返回module.exports, 且module只在一个特定的模块代码中有效, 所以为了使用它, 必须明确地导出