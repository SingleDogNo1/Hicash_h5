import axios from 'axios';

export default {
  showWaitTime: showWaitTime,
  querySignPageData: querySignPageData
}

/*
 *  获取借款进度
 */
export function showWaitTime(params) {
	return new Promise((resolve, reject) => {
		axios.post('/HicashAppService/ShowWaitTime', params).then(
			(res) => {
				resolve(res);
			},
			(err) => {
				reject(err);
			}
		);
	});
}

/*
 *  获取签约页面数据接口
 */
export function querySignPageData(params) {
	return new Promise((resolve, reject) => {
		axios.post('/hicash-api-service/querySignPageData', params).then(
			(res) => {
				resolve(res);
			},
			(err) => {
				reject(err);
			}
		);
	});
}