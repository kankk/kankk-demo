const path = require('path')

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    publicPath: __dirname + '/dist/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  // module.rules.use数组中, loader的执行顺序
  // 根据webpack规则: 放在最后的loader首先被执行
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // 将JS字符串生成style节点
          },
          {
            loader: 'css-loader', // 将css转换成CommonJS模块
          },
          {
            loader: 'sass-loader',  // 将Sass编译css
          }
        ]
      }
    ]
  }
}