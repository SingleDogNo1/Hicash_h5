<template>
	<div>
		<page-header :title="title" :showBack="showBack" :showBtnClose="showBtnClose"></page-header>
		<div id="content" class="content">
			<div>
				<sticky
					scroll-box="content"
					ref="sticky"
					:offset="46"
					:check-sticky-support="false"
					:disabled="disabled">
					<div class="tab-wrap">
						<tab custom-bar-width="60px" active-color="#FF7640" bar-active-color="#FF7640" v-model="index">
							<tab-item selected :key="0" >逾期订单</tab-item>
							<tab-item :key="1" >正常订单</tab-item>
						</tab>
						<button class="btn-batch-repayment" v-if="currentType === 'default' && index === 0" @click="batchRepayment">批量还款</button>
						<button class="btn-cancel" v-if="currentType === 'batchRepayment' && index === 0" @click="cancel">取消</button>
					</div>
				</sticky>
			</div>
			<swiper v-model="index"  :show-dots="false" :class="{'selected-swiper': currentType === 'batchRepayment'}">
				<swiper-item :key="0">
					<instalment-overdue @selectedItems="getSelectedItems" :currentType="currentType" :isShowBanner="isShowBanner"></instalment-overdue>
				</swiper-item>
				<swiper-item :key="1">
					<instalment-normal></instalment-normal>
				</swiper-item>
			</swiper>
			<button class="btn-recharge" @click="btnRecharge" :disabled="isDisabled" v-if="currentType === 'batchRepayment' && index === 0" :class="{'hide-banner': !isShowBanner}">充值还款</button>
		</div>
		<div class="banner" v-if="isShowBanner">
			<a href="javascript:void(0);" class="btn-close" @click="hideBanner">×</a>
			<img src="../images/bg_banner.png"/>
		</div>
		<confirm-dialog :isShowDialog="isShowDialog" :dialogTitle="dialogTitle" :dialogDefaultTitle="dialogDefaultTitle" :appNoList="appNoList" :totalAmount="totalAmount" :popType="popType" @showDialog="showDialog"></confirm-dialog>
	</div>
</template>

<script type="text/javascript">
	import {Tab, TabItem, Swiper, SwiperItem, Sticky } from 'vux';
	import PageHeader from '@/components/PageHeader.vue';
	import ConfirmDialog from '@/components/Dialog.vue'
	import InstalmentNormal from '@/pages/Personal/Instalment/Normal/normal.vue';
	import InstalmentOverdue from '@/pages/Personal/Instalment/Overdue/Overdue.vue';
	
	export default {
		components: {
			Tab,
			TabItem,
			PageHeader,
			ConfirmDialog,
			Swiper,
			SwiperItem,
			Sticky,
			InstalmentNormal,
			InstalmentOverdue
		},
		data() {
			return {
				title: this.$router.history.current.meta.title,
				showBtnClose: false,
				showBack: true,
				index: 0,
				isDisabled: true,
				selectedItems: [],
				currentType: 'default',	// 分为默认和批量还款两种类型
				isShowDialog: false,
				dialogTitle: '充值确认',
				popType: 'rechargePop',
				dialogDefaultTitle: '您确认要对订单号为',
				appNoList: ['1232412441252515','1232412441252515','1232412441252515'],
				totalAmount: '的订单共计<span>1238.00</span>元进行还款吗？',
				showSpace: false,
      			disabled: typeof navigator !== 'undefined' && /iphone/i.test(navigator.userAgent) && /ucbrowser/i.test(navigator.userAgent),
                isShowBanner: true
			}
		},
		mounted() {
			
		},
		methods: {
			getSelectedItems: function(selectedItems) {
				this.selectedItems = selectedItems;
			},
			batchRepayment: function () {
				this.currentType = 'batchRepayment';
			},
			cancel: function () {
				this.currentType = 'default';
			},
			btnRecharge: function () {
				this.isShowDialog = true;
			},
			showDialog: function(showDialog) {
				this.isShowDialog = showDialog;
			},
			hideBanner: function () {
				this.isShowBanner = false;
			}
		},
		watch: {
			selectedItems: function (val, oldVal) {
				this.selectedItems = val;
				this.isDisabled = this.selectedItems.length > 0 ? false : true;
            },
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import "~bowerComponents/sass-rem/_rem.scss";

	.AllIndex {
		background: #f2f2f2;
		.content{
			height: calc(100vh - 2.26667rem);
			padding-top: rem(51px);
			//overflow-y: auto;
			.tab-wrap {
				position: relative;
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
				.btn-batch-repayment, .btn-cancel {
					position: absolute;
					top: 50%;
					right: rem(16px);
					width: rem(60px);
					height: rem(26px);
					line-height: rem(26px);
					background: #FF7640;
					border-radius: 5px;
					border: 0;
					font-size: 11px;
					color: #fff;
					text-align: center;
					-webkit-transform: translateY(-50%);
					-moz-transform: translateY(-50%);
					-ms-transform: translateY(-50%);
					-o-transform: translateY(-50%);
					transform: translateY(-50%);
				}
			}
			.vux-swiper{
				height: calc(100vh - 4.26667rem) !important;
				//overflow-y: auto;
			}
			.btn-recharge {
				position: absolute;
				left: 0;
				bottom: rem(70px);
				width: 100%;
				height: rem(49px);
				background: #FF7640;
				border: 0;
				font-size: 15px;
				color: #fff;
			}
			.btn-recharge:disabled {
				background-color: #ddd;
    			color: #fff;
			}
			.btn-recharge.hide-banner {
				bottom: 0;
			}
		}
		.banner {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: rem(70px);
			border: 0;
			font-size: 15px;
			color: #fff;
			.btn-close {
				position: absolute;
				display: block;
				font-size: 20px;
				top: 0; 
				right: rem(8px);
				color: #fff;
			}
			img {
				width: 100%;
			}
		}
	}
</style>
