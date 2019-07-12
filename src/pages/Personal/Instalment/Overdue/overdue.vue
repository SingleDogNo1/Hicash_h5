<template>
	<div v-cloak class="overdue" ref="checkerBody">
		<scroller
			v-if="overdueList.length > 0"
			lock-x
			:height="
				isShowBanner
					? swiperHeight - bannerADHeight  + 'px'
					: swiperHeight  + 'px'
			"
			@on-scroll="onScroll"
			@on-scroll-bottom="onScrollBottom"
			ref="scrollerBottom"
			:scroll-bottom-offst="200"
		>
			<div class="overdue-content">
				<group v-if="currentType === 'default'" class="default-group">
					<div v-for="(item, index) in overdueList"
						:key="index" class="overdue-order-wrap" ref="flexboxItem">
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
								@click="openAll(item, index)"
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
											<span class="value">{{totalAmount}}<i :class="changeHelpClass(index)" @click="showExpenseTip(item)"></i></span>
										</li>
									</ul>
									<div class="expense-description" :class="changeExpenseClass(index)" v-if="item.showExpenseTip">
										<i></i>
										<p>含<span v-for="(currentPeriodOrderItem, index) in  newCurrentPeriodOrder" :key="index">{{currentPeriodOrderItem.amountName}}{{currentPeriodOrderItem.amountFilter}}<span v-if="index !== newCurrentPeriodOrder.length - 1">+</span></span></p>
									</div>
								</div>
								<ul class="repey-plan-list">
									<li v-for="(repayPlanItem, index) in item.repayPlan" :key="index">
										<div class="each-repey-plan">
											<div class="each-repey-plan-left">
												<span class="title">{{repayPlanItem.period}}期{{repayPlanItem.date}}</span>
												<span class="value">{{repayPlanItem.eachPeriodAmountSum}}
													<i v-if="index !== 0" @click="showRepayExpenseTip(repayPlanItem)"></i>
												</span>
												<div class="expense-description" :class="changeExpenseClass(index)" v-if="repayPlanItem.showExpenseTip">
													<i></i>
													<p>含<span v-for="(currentPeriodOrderItem, index) in  newCurrentPeriodOrder" :key="index">{{currentPeriodOrderItem.amountName}}{{currentPeriodOrderItem.amountFilter}}<span v-if="index !== newCurrentPeriodOrder.length - 1">+</span></span></p>
												</div>
											</div>
											<p>{{repayPlanItem.title}}</p>
										</div>
									</li>
								</ul>
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
						transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
						margin-top: rem(24px);
						border-radius: rem(5px);
						// -webkit-backface-visibility: hidden;  
						// -moz-backface-visibility: hidden;  
						// -ms-backface-visibility: hidden; 
						// backface-visibility: hidden;  
						// -webkit-perspective: 1000;  
						// -moz-perspective: 1000;  
						// -ms-perspective: 1000;  
						// perspective: 1000;
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
										&:last-child {
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
									}
								}
								.expense-description {
									position: absolute;
									top: rem(120px);
									right: 0;
									background: #fff;
									padding: rem(8px);
									box-shadow:0px 4px 6px 0px rgba(0,0,0,0.1);
									border-radius: rem(5px);
									max-width: rem(305px);
									z-index: 500;
									i {
										position: absolute;
										width: 0;
										height: 0;
										display: block;
										border-left: rem(10px) solid transparent;
										border-right: rem(10px) solid transparent;
										border-bottom: rem(10px) solid #fff;
										top: rem(-10px);
										right: rem(14px);
									}
									p {
										font-size: rem(13px);
										line-height: rem(16px);
									}
									span {
										display: inline;
									}
								}
							}
							.repey-plan-list {
								font-size: rem(15px);
								li {
									position: relative;
									margin-top: rem(16px);
									display: flex;
									justify-content: space-between;
									color:#FF7640;
									&:nth-child(1) {
										color:#CCCCCC;
									}
									&:nth-child(2), &:nth-child(3) {
										padding-left: rem(4px);
									}
									&:last-child {
										margin-bottom: 0;
									}
									.each-repey-plan {
										width: 100%;
										display: flex;
										justify-content: space-between;
										.each-repey-plan-left {
											position: relative;
											width: 80%;
											display: flex;
    									justify-content: space-between;
											.value {
												width: rem(80px);
												display: flex;
												align-items: center;
												i {
													display: inline-block;
													width: rem(18px);
													height: rem(18px);
													background: url("../images/icon_help_overdue.png") center center no-repeat;
													background-size: cover;
													margin-left: rem(7px);
												}
											}
											.expense-description {
												position: absolute;
												top: rem(20px);
												right: 0;
												background: #fff;
												padding: rem(8px);
												box-shadow:0px 4px 6px 0px rgba(0,0,0,0.1);
												border-radius: rem(5px);
												max-width: 100%;
												z-index: 500;
												i {
													position: absolute;
													width: 0;
													height: 0;
													display: block;
													border-left: rem(10px) solid transparent;
													border-right: rem(10px) solid transparent;
													border-bottom: rem(10px) solid #fff;
													top: rem(-10px);
													right: rem(14px);
												}
												p {
													width: 100%;
													text-align: left;
													font-size: rem(13px);
													line-height: rem(16px);
												}
												span {
													display: inline;
												}
											}
										}
										p {
											width: 20%;
											text-align: right;
										}
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
	LoadMore
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
		LoadMore
	},
	data() {
		return {
			title: "嗨秒分期",
			desc: "订单号:21231231321",
			currentValue: [],
			scrollHeight: "-180px",
			pageSize: "8",
			pageNo: "1",
			overdueList: [],
			onFetching: false,
			listDataloading: true,
			showNoData: false,
			btnExpandText: "展开计划",
			applyAmount: "",
			period: "",
			totalAmount: "",
			newCurrentPeriodOrder: [],
			scrollTop: "0",
			currentIndex: 0,
			tipsWidth: ""
		};
	},
	methods: {
		change: function() {
			this.$emit("selectedItems", this.currentValue);
		},
		onScrollBottom() {
			if (this.onFetching) {
				// do nothing
				// console.info('onFetching');
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
				data.list = [{
					"amount": "239.00",
					"appNo": "31907080100003",
					"appStatus": null,
					"createDate": "2019-07-08",
					"industryCode": "VIPD",
					"industryName": "VIP分期",
					"loanProduct": null,
					"nodeList": null,
					"period": "3",
					"rejectMsg": null,
					"rejectUrl": null,
					"repayDate": "2019.06.01",
					"repayStatus": null
				},{
					"amount": "239.00",
					"appNo": "31907080100003",
					"appStatus": null,
					"createDate": "2019-07-08",
					"industryCode": "VIPD",
					"industryName": "VIP分期",
					"loanProduct": null,
					"nodeList": null,
					"period": "3",
					"rejectMsg": null,
					"rejectUrl": null,
					"repayDate": "2019.06.01",
					"repayStatus": null
				},
				{
					"amount": "239.00",
					"appNo": "31907080100003",
					"appStatus": null,
					"createDate": "2019-07-08",
					"industryCode": "VIPD",
					"industryName": "VIP分期",
					"loanProduct": null,
					"nodeList": null,
					"period": "3",
					"rejectMsg": null,
					"rejectUrl": null,
					"repayDate": "2019.06.01",
					"repayStatus": null
				}]
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
						val.currentIndex = index;
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
			this.init();
		},
		onScroll(pos) {
			console.info("top", pos.top);
			this.scrollTop = pos.top;
		},
		// ! 展开还款计划
		openAll(item, index) {
			this.banRechecked = false;
			this.overdueList.forEach( (val,index) => {
				if(index !== item.currentIndex) {
					val.showOtherOrder = false;
				}
			});
			this.overdueList[index].btnExpandText = this.overdueList[index].showOtherOrder ? "展开计划" : "收起计划";
			this.overdueList[index].showOtherOrder = !this.overdueList[index]
				.showOtherOrder;
			//this.tipsWidth = this.$ref.repeyTitle.width()
			if(this.overdueList[index].showOtherOrder) {
				// setTimeout(() => {
				// 	this.otherOrderHeight = this.$refs.otherOrder[
				// 		index
				// 	].offsetHeight;
				// 	this.$nextTick(() => {
				// 		this.$refs.scrollerBottom.reset();
				// 	});
				// }, 1000);
				// let _top = 0;
				// if (index > 0) {
				// 	_.each(this.$refs.flexboxItem, (item, i) => {
				// 		if (i >= index) return false;
				// 		_top = _top + this.$refs.flexboxItem[i].offsetHeight + 8;
				// 	});
				// }
				// this.$nextTick(() => {
				// 	this.$refs.scrollerBottom.reset({ top: _top });
				// });
				let vm = this;
				let userName = this.utils.getCookie("userName");
				let postData = new URLSearchParams();
				postData.append("userName", userName);
				postData.append("appNo", item.value);
				this.common.orderDetailInfo(postData).then(res => {
					let data = res.data;
					data = {
						"resultCode": "1",
						"applyAmount": "3000.00",
						"period": "3",
						"currentPeriod": "1",
						"resultMsg": null,
						"repayPlan": [
								{
										"status": "WTRP",
										"date": "2019.08.09",
										"amountList": {
												"principal": "162.00",
												"internetFee": "34.00",
												"bankFee": "28.00",
												"interest": "15.00",
												"allFee": "239.00"
										}
								},
								{
										"status": "WTRP",
										"date": "2019.09.09",
										"amountList": {
												"principal": "167.00",
												"internetFee": "34.00",
												"bankFee": "28.00",
												"interest": "10.00",
												"allFee": "239.00"
										}
								},
								{
										"status": "WTRP",
										"date": "2019.10.09",
										"amountList": {
												"principal": "171.00",
												"internetFee": "34.00",
												"bankFee": "28.00",
												"interest": "6.00",
												"allFee": "239.00"
										}
								}
						],
						"userName": "153222222"
					}
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
						const currentPeriodOrder = data.repayPlan[currentPeriod];
						const orderTypeKeys = [];
						for (const property in currentPeriodOrder.amountList){
							let item = {
								type: property,
								amount: parseFloat(currentPeriodOrder.amountList[property]),
								amountFilter: this.utils.toDecimal2(currentPeriodOrder.amountList[property])
							}
							orderTypeKeys.push(item);
						}
						let newCurrentPeriodOrder = _.map(orderTypeKeys, list => {
							return this.planMapping(list);
						});
						const totalAmountValue = _.pluck(newCurrentPeriodOrder, "amount");
						const totalAmount = _.reduce(totalAmountValue, function(memo, num){ return memo + num; }, 0);
						//保留2位小数，如：2，会在2后面补上00.即2.00
						this.totalAmount = this.utils.toDecimal2(totalAmount);
						this.newCurrentPeriodOrder = newCurrentPeriodOrder;
						let repayPlan = _.map(data.repayPlan, (list,key) => {
							list.period = key === 0 ? "首" : key + 1;
							const eachPeriodAmountSumArr = [];
							for (const i in list.amountList) {
								const item = {
									amount: parseFloat(list.amountList[i])
								}
								eachPeriodAmountSumArr.push(item)
							}
							const eachPeriodAmountSumValue = _.pluck(eachPeriodAmountSumArr, "amount");
							const eachPeriodAmountSum = _.reduce(eachPeriodAmountSumValue, function(memo, num){ return memo + num; }, 0);
							list.eachPeriodAmountSum = this.utils.toDecimal2(eachPeriodAmountSum);
							list.showExpenseTip = false;
							return this.statusMapping(list);
						});
						console.log()
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
				case "allFee": // * 总费用
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
			}
			return mapObj;
		},
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
			this.overdueList.forEach( (val,index) => {
				if(index !== item.currentIndex) {
					val.showExpenseTip = false;
				}
			});
			item.showExpenseTip = !item.showExpenseTip;
			this.currentIndex = item.currentIndex;
		},
		showRepayExpenseTip(item) {
			// this.overdueList.forEach( (val,index) => {
			// 	if(index !== item.currentIndex) {
			// 		val.showExpenseTip = false;
			// 	}
			// });
			item.showExpenseTip = !item.showExpenseTip;
			console.log("item.showExpenseTip===", item.showExpenseTip)
			//this.currentIndex = item.currentIndex;
		},
		changeHelpClass(index) {
			return `icon-help${index}`;
		},
		changeExpenseClass(index) {
			return `expense-description${index}`;
		}
	},
	mounted() {
		this.scrollHeight = this.isShowBanner
			? this.swiperHeight - this.bannerADHeight  + "px"
			: this.swiperHeight - + "px";

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
			const currentIndex = this.currentIndex;
			// 如果点击发生在当前组件内部，则不处理
			if (document.querySelector(`.icon-help${currentIndex}`) && document.querySelector(`.icon-help${currentIndex}`).contains(e.target) || document.querySelector(`.expense-description${currentIndex}`) && document.querySelector(`.expense-description${currentIndex}`).contains(e.target)) {
				return;
			}
			this.overdueList.forEach( val => {
				val.showExpenseTip = false;
			});
		};  
		document.body.addEventListener('click', this._close);
	},
	beforeDestroy() {
		document.body.removeEventListener('click', this._close);  
	}
};
</script>
