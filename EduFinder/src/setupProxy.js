const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Khi chạy local: chuyển /api/xyz -> http://localhost:3001/xyz
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  );
};
