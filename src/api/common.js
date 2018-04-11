import axios from 'axios'

export default{
  ShowPI:ShowPI
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

