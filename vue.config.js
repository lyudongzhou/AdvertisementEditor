module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            console.log(111);
            // 为生产环境修改配置...
        } else {
            console.log(222);
            // 为开发环境修改配置...
        }
    }
}