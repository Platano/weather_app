
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: [
    "babel-polyfill",
    "react-hot-loader/patch", // activate HMR for React
    "webpack-dev-server/client?http://localhost:8080", // bundle the client for webpack-dev-server and connect to the provided endpoint
    "webpack/hot/only-dev-server", // bundle the client for hot reloading, only- means to only hot reload for successful updates
    "./src/index.tsx", // the entry point of our app
  ],
  mode: "development",
  context: resolve(__dirname, "/project/weather-app/"),
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "url-loader",
          "file-loader?hash=sha512&digest=hex&name=img/[contenthash].[ext]",
          "image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false",
        ],
      },
    ],
  },
  devServer: {
    hot: true, // enable HMR on the server
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  
  externals: [
    {
      react: "React",
      "react-dom": "ReactDOM",
    },
  ],
  devtool: "cheap-module-source-map",
  plugins: [
    new HtmlWebpackPlugin({ template: "index.html.ejs" }),
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new Dotenv({ path: "../.env" }),
  ],
};