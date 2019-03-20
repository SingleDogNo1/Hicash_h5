import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Personal from "@/pages/Personal/index";
import PersonIndex from "@/pages/Personal/Person/index";
import MiaoDai from "@/components/MiaoDai";
import Login from "@/pages/Account/Login";
import ForgetPassword from "@/components/ForgetPassword";
import Register from "@/pages/Account/Register";
import CompreRat from "@/components/CompreRat";
import RateCalculation from "@/components/RateCalculation";
import IdentityAuthentication from "@/components/IdentityAuthentication";
import LoanStrategy from "@/components/LoanStrategy";
import BaseInfo from "@/components/BaseInfo";
import Address from "@/components/Address";
import ContactPerson from "@/components/ContactPerson";
import MobilePhonePrv from "@/components/MobilePhonePrv";
import DpandoraBackPage from "@/components/DpandoraBackPage";
import BandBank from "@/components/BandBank";
import SmallBanner from "@/components/SmallBanner";
import Help from "@/components/Help";
import Notice from "@/components/Notice";
import Coupon from "@/pages/Coupon/Index";
import BreakPromise from "@/pages/BreakPromise/Index";
import Result from "@/pages/BreakPromise/Result";
import BreakPromiseDetail from "@/pages/BreakPromise/Detail";
import HotNews from "@/pages/HotNews/Index";
import HotNewsDetail from "@/pages/HotNews/Detail";
import MyNews from "@/pages/Personal/MyNews/Index";
import MyCoupon from "@/pages/Personal/Coupon/MyCoupon";
import MyInstalment from "@/pages/Personal/Instalment/index";
import AllIndex from "@/pages/Personal/Instalment/All/Index";
import OverdueDetail from "@/pages/Personal/Instalment/Overdue/OverdueDetail";
import RepaymentPlan from "@/pages/Personal/Instalment/RepaymentPlan/RepaymentPlan";
import Product from "@/pages/Product";
import Auth from "@/pages/Product/Auth";
import Inquiry from "@/pages/credit";
import IdentityAuth from "@/pages/credit/IdentityAuth";
import PandoraAuth from "@/pages/credit/PandoraAuth";
import ActivityIntroduction from "@/pages/credit/Introduce";
import CreditFailedLoad from "@/pages/credit/CreditFailedLoad";
import CreditLoading from "@/pages/credit/CreditLoading";


Vue.use(Router);

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
			//征信
			path: "/inquiry",
			name: "Inquiry",
			component: Inquiry,
			meta: { title: "征信" }

		},
		{
			//身份认证
			path: '/identityAuth',
			name: 'IdentityAuth',
			component: IdentityAuth,
			meta: { title: "身份认证",requireAuth: true}
		},
		{
			//磐多拉认证
			path: '/pandoraAuth',
			name: 'PandoraAuth',
			component: PandoraAuth,
			meta: { title: "磐多拉认证", requireAuth: true}
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
					meta: {
						requireAuth: true,
						title: '个人中心'
					}
				},
				{
					//个人中心 - 我的分期
					path: 'myInstalment',
					name: 'MyInstalment',
					component: MyInstalment,
					redirect: '/personal/myInstalment/allIndex',
					children: [
						{
							path: 'allIndex',
							name: 'AllIndex',
							component: AllIndex,
							meta: {
								requireAuth: true,
								title: '我的分期'
							}
						},
						{
							//个人中心 - 我的分期 - 逾期详情
							path: 'overdueDetail',
							name: 'OverdueDetail',
							component: OverdueDetail,
							meta: {
								requireAuth: true,
								title: '逾期订单'
							}
						},
						{
							//个人中心 - 我的分期 - 还款计划
							path: 'repaymentPlan',
							name: 'RepaymentPlan',
							component: RepaymentPlan,
							meta: {
								requireAuth: true,
								title: '还款计划'
							}
						}
					]
				},
				{
					//个人中心 - 我的优惠券
					path: 'myCoupon',
					name: 'MyCoupon',
					component: MyCoupon,
					meta: {
						requireAuth: true,
						title: '我的优惠券'
					}
				},
				{
					//个人中心 - 我的消息
					path: 'myNews',
					name: 'MyNews',
					component: MyNews,
					meta: {
						requireAuth: true,
						title: '我的消息'
					}
				}
			]
		},
		{
			//申请产品流程
			path: '/product',
			name: 'Product',
			component: Product,
			redirect: '/product/auth',
			children: [
				{
					path: 'auth',
					name: 'Auth',
					component: Auth,
					meta: {
						requireAuth: true,
						title: '身份认证'
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
				requireAuth: true,
				title: '优惠券'
			}
		},
		{
			//失信专区首页
			path: '/breakPromise',
			name: 'BreakPromise',
			component: BreakPromise,
			meta: {
				title: '失信专区'
			}
		},
		{
			//失信专区结果页
			path: '/result',
			name: 'Result',
			component: Result,
			meta: {
				title: '查询结果'
			}
		},
		{
			//失信专区详情页
			path: '/breakPromiseDetail',
			name: 'BreakPromiseDetail',
			component: BreakPromiseDetail,
			meta: {
				title: '详情列表'
			}
		},
		{
			//热点新闻页面
			path: '/hotNews',
			name: 'HotNews',
			component: HotNews,
			meta: {
				title: '热点推荐'
			}
		},
		{
			//热点新闻详情页
			path: '/hotNewsDetail',
			name: 'HotNewsDetail',
			component: HotNewsDetail,
			meta: {
				title: '热点推荐'
			}
		},
		{
			path: '/operator',
			name: 'operator',
			component: () => import('@/pages/Credit/Report/Operator'),
			meta: {
				title: '征信报告'
			}
		},
		{
			path: '/jingdong',
			name: 'jingdong',
			component: () => import('@/pages/Credit/Report/Jingdong'),
			meta: {
				title: '征信报告'
			}
		},
		{
			path: '/haluo',
			name: 'Haluo',
			component: () => import('@/pages/Credit/Report/Haluo'),
			meta: {
				title: '征信报告'
			}
		},
		{
			path: '/eleme',
			name: 'Eleme',
			component: () => import('@/pages/Credit/Report/Eleme'),
			meta: {
				title: '征信报告'
			}
		},
		{
			//征信活动介绍
			path: "/activityIntroduction",
			name: "ActivityIntroduction",
			component: ActivityIntroduction,
			meta: {
				title: "征信活动介绍"
			}
		},
		{
			//征信报告 加载失败页
			path: "/creditFailedLoad",
			name: "CreditFailedLoad",
			component: CreditFailedLoad,
			meta: {
				title: "征信报告"
			}
		},
		{
			//征信报告加载中
			path: "/creditLoading",
			name: "CreditLoading",
			component: CreditLoading,
			meta: {
				title: "征信报告"
			}
		}
	]
});
