<template>
	<div class="pandoraWrap">
		<x-header
			:left-options="{
				backText: '',
				showBack: true,
				preventGoBack: preventGoBack
			}"
			@on-click-back="jump"
			>{{ title }}<a class="btn-close" @click="jump" slot="right"></a
		></x-header>
		<iframe
			:src="dpandoraUrl"
			id="dpandoraUrl"
			style="width: 100%;height: 100%;"
			frameborder="0"
			:onload="changeUrl(this)"
		></iframe>
		<div>
			<x-dialog v-model="showDialog" class="dialog">
				<div class="img-box">
					<img src="./images/goout-pop.png" alt="" />
					<div class="btns">
						<button @click="showDialog = false" class="confirm">继续完善资料</button>
						<button @click="cancel" class="cancel">狠心放弃</button>
					</div>
				</div>
				<div @click="showDialog = false"></div>
			</x-dialog>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";
.pandoraWrap {
	height: 100%;
	overflow: hidden;
}
#dpandoraUrl {
	margin-top: 56px;
}
.vux-header {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	background-color: #fff;
	z-index: 100;
	/deep/ .vux-header-left {
		/deep/ .left-arrow:before {
			border-left: 1px solid #333;
			border-top: 1px solid #333;
		}
	}
	/deep/ .vux-header-title {
		height: 1.955556rem /* 44/22.5 */;
		line-height: 1.955556rem /* 44/22.5 */;
		color: #333;
	}
	/deep/ .vux-header-right {
		right: 0.444444rem /* 10/22.5 */;
	}
	.btn-close:before {
		font-family: "iconfont";
		position: absolute;
		content: "\e6a0";
		top: 0.444444rem /* 10/22.5 */;
		right: 0;
		font-size: 0.85rem;
		color: #3f3f3f;
		-webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		-o-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}
}
.dialog {
	/deep/ .weui-dialog {
		background: transparent;
		border-radius: 8px;
		padding-bottom: 8px;
	}
	/deep/ .dialog-title {
		line-height: 30px;
		color: #666;
	}
	/deep/ .img-box {
		position: relative;
		img {
			width: 100%;
		}
		.btns {
			width: 100%;
			position: absolute;
			bottom: rem(15px);
			.confirm {
				width: 80%;
				height: rem(40px);
				border: 0;
				border-radius: 25px;
				background: linear-gradient(#ffef71, #ffdb3d);
				color: #fe3f20;
				font-size: rem(15px);
				display: block;
				margin: 0 auto;
			}
			.cancel {
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
</style>

<script>
import PageHeader from "@/components/PageHeader.vue"
import { XHeader, XDialog } from "vux"

export default {
	components: {
		PageHeader,
		XHeader,
		XDialog
	},
	data() {
		return {
			title: this.$route.meta.title,
			showDialog: false,
			preventGoBack: true,
			dpandoraUrl: ""
		}
	},
	methods: {
		jump() {
			this.showDialog = true
			// this.$router.push({
			// 	name: "Inquiry"
			// });
		},
		cancel() {
			this.$router.push({
				name: "Inquiry"
			})
		},
		checkUserInfo() {
			let postData = {
				userName: this.utils.getCookie("userName"),
				creditType: this.utils.getCookie("creditType")
			}
			this.common.checkUserInfo(postData).then(res => {
				this.dpandoraUrl = res.data.url
			})
		},
		changeUrl(e) {
			console.info("iframe", location.href)
		}
	},
	mounted() {
		this.checkUserInfo()
	}
}
</script>
