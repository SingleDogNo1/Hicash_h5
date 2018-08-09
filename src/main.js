import Vue from 'vue'
import App from './app'
import router from './router'
import { XHeader, Tabbar, TabbarItem, Toast } from 'vux'

import common from './api/common.js'
import jsCommon from './assets/js/common.js'
import utils from './assets/js/utils.js'
import config from './config.json'
import "./assets/js/growingIO.js"


Vue.prototype.common = common;
Vue.prototype.utils = utils;
Vue.prototype.config = config;
Vue.prototype.jsCommon = jsCommon;

// Vue.component('x-header', XHeader)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
// Vue.component('view-box', ViewBox)
Vue.component('toast', Toast)


import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

import  { LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin)

import  { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)


import VueClipboards from 'vue-clipboards';
Vue.use(VueClipboards);



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el:'#app', router, components: {
		App
	}
	, template: '<App/>'
})
