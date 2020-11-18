const projectName = require('./project');
const webpack = require("webpack");
const config = {
    Render: {
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
    },
    Designer: {
        pages: {
            index: {
                entry: 'src/Designer/main.js',
                template: 'src/Designer/index.html',
                filename: 'index.html',
            }
        },
        outputDir: 'dist/Designer/',
    }
}

const configObj = config[projectName.name]//这一部控制导出哪个项目下的配置
console.log(projectName.name);
module.exports = configObj;
