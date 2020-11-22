const common = require("../webpack.common.js");
const { merge } = require('webpack-merge');
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
module.exports = merge(common, {
  devServer: {
    contentBase: path.join(__dirname, "../../src/Designer/public/"),
    open: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin(
      {
        patterns: [
          { from: path.join(__dirname, "../../src/Designer/public/"), to: path.join(__dirname, "../../dist/Designer/") }
        ]
      }
    )
    ]
});