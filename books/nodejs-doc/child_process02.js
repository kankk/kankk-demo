const exec = require('child_process').exec;
const execFile = require('child_process').execFile;
// child_process.exec(command[, options][, callback])
// command <string>: 要运行的命令, 用空格分割参数
// options <Object>
// options.cwd <string>: 子进程的当前工作目录
// options.env <string>: 环境变量键值对
// options.encoding <string>: 默认为utf8
// options.shell <string>: 用于执行命令的shell
// options.timeout <number>: 默认为0
// options.maxBuffer <number>: stdout或stderr允许的最大字节数, 默认为200*1024
// options.killSignal <string|integer>, 默认为'SIGTERM'
// options.uid <number>: 设置该进程的用户标识
// options.gid <number>: 设置该进程的组标识
// options.windowsHide <boolean>: 默认false
// callback <Function>: 当进程终止时调用, 并带上输出
// callback.error <Error>
// callback.stdout <string|Buffer>
// callback.stderr <string|Buffer>
// 返回 <ChildProcess>
// 衍生一个shell, 然后再shell中执行command, 且缓冲任何产生的输出
// 传入exec函数的command字符串会被shell直接处理, 特殊字符需要相应处理
exec('echo "The \\$HOME variable is $HOME"', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

// promise版本
(async function() {
  const { stdout, stderr } = await exec('ls');
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
})();

// child_process.execFile(file[, args][, options][, callback])
// file <string>: 要运行的可执行文件的名称或路径
// args <string[]>: 字符串参数列表
// options: 同exec()方法
// callback: 同exec()方法
// 该方法类似exec(), 但是不衍生一个shell. 而是, 指定的可执行的file被直接衍生为一个新进程, 这使得它比exec()更高效
execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});

// child_process.fork(modulePath[, args][, options])
// modulePath <string>: 要在子进程中运行的模块
// args <Array>: 字符串参数列表
// options <Object>
// options.cwd <string>: 子进程的当前工作目录
// options.env <string>: 环境变量键值对
// options.execPath <string>: 用来创建
// options.execArgv <Array>: 要传给执行路径的字符串参数列表
// options.silent <boolean>: 如果为true, 则子进程中的stdin, stdout和stderr会被导流到父进程中, 否则它们会继承自父进程
// 该方法是.spawn()的一个特殊情况, 专门用于衍生新的Node.js进程
// 返回的ChildProcess会有一个额外的内置的通信信道, 它允许消息在父进程和子进程之间来回传递
// Note:
// 衍生的Node.js子进程与两者之间建立的IPC通信信道的异常是独立于父进程的. 每个进程都有自己的内存, 使用自己的V8实例. 由于需要额外的资源分配, 因此不推荐衍生大量的Node.js进程
// 默认情况下, fork()会使用父进程中的process.execPath衍生新的Node.js实例. options.execPath属性可以替换要使用的执行路径

// child_process.spawn(command[, args][, options])
// command <string>: 要运行的命令
// args, options基本同上
// spawn()方法使用给定的command和args中的命令行参数来衍生一个新进程. 如果省略args, 则默认为一个空数组
// Note: 不要把未经检查的用户输入传入到该函数. 任何包括shell元字符的输入都可被用于触发任何命令的执行

// options.detached
// 默认情况下, 父进程会等待被分离的子进程退出, 为了防止父进程等待给定的subprocess, 可以用subprocess.unref()方法.
// 这样做会导致父进程的事件循环不包含子进程的引用计数, 是的父进程独立于子进程退出, 除非子进程和父进程之间建立了一个IPC信道
// 当使用detached选项来启动一个长期运行的进程时, 该进程不会再父进程退出后保持在后台运行, 除非提供了一个不连接父进程的stdio配置.
// 如果父进程的stdio是继承的, 则子进程会保持连接到控制终端