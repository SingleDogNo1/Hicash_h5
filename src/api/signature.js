import axios from "axios"

export default {
	showWaitTime: showWaitTime,
	querySignPageData: querySignPageData
}

/*
 *  获取借款进度
 */
export function showWaitTime(params) {
	return new Promise((resolve, reject) => {
		axios.post("/HicashAppService/ShowWaitTime", params).then(
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
 *  获取签约页面数据接口
 */
export function querySignPageData(params) {
	return new Promise((resolve, reject) => {
		// let res = {
		// 	data:{
		// 		"resultCode": "1",
		// 		"resultMsg": "SUCCESS",
		// 		"appNo": "31907020100004",
		// 		"userName": "15355684521",
		// 		"nowDate": "2019-01-01 12:00:00",
		// 		"applyAmt": "2000.00",
		// 		"period": "3",
		// 		"haveCoupon": true,
		// 		"tip": "理性消费，合理贷款...",
		// 		"feeList": [
		// 			{
		// 				"name": "本息还款",
		// 				"amount": "1061.00",
		// 				"period": "3"
		// 			},
		// 			{
		// 				"name": "金额信息服务费",
		// 				"amount": "168.00",
		// 				"period": "3",
		// 				"subName": "该服务产生的费用需按期缴纳详情请查看",
		// 				"agreements": [
		// 					{
		// 						"name": "《金额信息服务费协议》",
		// 						"link": "https://dev.hicahs.cn/agreement/asd.html"
		// 					}
		// 				]
		// 			},
		// 			{
		// 				"name": "本息还款",
		// 				"amount": "1061.00",
		// 				"amountDes": "一次性划扣",
		// 				"period": "3",
		// 				"subName": "该服务产生的费用在借款到账后需一次性划扣，详情请查看",
		// 				"agreements": [
		// 					{
		// 						"name": "委托划扣授权书",
		// 						"link": "https://dev.hicahs.cn/agreement/asd.html"
		// 					}
		// 				]
		// 			}
		// 		],
		// 		"repayPlanList": [
		// 			{
		// 				"title": "还款计划",
		// 				"repayPlanItems": [
		// 					{
		// 						"name": "首期",
		// 						"amount": "1229.00",
		// 						"description": "含本金1000.00+利息61.00+金融信息服务费168.00"
		// 					},
		// 					{
		// 						"name": "2期",
		// 						"amount": "1229.00",
		// 						"description": "含本金1000.00+利息61.00+金融信息服务费168.00"
		// 					},
		// 					{
		// 						"name": "3期",
		// 						"amount": "1229.00",
		// 						"description": "含本金1000.00+利息61.00+金融信息服务费168.00"
		// 					}
		// 				]
		// 			},
		// 			{
		// 				"title": "还款计划2",
		// 				"subTitle": "互联网信息服务划扣失效",
		// 				"repayPlanItems": [
		// 					{
		// 						"name": "首期",
		// 						"amount": "1424.00",
		// 						"description": "含本金1000.00+利息61.00+金融信息服务费168.00+互联网信息服务费195.00"
		// 					},
		// 					{
		// 						"name": "2期",
		// 						"amount": "1424.00",
		// 						"description": "含本金1000.00+利息61.00+金融信息服务费168.00+互联网信息服务费195.00"
		// 					},
		// 					{
		// 						"name": "3期",
		// 						"amount": "1424.00",
		// 						"description": "含本金1000.00+利息61.00+金融信息服务费168.00+互联网信息服务费195.00"
		// 					}
		// 				]
		// 			}
		// 		],
		// 		"agreementList": [
		// 			{
		// 				"popInsuranceMsg":"",
		// 				"desBehind":"本人知晓并确认，上述借款交易是经过本人同意、通过如下撮合服务而达成，本人已阅读并充分理解如下协议的全部条款和内容，自愿并主动勾选签署如下协议，并自愿支付如下费用作为服务提供方的服务报酬。/n 提示：如果您不同意如下协议内容，请勿勾选，并且您申请的本次借款交易将视为被您本人取消。取消不收取任何费用。如您有任何疑虑，请取消本次申请。",
		// 				"agreeSignText":"本人承诺已认真阅读并将遵守",
		// 				"agreeLinkList":[
		// 					{
		// 						"name": "借款协议123123",
		// 						"link": "https://dev.hicahs.cn/agreement/asd.html"
		// 					},
		// 					{
		// 						"name": "借款用途确认书312",
		// 						"link": "https://dev.hicahs.cn/agreement/asd.html"
		// 					},
		// 					{
		// 						"name": "金额信息服务费协议3245345",
		// 						"link": "https://dev.hicahs.cn/agreement/asd.html"
		// 					},
		// 					{
		// 						"name": "委托划扣授权书8678",
		// 						"link": "https://dev.hicahs.cn/agreement/asd.html"
		// 					}
		// 					]
		// 			}
		// 			]
		// 	}
		// }
		// resolve(res);

		axios.post("/hicash-api-service/querySignPageData", params).then(
			res => {
				resolve(res)
			},
			err => {
				reject(err)
			}
		)
	})
}
