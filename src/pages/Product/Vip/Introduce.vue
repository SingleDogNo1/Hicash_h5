<template>
	<div>
		<page-header
			:title="title"
			:showBack="showBack"
			:showBtnClose="showBtnClose"
		></page-header>
		<div class="content">
			<img src="./images/banner.png" alt="">
		</div>
	</div>
</template>
<script type="text/javascript">
import PageHeader from "@/components/PageHeader.vue";
export default {
	components: {
		PageHeader
	},
	data() {
		return {
			title: this.$router.history.current.meta.title,
			showBack: true,
			showBtnClose: false,
		};
	},
	mounted() {
		
	},
	methods: {
		
	}
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "~bowerComponents/sass-rem/_rem.scss";
.VipIntroduce{
	height: calc(100vh - 50px) !important;
	background: #F1F1F1;
	padding-top: 50px;
	.content{
		width: 100%;
		height: auto;
		img{
			width: 100%;
		}
	}
}
</style>
