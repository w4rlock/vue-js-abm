// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    index: path.resolve(__dirname, 'dist/index.html'),
    assetsRoot: path.resolve(__dirname, 'dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true
  },
  dev: {
    port: 8080,
    proxyTable: { 
		 '/api': {
        target: 'http://localhost:8080/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
		}
	}
}
