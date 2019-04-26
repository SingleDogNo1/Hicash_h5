import axios from 'axios';

export default {
  showWaitTime: showWaitTime
}

/*
 *  事例
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