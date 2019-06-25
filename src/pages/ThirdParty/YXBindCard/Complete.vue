<template>
  <div class="content">
    <page-header
      :title="title"
      :showBack="showBack"
      v-if="platform === 'H5'"
    ></page-header>
    <msg title="绑卡成功" description="恭喜您绑卡成功，请稍等正在为您跳转签约页面" :buttons="buttons" :icon="icon"></msg>
    
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";

.weui-msg{
  padding-top: 100px !important;
}
</style>

<script type="text/javascript">
import PageHeader from "@/components/PageHeader.vue";
import ConfirmDialog from "@/components/Dialog.vue";
import common from "@/api/common";
import bindCardApi from "@/api/bindCard";
import utils from "@/assets/js/utils";

import { Msg, Divider, XButton } from 'vux'


export default {
  components: {
    Msg,
    Divider,
    XButton,
    PageHeader
  },
  data() {
    return {
      title: this.$router.history.current.meta.title,
      showBack: false,
      platform: this.utils.getPlatform(),
      icon: 'success',
      buttons:[],
    };
  },
  ready() {},
  methods: {
    
  },
  mounted: function() {
    console.info('.this.$route.query', this.$route.query.appNo);
    setTimeout(()=>{
      window.location.href = this.config.MWEB_PATH + "newweb/personalCenter/signature.html?comefrom=H5&appNo="+this.$route.query.appNo;
    }, 1000)
  }
};
</script>
