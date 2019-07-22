<template>
	<div class="login-body">
		<!-- header -->
		<header class="login-header">
			<router-link class="go-back" :to="{ name: 'Home' }"></router-link>
			<!-- <router-link class="go-to-register" :to="{ name: 'Login' }">
				登录
			</router-link> -->
		</header>
		<!-- header -->
		<div class="login-wrap">
			<h1>手机快捷登录</h1>
			<p class="tips">未注册过的手机号将自动创建账号</p>
			<div class="login-form">
				<x-input
					v-model="mobile"
					class="mobile"
					name="mobile"
					placeholder="请输入手机号"
					keyboard="number"
					is-type="china-mobile"
					:max="11"
				></x-input>
				<x-input
					v-model="messageCode"
					placeholder="请输入短信验证码"
					class="weui-vcode message-code"
					keyboard="number"
					type="tel"
					:max="5"
					ref="content"
					@keyup.enter.native="checkResultBaiQiShi"
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
					登录/注册
				</button>
				<div class="login-agreement-wrap">
					<check-icon :value.sync="selected">
						<span>我已阅读并同意</span>
						<span  v-for="(item, index) in urlArrs" :key="index" >
							<a :href="item.link" class="go-to-forget-pwd"
								>{{ item.text }}</a
							>
							<span v-if=" index !== urlArrs.length -1 ">及</span>
						</span>
					</check-icon>
				</div>
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
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";
@import "../varibale.scss";
.weui-tab__panel {
	padding-bottom: 0 !important;
}
.login-body {
	height: 100%;
	.login-header {
		background: none;
		border: none;
		position: relative;
		.go-back {
			left: 0.85rem;
		}
		.go-back:before {
			font-family: "iconfont";
			position: absolute;
			content: "\ed72";
			top: 50%;
			left: 50%;
			font-size: 1.25rem;
			color: $main-theme-color;
			-webkit-transform: translate(-50%, -50%);
			-moz-transform: translate(-50%, -50%);
			-ms-transform: translate(-50%, -50%);
			-o-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
		}
	}
	.login-wrap {
		margin-top: rem(8px);
		padding: 0 rem(15px);
		h1 {
			font-size: rem(24px);
			font-weight:500;
		}
		.tips {
			margin-top: rem(8px);
			font-size: rem(13px);
			color: $gray-font-color;
		}
		.login-form {
			margin-top: rem(14px);
			.mobile {
				position: relative;
				height: rem(40px);
				border-bottom: 1px solid #EEEEEE;
				font-size: rem(15px);
				font-family: PingFangSC-Regular;
				padding: 5px 0;
				background-size: 0.666667rem 0.666667rem;
				.weui-icon-clear {
					color: #cccccc;
					font-size: 15px;
				}
				.weui-icon-warn {
					display: none;
				}
			}
			.message-code {
				position: relative;
				height: rem(40px);
				border-bottom: 1px solid #EEEEEE;
				font-size: rem(15px);
				font-family: PingFangSC-Regular;
				padding: 5px 0;
				background-size: 0.666667rem 0.666667rem;
				margin-bottom: rem(30px);
				.weui-btn_primary {
					width: 4rem !important;
					height: rem(36px) !important;
					line-height: rem(28px) !important;
					background-color: #fff;
					padding: 0 !important;
					border: none !important;
					font-size: 0.65rem !important;
					color: $vip-theme-color;
					&:after {
						border: 0;
					}
				}
				// .weui-btn_primary:disabled {
				// 	color: #fff;
				// }
			}
			.message-code:before {
				border-top: none !important;
			}
			.recommend {
				position: relative;
				height: 1.95rem;
				font-family: PingFangSC-Regular;
				font-size: rem(15px);
				padding: 5px 0 5px 1.35rem;
				background: url("../images/account/icon_recommend_code.png") left center no-repeat;
				background-size: 0.666667rem 0.666667rem;
			}
			.recommend:before {
				border-top: none !important;
			}
			.enter-recommend {
				position: relative;
				height: 1rem;
				border-bottom: 1px solid #dddddd;
				font-size: rem(15px);
				font-family: PingFangSC-Regular;
				padding-left: 0;
				margin-bottom: 0.5rem;
			}
			.enter-recommend:before {
				border-top: none !important;
			}
			.enter-recommend-leave-active,
			.enter-recommend-enter-active {
				transition: all 0.5s ease;
			}
			.enter-recommend-leave-active,
			.enter-recommend-enter {
				height: 0px !important;
			}
			.enter-recommend-leave,
			.enter-recommend-enter-active {
				height: 1rem;
			}
			.btn-login {
				display: block;
				width: 100%;
				height: rem(44px) /* 44/22.5 */;
				font-size: rem(15px);
				font-family: PingFangSC-Regular;
				background: $main-theme-color;
				color: #fff;
				border-radius: 5px;
				border: none;
				&:active {
          background-color: darken($main-theme-color, 5%);
        }
			}
			.login-agreement-wrap {
				margin-top: rem(16px);
				font-size: 0.6rem;
				color: #cccccc;
				span {
					font-size: 0.6rem;
					color: $main-theme-color;
				}
				/deep/ .weui_icon_circle {
					font-size: 0.6rem !important;
					//color: #FFFFFF;
				}
				/deep/ .weui-icon-success {
					font-size: 0.6rem !important;
					color: $main-theme-color !important;
				}
				/deep/ .vux-check-icon > .weui-icon-success:before,
				/deep/ .vux-check-icon > .weui-icon-success-circle:before {
					color: $main-theme-color !important;
				}
				a {
					color: $vip-theme-color;
				}
			}
			input::-webkit-input-placeholder {
				color: $gray-font-color;
			}
			input::-moz-placeholder {
				/* Mozilla Firefox 19+ */
				color: $gray-font-color;
			}
			input:-moz-placeholder {
				/* Mozilla Firefox 4 to 18 */
				color: $gray-font-color;
			}
			input:-ms-input-placeholder {
				/* Internet Explorer 10-11 */
				color: $gray-font-color;
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
		font-size: rem(35px) !important;
	}
}
</style>

<script type="text/javascript">
import { Tab, TabItem, XInput, XButton, Toast, CheckIcon } from "vux";
import VerificationCodePop from "@/components/VerificationCodePop";
import RegisterAndLogin from "@/api/registerAndLogin";

export default {
	components: {
		Tab,
		TabItem,
		XInput,
		XButton,
		Toast,
		CheckIcon,
		VerificationCodePop
	},
	data() {
		return {
			type: "register",
			authPic: "",
			authId: "",
			mobile: "",
			password: "",
			imgCode: "",
			messageCode: "",
			getMessageCodeText: "获取验证码",
			boxshow: false,
			selected: true,
			inviteCode: "",
			agreementUrl1: "",
			agreementUrl2: "",
			showToast: false,
			isDisabled: false,
			link: "",
			plainTextBefore: "",
			plainTextMiddle: "",
			plainTextAfter: "",
			urlArrs: []
		};
	},
	ready() {},
	methods: {
		toggle() {
			this.boxshow = !this.boxshow;
		},
		checkResultBaiQiShi() {
			var mobile = this.mobile.replace(/\s/g, "");
			var messageCode = this.messageCode.replace(/\s/g, "");
			var password = this.password.replace(/\s/g, "");
			var inviteCode = this.inviteCode;
			var imgCode = this.imgCode.replace(/\s/g, "");

			var errorMsg = "";
			if (this.mobile == "") {
				errorMsg = "请输入您的手机号";
			} else if (!this.utils.checkMobile(this.mobile)) {
				errorMsg = "手机号码格式错误";
			} else if (
				this.inviteCode != "" &&
				!this.utils.checkInviteCode(this.inviteCode)
			) {
				errorMsg = "推荐码格式错误";
			} else if (this.getMessageCodeText === "获取验证码") {
				errorMsg = "请点击获取验证码";
			} else if (this.messageCode.length < 5) {
				errorMsg = "短信验证码格式错误";
			} else if (!this.selected) {
				errorMsg = "请同意相关协议";
			}

			if (errorMsg != "") {
				this.$vux.toast.text(errorMsg, "middle");
				return;
			}

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
					this.register();
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
			postData.append("requestSource", "HTML5");
			postData.append("uuid", this.utils.uuid());
			postData.append("authId", this.authId);
			postData.append("imageCode", this.imgCode);
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
						}, true);
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
		register() {
			var mediasource = "HY";
			if (this.utils.getCookie("mediasource")) {
				mediasource = this.utils.getCookie("mediasource");
			}
			var registerFrom = "HTML5";
			if (mediasource == "iosddd") {
				registerFrom = "iOS";
			} else if (mediasource == "andddd") {
				registerFrom = "Android";
			}
			let postData = {};
			postData.mobileNo = this.mobile;
			postData.identifyingCode = this.messageCode;
			postData.custFrom = mediasource;
			postData.inviteCode = this.inviteCode;
			RegisterAndLogin.registerAndLogin(postData).then(res => {
				// token为空代表异常情况，不为空代表注册成功
				this.$vux.loading.hide();
				let data = res.data;
				if (data.resultCode === "1") {
					window.gio("setUserId", data.userName);
					
					this.imgCode = "";
					this.afterLogin(data).then(res => {
						var redirect = this.$route.query.redirect
							? this.$route.query.redirect
							: "/";
						this.$router.push({ path: redirect });
					});
				} else if (data.resultCode === "34701") {
					this.messageLogin();
				} else {
					// this.errorMsg = res.data.resultMsg;
					// this.$vux.toast.show({
					//     type: 'cancel',
					//     position: 'middle',
					//     text: this.errorMsg
					// })
					this.imgCode = "";
					this.$vux.toast.show({
						type: "cancel",
						position: "middle",
						text: data.resultMsg
					});
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
					var mediasource = this.utils.getCookie("mediasource") || window.sessionStorage.getItem("mediasource");
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
					this.utils.setCookie("realName", escape(data.realName));
					this.utils.setCookie("mobile", data.mobileNo);
					this.utils.setCookie("identityCode", data.identityNo);
					this.utils.setCookie("custType", data.custType);
					this.utils.setCookie("isDoubleSales", data.isDoubleSales);
					this.utils.setCookie("inOneMonthReg", data.inOneMonthReg);
					this.utils.setCookie("isLanUserFlag", data.isLanUserFlag);
					// this.utils.setCookie(
					// 	"isHaveUnreadCoupon",
					// 	data.isHaveUnreadCoupon
					// );
					this.utils.setCookie("hxuserName", data.hxuserName);
					this.utils.setCookie("hxpassWord", data.hxpassWord);

					const MWEB_PATH = this.config.MWEB_PATH;

					if (data.isVip) {
						this.utils.setCookie("vipCount", "1");
					} else {
						this.utils.setCookie("vipCount", "0");
					}
					this.$vux.loading.hide();
					this.jsCommon.setAuthorization(data.userName, data.token);
					setTimeout(() => {
						let jumpType = this.$route.query.jumpType;
						if (jumpType === "bindCard") {
							//如果是绑卡的快捷入口隐藏返回和注册按钮
							this.$router.push({ name: 'BindCard', query: { jumpType: "bindCard"}});
							return;
						} else if (jumpType === "didaAct") {
							this.$router.push({ name: 'Hmfq', query: { industryCode: 'LDDD', jumpType: "didaAct"}});
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
						if (data.isVip && !localStorage.getItem('firstJumpVip')) {
							this.$router.push({name: 'VipDai'});
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
							this.$router.push({name: 'VipDai'});
						}

						if (from == "perCenter") {
							this.$router.push({name: 'Personal'});
						}
						resolve(result);
					}, 1000);
				});
			});
		}
	},
	mounted: function() {
		var userName = this.utils.getCookie("userName");
		let pageMessageObj = new URLSearchParams();
			pageMessageObj.append("uuid", "ddd4b5a9-fecd-446c-bd78-63b70bb500a1");
			pageMessageObj.append("page_code", "S007");
			pageMessageObj.append("is_zm", "N");
			pageMessageObj.append("is_xx", "N");
			pageMessageObj.append("is_gj", "N");
			pageMessageObj.append("userName", userName);
			pageMessageObj.append("comeCode", "gk");
		this.common.pageMessage(pageMessageObj).then( res => {
			let data = res.data;
			const link = data.link;
			this.plainTextBefore = data.plainText.substring(0, link[0].location);
			const urlArrs = []
			for (let i = 0; i < link.length; i++) {
				let item = {
					link: link[i].url,
					text: data.plainText.substring(parseInt(link[i].location), (parseInt(link[i].location) + parseInt(link[i].length)))
				}
				urlArrs.push(item)
			}
			this.urlArrs = urlArrs;
		})
	}
};
</script>
