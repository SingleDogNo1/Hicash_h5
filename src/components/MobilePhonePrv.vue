<template>
	<div class="rate-calculation-body">
		<header class="credit-header">
			<!-- go-history -->
			<a class="go-history" href="javascript:;" @click="goBack"></a>
			<a class="go-history btn-close" href="javascript:;" @click="close"></a>
			<h1>手机认证</h1>
		</header>
		<div class="authentication-step">
			<img src="../assets/images/mpbile_prv_step.png" alt="" />
			<ul>
				<li class="active">身份认证</li>
				<li class="active">基本信息</li>
				<li class="active">信用认证</li>
			</ul>
		</div>
		<section class="base-main">
			<div class="person-content">
				<label>手机号</label>
				<x-input
					class="mobile"
					v-model="mobile"
					disabled
					name="directRelativesName"
					placeholder="请输入手机号"
					:show-clear="false"
				>
				</x-input>
			</div>
			<div class="person-content">
				<label>服务密码</label>
				<x-input
					class="password"
					type="password"
					autocomplete="off"
					v-model="password"
					name="directRelativesName"
					placeholder="请输入密码"
					:show-clear="false"
				>
				</x-input>
			</div>
		</section>
		<div class="next-step">
			<a href="javascript:;" @click="btnNext">下一步</a>
		</div>
		<p class="tips">
			手机号认证：收集您的号码基本信息、账单信息、通话记录、上网记录、短信详单等用于认证服务。运营商会发送短信告知您，我们在网上营业厅查询过您的详单，这是我们认证您信息的正常过程。
		</p>
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
.MobilePhonePrv {
	.rate-calculation-body {
		width: 100%;
		height: 100%;
		background: #fff;
		header {
			.btn-close {
				right: 0.85rem;
				left: auto;
			}
			.btn-close:before {
				font-family: "iconfont";
				position: absolute;
				content: "\e6a0";
				top: 50%;
				left: 50%;
				font-size: 1rem;
				color: #3f3f3f;
				-webkit-transform: translate(-50%, -50%);
				-moz-transform: translate(-50%, -50%);
				-ms-transform: translate(-50%, -50%);
				-o-transform: translate(-50%, -50%);
				transform: translate(-50%, -50%);
			}
		}
		.authentication-step {
			width: 100%;
			height: 4.55rem;
			background-color: #ff7640;
			margin-top: 2.2rem;
			text-align: center;
			img {
				width: 9.325rem;
				height: 2.325rem;
				display: inline-block;
				margin-top: 0.7rem;
			}
			ul {
				clear: both;
				width: 9.3rem;
				margin: 0 auto;
				position: relative;
				li {
					float: left;
					font-size: 0.6rem;
					margin-right: 1.12rem;
					color: #fff;
				}
				li.active {
					color: #333;
				}
				li:last-child {
					margin-right: 0;
					position: absolute;
					right: -0.155rem;
				}
			}
		}
		.step-header {
			height: 1.625rem;
			line-height: 1.625rem;
			color: #3f3f3f;
			font-size: 0.55rem;
			text-align: left;
			padding-left: 0.85rem;
			border-bottom: 1px solid #dadada;
		}
		.base-main {
			margin-bottom: 0;
			border-bottom: 1px solid #dadada;
			padding: 0;
			background-color: #fff;
			padding-left: 0.85rem;
			.person-content {
				height: 1.95rem;
				line-height: 1.95rem;
				clear: both;
				overflow: hidden;
				zoom: 1;
				border-bottom: 1px solid #dadada;
				position: relative;
				label {
					width: 30%;
					font-size: 0.6rem;
					float: left;
					color: #3f3f3f;
					display: inline-block;
					height: 1.95rem;
					line-height: 1.95rem;
				}
				.weui-cell {
					padding: 0 !important;
					.weui-input {
						width: 70%;
						height: 1.95rem;
						outline: none;
						font-size: 0.6rem;
						float: right;
						text-align: right;
						padding-right: 0.85rem;
						background-color: #fff;
					}
					input[type="text"]:disabled {
						color: #999;
					}
					input:-webkit-autofill {
						-webkit-box-shadow: 0 0 0px 1000px white inset;
						-webkit-text-fill-color: #3f3f3f;
					}
				}
				.weui-cell:before {
					border-top: none !important;
				}
				.weui-cell_access {
					width: 64%;
					height: 1.95rem;
					outline: none;
					font-size: 0.6rem;
					float: right;
					text-align: right;
					padding-right: 0.85rem !important;
					background-color: #fff;
				}
				.weui-cell__ft:after {
					border-color: #a4a4a4 !important;
				}
				.address {
					position: absolute;
					width: 65%;
					height: 1.95rem;
					line-height: 1.95rem;
					display: inline-block;
					right: 1.7rem;
					text-align: right;
					font-size: 0.6rem;
					color: #3f3f3f;
				}
				.right-inco {
					pointer-events: none;
					width: 0.7rem;
					height: 1.95rem;
					display: inline-block;
					float: right;
					padding-right: 0.75rem;
					fill: #a4a4a4;
				}
			}
			.person-content:last-child {
				border-bottom: none;
			}
			.company-tel {
				label {
					width: 50%;
				}
			}
		}
		.stu-contact {
			border-top: 1px solid #dadada;
			margin-top: 0.325rem;
		}
		.next-step {
			width: 100%;
			text-align: center;
			padding-bottom: 1.75rem;
			margin-top: 1.25rem;
			a {
				display: inline-block;
				width: 14.2rem;
				background-color: #333;
				height: 1.875rem;
				border-radius: 0.15rem;
				font-size: 0.65rem;
				line-height: 1.875rem;
				color: #fff;
			}
		}
		.tips {
			font-size: 0.55rem;
			color: #999;
			padding: 0 1rem;
			line-height: 0.8rem;
			padding-bottom: 1.5rem;
			margin-top: -0.6rem;
		}
	}
	.vux-popup-header-right {
		color: #ff9900 !important;
	}
	.weui-cell_access .weui-cell__ft {
		padding-right: 18px !important;
	}
	.weui-cell_access .weui-cell__ft:after {
		border-width: 0px 2px 2px 0px !important;
	}
	.vux-loading {
		.weui-toast {
			width: 5em !important;
			min-height: 5em !important;
			.weui-loading {
				margin: 22px 0 0 !important;
			}
		}
	}
}
</style>

<script type="text/javascript">
import { Loading, XInput, Group, PopupPicker } from "vux"
import $ from "jquery"
import common from "@/api/common"
import utils from "@/assets/js/utils"

export default {
	components: {
		Loading,
		XInput,
		Group,
		PopupPicker
	},
	data() {
		return {
			mobile: "",
			password: ""
		}
	},
	ready() {},
	methods: {
		goBack() {},
		close() {},
		btnNext() {}
	},
	mounted: function() {
		this.mobile = utils.getCookie("mobile")
		let postData = new URLSearchParams()
		let tempAppNo = utils.getCookie("appFlowNo").split(":")[1]
		postData.append("tempAppNo", tempAppNo)
		common.creditItems(postData).then(res => {
			console.log("res======", res)
			if (res.data.resultCode === "1") {
				window.sessionStorage.removeItem("creditItems")
				var creditItems = res.data.creditItems
				var paramsStr = ""
				if (creditItems[0].url.indexOf("?") != -1) {
					paramsStr =
						"&source=hq&id_card_no=" +
						utils.getCookie("identityCode") +
						"&name=" +
						unescape(utils.getCookie("realName")) +
						"&mobile=" +
						utils.getCookie("mobile")
				} else {
					paramsStr =
						"?source=hq&id_card_no=" +
						utils.getCookie("identityCode") +
						"&name=" +
						unescape(utils.getCookie("realName")) +
						"&mobile=" +
						utils.getCookie("mobile")
				}
				console.log(utils.getCookie("realName"))
				console.log(paramsStr)
				window.location.href = creditItems[0].url + paramsStr
				//creditItems.shift();
				window.sessionStorage.setItem("creditItems", JSON.stringify(creditItems))
			} else {
				this.errorMsg = res.data.resultMsg
				this.$vux.toast.show({
					type: "cancel",
					position: "middle",
					text: this.errorMsg
				})
			}
		})
	}
}
</script>
