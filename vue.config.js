const conf = require('./build/projectConfig');//引入多个项目的配置
module.exports = {
    pages: conf.pages,//使用不同的模板
    outputDir: conf.outputDir,//输出到不同的文件夹下
    devServer: conf.devServer,//代理服务器的配置不同,也主要是代理地址不同
    chainWebpack: conf.chainWebpack,
    configureWebpack: conf.configureWebpack
}
