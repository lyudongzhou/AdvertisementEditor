const path = require('path');
const commonConfig = require("./webpack.common.js");
const {merge} = require('webpack-merge');
const enhanceApp = require('../server/enhanceApp');
module.exports = merge(commonConfig, {
  devServer: {
    contentBase: path.join(__dirname, "../testData/"),
    open: true,
    before(app) {
      // enhanceApp(app);
    },
    proxy:{
      "/openapi":{
        target:"http://saberxf.rz-edu.cn/api/xf-open/",
        pathRewrite:{
          // "^/openapi":"/"
        }
      }
    }
  }
});
