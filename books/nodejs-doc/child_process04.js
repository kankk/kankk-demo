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