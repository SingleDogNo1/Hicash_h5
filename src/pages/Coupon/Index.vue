<template>
	<div class="coupon_page">
		<div class="wrap">
			<header class="credit-header" style="background-color:white;">
				<!-- closeBtn -->
				<a class="go-history" href="javascript:history.go(-1);"></a>
				<h1>优惠券</h1>
			</header>
			<div class="wrapper">
				<ul class="content">
					<li class="ref">
						<inline-loading></inline-loading>{{ refreshText }}
					</li>
					<!-- <li v-for="(item,index) in list" :key="index">
						<a :href="item.openUrl"><p>{{item.title}}</p></a>
					</li> -->
					<li
						class="clearfix"
						@click="selectCoupon(item)"
						v-for="(item,index) in list" :key=index
					>
						<div class="left-main left" :class="{'special-coupon': item.type === '2' || item.type === '3'}">
							<span class="coupon-price left" v-if="item.type === '1'" :style="{ 'height': item.bigNum.length > 2 ? '58%' : '70%'}">
                <span v-if="item.bigNum.length > 2" style="margin-top:-8px">
                  <em>{{ item.bigNum }}</em><em>.{{ item.smallNum }}元</em>
                </span>
                <span v-else >
                  {{ item.bigNum }}<em>.{{ item.smallNum }}元</em>
                </span>
              </span>
              <span class="coupon-price left" v-if="item.type === '2' && !item.isDefaultDiscount">
                {{ item.bigNum}}.{{ item.smallNum }}<em>折</em>
              </span>
              <span class="coupon-price left is-default-discount" v-if="item.type === '2' && item.isDefaultDiscount">
                0<em>折起</em>
              </span>
              <span class="coupon-price left" v-if="item.type === '3' && !item.isDefaultAmount" :style="{ 'height': item.bigNum.length > 2 ? '52%' : '60%'}">
                <span v-if="item.bigNum.length > 2" style="margin-top:-7px">
                  <em>{{ item.bigNum }}</em><em>.{{ item.smallNum }}元</em>
                </span>
                <span v-else >
                  {{ item.bigNum }}<em>.{{ item.smallNum }}元</em>
                </span>
              </span>
              <span class="coupon-price left is-default-amount" v-if="item.type === '3' && item.isDefaultAmount">
                <em>最高200元</em>
              </span>
							<span class="coupon-tips">还款时使用</span>
						</div>
						<div class="right-main left" :class="{'special-coupon-text': item.type === '2' || item.type === '3'}">
							<span class="title"
								>{{ item.couponRuleName
								}}<em v-if="item.type === '1'">（共{{ item.canUseMaxNum }}张）</em></span
							>
							<span class="explain"
								>可使用产品：{{ item.industryName }}<em v-if="item.type === '1'">，可叠加使用{{
									item.accumulationLimit
								}}次</em></span
							>
							<span v-if="item.type !== '1'">
                使用额度：限借款{{ item.minUseAmount }}元以上方可使用
              </span>
              <span class="date">
                有效期 {{ item.sendStartDate }}-{{
                item.sendEndDate
                }}
              </span>
              <span class="period" v-if="item.type !== '1'">
                使用期数：{{item.periods}}
              </span>
            </div>
						<div class="help" @click.stop="clickHelp(item)">
							使用规则
						</div>
					</li>
				</ul>
			</div>
		</div>
		<popup
			width="100%"
			height="150px"
			position="bottom"
			v-model="isShowPopup"
		>
			<div class="popup">
				<div class="title">已选优惠卷</div>
				<group>
					<x-number
						v-model="couponNum"
						:title="couponPopupTitle"
						:min="minNum"
						:max="maxNum"
						width="50px"
						button-style="round"
					></x-number>
				</group>
				<a
					class="go"
					:href="
						goUseCouponHref +
							'appNo=' +
							appNo +
							'&userName=' +
							userName +
							'&rechargeAmount=' +
							rechargeAmount +
							'&couponNum=' +
							couponNum +
							'&couponRuleId=' +
							couponId +
							'&couponAmount=' +
							couponAmount + 
							'&discountAmount=' +
							discountAmount +
							'&couponType=' +
							couponType + 
							'&oldCurrentAmt=' +
							oldCurrentAmt
					"
					>去使用</a
				>
			</div>
		</popup>
		<alert v-model="isShowDialog" title="活动规则" :content="ruleMsgStr" class="confirmDialog" button-text="确认"></alert>
	</div>
</template>
<script type="text/javascript">
import {
	Tab,
	TabItem,
	Flexbox,
	FlexboxItem,
	InlineLoading,
	Popup,
	XNumber,
	Group,
	Alert
} from "vux";
import BScroll from "better-scroll";
export default {
	components: {
		Tab,
		TabItem,
		Flexbox,
		FlexboxItem,
		InlineLoading,
		Popup,
		XNumber,
		Group,
		Alert
	},
	data() {
		return {
			list: [],
			subType: "RMWT",
			scroll: "",
			refreshText: "下拉刷新",
			isShowHead: true,
			isShowPopup: false,
			couponPopupTitle: "",
			couponNum: 1,
			couponId: "",
			couponAmount: "",
			minNum: 0,
			maxNum: 50,
			curCouponData: [],
			unit: 0,
			goUseCouponHref: "",
			appNo: null,
			userName: this.utils.getCookie("userName"),
			rechargeAmount: this.$route.query.rechargeAmount,
			oldCurrentAmt: this.$route.query.oldCurrentAmt,
			discountAmount: "",
			couponType: "",
			isDefaultDiscount: true,
			isDefaultAmount: true,
			isShowDialog: false,
			ruleMsgStr: ""	
		};
	},
	mounted() {
		var _this = this;

		let comeFrom = _this.utils.getPlatform();
		if (comeFrom != "H5") {
			_this.isShowHead = false;
		}

		this.appNo = this.$route.query.appNo;

		if (this.$route.query.source == "1") {
			//普通充值
			this.goUseCouponHref =
				this.config.MWEB_PATH +
				"newweb/personalCenter/rechargePay.html?";
		} else {
			this.goUseCouponHref =
				this.config.MWEB_PATH +
				"newweb/personalCenter/rechargePay_smile.html?";
		}

		_this.getRechargeCoupon();

		this.scroll = new BScroll(".wrapper", {
			click: true,
			scrollY: true,
			pullDownRefresh: {
				threshold: 30 // 当下拉到超过顶部 30px 时，
			},
			probeType: 1
		});
		this.scroll.on("scroll", function(pos) {
			if (pos.y > 30 && pos.y < 40) {
				_this.refreshText = "下拉刷新";
			}
		});
		this.scroll.on("touchEnd", function(pos) {
			if (pos.y > 40) {
				_this.refreshText = "刷新数据中";
				_this.getRechargeCoupon();
			}
		});
	},
	methods: {
		onItemClick: function(type) {
			this.subType = type;
			this.scroll.scrollTo(0, 0);
			this.getRechargeCoupon();
		},
		getRechargeCoupon: function() {
			// 获取产品列表
			let postData = new URLSearchParams();
			postData.append("userName", this.utils.getCookie("userName"));
			postData.append("rechargeAmount", this.$route.query.rechargeAmount);
			postData.append("uuid", this.utils.uuid());
			postData.append("appNo", this.$route.query.appNo);

			let _this = this;

			this.common.getRechargeCoupon(postData).then(res=> {
				let list = res.data.canUseCouponList;

				_.each(list, (v, i)=> {
					switch (list[i].type) {
						case "1":
							var money = list[i].showAmount.split(".");
							list[i].bigNum = money[0];
							list[i].smallNum = money[1];
							break;
						case "2":
							if (parseFloat(list[i].showAmount) > 0) {
								list[i].isDefaultDiscount = false;
								var money = list[i].showAmount.split(".");
								list[i].bigNum = money[0];
								list[i].smallNum = money[1];
							} else {
								list[i].isDefaultDiscount = true;
							}
							if(list[i].period) {
								var newPeriods = [];
								var periods = list[i].period.split(",");
								for(let j = 0; j < periods.length; j++) {
									newPeriods.push(periods[j] + "期")
								}
								var newPeriodsStr = newPeriods.join("、");
								list[i].periods = newPeriodsStr;
							}
							break;
						case "3":
							if (parseFloat(list[i].showAmount) > 0) {
								list[i].isDefaultAmount = false;
								var money = list[i].showAmount.split(".");
								list[i].bigNum = money[0];
								list[i].smallNum = money[1];
							} else {
								list[i].isDefaultAmount = true;
							}
							if(list[i].period) {
								var newPeriods = [];
								var periods = list[i].period.split(",");
								for(let j = 0; j < periods.length; j++) {
									newPeriods.push(periods[j] + "期")
								}
								var newPeriodsStr = newPeriods.join("、");
								list[i].periods = newPeriodsStr;
							}
							break;
					}
				});

				_this.list = list;

				_this.$nextTick(function() {
					setTimeout(() => {
						_this.refreshText = "刷新成功";
						setTimeout(() => {
							_this.scroll.refresh();
							_this.refreshText = "下拉刷新";
						}, 500);
					}, 1000);
				});
			});
		},
		selectCoupon: function(data) {
			this.isShowPopup = true;
			this.curCouponData = data;

			switch (data.type) {
				case "1":
					this.unit = "元";
					break;
				case "2":
					this.unit = "折";
					break;
				case "3":
					this.unit = "元";
					break;
			}
			(this.couponPopupTitle =
				data.showAmount + this.unit + data.couponRuleName),
				(this.maxNum = parseInt(data.canUseMaxNum));
			this.couponId = data.couponRuleId;
			this.couponAmount = data.showAmount;
			this.discountAmount = data.discountAmount;
			this.couponType = data.type;
		},
		clickHelp(data) {
      this.isShowDialog = true;
      let reg = new RegExp("\n","g"); 
      this.ruleMsgStr = data.ruleMsgStr.replace(reg,"<br>");
    }
	},
	watch: {
		couponNum(newValue, oldValue) {
			if (newValue == 0) {
				this.isShowPopup = false;
			}
		}
	}
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "~bowerComponents/sass-rem/_rem.scss";

.Coupon {
	background-color: rgb(245, 245, 245);
	.coupon_page {
		height: 100%;
		.wrap {
			position: relative;
			z-index: 1;
			height: 100%;
			padding: 0;
		}

		.vux-slider > .vux-indicator > a > .vux-icon-dot.active,
		.vux-slider .vux-indicator-right > a > .vux-icon-dot.active {
			background-color: #fff !important;
		}
		.vux-tab .vux-tab-item.vux-tab-selected {
			color: #ff7640;
		}
		.vux-tab-bar-inner {
			border: 1px solid #ff7640;
		}
		.wrapper {
			height: calc(100% - 95px);
			margin-top: 60px;
			.content {
				background-color: rgb(245, 245, 245);
				min-height: calc(100% + 1px);
				li {
					width: 90%;
					//height: rem(83px);
					margin: rem(10px) auto 0;
					position: relative;
					.help {
						width: auto;
						height: auto;
						padding: 1px 3px;
						position: absolute;
						right: rem(10px);
						top: rem(12px);
						border: 1px solid #fd7f5f;
						border-radius: 9px;
						color: #fd7f5f;
						font-size: rem(10px);
					}
					.left-main {
						width: 32%;
						height: rem(83px);
						background: url(./images/icon_coupon.png) no-repeat;
						background-size: 100% 100%;
						span {
							display: block;
							color: #fff;
						}
						.coupon-price {
							width: 100%;
							height: 70%;
							font-size: rem(45px);
							text-align: center;
							em {
								font-size: rem(20px);
								font-style: inherit;
							}
							&.is-default-amount, &.is-default-discount {
                margin-top: 0 !important;
								height: 65% !important;
              }
						}
						.coupon-tips {
							width: 100%;
							height: 30%;
							text-align: center;
							font-size: rem(12px);
							clear: both;
						}
						&.special-coupon {
              height: rem(99px);
              background: url(./images/icon_coupon_special.png) no-repeat;
              .coupon-price {
                margin-top: rem(6px);
                height: 60%;
              }
            }
					}
					.right-main {
						width: 68%;
						height: rem(83px);
						background: #fff;
						span {
							display: block;
							padding-left: rem(11px);
							color: #999;
							font-size: rem(10px);
							em {
								font-style: inherit;
							}
							&.period, &.date {
                height: rem(16px);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
								padding-right: rem(10px);
              }
						}
						.title {
							color: #333;
							font-size: rem(15px);
							margin: rem(10px) 0;
							padding-left: rem(11px);
							em {
								font-size: rem(13px);
								font-style: inherit;
								color: #999;
							}
						}
						&.special-coupon-text {
              height: rem(99px);
              .title {
                margin: rem(10px) 0 rem(4px);
              }
            }
					}

					.weui-loading {
						margin-right: rem(10px);
					}
				}
				li.ref {
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
	.popup {
		padding: rem(10px 15px);
		.title {
			font-size: rem(15px);
			color: #999999;
		}
		a.go {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: rem(50px);
			display: block;
			background: #ff7640;
			color: #fff;
			text-align: center;
			line-height: rem(50px);
			font-size: rem(15px);
		}
	}
	.vux-popup-dialog {
		background: #fff;
		.weui-cell {
			padding: 0;
		}

		/deep/ .weui-cells:before,
		/deep/ .weui-cells:after {
			border: 0;
		}
		.vux-number-selector {
			line-height: 0;
		}
		/deep/ .vux-number-round {
			.vux-number-selector-sub {
				width: rem(16px);
				height: rem(16px);
				border: 1px solid #ff7640;
				svg {
					width: 100%;
					height: 100%;
					fill: #ff7640;
					top: 0px;
				}
				&.vux-number-disabled {
					background: #ececec;
					border-color: #ececec;
					svg {
						fill: #fff;
					}
				}
			}
			.vux-number-selector-plus {
				width: rem(16px);
				height: rem(16px);
				border: 1px solid #ff7640;
				background: #ff7640;
				svg {
					width: 100%;
					height: 100%;
					fill: #fff;
				}
				&.vux-number-disabled {
					background: #ececec;
					border-color: #ececec;
					svg {
						fill: #fff;
					}
				}
			}
		}

		/deep/ .weui-cells {
			font-size: rem(15px);
		}
	}
	.vux-alert {
    .weui-dialog__hd {
			height: rem(32px);
			line-height: rem(32px);
			background: #ff7640;
			color: #fff;
			padding: .3em 1.6em;
			font-size: 16px;
    }
    .weui-dialog__bd {
			padding: .8em 1.6em;
			text-align: left;
			font-size: 14px;
    }
  }
}
</style>
