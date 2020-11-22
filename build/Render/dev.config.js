const path = require('path');
const commonConfig = require("../webpack.common.js");
const {merge} = require('webpack-merge');
module.exports = merge(commonConfig, {
  devServer: {
    contentBase: path.join(__dirname, "../../testData/"),
    open: true,
  }
});
