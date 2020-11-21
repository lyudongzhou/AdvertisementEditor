const renderDevConfig = require("../Render/dev.config");
const {merge} = require('webpack-merge');

module.exports = merge(renderDevConfig, {
    // designer dev config
});