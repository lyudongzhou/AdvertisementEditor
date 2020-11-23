const webpack = require("webpack");

// 公用webpack配置
module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "windows.jQuery": "jquery",
    }),
    // new webpack.DefinePlugin({
    //   PRODUCTION:!(process.env.BuildType === "development")
    // })
  ],
};