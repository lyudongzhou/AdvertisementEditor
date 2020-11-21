const webpack = require("webpack");

// render公用webpack配置
module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "windows.jQuery": "jquery",
    }),
  ],
};