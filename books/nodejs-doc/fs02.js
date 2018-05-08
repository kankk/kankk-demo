const fs = require('fs');

// Buffer

// fs函数支持传递和接收字符串路径与Buffer路径. 后者的目的是使其可以在允许非UTF-8文件名的文件系统中工作.
// Note: 在某些文件系统, 文件名总是被编码为UTF-8. 在这些文件系统中, 传入非UTF-8编码的Buffer到fs函数将无法工作

// fs.FSWatcher 类
// 从fs.watch()返回的对象是该类型
// 提供给fs.watch()的listener回调会接收返回的FSWatcher的change事件

// change事件
// eventType <string>: fs变化的变化
// filename <string|Buffer>: 变化的文件名
// 当一个被监视的目录或文件有变化时触发
fs.watch('./temp', {
  encoding: 'buffer'
}, (eventType, filename) => {
  console.log(eventType);
  if (filename) {
    console.log(filename); // 输出: <Buffer ...>
  }
});

// error事件
// error <Error>
// 当发生错误时触发

// watcher.close()
// 停止听见fs.FSWatcher的变化

// close 事件
// 当ReadStream底层的文件描述符被关闭时触发

// open事件
// fd <integer>被ReadStream使用的整数文件描述符
// 当 ReadStream 的文件被打开时触发

// readStream.bytesRead
// 已读取的字节数

// readStream.path
// 流正在读取的文件的路径, 指定在fs.createdReadStream()的第一个参数
// 如果path传入的第一个字符串, 则readStream.path是一个字符串
// 如果path传入的是一个Buffer, 则readStream.path是一个Buffer