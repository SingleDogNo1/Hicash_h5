<template>
	<div>
		<header class="home-header">
			<div class="bg" :style="'opacity:' + opacity"></div>
			<div class="title" :style="'opacity:' + opacity">嗨钱</div>
			<router-link :to="{ name: 'notice' }">
				<img width="22px" :src="noticeIcon" />
			</router-link>
		</header>
		<scroller lock-x @on-scroll="onScroll" ref="scroller">
			<div class="wrap">
				<swiper
					:list="bannerList"
					:show-desc-mask="false"
					:show-dots="showDots"
					dots-position="center"
					:auto="true"
					:loop="true"
					:interval="5000"
				></swiper>
				<div class="products">
					<div class="tips">
						<span class="red-packet"
							><img src="../assets/images/red-packet.png"
						/></span>
						<span>昨日共申请{{ allLoanApplication }}笔</span>
					</div>
					<div class="product-lists">
						<ul>
							<li
								v-for="(item, index) in productsList"
								:id="item.industryCode"
								:key="index"
							>
								<a :href="item.url"><img :src="item.img"/></a>
							</li>
						</ul>
					</div>
				</div>
				<div class="small-banner">
					<scroller lock-y :bounce="false">
						<div
							class="small-banner-scroll-wrap"
							v-bind:style="{
								width: smallBannerList.length * 140 - 10 + 'px'
							}"
						>
							<ul class="clearfix">
								<li
									v-for="(item, index) in smallBannerList"
									:key="index"
								>
									<a :href="item.picUrl">
										<img
											:src="
												item.picPrefixUrl +
													item.picSmallUrl
											"
										/>
									</a>
								</li>
							</ul>
						</div>
					</scroller>
				</div>
				<ul class="link">
					<li>
						<router-link :to="{ name: 'AllIndex' }">
							<span class="quick-repayment-ico"> 快速还款 </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ name: 'help' }">
							<span class="help-center-ico">帮助中心</span>
						</router-link>
					</li>
				</ul>
				<div class="footer-tips">客服热线：400-020-5566</div>
			</div>
		</scroller>
		<div v-transfer-dom>
			<x-dialog
				v-model="adShow"
				:hide-on-blur="true"
				class="ad-pop"
				v-for="(item, index) in adList"
				:key="index"
			>
				<div class="img-box">
					<a :href="item.adPicLink"
						><img
							:src="item.picPrefixUrl + item.adPic"
							style="width: 100%; height:100%"
					/></a>
				</div>
				<div @click="adShow = false" class="ad-close">
					<!-- <span class="vux-close"></span> -->
				</div>
			</x-dialog>
		</div>

		<alert v-model="shortcutPopup" title="提示">
			请点击浏览器设置，将页面添加到书签<br />或保存到桌面快捷方式。
		</alert>
		
		<div @touchmove=drag($event) class="drag" @click.stop="shortcutPopup=true">
			<span class="iconfont icon-zhuomiankuaijiefangshi"></span>
		</div>
		
		<iframe id="oldHicash" :src="oldHicash"></iframe>
		<page-footer></page-footer>
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
@import "../../bower_components/sass-rem/rem";
body {
	background: #f2f2f2 !important;
}
.icon-zhuomiankuaijiefangshi{
	width: 50px;
	height: 50px;
	display: block;
}
.icon-zhuomiankuaijiefangshi:before {
	content: "\e772";
	color: #ff6700;
	font-size: 40px;
}
.Home {
	header.home-header {
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
		width: 100%;
		height: rem(44px);
		background: transparent;
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
			height: rem(44px);
			line-height: rem(44px);
			color: #3f3f3f;
		}
		.title {
			width: 100%;
			font-size: rem(17px);
			text-align: center;
			height: rem(44px);
			line-height: rem(44px);
			color: #3f3f3f;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 2;
		}
		img {
			top: rem(10px);
			right: rem(10px);
			z-index: 2;
			position: absolute;
			width: 22px;
			display: block;
		}
	}
	.wrap {
		height: auto;
		position: relative;
	}
	.products {
		width: 100%;
		height: auto;
		background: #fff;
		padding: rem(10px) 0;
		margin-bottom: rem(5px);

		.tips {
			width: 86%;
			height: rem(30px);
			line-height: rem(30px);
			background: #ffeee5;
			border-radius: rem(20px);
			font-family: PingFangSC-Regular;
			font-size: rem(12px);
			color: #ff7640;
			letter-spacing: 0;
			text-align: center;
			margin: 0 auto rem(10px);
			position: relative;
			.red-packet {
				display: inline-block;
				position: absolute;
				top: rem(5px);
				left: rem(70px);
				img {
					height: rem(20px);
				}
			}
		}

		.product-lists {
			width: 90%;
			height: auto;
			margin: 0 auto;
			ul li {
				width: 100%;
				height: auto;
				// margin-bottom: rem(5px);
				img {
					width: 100%;
				}
			}
		}
	}

	.small-banner {
		width: 100%;
		height: auto;
		padding: rem(10px) 0;
		overflow-x: auto;
		background: #fff;
		&::-webkit-scrollbar {
			width: 0;
			height: 0;
		}
		.small-banner-scroll-wrap {
			width: 100%;
			padding: 0 5%;
			ul {
				width: 100%;
				li {
					width: 130px;
					height: 75px;
					float: left;
					margin-right: 10px;
					// margin-bottom: rem(5px);
					img {
						width: 100%;
						height: 100%;
					}
				}
				li:last-child {
					margin-right: 0;
				}
			}
		}
	}

	.link {
		height: 2rem;
		background: #fff;
		margin: 0;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		padding: 0 1rem;
		font-size: rem(14px);
		list-style: none;
		li {
			position: relative;
			color: #333;
			float: left;
			line-height: 2rem;
			text-align: center;
			width: 50%;
			.quick-repayment-ico {
				height: 20px;
				display: inline-block;
				background: url(../assets/images/icon_s.png) left no-repeat;
				line-height: 20px;
				padding-left: 30px;
				background-size: 20px 20px;
			}
			.help-center-ico {
				height: 20px;
				display: inline-block;
				background: url(../assets/images/icon_q.png) left no-repeat;
				line-height: 20px;
				padding-left: 30px;
				background-size: 20px 20px;
			}
			a {
				color: #3f3f3f;
				i {
					font-size: 0.8rem;
					color: #ff743d;
					padding-right: 0.35rem;
					vertical-align: middle;
				}
			}
		}
		li:first-child {
			a:after {
				position: absolute;
				content: "";
				width: 1px;
				height: 1rem;
				top: 0.5rem;
				right: 0;
				background: #dadada;
			}
		}
	}

	.footer-tips {
		width: 100%;
		text-align: center;
		font-family: PingFangSC-Regular;
		font-size: rem(15px);
		color: #999999;
		letter-spacing: 0;
		margin-bottom: 0.5rem;
	}

	#oldHicash {
		display: none;
	}

	.vux-slider > .vux-indicator > a > .vux-icon-dot.active,
	.vux-slider .vux-indicator-right > a > .vux-icon-dot.active {
		background-color: #fff !important;
	}

	.ad-pop {
		.weui-dialog {
			width: 11.675rem !important;
			height: 15.85rem !important;
			padding-bottom: 8px;
			border-radius: 0 !important;
			overflow: auto !important;
		}
		.dialog-title {
			line-height: 30px;
			color: #666;
		}
		.img-box {
			height: 100%;
			overflow: hidden;
			img {
				border-radius: 10px;
			}
		}
		.ad-close {
			position: absolute;
			width: 1.375rem;
			height: 1.375rem;
			top: -2.075rem;
			right: 0;
			background: none;
			display: block;
			z-index: 99999;
			&:before {
				position: absolute;
				content: "";
				width: 1.375rem;
				height: 1.375rem;
				background: url("../assets/images/ad-close.png");
				background-size: 1.375rem 1.375rem;
				font-family: "iconfont";
				font-size: 1.375rem;
				color: #fff;
				top: 0;
				left: 0;
			}
		}
	}

	.drag{
		background: #fff;
		width: 40px;
		height: 40px;
		padding: 10px;
		border-radius: 5px;
		position: absolute;
		right: 10px;
		bottom: 30%;
		z-index: 999;
		-moz-box-shadow:0px 0px 20px #333333; 
		-webkit-box-shadow:0px 0px 20px #333333; 
		box-shadow:0px 0px 20px #333333;
	}
}
</style>

<script type="text/javascript">
import { Swiper, Scroller, XDialog, TransferDom, Alert } from "vux";

import PageFooter from "../components/PageFooter.vue";

import noticeWIcon from "../assets/images/icon-notice-w.png";
import noticeBIcon from "../assets/images/icon-notice.png";


import "../assets/js/youmeng.js";

export default {
	components: {
		Swiper,
		PageFooter,
		Scroller,
		XDialog,
		Alert
	},
	directives: {
		TransferDom
	},
	data() {
		return {
			opacity: 0,
			titleOpacity: 0,
			oldHicash: "",
			allLoanApplication: "0",
			quickRepaymentUrl: "",
			adShow: false,
			adList: [],
			bannerList: [],
			productsList: [],
			smallBannerList: [],
			noticeIcon: noticeWIcon,
			showDots: false,
			tags: null,
			shortcutPopup: false
		};
	},
	ready() {},
	methods: {
		onScroll: function(pos) {
			let top = pos.top > 44 ? 44 : pos.top;
			if (pos.top > 44) {
				pos.top = 44;
				this.noticeIcon = noticeBIcon;
			} else {
				this.noticeIcon = noticeWIcon;
			}

			this.opacity = (1 / 44) * top;
		},
		getHomePagePic: function(params) {
			let _this = this;
			_this.common.getHomePagePic(params).then(function(res) {
				if (params.cityCode === "000003") {
					let bannerList = [];
					_.each(res.data.bannelList, function(v) {
						const item = {
							url: v.picUrl,
							img: v.picPrefixUrl + v.picBigUrl
						};
						bannerList.push(item);
					});
					_this.bannerList = bannerList;
					if (_this.bannerList.length > 1) {
						_this.showDots = true;
					}
					// _this.
				} else if (params.cityCode === "000002") {
					_this.smallBannerList = res.data.bannelList;
				}
			});
		},
		getAllLoanApplication: function() {
			this.common.getAllLoanApplication().then(res => {
				let data = res.data;
				this.allLoanApplication = this.utils.toThousands(
					data.AllLoanApplication
				);
			});
		},
		getIndexMain: function(params) {
			this.common.getIndexMain(params).then(res => {
				let productList = res.data.columnList[0].productList;
				let arr = [];
				let _this = this;
				const MWEB_PATH = this.config.MWEB_PATH;
				_.each(productList, function(v) {
					if (v.showStatus == "1") {
						let obj = {
							img: v.proShowImg,
							industryCode: v.industryCode
						};
						if (
							v.industryCode == "MDCP" ||
							v.industryCode == "LDDD"
						) {
							obj.url =
								MWEB_PATH +
								"newweb/product/miaodai.html?industryCode=" +
								v.industryCode;
						} else if (v.industryCode == "VIPD") {
							obj.url = "/#/product/vip";
						}
						arr.push(obj);
					}

					if (arr.length) {
						_this.productsList = arr;
					}
				});
			});
		},
		indexAdvertising: function(params) {
			this.common.indexAdvertising(params).then(res => {
				let currentTime = window.localStorage.getItem("adTime");
				if (currentTime) {
					currentTime = parseInt(currentTime);
				}
				if (
					!currentTime ||
					new Date(currentTime).toDateString() !==
						new Date().toDateString()
				) {
					currentTime = Date.parse(new Date());
					if (res.data.list && res.data.list.length) {
						window.localStorage.setItem("adTime", currentTime);
						this.adList = res.data.list;
						this.adShow = true;

						let _this = this;
						let delay = res.data.list[0].times * 1000;
						setTimeout(function() {
							_this.adShow = false;
						}, delay);
					}
				}
			});
		},
		drag: function(e){
			e.stopPropagation();//原生阻止冒泡事件
			var pageX = e.changedTouches[0].pageX;
			var pageY = e.changedTouches[0].pageY;

			if(pageX - e.target.clientWidth / 2 <0){
				pageX = 0;
			}else if(pageX - e.target.clientWidth / 2 > window.screen.width - e.target.clientWidth ){
				pageX = window.screen.width - e.target.clientWidth;
			}else{
				pageX = pageX - e.target.clientWidth / 2;
			}

			if(pageY - e.target.clientHeight / 2 <0){
				pageY = 0;
			}else if(pageY - e.target.clientHeight / 2 > window.screen.height - e.target.clientHeight){
				pageY = window.screen.height - e.target.clientHeight;
			}else{
				pageY = pageY - e.target.clientHeight / 2;
			}

			if(e.srcElement.className == "iconfont icon-zhuomiankuaijiefangshi"){
				e.srcElement.parentElement.style.left = pageX+'px';
				e.srcElement.parentElement.style.top = pageY+'px';
			}else{
				e.srcElement.style.left = pageX+'px';
				e.srcElement.style.top = pageY+'px';
			}
			
			
		}
	},
	mounted: function() {
		let _this = this;
		var userName = this.utils.getCookie("userName") || "";
		if (userName) {
			this.oldHicash =
				this.config.MWEB_PATH +
				"newweb/template/fromAppTemp.html?userName=" +
				userName +
				"&authorization=" +
				sessionStorage.getItem("authorization");
		}

		//添加友盟埋点
		setTimeout(function() {
			if (window._czc) {
				window._czc.push([
					"_trackEvent",
					"首页",
					"首页打开的次数",
					"",
					"",
					"SS"
				]);
			}
		}, 2000);

		// 初始化scroller
		setTimeout(function() {
			_this.$refs.scroller.reset();
		});

		//获取大banner
		let bigBannerObj = {
			cityCode: "000003",
			uuid: this.utils.uuid(),
			position: "1"
		};
		this.getHomePagePic(bigBannerObj);

		//获取小banner
		let smallBannerObj = {
			cityCode: "000002",
			uuid: this.utils.uuid(),
			position: "5"
		};
		this.getHomePagePic(smallBannerObj);

		// 获取昨日申请笔数
		this.getAllLoanApplication();

		// 获取产品列表
		var postData = new URLSearchParams();
		postData.append("requestSource", "HTML5");
		postData.append("platform", "HTML5");
		postData.append("version", "");
		postData.append("uuid", this.utils.uuid());
		postData.append("userName", userName);
		this.getIndexMain(postData);

		//快速还款URL
		this.quickRepaymentUrl =
			this.config.MWEB_PATH + "newweb/personalCenter/myBrrow.html";

		//首页弹屏广告
		var postData = new URLSearchParams();
		postData.append("userName", userName);
		postData.append("adPosition", "1");
		postData.append("uuid", this.utils.uuid());
		this.indexAdvertising(postData);
	}
};
</script>
