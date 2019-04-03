<template>
	<div>
		<header>
			<div class="go-back" @click="jump">
				<x-icon type="ios-arrow-left" size="30"></x-icon>
			</div>
			<img src="./images/header-bg.jpg" alt="">
		</header>
		<div class="content">
			<h2>VIP专享额度</h2>
		</div>
		<footer>
			<img src="./images/footer-bg.png" alt="">
		</footer>
	</div>
</template>
<script type="text/javascript">
// import {  } from "vux";
export default {
	components: {
		
	},
	data() {
		return {
			list: []
		};
	},
	mounted() {
		
	},
	methods: {
		jump: function() {
			this.$router.push({name: 'Home'});
		}
	}
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "~bowerComponents/sass-rem/_rem.scss";
.VipDai{
	background: #000;
	header, footer{
		width: 100%;
		height: auto;
		position: relative;
		background: #000;
		.go-back{
			width: rem(30px);
			height: rem(30px);
			position: absolute;
			top: rem(30px);
   			left: rem(10px);
		}
		img{
			width: 100%;
		}
	}
	.content{
		width: 90%;
		height: auto;
		margin: rem(10px) auto;
		background: #fff;
		border-radius: 5px;
		
		h2{
			font-size: rem(16px);
			text-align: center;
			position: relative;
			font-weight: normal;
			padding: rem(16px);
		}
	}
}
</style>
