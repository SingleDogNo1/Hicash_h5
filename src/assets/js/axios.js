import axios from "axios";

axios.defaults.baseURL = "http://47.97.175.27:18084/api";
axios.defaults.withCredentials = true; // 开启后请求header里会带上JSESSIONID
axios.interceptors.request.use(
	function(config) {
		if (
			config.method === "post" &&
			config.url == "http://47.97.175.27:18084/api/login"
		) {
			config.headers["Content-Type"] =
				"application/x-www-form-urlencoded";
			config.data = "username=admin&password=admin";
		}
		return config;
	},
	function(error) {}
);

export default axios;
