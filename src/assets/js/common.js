import utils from "./utils";
import axios from "axios";
import config from "../../config.json";

export default {
	setAuthorization: setAuthorization,
	Cache: Cache,
	jumpPage: jumpPage,
	getComeFrom: getComeFrom,
	onCallApp: onCallApp
};

/*
 *  生成token
 */
export function setAuthorization(userName, token) {
	if (userName && token) {
		var authorization = userName + ":" + token;
		authorization = "Basic " + utils.codeBase64().enCode(authorization);
		sessionStorage.setItem("authorization", authorization);
	} else {
		var authorization = sessionStorage.getItem("authorization");
		if (!authorization) return;
	}

	axios.defaults.headers.common["Authorization"] = authorization;
	axios.defaults.headers.post["Content-Type"] =
		'application/json;charset=UTF-8"';
}

/*
 *  cache对象
 */
export function Cache() {
	let obj = {};
	return {
		//获取cache
		get: k => {
			return obj[k] || null;
		},

		//存储cache
		put: (k, v) => {
			obj[k] = v;
		},

		//移除cache
		remove: k => {
			delete obj[k];
		},

		//删除所有cache
		clean: () => {
			obj = {};
		}
	};
}
//判断是否存在接口，防止复写 移动端 的方法
if (!window.hicashJSCommunication) {
	//封装 JSAPI
	window.hicashJSCommunication = {
		jumpPage: jumpPage,
		getComeFrom: getComeFrom,
		onCallApp: onCallApp,
		getDomainName: getDomainName,
		getToken: getToken
	};
}

//跳转
export function jumpPage(obj) {
	obj = JSON.parse(obj);
	var type = obj.type;
	if (type == "h5_user_center") {
		location.href =
			MWEB_PATH + "newweb/personalCenter/perCenter.html?from=perCenter";
	} else if (type == "h5_sign") {
		location.href =
			MWEB_PATH +
			"newweb/personalCenter/signature_new.html?appNo=" +
			obj.app_no +
			"&industryCode=" +
			obj.industry_code;
	} else if (type == "h5_chargerepay") {
		location.href =
			MWEB_PATH +
			"newweb/personalCenter/rechargePay.html?appNo=" +
			obj.app_no +
			"&userName=" +
			obj.userName;
	} else if (type == "dishonestCenter") {
		location.href = MWEB_PATH + "newweb/infoList/list.html";
	}
}

//获取comeFrom
export function getComeFrom() {
	return "H5";
}

export function onCallApp(params) {
	var _data = JSON.parse(params);
	if (_data.type === "h5_service") {
		location.href = "tel:" + _data.tell_number;
	} else if (_data.type === "bind_card_success") {
		location.href =
			MWEB_PATH +
			"newweb/creditInfo/bandBank.html?type=bind_card_success&back=7";
	} else if (_data.type === "bind_card") {
		location.href = MWEB_PATH + "newweb/creditInfo/bandBank.html?back=7";
	} else if (_data.type === "dl") {
		location.href = config.NEW_MWEB_PATH + "/login";
	}
}

//告诉APP域名
export function getDomainName(url) {
	return "";
}

export function getToken() {
	return "";
}
