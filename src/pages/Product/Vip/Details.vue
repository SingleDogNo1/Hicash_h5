<template>
	<div>
		<page-header
			:title="title"
			:showBack="showBack"
			:showBtnClose="showBtnClose"
		></page-header>
		<div class="content">
			<div class="box">
				<ul>
					<li>
						<p class="title">借款金额</p>
						<p class="num">{{ vipMoneyVal }}</p>
					</li>
					<li>
						<p class="title">借款期数</p>
						<p class="num">{{ installments }}</p>
					</li>
					<li>
						<p class="title">每期最低本息还款</p>
						<p class="num">￥{{ loanPayData.lowPay }}</p>
					</li>
				</ul>
			</div>

			<div class="scale">
				<h2>借款金额</h2>
				<scale
					@slideVal="slideVal"
					:isShowMoney="isShowMoney"
					:initialSlide="initialSlide"
				></scale>
				<h2>借款时间</h2>
				<div class="vip-pro-time">
					<ul>
						<li
							:class="{ active: currentIndex == index }"
							v-for="(item, index) in repayProgramData.perList"
							:index="index"
							@click="clickPerList(item, index)"
						>
							{{ item.installments }}{{ item.periods }}
						</li>
					</ul>
				</div>
			</div>

			<div class="des">
				<h3>借款费用说明</h3>
				<p>
					利率按实际的借款月数收取，每月收取借款金额的<span
					></span
					>,实际利率将根据您的资料最终审核确定，提供真实有效资料有助于提高您的审核通过率；
				</p>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import PageHeader from "@/components/PageHeader.vue"
import scale from "@/components/scale.vue"
export default {
	components: {
		PageHeader,
		scale
	},
	data() {
		return {
			title: this.$router.history.current.meta.title,
			showBack: true,
			showBtnClose: false,
			isShowMoney: false,
			initialSlide: this.$route.query.vipMoneyVal - 1,
			repayProgramData: {},
			currentIndex: this.$route.query.currentIndex,
			loanProduct: "",
			installments: "",
			vipMoneyVal: this.$route.query.vipMoneyVal * 100,
			loanPayData: {}
		}
	},
	mounted() {
		let custType = this.utils.getCookie("custType")
		if (custType != "KHL1" && custType != "KHL2") {
			custType = "KHL2"
		}
		let RepayProgramData = new URLSearchParams()
		RepayProgramData.append("userName", this.utils.getCookie("userName"))
		RepayProgramData.append("industryCode", "VIPD")
		RepayProgramData.append("merProId", "8665")
		RepayProgramData.append("custType", custType)
		RepayProgramData.append("supplierId", "2395")
		RepayProgramData.append("saleSiteId", "2072")
		this.RepayProgram(RepayProgramData) //	VIP 借贷方案
	},
	methods: {
		slideVal(num) {
			if (!num) num = 0
			this.vipMoneyVal = num * 100
			this.loanPay()
		},
		RepayProgram(params) {
			this.common.RepayProgram(params).then(res => {
				this.repayProgramData = res.data

				this.clickPerList(res.data.perList[this.currentIndex], this.currentIndex)
			})
		},
		clickPerList(item, index) {
			this.currentIndex = index
			this.loanProduct = item.loanProduct
			this.installments = item.installments

			this.loanPay()
		},
		loanPay() {
			let loanPayData = new URLSearchParams()
			loanPayData.append("amount", this.vipMoneyVal)
			loanPayData.append("industryCode", "VIPD")
			loanPayData.append("days", this.installments * 30)

			this.common.loanPay(loanPayData).then(res => {
				this.loanPayData = res.data
			})
		}
	}
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import "~bowerComponents/sass-rem/_rem.scss";
.VipDetails {
	height: calc(100vh - 50px) !important;
	background: #f1f1f1;
	padding-top: 50px;
	.content {
		.box {
			width: 70%;
			height: auto;
			margin: rem(20px) auto;
			box-shadow: 1px 6px 10px #dfdfdf;
			border-radius: rem(5px);
			overflow: hidden;
			ul {
				width: 100%;
				display: table;
				li {
					font-size: rem(13px);
					display: table-cell;
					.title {
						background: #ffb43b;
						height: rem(30px);
						line-height: rem(30px);
						text-align: center;
						color: #fff;
					}
					.num {
						background: #fff;
						height: rem(50px);
						line-height: rem(50px);
						text-align: center;
						color: #ff7a46;
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

		.scale {
			width: 100%;
			height: auto;
			background: #fff;
			.vip-pro-time {
				width: 80%;
				height: auto;
				margin: 0 auto;

				ul {
					li {
						float: left;
						color: #a4a4a4;
						font-size: rem(16px);
						padding: rem(3px 5px);
						border: 1px solid #ddd;
						border-radius: rem(5px);
						margin-right: rem(10px);
						margin-bottom: rem(10px);
						&.active {
							border: 2px solid #ffb43b;
							color: #fff;
							background: #ffb43b;
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
		}

		.des {
			width: 100%;
			height: auto;
			padding-top: rem(30px);
			padding-bottom: rem(100px);
			background: #fff;
			margin-top: rem(20px);
			p {
				width: 80%;
				margin: 0 auto;
				color: #7a7a7a;
				font-size: rem(14px);
				line-height: rem(25px);
			}
		}

		h2 {
			width: 80%;
			font-size: rem(16px);
			position: relative;
			font-weight: normal;
			padding: rem(16px 0);
			color: #3f3f3f;
			margin: 0 auto;
		}

		h3 {
			width: 80%;
			font-size: rem(18px);
			font-weight: 700;
			color: #333;
			margin: 0 auto;
			margin-bottom: rem(20px);
		}
	}
}
</style>
