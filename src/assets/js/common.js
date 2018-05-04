import utils from './utils'
import axios from 'axios'


export default{
    setAuthorization:setAuthorization
}

/*
 *  生成token
 */
export function setAuthorization(userName, token){
    return new Promise((resolve,reject)=>{

        if(userName && token){
            var authorization = userName + ":" + token;
            authorization = "Basic " + utils.codeBase64().enCode(authorization);
            sessionStorage.setItem("authorization", authorization);
        }else{
            var authorization = sessionStorage.getItem("authorization");
            if(!authorization)  return;
        }
        
        console.info('authorization', authorization);
        axios.defaults.headers.common['Authorization'] = authorization;
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8"';
    })
}

