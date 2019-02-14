// webpack的样式打包
// 1. 将css通过link标签引入
// 2. 将css放在style标签里
// 3. 动态卸载和加载css
// 4. 页面加载css前的transform

const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/app.js'
  },
  output: {
    publicPath: __dirname + '/dist/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 针对css结尾的文件设置loader
        // CSS通过<link>标签引入
        // use: [
        //   {
        //     loader: 'style-loader/url'
        //   },
        //   {
        //     loader: 'file-loader'
        //   }
        // ]
        // CSS放在<style>标签里
        // use: [
        //   {
        //     loader: "style-loader",
        //     options: {
        //       singleton: true // 处理为单个style标签
        //     }
        //   },
        //   {
        //     loader: "css-loader",
        //     options: {
        //       // minimize: true // css代码压缩
        //     }
        //   }
        // ]
        // 动态卸载和加载CSS
        // use: [
        //   {
        //     loader: 'style-loader/useable',
        //   },
        //   {
        //     loader: 'css-loader',
        //   }
        // ]
        // 页面加载css前的transform
        use: [
          {
            loader: 'style-loader',
            options: {
              transform: './css.transform.js'
            }
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  }
}