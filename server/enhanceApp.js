const fs = require("fs");
const path = require("path");
module.exports = app => {
  app.get('/testSchema', (req, res) => {
    let result = fs.readFileSync(path.resolve(__dirname, "../testData/schema.json"), 'utf8');
    res.send(result)
  });
  app.get('/schema', (req, res) => {
    let result = fs.readFileSync(path.resolve(__dirname, "../testData/designer/schema.json"), 'utf8');
    res.send(result)
  });
}
