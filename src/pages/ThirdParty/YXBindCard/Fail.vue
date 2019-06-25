<template>
  <div class="content">
    <page-header
      :title="title"
      :showBack="showBack"
      :jumpRouteName="jumpRouteName"
      v-if="platform === 'H5'"
    ></page-header>
    <msg title="绑卡失败" description="绑卡失败，请您稍后重试" :buttons="buttons" :icon="icon"></msg>
    
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
