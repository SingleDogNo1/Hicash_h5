import axios from 'axios';

export default {
  queryWithdrawData: queryWithdrawData
}

/*
 *  获取提现相关数据
 */
export function queryWithdrawData(params) {
	return new Promise((resolve, reject) => {
		axios.post('/HicashAppService/QueryWithdrawData', params).then(
			(res) => {
				resolve(res);
			},
			(err) => {
				reject(err);
			}
		);
	});
}