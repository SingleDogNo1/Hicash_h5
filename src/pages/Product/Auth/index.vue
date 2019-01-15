<template>
	<div class="auth">
		<page-header
			:title="title"
			:showBack="showBack"
			:showBtnClose="showBtnClose"
			v-if="platform === 'H5'"
		></page-header>
		<div class="newActive">
			<img src="./images/newHeaderSteats1.png" alt="">
			<ul>
				<li class="active">身份认证</li>
				<li class="active">基本信息</li>
				<li class="active">信用认证</li>
			</ul>
		</div>
		<section class="creditMain">
			<div class="content front">
				<div class="tips">
					<span class="tipContent">身份证正面（卡片完整，字迹清晰）</span>
					<span class="question">
						<img src="./images/tips.png" alt="">
					</span>
				</div>
				<div class="cardImg">
					<form action="">
						<i class="addImg"></i>
						<p>身份证正面</p>
						<input type="file" name="file">
					</form>
				</div>
				<ul class="first">
					<li class="idCardName">
						<span class="title">姓名</span>
						<span class="val">张政</span>
					</li>
					<li class="idCardNo">
						<span class="title">身份证号</span>
						<span class="val">120110199309151832</span>
					</li>
				</ul>
			</div>
			<div class="content opposite">
				<div class="cardImg">
					<form action="">
						<i class="addImg"></i>
						<p>身份证反面</p>
						<input type="file" name="file">
					</form>
				</div>
				<ul class="second">
					<li class="idCardTime">
						<span class="title">有效期限</span>
						<span class="val">2018.01.12</span>
					</li>
				</ul>
			</div>
			<div class="nextStep">
				<a href="javascript:;" id="authNextBtn" onclick="">下一步</a>
			</div>
		</section>
	</div>
</template>

<style lang="scss" rel="stylesheet/scss">
@import "~bowerComponents/sass-rem/_rem.scss";
.auth {
	height: rem(800px);
	background: rgb(239, 239, 244);
	.newActive {
		width: rem(375px);
		height: rem(107px);
		background: #FC905C;
		margin-top: rem(42px);
		text-align: center;
		img {
			display: inline-block;
			width: rem(218px);
			height: rem(54px);
			margin-top: rem(16px);
		}
		ul {
			clear: both;
			width: rem(220px);
			height: rem(20px);
			margin: 0 auto;
			position: relative;
			.active {
				width: rem(56px);
				font-family: PingFangSC-Regular;
				font-size: rem(14px);
				color: #333333;
				letter-spacing: 0;
				float: left;
				margin-right: rem(26px);
			}
			.active:last-of-type {
				margin-right: rem(-26px);
			}
		}
	}
	.creditMain {
		width: 100%;
		height: rem(560px);
		padding-top: rem(32px);
		.content {
			width: 100%;
			.tips {
				width: 100%;
				height: rem(21px);
				margin-bottom: rem(20px);
				.tipContent {
					display: inline-block;
					width:100%;
					height: rem(21px);
					text-align: center;
					font-size: rem(15px);
					font-weight: normal;
					color: #333333;
					letter-spacing: rem(0px);
					line-height: rem(21px);
					opacity: 1;
				}
				.question {
					display: inline-block;
					position: relative;
					left: rem(308px);
					top: rem(-27px);
					img {
						width: rem(16px);
						height: rem(16px);
					}
				}
			}
			.cardImg {
				width: rem(207px);
				height: rem(132px);
				background: #ffffff;
				border: 1px solid #DDDDDD;
				border-radius: 4px;
				margin: auto;
				.takeIdcard {
					width: rem(207px);
					height: rem(132px);
					display: inline-block;
					margin-top: .141875rem;
					object-fit: contain;
				}
				form {
    				width: rem(207px);
					height: rem(132px);
					i {
						width: rem(43px);
						height: rem(43px);
						display: inline-block;
						position: absolute;
						left: 50%;
						top: 50%;
						margin-left: rem(-207px/2);
						margin-top: rem(-132px/2);
					}
					p {
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #999999;
						letter-spacing: 0;
						text-align: center;
						padding-top: 94px;
					}
					input {
						width: rem(207px);
						height: rem(132px);
						outline: none;
						opacity: 0;
						cursor: pointer;
					}
				}
			}
			ul {
				margin-top: rem(30px);
				margin-bottom: rem(35px);
				width: rem(375px);
				height: rem(96px);
				background: #fff;
				padding-left: rem(15px);
				li {
					width: 100%;
					height: rem(47px);
					background-color: #fff;
					font-size: rem(15px);
					color: #333333;
					clear: both;
					.title {
						width: 30%;
						height: rem(47px);
						line-height: rem(47px);
						display: block;
						float: left;
						text-align: left;
					}
					.val {
						width: calc(70% - rem(10px));
						height: rem(47px);
						line-height: rem(47px);
						display: block;
						float: right;
						text-align: right;
						padding-right: rem(30px);
					}
				}
				.idCardName {
					border-bottom: 1px solid #ddd;
				}
			}
			.second {
				border: none;
				margin-top: rem(24px);
				margin-bottom: rem(30px);
				width: rem(375px);
				height: rem(47px);
				background: #fff;
			}
		}
		.nextStep {
			width: 100%;
			height: rem(44px);
			margin-bottom: rem(30px);
			border-radius: 5px;
			text-align: center;
			a {
				display: inline-block;
				width: rem(345px);
				background-color: #333333;
				height: rem(44px);
				border-radius: rem(5px);
				font-size: rem(15px);
				line-height: rem(44px);
				color: #fff;
			}
		}
	}
}
</style>

<script>
// import {} from "vux";
import PageHeader from "@/components/PageHeader.vue";
import axios from "axios";

export default {
	components: {
		PageHeader
	}, 
	data() {
		return {
			title: this.$router.history.current.meta.title,
			showBack: true,
			showBtnClose: true,
			platform: this.utils.getPlatform()
		};
	},
	methods: {
		
	},
	mounted() {
		
	}
};
</script>
