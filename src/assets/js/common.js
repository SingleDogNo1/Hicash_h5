import utils from './utils'
import axios from 'axios'


export default{
    setAuthorization:setAuthorization,
    Cache:Cache
}

/*
 *  生成token
 */
export function setAuthorization(userName, token){
    if(userName && token){
        var authorization = userName + ":" + token;
        authorization = "Basic " + utils.codeBase64().enCode(authorization);
        sessionStorage.setItem("authorization", authorization);
    }else{
        var authorization = sessionStorage.getItem("authorization");
        if(!authorization)  return;
    }
    
    axios.defaults.headers.common['Authorization'] = authorization;
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8"';
}

/*
 *  cache对象
 */
export function Cache(){
    let obj = {};
    return {
        //获取cache
        get: (k)=>{
            return obj[k] || null;
        },

        //存储cache
        put: (k, v)=>{
            obj[k] = v;
        },

        //移除cache
        remove: (k)=>{
            delete obj[k];
        },

        //删除所有cache
        clean: ()=>{
            obj = {};
        }
    }
}