// webpack.config.js

const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let extractTextPlugin = new ExtractTextPlugin({
  filename: "[name].min.css",
  allChunks: false
});

let spritesConfig = {
  spritePath: "./dist/static"
};

module.exports = {
  module: 'development',
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
    rules: [{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: "style-loader"
          },
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: [require("postcss-sprites")(spritesConfig)]
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [{
          loader: "url-loader",
          options: {
            name: "[name]-[hash:5].min.[ext]",
            limit: 20000, // size <= 20KB
            publicPath: "static/",
            outputPath: "static/"
          }
        }]
      },
      {
        loader: 'img-loader',
        options: {
          plugins: [
            require("imagemin-pngquant")({
              quality: "80" // the quality of zip
            })
          ]
        }
      }
    ]
  },
  plugins: [extractTextPlugin]
};