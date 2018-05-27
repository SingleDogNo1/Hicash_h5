var request = require('request');
var fs = require('fs');
var _ = require('underscore');

/**
 * 获取省列表
 */
var getProvince = function (req, res) {
	var result = {};
	fs.readFile(__base + 'areaplay.json', 'utf8', function(err, data) {
		result.province = JSON.parse(data).province;
		res.send(result, 200);
	});
}

/**
 * 获取市列表
 */
var getCity = function (req, res) {
	var result = {};
	var provinceId = req.query.provinceId;
	fs.readFile(__base + 'areaplay.json', 'utf8', function(err, data) {
		var city = JSON.parse(data).city;
		city = city.filter(function(item){
			return item.provinceCode === provinceId;
		})
		result.city = city;
		res.send(result, 200);
	});
}

/**
 * 获取区列表
 */
var getArea = function (req, res) {
	var result = {};
	var cityId = req.query.cityId;
	fs.readFile(__base + 'areaplay.json', 'utf8', function(err, data) {
		var area = JSON.parse(data).area;
		area = area.filter(function(item){
			return item.cityCode === cityId;
		})
		result.area = area;
		res.send(result, 200);
	});
}

exports.getProvince = getProvince;
exports.getCity = getCity;
exports.getArea = getArea;