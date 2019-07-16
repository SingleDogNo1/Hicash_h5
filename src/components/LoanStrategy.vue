<template>
	<div class="loan-strategy-body">
		<!-- header -->
		<header class="credit-header">
			<a class="go-history" href="javascript:history.go(-1);"></a>
			<h1>借款攻略</h1>
		</header>
		<!-- header -->
		<div class="container">
			<div class="teach-top"></div>
			<p class="teach-banner"></p>
			<div class="teach-content">
				<div class="step1">
					<div class="content">
						<span>本人申请</span>
						<p>嗨钱网的所有订单只支持本人申请;</p>
						<p>手机必须实名制、银行卡及支付宝账号</p>
						<p>都必须是本人且与嗨钱网账户信息一致。</p>
					</div>
				</div>
				<div class="step2">
					<div class="content">
						<span>资料真实有效</span>
						<p>身份、工作、住址必须真实有效，</p>
						<p>切忌随意填写、凑数瞎写。</p>
						<p>要知道真实的资料换来的是更高的通过率。</p>
					</div>
				</div>
				<div class="step3">
					<div class="content">
						<span>手机运营商认证</span>
						<p>服务密码很重要，如不确定可致电运营商确</p>
						<p>认。移动：10086；电信：10000；联通：</p>
						<p>10010运营商认证时短信验证码切勿填错，</p>
						<p>认证成功，更快借款!</p>
					</div>
				</div>
				<div class="step4">
					<div class="content">
						<span>信用认证</span>
						<p>芝麻信用认证时注意手机号、</p>
						<p>身份证信息与嗨钱网账户信息一致，</p>
						<p>滴滴认证注意你的滴滴密码。</p>
						<p>多种信用认证，助你更快通过审核、信用额</p>
						<p>度更高。</p>
					</div>
				</div>
				<div class="step5">
					<div class="content">
						<span>银行卡认证</span>
						<p>关键一步，关系到钱是否准确打到你账上，</p>
						<p>银行预留手机千万要核实再填。</p>
						<p>身份证千万要核准，手抖输错就尴尬了。</p>
					</div>
				</div>
				<div class="step6">
					<div class="content">
						<span>电话审核</span>
						<p>在你的申请提交后，</p>
						<p>会接到嗨钱软妹的电话与你核实一些资料</p>
						<p>信息。</p>
						<p>如果你的手机自带或装有一些拦截软件，</p>
						<p>请先关闭，以免错过审核电话影响你的借</p>
						<p>款成功性。</p>
					</div>
				</div>
				<p class="teach-right"></p>
				<p class="teach-left"></p>
				<p class="teach-top"></p>
				<p class="teach-bottom"></p>
			</div>
		</div>
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.loan-strategy-body {
	width: 100%;
	height: auto;
	background-color: #fff;
	.credit-header {
		border: 0;
	}
	.container {
		width: 100%;
		padding-bottom: 0;
		min-height: 100%;
		margin-top: 2.2rem;
		.teach-top {
			width: 100%;
			height: 7.125rem;
			background: url(../assets/images/bg_teach_top.jpg) no-repeat;
			background-size: cover;
		}
		.teach-banner {
			width: 100%;
			height: 7.125rem;
			background: url(../assets/images/bg_teach_banner.jpg) no-repeat;
			background-size: cover;
		}
		.teach-content {
			position: relative;
			padding: 0 1rem;
			margin-top: 1.25rem;
			padding-bottom: 1.1rem;
			.step1,
			.step2,
			.step3,
			.step4,
			.step5,
			.step6 {
				width: 14.125rem;
				height: 6.3rem;
				background: url(../assets/images/bg_teach_step1.png) no-repeat;
				background-size: cover;
				.content {
					margin-left: 2.65rem;
					span {
						font-weight: bold;
						color: #3f3f3f;
						font-size: 0.6rem;
						margin-top: 0.7rem;
						display: inline-block;
						margin-bottom: 0.4rem;
					}
					p {
						font-size: 0.5rem;
						line-height: 0.6rem;
						color: #3f3f3f;
					}
				}
			}
			.step2 {
				position: relative;
				width: 14.125rem;
				height: 6.3rem;
				background: url(../assets/images/bg_teach_step2.png) no-repeat;
				background-size: cover;
				z-index: 5;
				.content {
					p,
					span {
						color: #fff;
					}
				}
			}
			.step3 {
				width: 14.125rem;
				height: 6.3rem;
				background: url(../assets/images/bg_teach_step3.png) no-repeat;
				background-size: cover;
			}
			.step4 {
				width: 14.125rem;
				height: 6.3rem;
				background: url(../assets/images/bg_teach_step4.png) no-repeat;
				background-size: cover;
				.content {
					p,
					span {
						color: #fff;
					}
				}
			}
			.step5 {
				width: 14.125rem;
				height: 6.3rem;
				background: url(../assets/images/bg_teach_step5.png) no-repeat;
				background-size: cover;
			}
			.step6 {
				position: relative;
				width: 14.125rem;
				height: 7rem;
				background: url(../assets/images/bg_teach_step6.png) no-repeat;
				background-size: 100% 100%;
				z-index: 5;
				.content {
					p,
					span {
						color: #fff;
					}
				}
			}
			.teach-right {
				position: absolute;
				background: url(../assets/images/bg_teach_right.png) no-repeat;
				width: 3.65rem;
				height: 10.325rem;
				background-size: cover;
				right: 0;
				top: 5.5rem;
			}
			.teach-left {
				position: absolute;
				background: url(../assets/images/bg_teach_left.png) no-repeat;
				width: 3.575rem;
				height: 6.025rem;
				background-size: cover;
				left: 0;
				bottom: 0;
			}
			.teach-top {
				top: -0.7rem;
				right: 0.4rem;
				position: absolute;
				background: url(../assets/images/bg_teach_start.png) no-repeat;
				width: 0.525rem;
				height: 0.95rem;
				background-size: cover;
			}
			.teach-bottom {
				top: 11rem;
				left: 0.4rem;
				position: absolute;
				background: url(../assets/images/bg_teach_start.png) no-repeat;
				width: 0.525rem;
				height: 0.95rem;
				background-size: cover;
			}
		}
	}
}
</style>

<script type="text/javascript">
import {
	Loading,
	XDialog,
	XButton,
	Popup,
	Group,
	Checker,
	CheckerItem,
	TransferDomDirective as TransferDom
} from "vux"
import $ from "jquery"
import common from "@/api/common"
import utils from "@/assets/js/utils"

export default {
	components: {
		Loading,
		XDialog,
		XButton,
		Popup,
		Group,
		Checker,
		CheckerItem
	},
	data() {
		return {}
	},
	ready() {},
	methods: {},
	mounted: function() {
		var comefrom = this.$route.query.comefrom
		if (comefrom == "APP") {
			$("header").hide()
			$(".container").css("margin-top", "0px")
		}
	}
}
</script>
