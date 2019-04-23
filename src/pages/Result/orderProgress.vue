<template>
  <div class="bfFaile" id="bfFaile">
    <div class="header" v-if="isShow">
      <page-header :title="title" :showBack="showBack" :showBtnClose="showBtnClose" :jumpRouteName="jumpRouteName"></page-header>
    </div>
    <div class="sigGray"></div>
    <div class="loanContainer">
      <div class="loanText">
        <p class="loanProduct">
          您的分期申请已提交
        </p>
        <p class="loanTime">{{ loanTime }}</p>
        <p class="loanDetail loanOne">
          借款<span class="loanAmount">{{ loanAmount }}</span>
        </p>
        <p class="loanDetail loanThree">
          借款期数<span class="loanInstall">{{ loanInstall }}</span>
        </p>
      </div>
      <div class="loanVoucher" v-if="isLoanVoucher">
        <p class="discount">
          <span class="discount_name">{{ discountName }}</span>：
          <span class="discount_str">{{ discountStr }}</span>
        </p>
      </div>
      <div class="loanInco">
        <p class="loanAudit" alt="">{{ loanAudit }}</p>
        <span class="loanIn">您的订单正在审核中，请耐心等待...</span>
      </div>
    </div>
    <div class="important-tips">
      <p class="title">重要提示</p>
      <p class="des">
        亲爱的用户您好，为保障您的信息安全和资金安全，签约步骤必须在APP内完成，请前往应用商店下载嗨钱APP。通过嗨钱APP借款，额度更高，下款更快，还有机会获取免息优惠券哦。
      </p>
    </div>
    <div class="inLoanWrap">
      <div class="inLoan" @click="selectMore">
        下载APP
      </div>
    </div>
  </div>
</template>

<style  lang="scss" rel="stylesheet/scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";
.bfFaile {
  width: 100%;
  text-align: center;
  .sigGray {
    height: .4rem;
    background-color: #f1f1f1;
    margin-top: 2.2rem;
  }
  .loanContainer {
    margin-top: 1rem;
    padding: 0 .85rem;
    .loanText {
      padding: 0 1rem;
      text-align: left;
      clear: both;
      overflow: hidden;    
      color: #a4a4a4;
      .loanProduct {
        text-align: center;
        color: #333;
        font-size: .75rem;
      }
      .loanTime {
        text-align: center;
        font-size: .55rem;
        margin-top: .7rem;
      }
      .loanDetail {
      width: 40%;
      position: relative;
      line-height: 1.1rem;
      margin-top: .7rem;
      font-size: .6rem;
      span {
        display: inline-block;
        text-align: right;
        color: #333;
        position: absolute;
        right: 0;  
      }
      }
      .loanDetail:before {
        position: absolute;
        content: "";
        width: .12rem;
        height: 100%;
        border-radius: .6rem;
        background: #F89839;
        left: -.3rem;
        top: 0;
        overflow: visible;
        visibility: visible;
      }
      .loanOne {
        float: left;
        margin-left: 1.2rem;
      }
      .loanOne:before {
        background-color: #ff7640;
      }
      .loanThree {
        float: right;
        margin-left: 0;
      }
      .loanThree:before {
        background-color: #11c4ff;  
      }
    }
    .loanVoucher {
      position: relative;
      font-size: .6rem;
      text-align: center;
      margin-top: .75rem;
      .discount {
        line-height: .6rem;
        .discount_name {
          color: #999;
        }
      }
      .discount:before {
        position: absolute;
        content: "";
        width: .16rem;
        height: 100%;
        border-radius: .6rem;
        background: #F89839;
        left: 3.8rem;
        top: 0;
        overflow: visible;
        visibility: visible;
      }
    }
    .loanEvery {
      font-size: .57rem;
      color: #333;
      margin-top: .5rem;
      padding: 0 1.8rem;
      text-align: center;  
    }
    .loanInco {
      width: 100%;
      text-align: center;
      margin-top: rem(58px);  
      .loanAudit {
        display: inline-block;
        width: rem(80px);
        height: rem(80px);
        background: url("./images/order-progress-ico.png") no-repeat;
        background-size: cover;
      }
      .loanIn {
        height: rem(21px);
        line-height: rem(21px);
        font-size: rem(15px);
        display: block;
        margin-top: rem(20px);  
        font-weight:400;
        color:rgba(51,51,51,1);
      }
      .LoanP {
        p {
          color: #3f3f3f;
          font-size: .6rem;
          line-height: .85rem;  
        }  
      }
    }
  }
  .important-tips{
    width: calc(90% - 30px);
    height: auto;
    background:rgba(247,247,247,1);
    border-radius:4px;
    margin: 0 auto;
    margin-top: rem(60px);
    padding: 15px;
    .title{
      font-size: rem(20px);
      font-weight:500;
      color:rgba(208,2,27,1);
      text-align: left;
    }
    .des{
      font-size: rem(15px);
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height: rem(21px);
      text-align: justify;
      margin-top: rem(8px);
    }
  }
  .inLoanWrap {
    padding: 0 .85rem;
    .inLoan {
      height: 1.875rem;
      text-align: center;
      margin-top: 1.25rem;
      background:rgba(255,118,64,1);
      border-radius: .15rem;
      font-size: .65rem;
      line-height: 1.875rem;
      color: #fff;  
    }
  }
}
</style>

<script type="text/javascript">
import PageHeader from "@/components/PageHeader.vue";
import { Toast } from "vux";
import utils from "@/assets/js/utils";

export default {
  components: { PageHeader, Toast },
  data() {
    return {
      title: "借款进度",
      showBack: true,
      showBtnClose: false,
      isShow: true,
      isLoanVoucher: false,
      productName: "",
      loanTime: "",
      loanAmount: "",
      loanInstall: "",
      discountName: "",
      discountStr: "",
      loanEveryAmount: "",
      loanAudit: "",
      waitTime: "",
      jumpRouteName: "MyInstalment"
    };
  },
  ready() {},
  methods: {
    getInfo() {
        let appNo = this.$route.query.appNo || utils.getCookie("successNo");
        let postData = new URLSearchParams();
        postData.append("app_no", appNo);
        this.common.ShowWaitTime(postData).then(res =>{
            let data = res.data;
            if(data.resultCode == "1") {
                this.productName = data.pro_name;
                this.loanTime = data.date;
                this.loanAmount = data.applyAmt;
                this.loanInstall = data.term;
                this.waitTime = data.time;
                if (data.discount_name != "" && data.discount_str != "") {
                    this.discountName = data.discount_name;
                    this.discountStr = data.discount_str;
                    this.isLoanVoucher = true;
                }
                this.loanEveryAmount = "￥" + data.lowPay + "-￥" + data.highPay;
            }
        })
    },
    selectMore() {
      window.location.href = "https://m.hicash.cn/newweb/activity/downloadApp.html";
    }
  },
  mounted: function() {
    this.getInfo();
  }
};
</script>
