<template>
	<div v-cloak class="overdue">
		<scroller
			v-if="overdueList.length > 0"
			lock-x
			:height="
				isShowBanner
					? swiperHeight - bannerADHeight + 'px'
					: swiperHeight + 'px'
			"
			@on-scroll="onScroll"
			@on-scroll-bottom="onScrollBottom"
			ref="scrollerBottom"
			:scroll-bottom-offst="200"
			:bounce="false"
		>
			<div class="overdue-content">
				<group v-if="currentType === 'default'" class="default-group">
					<div v-for="(item, currentParentIndex) in overdueList"
						:key="currentParentIndex" class="overdue-order-wrap" ref="flexboxItem">
					<cell
						:title="item.industryName"
						:inline-desc="item.appNo"
						>
						<slot name="value" class="amont-wrap"
							><p class="amount">{{ item.amountStr }}元</p>
							<p class="tip">逾期总金额</p></slot
						>
						</cell>
						<div
							class="actions"
						>
							<a
								href="javascript:void(0);"
								class="btn-expand-all"
								:class="item.showOtherOrder ? 'up' : 'down'"
								@click="openAll(item, currentParentIndex)"
								><span>{{item.btnExpandText}}</span><i></i
							></a>
							<a
								:href="item.rechargeUrl"
								class="btn btn-recharge"
								>充值还款</a
							>
						</div>
						<div
							class="other-order"
							ref="otherOrder"
							:class="item.showOtherOrder ? 'animate' : ''"
						>	
							<div class="each-order-wrap">
								<div class="detail-list-wrap">
									<ul class="detail-list">
										<li>
											<span>借款金额(元)</span>
											<span>{{applyAmount}}</span>
										</li>
										<li>
											<span>借款期限</span>
											<span>{{period}}期</span>
										</li>
										<li>
											<span>每期还款</span>
											<span class="value">{{totalAmount}}<i :class="changeHelpClass(currentParentIndex)" @click="showExpenseTip(item)"></i></span>
										</li>
										<li class="expense-description" :class="item.showExpenseTip ? 'animate' : ''">
											<p>注：含<span v-for="(currentPeriodOrderItem, orderItemIndex) in  newCurrentPeriodOrder" :key="orderItemIndex">{{currentPeriodOrderItem.amountName}}{{currentPeriodOrderItem.amountFilter}}<span v-if="orderItemIndex !== newCurrentPeriodOrder.length - 1">+</span></span></p>
										</li>
									</ul>
								</div>
								<div class="repay-plan-wrap">
									<ul class="repay-plan-list">
										<li v-for="(repayPlanItem, repayPlanIndex) in item.repayPlan" :key="repayPlanIndex" :class="{highlight: repayPlanItem.status === 'WTRP' || repayPlanItem.status === 'REXP'}">
											<div class="each-repay-plan">
												<div class="each-repay-plan-left" ref="eachRepayPlan">
													<span class="title">{{repayPlanItem.period}}期{{repayPlanItem.date}}</span>
													<span class="value">
														<span>{{repayPlanItem.eachPeriodAmountSum}}</span>
														<i v-if="repayPlanItem.status === 'REXP' || repayPlanItem.status === 'WTRP'" @click="showRepayExpenseTip(currentParentIndex, repayPlanIndex, repayPlanItem)" :class="changeRepayPlanHelpClass(repayPlanIndex)" :ref="repayPlanHelpRef(currentParentIndex, repayPlanIndex)"></i>
													</span>
												</div>
												<p>{{repayPlanItem.title}}</p>
											</div>
											<p class="repay-plan-expense-description" :class="repayPlanItem.showRepayPlanExpenseTipPopover ? 'animate' : ''">
												注：含<span v-for="(dataItem, index) in repayPlanItem.filterAmountList" :key="index">{{dataItem.amountName}}{{dataItem.amountFilter}}<span v-if="index !== repayPlanItem.filterAmountList.length - 1">+</span></span>
											</p>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</group>
				<group
					v-if="currentType === 'batchRepayment'"
					class="repaymen-group"
				>
					<checker
						v-model="currentValue"
						type="checkbox"
						default-item-class="default-item"
						selected-item-class="item-selected"
						@on-change="change"
					>
						<checker-item
							:value="item"
							v-for="(item, index) in overdueList"
							:key="index"
						>
							<cell
								:is-link="false"
								:title="item.industryName"
								:inline-desc="item.appNo"
							>
								<i slot="icon"></i>
								<slot name="value"
									><p class="amount">
										{{ item.amountStr }}元
									</p>
									<p class="tip">逾期总金额</p></slot
								></cell
							>
						</checker-item>
					</checker>
				</group>
				<!--<button class="btn-recharge">充值还款</button>-->
				<!-- 数据加载中 -->
				<load-more v-if="listDataloading" tip="数据加载中"></load-more>
			</div>
		</scroller>
		<div class="bg-instalment-empty" v-if="showNoData">
			<p>这里暂时什么都没有</p>
		</div>
		<load-more
			v-if="listDataloading"
			tip=""
			:class="{ 'empty-loading': showNoData }"
		></load-more>
		<!-- <div class="repay-plan-expense-description" :style="{ top: repayPlanHelpTop, width: tipsWidth }" v-if="showRepayPlanExpenseTipPopover">
			<i></i>
			<p>含<span v-for="(dataItem, index) in  repayPlanExpenseTipPopoverData" :key="index">{{dataItem.amountName}}{{dataItem.amountFilter}}<span v-if="index !== repayPlanExpenseTipPopoverData.length - 1">+</span></span>
			</p>
		</div> -->
	</div>
</template>

<style lang="scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";
.overdue {
	width: 100%;
	height: 100%;
	.overdue-content {
		width: 100%;
		height: 100%;
		margin-top: rem(8px);
		.default-group {
			/deep/ .weui-cells {
				margin-top: 0;
				&:after, &:before {
					display: none;
				}
				.overdue-order-wrap {
					position: relative;
					padding: rem(16px);
					&:after {
						content: " ";
						position: absolute;
						left: 0;
						top: 0;
						right: 0;
						height: 1px;
						border-top: 1px solid #d9d9d9;
						color: #d9d9d9;
						-webkit-transform-origin: 0 0;
						transform-origin: 0 0;
						-webkit-transform: scaleY(.5);
						transform: scaleY(.5);
						left: rem(16px);
					}
					.weui-cell {
						padding: 0;
						.vux-cell-primary {
							/deep/ .vux-label {
								font-size: rem(15px);
							}
							/deep/ .vux-label-desc {
								font-size: rem(13px);
								color: #999999;
							}
						}
						.weui-cell__ft {
							padding-right: 0;
							.amount {
								font-size: rem(15px);
								color: #ff7640;
								margin-top: rem(2px);
								margin-bottom: rem(4px);
							}
							.tip {
								font-size: rem(13px);
								color: #999999;
							}
						}
						/deep/ .weui-cell__ft:after {
							display: none;
						}
					}
					.actions {
						width: 100%;
						height: rem(30px);
						margin-top: rem(16px);
						.btn {
							position: relative;
							display: block;
							float: right;
							width: rem(104px);
							height: rem(28px);
							line-height: rem(28px);
							border-radius: 5px;
							font-size: 15px;
							text-align: center;
							margin-left: rem(8px);
							border: 1px solid #ff7640;
							bottom: inherit;
						}
						.btn-expand-all {
							position: relative;
							display: block;
							float: left;
							text-align: left;
							border: 1px solid #ff7640;
							border-radius: 5px;
							font-size: 12px;
							color: #ff7640;
							padding: rem(6px) rem(10px);
							span {
								display: block;
								float: left;
							}
							i {
								content: " ";
								display: block;
								float: left;
								height: 8px;
								width: 8px;
								border-width: 1px 1px 0 0;
								border-color: #ff7640;
								border-style: solid;
								position: relative;
								top: 50%;
								margin-left: 6px;
							}
							&.up {
								i {
									-webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0)
										rotate(270deg);
									transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(270deg);
									margin-top: 6px;
								}
							}
							&.down {
								i {
									-webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0)
										rotate(90deg);
									transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(90deg);
									margin-top: 1px;
								}
							}
						}
						.btn-recharge,
						.btn-sign {
							background: #ff7640;
							color: #ffffff;
						}
						.btn-channel {
							background: #fff;
							color: #ff7640;
							border: 1px solid #ff7640;
						}
						.btn-go {
							background: #d0021b;
							color: #ffffff;
							border-color: #d0021b;
						}
						.btn-canceled {
							background: #fff;
							color: #ccc;
							border-color: #eee;
						}
					}

					.other-order {
						width: 100%;
						overflow: hidden;
						max-height: 0;
						transition: max-height .5s cubic-bezier(0, 1, 0, 1) -0.1s;
						margin-top: rem(24px);
						border-radius: rem(5px);
						.each-order-wrap {
							.detail-list-wrap {
								position: relative;
								.detail-list {
									background: #F4F4F4;
									padding: rem(16px);
									li {
										display: flex;
										justify-content: space-between;
										margin-bottom: rem(16px);
										font-size: rem(15px);
										&:nth-child(3), &:nth-child(4) {
											margin-bottom: 0;
										}
										.value {
											display: flex;
											align-items: center;
											i {
												display: inline-block;
												width: rem(18px);
												height: rem(18px);
												background: url("../images/icon_help.png") center center no-repeat;
												background-size: cover;
												margin-left: rem(7px);
											}
										}
										&.expense-description {
											width: 100%;
											overflow: hidden;
											max-height: 0;
											transition: max-height .5s cubic-bezier(0, 1, 0, 1) -0.1s;
											color: #999999;
											font-size: rem(13px);
											margin-top: rem(8px);
											p {
												width: 100%;
												span {
													display: inline;
												}
											}
										}
										&.animate {
											max-height: 9999px;
											transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
											transition-delay: 0s;
										}
									}
								}
								// .expense-description {
								// 	position: absolute;
								// 	top: rem(120px);
								// 	right: 0;
								// 	background: #f9f9f9;
								// 	padding: rem(8px);
								// 	box-shadow:0px 4px 6px 0px rgba(0,0,0,0.1);
								// 	border-radius: rem(5px);
								// 	max-width: rem(305px);
								// 	z-index: 500;
								// 	i {
								// 		position: absolute;
								// 		width: 0;
								// 		height: 0;
								// 		display: block;
								// 		border-left: rem(10px) solid transparent;
								// 		border-right: rem(10px) solid transparent;
								// 		border-bottom: rem(10px) solid #f9f9f9;
								// 		top: rem(-10px);
								// 		right: rem(14px);
								// 	}
								// 	p {
								// 		font-size: rem(13px);
								// 		line-height: rem(16px);
								// 	}
								// 	span {
								// 		display: inline;
								// 	}
								// }
							}
							.repay-plan-list {
								font-size: rem(15px);
								margin-bottom: rem(24px);
								li {
									position: relative;
									margin-top: rem(16px);
									color:#CCCCCC;
									// &:nth-child(1) {
									// 	padding-left: rem(3px);
									// }
									&.highlight {
										color:#FF7640;		
									}
									&:last-child {
										margin-bottom: 0;
									}
									.each-repay-plan {
										width: 100%;
										display: flex;
										justify-content: space-between;
										.each-repay-plan-left {
											position: relative;
											width: 78%;
											display: flex;
											justify-content: space-between;
											.value {
												width: rem(80px);
												display: flex;
												align-items: center;
												justify-content: space-between;
												i {
													display: inline-block;
													width: rem(18px);
													height: rem(18px);
													background: url("../images/icon_help_overdue.png") center center no-repeat;
													background-size: cover;
													margin-left: rem(7px);
												}
											}
										}
										p {
											width: rem(70px);
											text-align: right;
										}
									}
									.repay-plan-expense-description {
										width: 100%;
										overflow: hidden;
										max-height: 0;
										transition: max-height .5s cubic-bezier(0, 1, 0, 1) -0.1s;
										color: #999999;
										font-size: rem(13px);
										margin-top: rem(8px)
									}
									.animate {
										max-height: 9999px;
										transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
										transition-delay: 0s;
									}
								}
							}
						}
						.btn-takeup-all {
							position: relative;
							display: block;
							float: left;
							text-align: left;
							border: 1px solid #ff7640;
							border-radius: 5px;
							font-size: 12px;
							color: #ff7640;
							padding: rem(6px) rem(10px);
							margin-top: rem(20px);
							span {
								display: block;
								float: left;
							}
							i {
								content: " ";
								display: block;
								float: left;
								height: 8px;
								width: 8px;
								border-width: 1px 1px 0 0;
								border-color: #ff7640;
								border-style: solid;
								-webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0)
									rotate(270deg);
								transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(270deg);
								position: relative;
								top: 50%;
								margin-top: 6px;
								margin-left: 6px;
							}
						}
					}
					.animate {
						max-height: 9999px;
						transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
						transition-delay: 0s;
					}
				}
				.overdue-order-wrap:first-child {
					&:after {
						display: none;
					}
				}
			}
		}
		.repaymen-group {
			/deep/ .weui-cells {
				margin-top: 0;
				margin-bottom: rem(50px);
				.vux-checker-box {
					.vux-checker-item {
						position: relative;
						width: 100%;
						i {
							margin-right: 13px;
							display: inline-block;
							vertical-align: middle;
							font: normal normal normal 14px/1 "weui";
							font-size: inherit;
							text-rendering: auto;
							-webkit-font-smoothing: antialiased;
						}
						i:before {
							content: "\EA01";
							color: #c9c9c9;
							font-size: 23px;
							display: block;
						}
						.weui-cell {
							padding: 10px rem(16px);
							.vux-cell-primary {
								/deep/ .vux-label {
									font-size: 15px;
								}
								/deep/ .vux-label-desc {
									font-size: 13px;
									color: #999999;
								}
							}
							.weui-cell__ft {
								padding-right: rem(2px);
								.amount {
									font-size: 15px;
									color: #ff7640;
									margin-top: rem(2px);
									margin-bottom: rem(4px);
								}
								.tip {
									font-size: 13px;
									color: #999999;
								}
							}
							/deep/ .weui-cell__ft:after {
								display: none;
							}
						}
					}
					.vux-checker-item:before {
						content: " ";
						position: absolute;
						left: 15px;
						top: 0;
						right: 0;
						height: 1px;
						border-top: 1px solid #d9d9d9;
						color: #d9d9d9;
						-webkit-transform-origin: 0 0;
						transform-origin: 0 0;
						-webkit-transform: scaleY(0.5);
						transform: scaleY(0.5);
					}
					.vux-checker-item:last-child {
						//margin-bottom: rem(20px);
					}
					.item-selected {
						background: rgba(255, 118, 64, 0.1);
						i:before {
							content: "\EA06";
							color: #ff7640;
						}
					}
				}
			}
		}
	}
	.bg-instalment-empty {
		width: 50%;
		height: rem(100px);
		margin: 0 auto;
		padding-top: 40%;
		background: url("../images/bg_instalment_empty.png") center rem(150px)
			no-repeat;
		background-size: rem(61px) rem(40px);
		p {
			text-align: center;
			color: #999;
			height: rem(100px);
			line-height: rem(100px);
			font-size: 12px;
			margin-top: rem(10px);
		}
	}
	.empty-loading {
		margin-top: rem(-30px);
	}
	// .repay-plan-expense-description {
	// 	position: absolute;
	// 	width: auto;
	// 	top: 0;
	// 	left:rem(16px);
	// 	background: #f9f9f9;
	// 	padding: rem(8px);
	// 	box-shadow:0px 4px 6px 0px rgba(0,0,0,0.1);
	// 	border-radius: rem(5px);
	// 	z-index: 500;
	// 	i {
	// 		position: absolute;
	// 		width: 0;
	// 		height: 0;
	// 		display: block;
	// 		border-left: rem(10px) solid transparent;
	// 		border-right: rem(10px) solid transparent;
	// 		border-top: rem(10px) solid #f9f9f9;
	// 		bottom: rem(-10px);
	// 		right: rem(8px);
	// 	}
	// 	p {
	// 		width: 100%;
	// 		text-align: left;
	// 		font-size: rem(13px);
	// 		line-height: rem(16px);
	// 	}
	// 	span {
	// 		display: inline;
	// 	}
	// }
}
</style>

<script>
import PageFooter from "@/components/PageFooter.vue";
import {
	Cell,
	Group,
	Checker,
	CheckerItem,
	CheckIcon,
	Scroller,
	LoadMore,
	Flexbox,
  FlexboxItem
} from "vux";

export default {
	props: {
		value: {
			type: String,
			default: ""
		},
		currentType: {
			type: String,
			default: ""
		},
		isShowBanner: {
			type: Boolean,
			default: true
		},
		bannerADHeight: {
			type: Number,
			default: 50
		},
		swiperHeight: {
			type: Number,
			default: 50
		}
	},
	components: {
		PageFooter,
		Cell,
		Group,
		Checker,
		CheckerItem,
		CheckIcon,
		Scroller,
		LoadMore,
		Flexbox,
  	FlexboxItem
	},
	data() {
		return {
			title: "",
			desc: "",
			currentValue: [],
			scrollHeight: "-180px",
			pageSize: "8",
			pageNo: "1",
			overdueList: [],
			onFetching: false,
			listDataloading: true,
			showNoData: false,
			btnExpandText: "展开计划",
			applyAmount: "",	// 借款金额
			period: "", 	// 借款期限
			totalAmount: "",	// 每月还款总额
			newCurrentPeriodOrder: [],	// 当前期数订单所含费用数组
			scrollTop: "0",
			currentParentIndex: 0, // 当前单子的下标(相当于父下标, 下面的还款计划列表相当于子下标)
			currentChildIndex: 0, // 当前子下标(还款计划列表的下标)
			tipsWidth: "",	// 点击问号显示的提示框宽度 
			repayPlanHelpTop: "",	// 还款计划的问号按钮距页面的高度
			showRepayPlanExpenseTipPopover: false,	// 是否显示还款计划费用说明的提示框
			repayPlanExpenseTipPopoverData: [],	//  提示框显示的数据
			toogleClick:  false
		};
	},
	methods: {
		change: function() {
			this.$emit("selectedItems", this.currentValue);
		},
		onScrollBottom() {
			if (this.onFetching) {
			} else {
				this.onFetching = true;
				this.init();
			}
		},
		init: function() {
			let userName = this.utils.getCookie("userName");
			let postData = new URLSearchParams();
			postData.append("userName", userName);
			postData.append("type", "overdue");
			postData.append("pageSize", this.pageSize);
			postData.append("pageNo", this.pageNo);
			this.common.accountOrderList(postData).then(res => {
				let data = res.data;
				if (data.resultCode === "1") {
					data.list.forEach((val, index) => {
						val.key = index + 1;
						val.value = val.appNo;
						val.amountStr = val.amount;
						val.amount = Number(val.amount);
						val.appNo = "订单号：" + val.appNo;
						val.showOtherOrder = false;
						// 展开计划、收起计划青按钮文字
						val.btnExpandText = "展开计划";
						// 是否显示每期还款包含费用的提示
						val.showExpenseTip = false;
						val.currentParentIndex = index;
						val.rechargeUrl =
							this.config.MWEB_PATH +
							"newweb/personalCenter/rechargePay.html?appNo=" +
							val.value +
							"&userName=" +
							userName;
						this.overdueList.push(val);
					});
					this.listDataloading = false;
					this.$nextTick(() => {
						this.$refs.scrollerBottom.reset();
					});
					this.onFetching = false;
					if (this.overdueList.length === 0) {
						this.showNoData = true;
					}
				} else if (data.resultCode == "-1") {
					if (this.overdueList.length === 0) {
						this.showNoData = true;
					}
					this.listDataloading = false;
				} else {
					this.$vux.toast.show({
						type: "cancel",
						position: "middle",
						text: res.data.resultMsg
					});
				}
				this.pageNo++;
			});
		},
		parentHandleclick: function() {
			this.pageNo = "1";
			this.overdueList = [];
			this.listDataloading = true;
			this.onFetching = false;
			//this.init();
		},
		onScroll(pos) {
			this.scrollTop = pos.top;
		},
		// ! 展开还款计划
		openAll(item, index) {
			this.banRechecked = false;
			this.currentParentIndex = index;
			this.overdueList.forEach( (val,index) => {
				if(index !== item.currentParentIndex) {
					val.showOtherOrder = false;
					val.btnExpandText = "展开计划";
				}
				if(val.repayPlan) {
					val.repayPlan.forEach( (value,index) => {
						value.showRepayPlanExpenseTipPopover = false;
					});
				}
				val.showExpenseTip = false;
			});
			this.overdueList[index].btnExpandText = this.overdueList[index].showOtherOrder ? "展开计划" : "收起计划";
			this.overdueList[index].showOtherOrder = !this.overdueList[index]
				.showOtherOrder;
			if(this.overdueList[index].showOtherOrder) {
				setTimeout(() => {
					this.otherOrderHeight = this.$refs.otherOrder[
						index
					].offsetHeight;
					this.$nextTick(() => {
						this.$refs.scrollerBottom.reset();
					});
				}, 1000);
				let vm = this;
				let userName = this.utils.getCookie("userName");
				let postData = new URLSearchParams();
				postData.append("userName", userName);
				postData.append("appNo", item.value);
				this.common.orderDetailInfo(postData).then(res => {
					let data = res.data;
					if (data.resultCode == "1") {
						this.otherOrderHeight = this.$refs.otherOrder[
							index
						].offsetHeight;
						this.$nextTick(() => {
							this.$refs.scrollerBottom.reset();
						});
						const currentPeriod = parseInt(data.currentPeriod) - 1;
						this.applyAmount = data.applyAmount;
						this.period = data.period;
						//const currentPeriodOrder = data.repayPlan[currentPeriod];
						const currentPeriodOrder = data.repayPlan[0];
						const orderTypeKeys = [];
						//当期订单还款金额列表(key未进行映射)
						for (const property in currentPeriodOrder.amountList){
							if(currentPeriodOrder.amountList[property] !== "0.00" && property != "totalFee" && property != "penalty" ) {
								let item = {
									type: property,
									amount: parseFloat(currentPeriodOrder.amountList[property]),
									amountFilter: this.utils.toDecimal2(currentPeriodOrder.amountList[property])
								}
								orderTypeKeys.push(item);
							}
						}
						//将当期订单还款金额列表进行映射
						let newCurrentPeriodOrder = _.map(orderTypeKeys, list => {
							return this.planMapping(list);
						});
						const totalAmountValue = _.pluck(newCurrentPeriodOrder, "amount");
						// 计算所含费用总金额
						const totalAmount = _.reduce(totalAmountValue, function(memo, num){ return memo + num; }, 0);
						//保留2位小数，如：2，会在2后面补上00.即2.00
						//this.totalAmount = this.utils.toDecimal2(totalAmount);
						this.totalAmount = currentPeriodOrder.amountList.totalFee;
						this.newCurrentPeriodOrder = newCurrentPeriodOrder;
						let repayPlan = _.map(data.repayPlan, (list,key) => {
							//list.period = key === 0 ? "首" : key + 1;
							list.period = key + 1;
							const eachPeriodAmountSumArr = [];
							for (const i in list.amountList) {
								if(list.amountList[i] !== "0.00" && i != "totalFee") {
									const item = {
										amount: parseFloat(list.amountList[i])
									}
									eachPeriodAmountSumArr.push(item)
								}
							}
							const eachPeriodAmountSumValue = _.pluck(eachPeriodAmountSumArr, "amount");
							const eachPeriodAmountSum = _.reduce(eachPeriodAmountSumValue, function(memo, num){ return memo + num; }, 0);
							list.eachPeriodAmountSum = this.utils.toDecimal2(eachPeriodAmountSum);
							list.showExpenseTip = false;
							list.showRepayPlanExpenseTipPopover = false;
							list.currentChildIndex = key;
							const amountListKeys = [];
							for (const property in list.amountList){
								if(list[property] !== "0.00" && property != "totalFee") {
									console.log(111)
									let item = {
										type: property,
										amount: parseFloat(list.amountList[property]),
										amountFilter: this.utils.toDecimal2(list.amountList[property])
									}
									amountListKeys.push(item);
								}
							}
							const filterAmountList = _.map(amountListKeys, amountListItem => {
								return this.planMapping(amountListItem);
							});
							list.filterAmountList = filterAmountList;
							return this.statusMapping(list);
						});
						this.$set(this.overdueList[index], "repayPlan", repayPlan);
					} else {
						this.$vux.toast.text(data.resultMsg, "middle");
					}
				});
			}
		},
		// ! 根据订单类型映射 title 和 amountName
		planMapping: function(mapObj) {
			switch (mapObj.type) {
				case "loanFee": // * 订单费用
					mapObj.amountName = "订单费用";
					break;
				case "mthFee": // * 会员费
					mapObj.amountName = "会员费";
					break;
				case "infoFee": // * 综合消费
					mapObj.amountName = "综合消费";
					break;
				case "addFee": // * 保费
					mapObj.amountName = "保费";
					break;
				case "totalFee": // * 总费用【不含罚息滞纳金】）
					mapObj.amountName = "总费用";
					break;
				case "principal": // * 本金
					mapObj.amountName = "本金";
					break;
				case "interest": // * 利息
					mapObj.amountName = "利息";
					break;
				case "bankFee": // * 金融信息服务费
					mapObj.amountName = "金融信息服务费";
					break;
				case "internetFee": // * 互联网信息服务费
					mapObj.amountName = "互联网信息服务费";
					break;
				case "penalty": // * 罚息滞纳金
					mapObj.amountName = "罚息滞纳金";
					break;
			}
			return mapObj;
		},
		// ! 映射订单还款状态
		statusMapping(mapObj) {
			switch (mapObj.status) {
				case "WTRP": // * 待还
					mapObj.title = "待还";
					break;
				case "REXP": // * 逾期
					mapObj.title = "逾期";
					break;
				case "NMRF": // * 正常还完
					mapObj.title = "正常还完";
					break;
				case "EPRF": // * 逾期还完
					mapObj.title = "逾期还完";
					break;
			}
			return mapObj;
		},
		showExpenseTip(item) {
			item.showExpenseTip = !item.showExpenseTip;
			this.currentParentIndex = item.currentParentIndex;
		},
		showRepayExpenseTip(currentParentIndex, currentChildIndex, item) {

			this.overdueList[currentParentIndex].repayPlan.forEach( (val,index) => {
				if(index !== item.currentChildIndex) {
					val.showRepayPlanExpenseTipPopover = false;
				}
			});

			setTimeout(() => {			
				this.$nextTick(() => {
					this.$refs.scrollerBottom.reset();
				});
			}, 500);

			this.overdueList[currentParentIndex].repayPlan[currentChildIndex].showRepayPlanExpenseTipPopover = !this.overdueList[currentParentIndex].repayPlan[currentChildIndex].showRepayPlanExpenseTipPopover;

			// this.currentChildIndex = item.currentChildIndex;
			// this.repayPlanExpenseTipPopoverData = item.filterAmountList;
			// this.showRepayPlanExpenseTipPopover = true;
			// const repayPlanHelpRef = `repayPlanHelp${this.currentParentIndex}_${this.currentChildIndex}`;
			// //this.repayPlanHelpTop = this.$refs[repayPlanHelpRef][0].getBoundingClientRect().top - 94 + 28 +'px';
			// this.repayPlanHelpTop = this.$refs[repayPlanHelpRef][0].getBoundingClientRect().top - 162 + 2 * this.currentChildIndex + 1 +'px';

			// this.tipsWidth = this.$refs.eachRepayPlan[item.currentChildIndex].getBoundingClientRect().width -6 + "px";
		},
		changeHelpClass(index) {	// 当期订单问号加上下标
			return `icon-help${index}`;
		},
		changeExpenseClass(index) {	// 当期订单问号点击出现的所含金额提示框加上下标
			return `expense-description${index}`;
		},
		changeRepayPlanHelpClass(index) {	// 当期订单问号点击出现的所含金额提示框加上下标
			return `icon-help-repay-plan${this.currentParentIndex}_${index}`;
		},
		repayPlanHelpRef(currentParentIndex, currentChildIndex) {	// 还款计划问号添加下标
			return `repayPlanHelp${currentParentIndex}_${currentChildIndex}`;
		}
	},
	mounted() {
		this.scrollHeight = this.isShowBanner
			? this.swiperHeight - this.bannerADHeight + "px"
			: this.swiperHeight + "px";

		this.init();
	},
	watch: {
		isShowBanner: function(val, oldVal) {
			this.isShowBanner = val;
			this.$nextTick(() => {
				const top = this.scrollTop - 70 <= 0 ? 0 : this.scrollTop - 70;
				this.$refs.scrollerBottom.reset({ top: top });
			});
		}
	},
	beforeMount() {
		this._close = e => {
			const currentParentIndex = this.currentParentIndex;
			const currentChildIndex = this.currentChildIndex;

			// 如果点击发生在当前组件内部，则不处理
			if (document.querySelector(`.icon-help${currentParentIndex}`) && 
					!document.querySelector(`.icon-help${currentParentIndex}`).contains(e.target) && 
					document.querySelector(`.expense-description${currentParentIndex}`) 
					&& !document.querySelector(`.expense-description${currentParentIndex}`).contains(e.target)){
				this.overdueList.forEach( val => {
					val.showExpenseTip = false;
				});
			}
			const repayPlanHelpRef = `repayPlanHelp${currentParentIndex}_${this.currentChildIndex}`;
			if(this.$refs[repayPlanHelpRef] &&
				!this.$refs[repayPlanHelpRef][0].contains(e.target) &&
				document.querySelector('.repay-plan-expense-description') && 
				!document.querySelector('.repay-plan-expense-description').contains(e.target)) {
				this.showRepayPlanExpenseTipPopover = false;
			}
		};  
		document.body.addEventListener('click', this._close);
		document.body.addEventListener('touchmove', this._close);
	},
	beforeDestroy() {
		document.body.removeEventListener('click', this._close);  
		document.body.removeEventListener('touchmove', this._close);  
	}
};
</script>
