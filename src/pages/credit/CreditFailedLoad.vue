<template>
	<div class="content" :class="{ contents: platform === 'APP' }">
		<page-header
			:title="title"
			:showBack="showBack"
			:showBtnClose="showBtnClose"
			:jumpRouteName="'Inquiry'"
			v-if="platform === 'H5'"
		></page-header>
		<div class="box">
			<div class="image"><img src="./images/failedLoad.png" alt /></div>
			<div class="txt">报告加载失败，请重试</div>
			<div class="btn" @click="retry()">重试</div>
		</div>
	</div>
</template>
<script>
import PageHeader from "@/components/PageHeader.vue"
export default {
	components: {
		PageHeader
	},
	data() {
		return {
			title: "征信报告",
			showBack: true,
			showBtnClose: false,
			platform: this.utils.getPlatform()
		}
	},
	methods: {
		retry() {
			this.$router.push({
				name: "CreditLoading"
			})
		}
	}
	//  :jumpRouteName="'ConsumptionTrend'" 返回页面
}
</script>
<style lang="scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";
.content {
	font-family: PingFangSC-Medium;
	padding-top: 2.2rem;
	width: 100%;
	height: auto;
	min-height: 100%;
	overflow-y: auto;
	background: rgb(241, 241, 241);
	.box {
		font-size: rem(15px);
		color: #999999;
		.image {
			width: rem(72px);
			height: rem(72px);
			margin: rem(127px) auto rem(25px);
			img {
				width: 100%;
			}
		}
		.txt {
			text-align: center;
			letter-spacing: rem(0.38px);
			text-align: center;
			line-height: rem(8px);
		}
		.btn {
			border: 1px solid #999999;
			border-radius: rem(6px);
			width: rem(125px);
			height: rem(35px);
			line-height: rem(35px);
			text-align: center;
			margin: rem(30px) auto;
		}
	}
}
.contents {
	padding-top: 0;
}
</style>
