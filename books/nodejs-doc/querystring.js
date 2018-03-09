// querystring模块提供了一些实用函数
// 用于解析与格式化URL查询字符串
const querystring = require('querystring');

// querystring.escape(str)
// 对给定的str进行URL编码
// 该方法是提供给querystirng.stirngify()使用的, 通常不直接使用

// querystring.unescape(str)
// 对给定的str进行URl解码
// 该方法是提供给querystirng.parse()使用的, 通常不直接使用

// querystring.parse(str[, sep[, eq[, options]]])
// str <string>: 要解析的URL查询字符串
// sep <string>: 用于界定查询字符串中的键值对的子字符串, 默认为&
// eq <string>: 用于界定查询字符串中键与值的子字符串, 默认为=
// options <object>
// options.decodeURIComponent <Function>: 解码查询字符串的字符时使用的函数. 默认为querystring.unescape()
// options.maxKeys <number>: 指定要解析的键的最大数量. 默认为1000, 指定为0则不限制
// 该方法会把一个URL查询字符串str解析成一个键值对的集合
console.log(querystring.parse('foo=bar&abc=xyz&abc=123'));

// querystring.stringify(obj[, sep[, eq[, options]]])
// str <string>: 要解析的URL查询字符串
// sep <string>: 用于界定查询字符串中的键值对的子字符串, 默认为&
// eq <string>: 用于界定查询字符串中键与值的子字符串, 默认为=
// options <object>
// options.decodeURIComponent <Function>: 解码查询字符串的字符时使用的函数. 默认为querystring.unescape()
// 该方法通过遍历给定的obj对象的自身属性, 生成URL查询字符串
const obj = {
  foo: 'bar',
  abc: ['xyz', '123']
}
console.log(querystring.stringify(obj));