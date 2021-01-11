const createProxyMiddleware = require('http-proxy-middleware');

const filter = function (pathname, req) {
  delete require.cache[require.resolve('./proxyConfig')];
  const proxyPaths = require('./proxyConfig');
  return proxyPaths.some(x => pathname === x);
};
module.exports = createProxyMiddleware(filter, {
  target: 'http://saberxf.rz-edu.cn/api/xf-open',
  changeOrigin: true,
});