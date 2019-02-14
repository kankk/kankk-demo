const path = require("path");
const PurifyCSS = require("purifycss-webpack");
const glob = require("glob-all");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let extractTextPlugin = new ExtractTextPlugin({
  filename: "[name].min.css",
  allChunks: false
});

let purifyCSS = new PurifyCSS({
  paths: glob.sync([
    // 要做CSS Tree Shaking的路径文件
    path.resolve(__dirname, "./*.html"), // 请注意，我们同样需要对 html 文件进行 tree shaking
    path.resolve(__dirname, "./src/*.js")
  ])
});

module.exports = {
  entry: {
    app: "./src/app.js"
  },
  output: {
    publicPath: __dirname + "/dist/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: "style-loader",
            options: {
              singleton: true
            }
          },
          use: {
            loader: "css-loader",
            options: {
              minimize: true
            }
          }
        })
      }
    ]
  },
  plugins: [extractTextPlugin, purifyCSS]
};