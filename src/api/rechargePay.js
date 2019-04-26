import axios from 'axios';

export default {
  navigateToRecharge: navigateToRecharge,
	rechargeCoupon: rechargeCoupon,
	userInfo: userInfo,
	applyRecharge: applyRecharge
}

/*
 *  navigateToRecharge
 */
export function navigateToRecharge(params) {
	return new Promise((resolve, reject) => {
		axios.post('/NewHicashService/navigateToRecharge', params).then(
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
 *  充值还款-优惠券列表
 */

export function rechargeCoupon(params) {
	return new Promise((resolve, reject) => {
		axios.post('/NewHicashService/RechargeCoupon', params).then(
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
 *  查询用户信息
 */

export function userInfo(params) {
	return new Promise((resolve, reject) => {
		axios.post('/NewHicashService/UserInfo', params).then(
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
 *  用户点击 笑脸订单充值页面的下一步，进行充值并返回进行中
 */

export function applyRecharge(params) {
	return new Promise((resolve, reject) => {
		axios.post('/NewHicashService/applyRecharge', params).then(
			(res) => {
				resolve(res);
			},
			(err) => {
				reject(err);
			}
		);
	});
}


