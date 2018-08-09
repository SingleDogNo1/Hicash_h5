<template>
	<div class="notice_page">
		<div class="wrap">
			<header class="creditHeader" style="background-color:white;">
				<!-- closeBtn -->
				<a class="go-history" href="javascript:history.go(-1);"></a>
				<p>公告</p>
			</header>
			<div class="wrapper">
				<ul class="content">
					<li v-if="refresh" style="font-size:15px;text-align:center;height:50px;line-height:50px;">下拉刷新</li>
					<li v-for="(item,index) in data" :key="index">
						<p class="date">2017-11-11</p>
						<p class="text">{{item}}</p>
						<p class="label">网站公告</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->

<script type="text/javascript">
	import {Tab, TabItem, Flexbox, FlexboxItem, Confirm} from 'vux'
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
				scroll: "",
				phone: false,
				wx: false,
				qq: false
			}
		},
		mounted() {
			this.scroll = new BScroll(".wrapper", {
				click: true,
				scrollY: true,
				pullDownRefresh: {
					threshold: 50, // 当下拉到超过顶部 30px 时，
				}
			})
			var _this = this;
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

	.notice_page {
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
			top: 50%;
			font-size: 20px;
			color: black;
		}
		header p {
			font-size: rem(17px);
			width: 100%;
			text-align: center;
			height: 50px;
			line-height: 50px;
			border: 1px solid #ddd;
		}
		header {
			height: 50px;
			line-height: 50px;
			display: block;
			position: relative;
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
			height: calc(100% - 50px);
			.content {
				background-color: white;
				li {
					padding-left: 15px;
					padding-top:10px;
					padding-bottom:10px;
					border-bottom: 1px solid #efefef;
					p {
						padding: 2px 0;
						font-size: rem(15px);
					}
					.date{
						color:#999;
						font-size:rem(12px);
					}
					.text{
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						font-size:rem(15px);
						margin:5px 0;
					}
					.label{
						font-size:rem(11px);
						width:60px;
						border-radius:5px;
						text-align:center;
						color:#FF7640;
						background-color:#fff4df;
					}
				}
			}
		}
	}
</style>
