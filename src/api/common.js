import axios from 'axios'
import config from '../config.json'

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
  resetPassword: resetPassword
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
 *  获取首页公告的轮播图
 */
export function getHomePagePic(params){
  return new Promise((resolve,reject)=>{
    axios.get("/HicashService/HomePagePic?cityCode=" + params.cityCode + '&uuid=' + params.uuid).then((res)=>{
      console.log('res=====', res)
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
  console.info('params', params);
  var url = '/NewHicashService/AccountInfo?userName=' + params.userName 
            + '&curPage=' + params.curPage
            + '&maxLine=' + params.maxLine
            + '&requestSource=' + config.requestSource
            + '&uuid=' + params.uuid
            + '&version=' + config.version;
    console.info('url', url);
    return new Promise((resolve,reject)=>{
        axios.get(url).then((res)=>{
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
    console.log('params===', params)
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
export function getImgCode(){
  return new Promise((resolve,reject)=>{
    axios.post("/NewHicashService/AuthImage").then((res)=>{
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
    axios.post("/NewHicashService/SendValidateCodeCount", params).then((res)=>{
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