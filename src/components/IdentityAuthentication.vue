<template>
	<div class="rate-calculation-body">
		<div class="close-pop-mask" v-transfer-dom>
			<x-dialog v-model="show" class="dialog-demo">
				<div class="img-box">
					<div class="dialog-header"></div>
					<div class="dialog-content">
						<strong>是否放弃填写</strong
						>信息尚未填写完成，是否放弃申请？<br />现金曾离你这么近，难道就舍它而去？
					</div>
					<div class="action">
						<a
							href="javascript:void(0);"
							class="btn-continue"
							@click="continueWrite"
							>继续填写</a
						>
						<router-link class="btn-giveup" :to="{ name: 'Home' }">
							放弃填写
						</router-link>
					</div>
				</div>
			</x-dialog>
		</div>
		<header class="credit-header">
			<!-- go-history -->
			<a class="go-history" href="javascript:;" @click="goBack"></a>
			<a
				class="go-history btn-close"
				href="javascript:;"
				@click="close"
			></a>
			<h1>身份认证</h1>
		</header>
		<div class="authentication-step">
			<img src="../assets/images/authentication_step.png" alt="" />
			<ul>
				<li class="active">身份认证</li>
				<li>基本信息</li>
				<li>信用认证</li>
			</ul>
		</div>
		<section class="credit-main">
			<div class="content">
				<h1>本人手持身份证正面</h1>
				<div class="img-wrap">
					<img
						class="idcard-front"
						:src="userIdcardFrontUrlThum"
						alt=""
					/>
					<form action="" method="post" accept-charset="utf-8">
						<i class="add-img"></i>
						<input
							type="file"
							name="file"
							@change="userFrontUploadImg($event)"
						/>
						<input type="hidden" name="imgType" value="ZL112" />
						<input
							type="hidden"
							v-model="upName"
							class="upName"
							name="userName"
						/>
						<input
							type="hidden"
							v-model="upNo"
							class="upNo"
							name="tempAppNo"
						/>
						<input type="hidden" name="uploadType" value="APPIMG" />
						<input
							type="hidden"
							name="uuid"
							value="0c8297d7-6d3a-46da-b782-0df2434f88b1"
						/>
					</form>
					<input
						type="hidden"
						v-model="userIdcardFrontUpHidden"
						class="uphidden"
						name="upZL112"
					/>
				</div>
				<p style="margin-top:.2rem;">
					照片应同时包含身份证正面像、本人胸部以上头像
				</p>
				<p>身份证正面像要求卡片完整、字迹清晰</p>
				<p>本人头像要求五官清晰且无遮挡</p>
				<div
					class="p03"
					style="margin-top: -.4rem;margin-bottom:.1rem;
                "
				>
					<p
						style="border-bottom:1px solid #ff7640;display: inline-block;"
					>
						您的身份证需在有效期内方可申请
					</p>
				</div>
			</div>
			<div class="content">
				<h1>身份证正面(卡片完整,字迹清晰)</h1>
				<div class="img-wrap">
					<img
						class="idcard-front"
						:src="idcardFrontUrlThum"
						alt=""
					/>
					<form action="" method="post" accept-charset="utf-8">
						<i class="add-img"></i>
						<input
							type="file"
							name="file"
							@change="frontUploadImg($event)"
						/>
						<input type="hidden" name="imgType" value="ZL02" />
						<input type="hidden" class="upName" name="userName" />
						<input type="hidden" class="upNo" name="tempAppNo" />
						<input type="hidden" name="uploadType" value="APPIMG" />
						<input
							type="hidden"
							name="uuid"
							value="0c8297d7-6d3a-46da-b782-0df2434f88b1"
						/>
					</form>
					<input
						type="hidden"
						class="uphidden"
						v-model="idcardFrontUpHidden"
						name="upZL02"
					/>
				</div>
			</div>
			<div class="content">
				<h1>身份证反面(卡片完整,字迹清晰)</h1>
				<div class="img-wrap">
					<img class="idcard-front" :src="idcardBackUrlThum" alt="" />
					<form action="" method="post" accept-charset="utf-8">
						<i class="add-img"></i>
						<input
							type="file"
							name="file"
							@change="backUploadImg($event)"
						/>
						<input type="hidden" name="imgType" value="ZL02" />
						<input type="hidden" class="upName" name="userName" />
						<input type="hidden" class="upNo" name="tempAppNo" />
						<input type="hidden" name="uploadType" value="APPIMG" />
						<input
							type="hidden"
							name="uuid"
							value="0c8297d7-6d3a-46da-b782-0df2434f88b1"
						/>
					</form>
					<input
						type="hidden"
						v-model="idcardBackUpHidden"
						class="uphidden"
						name="upZL02"
					/>
				</div>
			</div>
		</section>
		<div class="next-step">
			<a href="javascript:;" class="btn-next-step" @click="nextStep"
				>下一步</a
			>
		</div>
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
.rate-calculation-body {
	position: relative;
	width: 100%;
	height: auto;
	background: #fff;
	z-index: 999;
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
	.credit-main {
		padding: 30px;
		.content {
			color: #a4a4a4;
			text-align: center;
			border-bottom: 1px solid #dadada;
			padding-bottom: 0.75rem;
			margin-bottom: 0.75rem;
			position: relative;
			h1 {
				font-weight: normal;
				font-size: 0.65rem;
				text-align: center;
				margin-bottom: 0.75rem;
			}
			.img-wrap {
				width: 9.375rem;
				height: 6rem;
				text-align: center;
				border: 1px solid #eee;
				display: inline-block;
				position: relative;
				.idcard-front {
					width: 9.1rem;
					height: 5.675rem;
					display: inline-block;
					margin-top: 0.141875rem;
					object-fit: contain;
				}
				form {
					position: absolute;
					top: 0;
					width: 9.1rem;
					height: 5.675rem;
					.add-img {
						width: 1.375rem;
						height: 1.375rem;
						position: absolute;
						right: 0.2rem;
						bottom: 0.2rem;
						display: inline-block;
						font-style: normal;
					}
					.add-img:before {
						font-family: "iconfont";
						position: absolute;
						content: "\e61e";
						top: 50%;
						left: 50%;
						font-size: 1.375rem;
						color: #ff7640;
						-webkit-transform: translate(-50%, -50%);
						-moz-transform: translate(-50%, -50%);
						-ms-transform: translate(-50%, -50%);
						-o-transform: translate(-50%, -50%);
						transform: translate(-50%, -50%);
					}
					input {
						width: 9.1rem;
						height: 5.675rem;
						outline: none;
						position: absolute;
						opacity: 0;
						left: 0;
						cursor: pointer;
					}
				}
			}
			p {
				font-size: 0.55rem;
				text-align: center;
				line-height: 0.85rem;
			}
		}
	}
	.next-step {
		width: 100%;
		text-align: center;
		padding-bottom: 1.75rem;
		margin-top: 1.25rem;
		.btn-next-step {
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
}
.weui-tab__panel {
	padding-bottom: 0 !important;
}
.close-pop-mask {
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	display: -webkit-box;
	-webkit-box-pack: center;
	-webkit-box-align: center;
	.weui-dialog {
		width: 14.5rem;
		height: auto;
		border-radius: 5px;
		.img-box {
			width: 100%;
			height: 100%;
			background: #fff;
			.dialog-header {
				width: 100%;
				height: 2.05rem;
				background: #ff7640;
				border-radius: 5px 5px 0 0;
				margin: 0 auto;
				margin-bottom: 0.375rem;
				font-family: "iconfont";
				font-size: 1.8rem;
				color: #fff;
			}
			.dialog-header:before {
				position: absolute;
				content: "\e618";
				top: 0rem;
				left: 45%;
				color: #fff;
			}
			.dialog-content {
				color: #333;
				padding: 0 0.6rem;
				line-height: 1.5em;
				text-align: center;
				font-size: 0.7rem;
				font-family: "微软雅黑";
				strong {
					font-size: 0.75rem;
					display: block;
					padding-bottom: 0.4rem;
					font-weight: normal;
				}
			}
			.action {
				height: 1.85rem;
				border-top: 1px solid #ddd;
				margin-top: 0.45rem;
				a {
					width: 49%;
					padding: 0;
					height: 1.85rem;
					line-height: 1.85rem;
					display: inline-block;
					float: left;
					margin: 0;
					background: #fff;
					color: #333;
					font-size: 0.65rem;
					outline: none;
					font-family: "微软雅黑";
				}
				.btn-continue {
					border-right: 1px solid #ddd;
				}
			}
		}
	}
}
.vux-loading {
	.weui-toast {
		width: 7em !important;
		min-height: 5em !important;
		.weui-loading {
			margin: 15px 0 0 !important;
		}
	}
}
.weui-toast_success {
	width: 6em !important;
	min-height: 5em !important;
	.weui-icon_toast {
		margin: 8px 0 0 !important;
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
</style>

<script type="text/javascript">
import { XDialog, TransferDomDirective as TransferDom } from "vux";
import $ from "jquery";
import common from "@/api/common";
import utils from "@/assets/js/utils";
import fs from "fs";

var changeImage = (type, postObj, file) => {
	return new Promise((resolve, reject) => {
		let postData = new URLSearchParams();
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function(e) {
			postData.append("imageBase64", this.result);
			postData.append("fileName", file.name);
			postData.append("file", file);
			postData.append("imgType", type);
			postData.append("userName", postObj.upName);
			postData.append("tempAppNo", postObj.upNo);
			postData.append("uploadType", "APPIMG");
			postData.append("uuid", "0c8297d7-6d3a-46da-b782-0df2434f88b1");
			common.uploadPic(postData).then(res => {
				if (res.data.resultCode === "1") {
					resolve(res.data);
				} else {
					let params = new URLSearchParams();
					params.append(
						"tempAppNo",
						utils.getCookie("appFlowNo").split(":")[1]
					);
					params.append("applyFrom", "03");
					params.append("custType", utils.getCookie("custType"));
					params.append(
						"industryCode",
						utils.getCookie("industryCode")
					);
					params.append("node", "01");
					params.append("status", "05");
					common.updateTempAppInfo(params).then(res => {});
					resolve(res.data);
				}
			});
		};
	});
};

export default {
	directives: {
		TransferDom
	},
	components: {
		XDialog
	},
	data() {
		return {
			show: false,
			upName: "",
			upNo: "",
			upHidden: "",
			userIdcardFrontUrlThum: require("../assets/images/bg_idcard.jpg"),
			idcardFrontUrlThum: require("../assets/images/bg_idcard_front.jpg"),
			idcardBackUrlThum: require("../assets/images/bg_idcard_back.jpg"),
			userIdcardFrontUpHidden: "",
			idcardFrontUpHidden: "",
			idcardBackUpHidden: "",
			imgTypeUserFront: "ZL112",
			imgTypeFront: "ZL02",
			imgTypeBack: "ZL03"
		};
	},
	ready() {},
	methods: {
		goBack() {
			var industryCode = utils.getCookie("industryCode");
			var hqljb = utils.getCookie("hqljb");
			if (industryCode == "DDCP" && hqljb == "1") {
				window.location = "editablePage.html?back=1";
				return false;
			} else if (industryCode == "DDCP") {
				window.location.href =
					MWEB_PATH + "newweb/creditInfo/creditExtension.html";
			} else if (industryCode == "LDDD") {
				window.location.href = MWEB_PATH + "newweb/product/dida.html";
			} else {
				this.$router.push({ path: "/miaoDai" });
			}
		},
		close() {
			this.show = true;
			$(".close-pop-mask").css("z-index", 9999);
		},
		continueWrite() {
			this.show = false;
			$(".close-pop-mask").css("z-index", 99);
		},
		userFrontUploadImg(e) {
			var _this = this;
			console.log("_this====", _this);
			var file = e.target.files[0];
			console.log("file=====", file);
			if (file.size > 3145728) {
				_this.$vux.toast.text("上传图片不得大于3M", "middle");
				return false;
			}
			_this.$vux.loading.show({
				text: "加载中，请稍等……"
			});
			var postObj = {
				upName: _this.upName,
				upNo: _this.upNo
			};
			changeImage(this.imgTypeUserFront, postObj, file).then(data => {
				if (data.resultCode === "1") {
					_this.userIdcardFrontUrlThum =
						data.saveFilePathThum + "?t=" + Math.random();
					_this.$vux.loading.hide();
					_this.$vux.toast.show({
						position: "middle",
						text: "上传成功"
					});
				} else {
					_this.$vux.loading.hide();
					_this.errorMsg = data.resultMsg;
					_this.$vux.toast.show({
						type: "cancel",
						position: "middle",
						text: _this.errorMsg
					});
				}
			});
		},
		frontUploadImg(e) {
			var _this = this;
			console.log("_this====", _this);
			var file = e.target.files[0];
			console.log("file=====", file);
			if (file.size > 3145728) {
				_this.$vux.toast.text("上传图片不得大于3M", "middle");
				return false;
			}
			_this.$vux.loading.show({
				text: "加载中，请稍等……"
			});
			var postObj = {
				upName: _this.upName,
				upNo: _this.upNo
			};
			changeImage(this.imgTypeFront, postObj, file).then(data => {
				if (data.resultCode === "1") {
					_this.idcardFrontUrlThum =
						data.saveFilePathThum + "?t=" + Math.random();
					_this.$vux.loading.hide();
					_this.$vux.toast.show({
						position: "middle",
						text: "上传成功"
					});
				} else {
					_this.$vux.loading.hide();
					_this.errorMsg = data.resultMsg;
					_this.$vux.toast.show({
						type: "cancel",
						position: "middle",
						text: _this.errorMsg
					});
				}
			});
		},
		backUploadImg(e) {
			var _this = this;
			console.log("_this====", _this);
			var file = e.target.files[0];
			console.log("file=====", file);
			if (file.size > 3145728) {
				_this.$vux.toast.text("上传图片不得大于3M", "middle");
				return false;
			}
			_this.$vux.loading.show({
				text: "加载中，请稍等……"
			});
			var postObj = {
				upName: _this.upName,
				upNo: _this.upNo
			};
			changeImage(this.imgTypeBack, postObj, file).then(data => {
				if (data.resultCode === "1") {
					_this.idcardBackUrlThum =
						data.saveFilePathThum + "?t=" + Math.random();
					_this.$vux.loading.hide();
					_this.$vux.toast.show({
						position: "middle",
						text: "上传成功"
					});
				} else {
					_this.$vux.loading.hide();
					_this.errorMsg = data.resultMsg;
					_this.$vux.toast.show({
						type: "cancel",
						position: "middle",
						text: _this.errorMsg
					});
				}
			});
		},
		nextStep() {
			let errorMsg = "";
			console.log("this===", this);
			if (
				this.userIdcardFrontUrlThum ===
				require("../assets/images/bg_idcard.jpg")
			) {
				errorMsg = "请上传手持身份证照";
			} else if (
				this.idcardFrontUrlThum ===
				require("../assets/images/bg_idcard_front.jpg")
			) {
				errorMsg = "请上传正面照";
			} else if (
				this.idcardBackUrlThum ===
				require("../assets/images/bg_idcard_back.jpg")
			) {
				errorMsg = "请上传反面照";
			}
			if (errorMsg != "") {
				this.$vux.toast.text(errorMsg, "middle");
				return;
			}
			let postData = new URLSearchParams();
			postData.append("userName", utils.getCookie("userName"));
			postData.append("uuid", "1b5f9201-773b-4d14-8ed5-b9f4c8538730");
			common.updatePicStatus(postData).then(res => {
				if (res.data.resultCode === "1") {
					var custType = utils.getCookie("custType");
					var industryCode = utils.getCookie("industryCode");
					var hqljb = utils.getCookie("hqljb");
					if (industryCode === "DDCP" && hqljb === "1") {
						window.location = "editablePage.html?back=1";
						return false;
					}
					if (custType === "KHL2") {
						this.$router.push({ path: "/baseInfo" });
						//window.location = "collarBaseInfo.html";
					} else {
						_this.$router.push({ path: "/baseInfo" });
						window.location = "stuBaseInfo.html";
					}
				} else {
					this.errorMsg = res.data.resultMsg;
					this.$vux.toast.show({
						type: "cancel",
						position: "middle",
						text: _this.errorMsg
					});
				}
			});
		}
	},
	mounted: function() {
		let params = new URLSearchParams();
		params.append("tempAppNo", utils.getCookie("appFlowNo").split(":")[1]);
		params.append("applyFrom", "03");
		params.append("custType", utils.getCookie("custType"));
		params.append("industryCode", utils.getCookie("industryCode"));
		params.append("node", "01");
		params.append("status", "01");
		common.updateTempAppInfo(params).then(res => {});
		var appNo = unescape(utils.getCookie("appFlowNo")).split(":")[1];
		console.log("appNo=====", appNo);
		this.upName = unescape(utils.getCookie("userName"));
		this.upNo = appNo;
		let industryCode = utils.getCookie("industryCode");
		let custType = utils.getCookie("custType");
		let mobile = utils.getCookie("mobile");
		let userName = utils.getCookie("userName");
		let postData = new URLSearchParams();
		postData.append("industryCode", industryCode);
		postData.append("custType", custType);
		postData.append("mobile", mobile);
		postData.append("is_type", "N");
		postData.append("uuid", utils.uuid());
		postData.append("user_name", userName);
		postData.append("periods", 0);
		postData.append("applyFrom", "H5");
		common.checkSupportApp(postData).then(res => {
			if (res.data.resultCode == "1") {
				var userIdcardFrontUrlThum = res.data.idcard_ZL168url; //手持正面照
				var idcardFrontUrlThum = res.data.idcard_ZL02url; //身份证正面
				var idcardBackUrlThum = res.data.idcard_ZL03url; //身份证反面
				if (
					userIdcardFrontUrlThum &&
					idcardFrontUrlThum &&
					idcardBackUrlThum
				) {
					this.userIdcardFrontUrlThum =
						userIdcardFrontUrlThum + "?t=" + Math.random();
					this.userIdcardFrontUpHidden = "1";
					this.idcardFrontUrlThum =
						idcardFrontUrlThum + "?t=" + Math.random();
					this.idcardFrontUpHidden = "1";
					this.idcardBackUrlThum =
						idcardBackUrlThum + "?t=" + Math.random();
					this.idcardBackUpHidden = "1";
				}
			}
			console.log("res=======", res);
		});
	}
};
</script>
