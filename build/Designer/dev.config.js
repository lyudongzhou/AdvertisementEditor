const devConfig = require("../webpack.dev.js");
const {merge} = require('webpack-merge');
module.exports = merge(devConfig, {

});
