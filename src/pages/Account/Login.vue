<template>
	<div class="login-body" id="login-body">
		<!-- header -->
		<header class="login-header">
			<router-link class="go-back" :to="{ name: 'Home' }"> </router-link>
			<router-link class="go-to-register" :to="{ name: 'Register' }">
				注册
			</router-link>
		</header>
		<!-- header -->
		<div class="user-login">
			<h2 :class="{ 'dida-logo': logoType === 'dida' }"></h2>
		</div>
		<div class="user-login-wrap">
			<tab
				:line-width="1"
				:custom-bar-width="getBarWidth"
				class="tab-container"
			>
				<tab-item selected @on-item-click="onItemClick"
					>短信登录</tab-item
				>
				<tab-item @on-item-click="onItemClick">密码登录</tab-item>
			</tab>
			<div class="message-login-form" v-if="type === 'message'">
				<x-input
					v-model="mobile"
					class="mobile"
					name="mobile"
					placeholder="请输入手机号"
					keyboard="number"
					is-type="china-mobile"
					:max="11"
					autocomplete="off"
				></x-input>
				<x-input
					v-model="messageCode"
					placeholder="请输入短信验证码"
					class="weui-vcode message-code"
					@keyup.enter.native="checkResultBaiQiShi"
					keyboard="number"
					type="tel"
					:max="5"
					ref="content"
				>
					<x-button
						slot="right"
						type="primary"
						mini
						@click.native="getMessageCode('middle')"
						:disabled="isDisabled"
					>
						{{ getMessageCodeText }}</x-button
					>
				</x-input>
				<button class="btn-login" @click="checkResultBaiQiShi">
					登录
				</button>
			</div>
			<div class="message-login-form" v-if="type === 'password'">
				<x-input
					v-model="mobile"
					class="mobile"
					name="mobile"
					placeholder="请输入手机号"
					keyboard="number"
					is-type="china-mobile"
					:max="11"
					autocomplete="off"
				></x-input>
				<x-input
					v-model="password"
					class="password"
					name="password"
					placeholder="请输入密码"
					type="password"
					@keyup.enter.native="checkResultBaiQiShi"
				></x-input>
				<button class="btn-login" @click="checkResultBaiQiShi">
					登录
				</button>
				<router-link
					class="go-to-forget-pwd"
					:to="{ name: 'ForgetPassword' }"
				>
					忘记密码?
				</router-link>
			</div>
		</div>
		<VerificationCodePop
			:mobile="mobile"
			:showToast="showToast"
			:authId="authId"
			:authPic="authPic"
			:type="type"
			@timeCount="showTimeCount"
			@imgCode="newImgCode"
			@showToast="showToast1"
		></VerificationCodePop>
		<iframe id="oldHicash" :src="oldHicash"></iframe>
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
#oldHicash {
	width: 0;
	height: 0;
}
.weui-tab__panel {
	padding-bottom: 0 !important;
}
#login-body {
	height: 100%;
	background-image: linear-gradient(-180deg, #fd7f5f 3%, #fc915c 98%);
	.login-header {
		background: none;
		border: none;
		position: relative;
		.go-back {
			left: 0.85rem;
		}
		.go-back:before {
			color: #fff;
		}
		.go-to-register {
			font-size: 15px;
			font-family: PingFangSC-Regular;
			float: right;
			height: 2.2rem;
			line-height: 2.2rem;
			color: #fff;
			margin-right: 0.85rem;
			outline: 0;
		}
	}
	.user-login {
		h2 {
			margin: 0.5rem auto 0;
			width: 136px;
			height: 46px;
			background: url(./logo_user.png) 0 0 no-repeat;
			background-size: cover;
		}
		h2.dida-logo {
			margin: 0.5rem auto 0;
			width: 136px;
			height: 46px;
			background: url(./icon_dida_logo.png) 0 0 no-repeat;
			background-size: 100%;
		}
	}
	.user-login-wrap {
		width: 14.35rem;
		height: calc(100% - 6.7rem);
		margin: 0 auto;
		margin-top: 2.2rem;
		background: #fff;
		border-radius: 10px 10px 0 0 !important;
		.tab-container {
			.vux-tab-container {
				border-radius: 10px 10px 0 0 !important;
			}
			.vux-tab {
				height: 1.8rem !important;
				background-color: #ffeeea !important;
				.vux-tab-item {
					height: 1.8rem !important;
					line-height: 1.8rem !important;
					font-size: 13px !important;
					color: #999;
				}
				.vux-tab-selected {
					color: #ff7640;
				}
				.vux-tab-ink-bar-transition-backward,
				.vux-tab-ink-bar-transition-forward {
					height: 2px !important;
					.vux-tab-bar-inner {
						width: 2.5rem !important;
						background-color: #ff7640 !important;
					}
				}
			}
		}
		.message-login-form {
			width: 11.775rem;
			margin: 0.5rem auto;
			.mobile {
				position: relative;
				height: 1.8rem;
				border-bottom: 1px solid #dddddd;
				font-size: 15px;
				padding: 5px 0 5px 1.35rem;
				background: url(./icon_tel.png) left center no-repeat;
				background-size: 0.666667rem 0.666667rem;
				font-family: PingFangSC-Regular;
			}
			.message-code {
				position: relative;
				height: 1.8rem;
				border-bottom: 1px solid #dddddd;
				font-size: 15px;
				padding: 5px 0 5px 1.35rem;
				background: url(./icon_message_code.png) left center no-repeat;
				background-size: 0.666667rem 0.666667rem;
				font-family: PingFangSC-Regular;
				.weui-btn_primary {
					width: 4rem !important;
					height: 1.45rem !important;
					padding: 0 !important;
					background-color: #ff7640 !important;
					border: none !important;
					font-size: 0.666667rem /* 15/22.5 */ !important;
				}
				.weui-btn_primary:disabled {
					background-color: #ddd !important;
					color: #fff;
				}
			}
			.message-code:before {
				border-top: none !important;
			}
			.password {
				position: relative;
				height: 1.8rem;
				border-bottom: 1px solid #dddddd;
				font-size: 15px;
				padding: 5px 0 5px 1.35rem;
				background: url(./icon_password.png) left center no-repeat;
				background-size: 0.666667rem 0.666667rem;
				font-family: PingFangSC-Regular;
			}
			.password:before {
				border-top: none !important;
			}
			.btn-login {
				display: block;
				width: 11rem;
				height: 2rem;
				margin: 1.25rem auto;
				font-size: 15px;
				background: #ff7640;
				color: #fff;
				border-radius: 5px;
				border: none;
				font-family: PingFangSC-Regular;
			}
			.go-to-forget-pwd {
				display: block;
				color: #c45930;
				font-size: 15px;
				text-align: center;
			}
			input::-webkit-input-placeholder {
				color: #ccc;
			}
			input::-moz-placeholder {
				/* Mozilla Firefox 19+ */
				color: #ccc;
			}
			input:-moz-placeholder {
				/* Mozilla Firefox 4 to 18 */
				color: #ccc;
			}
			input:-ms-input-placeholder {
				/* Internet Explorer 10-11 */
				color: #ccc;
			}
		}
	}
}
.weui-toast_cancel {
	width: auto !important;
	padding: 0 0.444444rem /* 10/22.5 */;
	min-height: auto !important;
	.weui-icon_toast {
		margin: 8px 0 6px 0 !important;
	}
	.weui-icon_toast.weui-icon-success-no-circle:before {
		font-size: 35px !important;
	}
}
.weui-toast {
	width: auto !important;
	padding: 0 15px !important;
}
</style>

<script type="text/javascript">
import { Tab, TabItem, XInput, XButton, Loading } from "vux";

import VerificationCodePop from "@/components/VerificationCodePop";

// todo

export default {
	components: {
		Tab,
		TabItem,
		XInput,
		XButton,
		VerificationCodePop,
		Loading
	},
	data() {
		return {
			type: "login",
			authId: "",
			mobile: "",
			password: "",
			imgCode: "",
			messageCode: "",
			position: "default",
			showPositionValue: false,
			errorMsg: "",
			getMessageCodeText: "获取验证码",
			getBarWidth: function(index) {
				return "4rem";
			},
			showToast: false,
			oldHicash: "",
			authPic: "",
			isDisabled: false,
			logoType: ""
		};
	},
	ready() {},
	methods: {
		onItemClick(index) {
			index === 0 ? (this.type = "message") : (this.type = "password");
		},
		checkResultBaiQiShi() {
			if (this.type == "message") {
				var errorMsg = "";
				if (this.mobile == "") {
					errorMsg = "请输入您的手机号";
				} else if (!this.utils.checkMobile(this.mobile)) {
					errorMsg = "手机号码格式错误";
				} else if (this.getMessageCodeText === "获取验证码") {
					errorMsg = "请点击获取验证码";
				} else if (this.messageCode.length < 5) {
					errorMsg = "短信验证码格式错误";
				} else if (this.messageCode == "") {
					errorMsg = "请输入短信验证码";
				}
				if (errorMsg != "") {
					this.$vux.toast.text(errorMsg, "middle");
					return;
				}
			} else if (this.type == "password") {
				var errorMsg = "";
				if (this.mobile == "") {
					errorMsg = "请输入您的手机号";
				} else if (!this.utils.checkMobile(this.mobile)) {
					errorMsg = "手机号码格式错误";
				} else if (this.password == "") {
					errorMsg = "请输入密码";
				}
				if (errorMsg != "") {
					this.$vux.toast.text(errorMsg, "middle");
					return;
				}
			}
			//name,value,domain,path,expires,httpOnly,secure
			// gpsArr,117.20543448188623%2C39.122510101513974,192.168.9.48,/,会话,false,false

			var postData = new URLSearchParams();
			postData.append("idustryCode", "HQ");
			postData.append("idCard", "");
			postData.append("mobile", this.mobile);
			postData.append("name", "");
			postData.append("eventType", "login");
			postData.append("tokenKey", this.utils.getCookie("uuid"));
			postData.append("plateform", "h5");

			var gpsArr = this.utils.getCookie("gpsArr");
			if (gpsArr && gpsArr != "") {
				gpsArr = gpsArr.split(",");
				postData.append("h5Longitude", gpsArr[0]);
				postData.append("h5Latitude", gpsArr[1]);
			}

			this.$vux.loading.show({
				text: "数据请求中"
			});
			this.common.checkResultBaiQiShi(postData).then(res => {
				let resultCode = res.data.resultCode;
				if (resultCode == "1") {
					if (this.type == "message") {
						this.messageLogin();
					} else if (this.type == "password") {
						this.passwordLogin();
					}
				} else {
					this.$vux.loading.hide();
					this.$vux.toast.show({
						type: "cancel",
						position: "middle",
						text: res.data.resultMsg
					});
				}
			});
		},
		getMessageCode(position) {
			var errorMsg = "";
			if (this.mobile == "") {
				errorMsg = "请输入您的手机号";
			} else if (!this.utils.checkMobile(this.mobile)) {
				errorMsg = "手机号码格式错误";
			}
			if (errorMsg != "") {
				this.$vux.toast.text(errorMsg, "middle");
				return;
			}
			this.imgCode = "";
			this.$refs.content.focus();
			var postData = new URLSearchParams();
			postData.append("userName", this.mobile);
			postData.append("mobile", this.mobile);
			postData.append("sendFrom", "HTML5");
			postData.append("sendType", "login");
			postData.append("authId", this.authId);
			postData.append("imageCode", this.imgCode);
			postData.append("uuid", this.utils.uuid());
			this.common.getMessageCode(postData).then(res => {
				let data = res.data;
				if (data.resultCode == "1" || data.resultCode == "2") {
					// 是否显示图片验证码 （1显示，0不显示）
					if (data.showAuthPic === "0") {
						this.isDisabled = true;
						this.utils.timeCount(60, timeCount => {
							this.getMessageCodeText = timeCount;
							if (this.getMessageCodeText === "获取验证码")
								this.isDisabled = false;
						});
					} else {
						this.showToast = true;
						this.authPic = "data:image/jpg;base64," + data.authPic;
					}
				} else {
					this.errorMsg = data.resultMsg;
					this.$vux.toast.show({
						type: "cancel",
						position: "middle",
						text: this.errorMsg
					});
				}
			});
		},
		messageLogin(position) {
			var postData = new URLSearchParams();
			postData.append("uuid", "0c8297d7-6d3a-46da-b782-0df2434f88b1");
			postData.append("cityCode", "310100");
			postData.append("userName", this.mobile);
			postData.append("passWord", this.messageCode);
			postData.append("type", 2);
			postData.append("requestSource", "h5");
			this.common.login(postData).then(res => {
				let data = res.data;
				if (data.resultCode === "1") {
					this.jsCommon.setAuthorization(data.userName, data.token);
					this.imgCode = "";
					this.afterLogin(data).then(res => {
						var redirect = this.$route.query.redirect
							? this.$route.query.redirect
							: "/";
						this.$router.push({ path: redirect });
					});
				} else {
					this.$vux.loading.hide();
					this.errorMsg = data.resultMsg;
					this.$vux.toast.show({
						type: "cancel",
						position: "middle",
						text: this.errorMsg
					});
					this.imgCode = "";
				}
			});
		},
		passwordLogin() {
			var postData = new URLSearchParams();
			postData.append("uuid", "0c8297d7-6d3a-46da-b782-0df2434f88b1");
			postData.append("cityCode", "310100");
			postData.append("userName", this.mobile);
			postData.append("passWord", this.password);
			postData.append("type", 1);
			this.common.login(postData).then(res => {
				let data = res.data;
				if (data.resultCode === "1") {
					this.jsCommon.setAuthorization(data.userName, data.token);
					this.imgCode = "";
					this.afterLogin(data).then(res => {
						var redirect = this.$route.query.redirect
							? this.$route.query.redirect
							: "/";
						this.$router.push({ path: redirect });
					});
				} else {
					this.$vux.loading.hide();
					this.errorMsg = data.resultMsg;
					this.$vux.toast.show({
						type: "cancel",
						position: "middle",
						text: this.errorMsg
					});
					this.imgCode = "";
				}
			});
		},
		showTimeCount(timeCount) {
			this.getMessageCodeText = timeCount;
			this.isDisabled = true;
			if (this.getMessageCodeText === "获取验证码")
				this.isDisabled = false;
		},
		newImgCode(newImgCode) {
			this.imgCode = newImgCode;
		},
		showToast1(showToast1) {
			this.showToast = showToast1;
		},
		afterLogin(data) {
			return new Promise((resolve, reject) => {
				console.info("data", data);
				window.gio("setUserId", data.userName);
				var params = new URLSearchParams();
				params.append("userName", data.userName);
				params.append("uuid", "0c8297d7-6d3a-46da-b782-0df2434f88b1");
				this.common.getUserGrade(params).then(result => {
					var source = this.utils.getCookie("source");
					var vipCount = this.utils.getCookie("vipCount");
					var dxObj = this.utils.getCookie("dxObj");
					var telObj = this.utils.getCookie("telObj");
					var mediasource = this.utils.getCookie("mediasource");
					alert('mediasource' + mediasource);
					window.sessionStorage.setItem('mediasource', mediasource);
					var afFrom = this.utils.getCookie("afFrom");
					var siji_realName = this.utils.getCookie("siji_realName");
					var siji_didiMobile = this.utils.getCookie(
						"siji_didiMobile"
					);
					var siji_loanAmount = this.utils.getCookie(
						"siji_loanAmount"
					);
					var siji_proid = this.utils.getCookie("siji_proid");

					this.utils.clearCookie();
					if (result.data.userGrade) {
						var getUserPj = this.utils.getCookie("pj");
						if (!getUserPj || getUserPj != result.data.userGrade) {
							this.utils.setCookie("pj", result.data.userGrade);
							this.utils.setCookie("pjread", "0");
						}
					}

					this.utils.setCookie("token", data.token);
					this.utils.setCookie("userName", data.userName);
					this.utils.setCookie("realName", data.realName);
					this.utils.setCookie("mobile", data.mobile);
					this.utils.setCookie("identityCode", data.identityNo);
					this.utils.setCookie("custType", data.custType);
					this.utils.setCookie("isDoubleSales", data.isDoubleSales);
					this.utils.setCookie("inOneMonthReg", data.inOneMonthReg);
					this.utils.setCookie("isLanUserFlag", data.isLanUserFlag);
					this.utils.setCookie(
						"isHaveUnreadCoupon",
						data.isHaveUnreadCoupon
					);

					const MWEB_PATH = this.config.MWEB_PATH;

					console.info("oldHicash onload request");
					this.oldHicash =
						this.config.MWEB_PATH +
						"newweb/template/fromAppTemp.html?userName=" +
						this.mobile +
						"&t=" +
						new Date().getTime() +
						"&authorization=" +
						sessionStorage.getItem("authorization");
					//TODO 新老嗨钱融合中的代码，后续优化
					document.getElementById("oldHicash").onload = () => {
						console.info("oldHicash onload success");
						if (data.isVip) {
							this.utils.setCookie("vipCount", "1");
						} else {
							this.utils.setCookie("vipCount", "0");
						}
						this.$vux.loading.hide();
						setTimeout(() => {
							let jumpType = this.$route.query.jumpType;
							if (jumpType === "bindCard") {
								//如果是绑卡的快捷入口隐藏返回和注册按钮
								window.location.href =
									MWEB_PATH +
									"newweb/creditInfo/bandBank.html?jumpType=bindCard";
								return;
							} else if (jumpType === "didaAct") {
								window.location.href =
									MWEB_PATH +
									"newweb/product/miaodai.html?industryCode=LDDD&jumpType=didaAct";
								return;
							}else if(jumpType === "myInstalment"){
								this.$router.push({
									name: "MyInstalment"
								});
								return;
							}

							var ref = window.location.href;
							var from =
								this.utils.getQueryString("from") ||
								this.$route.query.from;
							if (from == "shixin") {
								var _appNo =
									this.utils.getQueryString("appNo") ||
									this.$route.query.appNo;
								var postData = new URLSearchParams();
								postData.append("appNo", _appNo);
								postData.append("requestSource", "H5");
								postData.append(
									"userName",
									this.utils.getCookie("userName")
								);
								postData.append(
									"comeFrom",
									this.utils.getPlatform()
								);
								postData.append("uuid", this.utils.uuid());

								this.common
									.navigateToRecharge(postData)
									.then(function() {
										window.location.href = data.rechargeUrl;
									});

								return false;
							}

							let custFromParams =
								this.utils.getQueryString("custFrom") ||
								this.$route.query.custFrom;

							if (
								"sharkResult" ==
								this.utils.getQueryString("from")
							) {
								var custFrom =
									custFromParams && custFromParams != "null"
										? custFromParams
										: "H5";
								window.location.href =
									MWEB_PATH +
									"newweb/sharkActivity/sharkResult.html?custFrom=" +
									custFrom;
								return false;
							}
							if (ref.indexOf("sharkLogin.html") != -1) {
								var custFrom =
									custFromParams && custFromParams != "null"
										? custFromParams
										: "H5";
								window.location.href =
									MWEB_PATH +
									"newweb/sharkActivity/sharkIndex.html?custFrom=" +
									custFrom;
								return false;
							}
							if (data.isVip) {
								window.location.href =
									MWEB_PATH + "newweb/product/vipdai.html";
								return false;
							}
							if (dxObj && telObj) {
								this.utils.setCookie("dxObj", dxObj);
								this.utils.setCookie("telObj", telObj);
							}

							if (
								this.utils.getCookie("afFrom") &&
								this.utils.getCookie("afFrom") == "miaodai"
							) {
								window.location.href =
									MWEB_PATH + "newweb/product/vipdai.html";
							}

							if (from == "perCenter") {
								window.location.href =
									MWEB_PATH +
									"newweb/personalCenter/perCenter.html";
							}

							console.log("result====", result);
							resolve(result);
						}, 1000);
					};
					// resolve(result);
				});
			});
		}
	},
	mounted: function() {
		this.type = "message";

		let jumpType = this.$route.query.jumpType;
		if (jumpType === "didaAct") {
			this.logoType = "dida";
		}
	}
};
</script>
