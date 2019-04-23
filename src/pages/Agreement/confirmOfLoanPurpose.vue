<template>
  <div class="content">
    <page-header
      :title="title"
      :showBack="showBack"
      :showBtnClose="showBtnClose"
      v-if="platform === 'H5'"
    ></page-header>
    <div class="reminder-content" :class="{ appContent: platform === 'APP' }">
      <div class="content-wrap">
        
        <div class="signature">
          <p>客户签章（电子签名）：{{realName}}</p>
          <p>日 期：{{date}}</p>
        </div>
      </div>
      <a href="javascript:void(0);" class="sign-sub" @click="signSub">确认</a>
    </div>
    <!-- <confirm
      v-model="showPop"
      title="提示"
      class="reminder-pop"
      :show-cancel-button="false"
      :show-confirm-button="false"
    >
      <p>感谢您使用嗨钱借贷业务！</p>
      <br>
      <p>按时还款，将会增加您提升用户评级的机会享受更高的通过率，更低的综合费率</p>
      <router-link
        class="know-compre-rat"
        :to="{name: 'CompreRat', query: {from: 'signature', appNo: appNo}}"
      >了解用户评级</router-link>
      <router-link class="i-know" :to="{name: 'Personal'}">我知道了</router-link>
    </confirm> -->
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import Reminder from "@/api/reminder";
import { Confirm } from "vux";
let moment = require("moment");
export default {
  components: {
    PageHeader,
    Confirm
  },
  data() {
    return {
      title: this.$route.meta.title,
      showBack: true,
      showBtnClose: false,
    };
  },
  methods: {
    
  },
  mounted() {
  }  
};
</script>

<style lang="scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";

</style>

