<template>
	<div class="help_page">
		<div class="wrap">
				<header class="creditHeader" style="background-color:white;">
					<!-- closeBtn -->
					<a class="go-history" href="javascript:history.go(-1);"></a>
					<p>忘记密码</p>
					<tab :line-width="1" custom-bar-width="60px">
						<tab-item selected @on-item-click="onItemClick">热门问题</tab-item>
						<tab-item @on-item-click="onItemClick">借款问题</tab-item>
						<tab-item @on-item-click="onItemClick">还款问题</tab-item>
						<tab-item @on-item-click="onItemClick">其他问题</tab-item>
					</tab>

				</header>
			<!--<scroller :on-refresh="refresh">-->
			<ul class="link">
					<li v-for="(item,index) in data" :key="index">
						<p>为什么提示错误信息</p>
					</li>
				</ul>
			<!--</scroller>-->

			<footer>
				<flexbox>
					<flexbox-item><div class="flex-demo">1</div></flexbox-item>
					<flexbox-item><div class="flex-demo">2</div></flexbox-item>
					<flexbox-item><div class="flex-demo">2</div></flexbox-item>
				</flexbox>
			</footer>

		</div>
	</div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->

<script type="text/javascript">
	import Vue from 'vue';
	import {Tab, TabItem,Flexbox, FlexboxItem } from 'vux'
	import VueScroller from 'vue-scroller'

	Vue.use(VueScroller)
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
					'为什么提示错误信息', '为什么提示错误信息', '为什么提示错误信息', '为什么提示错误信息', '为什么提示错误信息', '为什么提示错误信息', '为什么提示错误信息', '为什么提示错误信息', '为什么提示错误信息', '为什么提示错误信息', '为什么提示错误信息',
				]
			}
		},
		methods: {
			onItemClick() {

			}
		},
		mounted: {
			refresh: function (done) {
				console.log('刷新')
				done();
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
		ul {
			padding: 0;
			height: calc(100% - 135px);
		}
		.vux-tab-wrap {

		}
		footer {
			height: 40px;
			line-height: 40px;
			background-color:white;
			border-top:1px solid #efefef;
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
		.link {
			background-color: white;
			overflow-y: scroll;
			li {
				display: block;
				padding: 0 0 0 15px;
				p {
					border-bottom: 1px solid #dddddd;
					padding: 15px 0;
					font-size: rem(15px)
				}
			}

		}
		.weui-grid{
			height:40px;
			padding:0;
			border:none;
		}

	}
</style>
