export default{
  uuid: uuid,
  checkMobile: checkMobile,
  setCookie: setCookie,
  getCookie: getCookie,
  clearCookie: clearCookie
}

export function uuid() {
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
	s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";

	var uuid = s.join("");
	return uuid;
}

export function checkMobile(mobile) {
    var reg = /^1(3|4|5|7|8)\d{9}$/;
    return reg.test(mobile)
}

export function setCookie(c_name, value) {
	document.cookie = c_name + "=" + escape(value) + "; path=/;";
}

export function getCookie(c_name, value) {
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg)){
		return unescape(arr[2]);
	}else{
		var ls = localStorage.getItem(name);
		return ls;
	}
	return null;
}

export function clearCookie() {
	var myDate=new Date();
	var today="AD"+myDate.getFullYear()+(myDate.getMonth()+1)+myDate.getDate();
	var isRead="pjread";//评级是否已读，0未读，1已读
	var pjUser="pj";//用户评级
	var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
	if (keys) {
		for (var i = keys.length; i--;) {
			if(keys[i]!=today&&keys[i]!=isRead&&keys[i]!=pjUser){
				setCookie(keys[i],"");
			}
		}
	}
}