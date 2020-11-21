module.exports = function (entry) {
  return {
    pages: {
      index: {
        entry: `src/${entry}/main.js`,
        template: `src/${entry}/index.html`,
        filename: 'index.html',
      },
    },
    outputDir: `dist/${entry}/`,
  };
};