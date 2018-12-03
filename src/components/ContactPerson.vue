<template>
	<div class="rate-calculation-body">
		<header class="credit-header">
			<!-- go-history -->
			<a class="go-history" href="javascript:;" @click="goBack"></a>
			<a
				class="go-history btn-close"
				href="javascript:;"
				@click="close"
			></a>
			<h1>基本信息</h1>
		</header>
		<div class="authentication-step">
			<img src="../assets/images/base_info_step.png" alt="" />
			<ul>
				<li class="active">身份认证</li>
				<li class="active">基本信息</li>
				<li>信用认证</li>
			</ul>
		</div>
		<p class="step-header">联系人信息</p>
		<section class="base-main">
			<div class="person-content">
				<label>直系亲属姓名</label>
				<x-input
					v-model="directRelativesName"
					name="directRelativesName"
					placeholder="请输入真实姓名"
					:show-clear="false"
				>
				</x-input>
			</div>
			<div class="person-content">
				<label>关系</label>
				<popup-picker
					:data="directRelativesRelationList"
					v-model="currentDirectRelativesRelation"
					value-text-align="right"
					:columns="4"
					@on-change="directRelativesRelationChange"
					show-name
				>
				</popup-picker>
			</div>
			<div class="person-content">
				<label>直系亲属手机号</label>
				<x-input
					v-model="directRelativesTel"
					name="directRelativesTel"
					placeholder="请输入手机号"
					:show-clear="false"
				>
				</x-input>
			</div>
		</section>
		<section class="base-main stu-contact">
			<div class="person-content">
				<label>紧急联系人姓名</label>
				<x-input
					v-model="emergencyContactName"
					name="emergencyContactName"
					placeholder="请输入真实姓名"
					:show-clear="false"
				>
				</x-input>
			</div>
			<div class="person-content">
				<label>关系</label>
				<popup-picker
					:data="emergencyContactRelationList"
					v-model="currentEmergencyContactRelation"
					value-text-align="right"
					:columns="4"
					@on-change="emergencyContactRelationChange"
					show-name
				>
				</popup-picker>
			</div>
			<div class="person-content">
				<label>紧急联系人手机</label>
				<x-input
					v-model="emergencyContactTel"
					name="emergencyContactTel"
					placeholder="请输入手机号"
					:show-clear="false"
				>
				</x-input>
			</div>
		</section>
		<section class="base-main stu-contact" v-if="isShowSpouseInfo">
			<div class="person-content">
				<label>配偶姓名</label>
				<x-input
					v-model="spouseName"
					name="spouseName"
					placeholder="请输入真实姓名"
					:show-clear="false"
				>
				</x-input>
			</div>
			<div class="person-content">
				<label>配偶手机号</label>
				<x-input
					v-model="spouseTel"
					name="spouseTel"
					placeholder="请输入手机号"
					:show-clear="false"
				>
				</x-input>
			</div>
		</section>
		<div class="next-step">
			<a href="javascript:;" @click="btnNext">下一步</a>
		</div>
		<p class="tips">您的联系人信息如有变更，请第一时间修改</p>
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
.ContactPerson {
	.rate-calculation-body {
		background: #efeff4;
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
					input {
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
import { Loading, XInput, Group, PopupPicker } from "vux";
import $ from "jquery";
import common from "@/api/common";
import utils from "@/assets/js/utils";

export default {
	components: {
		Loading,
		XInput,
		Group,
		PopupPicker
	},
	data() {
		return {
			directRelativesName: "",
			directRelativesTel: "",
			emergencyContactName: "",
			emergencyContactTel: "",
			currentDirectRelativesRelation: ["请选择"],
			currentEmergencyContactRelation: ["请选择"],
			directRelativesRelationList: [
				{ name: "请选择", value: "0000" },
				{ name: "父亲", value: "DIR1" },
				{ name: "母亲", value: "DIR2" },
				{ name: "子女", value: "DIR3" },
				{ name: "配偶", value: "DIR4" }
			],
			emergencyContactRelationList: [
				{ name: "请选择", value: "0000" },
				{ name: "父亲", value: "EMR1" },
				{ name: "母亲", value: "EMR2" },
				{ name: "子女", value: "EMR3" },
				{ name: "配偶", value: "EMR4" },
				{ name: "兄弟姐妹", value: "EMR5" },
				{ name: "同事", value: "EMR6" },
				{ name: "朋友", value: "EMR7" },
				{ name: "同学", value: "EMR8" }
			],
			isShowSpouseInfo: false,
			maritalStatus: ""
		};
	},
	ready() {},
	methods: {
		goBack() {},
		close() {},
		directRelativesRelationChange(val) {
			this.currentDirectRelativesRelation = val;
		},
		emergencyContactRelationChange(val) {
			this.currentEmergencyContactRelation = val;
		},
		btnNext() {
			let userMobile = utils.getCookie("mobile");
			let userRealName = unescape(utils.getCookie("realName"));
			let errorMsg = "";
			if (this.currentDirectRelativesRelation === "") {
				errorMsg = "直系亲属关系不能为空";
			} else if (this.currentEmergencyContactRelation === "") {
				errorMsg = "紧急联系人关系不能为空";
			} else if (!utils.checkRealName(this.directRelativesName)) {
				errorMsg = "直系亲属姓名格式不正确";
			} else if (!utils.checkMobile(this.directRelativesTel)) {
				errorMsg = "直系亲属手机号格式不正确";
			} else if (!utils.checkRealName(this.emergencyContactName)) {
				errorMsg = "紧急联系人姓名格式不正确";
			} else if (!utils.checkMobile(this.emergencyContactTel)) {
				errorMsg = "紧急联系人手机号格式不正确";
			} else if (
				this.directRelativesName === this.emergencyContactName ||
				this.directRelativesName === userRealName ||
				this.emergencyContactName === userRealName
			) {
				errorMsg = "直系亲属姓名，紧急联系人姓名，本人姓名不能相同";
			} else if (
				this.currentDirectRelativesRelation ===
				this.currentEmergencyContactRelation
			) {
				errorMsg = "直系亲属关系和紧急联系人关系不能相同";
			} else if (
				this.directRelativesTel === this.emergencyContactTel ||
				this.directRelativesTel === userMobile ||
				this.emergencyContactTel === userMobile
			) {
				errorMsg =
					"直系亲属手机号，紧急联系人手机号，本人手机号不能相同";
			} else if (this.maritalStatus === "Q001") {
				if (!utils.checkRealName(this.spouseName)) {
					errorMsg = "配偶姓名格式不正确";
					return false;
				} else if (!utils.checkMobile(this.spouseTel)) {
					errorMsg = "配偶手机号格式不正确";
					return false;
				}
				if (errorMsg == "") {
					if (
						this.spouseName === this.directRelativesName ||
						this.spouseName === this.emergencyContactName ||
						this.directRelativesName ===
							this.emergencyContactName ||
						this.directRelativesName === userRealName ||
						this.emergencyContactName === userRealName ||
						this.spouseName === userRealName
					) {
						errorMsg =
							"配偶姓名，直系亲属姓名，紧急联系人姓名，本人姓名不能相同";
					} else if (
						this.spouseTel === this.directRelativesTel ||
						this.spouseTel === this.emergencyContactTel ||
						this.directRelativesTel === this.emergencyContactTel ||
						this.directRelativesTel === userMobile ||
						this.emergencyContactTel === userMobile ||
						this.spouseTel === userMobile
					) {
						errorMsg =
							"配偶手机号码，直系亲属手机号码，紧急联系人手机号码，本人手机号码不能相同";
					}
				}
			}
			if (errorMsg !== "") {
				this.$vux.toast.text(errorMsg, "middle");
				return;
			}
			let postData = new URLSearchParams();
			postData.append("userName", utils.getCookie("userName"));
			postData.append("immediate_name", this.directRelativesName);
			postData.append(
				"immediate_relation",
				this.currentDirectRelativesRelation
			);
			postData.append("immediate_mobile", this.directRelativesTel);
			postData.append("emergency_name", this.emergencyContactName);
			postData.append(
				"emergency_relation",
				this.currentEmergencyContactRelation
			);
			postData.append("emergency_mobile", this.emergencyContactTel);
			postData.append("marital_status", this.maritalStatus);
			postData.append("spouse_name", this.spouseName);
			postData.append("spouse_mobile", this.spouseTel);
			postData.append("uuid", utils.uuid());
			this.$vux.loading.show({
				text: "认证中，请稍等……"
			});
			common.updateRelationInfo(postData).then(res => {
				if (res.data.resultCode === "1") {
					var realName = unescape(utils.getCookie("realName"));
					var identityNo = utils.getCookie("identityCode");

					var userName = utils.getCookie("userName");
					var productType = utils.getCookie("industryCode");
					let params = new URLSearchParams();
					params.append("identityNo", identityNo);
					common.queryShouQuanSuc(params).then(result => {
						if (result.data.resultCode === "1") {
							let postObj = new URLSearchParams();
							postObj.append(
								"tempAppNo",
								utils.getCookie("appFlowNo").split(":")[1]
							);
							postObj.append("applyFrom", "03");
							postObj.append(
								"custType",
								utils.getCookie("custType")
							);
							postObj.append(
								"industryCode",
								utils.getCookie("industryCode")
							);
							postObj.append("node", "05");
							postObj.append("status", "05");
							common.updateTempAppInfo(postObj).then(res => {});
							let paramsObj = new URLSearchParams();
							paramsObj.append(
								"applyAmout",
								utils.getCookie("prodetailInfo").split(":")[0]
							);
							paramsObj.append(
								"tempAppNo",
								utils.getCookie("appFlowNo").split(":")[1]
							);
							paramsObj.append("userName", userName);
							paramsObj.append("productType", productType);
							console.log("paramsObj=====", paramsObj);
							common
								.queryFirstExamineSuc(paramsObj)
								.then(result => {
									if (result.data.resultCode === "1") {
										let paramsObj = new URLSearchParams();
										paramsObj.append(
											"tempAppNo",
											utils
												.getCookie("appFlowNo")
												.split(":")[1]
										);
										paramsObj.append("applyFrom", "03");
										paramsObj.append(
											"custType",
											utils.getCookie("custType")
										);
										paramsObj.append(
											"industryCode",
											utils.getCookie("industryCode")
										);
										paramsObj.append("node", "05");
										paramsObj.append("status", "06");
										common
											.updateTempAppInfo(paramsObj)
											.then(res => {});
										console.log(
											"this.$vux.loading=====",
											this.$vux.loading
										);
										this.$vux.loading.hide();
										this.$router.push({
											path: "/mobilePhonePrv"
										});
									}
								});
						}
					});
				}
			});
		}
	},
	mounted: function() {
		var userName = utils.getCookie("userName");
		var zmFrom = utils.getQueryString("from");
		if (zmFrom === "zm") {
			this.$vux.toast.show({
				type: "cancel",
				position: "middle",
				text: "芝麻授权失败，请重新再试"
			});
		}
		if (!userName || userName == "null") {
			this.$router.push({
				path: "/login",
				query: { redirect: this.$route.fullPath }
			});
		}
		let params = new URLSearchParams();
		params.append("tempAppNo", utils.getCookie("appFlowNo").split(":")[1]);
		params.append("applyFrom", "03");
		params.append("custType", utils.getCookie("custType"));
		params.append("industryCode", utils.getCookie("industryCode"));
		params.append("node", "03");
		params.append("status", "01");
		common.updateTempAppInfo(params).then(res => {});
		let postData = new URLSearchParams();
		postData.append("uuid", "0c8297d7-6d3a-46da-b782-0df2434f88b1");
		postData.append("userName", utils.getCookie("userName"));
		common.relationInfo(postData).then(res => {
			this.directRelativesName = res.data.immediate_name;
			let currentDirectRelativesRelation = this.directRelativesRelationList.filter(
				item => {
					return item.value === res.data.immediate_relation;
				}
			);
			this.currentDirectRelativesRelation = currentDirectRelativesRelation[0].value.split();
			this.directRelativesTel = res.data.immediate_mobile;
			this.emergencyContactName = res.data.emergency_name;
			let currentEmergencyContactRelation = this.emergencyContactRelationList.filter(
				item => {
					return item.value === res.data.emergency_relation;
				}
			);
			this.currentEmergencyContactRelation = currentEmergencyContactRelation[0].value.split();
			this.emergencyContactTel = res.data.emergency_mobile;
			this.maritalStatus = res.data.marital_status;
			if (this.maritalStatus == "Q001") {
				this.isShowSpouseInfo = true;
				this.spouseName = res.data.spouse_name;
				this.spouseTel = res.data.spouse_mobile;
			} else {
				this.isShowSpouseInfo = false;
			}
		});
	}
};
</script>
