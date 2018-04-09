var express = require('express');
var path = require('path');
// 创建一个express实例
var app = express();
var webpack = require('webpack');
var webpackConfig = require('./build/webpack.dev.conf');
// 调用webpack并把配置传递过去 
var compiler = webpack(webpackConfig);  
// 使用 webpack-dev-middleware 中间件  
var devMiddleware = require('webpack-dev-middleware')(compiler, {   
   	publicPath: '/',   
   	stats: {colors: true,chunks: false}  
});    
var history = require('connect-history-api-fallback');
app.use(history());
if(app.get('env') == 'development'){
	app.use(devMiddleware); 
    app.use(require("webpack-hot-middleware")(compiler));  
}else{
	app.use(express.static('dist'));
}

app.get('/', function (req, res) {
    console.info('req', req);
});

//监听转发接口
app.use(function(err, req, res, next) {
       console.info('err, req, res, next ==== ', err, req, res, next);
  // // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;