const api = require('./api');
const bodyParser = require('body-parser');//用于req.body获取值的

module.exports = app => {
  app.use(bodyParser.json());
  app.use('/api', api);
}
