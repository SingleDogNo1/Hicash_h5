import config from '../../config.json'
function uuid(){
    var s = [];
    var hexDigits ="0123456789abcdef";
    for (var i = 0;
    i < 36;

    i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }

    s[14] = "4";
    // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    var val = s.join("");
    return val;
}

// 设置cookies
function setCookie(c_name, value) {
	document.cookie = c_name + "=" + escape(value) + "; path=/;";
}

function getCookie(name) {

	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg)){
		return unescape(arr[2]);
	}
	return null;
}

var uuidVal = getCookie('uuid');

if(!uuidVal || !uuidVal.length){
    uuidVal = uuid();
    setCookie('uuid', uuidVal)
}

window._saber = {
    partnerId: 'dpandora', 
    tokenKey: uuidVal
};
var aa = document.createElement('script'); aa.async = true;
aa.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + config.baiqishi_url +'?t='	+	(new Date().getTime()/3600000).toFixed(0);
var bb = document.getElementsByTagName('script')[0]; bb.parentNode.insertBefore(aa, bb);

