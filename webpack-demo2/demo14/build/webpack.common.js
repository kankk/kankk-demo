const webpack = require('webpack');
const merge = require('webpack-merge');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

const productionConfig = require('./webpack.prod');
const developmentConfig = require('./webpack.dev');

const generateConfig = env => {
  let scriptLoader = [{
    loader: 'babel-loader'
  }];

  let cssLoader = [{
    loader: 'css-loader',
    options: {
      sourceMap: env === "development" ? true : false // 开发环境：开启source-map
    }
  }];

  let styleLoader =
    env === "production" ?
    ExtractTextPlugin.extract({
      // 生产环境：分离、提炼样式文件
      fallback: {
        loader: "style-loader"
      },
      use: cssLoader
    }) : // 开发环境：页内样式嵌入
    cssLoader;

  return {
    entry: {
      app: './scr/app.js'
    },
    output: {
      publicPath: env === "development" ? "/" : __dirname + "/../dist/",
      path: path.resolve(__dirname, "..", "dist"),
      filename: "[name]-[hash:5].bundle.js",
      chunkFilename: "[name]-[hash:5].chunk.js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: scriptLoader
        },
        {
          test: /\.css$/,
          use: styleLoader
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, '..', 'index.html'),
        chunks: ['app'],
        minify: {
          collapseWhitespace: true
        }
      }),
      new webpack.ProvidePlugin({ $: 'jquery' })
    ]
  }
}

// const commonConfig = {

// }

module.exports = env => {
  let config = env === 'production' ? productionConfig : developmentConfig;
  return merge(generateConfig(env), config);
}