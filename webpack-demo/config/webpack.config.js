const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin'); // Html自动替换输出文件的文件名
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清理/dist文件夹

const webpack = require('webpack');

module.exports = {
  // entry: './src/index.js',
  entry: {
    app: './src/index.js',
    print: './src/print.js'
    // app: './src/index.js'
  },
  devtool: 'inline-source-map', // 使用source-map
  // devServer: {
  //   contentBase: path.resolve(__dirname, '../dist'),
  //   port: 9000,
  //   hot: true,  // 启用HMR
  // },  // 启动本地服务器
  plugins: [
    new CleanWebpackPlugin(['dist'], { root: path.resolve(__dirname, '../') }),
    new HtmlWebpackPlugin({
      title: 'Webpack Demo'
    }),
    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    // filename: 'bundle.js',
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
}