<template>
	<div>
		<section class="detail-wrap">
			<div class="content-wrap">
				<div class="left-wrap">
					<label class="title">{{ industryName }}</label>
					<p class="order-num">订单号：{{ appNo }}</p>
				</div>
				<p class="right-wrap">{{ createDate }}</p>
			</div>

			<div class="detail-list">
				<ol>
					<li>逾期应还金额</li>
					<li>逾期应还时间</li>
					<li>状态</li>
				</ol>
				<ul>
					<li>{{ amount }}元</li>
					<li>{{ repayDate }}</li>
					<li>{{ repayStatus }}</li>
				</ul>
			</div>

			<div class="actions">
				<a
					href="javascript:void(0);"
					class="btn-expand-all"
					:class="showOtherOrder ? 'up' : 'down'"
					@click="expandAll"
					v-if="!showOtherOrder"
					><span>展开所有</span><i></i
				></a>
				<a href="javascript:void(0);" class="btn-recharge" @click="btnRecharge"
					>充值还款</a
				>
			</div>

			<div class="other-order" :class="showOtherOrder ? 'animate' : ''">
				<div
					class="each-other-order-wrap clearfix"
					v-for="(item, index) in appDetail"
					:key="index"
				>
					<div class="content-wrap clearfix">
						<div class="left-wrap">
							<label class="title">{{ item.title }}</label>
							<p class="amount">
								{{ item.amountName }}<span>¥{{ item.amount }}元</span>
							</p>
						</div>
						<p class="right-wrap">期数：{{ item.period }}期</p>
					</div>
					<div class="actions">
						<router-link
							class="btn-repayment-plan"
							:to="{
								path: '/personal/myInstalment/repaymentPlan',
								query: { appNo: appNo, type: item.type }
							}"
							><span>还款计划</span><i class="iconfont">&#58999;</i></router-link
						>
					</div>
				</div>
				<a
					href="javascript:void(0);"
					class="btn-takeup-all"
					:class="showOtherOrder ? 'up' : 'down'"
					@click="showOtherOrder = !showOtherOrder"
					><span>收起所有</span><i></i
				></a>
			</div>
		</section>
	</div>
</template>

<style lang="scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";

.detail-wrap {
	height: 100%;
	margin-top: rem(8px);
	background: #fff;
	padding: rem(16px);
	.content-wrap {
		width: 100%;
		height: rem(37px);
		.left-wrap {
			float: left;
			width: 70%;
			.title {
				display: block;
				font-size: 15px;
				margin-bottom: 2px;
			}
			.order-num {
				font-size: 11px;
				color: #999999;
			}
		}
		.right-wrap {
			float: right;
			width: 30%;
			margin-top: rem(10px);
			font-size: 13px;
			color: #999999;
			text-align: right;
		}
	}
	.detail-list {
		margin-top: rem(16px);
		ol {
			width: 100%;
			height: rem(36px);
			background: #f4f4f4;
			border-radius: 5px;
			list-style: none;
			li {
				width: 33%;
				height: 100%;
				line-height: rem(36px);
				float: left;
				font-size: 13px;
				color: #666666;
				text-align: center;
			}
		}
		ul {
			width: 100%;
			height: rem(36px);
			li {
				width: 33%;
				height: 100%;
				line-height: rem(36px);
				float: left;
				font-size: 15px;
				color: #ff7640;
				text-align: center;
			}
		}
	}
	.actions {
		width: 100%;
		height: rem(30px);
		margin-top: rem(8px);
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
				-webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(90deg);
				transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(90deg);
				position: relative;
				top: 50%;
				margin-top: 1px;
				margin-left: 6px;
			}
		}
		.btn-recharge {
			display: block;
			float: right;
			width: rem(106px);
			height: rem(30px);
			line-height: rem(32px);
			background: #ff7640;
			border-radius: 5px;
			font-size: 15px;
			color: #ffffff;
			text-align: center;
		}
	}
	.other-order {
		width: 100%;
		overflow: hidden;
		max-height: 0;
		transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
		.each-other-order-wrap {
			margin-top: rem(16px);
			width: 100%;
			height: 100%;
			padding-top: rem(16px);
			border-top: 1px solid #eee;
			.content-wrap {
				height: 100%;
				.left-wrap {
					float: left;
					width: 70%;
					.title {
						display: block;
						font-size: 11px;
						color: #999999;
						margin-bottom: 2px;
					}
					.amount {
						font-size: 15px;
						color: #333333;
						span {
							color: #ff7640;
						}
					}
				}
				.right-wrap {
					float: right;
					width: 30%;
					margin-top: rem(10px);
					font-size: 15px;
					color: #333333;
					text-align: right;
				}
			}
			.actions {
				width: 25%;
				margin: 0 auto;
				margin-top: 0.35556rem;
				.btn-repayment-plan {
					position: relative;
					display: block;
					float: left;
					border: 1px solid #ff7640;
					border-radius: 13px;
					font-size: 12px;
					color: #ff7640;
					padding: rem(4px) rem(8px) rem(3px) rem(10px);
					span {
						display: block;
						float: left;
						margin-right: rem(3px);
					}
					i {
						font-size: 12px;
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
				-webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(270deg);
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
</style>

<script>
export default {
	data() {
		return {
			showOtherOrder: false,
			appDetail: [],
			appNo: "",
			createDate: "",
			amount: "",
			repayDate: "",
			repayStatus: "逾期立即还款",
			industryName: ""
		}
	},
	methods: {
		expandAll: function() {
			this.showOtherOrder = !this.showOtherOrder
			const userName = this.utils.getCookie("userName")
			let appNo = this.$route.query.appNo
			this.appNo = appNo
			let postData = new URLSearchParams()
			postData.append("userName", userName)
			postData.append("appNo", appNo)
			this.common.orderDetailInfo(postData).then(res => {
				let data = res.data
				if (data.resultCode === "1") {
					data.appDetail.forEach((val, index) => {
						switch (val.type) {
							case "loanFee":
								val.title = "分期订单"
								val.amountName = "借款金额："
								break
							case "infoFee":
								val.title = "会员订单"
								val.amountName = "会员服务费金额："
								break
							case "mthFee":
								val.title = "消费综合订单"
								val.amountName = "消费综合订单："
								break
							case "addFee":
								val.title = "保费订单"
								val.amountName = "保费金额："
								break
							default:
								break
						}
					})
					this.appDetail = data.appDetail
				} else {
					this.$vux.toast.show({
						type: "cancel",
						position: "middle",
						text: res.data.resultMsg
					})
				}
			})
		},
		btnRecharge: function() {
			const userName = this.utils.getCookie("userName")
			window.location.href =
				this.config.MWEB_PATH +
				"newweb/personalCenter/rechargePay.html?appNo=" +
				this.appNo +
				"&userName=" +
				userName
		}
	},
	mounted() {
		let appNo = this.$route.query.appNo
		let createDate = this.$route.query.createDate
		let amount = this.$route.query.amount
		let repayDate = this.$route.query.repayDate
		let industryName = this.$route.query.industryName
		this.appNo = appNo
		this.createDate = createDate
		this.amount = amount
		this.repayDate = repayDate
		this.industryName = industryName
	}
}
</script>
