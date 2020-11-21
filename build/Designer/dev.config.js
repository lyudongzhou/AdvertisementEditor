const webpack = require("webpack");
module.exports = {
    pages: {
        index: {
            entry: 'src/Designer/main.js',
            template: 'src/Designer/index.html',
            filename: 'index.html',
        }
    },
    outputDir: 'dist/Designer/',
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    }
};