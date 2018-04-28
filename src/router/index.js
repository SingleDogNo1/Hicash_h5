import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Personal from '@/components/Personal'

Vue.use(Router)

export default new Router({
  	routes: [
    {
    	//首页
      	path: '/',
      	name: 'home',
      	component: Home
    },
    {
    	//个人中心
      	path: '/Personal',
      	name: 'Personal',
      	component: Personal
    }
  ]
})
