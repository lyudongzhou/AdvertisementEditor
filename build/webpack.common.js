const webpack = require("webpack");
const path = require("path");
function resolve(p) {
  return path.resolve(__dirname, '../', p);
}
// 公用webpack配置
module.exports = {
  resolve: {
    alias: {
      '@': resolve('src/Utils'),
    }
  },
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