<template>
	<div class="help_page">
		<div class="wrap">
			<page-header
      :title="title"
      :showBack="showBack"
      :showBtnClose="showBtnClose"
			v-if="isShowHead"
    ></page-header>
		<tab :line-width="1" custom-bar-width="60px" class="help-tab" :class="{ appContent: comeFrom === 'APP' && !platform}">
				<tab-item :selected="subType === 'RMWT'" @on-item-click="onItemClick('RMWT')" @on-index-change="onIndexChange"
					>热门问题</tab-item
				>
				<tab-item :selected="subType === 'JKWT'" @on-item-click="onItemClick('JKWT')" @on-index-change="onIndexChange"
					>借款问题</tab-item
				>
				<tab-item :selected="subType === 'HKWT'" @on-item-click="onItemClick('HKWT')" @on-index-change="onIndexChange"
					>还款问题</tab-item
				>
				<tab-item :selected="subType === 'QTWT'" @on-item-click="onItemClick('QTWT')" @on-index-change="onIndexChange"
					>其他问题
				</tab-item>
			</tab>
			<div class="wrapper" :class="{ appContentWrap: comeFrom === 'APP' && !platform }">
				<ul class="content">
					<li class="ref">
						<inline-loading></inline-loading>{{ refreshText }}
					</li>
					<li v-for="(item, index) in list" :key="index">
						<a :href="item.openUrl"
							><p>{{ item.title }}</p></a
						>
					</li>
				</ul>
			</div>
			<footer>
				<flexbox>
					<flexbox-item>
						<div class="flex-demo" @click="phone = true">
							<img
								src="../assets/images/phone.png"
								alt=""
								class="icon_image1"
							/>
							<span>电话客服</span>
						</div>
					</flexbox-item>
					<flexbox-item>
						<div class="flex-demo" @click="wx = true">
							<img
								src="../assets/images/wx.png"
								alt=""
								class="icon_image2"
							/>
							<span>微信公众号</span>
						</div>
					</flexbox-item>
					<flexbox-item>
						<div class="flex-demo" @click="qq = true">
							<img
								src="../assets/images/qq.png"
								alt=""
								class="icon_image3"
							/>
							<span>联系QQ</span>
						</div>
					</flexbox-item>
				</flexbox>
			</footer>
		</div>
		<div
			class="weui-mask"
			v-show="wx == true || qq == true || phone == true"
		></div>
		<div class="weui-dialog" v-if="phone == true">
			<div
				class="weui-dialog__hd"
				style="padding:10px 0;background-color:#FF7640;color:#fff;"
			>
				<strong class="weui-dialog__title" style="font-size:14px;"
					>电话客服</strong
				>
			</div>
			<div
				class="weui-dialog__bd"
				style="background: #fff;height:100px;line-height:100px;color:black;"
			>
				客服电话：400-020-5566
			</div>
			<div class="weui-dialog__ft" style="background: #fff;">
				<a
					@click="phone = false"
					href="tel:400-020-5566"
					class="weui-dialog__btn weui-dialog__btn_default"
					style="background: #fff;color:#FF7640"
				>
					呼叫
				</a>
				<a
					href="javascript:;"
					class="weui-dialog__btn"
					style="color:#999;"
					@click="phone = false"
					>取消</a
				>
			</div>
		</div>
		<div class="weui-dialog" v-if="wx == true">
			<div
				class="weui-dialog__hd"
				style="padding:10px 0;background-color:#FF7640;color:#fff;"
			>
				<strong class="weui-dialog__title" style="font-size:14px;"
					>微信公众号</strong
				>
			</div>
			<div
				class="weui-dialog__bd"
				style="padding: 1.8em 1.6em;background: #fff;height:auto;line-height:29px;color:black;"
			>
				微信公众号：【果信宝】<br/>和【果信宝服务号】
			</div>
			<div class="weui-dialog__ft" style="background: #fff;">
				<a
					@click="wx = false"
					href="javascript:;"
					class="wx_btn weui-dialog__btn weui-dialog__btn_default"
					style="color:#FF7640"
				>
					复制
				</a>
				<a
					href="javascript:;"
					class="weui-dialog__btn"
					style="background: #fff;color:#999;"
					@click="wx = false"
					>取消</a
				>
			</div>
		</div>
		<div class="weui-dialog" v-if="qq == true">
			<div
				class="weui-dialog__hd"
				style="padding:10px 0;background-color:#FF7640;color:#fff;"
			>
				<strong class="weui-dialog__title" style="font-size:14px;"
					>联系QQ</strong
				>
			</div>
			<div
				class="weui-dialog__bd"
				style="background: #fff;height:100px;line-height:100px;color:black;"
			>
				QQ：4000205566
			</div>
			<div class="weui-dialog__ft" style="background: #fff;">
				<a
					@click="qq = false"
					href="javascript:;"
					class="qq_btn weui-dialog__btn weui-dialog__btn_default"
					style="color:#FF7640"
				>
					复制
				</a>
				<!--<a href="javascript:;" class="qq_btn weui-dialog__btn weui-dialog__btn_default" style="color:#FF7640" v-clipboard="copyData" @success="handleSuccess">-->
				<!--复制 </a>-->
				<a
					href="javascript:;"
					class="weui-dialog__btn"
					style="color:#999;"
					@click="qq = false"
					>取消</a
				>
			</div>
		</div>
		<div class="icon-customer-service" @click="toCustomerService"></div>
	</div>
</template>
<script type="text/javascript">
import PageHeader from "@/components/PageHeader";
import { Tab, TabItem, Flexbox, FlexboxItem, InlineLoading } from "vux";
import Clipboard from "clipboard";
import BScroll from "better-scroll";
export default {
	components: {
		Tab,
		TabItem,
		Flexbox,
		FlexboxItem,
		InlineLoading,
		PageHeader
	},
	data() {
		return {
			list: [],
			subType: "RMWT",
			scroll: "",
			phone: false,
			wx: false,
			qq: false,
			refreshText: "下拉刷新",
			isShowAlert: false,
			isShowHead: true,
			index: 0,
			platform: "",
			comeFrom: "",
			title: "帮助中心",
      showBack: true,
			showBtnClose: false,
			isShowBottom: false,
			customerServiceShow: false
		};
	},
	mounted() {
		var _this = this;
		let helpItemKey = _this.$route.query.helpItemKey;
		_this.helpItemKey = helpItemKey;
		_this.platform = _this.$route.query.platform;
		document.body.scrollTop = 0;
		if(_this.platform) {
			this.isShowBottom = true
		}
		if(helpItemKey) {
			_this.subType = helpItemKey;
		}

		let comeFrom = _this.utils.getPlatform();
		this.comeFrom = comeFrom;
		if (comeFrom != "H5" && !_this.platform) {
			_this.isShowHead = false;
		}

		_this.getSysParam();

		new Clipboard(".wx_btn", {
			text: function() {
				_this.$vux.toast.show({
					text: "复制成功"
				});
				return "果信宝";
			}
		});

		new Clipboard(".qq_btn", {
			text: function() {
				_this.$vux.toast.show({
					text: "复制成功"
				});
				return "4000205566";
			}
		});
		this.scroll = new BScroll(".wrapper", {
			click: true,
			scrollY: true,
			pullDownRefresh: {
				threshold: 30 // 当下拉到超过顶部 30px 时，
			},
			probeType: 1
		});
		this.scroll.on("scroll", function(pos) {
			if (pos.y > 30 && pos.y < 40) {
				_this.refreshText = "下拉刷新";
			}
		});
		this.scroll.on("touchEnd", function(pos) {
			if (pos.y > 40) {
				_this.refreshText = "刷新数据中";
				_this.getSysParam();
			}
		});
	},
	methods: {
		onItemClick: function(type) {
			this.subType = type;
			this.scroll.scrollTo(0, 0);
			this.getSysParam();
		},
		onIndexChange: function(index) {
		},
		getSysParam: function() {
			// 获取产品列表
			let postData = new URLSearchParams();
			postData.append("paramCode", "CJWT");
			postData.append("requestSource", "HTML5");
			postData.append("maxLine", "10000");
			postData.append("curPage", "1");
			postData.append("subType", this.subType);

			let _this = this;

			this.common.getSysParam(postData).then(function(res) {
				let list = res.data.list;

				_.each(res.data.list, function(v, i) {
					list[i].createTime = list[i].createTime.substring(0, 10);
					if(_this.platform) {
						if(_this.helpItemKey) {
								list[i].openUrl = _this.config.MWEB_PATH + "newweb/newsDetail/newsDetail.html?id="+list[i].id 
								+ '&platform=' + _this.platform + '&type=help';
						} else {
							list[i].openUrl = _this.config.MWEB_PATH + "newweb/newsDetail/newsDetail.html?id="+list[i].id 
								+ '&platform=' + _this.platform + '&type=help';
						}
					} else {
						list[i].openUrl = _this.config.MWEB_PATH + "newweb/newsDetail/newsDetail.html?id=" +　list[i].id + '&type=help';
					}
				});

				_this.list = list;

				_this.$nextTick(function() {
					setTimeout(() => {
						_this.refreshText = "刷新成功";
						setTimeout(() => {
							_this.scroll.refresh();
							_this.refreshText = "下拉刷新";
						}, 500);
					}, 1000);
				});
			});
		},
		toCustomerService: function() {
      if (this.utils.getPlatform() === "H5") {
				let userName = this.utils.getCookie("userName");
        if (!userName) {
          this.$router.push({ name: "Login" });
          return;
        } else {
          let hxUserName = this.utils.getCookie("hxUserName");
          let hxPassword = this.utils.getCookie("hxPassword");
          if (hxUserName && hxPassword) {
            this.easemobimSet(hxUserName, hxPassword);
          } else {
            let postData = new URLSearchParams();
            postData.append("userName", userName);
            postData.append("token", "");
            this.common.userEaseModGet(postData).then(res => {
              let data = res.data;
              this.easemobimSet(data.hxUsername, data.hxPassword);
            });
          }
        }
      } else {
        let isAndroid = navigator.userAgent.indexOf('comeFrom:android') > -1;
        let isIos = navigator.userAgent.indexOf('comeFrom:iOS') > -1;
        if(isAndroid) {
          window.hicashJSCommunication.onCallApp(
              JSON.stringify({
                type: "h5_service_im"
              })
            );
        } else {
          let token = window.hicashJSCommunication.getToken();
          if (!token) {
            window.hicashJSCommunication.onCallApp(
              JSON.stringify({
                type: "dl"
              })
            );
          } else {
						let postData = new URLSearchParams();
						postData.append("userName", "");
						postData.append("token", token);
						if(isIos) {
							postData.append("type", "1");
						}
						this.common.userEaseModGet(postData).then(res => {
							let data = res.data;
							this.easemobimSet(data.hxUsername, data.hxPassword);
						});
					}
        }
      }
		},
		easemobimSet: function(hxUserName, hxPassword) {
      window.easemobim = window.easemobim || {};
      easemobim.config = {
        //configId: "69ecd9da-983a-4b3c-9501-8a3dfafa23eb",	//生产
        configId: "3c36390b-e501-417f-8825-d5c7db9e161a",	//测试
                  
        // 用户所在的 appKey 需要与 configId 中指定的关联的 appKey 一致
        user: {
          // username 必填，password 和 token 任选一项填写
          username: hxUserName,
          password: hxPassword,
          token: ""
        },
        hideKeyboard: true
      };
      easemobim.bind(easemobim.config);
		}
	}
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "../../bower_components/sass-rem/rem";
@import "../assets/css/animate.min.css";
.help_page {
	height: 100%;
	.wrap {
		position: relative;
		z-index: 1;
		height: 100%;
		padding: 0;
	}
	header .go-history:before,
	header .go-back:before {
		font-family: "iconfont";
		position: absolute;
		content: "\ED72";
		left: 50%;
		top: 0%;
		font-size: 20px;
		color: black;
	}
	header p {
		font-size: rem(17px);
		width: 100%;
		text-align: center;
		height: 50px;
		line-height: 50px;
	}
	header {
		height: 95px;
		line-height: 95px;
		display: block;
		position: relative;
	}
	.help-tab {
		position: fixed;
		padding-top: rem(50px);
		width: 100%;
    z-index: 100;
	}
	.appContent {
		padding-top: 0;
	}
	.wrap .appContentWrap {
		top: rem(45px);
		.content {
			padding-bottom: 60px;
		}
	}
	.vux-tab-container {
		position: relative;
		z-index: 4;
		background: #fff;
	}
	footer {
		position: fixed;
		height: 49px;
		line-height: 45px;
		background-color: white;
		bottom: 0;
		width: 100%;
		box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.15);
	}

	.vux-slider > .vux-indicator > a > .vux-icon-dot.active,
	.vux-slider .vux-indicator-right > a > .vux-icon-dot.active {
		background-color: #fff !important;
	}
	.vux-tab .vux-tab-item.vux-tab-selected {
		color: #ff7640;
	}
	.vux-tab-bar-inner {
		border: 1px solid #ff7640;
	}
	.wrapper {
		position: absolute;
		left: 0;
		right: 0;
		top: rem(95px);
		bottom: rem(50px);
		//bottom: rem(100px);
		//height: calc(100% - 135px);
		.content {
			background-color: white;
			min-height: calc(100% + 1px);
			li {
				margin: 0 rem(15px);
				a {
					display: block;
					width: 100%;
					height: 100%;
					p {
						padding: 15px 0;
						border-bottom: 1px solid #efefef;
						font-size: rem(15px);
						color: #999;
					}
				}
				.weui-loading {
					margin-right: rem(10px);
				}
			}
			li.ref {
				position: absolute;

				top: -48px;

				left: 0;

				padding-left: 0;

				width: 100%;

				font-size: 12px;

				color: #333;

				text-align: center;

				height: 48px;

				line-height: 48px;
				z-index: 1111;
			}
		}
		// &.isApp {
		// 	bottom: rem(200px);
		// }
	}
	.flex-demo {
		text-align: center;
		padding: 0;
		position: relative;
		.icon_image1 {
			width: 19px;
			height: 20px;
			position: relative;
			top: 4px;
		}
		.icon_image2 {
			width: 21px;
			height: 17px;
			position: relative;
			top: 3px;
		}
		.icon_image3 {
			width: 19px;
			height: 21px;
			position: relative;
			top: 4px;
		}
		span {
			font-size: rem(13px);
			display: inline-block;
		}
	}
	.alert {
		position: fixed;
		top: 95px;
		left: 0;
		z-index: 2;
		width: 100%;
		height: 35px;
		line-height: 35px;
		text-align: center;
		color: #fff;
		font-size: 12px;
		background: rgba(7, 17, 27, 0.7);
	}
	.vux-flexbox {
		height: 100%;
	}
	.icon-customer-service {
    width: rem(56px);
    height: rem(75px);
    margin: 0;
    padding: 0px;
    position: absolute;
    bottom: rem(80px);
    z-index: 999;
    right: rem(8px);
    background: url("../assets/images/icon_help_kefu.png") center center no-repeat;
    background-size: 100% 100%;
	}
}
</style>
