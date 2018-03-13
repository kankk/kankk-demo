// ChildProcess类
// ChildProcess类的实例是EventEmitter, 代表衍生的子进程
// ChildProcess的实例不被直接创建
// 而是使用child_process.spawn(), child_process.exec(), child_process.execFile()或child_process.fork()方法创建ChildProcess实例

// close 事件
// code <number>: 如果子进程退出自身, 则该值是退出码
// signal <string>: 子进程被终止时的信号
// 当子进程的stdio流被关闭时会触发close事件

// disconnect事件
// 在父进程中调用sbuprocess.disconnect()或在子进程中调用process.disconnect()后触发
// 断开后就不能再发送或接收信息, 且subprocess.connected属性会被设为false

// error事件
// err <Error>: 错误对象
// 每当出现以下情况时触发
// 1. 进程无法被衍生
// 2. 进程无法被杀死
// 3. 向子进程发送信息失败
// Note: 在错误发生后, exit事件可能会有可能不会触发. 当同时监听了exit和error事件, 谨防处理函数被多次调用

// message事件
// message <Object>: 一个已解析的JSON对象或原始值
// sendHandle <Handle>: 一个net.Socket或net.Server对象或undefined
// 当一个子进程使用process.send()发送消息时会触发message事件
// Note: 消息通过JSON序列化和解析传递, 结果就是消息可能跟开始发送的不完全一样

// subprocess.channel
// <object>: 代表子进程的IPC通道的管道
// 该属性是当前子进程的IPC通道的引用. 如果当前没有IPC通道, 则该属性为undefined

// subprocess.connected
// <boolean>: 调用subprocess.disconnect()后会被设为false
// subprocess.connected属性表明是否扔可以从一个子进程发送和接受信息
// 当subprocess.connected为false时, 则不能在发送或接收的消息

// subprocess.disconnect()
// 关闭父进程与子进程之间的IPC通道, 一旦没有其他的连接使其保持活跃, 则允许子进程正常退出.
// 调用该方法后, 父进程和子进程各自的subprocess.connected和process.connected属性都会设为false, 且进程之间不能再传递消息
// 当正在接收的进程中没有消息时, 就会触发'disconnect'事件. 这经常在调用subprocess.disconnect()后立即触发
// Note: 当子进程是一个Node.js, 可以在子进程内调用process.disconnect()方法来关闭IPC通道

// subprocess.kill([signal])
// signal <stirng>
// subprocess.kill()方法向子进程发送一个信号. 如果没有给定参数, 则进程会发送'SIGTERM'信号
// 如果信号没有被送达, ChildProcess对象可能会触发一个'error'事件

// subprocess.killed
// <boolean>: 当subprocess.kill()已成功发送信号给子进程后被设置为true
// subprocess.killed属性表明该子进程是否已成功接收到subprocess.kill()的信号, 该属性不代表子进程是否已被终止

// subprocess.pid
// <number>: 整数, 返回子进程的进程标识(PID)

// subprocess.send(message[, sendHandle[, options]][, callback])
// 当父进程和子进程之间建立一个IPC通道时, subprocess.send()方法可用于发送消息到子进程
// 当子进程是一个Node.js实例时, 消息可以通过process.on('message')事件接收

// subprocess.stderr
// 一个代表子进程的stderr的可读流

// subprocess.stdin
// 一个代表子进程的stdin的可写流

// subprocess.stdout
// 一个代表子进程的stdout的可读流

// subprocess.stdio
// 一个到子进程的管道的稀疏数组, 对应着传给child_process.spawn()的选择中值被设为'pipe'的stdio
