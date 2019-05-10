import axios from "axios";
import config from "../config.json";
import jsCommon from "../assets/js/common.js";
import qs from 'qs'

let cache = jsCommon.Cache();

export default {
	ShowPI: ShowPI,
	getIndexMain: getIndexMain,
	getHomePagePic: getHomePagePic,
	getAllLoanApplication: getAllLoanApplication,
	getAccountInfo: getAccountInfo,
	getSysParam: getSysParam,
	getImgCode: getImgCode,
	getMessageCode: getMessageCode,
	login: login,
	getUserGrade: getUserGrade,
	getSendPassWordCode: getSendPassWordCode,
	forgetPassWord: forgetPassWord,
	resetPassword: resetPassword,
	register: register,
	getApplyCouponList: getApplyCouponList,
	queryProductDetail: queryProductDetail,
	loanAmtCalculateForNew: loanAmtCalculateForNew,
	loanPay: loanPay,
	checkSupportApp: checkSupportApp,
	fastLoanFirst: fastLoanFirst,
	uploadPic: uploadPic,
	UpdateTempAppInfo: UpdateTempAppInfo,
	updatePicStatus: updatePicStatus,
	stuInfoQuery: stuInfoQuery,
	collarPersonInfo: collarPersonInfo,
	getProvince: getProvince,
	getCity: getCity,
	getArea: getArea,
	updateCollarPersonInfo: updateCollarPersonInfo,
	relationInfo: relationInfo,
	updateRelationInfo: updateRelationInfo,
	queryShouQuanSuc: queryShouQuanSuc,
	queryFirstExamineSuc: queryFirstExamineSuc,
	creditItems: creditItems,
	withHoldBank: withHoldBank,
	getOwnData: getOwnData,
	searchBankCard: searchBankCard,
	getSmallBannerDetail: getSmallBannerDetail,
	navigateToRecharge: navigateToRecharge,
	indexAdvertising: indexAdvertising,
	deleteVerificationCodeCount: deleteVerificationCodeCount,
	getRechargeCoupon: getRechargeCoupon,
	getCustHicashCoupon: getCustHicashCoupon,
	checkResultBaiQiShi: checkResultBaiQiShi,
	OwnPageShow: OwnPageShow,
	QueryMyMsg: QueryMyMsg,
	loseCreditInfo: loseCreditInfo,
	loseCreditDetail: loseCreditDetail,
	GsdtHyzxDetailMsg: GsdtHyzxDetailMsg,
	UpdateMsgStatus: UpdateMsgStatus,
	accountOrderPage: accountOrderPage,
	accountOrderList: accountOrderList,
	orderDetailInfo: orderDetailInfo,
	repayPlan: repayPlan,
	CancelAppPayByPad: CancelAppPayByPad,
	QueryWithdrawData: QueryWithdrawData,
	GetRandomNumber: GetRandomNumber,
	UpdateCustCard: UpdateCustCard,
	VerifyVideo: VerifyVideo,
	getCreditReport: getCreditReport,
	IsBottomShow: IsBottomShow,
	queryCreditUrl: queryCreditUrl,
	getUserCreditReports: getUserCreditReports,
	saveUserCreditInfo: saveUserCreditInfo,
	CheckCreditResult: CheckCreditResult,
	getCreditResult: getCreditResult,
	UpdateUserCreditReportStatus:UpdateUserCreditReportStatus,
	wxfx: wxfx,
	checkUserInfo: checkUserInfo,
	QueryPandoraUrl: QueryPandoraUrl,
	RepayProgram: RepayProgram,
	UserInfo: UserInfo,
	bankBin: bankBin,
	cardCheckFour: cardCheckFour,
	queryValName: queryValName,
	dispatchWithHoldChannel: dispatchWithHoldChannel,
	submitBindCardInfo: submitBindCardInfo,
	createAppPayByMD: createAppPayByMD,
	updateChannelApplicationStatusWacai: updateChannelApplicationStatusWacai
};

/*
 *  事例
 */
export function ShowPI(params) {
	return new Promise((resolve, reject) => {
		axios.post("/HicashAppService/ShowPI", params).then(
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
 *  获取首页数据
 */
export function getIndexMain(params) {
	return new Promise((resolve, reject) => {
		axios.post("/NewHicashService/indexMain", params).then(
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
 *  获取首页轮播图
 */
export function getHomePagePic(params) {
	return new Promise((resolve, reject) => {
		axios
			.get(
				"/HicashService/HomePagePic?cityCode=" +
				params.cityCode +
				"&uuid=" +
				params.uuid +
				"&position=" +
				params.position
			)
			.then(
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
 *  获取总金额
 */
export function getAllLoanApplication() {
	return new Promise((resolve, reject) => {
		axios.post("/NewHicashService/HomeData").then(
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
 *  查询申请件进度
 */
export function getAccountInfo(params) {
	var url =
		"/NewHicashService/AccountInfo?userName=" +
		params.userName +
		"&curPage=" +
		params.curPage +
		"&maxLine=" +
		params.maxLine +
		"&requestSource=" +
		config.requestSource +
		"&uuid=" +
		params.uuid +
		"&version=" +
		config.version;
	return new Promise((resolve, reject) => {
		//从内存中获取数据，如内存中不存在在请求server
		let accountInfoData = cache.get("AccountInfo");
		if (accountInfoData) {
			resolve(accountInfoData);
			return false;
		}

		axios.get(url).then(
			res => {
				if (res.data.resultCode == "1") {
					cache.put("AccountInfo", res);
				}
				resolve(res);
			},
			err => {
				reject(err);
			}
		);
	});
}

/*
 *  获取近期新闻
 */
export function getSysParam(params) {
	return new Promise((resolve, reject) => {
		axios.post("/NewHicashService/SysParam", params).then(
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
 *  获取登录页面的图形验证码
 */
export function getImgCode(params) {
	return new Promise((resolve, reject) => {
		axios.post("/hicash-api-service/AuthImage", params).then(
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
 *  获取登录页面的短信验证码
 */
export function getMessageCode(params) {
	return new Promise((resolve, reject) => {
		axios.post("/hicash-api-service/SmsVerificationCode", params).then(
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
 *  获取登录页面的短信验证码
 */
export function deleteVerificationCodeCount(params) {
	return new Promise((resolve, reject) => {
		axios
			.post("/hicash-api-service/DeleteVerificationCodeCount", params)
			.then(
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
 *  登录
 */
export function login(params) {
	return new Promise((resolve, reject) => {
		axios.post("/NewHicashService/Login", params).then(
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
 *  获取用户等级
 */
export function getUserGrade(params) {
	return new Promise((resolve, reject) => {
		axios.post("/NewHicashService/UserGrade", params).then(
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
 *  获取忘记密码页面的短信验证码
 */
export function getSendPassWordCode(params) {
	return new Promise((resolve, reject) => {
		axios.post("/NewHicashService/SendPassWordCode", params).then(
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
 *  忘记密码页面验证验证码
 */
export function forgetPassWord(params) {
	return new Promise((resolve, reject) => {
		axios.post("/HicashService/ForgetPassWord", params).then(
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
 *  忘记密码修改密码
 */
export function resetPassword(params) {
	return new Promise((resolve, reject) => {
		axios.post("/HicashService/ResetPassword", params).then(
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
 *  注册
 */
export function register(params) {
	return new Promise((resolve, reject) => {
		axios.post("/NewHicashService/RegisterNoCard", params).then(
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
 *  申请页优惠劵列表
 */
export function getApplyCouponList(params) {
	return new Promise((resolve, reject) => {
		axios.post("/NewHicashService/ApplyCouponList", params).then(
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
 *  产品详情
 */
export function queryProductDetail(params) {
	return new Promise((resolve, reject) => {
		axios.post("/NewHicashService/QueryProductDetail", params).then(
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
 *  贷款金额计算
 */
export function loanAmtCalculateForNew(params) {
	return new Promise((resolve, reject) => {
		axios.post("/HicashService/LoanAmtCalculateForNew", params).then(
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
 *  合规费率计算接口
 */
export function loanPay(params) {
	return new Promise((resolve, reject) => {
		axios.post("/HicashAppService/LoanPay", params).then(
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
 *  判断是否支持该产品(滴滴贷)
 */
export function checkSupportApp(params) {
	return new Promise((resolve, reject) => {
		axios.post("/HicashAppService/CheckSupportApp", params).then(
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
 *  创建临时订单
 */
export function fastLoanFirst(params) {
	return new Promise((resolve, reject) => {
		axios.post("/HicashService/FastLoanFirst", params).then(
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
 *  查询图片保存地址
 */
export function uploadPic(params) {
	return new Promise((resolve, reject) => {
		axios.post("/file-upload", params).then(
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
 *  临时申请件表保存验证状态
 */
export function UpdateTempAppInfo(params) {
	return new Promise((resolve, reject) => {
		axios.post("/HicashAppService/UpdateTempAppInfo", params).then(
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
 *  更新图片状态
 */
export function updatePicStatus(params) {
	return new Promise((resolve, reject) => {
		axios.post("/HicashAppService/UpdatePicStatus", params).then(
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
 *  查询个人信息 (学生)
 */
export function stuInfoQuery(params) {
	return new Promise((resolve, reject) => {
		axios.post("/HicashAppService/StuInfoQuery", params).then(
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
 *  查询个人信息 (白领)
 */
export function collarPersonInfo(params) {
	return new Promise((resolve, reject) => {
		axios.post("/HicashAppService/CollarPersonInfo", params).then(
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
 *  获取省列表
 */
export function getProvince(params) {
	return new Promise((resolve, reject) => {
		axios.get("/get-province").then(
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
 *  获取市列表
 */
export function getCity(params) {
	return new Promise((resolve, reject) => {
		axios.get("/get-city?provinceId=" + params.provinceId).then(
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
 *  获取区列表
 */
export function getArea(params) {
	return new Promise((resolve, reject) => {
		axios.get("/get-area?cityId=" + params.cityId).then(
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
 *  修改个人信息（白领）
 */
export function updateCollarPersonInfo(params) {
	return new Promise((resolve, reject) => {
		axios.post("/HicashAppService/UpdateCollarPersonInfo", params).then(
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
 *  查询联系人信息
 */
export function relationInfo(params) {
	return new Promise((resolve, reject) => {
		axios.post("/HicashAppService/RelationInfo", params).then(
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
 *  修改联系人信息
 */
export function updateRelationInfo(params) {
	return new Promise((resolve, reject) => {
		axios.post("/HicashAppService/UpdateRelationInfo", params).then(
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
 *  查询芝麻是否授权成功
 */
export function queryShouQuanSuc(params) {
	return new Promise((resolve, reject) => {
		axios.post("/creditservice/zhima/queryShouQuanSuc.do", params).then(
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
 *  判断是否可以申请(预审)
 */
export function queryFirstExamineSuc(params) {
	return new Promise((resolve, reject) => {
		axios.post("/ruleService/userInfo/userYsRule.do", params).then(
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
 *  秒贷信用认证项查询
 */
export function creditItems(params) {
	return new Promise((resolve, reject) => {
		axios.post("/HicashAppService/CreditItems", params).then(
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
				console.log("res=====", res);
				resolve(res);
			},
			err => {
				reject(err);
			}
		);
	});
}

/*
 *  获取首页底部小banner内容页
 */
export function getSmallBannerDetail(id) {
	return new Promise((resolve, reject) => {
		axios.get("/HicashService/SmallPicBanr?id=" + id).then(
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
 *  navigateToRecharge
 */
export function navigateToRecharge(params) {
	return new Promise((resolve, reject) => {
		axios.post("/NewHicashService/navigateToRecharge", params).then(
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
 *  首页弹屏广告
 */
export function indexAdvertising(params) {
	return new Promise((resolve, reject) => {
		axios.post("/NewHicashService/IndexAdvertising", params).then(
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
 *  充值还款-优惠券列表
 */
export function getRechargeCoupon(params) {
	return new Promise((resolve, reject) => {
		axios.post("/NewHicashService/RechargeCoupon", params).then(
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
 *  个人中心-优惠券列表
 */
export function getCustHicashCoupon(params) {
	return new Promise((resolve, reject) => {
		axios.post("/NewHicashService/CustHicashCoupon", params).then(
			res => {
				resolve(res);
			},
			err => {
				reject(err);
			}
		);
	});
}

/**
 *  白骑士检测
 */
export function checkResultBaiQiShi(params) {
	return new Promise((resolve, reject) => {
		axios.post("/creditservice/baiqishi/checkResult.do", params).then(
			res => {
				resolve(res);
			},
			err => {
				reject(err);
			}
		);
	});
}

/**
 * 我的页面部分内容控制
 */
export function OwnPageShow(params) {
	return new Promise((resolve, reject) => {
		let OwnPageShowData = cache.get("OwnPageShow");
		if (OwnPageShowData) {
			resolve(OwnPageShowData);
			return false;
		}
		axios.post("/HicashAppService/OwnPageShow", params).then(res => {
			cache.put("OwnPageShow", res);
			resolve(res);
		});
	});
}
/*
 *  失信列表信息接口
 */
export function loseCreditInfo(params) {
	return new Promise((resolve, reject) => {
		axios.post("/NewHicashService/loseCreditInfo", params).then(
			res => {
				resolve(res);
			},
			err => {
				reject(err);
			}
		);
	});
}

/**
 * 查询我的消息
 */
export function QueryMyMsg(params) {
	return new Promise((resolve, reject) => {
		axios.post("/HicashAppService/QueryMyMsg", params).then(
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
 *  失信详情接口
 */
export function loseCreditDetail(params) {
	return new Promise((resolve, reject) => {
		axios.post("/NewHicashService/loseCreditDetail", params).then(
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
 *  近期新闻详情接口
 */
export function GsdtHyzxDetailMsg(params) {
	return new Promise((resolve, reject) => {
		axios.post("/NewHicashService/GsdtHyzxDetailMsg", params).then(
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
 *  更新是否已读接口
 */
export function UpdateMsgStatus(params) {
	return new Promise((resolve, reject) => {
		axios.post("/HicashAppService/UpdateMsgStatus", params).then(
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
 *  我的分期页面 数据接口
 */
export function accountOrderPage(params) {
	return new Promise((resolve, reject) => {
		axios.post("/hicash-api-service/accountOrderPage", params).then(
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
 *  我的分期 订单列表内容接口
 */
export function accountOrderList(params) {
	return new Promise((resolve, reject) => {
		axios.post("/hicash-api-service/accountOrderList", params).then(
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
 *  我的分期 订单展开信息接口
 */
export function orderDetailInfo(params) {
	return new Promise((resolve, reject) => {
		axios.post("/hicash-api-service/orderDetailInfo", params).then(
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
 *  还款计划页面接口
 */
export function repayPlan(params) {
	return new Promise((resolve, reject) => {
		axios.post("/hicash-api-service/repayPlan", params).then(
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
 *  取消订单
 */
export function CancelAppPayByPad(params) {
	return new Promise((resolve, reject) => {
		axios.post("/HicashService/CancelAppPayByPad", params).then(
			res => {
				resolve(res);
			},
			err => {
				reject(err);
			}
		);
	});
}

export function QueryWithdrawData(params) {
	return new Promise((resolve, reject) => {
		axios.post("/HicashAppService/QueryWithdrawData", params).then(
			res => {
				resolve(res);
			},
			err => {
				reject(err);
			}
		);
	});
}

// /*
//  * 保存图片信息
//  */
// export function UploadAppPic() {
// 	return new Promise((resolve, reject) => {
// 		axios.post("/HicashAppService/UploadAppPic").then(
// 			res => {
// 				resolve(res);
// 			},
// 			err => {
// 				reject(err);
// 			}
// 		);
// 	});
// }

/*
 *  保存身份证信息接口
 */
export function UpdateCustCard(params) {
	return new Promise((resolve, reject) => {
		axios.post("/HicashAppService/UpdateCustCard", params).then(
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
 *  活体检测--获取随机数字
 */
export function GetRandomNumber(params) {
	return new Promise((resolve, reject) => {
		axios.post("/HicashAppService/GetRandomNumber", params).then(
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
 *  活体检测--上传视频
 */
export function VerifyVideo(params) {
	return new Promise((resolve, reject) => {
		axios.post("/HicashAppService/VerifyVideo", params).then(
			res => {
				resolve(res);
			},
			err => {
				reject(err);
			}
		);
	});
}

/**
 * 底部导航
 */
export function IsBottomShow(params) {
	return new Promise((resolve, reject) => {
		//从内存中获取数据，如内存中不存在在请求server
		let IsBottomShowData = cache.get("IsBottomShow");
		if (IsBottomShowData) {
			resolve(IsBottomShowData);
			return false;
		}

		axios.post("/HicashAppService/IsBottomShow", params).then(
			res => {
				if (res.data.resultCode == "1") {
					cache.put("IsBottomShow", res);
				}
				resolve(res);
			},
			err => {
				reject(err);
			}
		);
	});
}

/*
 *  获取征信认证链接
 */
export function queryCreditUrl(params) {
	return new Promise((resolve, reject) => {
		axios.post("/hicash-api-service/credit/queryCreditUrl", params).then(
			res => {
				resolve(res)
			},
			err => {
				reject(err);
			}
		);
	});
}

/*
 *  征信状态列表接口
 */
export function getUserCreditReports(params) {
	return new Promise((resolve, reject) => {
		axios.get("/hicash-api-service/credit/getUserCreditReports/"+params).then(
			res => {
				resolve(res);
			},
			err => {
				reject(err);
			}
		);
	});
}

// 更新用户的某个报告的认证中状态
export function UpdateUserCreditReportStatus(params) {
	return new Promise((resolve, reject) => {
		axios.post("/hicash-api-service/credit/updateUserCreditReportStatus/",params).then(
			res => {
				resolve(res);
			},
			err => {
				reject(err);
			}
		);
	});
}

// 是否获取到征信报告
export function CheckCreditResult(params) {
	return new Promise((resolve, reject) => {
		axios.post("/hicash-api-service/credit/checkCreditResult", params).then(
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
 *  保存用户征信信息
 */
export function saveUserCreditInfo(params) {
	return new Promise((resolve, reject) => {
		axios.post("/hicash-api-service/credit/saveUserCreditInfo", params).then(
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
 *  请求用户征信报告
 */
export function getCreditReport(params) {
	return new Promise((resolve, reject) => {
		axios.get("/hicash-api-service/credit/getUserCreditRepostByType/" + params.reportType + "/" + params.userName).then(
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
 *  该用户未推送的征信报告类型
 */
export function getCreditResult(params) {
	return new Promise((resolve, reject) => {
		axios.post("/hicash-api-service/credit/getCreditResult", params).then(
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
 *  微信分享
 */
export function wxfx(params) {
	return new Promise((resolve, reject) => {
		axios.post(config.MWEB_PATH + 'api/?api=wxfx', params).then(
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
 *  该用户未推送的征信报告类型
 */
export function checkUserInfo(params) {
	return new Promise((resolve, reject) => {
		axios.post("/hicash-api-service/credit/checkUserInfo", params).then(
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
 *  获取PandDoraH5页面链接
 */
export function QueryPandoraUrl(params) {
	return new Promise((resolve, reject) => {
		axios.post("/HicashAppService/QueryPandoraUrl", params).then(
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
 *  VIP 借贷方案
 */
export function RepayProgram(params) {
	return new Promise((resolve, reject) => {
		axios.post("/HicashAppService/RepayProgram", params).then(
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
 *  个人信息
 */
export function UserInfo(params) {
   return new Promise((resolve, reject) => {
	   axios.post("/NewHicashService/UserInfo", params).then(
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
 *  根据银行卡号匹配银行
 */
export function bankBin(params) {
	return new Promise((resolve, reject) => {
		axios.post('/HicashAppService/BankBin', params).then(
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
 *  同盾银行卡认证四要素
 */
export function cardCheckFour(params) {
	return new Promise((resolve, reject) => {
		axios.post('/HicashService/card_check_four', params).then(
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
 *  查询用户姓名是否修改过
 */
export function queryValName(params) {
	return new Promise((resolve, reject) => {
		axios.post('/HicashAppService/QueryValName', params).then(
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
 *  先查询此银行卡与代扣方 绑定状态。
 */
export function dispatchWithHoldChannel(params) {
	return new Promise((resolve, reject) => {
		axios.post('/HicashAppService/dispatchWithHoldChannel', params).then(
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
 *  提交绑卡信息
 */
export function submitBindCardInfo(params) {
	return new Promise((resolve, reject) => {
		axios.post('/hicash-api-service/submitBindCardInfo', params).then(
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
 *  创建订单
 */
export function createAppPayByMD(params) {
	return new Promise((resolve, reject) => {
		axios.post('/HicashAppService/CreateAppPayByMD', params).then(
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
 *  挖财引入的嗨钱订单状态变更后调用此接口，相应的修改挖财订单状态并将结果推送给挖财
 */
export function updateChannelApplicationStatusWacai(params) {
	return new Promise((resolve, reject) => {
		axios.post("/hicash-api-service/updateChannelApplicationStatus/wacai", params).then(
			res => {
				resolve(res);
			},
			err => {
				reject(err);
			}
		);
	});
}
