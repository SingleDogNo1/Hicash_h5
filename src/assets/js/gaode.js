var getLocation = function() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(locationSuccess, locationError, {
				enableHighAcuracy: true, // 指示浏览器获取高精度的位置，默认为false
				timeout: 50000, // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
				maximumAge: 3000
				// 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
			})
		} else {
			locationByIp()
		}
	},
	locationSuccess = function(position) {
		//将经纬度转换为坐标数组
		var gpsH = [position.coords.longitude, position.coords.latitude]
		console.info("gpsH", gpsH)
		alert("position.coords.longitude:" + position.coords.longitude)
	},
	locationError = function(error) {
		alert("error")
		locationByIp()
	},
	locationByIp = function() {
		//在之后会详细说明
	}
getLocation()
