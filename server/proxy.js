const createProxyMiddleware = require('http-proxy-middleware');
const path = require("path");
const fs = require("fs");

const filter = function (pathname, req) {
  const proxyPath = fs.readFileSync(path.resolve(__dirname, `./proxyConfig`), 'utf8');
  const proxyPaths = proxyPath.split("\r\n").filter(x => x).map(x => `/api${x.trim()}`);
  return proxyPaths.some(x => pathname === x);
};
module.exports = createProxyMiddleware(filter, {
  target: 'https://saberxf.rz-edu.cn/api/xf-open',
  changeOrigin: true,
});