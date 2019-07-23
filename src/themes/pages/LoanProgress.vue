<template>
  <div class="bfFaile" id="bfFaile">
    <div class="header" v-if="isShow">
      <page-header :title="title" :showBack="showBack" :showBtnClose="showBtnClose" :jumpRouteName="jumpRouteName"></page-header>
    </div>
    <div class="sigGray"></div>
      <div class="loanContainer">
        <div class="loanText">
          <p class="loanProduct">
            <span class="productNameShow">您的{{ productName }}</span>申请已提交
          </p>
          <p class="loanTime">{{ loanTime }}</p>
          <div class="loan-detail-wrap">
            <div class="loanDetail loanOne">
              <p class="title">借款</p>
              <p class="loanAmount">{{ loanAmount }}</p>
            </div>
            <div class="loanDetail loanThree">
              <p class="title">借款期数</p>
              <p class="loanInstall">{{ loanInstall }}</p>
            </div>
          </div>
        </div>
        <div class="loanVoucher" v-if="isLoanVoucher">
          <p class="discount">
            <span class="discount_name">{{ discountName }}</span>：
            <span class="discount_str">{{ discountStr }}</span>
          </p>
        </div>
        <div class="loanInco">
          <p class="loanAudit" alt="">{{ loanAudit }}</p>
          <div class="LoanP">
            <p>您的订单正在审核中，请耐心等待...</p>
          </div>
        </div>
        <div class="tips">
          <p class="title">重要提示</p>
          <p class="desc">{{noticeMessage}}</p>
        </div>
      </div>
    <div class="inLoanWrap">
      <div class="inLoan" @click="selectMore">
        查看更多产品
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
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
    padding: 0 rem(15px);
    .loanText {
      text-align: left;
      clear: both;
      overflow: hidden;    
      color: #a4a4a4;
      .loanProduct {
        text-align: center;
        color: #333;
        font-size: rem(17px);
      }
      .loanTime {
        text-align: center;
        font-size: rem(13px);
        margin-top: rem(7px);
        color: #999999;
      }
      .loan-detail-wrap {
        padding: 0 rem(53px);
        display: flex;
        justify-content: space-between;
        .loanDetail {
          width: 40%;
          position: relative;
          line-height: 1.1rem;
          margin-top: .7rem;
          font-size: .6rem;
          padding-left: rem(10px);
          .title {
            color: #999;
            margin-top: rem(-2px);
          }
          .loanAmount, .loanInstall {
            color: #333;
            margin-bottom: rem(-3px);
          }
        }
        // .loanDetail:before {
        //   position: absolute;
        //   content: "";
        //   width: .12rem;
        //   height: 100%;
        //   border-radius: .6rem;
        //   background: #F89839;
        //   left: -.3rem;
        //   top: 0;
        //   overflow: visible;
        //   visibility: visible;
        // }
        .loanOne {
          border-left: 2px solid #FF7640;
        }
        .loanThree {
          width: rem(60px);
          border-left: 2px solid #11C4FF;
        }
        // .loanThree:before {
        //   background-color: #11c4ff;  
        // }
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
      margin-top: rem(60px);  
      .loanAudit {
        display: inline-block;
        width: rem(80px);
        height: rem(80px);
        background: url("../images/loanProgress/icon_audit.png") no-repeat;
        background-size: cover;
      }
      .loanIn {
        color: #ff7640;
        font-size: .75rem;
        display: block;
        margin-bottom: .825rem;  
      }
      .LoanP {
        margin-top: rem(18px);
        p {
          color: #3f3f3f;
          font-size: rem(15px);
          line-height: .85rem;  
        }  
      }
    }
    .tips {
      padding: rem(15px);
      background: #F7F7F7;
      margin-top: rem(62px);
      text-align: left;
      .title {
        font-size: rem(20px);
        font-weight: 500;
        color: #D0021B;
      }
      .desc {
        margin-top: rem(8px);
        font-size: rem(15px);
        color: #666666;
        line-height: rem(21px);
      }
    }
  }
  .inLoanWrap {
    padding: 0 .85rem;
    .inLoan {
      height: 1.875rem;
      text-align: center;
      margin-top: 1.25rem;
      background-color: #333;
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
import LoanProgress from "@/api/loanProgress";

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
      jumpRouteName: "MyInstalment",
      noticeMessage: ""
    };
  },
  ready() {},
  methods: {
    init() {
        let userName = this.$route.query.userName || this.utils.getCookie("userName");
        if (!userName || userName == "null") {
            this.$router.push({path : "/login"})
        } else{
          this.getInfo();
        }
    },
    getInfo() {
        let appNo = this.$route.query.appNo || this.utils.getCookie("successNo");
        let postData = new URLSearchParams();
        postData.append("appNo", appNo);
        LoanProgress.orderCreatedPage(postData).then(res =>{
            let data = res.data;
            if(data.resultCode === "1") {
                this.productName = data.orderCreatePage.productName;
                this.loanTime = data.orderCreatePage.createDate;
                this.loanAmount = data.orderCreatePage.applyAmount;
                this.loanInstall = data.orderCreatePage.applyPeriod;
                this.noticeMessage = data.orderCreatePage.noticeMessage;
                // if (data.discount_name != "" && data.discount_str != "") {
                //     this.discountName = data.discount_name;
                //     this.discountStr = data.discount_str;
                //     this.isLoanVoucher = true;
                // }
                // this.loanEveryAmount = "￥" + data.lowPay + "-￥" + data.highPay;
            } else {
              this.$vux.toast.show({
                type: "text",
                position: "middle",
                text: data.resultMsg
              });
            }
        })
    },
    selectMore() {
        window.location.href = "http://www.guoxinbao.com.cn/h5_hq_index.html?mobile=18518206648&source=HQshenhe";
    }
  },
  watch: {},
  mounted: function() {
    let _this = this;
    _this.init();
  }
};
</script>
