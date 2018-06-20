import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Personal from '@/components/Personal'
import MiaoDai from '@/components/MiaoDai'
import Login from '@/components/Login'
import ForgetPassword from '@/components/ForgetPassword'
import Register from '@/components/Register'
import CompreRat from '@/components/CompreRat'
import RateCalculation from '@/components/RateCalculation'
import IdentityAuthentication from '@/components/IdentityAuthentication'
import LoanStrategy from '@/components/LoanStrategy'
import Upload from '@/components/Upload'
import BaseInfo from '@/components/BaseInfo'
import Address from '@/components/Address'
import ContactPerson from '@/components/ContactPerson'
import MobilePhonePrv from '@/components/MobilePhonePrv'
import DpandoraBackPage from '@/components/DpandoraBackPage'
import BandBank from '@/components/bandBank'


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
    },
    {
        //注册
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        //综合评级
        path: '/compre-rat',
        name: 'CompreRat',
        component: CompreRat
    },
    {
        //费率计算
        path: '/rateCalculation',
        name: 'RateCalculation',
        component: RateCalculation
    },
    {
        //身份认证
        path: '/identityAuthentication',
        name: 'IdentityAuthentication',
        component: IdentityAuthentication
    },
    {
        //借款攻略
        path: '/loanStrategy',
        name: 'LoanStrategy',
        component: LoanStrategy
    },
    {
        //基本信息
        path: '/baseInfo',
        name: 'BaseInfo',
        component: BaseInfo
    },
    {
        //选择地址
        path: '/chooseAddress',
        name: 'Address',
        component: Address
    },
    {
        //联系人信息
        path: '/contactPerson',
        name: 'ContactPerson',
        component: ContactPerson
    },
    {
        //手机认证
        path: '/mobilePhonePrv',
        name: 'MobilePhonePrv',
        component: MobilePhonePrv
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
        component: BandBank
    }
  ]
})
