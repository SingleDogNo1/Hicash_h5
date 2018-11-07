import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Personal from '@/pages/Personal/index'
import PersonIndex from '@/pages/Personal/Person/index'
import MiaoDai from '@/components/MiaoDai'
import Login from '@/pages/Account/Login'
import ForgetPassword from '@/components/ForgetPassword'
import Register from '@/pages/Account/Register'
import CompreRat from '@/components/CompreRat'
import RateCalculation from '@/components/RateCalculation'
import IdentityAuthentication from '@/components/IdentityAuthentication'
import LoanStrategy from '@/components/LoanStrategy'
import BaseInfo from '@/components/BaseInfo'
import Address from '@/components/Address'
import ContactPerson from '@/components/ContactPerson'
import MobilePhonePrv from '@/components/MobilePhonePrv'
import DpandoraBackPage from '@/components/DpandoraBackPage'
import BandBank from '@/components/BandBank'
import SmallBanner from '@/components/SmallBanner'
import Help from '@/components/Help'
import Notice  from '@/components/Notice'
import Coupon from '@/pages/Coupon/Index'
import MyCoupon from '@/pages/Coupon/MyCoupon'


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
        component: MiaoDai,
        meta: { title: '嗨秒分期' }
    },
    {
    	//个人中心
      	path: '/personal',
        name: 'Personal',
        component: Personal,
        redirect: '/personal/personIndex',
        children: [
            {
                path: 'personIndex',
                name: 'PersonIndex',
                component: PersonIndex,
                meta:{
                    requireAuth:true,
                    title: '个人中心'
                },
            },
            {
                //个人中心 - 我的优惠券
                path: 'myCoupon',
                name: 'MyCoupon',
                component: MyCoupon,
                meta: { 
                    requireAuth:true,
                    title: '我的优惠券' 
                }
            }
        ]
    },
    {
        //登录
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { title: '登录' }
    },
    {
        //忘记密码
        path: '/forgetPassword',
        name: 'ForgetPassword',
        component: ForgetPassword,
        meta: { title: '忘记密码' }
    },
    {
        //注册
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { title: '注册' }
    },
    {
        //综合评级
        path: '/compre-rat',
        name: 'CompreRat',
        component: CompreRat,
        meta: { title: '综合评级' }
    },
    {
        //费率计算
        path: '/rateCalculation',
        name: 'RateCalculation',
        component: RateCalculation,
        meta: { title: '费率计算' }
    },
    {
        //身份认证
        path: '/identityAuthentication',
        name: 'IdentityAuthentication',
        component: IdentityAuthentication,
        meta: { title: '身份认证' }
    },
    {
        //借款攻略
        path: '/loanStrategy',
        name: 'LoanStrategy',
        component: LoanStrategy,
        meta: { title: '借款攻略' }
    },
    {
        //基本信息
        path: '/baseInfo',
        name: 'BaseInfo',
        component: BaseInfo,
        meta: { title: '基本信息' }
    },
    {
        //选择地址
        path: '/chooseAddress',
        name: 'Address',
        component: Address,
        meta: { title: '选择地址' }
    },
    {
        //联系人信息
        path: '/contactPerson',
        name: 'ContactPerson',
        component: ContactPerson,
        meta: { title: '联系人信息' }
    },
    {
        //手机认证
        path: '/mobilePhonePrv',
        name: 'MobilePhonePrv',
        component: MobilePhonePrv,
        meta: { title: '手机认证' }
    },
    {
        //从潘多拉回来的页面
        path: '/dpandoraBackPage',
        name: 'DpandoraBackPage',
        component: DpandoraBackPage
    },
    {
        //绑定银行卡
        path: '/bandBank',
        name: 'BandBank',
        component: BandBank,
        meta: { title: '绑定银行卡' }
    },
    {
        //small banner
        path: '/smallBanner',
        name: 'SmallBanner',
        component: SmallBanner
    },
    {
        //帮助中心
        path: '/help',
        name: 'help',
        component: Help,
        meta: { title: '帮助中心' }
    },
    {
        //公告
        path: '/notice',
        name: 'notice',
        component: Notice,
        meta: { title: '公告' }
    },
    {
        //充值还款 - 优惠券
        path: '/coupon',
        name: 'Coupon',
        component: Coupon,
        meta: { 
            requireAuth:true,
            title: '优惠券' 
        }
    },
    {
        //个人中心 - 我的优惠券
        path: '/MyCoupon',
        name: 'MyCoupon',
        component: MyCoupon,
        meta: { 
            requireAuth:true,
            title: '我的优惠券' 
        }
    }
  ]
})
