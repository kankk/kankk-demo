# Node.js in Practice
中文书名为: <Node.js硬实战:115核心技巧>
## Node环境
### 技巧1: 安装与加载模块
使用npm安装模块, 通过require加载模块
```bash
$ npm install xxx

$ npm install -g xxx # 全局安装
```

### 技巧2: 创建与管理模块
通过exports对象将一个项目解耦到多个文件中
```JavaScript
// 导出多个对象, 方法和值
exports.xxx = ...;

// 导出模块
module.exports = xxx;
```

### 技巧3: 加载一组相关的模块
创建一个index.js的文件来加载各个模块并把它们一起导出, 或者在文件夹下添加package.json文件.  
ps: 实际上这是Node在加载模块时找的默认的文件, 如果package.json不存在, 那么它就会去找index.js.

### 技巧4: 使用路径
如果你希望打开一个不再模块系统中的文件, 通过`__dirname`或者`__filename`来找到文件的位置.

### 技巧5: 标准I/O流的读写
如果你希望从一个Node程序导出或导入数据, 使用`process.stdout`与`process.stdin`

### 技巧6: 打印日志消息
使用`console.log`, `console.info`, 'console.error`以及`console.warn`, 利用这些方法内置的格式工具可以记录不同类型的消息到console. `console.error`方法可以被重定位输出到其他文件中.

### 技巧7: 基准测试
使用`console.time('tag')`和`console.timeEnd('tag')`对一个耗时的操作进行基准测试. 

### 技巧8: 获取平台信息
使用`process.arch`与`process.platform`属性可以获得基于操作系统或者处理器架构的信息, 作为对运行在特定于平台的代码处理.

### 技巧9: 传递命令行参数
使用`process.argv`从命令接受简单参数(数组)

### 技巧10: 退出程序
使用`process.exit()`在Node程序退出的时候指定退出码, Node程序默认返回0的退出状态. 这意味着程序正常终止. 任何的非0状态码被认为是一个错误. 在Unix中, 这个状态码通常可以通过`$?`在shell中获取. 在Windows中可以通过`%errorlevel%`获取

### 技巧11: 响应信号量
使用发给process对象的信号事件, 可以响应其他进程发出的信号

### 技巧12: 通过setTimeout延迟执行函数
使用setTimeout, 并且在需要的时候使用Function.prototype.bind来延迟执行一个函数. 通过调用.bind可以确保这个方法绑定到正确的对象上, 这样它可以访问这个对象的内部属性. 否则, setTimeout会导致与this绑定到全局对象运行, 绑定方法相比创建一个新的匿名函数更加具有可读性. 要取消将被执行的函数, 需要保存setTimeout函数执行返回的timeoutId, 然后通过调用clearTimeout(timeoutId)来取消. 

### 技巧13: 通过定时器定时调用回调函数
通过setInterval, 并使用clearInterval来终止定时器.  

### 技巧14: 安全的操作异步接口
当你想写一个方法返回一个EventEmitter的实例, 或者允许一个回调仅在有些时候调用一下异步的接口而不是所有时候, 可以使用`process.nextTick`来包装一下同步操作. `process.nextTick`方法允许你把一个回调放在下一次事件轮询队列的头上. 这意味它可以用来延迟执行, 其结果是它比使用setTimeout更有效率.  
事件循环中nextTick的时序安排 I/O事件 -> setImmediate ->setInterval -> process.nextTick

## Buffers: 使用比特, 字节以及编码
Buffers是代表原始堆的分配额的数据类型, 在JavaScript中以类数组的方式来使用. 

### 技巧15: Buffer转换为其他格式
默认情况下, 没有执行编码格式, Node的一些核心API都会返回Buffer数据. 使用Buffer API提供的方法可以把Buffer转换为字符串. `toString()`接受一个参数其他编写类型. 

### 技巧16: 使用Buffers是来修改字符串编码
Buffer提供转换字符串编码的方法使一个字符串的编码格式转换成另外一种. eg, 处理data URIs.

### 技巧17: 使用Buffer来转换原始数据

