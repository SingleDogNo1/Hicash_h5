import axios from "axios";

export default {
  withHoldBank: withHoldBank,
	getOwnData: getOwnData,
  searchBankCard: searchBankCard,
  bankcardInfo: bankcardInfo
}

/*
 *  获取银行卡列表
 */
export function withHoldBank() {
	return new Promise((resolve, reject) => {
		axios.post("/NewHicashService/WithHoldBank").then(
			res => {
				resolve(res);
			},
			err => {
				reject(err);
			}
		);
	});
}

/*
 *  非请求接口信息----通付盾
 */
export function getOwnData() {
	return new Promise((resolve, reject) => {
		axios.get("/get-own-data").then(
			res => {
				resolve(res);
			},
			err => {
				reject(err);
			}
		);
	});
}

/*
 *  查询银行卡信息
 */
export function searchBankCard(params) {
	return new Promise((resolve, reject) => {
		axios.post("/HicashAppService/SearchBankCard", params).then(
			res => {
				resolve(res);
			},
			err => {
				reject(err);
			}
		);
	});
}

/*
 *  获取银行卡信息
 */
export function bankcardInfo(params) {
	return new Promise((resolve, reject) => {
		axios.post("/NewHicashService/BankcardInfo", params).then(
			res => {
				resolve(res);
			},
			err => {
				reject(err);
			}
		);
	});
}
