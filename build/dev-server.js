require('./check-versions')()

var config = require('../config');
var path = require('path');
var bodyParser = require('body-parser')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

//设置根目录路径
global.__base = process.cwd() + '/';
console.log('process=====', process.cwd())
//设置图片存储，默认配置为生产环境所需的绝对路径
var resourcesDir = 'ossfile';
//console.log('__dirname====', __dirname)

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())
console.log(app.get('env'))
if(app.get('env') == 'development'){
  // serve webpack bundle output
  app.use(devMiddleware)

  // enable hot-reload and state-preserving
  // compilation error display
  app.use(hotMiddleware)
  //如果是开发环境，单独配置上传路径
  resourcesDir = path.join(process.cwd() + '/ossfile');
}else{
  app.use(express.static('dist'));
}

app.set('resourcesDir', resourcesDir);
var cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var session = require('express-session');
app.use(cookieParser());
app.use(session({
  secret: 'mysecretcode',
  resave:false,
  saveUninitialized: true
}));
// app.configure(function() {
//   app.use(app.router);
// });
/**
 * 路由控制
 */
require('../libs/routes')(app);
// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://127.0.0.1:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

devMiddleware.waitUntilValid(() => {
  // when env is testing, don't need open it

  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

// app.all('/api',function(req,res){
// })

var server = app.listen(port)

console.info('Express server listening on port ' + port);
console.info('This is a ' + app.get('env') + ' version.');

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
