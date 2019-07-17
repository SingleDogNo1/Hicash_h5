<template>
	<div>
		<x-header
			:left-options="{
				backText: '',
				showBack: true,
				preventGoBack: preventGoBack
			}"
			@on-click-back="jump"
			>{{ title }}</x-header
		>
		<div class="tips">
			<x-icon type="ios-information" class="icon-color" size="18"></x-icon>
			<span>务必确保所填信息真实有效，以免影响后续借款</span>
		</div>
		<group>
			<x-input v-model="name" placeholder="真实姓名"></x-input>
			<x-input v-model="idCard" is-type placeholder="身份证号码"></x-input>
		</group>
		<button @click="saveUserCreditInfo" class="btn">确认</button>

		<div>
			<x-dialog v-model="showDialog" class="dialogGoOut">
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

<style lang="scss">
@import "~bowerComponents/sass-rem/_rem.scss";
.IdentityAuth {
	background: #f1f1f1;
	.tips {
		margin: 0 auto;
		margin-top: 2.2rem;
		padding: rem(4px 0);
		background: rgba(255, 118, 64, 0.1);
		color: #ff7640;
		font-size: rem(13px);
		padding-left: 10%;
		.icon-color {
			fill: #ff7640;
			display: block;
			float: left;
		}
		span {
			display: block;
			float: left;
		}
		&:after {
			content: " ";
			display: block;
			clear: both;
		}
	}
	.btn {
		width: 90%;
		height: rem(44px);
		font-size: rem(15px);
		display: block;
		margin: 0 auto;
		margin-top: rem(32px);
		background: #ff7640;
		border-radius: 5px;
		color: #fff;
		border: 0;
	}
	.dialogGoOut {
		.weui-dialog {
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
					background: linear-gradient(#ffef71, #ffdb3d); /* 标准的语法 */
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
}
.vux-header {
	position: fixed !important;
	top: 0;
	left: 0;
	width: 100%;
	background-color: #fff !important;
	z-index: 100;
	.vux-header-left {
		.left-arrow:before {
			border-left: 1px solid #333 !important;
			border-top: 1px solid #333 !important;
		}
	}
	.vux-header-title {
		height: 1.955556rem /* 44/22.5 */;
		line-height: 1.955556rem /* 44/22.5 */;
		color: #333 !important;
	}
	.vux-header-right {
		right: 0.444444rem /* 10/22.5 */;
	}
	.btn-close:before {
		font-family: "iconfont";
		position: absolute;
		content: "\e6a0";
		top: 0.444444rem /* 10/22.5 */;
		right: 0;
		font-size: 0.85rem;
		color: #3f3f3f !important;
		-webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		-o-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}
}
</style>

<script>
import PageHeader from "@/components/PageHeader.vue"
import { Group, XInput, XButton, XHeader, XDialog, TransferDom } from "vux"

export default {
	components: {
		PageHeader,
		Group,
		XInput,
		XButton,
		XHeader,
		XDialog,
		TransferDom
	},
	data() {
		return {
			title: this.$route.meta.title,
			showDialog: false,
			preventGoBack: true,
			jumpRouteName: "popOutAuth",
			name: "",
			idCard: ""
		}
	},
	mounted: function() {},
	methods: {
		diologStatus: function(res) {
			this.showDialog = true
		},
		cancel: function() {
			this.$router.push({ name: "Inquiry" })
		},
		saveUserCreditInfo() {
			// let _params = new URLSearchParams();
			// _params.append("userName", this.utils.getCookie('userName'));
			// _params.append("realName", this.name);
			// _params.append("idNo", this.idCard);
			if (!this.utils.checkRealName(this.name)) {
				this.$vux.toast.text("请输入正确的真实姓名")
				return false
			}

			if (!this.utils.checkIdCardNumber(this.idCard)) {
				this.$vux.toast.text("请输入正确的身份证号码")
				return false
			}

			let _params = {
				userName: this.utils.getCookie("userName"),
				realName: this.name,
				identityNo: this.idCard
			}

			this.utils.setCookie("realName", this.name)
			this.utils.setCookie("identityNo", this.idCard)

			this.common.saveUserCreditInfo(_params).then(res => {
				let data = res.data
				if (data.resultCode == "1") {
					this.$router.push({ name: "PandoraAuth" })
				} else {
					this.$vux.toast.text(res.data.resultMsg, "middle")
				}
			})
		},
		jump() {
			if (this.name != "" || this.idCard != "") {
				this.preventGoBack = true
				this.showDialog = true
			} else {
				this.$router.push({
					name: "Inquiry"
				})
			}
		}
	}
}
</script>
