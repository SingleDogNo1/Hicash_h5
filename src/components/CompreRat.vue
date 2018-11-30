<template>
	<div>
		<!-- header -->
		<header class="credit-header">
			<a class="go-history" href="JavaScript:history.back(-1)"></a>
			<h1>综合评级FAQ</h1>
		</header>
		<section class="container">
			<span class="block"></span>
			<div class="content">
				<p class="title">
					感谢您使用嗨钱产品，嗨钱【综合评级】是为了更好的在您借贷过程中提供服务所建立的用户体系。
				</p>
				<!-- 未获得评级noGrade -->
				<span class="no-grade">您尚未获得评级</span>
				<!-- 获得评级 hasGrade-->
				<div class="has-grade" style="display:none">
					<p>您当前在嗨钱的综合评级为</p>
					<span>B</span>
				</div>
				<p>如何提升综合评级：</p>
				<p>
					我们将依据您每次的借贷金额、借贷周期等信息对您的借贷行为进行记录。
				</p>
				<p>我们建议您在每次借贷时：</p>
				<p>1. 提供的详尽、真实的个人信息</p>
				<p>2. 按时对每期应还金额进行还款</p>
				<p class="goods">综合评级的用处：</p>
				<p>当您的综合评级提高时，您在借贷过程中：</p>
				<p>1. 拥有更高的贷款审批通过率</p>
				<p>2. 享有更低的贷款综合费率</p>
			</div>
			<div class="btn-i-know">
				<router-link :to="{ name: 'Personal' }"> 我知道了 </router-link>
			</div>
		</section>
		<!-- header -->
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
.credit-header {
	border: none;
	.go-history {
		left: 0.85rem;
	}
	.go-history:before {
		color: #3f3f3f;
	}
	h1 {
		font-size: 0.75rem;
		height: 2.2rem;
		line-height: 2.2rem;
		font-weight: normal;
		color: #3f3f3f;
		width: 100%;
		text-align: center;
	}
}
.container {
	color: #666;
	font-size: 0.6rem;
	margin-top: 2.2rem;
	.block {
		display: block;
		height: 0.5rem;
		background: #f5f5f5;
	}
	.content {
		padding: 0.6rem 0.75rem;
		background: #fff;
		p {
			line-height: 1.4rem;
			width: 14rem;
		}
		.title {
			width: 14rem;
			line-height: 1.4rem;
		}
		.no-grade {
			width: 13.85rem;
			height: 4.25rem;
			background: -moz-linear-gradient(top, #fd7f5f 0%, #fc915c 100%);
			background: -webkit-gradient(
				linear,
				left top,
				left bottom,
				color-stop(0%, #fd7f5f),
				color-stop(100%, #fc915c)
			);
			background: -webkit-linear-gradient(top, #fd7f5f 0%, #fc915c 100%);
			background: -o-linear-gradient(top, #fd7f5f 0%, #fc915c 100%);
			background: -ms-linear-gradient(top, #fd7f5f 0%, #fc915c 100%);
			background: linear-gradient(to bottom, #fd7f5f 0%, #fc915c 100%);
			border-radius: 0.3rem;
			display: block;
			text-align: center;
			line-height: 4.25rem;
			color: #fff;
			font-size: 0.75rem;
			margin: 0.7rem auto;
		}
		.has-grade {
			width: 13.85rem;
			height: 4.25rem;
			background: -moz-linear-gradient(top, #fd7f5f 0%, #fc915c 100%);
			background: -webkit-gradient(
				linear,
				left top,
				left bottom,
				color-stop(0%, #fd7f5f),
				color-stop(100%, #fc915c)
			);
			background: -webkit-linear-gradient(top, #fd7f5f 0%, #fc915c 100%);
			background: -o-linear-gradient(top, #fd7f5f 0%, #fc915c 100%);
			background: -ms-linear-gradient(top, #fd7f5f 0%, #fc915c 100%);
			background: linear-gradient(to bottom, #fd7f5f 0%, #fc915c 100%);
			border-radius: 0.3rem;
			display: block;
			text-align: center;
			line-height: 4.25rem;
			color: #fff;
			font-size: 0.75rem;
			margin: 0.7rem auto;
		}
		.goods {
			margin-top: 1rem;
		}
	}
	.btn-i-know {
		text-align: center;
		padding-top: 1rem;
		padding-bottom: 1.5rem;
		background: #fff;
		a {
			width: 14.7rem;
			height: 1.9rem;
			background: #ff7640;
			border-radius: 0.25rem;
			display: inline-block;
			line-height: 1.9rem;
			color: #fff;
			text-align: center;
		}
	}
}
.weui-tab__panel {
	padding-bottom: 0 !important;
}
</style>

<script type="text/javascript">
import { Tab, TabItem, XInput, XButton, Toast, CheckIcon } from "vux";
import $ from "jquery";
import common from "@/api/common";
import utils from "@/assets/js/utils";

export default {
	components: {
		Tab,
		TabItem,
		XInput,
		XButton,
		Toast,
		CheckIcon
	},
	data() {
		return {};
	},
	ready() {},
	methods: {},
	mounted: function() {
		var _this = this;
		common.getImgCode().then(res => {
			// 图片验证码
			_this.authPic = "data:image/jpg;base64," + res.data.authPic;
			_this.authId = res.data.authId;
			console.log("res====", res);
		});
		var userName = utils.getCookie("userName");
		var inviteCode = utils.getCookie("inviteCode");
		if (inviteCode) {
			_this.inviteCode = inviteCode;
		}
	}
};
</script>
