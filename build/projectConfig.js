const devRender = require("./Render/dev.config");
const buildRender = require("./Render/build.config");
const devDesigner = require("./Designer/dev.config");
const buildDesigner = require("./Designer/build.config");
const buildEntry = require('./entry');

const webpackConfigMap = {
  Render: {
    dev: devRender,
    product: buildRender,
  },
  Designer: {
    dev: devDesigner,
    product: buildDesigner,
  }
};
const projectName = process.env.Project;
const webpackConfig = webpackConfigMap[projectName];
const isDevEnv = process.env.BuildType === "development";

module.exports = {
  ...buildEntry(projectName),
  configureWebpack: webpackConfig[isDevEnv ? 'dev' : 'product'],
};
