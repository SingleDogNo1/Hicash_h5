import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Personal from '@/components/Personal'
import MiaoDai from '@/components/MiaoDai'

Vue.use(Router)

export default new Router({
  	routes: [
    {
    	//首页
      	path: '/',
      	name: 'Home',
      	component: Home
    },
    {
      //嗨秒分期
        path: '/miaoDai',
        name: 'MiaoDai',
        component: MiaoDai
    },
    {
    	//个人中心
      	path: '/personal',
      	name: 'Personal',
      	component: Personal
    }
  ]
})
