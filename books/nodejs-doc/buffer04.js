// Buffer.byteLength(string[, encoding])
// string <string|Buffer|TypedArray|DataView|ArrayBuffer>: 也要计算长度的值
// enchoding <string>: 字符编码, 默认为utf8
// 返回: <integer>: string包含的字节数
const str = '\u00bd + \u00bc = \u00be';
console.log(`${str}: ${str.length}个字符, ${Buffer.byteLength(str, 'utf8')}个字节`); // ½ + ¼ = ¾: 9个字符, 12个字节

// Buffer.compare(buf1, buf2)
// buf1 <Buffer|Uint8Array>
// buf2 <Buffer|Uint8Array>
// 返回: <integer>
// 比较buf1和buf2, 通常用于Buffer实例数组的排序. 相当于buf1.compare(buf2)
const buf1 = Buffer.from('1234');
const buf2 = Buffer.from('0123');
const arr = [buf1, buf2];
console.log(arr);
console.log(arr.sort(Buffer.compare));

// Buffer.concat(list[, totalLength])
// list <Array>: 要合并的Buffer或Uint8Array实例的数组
// totalLength <integer>: 合并时list中Buffer实例的总长度
// 返回: <Buffer>
const buf3 = Buffer.alloc(3, '3');
const buf4 = Buffer.alloc(4, '4');
const buf5 = Buffer.alloc(5, '5');
const totalLength = buf3.length + buf4.length + buf5.length;
console.log(totalLength);
const bufA = Buffer.concat([buf3, buf4, buf5], totalLength);
console.log(bufA);
console.log(bufA.length);

// Buffer.from(array)
// array: <Array>
// 通过一个八位字节的array创建一个新的Buffer
const buf6 = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
console.log(buf6);

// Buffer.from(arrayBuffer[, byteOffset[, length]])
// arrayBuffer <ArrayBuffer|TypedArray.buffer>
// byteOffset <integer>: 开始拷贝的索引
// length <integer>: 拷贝的字节数
// 改方法将创建一个ArrayBuffer的视图, 而不会复制底层内存
const arr2 = new Uint16Array(2);
arr2[0] = 5000;
arr2[1] = 4000;
const buf7 = Buffer.from(arr2.buffer);
console.log(buf7); // <Buffer 88 13 a0 0f>
arr2[1] = 6000;
console.log(buf7); // <Buffer 88 13 70 17>

// Buffer.from(buffer)
// buffer <Buffer>: 一个要拷贝数据的已存在的Buffer
const buf8 = Buffer.from('buffer');
const buf9 = Buffer.from(buf8);
console.log(buf8.toString()); // buffer
console.log(buf9.toString()); // buffer

// Buffer.from(string[, encoding])
// string <String>: 要编码的字符串
// encoding <String>: 字符编码, 默认utf8
const buf10 = Buffer.from('this is a tést');
const buf11 = Buffer.from('7468697320697320612074c3a97374', 'hex');
console.log(buf10.toString());
console.log(buf11.toString());

// Buffer.from(object[, offsetOrEncoding[, length]])
// object <Object>: 一个支持Symbol.toPrimitive或valueOf()的对象
// offsetOrEncoding <number|string>: 字节偏移量或编码
// length <number>: 长度值
const buf12 = Buffer.from(new String('this is a tést'));
console.log(buf12); // <Buffer 74 68 69 73 20 69 73 20 61 20 74 65 73 74>