// JS Tree Shaking需要在production模式下
// 而且依赖es2015的import和export

const path = require('path');

module.exports = {
  mode: 'production',
  // mode: 'development',
  entry: {
    app: './src/app.js'
  },
  output: {
    publicPath: __dirname + '/dist/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  }
}