// import() 引入并且自动执行相关的js代码
import(/* webpackChunkName: 'sub-page-a'*/ "./sub-page-a").then(function(subPageA) {
  console.log(subPageA);
});

import(/* webpackChunkName: 'sub-page-b'*/ "./sub-page-b").then(function(subPageB) {
  console.log(subPageB);
});

import(/* webpackChunkName: 'lodash'*/ "lodash").then(function(_) {
  console.log(_.join(["1", "2"]));
});

export default "page";

// require.ensure() 引入但需要手动执行相关js代码
// require.ensure(
//   ["./sub-page-a.js", "./sub-page-b.js"], // js文件或者模块名称
//   function() {
//     var subPageA = require("./sub-page-a"); // 引入后需要手动执行，控制台才会打印
//     var subPageB = require("./sub-page-b");
//   },
//   "subPage" // chunkName
// );

// require.ensure(
//   ["lodash"],
//   function() {
//     var _ = require("lodash");
//     _.join(["1", "2"]);
//   },
//   "vendor"
// );

// export default "page";