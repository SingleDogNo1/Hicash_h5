<template>
  <div class="content">
    <x-header :left-options="{showBack: false}" v-if="platform === 'H5'">{{ title }}<a @click="jump" class="btn-close" slot="right"></a></x-header>
    <msg title="绑卡成功" description="恭喜您绑卡成功，请稍等正在为您跳转签约页面" :buttons="buttons" :icon="icon"></msg>
    
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";
.vux-header {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	background-color: #fff;
	z-index: 100;	//暫時由10000改为100
	/deep/ .vux-header-left {
		/deep/ .left-arrow:before {
			border-left: 1px solid #333;
			border-top: 1px solid #333;
		}
	}
	/deep/ .vux-header-title {
		height: 1.955556rem /* 44/22.5 */;
		line-height: 1.955556rem /* 44/22.5 */;
		color: #333;
	}
	/deep/ .vux-header-right {
		right: 0.444444rem /* 10/22.5 */;
	}
	.btn-close:before {
		font-family: "iconfont";
		position: absolute;
		content: "\e6a0";
		top: 0.444444rem /* 10/22.5 */;
		right: 0;
		font-size: 0.85rem;
		color: #3f3f3f;
		-webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		-o-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}
}
.weui-msg{
  padding-top: 100px !important;
}
</style>

<script type="text/javascript">
import utils from "@/assets/js/utils";

import { Msg, Divider, XButton, XHeader } from 'vux'


export default {
  components: {
    Msg,
    Divider,
    XButton,
    XHeader
  },
  data() {
    return {
      title: this.$router.history.current.meta.title,
      showBack: false,
      platform: this.utils.getPlatform(),
      icon: 'success-circle',
      buttons:[],
    };
  },
  ready() {},
  methods: {
    jump(){
      let jumpParams = JSON.stringify({type: 'h5_sign', app_no: this.$route.query.appNo, industry_code: this.$route.query.industryCode})
      window.hicashJSCommunication.jumpPage(jumpParams);
    }
  },
  mounted: function() {
    console.info('.this.$route.query', this.$route.query.industryCode);
    setTimeout(()=>{
      let jumpParams = JSON.stringify({type: 'h5_sign', app_no: this.$route.query.appNo, industry_code: this.$route.query.industryCode})
      window.hicashJSCommunication.jumpPage(jumpParams);
    }, 3000)
  }
};
</script>
