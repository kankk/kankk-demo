const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    pageA: './src/page-a.js',
    pageB: './src/page-b.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'all',
          minSize: 1,
          priority: 0
        },
        // 首先打包node_modules中的文件
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 10
        }
      }
    }
  }
}