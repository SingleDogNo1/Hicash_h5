<template>
  <div class="content">
    <x-header :left-options="{showBack: false}" v-if="platform === 'H5'">{{ title }}<a @click="jump" class="btn-close" slot="right"></a></x-header>

    <msg title="绑卡失败" description="绑卡失败，请您稍后重试" :buttons="buttons" :icon="icon"></msg>
    
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

import { Msg, Divider, XButton,XHeader } from 'vux'


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
      showBack: true,
      platform: this.utils.getPlatform(),
      icon: 'cancel',
      buttons:[{
        type: 'primary',
        text: '返回',
        onClick: this.jump,
        jumpRouteName: 'MyInstalment'
      }]
    };
  },
  ready() {},
  methods: {
    jump(){
      this.$router.push({name: 'MyInstalment'});
    }    
  },
  mounted: function() {
  }
};
</script>
