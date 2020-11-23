const commonConfig = require("./webpack.common.js");
const {merge} = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

module.exports = merge(commonConfig, {
  plugins: [
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin(
    //   {
    //     patterns: [
    //       { from: path.join(__dirname, "../../src/Designer/public/"), to: path.join(__dirname, "../../dist/Designer/") }
    //     ]
    //   }
    // )
  ]
});
