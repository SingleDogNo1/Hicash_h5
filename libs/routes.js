/**
 * 路由
 */
var express = require('express');
var file = require(__base + 'libs/modules/file');
var chooseRegion = require(__base + 'libs/modules/chooseRegion');
var ownData = require(__base + 'libs/modules/ownData');

//新库测试
module.exports = function(app) {
	//文件上传
	app.post('/file-upload', file.upload);
	//获取省列表
	app.get('/get-province', chooseRegion.getProvince);
	//获取市列表
	app.get('/get-city', chooseRegion.getCity);
	//获取区列表
	app.get('/get-area', chooseRegion.getArea);
	//非请求接口信息----通付盾
	app.get('/get-own-data', ownData.getOwnData);
}