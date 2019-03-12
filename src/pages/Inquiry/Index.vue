<template>
	<div class="break-promise" v-cloak>
		<page-header
			:title="title"
			:showBack="showBack"
			:showBtnClose="showBtnClose"
		></page-header>
		<div class="content" :class="{ appContent: platform === 'APP' }">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<!-- <swiper :show-desc-mask="false" :auto="true" :show-dots="false" :interval="5000000">
                         <swiper-item class="swiper-demo-img" v-for="(item, index) in hotNews" :key="index">
                            <a class="arrow_box swiper-slide" :href="item.newUrl" :key="index">
                                {{item.title}}
                                <span class="ico" v-if="item.marker && item.marker != ''"><img :src="require('./images/' + item.marker + '-ico.png')" /></span>
                            </a>
                        </swiper-item>
                    </swiper> -->
					<router-link
						class="arrow_box swiper-slide"
						:to="{ name: 'HotNewsDetail', query: { id: item.id } }"
						v-for="(item, index) in hotNews"
						:key="index"
					>
						<img src="./images/ad.png" alt="">
					</router-link>
				</div>
			</div>

			<flexbox class="list" :gutter="0" wrap="wrap">
				<flexbox-item :span="1/3">
					<img  src="./images/icon.png" alt="">
					<h4>饿了么</h4>
					<h5>已认证</h5>
				</flexbox-item>
				<flexbox-item :span="1/3">
					<img  src="./images/icon.png" alt="">
					<h4>饿了么</h4>
					<h5>已认证</h5>
				</flexbox-item>
				<flexbox-item :span="1/3">
					<img  src="./images/icon.png" alt="">
					<h4>饿了么</h4>
					<h5>已认证</h5>
				</flexbox-item>
				<flexbox-item :span="1/3">
					<img  src="./images/icon.png" alt="">
					<h4>饿了么</h4>
					<h5>已认证</h5>
				</flexbox-item>

			</flexbox>
		</div>
		<p class="des">丰富以上模块信息，构建您的信用体系<br />磐多拉征信提供数据支持</p>
		<page-footer v-if="platform === 'H5'"></page-footer>
	</div>
</template>

<style lang="scss">
@import "~bowerComponents/sass-rem/_rem.scss";
.Inquiry{
	background: #f5f5f5;
	.content {
		width: 100%;
		padding-top: 46px;
		background: #fff;
		.swiper-container {
			width: 100%;
			.arrow_box {
				width: 70%;
				height: auto;
				border-radius: 5px;
				position: relative;
				background: #f5f5f5;
				font-size: 0.65rem;
				display: block;
				color: #333 !important;
				.ico {
					display: block;
					position: absolute;
					top: -2px;
					left: 0;
					img {
						width: 37px;
					}
				}
			}
			.arrow_box:hover {
				color: #333 !important;
			}
			
			.swiper-slide {
				width: 90%;
				height: rem(150px);
				/* Center slide text vertically */
				display: -webkit-box;
				display: -ms-flexbox;
				display: -webkit-flex;
				display: flex;
				-webkit-box-pack: center;
				-ms-flex-pack: center;
				-webkit-justify-content: center;
				justify-content: center;
				-webkit-box-align: center;
				-ms-flex-align: center;
				-webkit-align-items: center;
				align-items: center;
				img{
					width: 100%;
				}
			}
		}
		.list{
			width: 100%;
			margin-top: rem(25px);
			.vux-flexbox-item{
				text-align: center;
				margin-bottom: rem(25px);
				img{
					margin: 0 auto;
					width: rem(70px);
				}
				h4{
					font-size: rem(14px);
					color: #666666;
					letter-spacing: 0;
					margin-top: rem(-6px);
				}
				h5{
					width: rem(54px);
					font-size: rem(12px);
					color: #23BC66;
					letter-spacing: 0;
					padding: rem(3px 0px);
					background: #E7FCEB;
					border-radius: 4px;
					margin: 0 auto;
					margin-top: rem(6px);
				}
			}
			
		}
	}
	.des{
		margin-top: rem(15px);
		font-size: rem(12px);
		color: #999999;
		letter-spacing: 0.3px;
		text-align: center;
	}
	.appContent {
		padding-bottom: 0;
	}
}
</style>

<script>
import PageHeader from "@/components/PageHeader.vue";
import PageFooter from "@/components/PageFooter.vue";
import Swiper from "swiper";
import { Flexbox, FlexboxItem } from 'vux'

export default {
	components: {
		PageHeader,
		PageFooter,
		Swiper,
		Flexbox, 
		FlexboxItem
	},
	data() {
		return {
			title: this.$route.meta.title,
			showBack: false,
			showBtnClose: false,
			name: "",
			number: "",
			loseCreditDetailList: [],
			hotNews: [],
			platform: ""
		};
	},
	methods: {
		search: function() {
			var errorMsg = "";
			if (this.name === "") {
				errorMsg = "请输入姓名";
			}
			if (this.name !== "" && this.number === "") {
				errorMsg = "请输入身份证号或手机号";
			}
			if (
				this.name !== "" &&
				this.number !== "" &&
				!this.utils.checkMobile(this.number) &&
				(this.name !== "" &&
					this.number !== "" &&
					!this.utils.checkIdCardNumber(this.number))
			) {
				errorMsg = "身份证号或手机号输入有误";
			}
			if (errorMsg != "") {
				// /this.$vux.toast.width('auto')
				this.$vux.toast.text(errorMsg, "middle");
				return;
			}

			// 请求地址

			let _params = new URLSearchParams();
			_params.append("name", this.name);
			_params.append("number", this.number);

			this.common.loseCreditInfo(_params).then(res => {
				let data = res.data;
				var storage = window.sessionStorage;

				
				storage.setItem(
					"loseCreditDetailList",
					JSON.stringify(data.loseCreditDetailList)
				);
				// 跳转到结果页
				this.$router.push({ path: "result" });
				var err_code = parseInt(data.resultCode);
				switch (err_code) {
					case 60200:
						alert("获取失信诉讼名单失败");
						break;
					case 60201:
						alert("获取失信诉讼名单请求参数无效");
						break;
					case 60202:
						alert("请输入15位或18位有效身份证号码");
						break;
					case 60203:
						alert("已经没有更多的数据了");
						break;
				}
			});
		},
		SysParam: function() {
			let _params = new URLSearchParams();
			_params.append("paramCode", "RDTJ");

			this.common.getSysParam(_params).then(res => {
				let data = res.data;
				// data.list.forEach( (val, index) => {

				//     val.newUrl = './hotNewsDetails.html?id=' + val.id;
				//     this.hotNews.push(val);
				// });
				this.hotNews = data.list;
					// var swiper = new Swiper(".swiper-container", {
					// 	slidesPerView: "auto",
					// 	autoplay: 2500
					// });
					setTimeout(function(){
						var swiper = new Swiper(".swiper-container", {
							pagination: '.swiper-pagination',
							slidesPerView: 'auto',
							centeredSlides: true,
							paginationClickable: true,
							spaceBetween: 10
						});
					}, 500)
					
					
			});
		},
		adClick: function() {
			_czc.push([
				"_trackEvent",
				"天下信用",
				"天下信用打开的次数",
				"",
				"",
				"TXXY"
			]);
			window.location.href =
				"https://m.tianxiaxinyong.cn/cooperation/common/guanjia.html?txxychannel=eWtJUHVCaGxiRWUzRllEU1pTRk5DZz09#/";
		},
		adShiXin: function() {
			// 跳转到热点新闻列表页
			this.$router.push({ path: "hotNews", query: { code: "SXAL" } });
			// window.location.href = MWEB_PATH + 'newweb/infoList/hotNewsList.html?code=SXAL'
		},
		call: function(phoneNum) {
			window.hicashJSCommunication.onCallApp(
				JSON.stringify({
					type: "h5_service",
					tell_number: String(phoneNum)
				})
			);
		}
	},
	mounted() {
		let platform = this.utils.getPlatform();
		this.platform = platform;

		// 告诉APP域名
		setTimeout(function() {
			window.hicashJSCommunication.getDomainName(
				"http://" + window.location.host + "/"
			);
		}, 3000);

		this.SysParam();

		var jsinner = $(
			'<script src="https://s95.cnzz.com/z_stat.php?id=1260767143&web_id=1260767143" language="JavaScript"><\/script>'
		);
		$("body").append(jsinner);

		window.setTimeout(function() {
			_czc.push([
				"_trackEvent",
				"失信公告",
				"记录失信公告页面打开的次数",
				"",
				"",
				"SXGG"
			]);
		}, 2000);
		var source = this.$route.query.source;
		if (source == "message") {
			window.setTimeout(function() {
				_czc.push([
					"_trackEvent",
					"通过短信进入失信页面",
					"记录通过短信进入失信页面打开的次数",
					"",
					"",
					"DXSX"
				]);
			}, 2000);
		}
		if (source == "wx") {
			window.setTimeout(function() {
				_czc.push([
					"_trackEvent",
					"通过微信进入失信页面",
					"记录通过微信进入失信页面打开的次数",
					"",
					"",
					"WXSX"
				]);
			}, 2000);
		}
	}
};
</script>
