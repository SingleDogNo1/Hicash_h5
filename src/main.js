// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {
	XHeader
}

from 'vux'
import {
	Tabbar, TabbarItem
}

from 'vux'
import {
	ViewBox
}

from 'vux'

import common from './api/common.js'
import utils from './assets/js/utils.js'
import config from './config.json'

Vue.prototype.common = common;
Vue.prototype.utils = utils;
Vue.prototype.config = config;

Vue.component('x-header', XHeader)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.component('view-box', ViewBox)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el:'#app', router, components: {
		App
	}

	, template: '<App/>'
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requireAuth)) {
		var userName = utils.getCookie("userName");
	    var realName = utils.getCookie("realName");
	    var mobile = utils.getCookie("mobile");

	    // 判断该路由是否需要登录权限
	    if(!userName || userName=="null"){
	        next({
				// 将跳转的路由path作为参数，登录成功后跳转到该路由
				path:'/login', query: {redirect: to.fullPath}
			})
	    }else{
	    	next();
	    }
	}else {
		next();
	}
});
