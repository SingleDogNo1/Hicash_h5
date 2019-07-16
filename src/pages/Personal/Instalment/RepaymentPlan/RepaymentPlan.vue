<template>
	<div class="repayment-plan">
		<page-header
			:title="title"
			:showBack="showBack"
			:showBtnClose="showBtnClose"
			:jumpRouteName="jumpRouteName"
			:query="query"
			v-if="this.utils.getPlatform() != 'APP'"
		></page-header>
		<div
			class="content"
			:style="{
				'padding-top': this.utils.getPlatform() == 'APP' ? 0 : '2.26667rem'
			}"
		>
			<section class="detail-wrap">
				<p class="title">分期订单</p>
				<div class="detail-list">
					<ol>
						<li>期数</li>
						<li>还款时间</li>
						<li>应还金额</li>
						<li>状态</li>
					</ol>
					<ul v-for="(item, index) in detailList" :key="index">
						<li>{{ index + 1 }}期</li>
						<li>{{ item.repayDate }}</li>
						<li>¥{{ item.amount }}</li>
						<li>{{ item.filterRepayStatus }}</li>
					</ul>
				</div>
			</section>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";

.repayment-plan {
	width: 100%;
	height: 100%;
	.content {
		height: 100%;
		.detail-wrap {
			height: 100%;
			margin-top: rem(8px);
			background: #fff;
			padding: rem(16px);
			.title {
				font-size: 17px;
				color: #333333;
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
						width: 25%;
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
						width: 25%;
						height: 100%;
						line-height: rem(36px);
						float: left;
						color: #666;
						font-size: 13px;
						text-align: center;
					}
					li:last-child {
						color: #ff7640;
					}
				}
			}
		}
	}
}
</style>

<script>
import PageHeader from "@/components/PageHeader.vue"

export default {
	components: {
		PageHeader
	},
	data() {
		return {
			title: "还款计划",
			showBtnClose: false,
			showBack: true,
			detailList: [],
			jumpRouteName: "AllIndex",
			query: this.$route.query.from ? { from: this.$route.query.from } : {}
		}
	},
	mounted() {
		let userName = this.utils.getCookie("userName")
		let appNo = this.$route.query.appNo
		let type = this.$route.query.type
		let postData = new URLSearchParams()
		postData.append("userName", userName)
		postData.append("appNo", appNo)
		postData.append("type", type)
		this.common.repayPlan(postData).then(res => {
			let data = res.data
			if (data.resultCode === "1") {
				data.appDetail.forEach((val, index) => {
					let filterRepayStatus
					switch (val.repayStatus) {
						case "WTRP":
							filterRepayStatus = "待还"
							break
						case "REXP":
							filterRepayStatus = "逾期"
							break
						case "NMRF":
							filterRepayStatus = "正常还完"
							break
						case "EPRF":
							filterRepayStatus = "逾期还完"
							break
						default:
							break
					}
					val.filterRepayStatus = filterRepayStatus
				})
				this.detailList = data.appDetail
			} else {
				this.$vux.toast.show({
					type: "cancel",
					position: "middle",
					text: res.data.resultMsg
				})
			}
		})
	}
}
</script>
