<template>
  <div class="content">
    <page-header
      :title="title"
      :showBack="showBack"
      :showBtnClose="showBtnClose"
      v-if="platform === 'H5' && showHeader"
    ></page-header>
    <div class="reminder-content" :class="{ appContent: platform === 'APP' }">
      <div class="content-wrap">
        <p>为了维护您的权益，请您在签署相关协议之前仔细阅读,检查并确认以下事宜。</p>
        <p>您确知任何欺诈、违约行为均要承担相应的法律责任，您将本着诚实、信用的原则，自愿签订并依约履行相关协议。</p>
        <p>您应妥善保管账号及密码，防止账号及密码泄露，因账号及密码泄露所造成的损失将由您自行承担。</p>
        <p>您的借款仅能用于借款协议约定的借款用途，禁止将借款用于固定资产投资、股权类投资、证券投资等借款协议约定外的用途。</p>
        <p
          class="sjjy"
          v-if="industryCode !== 'DDSJ' && industryCode !== 'JYFQ'"
        >借款到账后，您每月还应支消费资讯综合采购服务费人民币【{{serviceMoney}}】元、会员服务费人民币【{{monthFee}}】元。</p>
        <p>若一次性扣除失败，则将按月收取。</p>
        <p>您需按相关议约定按时还款，若您的账户余额不足，将导致逾期还款，这将产生逾期罚息、违约金和滞纳金，并影响您的信用记录。</p>
        <p>您已详细咨询并完全理解利息及相关费用的收取规则、禁止行为、违约后果等。相关协议一经您勾选并提交即视为您已完全理解并同意协议全部条款，且视为您已签署相关协议并将在协议生效后承担相应的法律责任。</p>
        <div class="signature">
          <p>客户签章（电子签名）：{{realName}}</p>
          <p>日 期：{{date}}</p>
        </div>
      </div>
      <a href="javascript:void(0);" class="sign-sub" @click="signSub">确认</a>
    </div>
    <confirm
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
    </confirm>
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
      platform: this.utils.getPlatform(),
      date: "",
      industryCode: this.$route.query.industryCode,
      realName: "",
      userName: this.utils.getCookie("userName"),
      serviceMoney: "",
      monthFee: "",
      appNo: this.$route.query.appNo,
      showPop: false,
      showHeader: !this.utils.getCookie('backUrl')
    };
  },
  methods: {
    base64Decode(input) {
      rv = window.atob(input);
      rv = escape(rv);
      rv = decodeURIComponent(rv);
      return rv;
    },
    signSub() {
      this.$vux.loading.show({
        text: "加载中，请稍等……"
      });
      let appCFCAObj = new URLSearchParams();
      appCFCAObj.append("applicationno", this.appNo);
      appCFCAObj.append("username", this.userName);
      appCFCAObj.append("coupon_code_id", "");
      appCFCAObj.append("platform", "h5");
      Reminder.appCFCA(appCFCAObj).then(res => {
        let data = res.data;
        this.$vux.loading.hide();
        if (data.resultCode === "1") {
          if(this.utils.getCookie('backUrl')){
            let wacaiObj = new URLSearchParams();
            wacaiObj.append("appNo", this.appNo);
            this.common.updateChannelApplicationStatusWacai(wacaiObj)
            .then(res => {
              let wacaiData = res.data;
              if(wacaiData.resultCode == '1'){
                window.location.href = this.utils.getCookie('backUrl');
              }
            });
            return false;
          }
          this.showPop = true;
        } else {
          this.$vux.toast.show({
            type: "text",
            position: "middle",
            text: data.resultMsg
          });
        }
      });
    }
  },
  mounted() {
    this.date = moment().format("YYYY年MM月DD日");
    let loanProduct = this.$route.query.loanProduct;
    let tranPrice = this.$route.query.tranPrice;
    let realName = "";
    let appNo = this.appNo;
    if (!loanProduct) {
      let userInto = this.utils.getCookie("prodetailInfo");
      loanProduct = userInto.split(":")[1];
      tranPrice = userInto.split(":")[0];
      realName = unescape(this.utils.getCookie("realName"));
    } else {
      realName = this.base64Decode(this.$route.query.realName);
    }
    this.realName = realName;
    let loanAmtObj = new URLSearchParams();
    loanAmtObj.append("firstRate", 0);
    loanAmtObj.append("loanProduct", loanProduct);
    loanAmtObj.append("tranPrice", tranPrice);
    this.common.loanAmtCalculateForNew(loanAmtObj).then(res => {
      let data = res.data;
      if (data.resultCode === "1") {
        this.serviceMoney = data.everMoth;
        this.monthFee = data.monthFee;
      } else {
        this.$vux.toast.show({
          type: "text",
          position: "middle",
          text: data.resultMsg
        });
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";
.content {
  width: 100%;
  height: 100%;
  .reminder-content {
    padding: rem(40px) rem(30px);
    background: #fff;
    .content-wrap {
      margin-top: rem(11px);
      p {
        font-size: 13px;
        line-height: rem(22px);
        font-weight: bold;
      }
      .signature {
        text-align: right;
        margin-top: rem(11px);
      }
    }
    .sign-sub {
      display: block;
      height: rem(44px);
      line-height: rem(44px);
      background-color: #ff7640;
      text-align: center;
      color: #fff;
      font-size: 16px;
      display: inline-block;
      width: 100%;
      border-radius: 5px;
      margin: 0 rem(4px);
      margin-top: rem(20px);
    }
  }
  .appContent {
    padding-top: 0;
  }
  .reminder-pop {
    /deep/ .weui-dialog__hd {
      padding: 0.2em 1.6em 0.5em 1.6em;
      background: #ff7640;
      color: #fff;
    }
    /deep/ .weui-dialog__btn_default {
      font-size: 15px;
      color: #ccc;
    }
    /deep/ .weui-dialog__bd {
      padding: 1.6em 1.4em;
      p {
        font-size: 12px;
        line-height: rem(20px);
        color: #333;
      }
    }
    .know-compre-rat {
      margin-top: rem(22px);
      color: #ff7640;
      font-size: 12px;
      width: 100%;
      text-align: center;
      display: block;
      text-decoration: underline;
    }
    .i-know {
      height: rem(33px);
      line-height: rem(33px);
      text-align: center;
      background-color: #ff7640;
      font-size: 14px;
      display: block;
      margin-top: rem(17px);
      border-radius: 5px;
      color: #fff;
    }
  }
}
</style>

