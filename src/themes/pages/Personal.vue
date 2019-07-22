<template>
	<div>
		<download-pop v-if="this.utils.getPlatform() != 'APP'"></download-pop>
		<section class="personal-header-wrap">
			<!-- 用户信息 -->
			<div class="per-user-info">
				<div class="avatar" ><router-link to="personInfo"><img :src="avatarImg" alt="" /> </router-link></div>
				<div class="user-id clearfix">
					<p class="per-num">{{ userMobile }}</p>
				</div>
				<p class="current-rating">
					当前评级: {{ userGrade
					}}<router-link :to="{ name: 'CompreRat'}"><i class="iconfont"> &#xe672;</i></router-link>
				</p>
			</div>
			<!-- 额度信息 -->
			<div class="money-amount-info clearfix">
        <p>待还总额(元)</p>
        <span class="perMoney">{{ lateTotal }}</span>
			</div>
			<div class="repay-btn-wrap">
				<div class="repay-btn" @click="toMyInstalment">
          充值还款
				</div>
			</div>
		</section>
		<group>
			<cell
				title="我的分期"
				is-link
				:border-intent="true"
				:link="{ path: '/personal/myInstalment' }"
			>
				<badge v-if="myInstalment"></badge>
			</cell>
			<cell title="交易明细" is-link :link="{ path: '/personal/TransactionDetail' }">
			</cell>
		</group>

		<group>
			<cell
				title="我的优惠券"
				is-link
				:link="{ path: '/personal/MyCoupon' }"
			>
				<badge v-if="newCoupon"></badge>
			</cell>
			<cell title="我的消息" is-link :link="{ path: '/personal/MyNews' }">
				<badge v-if="newMsg"></badge>
			</cell>
			<cell title="我的邀请" is-link :link="{ path:'/personal/MyInvite' }">
				<span class="my-invit-des">{{ invitDes }}</span>
				<span class="my-invit-icon"><img :src="invitIcon"/></span>
			</cell>
		</group>

		<group>
			<cell title="关于我们" is-link :link="{ path:'/personal/About' }">
			</cell>
		</group>

		<group v-if="customGroupIsShow">
			<cell :title="customGroupTitle" is-link :link="customGroupLink">
				<!-- <img
					class="cell-ico"
					slot="icon"
					width="20"
					:src="customGroupIcon"
				/> -->
			</cell>
		</group>

		<!-- <confirm class="reportConfirm" 
			v-model="isShowCouponPop"
			title="温馨提示"
			:hide-on-blur="true"
			:show-cancel-button="false"
			confirm-text="立即查看"
			@on-confirm="jumpPage('MyCoupon')"
			>
			<p style="text-align:center;">{{unusedCouponAlertMsg}}</p>
		</confirm> -->

    <confirm-dialog
      class="reportConfirm"
      :hideOnBlur="hideOnBlur"
      :isShowDialog="isShowCouponPop"
      :confirmText="confirmText"
			:dialogTitle="dialogTitle"
      :dialogContent="unusedCouponAlertMsg"
      :singleButton="singleButton"
			:onConfirm="jumpPage"
		>
    </confirm-dialog>

		<page-footer></page-footer>
	</div>
</template>

<style lang="scss" rel="stylesheet/scss">
@import "~bowerComponents/sass-rem/_rem.scss";
.PersonIndex {
	background: rgb(239, 239, 244);
	padding-bottom: rem(80px);
	.personal-header-wrap {
		width: 100%;
		height: rem(200px);
		background: url("../images/person/person_center_bg.png") no-repeat;
		background-size: 100% 100%;
    color: #fff;
    margin-bottom: rem(48px);
		.per-user-info {
			padding: rem(30px 15px);
      position: relative;
      height: rem(10px);
			.avatar {
				width: rem(40px);
				height: rem(40px);
				float: left;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.user-id {
				margin-left: rem(16px);
				width: rem(85px);
				float: left;
				font-size: rem(15px);
				color: #fff;
        height: rem(40px);
        line-height: rem(40px);
				.per-num {
					font-size: rem(20px);
				}
			}

			.current-rating {
				height: rem(40px);
        line-height: rem(40px);
				font-size: rem(15px);
				float: right;
				text-align: right;
				a {
					color: #fff;
				}
			}
		}

		.money-amount-info {
      width: 100%;
      text-align: center;
			margin-top: rem(23px);
      font-size: rem(11px);
      .perMoney {
        font-size: rem(40px);
      }
		}

		.repay-btn-wrap {
			width: 100%;
			height: rem(62px);
			padding-top: rem(10px);
			.repay-btn {
				width: rem(244px);
				height: rem(62px);
				line-height: rem(52px);
        background: url("../images/person/bg_recharge.png") center center no-repeat;
        background-size: cover;
				margin: 0 auto;
        text-align: center;
        font-size: rem(15px);
			}
		}

		.recharge-btn {
			display: block;
			background: rgba(255, 255, 255, 0.3);
			width: 11.85rem;
			height: 1.4rem;
			font-size: 0.65rem;
			border-radius: 30px;
			color: #fff;
			margin: rem(30px) auto 0;
			text-align: center;
			border: 0;
		}
	}
	.my-invit-des {
		font-size: rem(14px);
		color: #ff7640;
		vertical-align: super;
		margin-right: rem(10px);
	}
	.my-invit-icon {
		width: rem(19px);
		img {
			width: rem(19px);
		}
	}
	.brrow-active {
		background: #fff;
		padding: rem(10px 30px);
		font-size: rem(12px);
		clear: both;
		overflow: hidden;
		zoom: 1;
		border-bottom: 1px solid #dadada;
		.borr-pruduct {
			p {
				color: #a4a4a4;
				span.total-amount {
					color: #ff7640;
					float: right;
					display: inline-block;
				}
			}
		}
		.nopass-tips {
			width: 100%;
			padding-top: rem(10px);
			margin-top: rem(10px);
			border-top: 1px dotted #ccc;
			.nopass-text-tips {
				width: 70%;
				color: #333;
				font-size: rem(10px);
				text-align: justify;
				float: left;
			}
			.btn {
				width: 20%;
				padding: rem(3px 5px);
				background: #ff7640;
				color: #fff;
				float: right;
				border-radius: 5px;
				margin-top: rem(5px);
				display: block;
				.ico {
					width: 100%;
					height: rem(20px);
					display: block;
					margin: 0 auto;
				}
				.title {
					width: 100%;
					display: block;
					text-align: center;
				}
			}
		}
		.contract-btn {
			border: 1px solid #ff7640;
			color: #fff;
			float: right;
			border-radius: 5px;
			background: #ff7640;
			padding: rem(3px 5px);
			font-size: rem(14px);
		}
		.cancel-btn {
			border: 1px solid #ff7640;
			color: #ff7640;
			float: right;
			border-radius: 5px;
			background: #fff;
			padding: rem(3px 5px);
			font-size: rem(14px);
			margin-right: rem(10px);
		}
		.weui-wepay-flow,
		.weui-wepay-flow-auto {
			padding: rem(20px 10px 40px 10px);
		}
	}

	.cell-ico {
		width: rem(20px);
		height: rem(24px);
		display: inline-block;
		margin-right: rem(10px);
	}

	.weui-cells {
		margin-top: 0;
		margin-bottom: rem(8px);
		font-size: rem(15px);
		color: #333;
	}
	.weui-wepay-flow__li_done .weui-wepay-flow__state,
	.weui-wepay-flow__process,
	[class^="weui-wepay-flow__info-"] {
		background-color: #ff7640 !important;
	}
	.weui-wepay-flow__info-bottom:after {
		border-color: transparent transparent #ff7640 transparent !important;
	}
	.vux-badge-dot {
		padding: 3px;
		margin-top: -4px;
	}
	[class^="weui-wepay-flow__title-"],
	[class*=" weui-wepay-flow__title-"] {
		font-size: rem(12px);
	}
}
</style>

<script>
import ConfirmDialog from "@/components/Dialog.vue";
import {
	Cell,
	CellBox,
	CellFormPreview,
	Group,
	Badge,
	Flow,
	FlowState,
	FlowLine,
	Toast
} from "vux";
import PageFooter from "@/components/PageFooter";
import downloadPop from "@/components/downloadPop.vue";
import axios from "axios";
import PersonalCenter from "@/api/personalCenter";

export default {
	components: {
		Group,
		Cell,
		CellFormPreview,
		CellBox,
		Badge,
		Flow,
		FlowState,
		FlowLine,
		PageFooter,
		Toast,
		ConfirmDialog,
		downloadPop
	}, //mobile.length>10?mobile.substring(0,3)+"****"+mobile.substring(7,11):mobile
	data() {
		return {
			realName: unescape(this.utils.getCookie("realName")),
			userMobile:
				this.utils.getCookie("mobile").substring(0, 3) +
				"****" +
				this.utils.getCookie("mobile").substring(7, 11),
			lateTotal: "0.00",
			balance: 0.0,
			accountPays: [],
			flowStateStep: 1,
			avatarImg: require("../images/person/avator_oragin.png"),
			btnTitle: "",
			btnHref: "",
			isDDCP: "",
			refuseMsg: "",
			signButton: false,
			cancelButton: false,
			rechargeButton: false,
			detailButton: false,
			isRefuse: false,
			userGrade: "",
			invitDes: "",
			invitIcon: "",
			customGroupTitle: "",
			customGroupIcon: "",
			customGroupLink: "",
      customGroupIsShow: false,
			// brrowLink:
			// 	this.config.MWEB_PATH + "newweb/personalCenter/myBrrow.html",
			// transactDetailLink:
			// 	this.config.MWEB_PATH +
			// 	"newweb/personalCenter/transactDetail.html",
			// myNewslLink:
			// 	this.config.MWEB_PATH + "newweb/personalCenter/myNews.html",
			// invitePageLink:
			// 	this.config.MWEB_PATH + "newweb/personalCenter/invitePage.html",
			// aboutLink:
			// 	this.config.MWEB_PATH + "newweb/personalCenter/about.html",
			// helpLick:
			// 	this.config.MWEB_PATH + "newweb/personalCenter/compreRat.html",
			newMsg: false,
			newCoupon: false,
			isShowCouponPop: false,
			unusedCouponAlertMsg: '',
      dialogTitle: "温馨提示",
      confirmText: "立即查看",
      singleButton: true,
			hideOnBlur: true,
			myInstalment: false
		};
	},
	methods: {
		getAccountInfo(getAccountInfoDatas) {
			PersonalCenter.personalCenterPage(getAccountInfoDatas).then(res => {
				let data = res.data;
				console.log("data===", data)
				if (data.resultCode != "1") {
					this.$vux.toast.text(data.resultMsg);
					this.$router.push({
						path: "/login",
						query: { redirect: this.$route.fullPath }
					});
				} else {
					this.lateTotal = data.personalCenterPage.waitRepayAmount ? data.personalCenterPage.waitRepayAmount : "0.00"; //近7天代还款
					this.balance = data.balance; //账户余额
					this.myInstalment = parseInt(data.personalCenterPage.myOrderPoint) > 0 ? true : false; //我的分期
					this.newCoupon = parseInt(data.personalCenterPage.unusedCouponNum) > 0 ? true : false; //我的分期
					this.userGrade = this.utils.getCookie("pj"); //用户等级
					this.unusedCouponAlertMsg = data.personalCenterPage.unusedCouponAlertMsg;

					if(data.personalCenterPage.unusedCouponNum > '0' && sessionStorage.getItem('isShowMyCouponPop') > '0'){
						this.isShowCouponPop = true;
						sessionStorage.setItem('isShowMyCouponPop', '0');
					}

					// if (data.headUrl) {
					// 	this.avatarImg =
					// 		data.headUrlPrefix +
					// 		data.headUrl +
					// 		"?t=" +
					// 		Math.random(); //用户头像
					// }
				}
			});
		},
		OwnPageShow(OwnPageShowData) {
			this.common.OwnPageShow(OwnPageShowData).then(res => {
				let data = res.data;
				console.info("OwnPageShow data", data);
				this.invitDes = data.inviteMsg;
				this.invitIcon = data.inviteIcon;
				this.customGroupTitle = data.guoXinBaoMsg;
				this.customGroupLink = data.guoXinBaoUrl;
				this.customGroupIcon = data.guoXinBaoIcon;
				this.customGroupIsShow = data.guoXinBaoShow;
			});
		},
		QueryMyMsg(QueryMyMsgData) {
			this.common.QueryMyMsg(QueryMyMsgData).then(res => {
				let data = res.data;
				this.newMsg = data.noMsgNum > 0;
			});
		},
		//跳转到我的分期
		toMyInstalment() {
			this.$router.push({path:"/personal/myInstalment"});
		},
		jumpPage(){
			this.isShowCouponPop = false;
			this.$router.push({name: "MyCoupon"});
		}
	},
	mounted() {
		document.body.scrollTop = 0;
		let getAccountInfoDatas = new URLSearchParams();
		getAccountInfoDatas.append("userName", this.utils.getCookie("userName"));
		getAccountInfoDatas.append("requestSource", "H5");
		this.getAccountInfo(getAccountInfoDatas);

		let OwnPageShowData = new URLSearchParams();
		OwnPageShowData.append("userName", this.utils.getCookie("userName"));
		OwnPageShowData.append("uuid", this.utils.uuid());
		OwnPageShowData.append("requestSource", 'H5');
		this.OwnPageShow(OwnPageShowData);

		// let QueryMyMsgData = new URLSearchParams();
		// QueryMyMsgData.append("userName", this.utils.getCookie("userName"));
		// QueryMyMsgData.append("uuid", this.utils.uuid());
		// QueryMyMsgData.append("curPage", 1);
		// QueryMyMsgData.append("maxLine", 1);
		// this.QueryMyMsg(QueryMyMsgData);

		let isHaveUnreadCoupon = this.utils.getCookie("isHaveUnreadCoupon");
		if (isHaveUnreadCoupon > 0) {
			this.newCoupon = true;
		}

		
	}
};
</script>
