import axios from 'axios'
import config from '../config.json'

export default{
  ShowPI:ShowPI,
  getIndexMain: getIndexMain,
  getHomePagePic: getHomePagePic,
  getAllLoanApplication: getAllLoanApplication,
  getAccountInfo: getAccountInfo
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


