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
        target: 'http://192.168.0.101:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
		}
	}
}
