const fs = require('fs');

// fs.Stats类

// 对于一个普通文件, util.inspect(stats)会返回一个类似如下的字符串
const Stats = {
  dev: 2114,
  ino: 48064969,
  mode: 33188,
  nlink: 1,
  uid: 85,
  gid: 100,
  rdev: 0,
  size: 527,
  blksize: 4096,
  blocks: 8,
  atimeMs: 1318289051000.1,
  mtimeMs: 1318289051000.1,
  ctimeMs: 1318289051000.1,
  birthtimeMs: 1318289051000.1,
  atime: 'Mon, 10 Oct 2011 23:24:11 GMT',
  mtime: 'Mon, 10 Oct 2011 23:24:11 GMT',
  ctime: 'Mon, 10 Oct 2011 23:24:11 GMT',
  birthtime: 'Mon, 10 Oct 2011 23:24:11 GMT'
}

// Stat时间值
// atime: 访问时间 - 文件数据最近被访问的时间
// mtime: 修改时间 - 文件数据最近被修改的时间
// ctime: 变化时间 - 文件状态最近更新的时间(修改索引节点数据)
// brithtime: 创建时间 - 文件创建的时间