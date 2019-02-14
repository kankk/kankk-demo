// webpack
// import() 引入并且自动执行相关的js代码
// require.ensure() 引入但需要手动执行相关js代码

const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    page: './src/page.js'
  },
  output: {
    publicPath: __dirname + '/dist/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  }
}