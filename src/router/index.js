import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Personal from '@/components/Personal'
import MiaoDai from '@/components/MiaoDai'
import Login from '@/components/Login'
import ForgetPassword from '@/components/ForgetPassword'

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
      	component: Personal,
        meta:{
            requireAuth:true
        }
    },
    {
        //登录
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        //忘记密码
        path: '/forgetPassword',
        name: 'ForgetPassword',
        component: ForgetPassword
    }
  ]
})
