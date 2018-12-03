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
		<p class="step-header">个人信息</p>
		<section class="base-main">
			<div class="person-content">
				<label>姓名</label>
				<x-input
					v-model="userName"
					name="userName"
					placeholder="请输入真实姓名"
					:disabled="isDisabled"
					:show-clear="false"
				>
				</x-input>
			</div>
			<div class="person-content">
				<label>身份证号码</label>
				<x-input
					v-model="idCard"
					name="idCard"
					placeholder="请输入身份证号码"
					:disabled="isDisabled"
					:show-clear="false"
				>
				</x-input>
			</div>
			<div class="person-content">
				<label>婚姻状况</label>
				<popup-picker
					:data="maritalStatusList"
					v-model="currentMaritalStatus"
					value-text-align="right"
					:columns="4"
					@on-change="maritalStatusChange"
					show-name
				>
				</popup-picker>
			</div>
			<div class="person-content">
				<label>最高学历</label>
				<popup-picker
					:data="highestEducationList"
					v-model="currentHighestEducation"
					value-text-align="right"
					:columns="5"
					@on-change="highestEducationChange"
					show-name
				>
				</popup-picker>
			</div>
			<div class="person-content">
				<label>现居地址</label>
				<!-- <popup-picker :data="list" v-model="maritalStatus" value-text-align="right">
                </popup-picker> -->
				<router-link
					class="address"
					:to="{ name: 'Address', params: { from: 'address' } }"
				>
					{{ address }}
				</router-link>
				<x-icon
					type="ios-arrow-right"
					class="right-inco"
					size="34"
				></x-icon>
			</div>
			<div class="person-content">
				<label>现居详细地址</label>
				<x-input
					v-model="detailAddress"
					name="detailAddress"
					placeholder="请输入详细地址"
					:show-clear="false"
				>
				</x-input>
			</div>
			<div class="person-content">
				<label>电子邮箱</label>
				<x-input
					v-model="email"
					name="userName"
					placeholder="请输入邮箱"
					type="email"
					required
					:show-clear="false"
				>
				</x-input>
			</div>
			<div class="person-content">
				<label>借款用途</label>
				<popup-picker
					:data="loanPurposeList"
					v-model="currentLoanPurpose"
					value-text-align="right"
					:columns="10"
					@on-change="loanPurposeChange"
					show-name
				>
				</popup-picker>
			</div>
		</section>
		<!-- 单位信息 -->
		<p class="step-header">单位信息</p>
		<section class="base-main">
			<div class="person-content">
				<label>单位名称</label>
				<x-input
					v-model="companyName"
					name="companyName"
					placeholder="请输入单位名称"
					:show-clear="false"
				>
				</x-input>
			</div>
			<div class="person-content company-tel">
				<label>单位电话（需填写区号）</label>
				<x-input
					v-model="companyTel"
					name="companyTel"
					placeholder="示例：021-51234567"
					:show-clear="false"
				>
				</x-input>
			</div>
			<div class="person-content">
				<label>工作年限</label>
				<popup-picker
					:data="workYearList"
					v-model="currentWorkYear"
					value-text-align="right"
					:columns="4"
					@on-change="workYearChange"
					show-name
				>
				</popup-picker>
			</div>
			<div class="person-content">
				<label>单位行业</label>
				<popup-picker
					:data="companyIndustryList"
					v-model="currentCompanyIndustry"
					value-text-align="right"
					:columns="13"
					@on-change="companyIndustryChange"
					show-name
				>
				</popup-picker>
			</div>
			<div class="person-content">
				<label>单位地址</label>
				<!-- <popup-picker :data="list" v-model="maritalStatus" value-text-align="right">
                </popup-picker> -->
				<router-link
					class="address"
					:to="{
						name: 'Address',
						params: { from: 'companyAddress' }
					}"
				>
					{{ companyAddress }}
				</router-link>
				<x-icon
					type="ios-arrow-right"
					class="right-inco"
					size="34"
				></x-icon>
			</div>
			<div class="person-content">
				<label>单位详细地址</label>
				<x-input
					v-model="companyDetailAddress"
					name="companyDetailAddress"
					placeholder="请输入详细地址"
					:show-clear="false"
				>
				</x-input>
			</div>
		</section>
		<div class="next-step">
			<a href="javascript:;" @click="btnNext">下一步</a>
		</div>
		<p class="tips">
			您填写的基本信息如有变更，请第一时间修改若是身份证号错误或姓名错误，请在客服邮箱：kfhicash@hengyuan-finance.com留言处理
		</p>
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
.BaseInfo {
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
}
</style>

<script type="text/javascript">
import { XInput, Group, PopupPicker } from "vux";
import $ from "jquery";
import common from "@/api/common";
import utils from "@/assets/js/utils";

export default {
	components: {
		XInput,
		Group,
		PopupPicker
	},
	data() {
		return {
			isDisabled: true,
			userName: "",
			idCard: "",
			maritalStatusList: [
				{ name: "请选择", value: "0000" },
				{ name: "已婚", value: "Q001" },
				{ name: "未婚", value: "Q002" },
				{ name: "离异", value: "Q003" },
				{ name: "丧偶", value: "Q004" }
			],
			highestEducationList: [
				{ name: "请选择", value: "0000" },
				{ name: "专科", value: "EDC2" },
				{ name: "本科", value: "EDC3" },
				{ name: "硕士", value: "EDC4" },
				{ name: "博士", value: "EDC5" },
				{ name: "专科以下", value: "EDC6" }
			],
			currentMaritalStatus: ["请选择"],
			currentHighestEducation: ["请选择"],
			currentLoanPurpose: ["请选择"],
			currentWorkYear: ["请选择"],
			currentCompanyIndustry: ["请选择"],
			detailAddress: "",
			email: "",
			loanPurposeList: [
				{ name: "请选择", value: "0000" },
				{ name: "装修", value: "JK01" },
				{ name: "家具家居", value: "JK02" },
				{ name: "家用电器", value: "JK03" },
				{ name: "教育", value: "JK04" },
				{ name: "健康医疗", value: "JK05" },
				{ name: "旅游", value: "JK06" },
				{ name: "日常消费", value: "JK07" },
				{ name: "租房", value: "JK010" },
				{ name: "手机数码", value: "JK011" },
				{ name: "婚庆", value: "JK012" }
			],
			companyName: "",
			companyTel: "",
			workYearList: [
				{ name: "请选择", value: "0000" },
				{ name: "&lt;1年以下&gt;", value: "GZN1" },
				{ name: "&lt;1年至3年&gt;", value: "GZN2" },
				{ name: "&lt;3年至5年&gt;", value: "GZN3" },
				{ name: "&lt;5年以上&gt;", value: "GZN4" }
			],
			companyIndustryList: [
				{ name: "请选择", value: "0000" },
				{ name: "计算机/互联网/通信/电子", value: "UNHY1" },
				{ name: "会计/金融/银行/保险", value: "UNHY2" },
				{ name: "房地产/建筑", value: "UNHY3" },
				{ name: "贸易/批发/零售/租赁业", value: "UNHY4" },
				{ name: "文化/传媒/娱乐/体育", value: "UNHY5" },
				{ name: "生产/加工/制造", value: "UNHY6" },
				{ name: "能源/矿产/环保", value: "UNHY7" },
				{ name: "政府/非赢利机构/其他;", value: "UNHY8" },
				{ name: "专业咨询/机构培训", value: "UNHY9" },
				{ name: "交通/运输/物流/仓储", value: "UNHY10" },
				{ name: "服务业", value: "UNHY11" },
				{ name: "文体教育/工艺美术", value: "UNHY12" },
				{ name: "农/林/牧/渔/其他", value: "UNHY13" }
			],
			companyDetailAddress: "",
			address: "",
			companyAddress: "",
			province: "",
			city: "",
			area: "",
			unitProvince: "",
			unitCity: "",
			unitArea: ""
		};
	},
	ready() {},
	methods: {
		goBack() {},
		close() {},
		maritalStatusChange(val) {
			console.log("val====", val);
			this.currentMaritalStatus = val;
		},
		highestEducationChange(val) {
			this.currentHighestEducation = val;
		},
		loanPurposeChange(val) {
			this.currentLoanPurpose = val;
		},
		workYearChange(val) {
			this.currentWorkYear = val;
		},
		companyIndustryChange(val) {
			this.currentCompanyIndustry = val;
		},
		btnNext() {
			let errorMsg = "";
			if (this.currentMaritalStatus[0] === "0000") {
				errorMsg = "婚姻状况不能为空";
			} else if (this.detailAddress === "") {
				errorMsg = "现居详细地址不能为空";
			} else if (this.companyName === "") {
				errorMsg = "单位名称不能为空";
			} else if (this.currentHighestEducation[0] === "0000") {
				errorMsg = "最高学历不能为空";
			} else if (this.currentLoanPurpose[0] === "0000") {
				errorMsg = "借款用途不能为空";
			} else if (this.currentWorkYear[0] === "0000") {
				errorMsg = "工作年限不能为空";
			} else if (this.currentCompanyIndustry[0] === "0000") {
				errorMsg = "单位行业不能为空";
			} else if (this.address === "") {
				errorMsg = "请选择现居地址";
			} else if (this.companyAddress === "") {
				errorMsg = "请选择单位地址";
			} else if (!utils.checkIdCardNumber(this.idCard)) {
				errorMsg = "身份证号格式不正确";
			} else if (!utils.checkEmail(this.email)) {
				errorMsg = "电子邮箱格式不正确";
			} else if (!utils.checkRealName(this.userName)) {
				errorMsg = "真实姓名格式不正确";
			} else if (!utils.checkAearTel(this.companyTel)) {
				errorMsg = "单位电话格式不正确";
			}
			if (errorMsg !== "") {
				this.$vux.toast.text(errorMsg, "middle");
				return;
			}
			let postData = new URLSearchParams();
			postData.append("userName", utils.getCookie("userName"));
			postData.append("real_name", this.userName);
			postData.append("id_no", this.idCard);
			postData.append("marital_status", this.currentMaritalStatus);
			postData.append("education_code", this.currentHighestEducation);
			postData.append("province", this.province);
			postData.append("city", this.city);
			postData.append("area", this.area);
			postData.append("address", this.address);
			postData.append("email", this.email);
			postData.append("unit_name", this.companyName);
			postData.append("unit_phone_area", this.companyTel.split("-")[0]);
			postData.append("unit_phone", this.companyTel.split("-")[1]);
			postData.append("work_year", this.currentWorkYear);
			postData.append("unit_province", this.unitProvince);
			postData.append("unit_city", this.unitCity);
			postData.append("unit_area", this.unitArea);
			postData.append("unit_address", this.companyDetailAddress);
			postData.append("unit_properties", this.currentCompanyIndustry);
			postData.append("loan_purpose", this.currentLoanPurpose);
			postData.append("uuid", utils.uuid());
			common.updateCollarPersonInfo(postData).then(res => {
				if (res.data.resultCode === "1") {
					utils.setCookie("realName", escape(this.userName));
					utils.setCookie("identityCode", this.idCard);
					utils.setCookie(
						"homeAddress",
						escape(
							this.address.replace("/", "").replace("/", "") +
								this.detailAddress
						)
					);
					utils.setCookie(
						"workAddress",
						escape(
							this.companyAddress
								.replace("/", "")
								.replace("/", "") + this.companyDetailAddress
						)
					);
					this.$router.push({ path: "/contactPerson" });
				} else if (res.data.resultCode == "60100") {
					this.$vux.toast.text(res.data.resultMsg);
					var source = utils.getCookie("source");
					var vipCount = utils.getCookie("vipCount");
					utils.clearCookie();
					if (vipCount && vipCount == "0") {
						utils.setCookie("vipCount", "1");
					}
					if (source == "APP") {
						setCookie("source", "APP");
						this.$router.push({
							path: "/login",
							query: {
								redirect: _this.$route.fullPath,
								source: "APP"
							}
						});
					} else {
						this.$router.push({
							path: "/login",
							query: { redirect: _this.$route.fullPath }
						});
					}
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
					params.append("node", "02");
					params.append("status", "05");
					common.updateTempAppInfo(params).then(res => {});
				}
			});
		}
	},
	mounted: function() {
		var userName = utils.getCookie("userName");
		if (!userName || userName === "null") {
			this.$router.push({
				path: "/login",
				query: { redirect: this.$route.fullPath }
			});
		}
		let postData = new URLSearchParams();
		postData.append(
			"tempAppNo",
			utils.getCookie("appFlowNo").split(":")[1]
		);
		postData.append("applyFrom", "03");
		postData.append("custType", utils.getCookie("custType"));
		postData.append("industryCode", utils.getCookie("industryCode"));
		postData.append("node", "02");
		postData.append("status", "01");
		common.updateTempAppInfo(postData).then(res => {});
		let params = new URLSearchParams();
		params.append("uuid", "0c8297d7-6d3a-46da-b782-0df2434f88b1");
		params.append("userName", utils.getCookie("userName"));
		common.collarPersonInfo(params).then(res => {
			if (res.data.resultCode === "1") {
				if (
					!res.data.real_name ||
					!res.data.id_no ||
					res.data.real_name == "" ||
					res.data.id_no == ""
				) {
					this.isDisabled = false;
				} else {
					this.userName = res.data.real_name;
					this.idCard = res.data.id_no;
					if (res.data.marital_status) {
						let currentMaritalStatus = this.maritalStatusList.filter(
							item => {
								return item.value === res.data.marital_status;
							}
						);
						this.currentMaritalStatus = currentMaritalStatus[0].value.split();
					}
					if (res.data.education_code) {
						let currentHighestEducation = this.highestEducationList.filter(
							item => {
								return item.value === res.data.education_code;
							}
						);
						this.currentHighestEducation = currentHighestEducation[0].value.split();
					}
					// if(res.data.province&&data.province_name&&data.city&&data.city_name&&
					// data.area&&data.area_name){

					// }
					if (res.data.loan_purpose) {
						let currentLoanPurpose = this.loanPurposeList.filter(
							item => {
								return item.value === res.data.loan_purpose;
							}
						);
						this.currentLoanPurpose = currentLoanPurpose[0].value.split();
					}
					if (res.data.address) {
						this.detailAddress = res.data.address;
					}
					if (res.data.email) {
						this.email = res.data.email;
					}
					if (res.data.unit_name) {
						this.companyName = res.data.unit_name;
					}
					if (res.data.unit_phone_area && res.data.unit_phone) {
						this.companyTel =
							res.data.unit_phone_area +
							"-" +
							res.data.unit_phone;
					}
					if (res.data.work_year) {
						let currentWorkYear = this.workYearList.filter(item => {
							return item.value === res.data.work_year;
						});
						this.currentWorkYear = currentWorkYear[0].value.split();
					}
					if (res.data.unit_properties) {
						let currentCompanyIndustry = this.companyIndustryList.filter(
							item => {
								return item.value === res.data.unit_properties;
							}
						);
						this.currentCompanyIndustry = currentCompanyIndustry[0].value.split();
					}
					if (res.data.unit_address) {
						this.companyDetailAddress = res.data.unit_address;
					}
					if (
						res.data.province &&
						res.data.province_name &&
						res.data.city &&
						res.data.city_name &&
						res.data.area &&
						res.data.area_name
					) {
						this.address =
							res.data.province_name +
							"/" +
							res.data.city_name +
							"/" +
							res.data.area_name;
						this.province = res.data.province;
						this.city = res.data.city;
						this.area = res.data.area;
					}
					if (
						res.data.unit_province &&
						res.data.unit_province_name &&
						res.data.unit_city &&
						res.data.unit_city_name &&
						res.data.unit_area &&
						res.data.unit_area_name
					) {
						this.companyAddress =
							res.data.unit_province_name +
							"/" +
							res.data.unit_city_name +
							"/" +
							res.data.unit_area_name;
						this.unitProvince = res.data.unit_province;
						this.unitCity = res.data.unit_city;
						this.unitArea = res.data.unit_area;
					}
					var back = this.$route.query.back;
					switch (back) {
						case "address":
							var address = utils.getCookie("chooseAddName");
							this.address = address;
							break;
						case "companyAddress":
							var companyAddress = utils.getCookie(
								"chooseAddName"
							);
							this.companyAddress = companyAddress;
							break;
					}
				}
			}
		});
	}
};
</script>
