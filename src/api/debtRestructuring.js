import axios from 'axios';

export function getInfo(params){
	return axios.post("/hicash-api-service/ccms/loadAppInfo", params)
}

export function uploadPic(appNo, params){
	return axios.post(`/hicash-api-service/ccms/uploadImage/${appNo}`, params)
}

export function getPic(appNo) {
	return axios.get(`/hicash-api-service/ccms/downloadImg/${appNo}`)
}

export default{
	getInfo,
	uploadPic
}
