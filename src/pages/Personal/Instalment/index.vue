<template>
	<div>
		<page-header :title="title" :showBack="showBack" :showBtnClose="showBtnClose"></page-header>
		<div class="content">
			<tab custom-bar-width="60px" active-color="#FF7640" bar-active-color="#FF7640" v-model="index">
				<tab-item selected :key="0" >逾期订单</tab-item>
				<tab-item :key="1" >正常订单</tab-item>
			</tab>
			<swiper v-model="index"  :show-dots="false">
				<swiper-item :key="0">
					<instalment-normal></instalment-normal>
				</swiper-item>
				<swiper-item :key="1">
					<instalment-overdue></instalment-overdue>
				</swiper-item>
			</swiper>
		</div>
		
	</div>
</template>
<script type="text/javascript">
	import {Tab, TabItem, Swiper, SwiperItem} from 'vux';
	import PageHeader from '@/components/PageHeader.vue';
	import InstalmentNormal from '@/pages/Personal/Instalment/Normal/normal.vue';
	import InstalmentOverdue from '@/pages/Personal/Instalment/Overdue/overdue.vue';
	export default {
		components: {
			Tab,
			TabItem,
			PageHeader,
			Swiper,
			SwiperItem,
			InstalmentNormal,
			InstalmentOverdue
		},
		data() {
			return {
				title: this.$router.history.current.meta.title,
				showBtnClose: false,
				showBack: true,
				index: 0
			}
		},
		mounted() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import "~bowerComponents/sass-rem/_rem.scss";

	.MyInstalment{
		background: #f2f2f2;
		.content{
			height: calc(100vh - 2.26667rem);
			padding-top: rem(51px);
			.vux-tab-wrap{
				background: #fff;
				border-bottom: 1px solid #f2f2f2;
			}
			.vux-tab-container{
				width: 50%;
			}
			.vux-tab .vux-tab-item{
				background: 0;
			}
			.vux-swiper{
				height: calc(100vh - 4.26667rem) !important;
			}
		}
	}
</style>
