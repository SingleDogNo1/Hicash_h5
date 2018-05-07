// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { XHeader, Tabbar, TabbarItem,ViewBox,Toast } from 'vux'

import common from './api/common.js'
import jsCommon from './assets/js/common.js'
import utils from './assets/js/utils.js'
import config from './config.json'


Vue.prototype.common = common;
Vue.prototype.utils = utils;
Vue.prototype.config = config;
Vue.prototype.jsCommon = jsCommon;

Vue.component('x-header', XHeader)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.component('view-box', ViewBox)
Vue.component('toast', Toast)


import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el:'#app', router, components: {
		App
	}
	, template: '<App/>'
})
