<template>
	<div class="download-pop-wrap" v-if="showDownloadPop">
		<div class="close-btn" @click.stop="closeModule">
			×
		</div>
		<div class="logo">
			<img src="../assets/images/app_icon.png" alt="">
		</div>
		<div class="main">
			<div class="title">
				嗨钱 APP
			</div>
			<div class="des">
				年轻人的随身钱包
			</div>
		</div>
		<div class="download-btn" @click="downloadModule">
			立即下载
		</div>
	</div>
</template>

<style  lang="scss" rel="stylesheet/scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";
.download-pop-wrap{
	width: 100%;
	height: rem(50px);
	background:rgba(0,0,0,0.5);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999999;
	.close-btn{
		width: rem(33px);
		height: 100%;
		line-height: rem(50px);
		text-align: center;
		color: #fff;
		opacity:0.6981999999999999;
		float: left;
	}
	.logo{
		width: rem(36px);
		height: rem(36px);
		margin-top: rem(7px);
		float: left;
		border-radius: 5px;
		overflow: hidden;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.main{
		width: rem(100px);
		height: 100%;
		float: left;
		color: #fff;
		margin-left: rem(16px);
		margin-top: rem(7px);
		.title{
			height:rem(21px);
			line-height: rem(21px);
			font-size: rem(15px);
		}
		.des{
			height: rem(16px);
			line-height: rem(16px);
			font-size: rem(11px);
			font-weight: 400;
		}
	}
	.download-btn{
		width: rem(108px);
		height: rem(32px);
		line-height: rem(32px);
		margin-top: rem(9px);
		margin-right: rem(15px);
		background: #FF7640;
		border-radius: 5px;
		float: right;
		color: #fff;
		font-size:rem(14px);
		text-align: center;
	}
}
</style>


<script type="text/javascript">
import {  } from "vux";

export default {
	components: {
		
	},
	data() {
		return {
			showDownloadPop: true
		};
	},
	mounted: function() {
		
	},
	methods: {
		closeModule(){
			this.showDownloadPop = false;
			console.info('123123123');
		},
		downloadModule(){
			window.location.href = "https://m.hicash.cn/newweb/activity/downloadApp.html"
		}
	},
};
</script>
