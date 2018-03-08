const {
  spawn
} = require('child_process');

// child_process提供了衍生子进程的功能, 主要由child_process.spawn()提供

const ls = spawn('ls', ['-lh', '.']);

ls.stdout.on('data', (data) => {
  console.log(`输出: ${data}`);
});
ls.stderr.on('data', (data) => {
  console.log(`错误：${data}`);
});
ls.on('close', (code) => {
  console.log(`子进程退出码：${code}`);
});

// 默认情况下, 在Node.js的父进程与衍生的子进程之间会建立stdin, stdout和stderr的管道. 数据能以非阻塞的方式在管道中流通
// 注意, 有些程序会在内部使用行缓冲I/O. 虽然这并不影响Node.js, 但这意味着发送的子进程的数据可能无法被立即使用

// child_process.spawn(): 异步衍生子进程
// child_process.spawnSync(): 同步衍生子进程, 阻塞事件循环, 直到衍生的子进程退出或终止

// child_process.exec(): 衍生一个shell并在shell上运行命令, 当完成会传入stdout和stderr到回调函数
// child_process.execFile(): 类似exec(), 但直接衍生命令, 且无需先衍生一个shell
// child_process.fork(): 衍生一个新的Node.js进程, 并通过建立一个IPC通讯通信来调用一个指定的模块, 该通道允许父进程与子进程之间相互发送信息
// child_process.execSync(): exec()的同步方法, 会阻塞Node.js事件循环
// child_process.execFileSync(): execFile()的同步方法, 会阻塞Node.js事件循环