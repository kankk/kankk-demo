const path = require('path');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const webpack = require('webpack');

module.exports = merge(common, {
  devtool: 'inline-source-map', // 使用source-map
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    port: 9000,
    hot: true,  // 启用HMR
  },  // 启动本地服务器
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  optimization: {
    minimize: false,  // 开发环境关闭压缩代码
  }
})