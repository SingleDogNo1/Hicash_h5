<template>
	<div class="vip-content">
    <header class="vip-header">
      <div class="left-arrow" :class="{'black':changeBlackColor}" @click="jump"></div>
      <div class="bg" :style="'opacity:' + opacity"></div>
      <div class="title" :class="{'black':changeBlackColor}">VIP 专区</div>
    </header>
    <scroller lock-x @on-scroll="onScroll" ref="scroller">
      <div class="content">
        <div class="banner-wrap">
          <div class="card">
						<img :src="productDetailImg" alt="">
            <!-- <div class="title-wrap">
              <div class="title"><i class="icon-vip"></i>VIP 专区</div>
              <p class="tips">低利率、快审核</p>
            </div> -->
            <div class="prgoress-wrap">
              <div v-if="percent" class="amount" :style="{left: (percent - 6) + '%'}">{{useAmount}}</div>
              <div v-else class="amount" :style="{left: (percent - 6) + '%'}">{{useAmount}}</div>
              <x-progress :percent="percent" :show-cancel="false"></x-progress>
            </div>
            <div class="desc">
              <div class="exclusive-credit">
                专享额度：{{limitAmount}}元
              </div>
              <div class="month-rate">
                月利率：{{loanPayData.lowRate}}%-{{loanPayData.highRate}}%
              </div>
            </div>
          </div>
        </div>
        <scale @slideVal='slideVal' :isShowMoney="isShowMoney" :initialSlide="initialSlide"></scale>
        <h2>借款期限</h2>
        <div class="vip-pro-time">
          <ul v-if="repayProgramData.productShowList" :style="{ 'margin': perListMargin, 'width': perListWidth }" :class="{ 'add-padding' : repayProgramData.productShowList.length >= 3 }">
            <li :class="{'active': currentIndex == index, 'flex': repayProgramData.productShowList.length === 1 || repayProgramData.productShowList.length === 2 }" v-for="(item, index) in repayProgramData.productShowList" :index="index" @click="clickPerList(item, index)" :key="index">
              {{item.productPeriod}}{{periodUnit}}
            </li>
          </ul>
        </div>
				<div class="outPro-wrap">
          <div class="rate-wrap">
            <p>
              每期最低还款本息 :
              <span class="repay"> ¥{{ loanPayData.lowPay }}</span>
            </p>
            <div class="rate-handeler">
              <router-link :to="{name: 'VipDetails', query: {'vipMoneyVal': vipMoneyVal / 100, 'currentIndex': currentIndex}}">
								<span class="rateCal">费率计算</span>
              </router-link>
            </div>
          </div>
					<!-- <router-link :to="{name: 'VipDetails', query: {'vipMoneyVal': vipMoneyVal / 100, 'currentIndex': currentIndex}}"> -->
        		<input class="vip-create" type="button" @click="submit" :value="repayProgramData.btn_str" />
					<!-- </router-link> -->
        </div>
      </div>
      <footer>
        <div class="footer-main"><router-link :to="{name: 'VipIntroduce'}"><x-icon type="ios-help-outline" size="20"></x-icon>点击查看怎样成为VIP?</router-link></div>
      </footer>
    </scroller>

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
import { Scroller, XProgress, Flexbox, FlexboxItem } from "vux";
import Scale from "./Scale";
export default {
	components: {
    Scale,
    Scroller,
		XProgress,
		Flexbox,
		FlexboxItem
	},
	data() {
		return {
      changeBlackColor: false,
      opacity: 0,
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
			percent: 0,
			perListMargin: "",
			perListWidth:　"",
			perListFlex: "",
			checkSupportData: {},
			periodUnit: "",
			productDetailImg: "",
			limitAmount: "0",	// 总额度
			useAmount: "0",	// 	已使用额度
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
		// let vipProductDetailData = new URLSearchParams();
		// vipProductDetailData.append("userName", this.utils.getCookie("userName"));
		// vipProductDetailData.append("industryCode", 'XYVIP');
		let vipProductDetailData = {};
		vipProductDetailData.userName = this.utils.getCookie("userName");
		vipProductDetailData.industryCode = "XYVIP";
		this.getVipProductDetail(vipProductDetailData);	//	VIP 借贷方案
	},
	methods: {
    onScroll: function(pos) {
      console.log('pos==', pos)
      let top = pos.top > 44 ? 44 : pos.top;
      if (pos.top > 44) {
        pos.top = 44;
        this.changeBlackColor = true;
      } else {
        this.changeBlackColor = false;
      }
      this.opacity = (1 / 44) * top;
      console.log(this.opacity)
    },
		jump(){
			this.$router.push({name: 'Home'});
		},
		slideVal(num) {
			if(!num) num = 0;
			this.vipMoneyVal = num * 100;
			this.loanPay()
		},
		getVipProductDetail(params){
			this.common.getVipProductDetail(params)
			.then((res)=>{
				this.repayProgramData = res.data;
				if(this.repayProgramData.productShowList.length === 1) {
					this.perListMargin =  "0 " + 37 * 3 + "px";
					this.perListWidth = "auto";
				} else if (this.repayProgramData.productShowList.length === 2) {
					this.perListMargin =  "0 " + 37 * 2 + "px";
					this.perListWidth = "auto";
				} else if (this.repayProgramData.productShowList.length === 3) {
					this.perListMargin =  "0 auto";
					this.perListWidth = "100%";
				} else {
					this.perListMargin =  "0 auto";
					this.perListWidth = "100%";
				}

				this.isVip = parseInt(this.repayProgramData.isVip);
				if(this.isVip){
					this.kyAmount = this.repayProgramData.kyAmount;
				}
				this.periodUnit = this.repayProgramData.periodUnit;
				// this.limitAmount = "10000";
				// this.useAmount = "5000";
				this.percent = this.useAmount / this.limitAmount * 100;
				this.productDetailImg = this.repayProgramData.productDetailImg;
				this.clickPerList(res.data.productShowList[0], 0);
				
			});
		},
		clickPerList(item, index){
			this.currentIndex = index;
			this.loanProduct = item.productId;
			this.installments = item.productPeriod;
			
			this.loanPay();
		},
		loanPay(){
			let loanPayData = new URLSearchParams();
			loanPayData.append("amount", this.vipMoneyVal);
			loanPayData.append("industryCode", 'XYVIP');
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
			postData.append("industryCode", 'XYVIP');
			postData.append("custType", custType);
			postData.append("mobile", mobile);
			postData.append("is_type", "N");
			postData.append("uuid", this.utils.uuid());
			postData.append("user_name", userName);
			postData.append("tranPrice", this.vipMoneyVal)
			postData.append("periods", this.installments);
			postData.append("loanProductId", this.loanProduct);
			postData.append("applyFrom", "H5");
			this.common.checkSupportApp(postData)
			.then((res)=>{
				// this.loanPayData = res.data;
				let checkSupportAppData = res.data;
				if(checkSupportAppData.resultCode == '1'){
					this.checkSupportIsCredit = checkSupportAppData.isCredit;
					this.checkSupportData = checkSupportAppData;
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
			params.append("industryCode", 'XYVIP');
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

					this.utils.setCookie("industryCode", 'XYVIP');
					this.utils.setCookie("xykFrom", "0");
					this.utils.setCookie("appFlowNo", userName + ":" + data.appFlowNo);
					this.utils.setCookie("prodetailInfo", this.vipMoneyVal + ":" + this.loanProduct);
					this.utils.setCookie("checkSupportIsCredit", this.checkSupportIsCredit);
					
					const backUrl = !this.checkSupportData.isCredit || this.checkSupportData.isCredit == '0' ? this.config.NEW_MWEB_PATH + '/product/basic-info' : this.config.NEW_MWEB_PATH + '/loanProgress';

					window.hicashJSCommunication.onCallApp(
            JSON.stringify({ type: "identity_auth", isCredit: this.checkSupportIsCredit, checkSupportRes: this.checkSupportData, tempAppNo: data.appFlowNo, industryCode: 'XYVIP', applyAmount: this.vipMoneyVal, backUrl:  backUrl, loanProduct: this.loanProduct })
          );
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

<style lang="scss" rel="stylesheet/scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";
@import "../varibale.scss";
.vip-content{
	background:linear-gradient(180deg,rgba(37,37,37,1) 0%,rgba(51,51,51,1) 100%);
  box-shadow:0px 1px 0px 0px rgba(64,64,64,1);
  .vip-header {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: rem(46px);
    background: transparent;
    .left-arrow, .black {
      position: absolute;
      width: 30px;
      height: 30px;
      top: 9px;
      left: 13px;
      z-index: 999;
      &:before {
        content: "";
        position: absolute;
        width: 12px;
        height: 12px;
        border: 1px solid #ccc;
        border-width: 1px 0 0 1px;
        transform: rotate(315deg);
        top: 8px;
        left: 7px;
        border-left: 1px solid #fff;
        border-top: 1px solid #fff;
      }
    }
    .left-arrow.black:before{
      border-left: 1px solid #333;
      border-top: 1px solid #333;
    }
    .bg {
      background: #fff;
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      font-size: rem(17px);
      text-align: center;
      height: rem(46px);
      line-height: rem(46px);
      color: #333;
    }
    .title {
      width: 100%;
      font-size: rem(17px);
      text-align: center;
      height: rem(46px);
      line-height: rem(46px);
      color: #fff;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      &.black {
        color: #333;
      }
    }
  }
	// header, footer{
	// 	width: 100%;
	// 	height: auto;
	// 	position: relative;
	// 	background: #000;
	// 	.go-back{
	// 		width: rem(30px);
	// 		height: rem(30px);
	// 		position: absolute;
	// 		top: rem(30px);
  //  			left: rem(10px);
	// 	}
	// 	img{
	// 		width: 100%;
	// 	}
	// }
	.content{
    height: auto;
    .banner-wrap {
      position: relative;
      width: 100%;
      height: auto;
      background: url("../images/vip/banner.png") center center no-repeat;
      background-size: cover;
      border-bottom: 1px dotted #fff;
			padding-top: rem(68px);
      .card {
				position: relative;
        width: rem(320px);
        height: rem(150px);
        background: linear-gradient(90deg,rgba(238,227,193,1) 0%,rgba(217,195,141,1) 100%);
        border-radius: 5px 5px 0px 0px;
				margin: 0 auto;
				margin-bottom: rem(4px);
        // .title-wrap {
        //   display: flex;
        //   align-items: center;
        //   justify-content: space-between;
        //   color: #A28462;
        //   .title {
        //     display: flex;
        //     align-items: center;
        //     font-size: rem(15px);
        //     .icon-vip {
        //       width: rem(18px);
        //       height: rem(16px);
        //       background: url("../images/vip/icon_vip.png") center center no-repeat;
        //       background-size: cover;
        //       margin-right: rem(8px);
        //     }
        //   }
        //   .tips {
        //     font-size: rem(13px);
        //   }
        // }
				img {
					width: 100%;
					height: 100%;
				}
        .prgoress-wrap {
          position: absolute;
          width: rem(280px);
          height: rem(25px);
					top: rem(60px);
					left: 50%;
					margin-left: rem(-140px);
          .amount {
            position: absolute;
            left: 0;
            top: 0;
            width: rem(35px);
            height: rem(19px);
            line-height: rem(15px);
            background: url("../images/vip/bg_progress_amount.png") center center no-repeat;
            background-size: cover;
            font-size: rem(11px);
            color: #fff;
            text-align: center;
          }
          .weui-progress {
            width: 100%;
            position: absolute;
            top: rem(23px);
            /deep/ .weui-progress__bar {
              background-color: rgba(162,132,98,0.2);
              .weui-progress__inner-bar {
                background-color: #A28462;
              }
            }
          }
        }
        .desc {
					width: 90%;
					position: absolute;
					bottom: rem(26px);
					padding: 0 rem(16px);
          display: flex;
          justify-content: space-between;
          color: #A28462;
          .exclusive-credit {
						font-size: rem(15px);
          }
          .month-rate {
            font-size: rem(13px);
          }
        }
      }
    }
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
			color: #fff;
			margin-top: rem(35px);
		}
		.content-line{
			width: 100%;
			height: 1px;
			background: #E1E1E1;
			margin-top: rem(25px);
		}
		.vip-pro-time{
			width: 100%;
			height: auto;
			margin: 0 auto;
			margin-top: rem(16px);
			ul {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				&.add-padding {
					padding: 0 rem(15px);
				}
				li {
					width: rem(108px);
					height: rem(40px);
					line-height: rem(40px);
					border: 1px solid rgba(255,255,255,0.5);
					border-radius: 5px;
					font-size: rem(17px);
					color:rgba(255,255,255,0.5);
					text-align: center;
					margin-right: rem(8px);
					margin-bottom: rem(16px);
					&:last-child {
						margin-right: 0;
					}
					&.active {
						background: $vip-theme-color;
						border: 1px solid $vip-theme-color;
						color: #2A2A2A;
					}
					&.flex {
						flex: 1;
					}
				}
			}
		}
		.outPro-wrap {
			margin-top: rem(8px);
			padding: 0 rem(15px);			
      .rate-wrap {
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-size: rem(15px);
        color: #fff;
        line-height: 1rem;
        .repay {
          color: $warning-color;
        }
      }
      .rate-handeler {
        width: 45%;
        font-size: rem(15px);
        color: #666;
        line-height: 1rem;
        overflow: hidden;
        p {
          display: inline-block;
        }
        .rateCal {
          position: relative;
          color: $warning-color;
          left: 3rem;
          top: 0;
          width: 4rem;
          height: 0.9rem;
          line-height: 0.9rem;
          background: none;
          text-align: right;
        }
        .rateCal:before {
          content: "\e66f";
          font-family: "iconfont";
          font-size: 0.7rem;
          cursor: pointer;
          padding-right: rem(6px);
        }
      }
      .vip-create{
				width: 100%;
				height: rem(44px);
				border: 0;
				background: $vip-theme-color;
				font-size: rem(16px);
				color: #2A2A2A;
				padding: 3px;
				margin:  rem(32px) auto rem(25px) auto;
				display: block;
				border-radius: 5px;
				&:active {
          background-color: darken($vip-theme-color, 5%);
        }
			}
    }
	}
	 footer{
		width: 100%;
		height: auto;
		position: relative;
		.footer-main {
			position: absolute;
			top: 0px;
			left: 0;
			width: 100%;
			text-align: center;
			color: #fff;
			font-size: rem(15px);
			a{
				color: #fff;
			}
			svg{
				fill: #d9c38d;
				margin-top:  rem(-3px);
				margin-right: rem(14px);
				vertical-align: middle;
			}
		}
	}
	.vipMask{position:fixed;width:100%;height:100%;left:0;top:0;background:rgba(50,50,50,0.7);z-index:999;}
	.vipMask .inner{height:auto;overflow: hidden;position:absolute;width:80%;background:#fff;border-radius:5px;left:50%;top:20%;-webkit-transform:translate(-50%,0);-moz-transform:translate(-50%,0);-ms-transform:translate(-50%,0);-o-transform:translate(-50%,0);transform:translate(-50%,0);}
	.vipMask .inner .header{width:100%;height: 3.05rem;color: #fff;border-radius:5px 5px 0 0;background: -webkit-linear-gradient(#2E3244,#121212);background:linear-gradient(#2E3244,#121212);color:#fff;}
	.vipMask .inner .header span{display:block;text-align:center;font-size:0.65rem;padding:.3rem 0 .2rem;}
	.vipMask .inner .header p{font-size:0.65rem;text-align:center;position:relative;line-height:0.9rem;color:$vip-theme-color;}
	.vipMask .inner .header p i{position:absolute;font-size:0.95rem;left:50%;vertical-align:middle;margin-left:-3.95rem;color:$vip-theme-color;;}
	.vipMask .inner .content{width: 100%;padding:.875rem 0 .5rem 0;}
	.vipMask .inner .content h3{font-size:0.65rem;color:$vip-theme-color;;text-align:center;padding-bottom:0.5rem;}
	.vipMask .inner .content .text_list{margin-left:1rem;}
	.vipMask .inner .content .text_list p{color:#a4a4a4;text-align:left;font-size:0.55rem;line-height:0.95rem;padding:0 0 0 1rem;text-align: left;
    font-size: 0.55rem;
    line-height: 0.95rem;}
	.vipMask .inner .content .text_list p strong{display:block;color:#3f3f3f;position:relative;}
	.vipMask .inner .content .text_list p strong:before{position:absolute;content:"";width:.5rem;height:.5rem;background:$vip-theme-color;;border-radius:50%;left:-1rem;top:.2rem;}
	.vipMask .inner .footer{width:100%;text-align:center;min-width: auto;margin-bottom: 20px;}
	.vipMask .inner .footer button{width:5.05rem;height:1.75rem;border:0;color:#A28362;background:#fff;border-radius:5px;font-size:0.7rem;}
	.vipMask .inner .footer button.active{width: 11.55rem;color:#E1D9BF;border:0;background:$vip-theme-color;;}
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
