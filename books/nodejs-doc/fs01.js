const fs = require('fs');
// fs: 文件系统
// 文件I/O是对标准POSIX函数的简单封装
// 所有方法都有异步和同步的形式

// 异步方法的最后一个参数都是一个回调函数, 回到函数的第一个参数都是异常, 如果操作成功, 该参数则为null/undefined
// 当使用同步方法, 任何异常都会立即抛出, 可以使用try/catch来处理异常, 或让异常向上冒泡
// 同步的方法会阻塞整个进程, 直到完成(停止所有连接)

// 可以使用文件名的相对路经, 路径是相对process.cwd()的

// 大多数fs函数可以省略回调函数, 在这种情况下, 会使用默认的回到函数, 但是不推荐省略
// 若要追踪最初的调用点, 可设置NODE_DEBUF环境变量

// 线程池的使用
// Note: 在所有的文件系统API中, 除了fs.FSWatcher()和那些显式同步之外都可以使用libuv的线程池


// WHATWG URL object
// 对于大多数fs模块的函数, path/filename参数可以当作一个WHATWG URL对象传入. 只有URL对象使用被支持的file:协议
const URL = require('url').URL;
const fileUrl = new URL('file://tmp/test');
fs.readFileSync(fileUrl);