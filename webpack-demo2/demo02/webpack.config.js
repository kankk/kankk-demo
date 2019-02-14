// babel
// babel-loader: 负责es6语法转换 --> 负责语法转换
// babel-preset-env: 包含es6, es7等版本的语法转换规则
// babel-polyfill: es6内置方法和函数转换垫片  --> 负责内置方法和函数
// babel-plugin-transform-runtime: 避免polyfill污染全局变量

module.exports = {
  mode: 'development',
  entry: {
    babel: "babel-polyfill",
    app: './app.js'
  },
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: '/\.js$/',
        exclude: '/(node_modules)/',
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}