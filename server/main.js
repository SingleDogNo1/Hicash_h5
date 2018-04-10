const express = require('express')
const bodyParser = require('body-parser')
const proxy = require('http-proxy-middleware')
const querystring = require('querystring')
const proxyConfig = require('./proxy.config')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.dev.conf');
const config = require('../config')
const ejs = require('ejs')
const compress = require('compression')

const app = express()
const port = process.env.PORT || config.dev.port
const localServer = `http://127.0.0.1:${port}`
const proxyTable = config.dev.proxyTable

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
//app.set('views', project.paths.template())
app.engine('.html', ejs.__express)
app.set('view engine', 'html')

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Apply gzip compression
app.use(compress())

// if (!process.env.NODE_ENV) {
//   process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
// }


// make http proxy middleware setting
const createProxySetting = function (url) {
  return {
    target: url,
    changeOrigin: true,
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    onProxyReq: function (proxyReq, req) {
      if (req.method === 'POST' && req.body) {
        const bodyData = querystring.stringify(req.body)
        proxyReq.write(bodyData)
      }
    }
  }
}

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (app.get('env') === 'development') {
  console.log('compiler====')
  const compiler = webpack(webpackConfig)
  const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
  })
  debug('Enabling webpack dev and HMR middleware')
  app.use(devMiddleware)
  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }))

  // proxy api requests
  Object.keys(proxyTable).forEach(function (context) {
    let options = proxyTable[context]
    if (typeof options === 'string') {
      options = createProxySetting(options)
    }
    app.use(context, proxyMiddleware(options))
  })

  // mock router
  app.use(project.compiler_mock_route, mock)

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(project.paths.public()))

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.

  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })

  devMiddleware.waitUntilValid(() => {
   // when env is testing, don't need open it
    if (project.open_browser) {
      opn(localServer)
    }
  })
} else {
  // debug(
  //   'Server is being run outside of live development mode, meaning it will ' +
  //   'only serve the compiled application bundle in ~/dist. Generally you ' +
  //   'do not need an application server for this and can instead use a web ' +
  //   'server such as nginx to serve your static files. See the "deployment" ' +
  //   'section in the README for more information on deployment strategies.'
  // )

  // // Serving ~/dist by default. Ideally these files should be served by
  // // the web server and not the app server, but this helps to demo the
  // // server in production.
  // app.use(project.compiler_public_path, express.static(project.paths.dist()))

  // app.use(project.compiler_base_route, routes)
  // app.use('*', function (req, res) {
  //   res.set('content-type', 'text/html')
  //   res.end(`<a href=${localServer}>访问os_mobile</a>`)
  // })
  // if (project.open_browser) {
  //   opn(localServer)
  // }
}

// parse application/json
//app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))

// proxy
//proxyConfig.forEach(function (item) {
   //app.use(item.url, proxy(createProxySetting(item.target)))
//})

// eg: http://127.0.0.1:3000/back_end/oppor => http://10.2.0.1:8352/back_end/oppor 