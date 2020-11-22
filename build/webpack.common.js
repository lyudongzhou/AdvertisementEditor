const webpack = require("webpack");

// render公用webpack配置
module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "windows.jQuery": "jquery",
    }),
    new webpack.DefinePlugin({
      BASE_URL: process.env.BuildType === "development" ?  "'http://127.0.0.1:8888/'": "'/'",
      PRODUCTION:!(process.env.BuildType === "development")
    })
  ],
};