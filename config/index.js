'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    env: require('./dev.env'),
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    // Various Dev Server settings
    host: '127.0.0.1', // can be overwritten by process.env.HOST
    port: 9002, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */
    devtool: 'cheap-module-eval-source-map',
    cacheBusting: true,
    cssSourceMap: true,
    /**
     * 添加新的代理的同时nginx也要增加，否则生产和测试环境无法生效 
     */
    proxyTable: {
      '/HicashAppService':{
        target:' http://115.29.193.125:8081/HicashAppService',
        changeOrigin:true,
        pathRewrite:{
            '^/HicashAppService':''
        }
      },
      '/NewHicashService':{
        target:'http://115.29.250.40:8081/NewHicashService',
        changeOrigin:true,
        pathRewrite:{
            '^/NewHicashService':''
        }
      },
      '/HicashService':{
        target:'http://115.29.250.40:8080/HicashService',
        changeOrigin:true,
        pathRewrite:{
            '^/HicashService':''
        }
      },
      '/ruleService':{
        target:'http://218.244.138.24:8086/ruleService',
        changeOrigin:true,
        pathRewrite:{
            '^/ruleService':''
        }
      },
      '/hicash-api-service':{
        target:'http://47.104.254.92:30079/hicash-api-service',
        changeOrigin:true,
        pathRewrite:{
            '^/hicash-api-service':''
        }
      }
    }
  },

  build: {
    env: require('./prod.env'),
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/hicash-h5/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
