const renderDevConfig = require("../Render/dev.config");
const {merge} = require('webpack-merge');
const path = require("path");
module.exports = merge(renderDevConfig, {
  devServer: {
    contentBase: path.join(__dirname, "../../src/Designer/public/"),
    open: true,
  }
});
