const renderBuildConfig = require("../Render/build.config");
const {merge} = require('webpack-merge');

module.exports = merge(renderBuildConfig, {
  // designer build config
});