const webpack = require("webpack");
module.exports = {
    pages: {
        index: {
            entry: 'src/Render/main.js',
            template: 'src/Render/index.html',
            filename: 'index.html'
        }
    },
    outputDir: 'dist/Render/',
    configureWebpack: {
      plugins: [
        new webpack.ProvidePlugin({
          $:"jquery",
          jQuery:"jquery",
          "windows.jQuery":"jquery"
        })
      ]
    }
};
