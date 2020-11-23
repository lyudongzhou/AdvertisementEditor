const productionConfig = require("../webpack.production.js");
const {merge} = require('webpack-merge');
module.exports = merge(productionConfig, {
  // buildConfig
});
