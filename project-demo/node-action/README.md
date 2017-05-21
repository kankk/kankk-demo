# Node环境
## 技巧1: 安装与加载模块
使用npm安装模块, 通过require加载模块
```bash
$ npm install xxx

$ npm install -g xxx # 全局安装
```

## 技巧2: 创建与管理模块
通过exports对象将一个项目解耦到多个文件中
```JavaScript
// 导出多个对象, 方法和值
exports.xxx = ...;

// 导出模块
module.exports = xxx;
```

## 技巧3: 加载一组相关的模块
创建一个index.js的文件来加载各个模块并把它们一起导出, 或者在文件夹下添加package.json文件.  
ps: 实际上这是Node在加载模块时找的默认的文件, 如果package.json不存在, 那么它就会去找index.js.

## 技巧4: 使用路径
如果你希望打开一个不再模块系统中的文件, 通过`__dirname`或者`__filename`来找到文件的位置.

## 技巧5: 标准I/O流的读写
如果你希望从一个Node程序导出或导入数据, 使用`process.stdout`与`process.stdin`

