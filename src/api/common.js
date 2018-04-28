import axios from 'axios'

export default{
  ShowPI:ShowPI,
  getIndexMain: getIndexMain,
  getHomePagePic: getHomePagePic,
  getAllLoanApplication: getAllLoanApplication,
  getSysParam: getSysParam
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

