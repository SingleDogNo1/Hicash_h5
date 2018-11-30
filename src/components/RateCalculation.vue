<template>
	<div class="rate-calculation-body">
		<header class="credit-header">
			<!-- go-history -->
			<a class="go-history" href="javascript:;" @click="goBack"></a>
			<h1>费率计算</h1>
		</header>
		<div class="rate-calculation-container">
			<div class="rate-calculation-content">
				<div class="notice">
					<ul class="notice-head clearfix">
						<li>借款金额</li>
						<li>借款期限</li>
						<li class="ddcpchange">每期最低本息还款</li>
					</ul>
					<ul class="notice-body clearfix">
						<li class="rateDesAmount">{{ amountSelected }}</li>
						<li class="rateDesTime">
							{{ timeSelected.installments }}
						</li>
						<li class="rateDesRate">￥{{ lowPay }}</li>
					</ul>
				</div>
				<div class="calculation">
					<div class="loan-amount-list">
						<div class="title">借款金额</div>
						<checker
							v-model="amountSelectedIndex"
							default-item-class="amount-item"
							radio-required
							selected-item-class="amount-item-selected"
							class="clearfix"
						>
							<checker-item
								v-for="(amountListItem, index) in amountList"
								v-model="index"
								v-bind:data-amount="amountListItem"
								v-bind:data-index="index"
								@on-item-click="
									selectLoanAmount(amountListItem)
								"
								:key="index"
							>
								{{ amountListItem }}
							</checker-item>
						</checker>
					</div>
					<div class="loan-time-list">
						<div class="title">借款时间</div>
						<checker
							v-model="timeSelectedIndex"
							default-item-class="time-item"
							radio-required
							selected-item-class="time-item-selected"
						>
							<checker-item
								v-for="(programListItem, index) in programList"
								v-model="index"
								@on-item-click="selectLoanTime(programListItem)"
								:key="index"
							>
								<span>{{ programListItem.installments }}</span
								><span>{{ periodUnit }}</span>
							</checker-item>
							<div class="clear"></div>
						</checker>
					</div>
				</div>
			</div>
			<div class="rate-calculation-desc">
				<strong>借款费用说明</strong>
				<p>
					利率按实际的借款月数收取，每月收取借款金额的<span
						class="percentage"
						>{{ ratePercentage }}</span
					>,实际利率将根据您的资料最终审核确定，提供真实有效资料有助于提高您的审核通过率；
				</p>
			</div>
		</div>
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
.rate-calculation-body {
	width: 100%;
	height: 100%;
	.rate-calculation-container {
		width: 100%;
		margin: 2.2rem 0 2.075rem;
		padding-bottom: 2.075rem;
		background: #fff;
		.rate-calculation-content {
			background: #f1f1f1;
			padding: 0.8rem 0 0.5rem;
			.notice {
				width: 12rem;
				height: 3.5rem;
				background: #fff;
				border-radius: 10px;
				font-size: 0.6rem;
				margin: 0 auto;
				box-shadow: 1px 6px 10px #dfdfdf;
				.notice-head {
					background: #ffb43b;
					border-radius: 10px 10px 0 0;
					li {
						float: left;
						width: 25%;
						text-align: center;
						height: 1.4rem;
						line-height: 1.4rem;
						color: #fff;
					}
					li:nth-child(3) {
						width: 50%;
					}
				}
				.notice-body {
					li {
						float: left;
						width: 25%;
						text-align: center;
						height: 2.1rem;
						line-height: 2.1rem;
						color: #ff7a46;
					}
					li:nth-child(3) {
						width: 50%;
					}
				}
			}
			.calculation {
				width: 100%;
				height: auto;
				background: #fff;
				margin: 0.8rem auto 0rem;
				overflow-y: scroll;
				.loan-amount-list,
				.loan-time-list {
					width: 13.5rem;
					padding-bottom: 0.125rem;
					border-bottom: 0;
					margin: 0 auto;
					.title {
						position: relative;
						text-align: left;
						padding: 0.5rem 0 0.4rem 0;
						border-bottom: none;
						margin-bottom: 0;
						font-size: 0.7rem;
						color: #3f3f3f;
					}
					.vux-checker-box {
						width: 100%;
						padding: 0;
						.amount-item {
							float: left;
							width: 3.55rem;
							height: 1.35rem;
							text-align: center;
							line-height: 1.35rem;
							margin-left: 0.45rem;
							margin-bottom: 0.45rem;
							border-radius: 5px;
							border: 0.075rem solid #fff;
							font-size: 0.75rem;
							color: #a4a4a4;
							border: 1px dashed #ddd;
						}
						.amount-item:nth-child(3n + 1) {
							margin-left: 0;
						}
						.amount-item-selected {
							border-style: solid;
							background: #ff7640;
							color: #fff;
						}
					}
				}
				.loan-time-list {
					.vux-checker-box {
						width: 100%;
						padding: 0;
						.time-item {
							float: left;
							width: 3.55rem;
							height: 1.35rem;
							text-align: center;
							line-height: 1.35rem;
							margin-left: 0.45rem;
							margin-bottom: 0.45rem;
							border-radius: 5px;
							border: 0.075rem solid #fff;
							font-size: 0.75rem;
							color: #a4a4a4;
							border: 1px dashed #ddd;
						}
						.time-item:nth-child(3n + 1) {
							margin-left: 0;
						}
						.time-item-selected {
							border-style: solid;
							background: #ff7640;
							color: #fff;
						}
					}
				}
			}
		}
		.rate-calculation-desc {
			font-size: 0.65rem;
			width: 13.5rem;
			margin: 0 auto;
			line-height: 1.6em;
			color: #7a7a7a;
			strong {
				font-size: 0.7rem;
				color: #333;
				padding: 1.2rem 0 0.3rem;
				display: block;
				font-weight: normal;
			}
		}
	}
}
.weui-tab__panel {
	padding-bottom: 0 !important;
}
</style>

<script type="text/javascript">
import {
	Loading,
	XDialog,
	XButton,
	Popup,
	Group,
	Checker,
	CheckerItem,
	TransferDomDirective as TransferDom
} from "vux";
import $ from "jquery";
import common from "@/api/common";
import utils from "@/assets/js/utils";

var getMonthPay = function(amountSelected, timeSelected) {
	return new Promise((resolve, reject) => {
		var postData = new URLSearchParams();
		postData.append("firstRate", 0);
		postData.append("tranPrice", amountSelected);
		postData.append("loanProduct", timeSelected.loanProduct);
		common.loanAmtCalculateForNew(postData).then(res => {
			if (res.data.resultCode === "1") {
				var params = new URLSearchParams();
				var days = timeSelected.installments * 30;
				params.append("industryCode", "MDCP");
				params.append("amount", amountSelected);
				params.append("days", days);
				common.loanPay(params).then(res => {
					resolve(res.data);
				});
			}
		});
	});
};

export default {
	directives: {
		TransferDom
	},
	components: {
		Loading,
		XDialog,
		XButton,
		Popup,
		Group,
		Checker,
		CheckerItem
	},
	data() {
		return {
			show: true,
			amountSelectedIndex: 0,
			timeSelectedIndex: 1,
			amountSelected: 0,
			timeSelected: 0,
			level: "",
			totalNum: 0,
			discountList: [],
			amountList: [],
			programList: [],
			periodUnit: "",
			queryAmountSelected: 0,
			lowPay: "",
			ratePercentage: "",
			obj: {},
			industryCode: "",
			sign: ""
		};
	},
	ready() {},
	methods: {
		goBack() {
			console.log("this.industryCode=====", this.industryCode);
			if (this.industryCode === "DDCP" || this.sign === "1") {
				this.$router.push({ path: "/" });
			} else {
				switch (this.industryCode) {
					case "MDCP":
						this.$router.push({ path: "/miaoDai" });
						break;
					case 1:
						break;
					case 2:
						break;
				}
			}
		},
		selectLoanAmount(item) {
			this.amountSelected = item;
			getMonthPay(this.amountSelected, this.timeSelected).then(data => {
				if (data.resultCode === "1") {
					this.lowPay = data.lowPay;
					this.ratePercentage =
						data.lowRate + "%-" + data.highRate + "%";
				} else {
					this.errorMsg = res.data.resultMsg;
					this.$vux.toast.show({
						type: "cancel",
						position: "middle",
						text: this.errorMsg
					});
				}
			});
		},
		selectLoanTime(item) {
			if (item.loanProduct == 0) {
				this.$vux.toast.text(
					"对不起，该期额度已被抢光哦！请选择3个月借款期限！",
					"middle"
				);
				return;
			}
			this.timeSelected = item;
			getMonthPay(this.amountSelected, this.timeSelected).then(data => {
				if (data.resultCode === "1") {
					this.lowPay = data.lowPay;
					this.ratePercentage =
						data.lowRate + "%-" + data.highRate + "%";
				} else {
					this.errorMsg = res.data.resultMsg;
					this.$vux.toast.show({
						type: "cancel",
						position: "middle",
						text: this.errorMsg
					});
				}
			});
		},
		btnByStages() {
			var postData = new URLSearchParams();
			postData.append("uuid", "0c8297d7-6d3a-46da-b782-0df2434f88b1");
			postData.append("fastAmt", this.amountSelected);
			postData.append("fastPeriod", this.timeSelected.loanProduct);
			postData.append("userName", utils.getCookie("userName"));
			postData.append("stu_card_front", utils.getCookie("mediasource"));
			if (utils.getQueryString("appNO")) {
				postData.appFlowNo = utils.getQueryString("appNO");
			}
			//setTimeout(() => {
			this.$vux.loading.show({
				text: "加载中，请稍等……"
			});
			//},1000)

			var params = new URLSearchParams();
			params.append("industryCode", this.obj.industryCode);
			params.append("custType", utils.getCookie("custType"));
			params.append("mobile", utils.getCookie("mobile"));
			params.append("is_type", "N");
			params.append("uuid", utils.uuid());
			params.append("user_name", utils.getCookie("userName"));
			params.append("applyFrom", "H5");
			params.append("periods", this.timeSelected.installments);
			common.checkSupportApp(params).then(result => {
				if (result.data.resultCode == "1" && result.data.success) {
					common.fastLoanFirst(postData).then(res => {
						setTimeout(() => {
							this.$vux.loading.hide();
						}, 1000);
						if (res.data.resultCode == "1") {
							if (res.data.appFlowNo == "") {
								this.$vux.toast.show({
									type: "cancel",
									position: "middle",
									text: "临时订单创建失败"
								});
								return;
							}
							utils.setCookie(
								"industryCode",
								this.obj.industryCode
							);
							utils.setCookie("xykFrom", "0");
							utils.setCookie(
								"appFlowNo",
								utils.getCookie("userName") +
									":" +
									res.data.appFlowNo
							);
							utils.setCookie(
								"prodetailInfo",
								this.amountSelected +
									":" +
									this.timeSelected.loanProduct
							);
						} else if (res.data.resultCode == "60100") {
							setTimeout(function() {
								this.$router.push({ path: "/login" });
							}, 1500);
						} else if (result.data.resultCode == "1") {
							this.$vux.toast.show({
								type: "cancel",
								position: "middle",
								text: "您暂不支持该产品"
							});
						} else {
							this.$vux.toast.show({
								type: "cancel",
								position: "middle",
								text: result.data.resultMsg
							});
						}
					});
				} else if (result.resultCode == "1") {
					setTimeout(() => {
						this.$vux.loading.hide();
					}, 1000);
					this.$vux.toast.show({
						type: "cancel",
						position: "middle",
						text: "您暂不支持该产品"
					});
				} else {
					this.$vux.toast.show({
						type: "cancel",
						position: "middle",
						text: result.data.resultMsg
					});
				}
			});
		}
	},
	mounted: function() {
		var from = this.$route.params.from;
		var tranPrice = this.$route.params.tranPrice;
		var installments = this.$route.params.installments;
		var loanProduct = this.$route.params.loanProduct;
		var monthPay = this.$route.params.monthPay;
		var sign = this.$route.params.sign;
		var userName = utils.getCookie("userName");
		var industryCode = "";
		var custType = utils.getCookie("custType");

		switch (from) {
			case "LDDD":
				industryCode = "LDDD";
				break;
			case "MDCP":
				industryCode = "MDCP";
				break;
			case "DDCP":
				industryCode = "DDCP";
				break;
			case "JYFQ":
				industryCode = "JYFQ";
				break;
			case "DDSJ":
				industryCode = "DDSJ";
				break;
			case "GJJD":
				industryCode = "GJJD";
				break;
		}

		this.industryCode = industryCode;
		this.sign = sign;

		if (custType != "KHL1" && custType != "KHL2") {
			custType = "KHL2";
		}
		var obj = {
			industryCode: industryCode, //普通（白领+学生）
			custType: custType
		};
		console.log("obj===", obj);
		this.obj = obj;
		if (
			unescape(utils.getCookie("userName")) != "" ||
			unescape(utils.getCookie("userName")) != "undefined" ||
			unescape(utils.getCookie("userName")) != "null"
		) {
			var postData = new URLSearchParams();
			postData.append("uuid", "0c8297d7-6d3a-46da-b782-0df2434f88b1");
			postData.append("userName", unescape(utils.getCookie("userName")));
			postData.append("industryCode", obj.industryCode);
			common.getApplyCouponList(postData).then(res => {
				if (res.data.resultCode == "1") {
					if (
						res.data.discountList &&
						res.data.discountList.length > 0
					) {
						this.totalNum = res.data.discountList.length;
						this.discountList = res.data.discountList;
					}
				}
			});
			var params = new URLSearchParams();
			postData.append("uuid", "0c8297d7-6d3a-46da-b782-0df2434f88b1");
			postData.append("industryCode", obj.industryCode);
			postData.append("requestSource", "HTML5");
			postData.append("userName", userName);
			common.queryProductDetail(postData).then(res => {
				if (res.data.resultCode == "1") {
					var productinfoList = res.data.productinfoList[0];
					this.periodUnit = productinfoList.periodUnit;
					this.amountList = productinfoList.amountList;
					this.programList = productinfoList.programList;
					let tranPrice = this.$route.params.tranPrice;
					let loanProduct = this.$route.params.loanProduct;
					console.log("tranPrice====", this.$route);
					console.log("loanProduct====", loanProduct);
					if (tranPrice && loanProduct) {
						let currentAmountSelectedIndex = this.amountList.indexOf(
							tranPrice
						);
						this.amountSelectedIndex = currentAmountSelectedIndex;
						this.amountSelected = tranPrice;
						let loanProductList = _.pluck(
							this.programList,
							"loanProduct"
						);
						let currentTimeSelectedIndex = loanProductList.indexOf(
							loanProduct
						);
						this.timeSelectedIndex = currentTimeSelectedIndex;
						let currentTimeSelected = this.programList.filter(
							item => {
								return item.loanProduct === loanProduct;
							}
						);
						this.timeSelected = currentTimeSelected[0];
						getMonthPay(tranPrice, currentTimeSelected[0]).then(
							data => {
								if (data.resultCode === "1") {
									this.lowPay = data.lowPay;
									this.ratePercentage =
										data.lowRate +
										"%-" +
										data.highRate +
										"%";
								} else {
									this.errorMsg = res.data.resultMsg;
									this.$vux.toast.show({
										type: "cancel",
										position: "middle",
										text: this.errorMsg
									});
								}
							}
						);
					} else {
						this.amountSelected = this.amountList[0];
						this.timeSelected = this.programList[
							this.programList.length - 1
						];
						getMonthPay(
							this.amountSelected,
							this.timeSelected
						).then(data => {
							if (data.resultCode === "1") {
								this.lowPay = data.lowPay;
								this.ratePercentage =
									data.lowRate + "%-" + data.highRate + "%";
							} else {
								this.errorMsg = res.data.resultMsg;
								this.$vux.toast.show({
									type: "cancel",
									position: "middle",
									text: this.errorMsg
								});
							}
						});
					}
				}
			});
		}
	}
};
</script>
