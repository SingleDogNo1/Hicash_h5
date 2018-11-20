import Vue from 'vue'
import App from './app'
import router from './router'
import { Tabbar, TabbarItem, Toast } from 'vux'

import common from './api/common.js'
import jsCommon from './assets/js/common.js'
import utils from './assets/js/utils.js'
import config from './config.json'
import "./assets/js/growingIO.js"
import "./assets/js/baiqishi.js"
import 'swiper/dist/css/swiper.css'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'



Vue.prototype.common = common;
Vue.prototype.utils = utils;
Vue.prototype.config = config;
Vue.prototype.jsCommon = jsCommon;
Vue.prototype.cache = jsCommon.Cache();

// Vue.component('x-header', XHeader)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
// Vue.component('view-box', ViewBox)
Vue.component('toast', Toast)

import { Icon } from 'vant';
Vue.use(Icon);

import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

import  { LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin)

import  { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)

import VueClipboards from 'vue-clipboards';
Vue.use(VueClipboards);

import  { AlertPlugin } from 'vux'
Vue.use(AlertPlugin)

Vue.use(MintUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el:'#app', router, components: {
		App
	}
	, template: '<App/>'
})
