<template>
	<div>
		<page-header
			:title="title"
			:showBack="showBack"
			:showBtnClose="showBtnClose"
			:jumpRouteName="jumpRouteName"
			@onDiologStatus="diologStatus"
		></page-header>
		<div class="tips">
			<x-icon type="ios-information" class="icon-color" size="18"></x-icon>
			<span>务必确保所填信息真实有效，以免影响后续借款</span>
		</div>
		<group>
			<x-input v-model="name" placeholder="真实姓名"></x-input>
			<x-input v-model="idCard" placeholder="身份证号码"></x-input>
		</group>
		<button class="btn">确认</button>

		<div>
			<x-dialog v-model="showDialog" class="dialog">
				<div class="img-box">
					<img src="./images/goout-pop.png" alt="">
					<div class="btns">
						<button @click="showDialog=false" class="confirm">继续完善资料</button>
						<button @click="cancel" class="cancel">狠心放弃</button>
					</div>
				</div>
				<div @click="showDialog=false">
				<span class="vux-close"></span>
				</div>
			</x-dialog>
		</div>
	</div>
</template>

<style lang="scss">
@import "~bowerComponents/sass-rem/_rem.scss";
.IdentityAuth {
	background: #f1f1f1;
	.tips{
		margin: 0 auto;
		margin-top: 2.2rem;
		padding: rem(4px 0);
		background: rgba(255,118,64,0.10);
		color: #FF7640;
		font-size: rem(13px);
		padding-left: 10%;
		.icon-color{
			fill: #FF7640;
			display:block;
			float: left;
		}
		span{
			display:block;
			float: left;
		}
		&:after{
			content: ' ';
			display: block;
			clear: both;
		}
	}
	.btn{
		width: 90%;
		height: rem(44px);
		font-size: rem(15px);
		display: block;
		margin: 0 auto;
		margin-top: rem(32px);
		background: #FF7640;
		border-radius: 5px;
		color: #fff;
		border: 0;
	}
	.dialog {
		.weui-dialog{
			background: transparent;
			border-radius: 8px;
			padding-bottom: 8px;
		}
		.dialog-title {
			line-height: 30px;
			color: #666;
		}
		.img-box {
			position: relative;
			img{
				width: 100%;
			}
			.btns{
				width: 100%;
				position: absolute;
				bottom: rem(15px);
				.confirm{
					width: 80%;
					height: rem(40px);
					border: 0;
					border-radius: 25px;
					background: #FFEF71;//FFDB3D
					color: #FE3F20;
					font-size: rem(15px);
					display: block;
					margin: 0 auto;
				}
				.cancel{
					background: transparent;
					border: 0;
					height: rem(40px);
					font-size: rem(13px);
					color: rgba(255, 255, 255, 0.8);
					display: block;
					margin: 0 auto;
				}
			}
		}
		.vux-close {
			margin-top: 8px;
			margin-bottom: 8px;
		}
	}
}
</style>

<script>
import PageHeader from "@/components/PageHeader.vue";
import { Group, XInput, XButton, XDialog, TransferDom } from 'vux'


export default {
	components: {
		PageHeader,
		Group,
		XInput,
		XButton,
		XDialog,
		TransferDom
	},
	data() {
		return {
			title: this.$route.meta.title,
			showBack: true,
			showBtnClose: false,
			jumpRouteName: 'popOutAuth',
			name: '',
			idCard: '',
			showDialog: false
		};
	},
	mounted: function() {
		
	},
	methods: {
		diologStatus: function(res) {
			this.showDialog = true
		},
		cancel: function () {
			console.info('cancel');
		}
	}
};
</script>
