const projectName = require('./project');
const webpack = require("webpack");
const devRender = require("./Render/dev.config");
const buildRender = require("./Render/build.config");
const devDesigner = require("./Designer/dev.config");
// console.log(devRender);
// console.log(process.env.BuildType==="development");
const config = process.env.BuildType==="development"?{
    Render: devRender,
    Designer: devDesigner
}:{
    Render:buildRender,
    Designer: devDesigner
}

const configObj = config[projectName.name]//这一部控制导出哪个项目下的配置
console.log(projectName.name);
module.exports = configObj;
