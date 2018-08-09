<template>
	<div class="help_page">
		<div class="wrap">
			<header class="creditHeader" style="background-color:white;">
				<!-- closeBtn -->
				<a class="go-history" href="javascript:history.go(-1);" style="left:.85rem;top:40%"></a>
				<p>忘记密码</p>
				<tab :line-width="1" custom-bar-width="60px">
					<tab-item selected @on-item-click="onItemClick">热门问题</tab-item>
					<tab-item @on-item-click="onItemClick">借款问题</tab-item>
					<tab-item @on-item-click="onItemClick">还款问题</tab-item>
					<tab-item @on-item-click="onItemClick">其他问题 </tab-item>
				</tab>
			</header>
			<div class="wrapper">
				<ul class="content">
					<li  v-if="refresh" style="font-size:15px;text-align:center;height:50px;line-height:50px;">下拉刷新</li>
					<li v-for="(item,index) in data" :key="index">
						<p>{{item}}</p>
					</li>
				</ul>
			</div>
			<footer>
				<flexbox>
					<flexbox-item>
						<div class="flex-demo" @click="phone=true">
							<img src="../assets/images/phone.png" alt="" class="icon_image">
							<span>在线客服</span>
						</div>
					</flexbox-item>
					<flexbox-item>
						<div class="flex-demo" @click="wx=true">
							<img src="../assets/images/wx.png" alt="" class="icon_image">
							<span>微信公众号</span>
						</div>
					</flexbox-item>
					<flexbox-item>
						<div class="flex-demo" @click="qq=true" >
							<img src="../assets/images/qq.png" alt="" class="icon_image">
							<span>联系qq</span>
						</div>
					</flexbox-item>
				</flexbox>
			</footer>
		</div>
		<div class="weui-mask" v-show="wx==true || qq == true || phone == true"></div>
		<div class="weui-dialog" v-if="phone == true">
			<div class="weui-dialog__hd" style="padding:10px 0;background-color:#FF7640;color:#fff;"><strong class="weui-dialog__title" style="font-size:14px;" >在线客服</strong></div>
			<div class="weui-dialog__bd" style="height:100px;line-height:100px;color:black;">客服电话：400-020-5566</div>
			<div class="weui-dialog__ft">
				<a href="tel:400-020-5566" class="weui-dialog__btn weui-dialog__btn_default" style="color:#FF7640">
					呼叫
				</a>
				<a href="javascript:;" class="weui-dialog__btn" style="color:#999;" @click="phone = false
">取消</a>
			</div>
		</div>
		<div class="weui-dialog" v-if="wx == true">
			<div class="weui-dialog__hd" style="padding:10px 0;background-color:#FF7640;color:#fff;"><strong class="weui-dialog__title" style="font-size:14px;" >微信公众号</strong></div>
			<div class="weui-dialog__bd" style="height:100px;line-height:100px;color:black;">微信公众号：果壳</div>
			<div class="weui-dialog__ft">
				<a href="javascript:;" class="wx_btn weui-dialog__btn weui-dialog__btn_default" style="color:#FF7640">
					复制 </a>
				<a href="javascript:;" class="weui-dialog__btn" style="color:#999;" @click="wx = false
">取消</a>
			</div>
		</div>
		<div class="weui-dialog" v-if="qq == true">
			<div class="weui-dialog__hd" style="padding:10px 0;background-color:#FF7640;color:#fff;"><strong class="weui-dialog__title" style="font-size:14px;" >联系QQ</strong></div>
			<div class="weui-dialog__bd" style="height:100px;line-height:100px;color:black;">QQ：果壳</div>
			<div class="weui-dialog__ft">
				<a href="javascript:;" class="qq_btn weui-dialog__btn weui-dialog__btn_default" style="color:#FF7640">
					复制 </a>
				<a href="javascript:;" class="weui-dialog__btn" style="color:#999;" @click="qq = false
">取消</a>
			</div>
		</div>
	</div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<script type="text/javascript">
	import {Tab, TabItem, Flexbox, FlexboxItem} from 'vux';
	let Clipboard=require('Clipboard');
	import BScroll from 'better-scroll'
	export default {
		components: {
			Tab,
			TabItem,
			Flexbox,
			FlexboxItem
		},
		data() {
			return {
				data: [
					'为什么提示错误信息',
					'为什么提示错误信息', '为什么提示错误信息', '为什么提示错误信息', '为什么提示错误信息', '为什么提示错误信息', '为什么提示错误信息', '为什么提示错误信息', '为什么提示错误信息', '为什么提示错误信息', '为什么提示错误信息', '为什么提示错误信息', '为什么提示错误信息', '为什么提示错误信息', '为什么提示错误信息'
				],
				refresh: false,
				scroll:"",
				phone:false,
				wx:false,
				qq:false
			}
		},
		mounted() {
			var _this = this;
			new Clipboard('.wx_btn',{
				text: function() {
					_this.$vux.toast.show({
						text: '复制成功'
					});
					return '微信号'
				}
			});
			new Clipboard('.qq_btn',{
				text: function() {
					_this.$vux.toast.show({
						text: '复制成功'
					});
					return 'qq'
				}
			});
			this.scroll = new BScroll(".wrapper", {
				click: true,
				scrollY: true,
				pullDownRefresh: {
					threshold: 50, // 当下拉到超过顶部 30px 时，
				}
			})
			this.scroll.on('pullingDown', function () {
				_this.refresh = true;
				// axios.get("").then(function () {
				// 	_this.$nextTick(function () {
				// 		_this.scroll.finishPullDown();
				// 		_this.scroll.refresh();
				// 		_this.refresh=false;
				// 	});
				// })
			})
		},
		methods: {
			onItemClick() {
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import "../../bower_components/sass-rem/rem";

	.help_page {
		height: 100%;
		.wrap {
			height: 100%;
			padding: 0;
		}
		header .go-history:before, header .go-back:before {
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
		.vux-tab-wrap {

		}
		footer {
			position: absolute;
			height: 40px;
			line-height: 40px;
			background-color: white;
			border-top: 1px solid #efefef;
			bottom: 0;
			width: 100%;
		}

		.vux-slider > .vux-indicator > a > .vux-icon-dot.active, .vux-slider .vux-indicator-right > a > .vux-icon-dot.active {
			background-color: #fff !important;
		}
		.vux-tab .vux-tab-item.vux-tab-selected {
			color: #FF7640
		}
		.vux-tab-bar-inner {
			border: 1px solid #FF7640;
		}
		.wrapper {
			height: calc(100% - 135px);
			.content {
				background-color: white;
				li {
					padding-left: 15px;
					p {
						padding: 15px 0;
						border-bottom: 1px solid #efefef;
						font-size: rem(15px);
					}
				}
			}
		}
		.flex-demo{
			text-align:center;
			padding:0 10px;
			position:relative;
			img{
				width:20px;
				height:20px;
				position:relative;
				top:5px;
			}
			span{
				font-size:rem(13px);
				display:inline-block;
			}
		}
	}
</style>
