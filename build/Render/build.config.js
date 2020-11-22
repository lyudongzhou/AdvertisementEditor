const commonConfig = require("../webpack.common.js");
const {merge} = require('webpack-merge');
require("copy-webpack-plugin");
module.exports = merge(commonConfig, {
    // buildConfig
});
