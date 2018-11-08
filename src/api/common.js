import axios from 'axios'
import config from '../config.json'
import jsCommon from '../assets/js/common.js'

let cache = jsCommon.Cache();

export default{
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
  updateTempAppInfo: updateTempAppInfo,
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
  withHoldBank:　withHoldBank,
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
  GsdtHyzxDetailMsg: GsdtHyzxDetailMsg
}


/*
 *  事例
 */
export function ShowPI(params){
  return new Promise((resolve,reject)=>{
    axios.post("/HicashAppService/ShowPI",params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}


/*
 *  获取首页数据
 */
export function getIndexMain(params){
  return new Promise((resolve,reject)=>{
    axios.post("/NewHicashService/indexMain",params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  获取首页轮播图
 */
export function getHomePagePic(params){
  return new Promise((resolve,reject)=>{
    axios.get("/HicashService/HomePagePic?cityCode=" + params.cityCode + '&uuid=' + params.uuid + '&position=' + params.position).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  获取总金额
 */
export function getAllLoanApplication(){
  return new Promise((resolve,reject)=>{
    axios.post("/NewHicashService/HomeData").then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  查询申请件进度
 */
export function getAccountInfo(params){
  var url = '/NewHicashService/AccountInfo?userName=' + params.userName 
            + '&curPage=' + params.curPage
            + '&maxLine=' + params.maxLine
            + '&requestSource=' + config.requestSource
            + '&uuid=' + params.uuid
            + '&version=' + config.version;
    return new Promise((resolve,reject)=>{
		
		//从内存中获取数据，如内存中不存在在请求server
		let accountInfoData = cache.get('AccountInfo');
		if(accountInfoData){
			resolve(accountInfoData);
			return false;
		}

		axios.get(url).then((res)=>{
        if(res.data.resultCode == '1'){
          cache.put('AccountInfo', res);
        }
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })
}

/*
 *  获取近期新闻
 */
export function getSysParam(params){
  return new Promise((resolve,reject)=>{
    axios.post("/NewHicashService/SysParam", params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  获取登录页面的图形验证码
 */
export function getImgCode(params){
  return new Promise((resolve,reject)=>{
    axios.post("/hicash-api-service/AuthImage", params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  获取登录页面的短信验证码
 */
export function getMessageCode(params){
  return new Promise((resolve,reject)=>{
    axios.post("/hicash-api-service/SmsVerificationCode", params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  获取登录页面的短信验证码
 */
export function deleteVerificationCodeCount(params){
  return new Promise((resolve,reject)=>{
    axios.post("/hicash-api-service/DeleteVerificationCodeCount", params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  登录
 */
export function login(params){
  return new Promise((resolve,reject)=>{
    axios.post("/NewHicashService/Login", params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  获取用户等级
 */
export function getUserGrade(params){
  return new Promise((resolve,reject)=>{
    axios.post("/NewHicashService/UserGrade", params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  获取忘记密码页面的短信验证码
 */
export function getSendPassWordCode(params){
  return new Promise((resolve,reject)=>{
    axios.post("/NewHicashService/SendPassWordCode", params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  忘记密码页面验证验证码
 */
export function forgetPassWord(params){
  return new Promise((resolve,reject)=>{
    axios.post("/HicashService/ForgetPassWord", params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  忘记密码修改密码
 */
export function resetPassword(params){
  return new Promise((resolve,reject)=>{
    axios.post("/HicashService/ResetPassword", params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  注册
 */
export function register(params){
  return new Promise((resolve,reject)=>{
    axios.post("/NewHicashService/RegisterNoCard", params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  申请页优惠劵列表
 */
export function getApplyCouponList(params){
  return new Promise((resolve,reject)=>{
    axios.post("/NewHicashService/ApplyCouponList", params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  产品详情
 */
export function queryProductDetail(params){
  return new Promise((resolve,reject)=>{
    axios.post("/NewHicashService/QueryProductDetail", params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  贷款金额计算
 */
export function loanAmtCalculateForNew(params){
  return new Promise((resolve,reject)=>{
    axios.post("/HicashService/LoanAmtCalculateForNew", params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  合规费率计算接口
 */
export function loanPay(params){
  return new Promise((resolve,reject)=>{
    axios.post("/HicashAppService/LoanPay", params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  判断是否支持该产品(滴滴贷)
 */
export function checkSupportApp(params){
  return new Promise((resolve,reject)=>{
    axios.post("/HicashAppService/CheckSupportApp", params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  创建临时订单
 */
export function fastLoanFirst(params){
  return new Promise((resolve,reject)=>{
    axios.post("/HicashService/FastLoanFirst", params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  查询图片保存地址
 */
export function uploadPic(params){
  return new Promise((resolve,reject)=>{
    axios.post("/file-upload", params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  临时申请件表保存验证状态
 */
export function updateTempAppInfo(params){
  return new Promise((resolve,reject)=>{
    axios.post("HicashAppService/UpdateTempAppInfo", params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  更新图片状态
 */
export function updatePicStatus(params){
  return new Promise((resolve,reject)=>{
    axios.post("HicashAppService/UpdatePicStatus", params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  查询个人信息 (学生)
 */
export function stuInfoQuery(params){
  return new Promise((resolve,reject)=>{
    axios.post("HicashAppService/StuInfoQuery", params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  查询个人信息 (白领)
 */
export function collarPersonInfo(params){
  return new Promise((resolve,reject)=>{
    axios.post("HicashAppService/CollarPersonInfo", params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  获取省列表
 */
export function getProvince(params){
  return new Promise((resolve,reject)=>{
    axios.get("/get-province").then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  获取市列表
 */
export function getCity(params){
  return new Promise((resolve,reject)=>{
    axios.get("/get-city?provinceId=" + params.provinceId).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  获取区列表
 */
export function getArea(params){
  return new Promise((resolve,reject)=>{
    axios.get("/get-area?cityId=" + params.cityId).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  修改个人信息（白领）
 */
export function updateCollarPersonInfo(params){
  return new Promise((resolve,reject)=>{
    axios.post("/HicashAppService/UpdateCollarPersonInfo", params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  查询联系人信息
 */
export function relationInfo(params){
  return new Promise((resolve,reject)=>{
    axios.post("/HicashAppService/RelationInfo", params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  修改联系人信息
 */
export function updateRelationInfo(params){
  return new Promise((resolve,reject)=>{
    axios.post("/HicashAppService/UpdateRelationInfo", params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  查询芝麻是否授权成功
 */
export function queryShouQuanSuc(params){
  return new Promise((resolve,reject)=>{
    axios.post("/creditservice/zhima/queryShouQuanSuc.do", params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  判断是否可以申请(预审)
 */
export function queryFirstExamineSuc(params){
  return new Promise((resolve,reject)=>{
    axios.post("/ruleService/userInfo/userYsRule.do", params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  秒贷信用认证项查询
 */
export function creditItems(params){
  return new Promise((resolve,reject)=>{
    axios.post("/HicashAppService/CreditItems", params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  获取银行卡列表
 */
export function withHoldBank(){
  return new Promise((resolve,reject)=>{
    axios.post("/NewHicashService/WithHoldBank").then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  非请求接口信息----通付盾
 */
export function getOwnData(){
  return new Promise((resolve,reject)=>{
    axios.get("/get-own-data").then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  查询银行卡信息
 */
export function searchBankCard(params){
  return new Promise((resolve,reject)=>{
    axios.post("/HicashAppService/SearchBankCard", params).then((res)=>{
      console.log('res=====', res)
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  获取首页底部小banner内容页
 */
export function getSmallBannerDetail(id){
  return new Promise((resolve,reject)=>{
    axios.get("/HicashService/SmallPicBanr?id=" + id).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  navigateToRecharge
 */
export function navigateToRecharge(params){
  return new Promise((resolve,reject)=>{
    axios.post("/NewHicashService/navigateToRecharge",params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  首页弹屏广告
 */
export function indexAdvertising(params){
  return new Promise((resolve,reject)=>{
    axios.post("/NewHicashService/IndexAdvertising",params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  充值还款-优惠券列表
 */
export function getRechargeCoupon(params){
  return new Promise((resolve,reject)=>{
    axios.post("/NewHicashService/RechargeCoupon",params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  个人中心-优惠券列表
 */
export function getCustHicashCoupon(params){
  return new Promise((resolve,reject)=>{
    axios.post("/NewHicashService/CustHicashCoupon",params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/**
 *  白骑士检测
 */
export function checkResultBaiQiShi(params){
  return new Promise((resolve,reject)=>{
    axios.post("/creditservice/baiqishi/checkResult.do",params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/**
 * 我的页面部分内容控制
 */
export function OwnPageShow(params){
  return new Promise((resolve,reject)=>{
    let OwnPageShowData = cache.get('OwnPageShow');
    if(OwnPageShowData){
      resolve(OwnPageShowData);
      return false;
    }
    axios.post("/HicashAppService/OwnPageShow",params).then((res)=>{
      cache.put('OwnPageShow', res);
    })
  })
}
/*
 *  失信列表信息接口
 */
export function loseCreditInfo(params){
  return new Promise((resolve,reject)=>{
    axios.post("/NewHicashService/loseCreditInfo",params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/**
 * 查询我的消息
 */
export function QueryMyMsg(params){
  return new Promise((resolve,reject)=>{
    axios.post("/HicashAppService/QueryMyMsg",params).then((res)=>{
    })
  })
}

/*
 *  失信详情接口
 */
export function loseCreditDetail(params){
  return new Promise((resolve,reject)=>{
    axios.post("/NewHicashService/loseCreditDetail",params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}

/*
 *  近期新闻详情接口
 */
export function GsdtHyzxDetailMsg(params){
  return new Promise((resolve,reject)=>{
    axios.post("/NewHicashService/GsdtHyzxDetailMsg",params).then((res)=>{
      resolve(res)
    },(err)=>{
      reject(err)
    })
  })
}