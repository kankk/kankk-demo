// Buffer类是一个全局变量类型, 用来直接处理二进制数据的

// Buffer.alloc(size[, fill[, encoding]])
// size <integer>: 新建的Buffer期望的长度
// fill <string|Buffer|integer>: 用来预填充新建的Buffer的值, 默认为0
// encoding <string>: 如果fill是字符串, 则该值是它的字符编码, 默认utf8
const buf1 = Buffer.alloc(5);
console.log(buf1); // <Buffer 00 00 00 00 00>
const buf2 = Buffer.alloc(5, 'a');
console.log(buf2); // <Buffer 61 61 61 61 61>
const buf3 = Buffer.alloc(10, 'abcdefghij', 'base64');
console.log(buf3); // <Buffer 69 b7 1d 79 f8 21 8a 69 b7 1d>

// Note: 调用.alloc()会明显比另一个方法.allocUnsafe()慢, 但是能确保新建的Buffer实例的内容不会包含敏感数据

// Buffer.allocUnsafe(size)
// size <integer>: 新建的Buffer期望的长度
const buf4 = new Buffer.allocUnsafe(10);
console.log(buf4); // 内容可能会不同
buf4.fill(0); // 可以使用.fill()初始化内容
console.log(buf4); // <Buffer 00 00 00 00 00 00 00 00 00 00>

// Note:
// Buffer模块会预分配一个大小为Buffer.poolSize的内部Buffer实例作为快速分配池, 仅限于当size小于或等于Buffer.poolSize >> 1 (除以2后的最大整数)
// 对这个预分配的内部内存池的使用, 是调用Buffer.alloc(size, fill)和Buffer.allocUnsafe(size).fill(fill)的关键区别:
// Buffer.alloc(size, fill)永远不会使用这个内部的Buffer池, 但如果size小于或等于Buffer.poolSize的一半, Buffer.allocUnsafe(size).fill(fill)就会使用内部内存池

// Buffer.allocUnsafeSlow(size)
// size <integer>: 新建的Buffer期望的长度
// 该方法应当仅仅作为开发者已经在他们的应用程序中观察到过度的内存保留之后的终极手段使用
// 在开发者可能需要在不确定的时间段从内存池保留一小块内存的情况下, 使用该方法创建一个非池的Buffer实例然后拷贝出相关的位元是合适的做法