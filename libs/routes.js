/**
 * 路由
 */
var express = require('express');
var file = require(__base + 'libs/modules/file');

//新库测试
module.exports = function(app) {
	//文件上传
	app.post('/file-upload', file.upload);
}