// --zero-fill-buffers
// 强制所有new Buffer(size), Buffer.allocUnsafe(), Buffer.allocUnsafeSlow()或new SlowBuffer(size)新分配的Buffer实例在创建时自动用0填充

// Note:
// Buffer.allocUnsafe(), Buffer.allocUnsafeSlow()不安全
// 当这两个方法被调用时, 被分配的内存段是未初始化.
// 虽然这样的设计使得内存的分配非常快, 但已分配的内存段可能包含潜在的敏感旧数据
// 因为通过这两个方法创建的没有被完全重写内存的Buffer, 在Buffer内存可读的情况下, 可能泄露它的旧数据

// Node.js支持的字符编码
// ascii, utf8, utf16le, ucs2, base64, latin1, binary, hex

// Note: Buffer与TypedArray
// Buffer对象的内存是拷贝到TypedArray的, 而不是共享的
// TypeArray对象的.buffer属性创建一个新建的且与TypedArray实例共享同一分配内存的Buffer

const arr = new Uint16Array(2);

arr[0] = 5000;
arr[1] = 4000;

// 拷贝arr的内容
const buf1 = Buffer.from(arr);
// 与arr共享内存
const buf2 = Buffer.from(arr.buffer);

console.log(buf1); // <Buffer 88 a0>
console.log(buf2); // <Buffer 88 13 a0 0f>

arr[1] = 6000;
console.log(buf1); // <Buffer 88 a0>
console.log(buf2); // <Buffer 88 13 70 17>

// 当使用TypedArray的.buffer创建Buffer是, 也可以通过传入byteOffset和length参数只使用ArrayBuffer的一部分
const arr2 = new Uint16Array(20);
const buf3 = Buffer.from(arr2.buffer, 0, 16);
console.log(buf3.length); // 16

// Buffer实例可以使用ES6的for...of语法进行遍历
const buf4 = Buffer.from([1, 2, 3]);
for (const b of buf4) {
  console.log(b); // 1 2 3
}