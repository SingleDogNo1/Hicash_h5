import axios from "axios"

export default {
	appCFCA: appCFCA
}

/*
 *  客户电子签章
 */
export function appCFCA(params) {
	return new Promise((resolve, reject) => {
		axios.post("/sign/AppCFCA", params).then(
			res => {
				resolve(res)
			},
			err => {
				reject(err)
			}
		)
	})
}
