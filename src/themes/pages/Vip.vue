<template>
	<div>
		<header>
			<div class="go-back" @click="jump">
				<x-icon type="ios-arrow-left" size="30"></x-icon>
			</div>
			<img src="../images/vip/header-bg.jpg" alt="">
		</header>
		<div class="content">
			<h2><i class="icon iconfont icon-huangguan1"></i>VIP专享额度{{kyAmount}}<span v-if="repayProgramData.status == 'FREZ'">(已冻结)</span></h2>
			<scale @slideVal='slideVal' :isShowMoney="isShowMoney" :initialSlide="initialSlide"></scale>
			<div class="content-line"></div>
			<h2><i class="icon iconfont icon-huangguan1"></i>VIP专享借款期限</h2>
			<div class="vip-pro-time">
				<ul>
					<li :class="{'active': currentIndex == index}" v-for="(item, index) in repayProgramData.perList" :index="index" @click="clickPerList(item, index)">
						{{item.installments}}{{item.periods}}
					</li>
				</ul>
			</div>
			<input class="vip-create" type="button" @click="submit" :value="repayProgramData.btn_str" />
			<div class="vip-pro-handler">
				<p>每期最低本息还款：<span>￥{{loanPayData.lowPay}}</span></p>
				<p>月利率：<span>{{loanPayData.lowRate}}-{{loanPayData.highRate}}</span></p>
				<router-link :to="{name: 'VipDetails', query: {'vipMoneyVal': vipMoneyVal / 100, 'currentIndex': currentIndex}}"><div class="vip-cal"><i class="icon iconfont icon-jisuanqi"></i>费率计算器</div></router-link>
			</div>
		</div>
		<footer>
			<div class="footer-main"><router-link :to="{name: 'VipIntroduce'}"><x-icon type="ios-help-outline" size="24"></x-icon>点击查看怎样成为VIP?</router-link></div>
			<img src="../images/vip/footer-bg.png" alt="">
		</footer>

		<div class="vipMask" v-if="isShowVipMask">
			<div class="inner">
				<div class="header">
					<span class="name">{{realName}}</span>
					<p><i class="iconfont">&#xe684;</i>您已成为{{appName}}网VIP</p>
				</div>
				<div class="content">
					<h3>VIP可以享受以下优待</h3>
					<div class="text_list">
						<p><strong>更便捷的申请流程</strong>三个月内再次借款免授信</p>
						<p><strong>VIP专享的超低利率</strong>没有最低，只有更低</p>
						<p><strong>最高10000元的VIP专享额度</strong>VIP独享尊贵特权</p>
						<p><strong>专享额度可分多次出借，灵活便捷</strong>资金周转更灵活</p>
					</div>
				</div>
				<div class="footer">
					<button class="active" @click="isShowVipMask=false;">立享特权</button>
				</div>
			</div>
		</div>
		<div class="vipMask no-vip" v-if="isNoVip">
			<div class="inner">
				<div class="header">
					{{noVipTitleVal}}
				</div>
				<div class="content">
					{{noVipContentVal}}
				</div>
				<div class="footer">
					<router-link :to="{name: 'Home'}"><input type="button" value="首页"  v-if="!isZhunVip"></router-link>
					<router-link :to="{name: noVipLink}"><input type="button" :value="noVipValue" v-if="!isZhunVip"></router-link>
					<input v-if="isZhunVip" class="w100" type="button" :value="noVipBtnVal" @click="confirm">
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
// import {  } from "vux";
import scale from "@/components/scale.vue";
export default {
	components: {
		scale,
		
	},
	data() {
		return {
			list: [],
			vipMoneyVal: 10000,
			isShowMoney: true,
			initialSlide: 100,
			repayProgramData: {},
			currentIndex: 0,
			isVip: 0,
			kyAmount: '',
			loanProduct: '',
			loanPayData: {},
			realName: unescape(this.utils.getCookie("realName")),
			isShowVipMask: false,
			isNoVip: false,
			isZhunVip: false,
			noVipValue: '如何成为VIP',
			checkSupportIsCredit: '',
			appName: ""
		};
	},
	mounted() {
    let queryTexObj= {
			source: this.config.ProductName === 'hicash' ? "gk" : "ch",
			key: "app_name"
		};
    this.common.queryTextConfig(queryTexObj).then( res => {
			let data = res.data;
			this.appName = data.dataMap.app_name;
		})
		if(!localStorage.getItem('firstJumpVip')){
			localStorage.setItem('firstJumpVip', true);
			this.isShowVipMask = true;
		}

		let  custType = this.utils.getCookie("custType");
		if(custType != "KHL1" && custType != "KHL2"){
			custType = "KHL2";
		}
		let RepayProgramData = new URLSearchParams();
		RepayProgramData.append("userName", this.utils.getCookie("userName"));
		RepayProgramData.append("industryCode", 'VIPD');
		RepayProgramData.append("merProId", '8665');
		RepayProgramData.append("custType", custType);
		RepayProgramData.append("supplierId", '2395');
		RepayProgramData.append("saleSiteId", '2072');
		this.RepayProgram(RepayProgramData);	//	VIP 借贷方案
	},
	methods: {
		jump(){
			this.$router.push({name: 'Home'});
		},
		slideVal(num) {
			if(!num) num = 0;
			this.vipMoneyVal = num * 100;
			this.loanPay()
		},
		RepayProgram(params){
			this.common.RepayProgram(params)
			.then((res)=>{
				this.repayProgramData = res.data;

				this.isVip = parseInt(this.repayProgramData.isVip);
				if(this.isVip){
					this.kyAmount = this.repayProgramData.kyAmount;
				}
				this.clickPerList(res.data.perList[0], 0);
				
			});
		},
		clickPerList(item, index){
			this.currentIndex = index;
			this.loanProduct = item.loanProduct;
			this.installments = item.installments;
			
			this.loanPay();
		},
		loanPay(){
			let loanPayData = new URLSearchParams();
			loanPayData.append("amount", this.vipMoneyVal);
			loanPayData.append("industryCode", 'VIPD');
			loanPayData.append("days", this.installments * 30);

			this.common.loanPay(loanPayData)
			.then((res)=>{
				this.loanPayData = res.data;
			});
		},
		userInfo(){
			let data = new URLSearchParams();
			data.append("userName", this.utils.getCookie("userName"));
			data.append("authorization", sessionStorage.getItem("authorization"));
			data.append("uuid", this.utils.uuid());
			this.common.UserInfo(data)
			.then((res)=>{
				let userInfoData = res.data;
				console.info('userInfoData.resultCode', userInfoData.resultCode);
				if(userInfoData.resultCode == '1'){
					this.checkSupport();
				}else{
					this.$vux.loading.hide();
					this.$vux.toast.text(userInfoData.resultMsg, 'middle')
				}
			});
		},
		checkSupport(){	//判断是否支持该产品
			let custType = this.utils.getCookie("custType");
			let mobile = this.utils.getCookie("mobile");
			let userName = this.utils.getCookie("userName");
			let postData = new URLSearchParams();
			postData.append("industryCode", 'VIPD');
			postData.append("custType", custType);
			postData.append("mobile", mobile);
			postData.append("is_type", "N");
			postData.append("uuid", this.utils.uuid());
			postData.append("user_name", userName);
			postData.append("tranPrice", this.vipMoneyVal)
			postData.append("periods", this.installments);
			postData.append("loanProductId", this.loanProduct);
			postData.append("applyFrom", this.utils.getApplyFrom());
			this.common.checkSupportApp(postData)
			.then((res)=>{
				// this.loanPayData = res.data;
				let checkSupportAppData = res.data;
				if(checkSupportAppData.resultCode == '1'){
					this.checkSupportIsCredit = checkSupportAppData.isCredit;
					this.fastLoanFirst();
				}else if(checkSupportAppData.resultCode == '10661'){
					this.$vux.loading.hide();
					this.isNoVip = true;
				}else{
					this.$vux.loading.hide();
					this.$vux.toast.text(checkSupportAppData.resultMsg, 'middle')
				}
			});
		},
		fastLoanFirst(){	//创建临时单
			var params = new URLSearchParams();
			params.append("industryCode", 'VIPD');
			params.append("fastAmt", this.vipMoneyVal);
			params.append("fastPeriod", this.loanProduct);
			params.append("uuid", this.utils.uuid());
			if (this.$route.query.appNO) {
				params.append("appFlowNo", this.$route.query.appNO);
			}
			this.common.fastLoanFirst(params)
			.then((res)=>{
				let data = res.data;
				let userName = this.utils.getCookie('userName');
				this.$vux.loading.hide();
				if(data.resultCode == '1'){
					if(data.appFlowNo == ""){
						this.$vux.loading.hide();
						this.$vux.toast.text('临时订单创建失败', 'middle')
						return
					}

					this.utils.setCookie("industryCode", 'VIPD');
					this.utils.setCookie("xykFrom", "0");
					this.utils.setCookie("appFlowNo", userName + ":" + data.appFlowNo);
					this.utils.setCookie("prodetailInfo", this.vipMoneyVal + ":" + this.loanProduct);
					this.utils.setCookie("checkSupportIsCredit", this.checkSupportIsCredit);
					this.$router.push({ name: 'Auth', query: { appFlowNo: data.appFlowNo,  industryCode:'VIPD'}});
				}else{
					this.$vux.toast.text('临时订单创建失败', 'middle')
				}
			});
		},
		submit(){
			// isVIP:1 && NORMAL && isCredit != 0 正常VIP   NewHicashService/UserInfo-> checkSupport（isCredit==1 不走全流程） ->  HicashService/FastLoanFirst ->进流程
			// isVIP:1 && NORMAL && isCredit == 0 准VIP逻辑 先弹窗（一个按钮）-> checkSupport（isCredit==1 不走全流程） ->  HicashService/FastLoanFirst ->进流程
			// isVIP:1 && FREEZE 弹新的提示窗口 （两个按钮 首页|充值还款）->  NewHicashService/navigateToRecharge
			// isVIP:1 && CANCEL 这人不是VIP，不能申请
			// isVIP != 1 不是VIP 不能申请

			if(this.isVip && this.repayProgramData.status == 'NOML' && this.repayProgramData.iscredit != '0'){
				//正常VIP
				this.$vux.loading.show({
					text: "加载中，请稍等……"
				});
				this.userInfo();

			}else if(this.isVip && this.repayProgramData.status == 'NOML' && this.repayProgramData.iscredit == '0'){
				this.noVipBtnVal = this.repayProgramData.box_btn;
				this.noVipContentVal = this.repayProgramData.box_msg;
				this.noVipTitleVal = this.repayProgramData.box_title;
				this.isNoVip = true;
				this.isZhunVip = true;
			}else if(this.isVip && this.repayProgramData.status == 'FREZ'){
				this.noVipValue = '充值还款';
				this.noVipContentVal = this.repayProgramData.box_msg;
				this.noVipTitleVal = '';
				this.noVipLink = 'MyInstalment';
				this.isZhunVip = false;
				this.isNoVip = true;
			}else{
				console.info('1123');
				this.noVipValue = '怎样成为VIP';
				this.noVipContentVal = '本产品需要只限VIP用户专享,您还可以申请其他产品';
				this.noVipTitleVal = '您还不是VIP';
				this.noVipLink = 'VipIntroduce';
				this.isZhunVip = false;
				this.isNoVip = true;
				
			}
		},
		confirm(){
			this.isNoVip = false;
			this.$vux.loading.show({
				text: "加载中，请稍等……"
			});
			this.checkSupport();
		}
	}
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "~bowerComponents/sass-rem/_rem.scss";
.VipDai{
	background: #000;
	header, footer{
		width: 100%;
		height: auto;
		position: relative;
		background: #000;
		.go-back{
			width: rem(30px);
			height: rem(30px);
			position: absolute;
			top: rem(30px);
   			left: rem(10px);
		}
		img{
			width: 100%;
		}
		.footer-main{
			position: absolute;
			top: 0px;
			left: 0;
			width: 100%;
			height: rem(40px);
			line-height: rem(40px);
			text-align: center;
			color: #fff;
			font-size: rem(16px);
			a{
				color: #fff;
			}
			svg{
				fill: #fff;
				margin-top: -3px;
    			vertical-align: middle;
			}
		}
	}
	.content{
		width: 90%;
		height: auto;
		margin: rem(10px) auto;
		background: #fff;
		border-radius: 5px;
		padding-bottom: rem(10px);
		h2{
			i{
				color: #A28362;
				margin-right: rem(5px);
			}
			span{
				color: #a4a4a4;
				font-size: rem(16px);
			}
			font-size: rem(16px);
			text-align: center;
			position: relative;
			font-weight: normal;
			padding: rem(16px);
			color: #3f3f3f;
		}
		.content-line{
			width: 100%;
			height: 1px;
			background: #E1E1E1;
			margin-top: rem(25px);
		}
		.vip-pro-time{
			width: 80%;
			height: auto;
			margin: 0 auto;
			
			ul{
				li{
					float: left;
					color: #a4a4a4;
					font-size: rem(16px);
					padding: rem(3px 5px);
					border: 2px solid #fff;
					border-radius: rem(5px);
					margin-right: rem(10px);
					margin-bottom: rem(10px);
					&.active{
						border: 2px solid #A28362;
						color: #a28362;
					}
				}
				
				&:after {
					content: "";
					display: block;
					visibility: hidden;
					height: 0;
					clear: both;
				}
			}
		}
		.vip-create{
			width: 70%;
			height: rem(40px);
			border: 0;
			background: #A28362;
			font-size: rem(16px);
			color: #fff;
			padding: 3px;
			margin:  rem(10px) auto;
			display: block;
			border-radius: 5px;

		}
		.vip-pro-handler{
			width: 80%;
			height: auto;
			margin: 0 auto;
			color: #666;
			font-size: rem(16px);
			margin-top: rem(20px);
			position: relative;
			p{
				margin-bottom: rem(10px);
				span{
					color: #A28462;
				}
			}
			.vip-cal{
				i{
					color: #E5E1C8;
					margin-right: rem(3px);
				}
				font-size: rem(16px);
				text-align: center;
				position: absolute;
				bottom: 0;
				right: 0;
				font-weight: normal;
				padding: rem(3px);
				color: #E5E1C8;
				background: #A28462;
				border-radius: rem(5px);
			}
		}
	}
	.vipMask{position:fixed;width:100%;height:100%;left:0;top:0;background:rgba(50,50,50,0.7);z-index:999;}
	.vipMask .inner{height:auto;overflow: hidden;position:absolute;width:80%;background:#fff;border-radius:5px;left:50%;top:20%;-webkit-transform:translate(-50%,0);-moz-transform:translate(-50%,0);-ms-transform:translate(-50%,0);-o-transform:translate(-50%,0);transform:translate(-50%,0);}
	.vipMask .inner .header{width:100%;height: 3.05rem;color: #fff;border-radius:5px 5px 0 0;background: -webkit-linear-gradient(#2E3244,#121212);background:linear-gradient(#2E3244,#121212);color:#fff;}
	.vipMask .inner .header span{display:block;text-align:center;font-size:0.65rem;padding:.3rem 0 .2rem;}
	.vipMask .inner .header p{font-size:0.65rem;text-align:center;position:relative;line-height:0.9rem;color:#FBD998;background-image:-webkit-gradient(linear,left top,right bottom,from(#f5dbb9),to(#b99052));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
	.vipMask .inner .header p i{position:absolute;font-size:0.95rem;left:50%;vertical-align:middle;margin-left:-3.95rem;color:#FBD998;background-image:-webkit-gradient(linear,left top,right bottom,from(#f5dbb9),to(#b99052));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
	.vipMask .inner .content{width: 100%;padding:.875rem 0 .5rem 0;}
	.vipMask .inner .content h3{font-size:0.65rem;color:#cfae68;text-align:center;padding-bottom:0.5rem;}
	.vipMask .inner .content .text_list{margin-left:1rem;}
	.vipMask .inner .content .text_list p{color:#a4a4a4;text-align:left;font-size:0.55rem;line-height:0.95rem;padding:0 0 0 1rem;text-align: left;
    font-size: 0.55rem;
    line-height: 0.95rem;}
	.vipMask .inner .content .text_list p strong{display:block;color:#3f3f3f;position:relative;}
	.vipMask .inner .content .text_list p strong:before{position:absolute;content:"";width:.5rem;height:.5rem;background:#CFAE68;border-radius:50%;left:-1rem;top:.2rem;}
	.vipMask .inner .footer{width:100%;text-align:center;min-width: auto;margin-bottom: 20px;}
	.vipMask .inner .footer button{width:5.05rem;height:1.75rem;border:1px solid #A28362;color:#A28362;background:#fff;border-radius:5px;font-size:0.7rem;}
	.vipMask .inner .footer button.active{width: 11.55rem;border:1px solid #A28362;color:#E1D9BF;background:#A28362;}
	.vipMask .inner .footer button:hover{background:#81674B;border:1px solid #81674B;}
	.no-vip{
		.header{
			height: rem(50px) !important;
			text-align: center;
			line-height: rem(50px);
			font-size: rem(16px);
		}
		.content{
			width: calc(100% - 20px) !important;
			font-size: rem(14px);
			text-align: center;
			padding-left: 10px !important;
			padding-right: 10px !important;
		}
		.footer{
			width: 100%;
			margin-bottom: 0px !important;
			a{
				input{
					width: 50%;
					height: rem(40px);
					float: left;
					border: 0;
					background: #fff;
					border-top: 1px solid #ccc;
					font-size: rem(14px);
					color: #A28462;
					
				}
				&:first-child input{
					width: calc(50% - 1px);
					border-right: 1px solid #ccc;
				}
			}
			input.w100{
				width: 100%;
				height: rem(40px);
				border: 0;
				background: #fff;
				border-top: 1px solid #ccc;
				font-size: rem(14px);
				color: #A28462;
			}
			&:after {
				content: "";
				display: block;
				visibility: hidden;
				height: 0;
				clear: both;
			}
		}

	}
}
</style>
