<template>
  <div class="hmfq-content">
    <div v-if="!value">
      <div class="header">
        <page-header :title="title" :showBack="showBack" :showBtnClose="showBtnClose"></page-header>
      </div>
      <div class="banner">
        <img :src="infoHeaderPic" alt="">
        <p class="rate-tips">月利率：<span class="rate" :monthRate="monthRate">{{ monthRate }}</span></p>
      </div>
      <div class="pro-wrap">
        <LoanDetails
          @amount="LoanAmounts"
          @time="LoanTimes"
          @lowPay="lowPay"
          @monRate="monRate"
          :amount="rateDesAmount"
          :time="rateDesTime"
          :programList="programList"
          :amounts="amountArray"
          ref="loanDetailsCom"
        ></LoanDetails>
        <div class="outPro-wrap">
          <div class="rate-wrap">
            <p>
              每期最低还款本息 :
              <span class="repay" :repayMoney="repayMoney"> ¥{{ repayMoney }}</span>
            </p>
            <div class="rate-handeler">
              <span class="rateCal" @click="rateShow">费率计算</span>
            </div>
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
      <!-- <page-header
        :title="rateTitle"
        :showBack="rateShowBack"
        :showBtnClose="rateShowBtnClose"
        :preventGoBack="preventGoBack"
        :jumpRouteName="jumpRouteName"
        @value="popupHide"
        class="rate-title"
        :style="'opacity:' + opacity"
      ></page-header> -->
      <header class="rate-header">
        <div class="left-arrow" :class="{'black':changeBlackColor}" @click="popupHide"></div>
        <div class="bg" :style="'opacity:' + opacity"></div>
        <div class="title" :class="{'black':changeBlackColor}">费率计算</div>
      </header>
      <scroller lock-x @on-scroll="onScroll" ref="scroller">
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
                <li>{{ rateDesTime.time.productPeriod + flag2 }}</li>
                <li>{{ repayMoney }}元</li>
              </ul>
            </div>
          </div>
          <LoanDetails
            @amount="LoanAmounts"
            @time="LoanTimes"
            @lowPay="lowPay"
            @monRate="monRate"
            :amount="rateDesAmount"
            :time="rateDesTime"
            :value="value"
            :programList="programList"
            :amounts="amountArray"
          ></LoanDetails>
          <div class="rateDes">
            <strong>借款费用说明</strong>
            <p>
              利率按实际的借款月数收取，每月收取借款金额的{{ monthRate }}，
              实际利率将根据您的资料最终审核确定，提供真实有效的资料有助于提高您的审批通过率。
            </p>
          </div>
        </div>
      </scroller>
    </Popup>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
@import "~bowerComponents/sass-rem/_rem.scss";
@import "../varibale.scss";
.hmfq-content {
  .banner {
    position: relative;
    width: 100%;
    height: auto;
    padding-top: rem(40px);
    img {
      width: 100%;
    }
    .rate-tips {
      position: absolute;
      left: 0;
      bottom: rem(6px);
      width: 100%;
      height: rem(38px);
      line-height: rem(38px);
      padding: 0 rem(15px);
      font-size: rem(13px);
      color: #fff;
      background:rgba(255,255,255,0.2);
    }
  }
  .pro-wrap {
    //width: 100%;
    height: 100%;
    background: #fff;
    padding: rem(20px) rem(15px);
    /deep/ .pro-title {
      //background: url("./images/loan-amont-icon.png") 0 center no-repeat;
      background-size: 16px;
    }
    /deep/ .time {
      //background: url("./images/loan-time-icon.png") 0 center no-repeat;
      background-size: 16px;
    }
    .outPro-wrap {
      width: 100%;
      margin: 0 auto;
      .rate-wrap {
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-size: rem(15px);
        color: #333;
        line-height: 1rem;
        .repay {
          color: $warning-color;
        }
      }
      .rate-handeler {
        width: 45%;
        font-size: rem(15px);
        color: #666;
        line-height: 1rem;
        overflow: hidden;
        p {
          display: inline-block;
        }
        .rateCal {
          position: relative;
          color: $warning-color;
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
          padding-right: rem(6px);
        }
      }
      .miaodaiBtn {
        width: 100%;
        height: rem(44px);
        line-height: rem(44px);
        font-size: rem(17px);
        background: $hmfq-theme-color;
        border-radius: 0.22222rem;
        border: transparent;
        color: #fff;
        margin: rem(32px) auto 0.5rem;
        &:active {
          background-color: darken($hmfq-theme-color, 5%);
        }
      }
    }
  }
  // .rate-title {
  //     background-color: transparent;
  //   /deep/ .vux-header {
  //     width: 100%;
  //     background-color: #fff;
  //   }
  // }
  .rate-header {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: rem(46px);
    background: transparent;
    .left-arrow, .black {
      position: absolute;
      width: 30px;
      height: 30px;
      top: 9px;
      left: 13px;
      z-index: 999;
      &:before {
        content: "";
        position: absolute;
        width: 12px;
        height: 12px;
        border: 1px solid #ccc;
        border-width: 1px 0 0 1px;
        transform: rotate(315deg);
        top: 8px;
        left: 7px;
        border-left: 1px solid #fff;
        border-top: 1px solid #fff;
      }
    }
    .left-arrow.black:before{
      border-left: 1px solid #333;
      border-top: 1px solid #333;
    }
    .bg {
      background: #fff;
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      font-size: rem(17px);
      text-align: center;
      height: rem(46px);
      line-height: rem(46px);
      color: #333;
    }
    .title {
      width: 100%;
      font-size: rem(17px);
      text-align: center;
      height: rem(46px);
      line-height: rem(46px);
      color: #fff;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      &.black {
        color: #333;
      }
    }
  }
  .rateWrap {
    width: 100%;
    min-height: 100%;
    .rateUpBg {
      background: $hmfq-theme-color;
      padding-top: rem(78px);
      height: rem(48px);
      margin-bottom: rem(80px);
      .rateDesNumber {
        width: rem(345px);
        border-radius: 5px;
        margin: 0 auto;
        .rateDesHd {
          color: #fff;
          border-radius: 5px 5px 0 0;
          background:rgba(255,255,255,0.2043);
          li {
            float: left;
            width: 25%;
            text-align: center;
            height: rem(48px);
            line-height: rem(48px);
            color:#fff;
            font-size: rem(15px);
          }
          li:last-of-type {
            width: 50%;
          }
        }
        .rateDesCon {
          box-shadow:0px 4px 6px 0px rgba(153,153,153,0.1);
          border-radius:0px 0px 5px 5px;
          li {
            float: left;
            width: 25%;
            text-align: center;
            height: 2.1rem;
            line-height: 2.1rem;
            color: $hmfq-theme-color;
            font-size: rem(17px);
          }
          li:last-of-type {
            width: 50%;
          }
        }
      }
    }
    .rateDes {
      padding: 0 rem(15px);
      strong {
        font-size: rem(17px);
        color: #333;
        padding: rem(8px) 0;
        display: block;
        font-weight: 400;
      }
      p {
        font-size: rem(15px);
        width: 100%;
        line-height: rem(21px);
        color: $gray-font-color;
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
import { Popup, Alert, Scroller } from "vux";
import LoanDetails from "@/themes/pages/LoanDetails";
import PageHeader from "@/components/PageHeader.vue";

export default {
  components: {
    LoanDetails,
    PageHeader,
    Popup,
    Alert,
    Scroller
  },
  data() {
    return {
      opacity: 0,
      title: "嗨秒分期",
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
      rateDesAmount: {index: 0},
      rateDesTime: {time: {}, index: 0},
      btnName: "",
      flag2: "",
      rateDesRate: "",
      monthRate: "",
      infoHeaderPic: "",
      changeBlackColor: false,
      checkSupportData: {},
      productInfoData: {},
      programList: [],
      amountArray: [],
      merProid: "",
      saleSiteId: "",
      supplierId: ""
    };
  },
  methods: {
    onScroll: function(pos) {
      let top = pos.top > 44 ? 44 : pos.top;
      if (pos.top > 44) {
        pos.top = 44;
        this.changeBlackColor = true;
      } else {
        this.changeBlackColor = false;
      }
      this.opacity = (1 / 44) * top;
    },
    LoanAmounts(amount) {
      this.rateDesAmount = amount;
    },
    LoanTimes(time) {
      this.rateDesTime = time;
    },
    rateShow() {
      this.value = true;
    },
    popupHide(value) {
      console.log("close")
      this.value = false;
    },
    lowPay(lowPay) {
      this.repayMoney = lowPay;
    },
    monRate(monRate) {
      this.monthRate = monRate;
    },
    fastLoanFirst() {
      let postData = new URLSearchParams();
      postData.append("userName", this.utils.getCookie("userName"));
      postData.append("fastAmt", this.rateDesAmount.amount);
      postData.append("fastPeriod", this.rateDesTime.time.productId);
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
          console.log(this.rateDesAmount, this.repayMoney)
          this.utils.setCookie(
            "prodetailInfo",
            this.rateDesAmount.amount + ":" + this.rateDesTime.time.productId
          );
          this.utils.setCookie(
            "prodetailInfo2",
            this.repayMoney + ":" + this.rateDesTime
          );
          this.utils.setCookie("checkSupportIsCredit", this.checkSupportData.isCredit);

          const backUrl = !this.checkSupportData.isCredit || this.checkSupportData.isCredit == '0' ? this.config.NEW_MWEB_PATH + '/product/basic-info' : this.config.NEW_MWEB_PATH + '/loanProgress';

          window.hicashJSCommunication.onCallApp(
            JSON.stringify({ type: "identity_auth", isCredit: this.checkSupportData.isCredit, checkSupportRes: this.checkSupportData, tempAppNo: data.appFlowNo, industryCode: this.utils.getCookie("industryCode"), applyAmount: this.rateDesAmount.amount, backUrl:  backUrl, merProId: this.merProId, supplierId: this.supplierId, siteId: this.saleSiteId,loanProduct: this.rateDesTime.time.productId })
          );
        } else if (data.resultCode == "60100") {
          this.$vux.toast.text(data.resultMsg, "middle");
          this.$router.push({ name: "Login" });
        } else {
          this.$vux.toast.text(data.resultMsg, "middle");
        }
      });
    },
    getProductDetail() {
      // let postData = new URLSearchParams();
      // postData.append("industryCode", this.utils.getCookie("industryCode"));
      
      let postData = {
        industryCode: this.utils.getCookie("industryCode")
      }

      this.common.getProductDetail(postData).then(res => {
        let data = res.data;
        this.amountArray = data.amountArray.split(",");
        console.info('data.productShowList == ', data.productShowList);

        this.infoHeaderPic = data.productDetailImg;
        this.productInfoData = data.productShowList;
        this.programList = data.productShowList;
        this.rateDesTime = { time: data.productShowList[0], index: 0 };

        this.rateDesAmount = { amount: this.amountArray[0], index: 0 };

        this.btnName = this.utils.getCookie("industryCode") === "LDDD" ? "立即滴答" : "立即分期";
        this.flag2 = this.utils.getCookie("industryCode") === "LDDD" ? "天" : "个月";

        this.merProid = data.merProid;
        this.saleSiteId = data.saleSiteId;
        this.supplierId = data.supplierId;
        console.log(typeof this.merProid, typeof this.saleSiteId, typeof this.supplierId)
        this.utils.setCookie("merProId", this.merProid);
        this.utils.setCookie("saleSiteId", this.saleSiteId);
        this.utils.setCookie("supplierId", this.supplierId);

        this.$refs.loanDetailsCom.LoanPay(data.productShowList[0].productPeriod, this.amountArray[0])
      });
    },
    checkSupportApp() {
      let postData = new URLSearchParams();
      postData.append("industryCode", this.utils.getCookie("industryCode"));
      postData.append("custType", this.utils.getCookie("custType"));
      postData.append("mobile", this.utils.getCookie("mobile"));
      postData.append("is_type", "N");
      postData.append("user_name", this.utils.getCookie("userName"));
      postData.append("tranPrice", this.rateDesAmount.amount);
      postData.append("applyFrom", "H5");
      postData.append("uuid", this.utils.uuid());
      postData.append("periods", this.rateDesTime.time.productPeriod);
      postData.append("loanProductId", this.rateDesTime.time.productId);
      console.log(this.rateDesTime.time.productPeriod)
      this.common.checkSupportApp(postData).then(res => {
        let data = res.data;
        if (data.resultCode == "1") {
          this.checkSupportData = data;
          // this.$vux.toast.text(data.resultMsg, "middle");
          this.fastLoanFirst();
        } else {
          console.log(this.checkSupportData, this.rateDesAmount.amount, this.rateDesTime.time)
          this.$vux.toast.text(data.resultMsg, "middle");
        }
      });
    }
  },
  created() {
    let industryCode = this.$route.query.industryCode;

    this.utils.setCookie("industryCode", this.$route.query.industryCode);
    this.getProductDetail();
    
  },
  mounted() {}
};
</script>
