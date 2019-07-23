import axios from "axios"

export default {
	withHoldBank: withHoldBank,
	getOwnData: getOwnData,
	searchBankCard: searchBankCard,
	bankcardInfo: bankcardInfo,
	queryAppBankInfo: queryAppBankInfo,
	signNindCardSendSms: signNindCardSendSms,
	signBindCard: signBindCard
}

/*
 *  获取银行卡列表
 */
export function withHoldBank() {
	return new Promise((resolve, reject) => {
		axios.post("/NewHicashService/WithHoldBank").then(
			res => {
				resolve(res)
			},
			err => {
				reject(err)
			}
		)
	})
}

/*
 *  非请求接口信息----通付盾
 */
export function getOwnData() {
	return new Promise((resolve, reject) => {
		axios.get("/get-own-data").then(
			res => {
				resolve(res)
			},
			err => {
				reject(err)
			}
		)
	})
}

/*
 *  查询银行卡信息
 */
export function searchBankCard(params) {
	return new Promise((resolve, reject) => {
		axios.post("/HicashAppService/SearchBankCard", params).then(
			res => {
				resolve(res)
			},
			err => {
				reject(err)
			}
		)
	})
}

/*
 *  获取银行卡信息
 */
export function bankcardInfo(params) {
	return new Promise((resolve, reject) => {
		axios.post("/NewHicashService/BankcardInfo", params).then(
			res => {
				resolve(res)
			},
			err => {
				reject(err)
			}
		)
	})
}

/*
 *  获取订单银行卡信息(宜信)
 */
export function queryAppBankInfo(params) {
	return new Promise((resolve, reject) => {
		axios.post("/hicash-api-service/queryAppBankInfo", params).then(
			res => {
				resolve(res)
			},
			err => {
				reject(err)
			}
		)
	})
}

/*
 *  协议前绑卡发送验证码(宜信)
 */
export function signNindCardSendSms(params) {
	return new Promise((resolve, reject) => {
		axios.post("/hicash-api-service/sign/bindCardSendSms", params).then(
			res => {
				resolve(res)
			},
			err => {
				reject(err)
			}
		)
	})
}

/*
 *  协议前绑卡绑定银行卡(宜信)
 */
export function signBindCard(params) {
	return new Promise((resolve, reject) => {
		axios.post("/hicash-api-service/sign/bindCard", params).then(
			res => {
				resolve(res)
			},
			err => {
				reject(err)
			}
		)
	})
}
