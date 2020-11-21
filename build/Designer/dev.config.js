const webpack = require("webpack");
const path = require('path');
console.log(path.join(__dirname,"../../src/Designer/public/"));
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
      devServer:{
          contentBase:path.join(__dirname,"../../src/Designer/public/"),
          open:true
      },
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    }
};
