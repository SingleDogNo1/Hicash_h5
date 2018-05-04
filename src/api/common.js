import axios from 'axios'
import config from '../config.json'

export default{
  ShowPI:ShowPI,
  getIndexMain: getIndexMain,
  getHomePagePic: getHomePagePic,
  getAllLoanApplication: getAllLoanApplication,
  getAccountInfo: getAccountInfo,
  getSysParam: getSysParam,
  getImgCode: getImgCode,
  getMessageCode: getMessageCode,
  login: login,
  getUserGrade: getUserGrade
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