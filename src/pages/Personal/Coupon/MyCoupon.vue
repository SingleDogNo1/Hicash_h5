<template>
	<div class="coupon_page">
		<div class="wrap">
			<header class="creditHeader" style="background-color:white;">
				<!-- closeBtn -->
				<div v-if="isShowHead">
					<a class="go-history" href="javascript:history.go(-1);" style="left:.85rem;top:40%"></a>
					<p class="title">优惠券</p>
				</div>
				<tab :line-width="1" custom-bar-width="60px">
					<tab-item selected @on-item-click="onItemClick('canUseCouponList')">未使用</tab-item>
					<tab-item @on-item-click="onItemClick('usedCouponList')">已使用</tab-item>
					<tab-item @on-item-click="onItemClick('expiredCouponList')">已过期</tab-item>
				</tab>
			</header>
			<div class="wrapper">
				<ul class="content">
					<li class="ref"><inline-loading></inline-loading>{{refreshText}}</li>
					<!-- <li v-for="(item,index) in list" :key="index">
						<a :href="item.openUrl"><p>{{item.title}}</p></a>
					</li> -->
					<li class="clearfix" :class="{'gray':subType=='usedCouponList'||subType=='expiredCouponList'}" v-for="item in list[subType]">
						<div class="left-main left">
							<span class="coupon-price left">{{item.bigNum}}<em>.{{item.smallNum}}元</em></span>
							<span class="coupon-tips">还款时使用</span>
						</div>
						<div class="right-main left">
							<span class="title">{{item.couponRuleName}}<em>（共{{item.num}}张）</em></span>
							<span class="explain">可使用产品{{item.industryName}}，可叠加使用{{item.accumulationLimit}}次</span>
							<span class="data">有效期 {{item.sendStartDate}}-{{item.sendEndDate}}</span>
						</div>
						<div class="help" @click.stop="clickHelp(item)">使用规则</div>
					</li>
					<li class="no-data" v-if="!list || !list[subType] || !list[subType].length">
						<img src="./images/bg-no-data.png" width="30%">
						<p>这里暂时什么都没有</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {Tab, TabItem, Flexbox, FlexboxItem, InlineLoading} from 'vux';
	import BScroll from 'better-scroll'
	export default {
		components: {
			Tab,
			TabItem,
			Flexbox,
			FlexboxItem,
			InlineLoading
		},
		data() {
			return {
				list: [],
				repeatList: [],
				subType: 'canUseCouponList',
				scroll:"",
				refreshText: '下拉刷新',
				isShowHead: true
			}
		},
		mounted() {
			var _this = this;

			let comeFrom = _this.utils.getPlatform();
			if (comeFrom != 'H5') {
				_this.isShowHead = false
			}

			_this.getCustHicashCoupon();

			
			this.scroll = new BScroll(".wrapper", {
				click: true,
				scrollY: true,
				pullDownRefresh: {
					threshold: 30, // 当下拉到超过顶部 30px 时，
				},
				probeType: 1
			})
			this.scroll.on('scroll', function (pos) {
		        if (pos.y > 30 && pos.y < 40) { 
		          _this.refreshText = '下拉刷新'
		        }
			})
			this.scroll.on('touchEnd', function (pos) {
		  		if (pos.y > 40) {
					_this.refreshText = '刷新数据中'
					_this.getCustHicashCoupon();
		  		}
			})

			this.utils.setCookie('isHaveUnreadCoupon', 0);
		},
		methods: {
			onItemClick: function(type){
				this.subType = type;
				this.scroll.scrollTo(0,0);
				console.info(type);
				// this.getCustHicashCoupon();
			},
			getCustHicashCoupon: function(){
				// 获取产品列表
				let postData = new URLSearchParams();
					postData.append('userName', this.utils.getCookie("userName"));
					postData.append('uuid', this.utils.uuid());

				let _this = this;

				this.common.getCustHicashCoupon(postData)
				.then(function(res){
					let list = res.data;
					if(list.canUseCouponList.length){
						_.each(list.canUseCouponList, function(v,i){
							var money = list.canUseCouponList[i].amount.split('.');
							list.canUseCouponList[i].bigNum = money[0]
							list.canUseCouponList[i].smallNum = money[1]
						})
					}

					if(list.expiredCouponList.length){
						_.each(list.expiredCouponList, function(v,i){
							var money = list.expiredCouponList[i].amount.split('.');
							list.expiredCouponList[i].bigNum = money[0]
							list.expiredCouponList[i].smallNum = money[1]
						})
					}

					if(list.usedCouponList.length){
						_.each(list.usedCouponList, function(v,i){
							var money = list.usedCouponList[i].amount.split('.');
							list.usedCouponList[i].bigNum = money[0]
							list.usedCouponList[i].smallNum = money[1]
						})
					}
					
					_this.list = list;
					// this.repeatList = 
					_this.$nextTick(function () {
						setTimeout( () => {
							_this.refreshText = '刷新成功'
							setTimeout( () => {
								_this.scroll.refresh();
								_this.refreshText = '下拉刷新'
							}, 500)
						}, 1000)
					});
				});
			},
			clickHelp (data) {
				this.$vux.alert.show({
					title: '活动规则',
					content: data.ruleMsgStr,
					onShow () {
						console.log('活动规则alert，点击了确定！')
					},
					onHide () {
						// console.log('Plugin: I\'m hiding now')
					}
				})
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import "~bowerComponents/sass-rem/_rem.scss";

	.MyCoupon{
		background-color: rgb(245, 245, 245);
		.coupon_page {
			height: 100%;
			.wrap {
				position:relative;
				z-index:1;
				height: 100%;
				padding: 0;
			}
			header .go-history:before, header .go-back:before {
				font-family: "iconfont";
				position: absolute;
				content: "\ED72";
				left: 50%;
				top: 0%;
				font-size: 20px;
				color: black;
			}
			header p {
				font-size: rem(17px);
				width: 100%;
				text-align: center;
				height: 50px;
				line-height: 50px;
			}
			header {
				height: 95px;
				line-height: 95px;
				display: block;
				position: relative;
			}

			.vux-slider > .vux-indicator > a > .vux-icon-dot.active, .vux-slider .vux-indicator-right > a > .vux-icon-dot.active {
				background-color: #fff !important;
			}
			.vux-tab .vux-tab-item.vux-tab-selected {
				color: #FF7640
			}
			.vux-tab-bar-inner {
				border: 1px solid #FF7640;
			}
			.wrapper {
				height: calc(100% - 95px);
				.content {
					background-color: rgb(245, 245, 245);
					min-height:calc(100% + 1px);
					li {
						width: 90%;
						height: rem(83px);
						margin: rem(10px) auto 0;
						position: relative;
						
						.help{
							width: auto;
							height: auto;
							padding: 1px 3px;
							position: absolute;
							right: rem(10px);
							top: rem(12px);
							border: 1px solid #FD7F5F;
							border-radius: 9px;
							color: #FD7F5F;
							font-size: rem(10px);
						}
						.left-main{
							width: 32%;
							height: rem(83px);
							background: url(./images/icon_coupon.png) no-repeat;
							background-size: 100% 100%;
							span{
								display: block;
								color: #fff
							}
							.coupon-price{
								width: 100%;
								height: 70%;
								font-size: rem(45px);
								text-align: center;
								em{
									font-size: rem(20px);
									font-style: inherit;
								}
							}
							.coupon-tips{
								width: 100%;
								height: 30%;
								text-align: center;
								font-size: rem(12px);
								clear: both;
							}
						}
						.right-main{
							width: 68%;
							height: rem(83px);
							background: #fff;
							span{
								display: block;
								padding-left: rem(11px);
								color: #999;
								font-size: rem(10px);
							}
							.title{
								color: #333;
								font-size: rem(15px);
								margin: rem(10px) 0;
								padding-left: rem(11px);
								em{
									font-size: rem(13px);
									font-style: inherit;
									color: #999;
								}
							}
						}
						
						.weui-loading {
							margin-right: rem(10px);
						}

						&.gray{
							.left-main{
								background: #ccc;
							}
							.title, .explain, .data{
								color: #ccc;
								em{
									color: #ccc;
								}
							}
							.help{
								color: #ccc;
								border-color: #ccc;
							}
						}

						&.no-data{
							img{
								display: block;
								padding-top: rem(50px);
								margin: 0px auto;
							}
							p{
								text-align: center;
								margin-top: rem(20px);
								color: #666;
								font-size: rem(12px);
							}
						}
					}
					li.ref{
						position: absolute;
						top: -48px;
						left: 0;
						padding-left: 0;
						width: 100%;
						font-size: 12px;
						color: #333;
						background-color: rgb(245, 245, 245);
						text-align: center;
						height: 48px;
						line-height: 48px;
						margin-top: 0;
					}
				}
			}
			.vux-flexbox {
				height: 100%;
			}
		}
		.popup{
			padding: rem(10px 15px);
			.title{
				font-size: rem(15px);
				color: #999999;
			}
			a.go{
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: rem(50px);
				display: block;
				background: #FF7640;
				color: #fff;
				text-align: center;
				line-height: rem(50px);
				font-size: rem(15px);
			}
		}
		.vux-popup-dialog{
			background: #fff;
		}

		.weui-cell{
			padding: 0;
		}

		.weui-cells:before, .weui-cells:after{
			border: 0;
		}
		.vux-number-selector{
			line-height: 0;
		}
		.vux-number-round .vux-number-selector-sub{
			width: rem(16px);
			height: rem(16px);
			border: 1px solid #FF7640;
			svg{
				width: 100%;
				height: 100%;
				fill: #FF7640;
				top: 0px;
			}
		}


		.vux-number-round .vux-number-selector-plus{
			width: rem(16px);
			height: rem(16px);
			border: 1px solid #FF7640;
			background: #FF7640;
			svg{
				width: 100%;
				height: 100%;
				fill: #fff;
			}
		}

		.vux-number-round .vux-number-selector-plus.vux-number-disabled{
			background: #ececec;
			svg{
				fill: #fff;
			}
		}
 
		.weui-cells{
			font-size: rem(15px);
		}

		.weui-dialog{
			background: #fff !important;
		}
	}
</style>
