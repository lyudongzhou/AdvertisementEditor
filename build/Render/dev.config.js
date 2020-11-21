const webpack = require("webpack");
const path = require('path');
console.log(path.join(__dirname,"../../testData/"));
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
        devServer:{
            contentBase:path.join(__dirname,"../../testData/"),
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
