import "babel-polyfill"
import Es6Promise from "es6-promise"
import Vue from "vue"
import App from "./app"
import router from "./router"
import {
	Tabbar,
	TabbarItem,
	Toast,
	ToastPlugin,
	LoadingPlugin,
	ConfirmPlugin,
	AlertPlugin
} from "vux"
import "./assets/css/common.scss"
// import Raven from "raven-js"
// import RavenVue from "raven-js/plugins/vue"

//import vConsole from "vconsole"
import * as Sentry from "@sentry/browser"
import * as Integrations from "@sentry/integrations"
process.model === "dev" &&
	Sentry.init({
		dsn: "http://3da971d3d77645db926892adfd389c93@114.215.47.186:9000/3",
		integrations: [new Integrations.Vue({ Vue, attachProps: true })],
		release: process.env.RELEASE_VERSION
	})
//Raven.config("http://3da971d3d77645db926892adfd389c93@114.215.47.186:9000/3", {
// 	release: process.sentryRelease
// })
// 	.addPlugin(RavenVue, Vue)
// 	.install()
import common from "./api/common.js"
import jsCommon from "./assets/js/common.js"
import utils from "./assets/js/utils.js"
import config from "./config.json"
import "./assets/js/growingIO.js"
import "./assets/js/baiqishi.js"
import "url-search-params-polyfill"
import "swiper/dist/css/swiper.css"
import "./assets/css/iconfont/iconfont.css"

import MintUI from "mint-ui"
import "mint-ui/lib/style.css"

import VueClipboards from "vue-clipboards"

require("es6-promise").polyfill()
Es6Promise.polyfill()

Vue.prototype.common = common
Vue.prototype.utils = utils
Vue.prototype.config = config
Vue.prototype.jsCommon = jsCommon
Vue.prototype.cache = jsCommon.Cache()

Vue.component("tabbar", Tabbar)
Vue.component("tabbar-item", TabbarItem)
Vue.component("toast", Toast)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)
Vue.use(VueClipboards)
Vue.use(AlertPlugin)

Vue.use(MintUI)

//new vConsole();

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: "#app",
	router,
	components: {
		App
	},
	template: "<App/>"
})
