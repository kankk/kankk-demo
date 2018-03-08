// Buffer.isBuffer(obj)
// obj <Object>
// 返回: <boolean>
// 判断obj是否为一个Buffer
const buf = Buffer.from('buffer');
console.log(Buffer.isBuffer(buf)); // true
console.log(Buffer.isBuffer(null)); // false

// Buffer.isEncoding(encoding)
// encoding <string>: 一个要检查的字符编码名称
// 返回: <boolean>
// 如果encoding是一个支持的字符编码则返回true, 否则返回false
console.log(Buffer.isEncoding('utf8'));

// Buffer.poolSize
// <integer>: 默认8192
// 用于决定预分配的内部Buffer实例池的大小字节数, 可以修改

// buf[index]
// 索引操作符[index]可用于获取或设置buf中制定index位置的八位字节
// 该操作继承自Uint8Array, 对越界访问的处理一致, 返回undefined
console.log(buf[0]);

// buf.buffer
// buffer属性指向创建该Buffer的底层的ArrayBuffer对象
const arrayBuffer = new ArrayBuffer(16);
const buffer = Buffer.from(arrayBuffer);
console.log(buffer.buffer === arrayBuffer); // true

// buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])
// target <Buffer|Uint8Array>: 要比较的Buffer或Uint8Array
// targetStart <integer> target中开始对比的偏移量, 默认为0
// targetEnd <integer> target中结束对比的偏移量, 默认为target.length
// sourceStart和sourceEnd同上
// 返回<integer>
// 比较buf与target, 返回表明buf在排序上是否排在target之前, 之后或相同
const buf1 = Buffer.from('ABC');
const buf2 = Buffer.from('BCD');
console.log(buf1.compare(buf2));

// buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
// target <Buffer|Uint8Array>: 要拷贝的Buffer或Uint8Array
// 拷贝buf的一个区域的数据到target的一个区域, 即便target的内存区域与buf的重叠
const buf3 = Buffer.allocUnsafe(26);
const buf4 = Buffer.allocUnsafe(26).fill('!');
for (let i = 0; i < 26; i++) {
  buf3[i] = i + 97;
}
buf3.copy(buf4, 8, 16, 20);
console.log(buf4.toString('ascii')); // !!!!!!!!qrst!!!!!!!!!!!!!!

// buf.entries()
// 返回: <integer>
// 从buf的内容中, 创建并返回一个[index, byte]形式的迭代器
const buf5 = Buffer.from('buffer');
for (const pair of buf.entries()) {
  console.log(pair);
}

// buf.equals(otherBuffer)
// otherBuffer <Buffer>: 要比较的Buffer或Uint8Array
// 返回: <boolean>
// 判断buf与otherBuffer是否具有完全相同的字节
const buf6 = Buffer.from('ABC');
const buf7 = Buffer.from('414243', 'hex');
const buf8 = Buffer.from('ABCD');
console.log(buf6.equals(buf7)); // true
console.log(buf6.equals(buf8)); // false

// buf.fill(value[, offset[, end]][, encoding])
// value <string|Buffer|integer> 用来填充buf的值
// offset <integer>: 开始填充buf钱要跳过的字节数, 默认为0
// end <integer>: 结束填充buf的位置, 默认为buf.length
// encoding <string>: 字符编码
// 返回 <Buffer>: buf的引用
const buf9 = Buffer.allocUnsafe(10);
buf9.fill('a');
console.log(buf9.toString()); // aaaaaaaaaa

// buf.includes(value[, byteOffset][, encoding])
// value <string|Buffer|integer> 用来填充buf的值
// byteOffset <integer>: buf中开始搜索的位置, 默认为0
// encoding <string>: 字符编码, 默认'uft8'
// 返回 <boolean>: 如果buf找到value, 则返回true
const buf10 = Buffer.from('test');
console.log(buf10.includes('es')); // true
console.log(buf10.includes('et')); // false

// buf.indexOf(value[, byteOffset][, encoding])
// value <string|Buffer|integer> 用来填充buf的值
// byteOffset <integer>: buf中开始搜索的位置, 默认为0
// encoding <string>: 字符编码, 默认'uft8'
// 返回 <integer>: buf中value首次出现的索引, 没有则返回-1
console.log(buf10.indexOf('es')); // 1
console.log(buf10.indexOf('et')); // -1

// buf.lastIndexOf(value[, byteOffset][, encoding])
// 与buf.indexOf()类似, 除了buf是从后往前搜索而不是从前往后

// buf.keys()
// 返回 <Iterator>
const buf11 = Buffer.from('buffer');
for (const key of buf11.keys()) {
  console.log(key);
}

// buf.values()
// 返回 <Iterator>
for (const value of buf11.values()) {
  console.log(value);
}

// buf.length
// 返回 <integer>
// 返回buf在字节数上分配的内存量
const buf12 = Buffer.alloc(10);
console.log(buf12.length);

// buf.slice([start[, end]])
// start <integer>: 新建的Buffer开始的位置, 默认为0
// end <integer>: 新建的Buffer结束的位置, 默认为length
// 返回一个指向相同原始内存的新建的Buffer, 但通过start和end索引进行裁剪
// Note: 修改这个新建的Buffer切片, 也会同事修改原始的Buffer的内存, 因为这两个对象所分配的内存是重叠的
const buf13 = Buffer.allocUnsafe(26);
for (let i = 0; i < 26; i++) {
  buf13[i] = i + 97;
}
const buf14 = buf13.slice(0, 3);
console.log(buf14.toString('ascii', 0, buf2.length)); // abc
buf13[0] = 33;
console.log(buf14.toString('ascii', 0, buf2.length)); // !bc

// buf.toJSON()
// 返回<Object>
// 返回buf的JSON格式. 当字符串话一个Buffer实例时, JSON.stringify()会隐式地调用该函数
const buf15 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
const json = JSON.stringify(buf15);
console.log(json); // {"type":"Buffer","data":[1,2,3,4,5]}
const copy = JSON.parse(json, (key, value) => {
  return value && value.type === 'Buffer' ?
    Buffer.from(value.data) : value;
});
console.log(copy); // <Buffer 01 02 03 04 05>

// buf.toString([encoding[, start[, end]]])
// encoding <string>: 解码使用的字符编码, 默认utf8
// start <integer> 开始解码的字节偏移量, 默认0
// end <integer> 结束解码的字节偏移量, 默认buf.length
// 返回 <string>
// 根据encoding制定的字符编码解码buf成一个字符串
const buf16 = Buffer.allocUnsafe(26);
console.log(buf16.toString('utf8'));  // 乱码
console.log(buf16.toString('ascii')); // 乱码

// buffer.INSPECT_MAX_BYTES
// 返回 <integer>: 默认50
// 当调用buf.inspect()时返回的最大字节数, 可以被用户模块重写

// buffer.constants.MAX_LENGTH
// 返回 <integer>: 单个Buffer实例允许的最大内存

// buffer.kMaxLength
// 返回 <integer>: 分配给单个Buffer实例的最大内存
// buffer.constants.MAX_LENGTH别名

// buffer.constants.MAX_STRING_LENGTH
// 返回 <integer>: 分配给单个Buffer实例的最大长度
// 代表string能有的原始最大长度, 以UTF-16为单位

// buffer.transcode(source, fromEnc, toEnc)
// source <Buffer|Uint8Array>: 一个Buffer或Uint8Array实例
// fromEnc <string> 当前编码
// toEnc <string> 目标编码
// 将给定的Buffer/Uint8Array实例从一个字符编码重新编码到另一个字符. 返回一个新的Bufer实例