// production config
const { merge } = require("webpack-merge");
const { resolve } = require("path");
const Dotenv = require("dotenv-webpack");
const commonConfig = require("./development");
module.exports = merge(commonConfig, {
  mode: "production",
  output: {
    filename: "js/bundle.[contenthash].min.js",
    path: resolve(__dirname, "../../dist"),
    publicPath: "/weather_app",
  },
  devtool: "source-map",
  plugins: [new Dotenv()],
});