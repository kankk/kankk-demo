// 创建同步进程
// child_process.spawnSync(), child_process.execSync()和child_process.execFileSync()
// 是同步的且会阻塞Node.js的事件循环, 暂停任何额外代码的执行知道衍生的进程退出

// child_process.execFileSync(file[, args][, options])
// 与child_process.execFile()基本相同, 除了该方法直到子进程完全关闭后才返回
// 当遇到超时且发送了killSignal时, 则该方法直到进程完全退出后才返回结果
// Note: 如果子进程拦截并处理了SIGTERM信号且没有退出, 则父进程会一直等待直到子进程退出
// 如果进程超市, 或有一个非零的退出码, 则该方法会抛出一个Error

// child_process.execSync(command[, options])
// 与child_process.exec()基本相同, 除了该方法直到子进程完全关闭后才返回
// 当遇到超时且发送了killSignal时, 则该方法直到进程完全退出后才返回结果
// Note: 如果子进程拦截并处理了SIGTERM信号且没有退出, 则父进程会一直等待直到子进程退出
// 如果进程超市, 或有一个非零的退出码, 则该方法会抛出一个Error

// child_process.spawnSync(command[, args][, options])
// 与child_process.spawn()基本相同, 除了该方法直到子进程完全关闭后才返回
// 当遇到超时且发送了killSignal时, 则该方法直到进程完全退出后才返回结果