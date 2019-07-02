<template>
  <div class="hmfq-content">
    <div v-if="!value">
      <div class="header">
        <page-header :title="title" :showBack="showBack" :showBtnClose="showBtnClose"></page-header>
      </div>
      <div class="hmfq-wrap">
        <div class="headerImg">
          <img :src="infoHeaderPic" alt>
        </div>
      </div>
      <div class="pro-wrap">
        <LoanDetails
          @amount="LoanAmounts"
          @time="LoanTimes"
          @lowPay="lowPay"
          @monRate="monRate"
          @headerPic="headerPic"
          :amount="rateDesAmount"
          :time="rateDesTime"
        ></LoanDetails>
        <div class="outPro-wrap">
          <div class="rate-wrap">
            <p>
              每期最低还款本息 :
              <span class="repay" :repayMoney="repayMoney">{{ repayMoney }}元</span>
            </p>
          </div>
          <div class="rate-handeler">
            <p>
              月利率 :
              <span class="rate" :monthRate="monthRate">{{ monthRate }}</span>
            </p>
            <span class="rateCal" @click="rateShow">费率计算</span>
          </div>
          <button class="miaodaiBtn" @click="checkSupportApp">{{btnName}}</button>
        </div>
      </div>
    </div>
    <Popup
      :value="value"
      :height="height"
      :hide-on-blur="hideOnBlur"
      :width="width"
      :is-transparent="isTransparent"
      :show-mask="showMask"
    >
      <page-header
        :title="rateTitle"
        :showBack="rateShowBack"
        :showBtnClose="rateShowBtnClose"
        :preventGoBack="preventGoBack"
        :jumpRouteName="jumpRouteName"
        @value="popupHide"
      ></page-header>
      <div class="rateWrap">
        <div class="rateUpBg">
          <div class="rateDesNumber">
            <ul class="rateDesHd clearfix">
              <li>借款金额</li>
              <li>借款期限</li>
              <li>每期最低本息还款</li>
            </ul>
            <ul class="rateDesCon clearfix">
              <li>{{ rateDesAmount.amount }}元</li>
              <li>{{ rateDesTime.time.installments + flag2 }}</li>
              <li>{{ repayMoney }}元</li>
            </ul>
          </div>
        </div>
        <LoanDetails
          @amount="LoanAmounts"
          @time="LoanTimes"
          @lowPay="lowPay"
          @monRate="monRate"
          @headerPic="headerPic"
          :amount="rateDesAmount"
          :time="rateDesTime"
        ></LoanDetails>
        <div class="rateDes">
          <strong>借款费用说明</strong>
          <p>
            利率按实际的借款月数收取，每月收取借款金额的{{ monthRate }},实际利率将根据您的资料最终审核确定，提供真实有效资料有助于提高您的审核通过率；
          </p>
        </div>
      </div>
    </Popup>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
@import "~bowerComponents/sass-rem/_rem.scss";
@import "../varibale.scss";
.hmfq-content {
  .header /deep/ .vux-header {
    width: 100%;
    background: transparent;
    position: absolute;
    /deep/ .vux-header-title {
      background-image: url("../images/hmfq/icon_miaodai_logo.png");
      background-repeat: no-repeat;
      background-position: bottom;
      background-size: rem(80px);
    }
  }
  .hmfq-wrap {
    width: 100%;
    background: -webkit-linear-gradient(top, #fd7f5f, #fc915c);
    position: absolute;
    top: 0;
    height: 9.82rem;
    left: 0;
    .headerImg {
      width: 13.875rem;
      height: 6.75rem;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      bottom: 0;
      img {
        width: 100%;
      }
    }
  }
  .pro-wrap {
    width: 100%;
    height: 100%;
    background: #fff;
    padding-top: 1.7rem;
    box-shadow: 0 -2px 5px #e3e0e0;
    position: absolute;
    top: 8.8rem;
    z-index: 99;
    /deep/ .pro-title {
      background: url("../images/hmfq/loan-amont-icon.png") 0 center no-repeat;
      background-size: 16px;
    }
    /deep/ .time {
      background: url("../images/hmfq/loan-time-icon.png") 0 center no-repeat;
      background-size: 16px;
    }
    .outPro-wrap {
      width: 13.5rem;
      margin: 0 auto;
      .rate-wrap {
        width: 100%;
        font-size: 0.65rem;
        color: #666;
        line-height: 1rem;
        margin: 0.4rem auto;
        .repay {
          color: $main-theme-color;
        }
      }
      .rate-handeler {
        width: 100%;
        font-size: 0.65rem;
        color: #666;
        line-height: 1rem;
        overflow: hidden;
        margin: auto;
        p {
          display: inline-block;
        }
        .rateCal {
          position: relative;
          color: $main-theme-color;
          left: 3rem;
          top: 0;
          width: 4rem;
          height: 0.9rem;
          line-height: 0.9rem;
          background: none;
          text-align: right;
        }
        .rateCal:before {
          content: "\e66f";
          font-family: "iconfont";
          font-size: 0.7rem;
          cursor: pointer;
          padding-right: 0.5rem;
        }
      }
      .miaodaiBtn {
        width: 100%;
        font-size: 0.65rem;
        background: #333;
        border-radius: 0.22222rem;
        border: transparent;
        color: #fff;
        margin: 1rem auto 0.5rem;
        line-height: 2rem;
      }
    }
  }
  .rateWrap {
    width: 100%;
    min-height: 100%;
    margin: 2.2rem 0 2.075rem;
    .pro-title {
      padding: 0.5rem 0;
    }
    .rateUpBg {
      background: #f1f1f1;
      padding: 0.8rem 0 0.5rem;
      .rateDesNumber {
        width: 12rem;
        line-height: 3.5rem;
        background: #fff;
        border-radius: 10px;
        font-size: 0.6rem;
        margin: 0 auto;
        box-shadow: 1px 6px 10px #dfdfdf;
        .rateDesHd {
          background: #ffb43b;
          color: #fff;
          border-radius: 10px 10px 0 0;
          li {
            float: left;
            width: 25%;
            text-align: center;
            height: 1.4rem;
            line-height: 1.4rem;
            color: #fff;
          }
          li:last-of-type {
            width: 50%;
          }
        }
        .rateDesCon {
          li {
            float: left;
            width: 25%;
            text-align: center;
            height: 2.1rem;
            line-height: 2.1rem;
            color: #ff7a46;
          }
          li:last-of-type {
            width: 50%;
          }
        }
      }
    }
    .rateDes {
      border-top: 0.5rem solid #0c0c0c11;
      padding: 0 1.75rem;
      strong {
        font-size: 0.7rem;
        color: #333;
        padding: 1.2rem 0 0.3rem;
        display: block;
        font-weight: bold;
      }
      p {
        font-size: 0.65rem;
        width: 100%;
        line-height: 1.1rem;
        color: #7a7a7a;
        word-break: normal;
      }
    }
  }
  .vux-popup-dialog {
    background: #fff;
    min-height: 100%;
  }
}
</style>

<script>
import { Popup, Alert } from "vux";
import LoanDetails from "@/themes/pages/LoanDetails";
import PageHeader from "@/components/PageHeader.vue";

export default {
  components: {
    LoanDetails,
    PageHeader,
    Popup,
    Alert
  },
  data() {
    return {
      title: "",
      showBack: true,
      showBtnClose: false,
      preventGoBack: true,
      jumpRouteName: "Hmfq",
      repayMoney: "",
      value: false,
      height: "100%",
      hideOnBlur: false,
      isTransparent: false,
      width: "100%",
      showMask: false,
      rateTitle: "费率计算",
      rateShowBack: true,
      rateShowBtnClose: false,
      rateDesAmount: "",
      rateDesTime: "",
      btnName: "",
      flag2: "",
      rateDesRate: "",
      monthRate: "",
      infoHeaderPic: "",
      checkSupportData: {}
    };
  },
  methods: {
    LoanAmounts(amount) {
      this.rateDesAmount = amount;
      console.info("this.rateDesTime=", this.rateDesTime.time.installments);
    },
    LoanTimes(time) {
      this.rateDesTime = time;
    },
    rateShow() {
      this.value = true;
      console.info(
        "this.rateDesTime.time.loanProduct)=",
        this.rateDesTime.time.loanProduct
      );
    },
    popupHide(value) {
      this.value = false;
    },
    lowPay(lowPay) {
      this.repayMoney = lowPay;
    },
    monRate(monRate) {
      this.monthRate = monRate;
    },
    headerPic(headerPic) {
      this.infoHeaderPic = headerPic;
    },
    fastLoanFirst() {
      let postData = new URLSearchParams();
      postData.append("userName", this.utils.getCookie("userName"));
      postData.append("fastAmt", this.rateDesAmount.amount);
      postData.append("fastPeriod", this.rateDesTime.time.loanProduct);
      postData.append("uuid", "0c8297d7-6d3a-46da-b782-0df2434f88b1");
      this.common.fastLoanFirst(postData).then(res => {
        let data = res.data;
        if (data.resultCode == "1") {
          if (data.appFlowNo == "") {
            this.$vux.toast.text(data.resultMsg, "middle");
          }
          this.utils.setCookie("xykFrom", "0");
          this.utils.setCookie(
            "appFlowNo",
            this.utils.getCookie("userName") + ":" + data.appFlowNo
          );
          this.utils.setCookie(
            "prodetailInfo",
            this.rateDesAmount.amount + ":" + this.rateDesTime.time.loanProduct
          );
          this.utils.setCookie(
            "prodetailInfo2",
            this.repayMoney + ":" + this.rateDesTime
          );
          this.utils.setCookie("checkSupportIsCredit", data.isCredit);
          window.hicashJSCommunication.onCallApp(
            JSON.stringify({ type: "identity_auth", isCredit: data.isCredit, checkSupportRes: this.checkSupportData })
          );
          // this.$router.push({ path: "auth" });
        } else if (data.resultCode == "60100") {
          this.$vux.toast.text(data.resultMsg, "middle");
          this.$router.push({ name: "Login" });
        } else {
          this.$vux.toast.text(data.resultMsg, "middle");
        }
      });
    },
    checkSupportApp() {
      let _this = this;
      let postData = new URLSearchParams();
      postData.append("industryCode", _this.utils.getCookie("industryCode"));
      postData.append("custType", _this.utils.getCookie("custType"));
      postData.append("mobile", _this.utils.getCookie("mobile"));
      postData.append("is_type", "N");
      postData.append("uuid", _this.utils.uuid());
      postData.append("user_name", _this.utils.getCookie("userName"));
      postData.append("applyFrom", this.utils.getApplyFrom());
      postData.append("loanProductId", _this.rateDesTime.time.loanProduct);
      _this.common.checkSupportApp(postData).then(res => {
        let data = res.data;
        this.checkSupportData = data;
        if (data.resultCode == "1") {
          // this.$vux.toast.text(data.resultMsg, "middle");
          _this.fastLoanFirst();
        } else {
          _this.$vux.toast.text(data.resultMsg, "middle");
        }
      });
    }
  },
  created() {
    let industryCode = this.$route.query.industryCode;

    this.utils.setCookie("industryCode", this.$route.query.industryCode);

    this.rateDesAmount =
      industryCode === "LDDD"
        ? { amount: "500", index: 0 }
        : { amount: "2000", index: 0 };
    this.rateDesTime =
      industryCode === "LDDD"
        ? {
            time: { loanProduct: "807", installments: "14" },
            index: 0
          }
        : {
            time: { loanProduct: "808", installments: "3" },
            index: 0
          };
    this.btnName =
      this.utils.getCookie("industryCode") === "LDDD" ? "立即滴答" : "立即分期";
    this.flag2 = industryCode === "LDDD" ? "天" : "个月";
  },
  mounted() {}
};
</script>
