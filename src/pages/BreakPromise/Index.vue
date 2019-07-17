<template>
	<div class="break-promise" v-cloak>
		<download-pop
			v-if="this.utils.getPlatform() != 'APP' && mediasource !== 'pandoraKNSSJ'"
		></download-pop>
		<page-header
			:title="title"
			:showBack="showBack"
			:showBtnClose="showBtnClose"
		></page-header>
		<div class="content" :class="{ appContent: platform === 'APP' }">
			<div class="loan">
				<img src="./images/bg_broke_promise.png" width="100%" />
			</div>

			<div class="hot-wrap">
				<p>
					<span>热点推荐</span>
					<router-link :to="{ name: 'HotNews' }">更多</router-link>
				</p>
			</div>

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
						{{ item.title }}
						<span class="ico" v-if="item.marker && item.marker != ''"
							><img :src="require('./images/' + item.marker + '-ico.png')"
						/></span>
					</router-link>
				</div>
			</div>

			<div class="search-wrap">
				<div class="search-form">
					<p class="search-form-tips">
						本专区为您提供全面准确的个人财务状况，您可以通过输入<span class="pink"
							>“姓名” + “身份证号码”</span
						>或<span class="pink">“姓名” + “手机号码”</span
						>进行查询，便于您及时掌握相关信息。
					</p>
					<input
						v-model="name"
						class="name"
						type="text"
						name="name"
						placeholder="姓名"
						maxlength="10"
					/>
					<input
						v-model="number"
						class="tel"
						type="text"
						name="tel"
						placeholder="身份证号/手机号"
						maxlength="20"
					/>
					<button @click="search" class="btn-search" name="search">查询</button>
					<p class="advice-info" @click="call('4000205566')">
						如有任何疑问<br />可拨打<a class="btn-tel" data-href="4000205566"
							>400-020-5566</a
						>咨询
					</p>
				</div>
			</div>
			<div class="loan" title="失信案例库">
				<img @click="adShiXin" :src="cdnShixinCasePath" width="100%" />
			</div>
			<div class="loan" title="贷款超市">
				<img @click="adClick" src="./images/ad.png" width="100%" />
			</div>
		</div>
		<page-footer v-if="platform === 'H5'"></page-footer>
	</div>
</template>

<style lang="scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";
.content {
	width: 100%;
	padding-bottom: 1.8rem;
	padding-top: rem(50px);
	background: #fff;
	.loan {
		width: 100%;
		height: auto;
	}
	.hot-wrap {
		width: 90%;
		border-radius: 8px;
		margin: 0.5rem auto 1rem auto;
		font-size: 0.53rem;
		p {
			width: 100%;
			height: 0.75rem;
			margin-bottom: 0.75rem;
			span {
				display: block;
				float: left;
				font-weight: bold;
				color: #333;
			}
			a {
				display: block;
				float: right;
				color: #999;
			}
		}
		&:after {
			content: " ";
			clear: both;
		}
	}
	.swiper-container {
		width: 90%;
		margin: 0 auto;
		.arrow_box {
			width: 80%;
			height: auto;
			padding: 0 14px;
			border-radius: 5px;
			position: relative;
			background: #f5f5f5;
			font-size: 0.65rem;
			margin-right: 30px !important;
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
		.arrow_box:after {
			right: -8px;
			bottom: -15px;
			border: solid transparent;
			content: " ";
			height: 0;
			width: 0;
			position: absolute;
			pointer-events: none;
			border-color: rgba(136, 183, 213, 0);
			border-left-color: #f5f5f5;
			border-width: 15px;
			transform: rotate(135deg);
			-ms-transform: rotate(135deg);
			/* IE 9 */
			-moz-transform: rotate(135deg);
			/* Firefox */
			-webkit-transform: rotate(135deg);
			/* Safari 和 Chrome */
			-o-transform: rotate(135deg);
		}
		.swiper-slide {
			width: 62% !important;
			height: 72px !important;
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
		}
	}
	.search-wrap {
		width: 90%;
		border-radius: 8px;
		background: #f5f5f5;
		margin: 1rem auto;
		.search-form {
			padding: 0.75rem;
			.search-form-tips {
				width: 100%;
				margin: 0 auto;
				font-size: 0.53rem;
				line-height: 0.888889rem;
				color: #333;
			}
			.pink {
				color: #f28bb1;
			}
			.name {
				display: block;
				width: 95%;
				height: 1.96rem;
				margin-top: 0.5rem;
				padding-left: 0.56rem;
				border: 1px solid #ccc;
				border-radius: 5px;
				font-size: 14px;
			}
			.tel {
				display: block;
				width: 95%;
				height: 1.96rem;
				margin-top: 0.44rem;
				padding-left: 0.56rem;
				border: 1px solid #ccc;
				border-radius: 5px;
				font-size: 14px;
			}
			.btn-search {
				display: block;
				width: 100%;
				height: 1.96rem;
				margin-top: 0.5rem;
				background: #fd87bf;
				border: none;
				border-radius: 5px;
				color: #fff;
				font-size: 0.65rem;
			}
			.advice-info {
				width: 100%;
				margin-top: 0.5rem;
				font-size: 0.53rem;
				color: #999;
				text-align: center;
			}
		}
	}
}
.appContent {
	padding-bottom: 0;
}
</style>

<script>
import PageHeader from "@/components/PageHeader.vue"
import PageFooter from "@/components/PageFooter.vue"
import downloadPop from "@/components/downloadPop.vue"
import Swiper from "swiper"

export default {
	components: {
		PageHeader,
		PageFooter,
		downloadPop,
		Swiper
	},
	data() {
		return {
			title: "失信专区",
			showBack: false,
			showBtnClose: false,
			name: "",
			number: "",
			loseCreditDetailList: [],
			hotNews: [],
			platform: "",
			//cdnBrokePromisePath: this.config.cdn_pic_path + 'applogo/shixin/bg_broke_promise.png',
			cdnShixinCasePath: this.config.cdn_pic_path + "applogo/shixin/ad_shixin.png",
			cdnAdPath: this.config.cdn_pic_path + "applogo/shixin/ad.png",
			mediasource: ""
		}
	},
	methods: {
		search: function() {
			var errorMsg = ""
			if (this.name === "") {
				errorMsg = "请输入姓名"
			}
			if (this.name !== "" && this.number === "") {
				errorMsg = "请输入身份证号或手机号"
			}
			if (
				this.name !== "" &&
				this.number !== "" &&
				!this.utils.checkMobile(this.number) &&
				(this.name !== "" &&
					this.number !== "" &&
					!this.utils.checkIdCardNumber(this.number))
			) {
				errorMsg = "身份证号或手机号输入有误"
			}
			if (errorMsg != "") {
				// /this.$vux.toast.width('auto')
				this.$vux.toast.text(errorMsg, "middle")
				return
			}

			// 请求地址

			let _params = new URLSearchParams()
			_params.append("name", this.name)
			_params.append("number", this.number)

			this.common.loseCreditInfo(_params).then(res => {
				let data = res.data
				var storage = window.sessionStorage

				// data = {
				//     "loseCreditDetailList":  [{
				//     "hyApplicationNo": "31801092600003",
				//     "productName": "滴答贷",
				//     "applyPeriod": "1",
				//     "contractAmount": "500.00元",
				//     "sxType": "1",
				//     "invUsername": "david_fu",
				//     "sxButton": "",
				//     "button": "ss",
				//     "overDueFlag": "0",
				//     "noticeTitle": "点击查看：《诉讼文书》",
				//     "noticeDetail": "关于李文月逾期欠款处置详情",
				//     "detailList": [{
				//         "bigTitle": "诉讼文书",
				//         "type": "SS",
				//         "picBeforeText": "图片前文字图片前文字图片前文字图片前文字图片前文字图片前文字图片前文字图片前文字图片前文字图片前文字图片前文字图片前文字",
				//         "picBeforeUrl": "图片前文字点击链接",
				//         "picList": [{
				//             "picUrl": "/product_pic/blackuser/20180927/20180927104833/31801092600003_1_1.jpg",
				//             "picPrefix": "http://file.dev.guolidai.xin/"
				//         }, {
				//             "picUrl": "/product_pic/blackuser/20180927/20180927141424/31801092600003/31801092600003_1_1.jpg",
				//             "picPrefix": "http://file.dev.guolidai.xin/"
				//         }, {
				//             "picUrl": "/product_pic/blackuser/20180927/20180927141424/31801092600003/31801092600003_1_2.jpg",
				//             "picPrefix": "http://file.dev.guolidai.xin/"
				//         }, {
				//             "picUrl": "/product_pic/blackuser/20180927/20180927141424/31801092600003/31801092600003_1_3.jpg",
				//             "picPrefix": "http://file.dev.guolidai.xin/"
				//         }],
				//         "picAfterText": "图片后文字图片后文字图片后文字图片后文字图片后文字图片后文字图片后文字图片后文字图片后文字图片后文字图片后文字图片后文字",
				//         "picAfterTextList": [{
				//             "text": "11111"
				//         }, {
				//             "text": "22222"
				//         }]

				//     },
				//     {
				//         "bigTitle": "仲裁文书",
				//         "type": "ZC",
				//         "picList": [{
				//             "picUrl": "/product_pic/blackuser/20180927/20180927141424/31801092600003/31801092600003_1_3.jpg",
				//             "picPrefix": "http://file.dev.guolidai.xin/"
				//         }, {
				//             "picUrl": "/product_pic/blackuser/20180927/20180927141424/31801092600003/31801092600003_1_1.jpg",
				//             "picPrefix": "http://file.dev.guolidai.xin/"
				//         }, {
				//             "picUrl": "/product_pic/blackuser/20180927/20180927141424/31801092600003/31801092600003_1_2.jpg",
				//             "picPrefix": "http://file.dev.guolidai.xin/"
				//         }, {
				//             "picUrl": "/product_pic/blackuser/20180927/20180927104833/31801092600003_1_1.jpg",
				//             "picPrefix": "http://file.dev.guolidai.xin/"
				//         }]
				//     }]
				// }],
				//  "resultCode": "1",
				// "resultMsg": "SUCCESS"
				// }

				storage.setItem(
					"loseCreditDetailList",
					JSON.stringify(data.loseCreditDetailList)
				)
				// 跳转到结果页
				this.$router.push({ path: "result" })
				var err_code = parseInt(data.resultCode)
				switch (err_code) {
					case 60200:
						alert("获取失信诉讼名单失败")
						break
					case 60201:
						alert("获取失信诉讼名单请求参数无效")
						break
					case 60202:
						alert("请输入15位或18位有效身份证号码")
						break
					case 60203:
						alert("已经没有更多的数据了")
						break
				}
			})
		},
		SysParam: function() {
			let _params = new URLSearchParams()
			_params.append("paramCode", "RDTJ")

			this.common.getSysParam(_params).then(res => {
				let data = res.data
				// data.list.forEach( (val, index) => {

				//     val.newUrl = './hotNewsDetails.html?id=' + val.id;
				//     this.hotNews.push(val);
				// });
				this.hotNews = data.list
				setTimeout(() => {
					var swiper = new Swiper(".swiper-container", {
						slidesPerView: "auto",
						autoplay: 2500
					})
				}, 500)
			})
		},
		adClick: function() {
			_czc.push(["_trackEvent", "贷款超市", "贷款超市打开的次数", "", "", "DKCS"])
			window.location.href =
				"http://www.guoxinbao.com.cn/h5_hq_index.html?mobile=18518206648&source=sxzq"
		},
		adShiXin: function() {
			// 跳转到热点新闻列表页
			this.$router.push({ path: "hotNews", query: { code: "SXAL" } })
			// window.location.href = MWEB_PATH + 'newweb/infoList/hotNewsList.html?code=SXAL'
		},
		call: function(phoneNum) {
			window.hicashJSCommunication.onCallApp(
				JSON.stringify({
					type: "h5_service",
					tell_number: String(phoneNum)
				})
			)
		}
	},
	mounted() {
		this.mediasource = window.sessionStorage.getItem("mediasource")
		let platform = this.utils.getPlatform()
		this.platform = platform

		// 告诉APP域名
		setTimeout(function() {
			window.hicashJSCommunication.getDomainName(
				"http://" + window.location.host + "/"
			)
		}, 3000)

		this.SysParam()

		var jsinner = $(
			'<script src="https://s95.cnzz.com/z_stat.php?id=1260767143&web_id=1260767143" language="JavaScript"><\/script>'
		)
		$("body").append(jsinner)

		window.setTimeout(function() {
			_czc.push([
				"_trackEvent",
				"失信公告",
				"记录失信公告页面打开的次数",
				"",
				"",
				"SXGG"
			])
		}, 2000)
		var source = this.$route.query.source
		if (source == "message") {
			window.setTimeout(function() {
				_czc.push([
					"_trackEvent",
					"通过短信进入失信页面",
					"记录通过短信进入失信页面打开的次数",
					"",
					"",
					"DXSX"
				])
			}, 2000)
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
				])
			}, 2000)
		}
	}
}
</script>
