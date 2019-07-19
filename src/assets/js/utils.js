export default {
	uuid: uuid, //生成uuid
	getQueryString: getQueryString, //截取URL参数
	setCookie: setCookie, //设置cookie
	getCookie: getCookie, //读取cookie
	delCookie: delCookie, //删除cookie
	clearCookie: clearCookie, //清空cookie
	checkMobile: checkMobile, //校验手机号是否合法
	codeBase64: codeBase64, //Base64编码、解码
	timeCount: timeCount, //获取短信验证码倒计时
	checkInviteCode: checkInviteCode, //校验邀请码
	checkIdCardNumber: checkIdCardNumber, //校验身份证号
	checkEmail: checkEmail, //校验邮箱
	checkRealName: checkRealName, //校验真实姓名
	checkAearTel: checkAearTel, //校验固话(带区号)
	checkCardNum: checkCardNum, //校验借记卡号
	getPlatform: getPlatform, //获取comeFrom
	toThousands: toThousands, //格式化数据格式字符串 没三位添加逗号
	checkPwd: checkPwd, //校验密码是否合法
	getDevice: getDevice, //判断是否是移动端
	formatSeconds: formatSeconds, // 将秒格式化为秒、分、小时
	checkNumber: checkNumber,
	getDeviceName: getDeviceName, //获取设备类型
	toDecimal2: toDecimal2 //保留2位小数，如：2，会在2后面补上00.即2.00
}

export function uuid() {
	var s = []
	var hexDigits = "0123456789abcdef"
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
	}

	s[14] = "4"
	// bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
	// bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-"
	var uuid = s.join("")
	return uuid
}

export function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
	var r = window.location.search.substr(1).match(reg)
	if (r != null) return unescape(r[2])

	return null
}

export function checkMobile(mobile) {
	var reg = /^1(3|4|5|7|8|9)\d{9}$/
	return reg.test(mobile)
}

export function setCookie(c_name, value) {
	document.cookie = c_name + "=" + escape(value) + "; path=/;"
}

// 读取cookies
export function getCookie(name) {
	var arr,
		reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
	if ((arr = document.cookie.match(reg))) {
		return unescape(arr[2])
	} else {
		var ls = localStorage.getItem(name)
		return ls
	}
	return null
}

export function delCookie(name) {
	var exp = new Date()
	exp.setTime(exp.getTime() - 1)
	var cval = getCookie(name)
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()
}

export function clearCookie() {
	var myDate = new Date()
	var today =
		"AD" + myDate.getFullYear() + (myDate.getMonth() + 1) + myDate.getDate()
	var isRead = "pjread"
	//评级是否已读，0未读，1已读
	var pjUser = "pj"
	//用户评级
	var keys = document.cookie.match(/[^ =;]+(?=\=)/g)

	if (keys) {
		for (var i = keys.length; i--; ) {
			if (keys[i] != today && keys[i] != isRead && keys[i] != pjUser) {
				setCookie(keys[i], "")
			}
		}
	}
}

// 判断是否是移动端
export function getDevice() {
	if (
		navigator.userAgent.match(
			/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
		)
	) {
		return "mobile"
	} else {
		return "pc"
	}
}

//获取设备类型
export function getDeviceName() {
	var u = navigator.userAgent
	var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1 //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
	if (isAndroid) {
		return "android"
	} else if (isiOS) {
		return "ios"
	} else {
		return "pc"
	}
}

/**
 * base64 编码、 解码
 */
export function codeBase64() {
	var base64EncodeChars =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
	var base64DecodeChars = new Array(
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		62,
		-1,
		-1,
		-1,
		63,
		52,
		53,
		54,
		55,
		56,
		57,
		58,
		59,
		60,
		61,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		0,
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10,
		11,
		12,
		13,
		14,
		15,
		16,
		17,
		18,
		19,
		20,
		21,
		22,
		23,
		24,
		25,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		26,
		27,
		28,
		29,
		30,
		31,
		32,
		33,
		34,
		35,
		36,
		37,
		38,
		39,
		40,
		41,
		42,
		43,
		44,
		45,
		46,
		47,
		48,
		49,
		50,
		51,
		-1,
		-1,
		-1,
		-1,
		-1
	)
	/**
	 * base64编码
	 * @param {Object} str
	 */
	function base64encode(str) {
		var out, i, len
		var c1, c2, c3
		len = str.length
		i = 0
		out = ""
		while (i < len) {
			c1 = str.charCodeAt(i++) & 0xff
			if (i == len) {
				out += base64EncodeChars.charAt(c1 >> 2)
				out += base64EncodeChars.charAt((c1 & 0x3) << 4)
				out += "=="
				break
			}
			c2 = str.charCodeAt(i++)
			if (i == len) {
				out += base64EncodeChars.charAt(c1 >> 2)
				out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4))
				out += base64EncodeChars.charAt((c2 & 0xf) << 2)
				out += "="
				break
			}
			c3 = str.charCodeAt(i++)
			out += base64EncodeChars.charAt(c1 >> 2)
			out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4))
			out += base64EncodeChars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6))
			out += base64EncodeChars.charAt(c3 & 0x3f)
		}
		return out
	}
	/**
	 * base64解码
	 * @param {Object} str
	 */
	function base64decode(str) {
		var c1, c2, c3, c4
		var i, len, out
		len = str.length
		i = 0
		out = ""
		while (i < len) {
			/* c1 */
			do {
				c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
			} while (i < len && c1 == -1)
			if (c1 == -1) break
			/* c2 */
			do {
				c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
			} while (i < len && c2 == -1)
			if (c2 == -1) break
			out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4))
			/* c3 */
			do {
				c3 = str.charCodeAt(i++) & 0xff
				if (c3 == 61) return out
				c3 = base64DecodeChars[c3]
			} while (i < len && c3 == -1)
			if (c3 == -1) break
			out += String.fromCharCode(((c2 & 0xf) << 4) | ((c3 & 0x3c) >> 2))
			/* c4 */
			do {
				c4 = str.charCodeAt(i++) & 0xff
				if (c4 == 61) return out
				c4 = base64DecodeChars[c4]
			} while (i < len && c4 == -1)
			if (c4 == -1) break
			out += String.fromCharCode(((c3 & 0x03) << 6) | c4)
		}
		return out
	}
	/**
	 * utf16转utf8
	 * @param {Object} str
	 */
	function utf16to8(str) {
		var out, i, len, c
		out = ""
		len = str.length
		for (i = 0; i < len; i++) {
			c = str.charCodeAt(i)
			if (c >= 0x0001 && c <= 0x007f) {
				out += str.charAt(i)
			} else if (c > 0x07ff) {
				out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f))
				out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f))
				out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f))
			} else {
				out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f))
				out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f))
			}
		}
		return out
	}
	/**
	 * utf8转utf16
	 * @param {Object} str
	 */
	function utf8to16(str) {
		var out, i, len, c
		var char2, char3
		out = ""
		len = str.length
		i = 0
		while (i < len) {
			c = str.charCodeAt(i++)
			switch (c >> 4) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
					// 0xxxxxxx
					out += str.charAt(i - 1)
					break
				case 12:
				case 13:
					// 110x xxxx 10xx xxxx
					char2 = str.charCodeAt(i++)
					out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f))
					break
				case 14:
					// 1110 xxxx10xx xxxx10xx xxxx
					char2 = str.charCodeAt(i++)
					char3 = str.charCodeAt(i++)
					out += String.fromCharCode(
						((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0)
					)
					break
			}
		}
		return out
	}

	var e = {}
	//编码
	e.enCode = function(str) {
		return base64encode(utf16to8(str))
	}
	//解码
	e.deCode = function(str) {
		return utf8to16(base64decode(str))
	}
	return e
}

export function timeCount(time, callback) {
	var msg
	var time
	var timer
	if (time == 0) {
		msg = "获取验证码"
		callback(msg)
	} else {
		msg = time + "s"
		time--
		timer = setTimeout(function() {
			timeCount(time, callback)
		}, 1000)
		callback(msg)
	}
}

export function checkInviteCode(inviteCode) {
	var reg = /^[A-Za-z0-9]{6}$/
	return reg.test(inviteCode)
}

export function checkIdCardNumber(id) {
	var reg = /(^[1-9]\d{5}(18|19|20|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/
	return reg.test(id)
}

export function checkEmail(email) {
	var reg = /^(\w)+(\.\w+)*@(\w\-?)+((\.\w+)+)$/
	return reg.test(email)
}

export function checkRealName(realName) {
	var reg = /^[\u4e00-\u9fa5]{2,}$/
	return reg.test(realName)
}

export function checkAearTel(tel) {
	var reg = /^0[0-9]{2,3}-[0-9]{7,8}$/
	return reg.test(tel)
}

export function checkCardNum(cardNum) {
	var reg = /^[0-9]{10,20}$/
	return reg.test(cardNum)
}

export function getPlatform() {
	var ua = navigator.userAgent
	var comeFrom =
		ua.indexOf("comeFrom:iOS") > -1 || ua.indexOf("comeFrom:android") > -1
			? "APP"
			: "H5"
	return comeFrom
}

export function toThousands(num) {
	var num = (num || 0).toString(),
		re = /\d{3}$/,
		result = ""
	while (re.test(num)) {
		result = RegExp.lastMatch + result
		if (num !== RegExp.lastMatch) {
			result = "," + result
			num = RegExp.leftContext
		} else {
			num = ""
			break
		}
	}
	if (num) {
		result = num + result
	}
	return result
}

export function checkPwd(pwd) {
	var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
	return reg.test(pwd)
}

export function formatSeconds(value) {
	var secondTime = parseInt(value) // 秒
	var minuteTime = 0 // 分
	var hourTime = 0 // 小时
	if (secondTime > 60) {
		//如果秒数大于60，将秒数转换成整数
		//获取分钟，除以60取整数，得到整数分钟
		minuteTime = parseInt(secondTime / 60)
		//获取秒数，秒数取佘，得到整数秒数
		secondTime = parseInt(secondTime % 60)
		//如果分钟大于60，将分钟转换成小时
		if (minuteTime > 60) {
			//获取小时，获取分钟除以60，得到整数小时
			hourTime = parseInt(minuteTime / 60)
			//获取小时后取佘的分，获取分钟除以60取佘的分
			minuteTime = parseInt(minuteTime % 60)
		}
	}
	var result = "" + parseInt(secondTime) + "秒"

	if (minuteTime > 0) {
		result = "" + parseInt(minuteTime) + "分" + result
	}
	if (hourTime > 0) {
		result = "" + parseInt(hourTime) + "小时" + result
	}
	return result
}
export function checkNumber(num) {
	var reg = /^(([0-9]+)|([0-9]+\.[0-9]{1,2}))$/
	return reg.test(num)
}
export function toDecimal2(x) {
	var f = Math.round(x * 100) / 100
	var s = f.toString()
	var rs = s.indexOf(".")
	if (rs < 0) {
		rs = s.length
		s += "."
	}
	while (s.length <= rs + 2) {
		s += "0"
	}
	return s
}
