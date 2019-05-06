<template>
  <div class="content">
    <page-header :title="title" :showBack="showBack" :showBtnClose="showBtnClose" v-if="platform === 'H5'"></page-header>
    <div class="loan-content" :class="{ appContent: platform === 'APP' }" v-if="!isDepositoryUrl">
      <div class="loan-tips">
        <p class="loan-time">{{loanTime}}</p>
        <p class="loan-text">资料审核已通过</p>
      </div>
      <div class="loan-detail">
        <p class="item">
          <span class="title">借款金额(元)</span>
          <span class="value">{{loanAmount}}</span>
        </p>
        <p class="item">
          <span class="title">每期本息还款</span>
          <span class="value">{{monthPayAmt}}</span>
        </p>
        <p class="item">
          <span class="title">借款期数</span>
          <span class="value">{{term}}</span>
        </p>
        <div class="coupon">无可用优惠券</div>
      </div>
      <p class="confirm-tips">请确认您的借款金额后签约提现</p>
      <div class="agreement-list">
        <div class="item-wrap" v-for="(item, index) in agreementsH5" :key="index">
          <div class="item">
            <check-icon :value.sync="item.isAgree" class="agree-icon" @click.native="check(item)"></check-icon>
            <span class="desc">{{item.insurance[0].desFront}}</span>
            <span class="agreement-tmpl" v-html="item.agreementTmpl"></span>
            <span
              class="desc"
              v-if="item.insurance[item.insurance.length -1].desBehind"
            >{{item.insurance[item.insurance.length -1].desBehind}}</span>
            <div class="agreement-detail">
              <p class="detail-item" v-for="(detailItem, index) in item.desDetails" :key="index">
                <span>{{detailItem.name}}</span>
                <span class="loan-amount">{{detailItem.content}}</span>
              </p>
              <a class="jump-to-detail" :href="item.desUrl" v-if="item.desTitle && item.desUrl"><span>详情</span><x-icon type="ios-arrow-right" size="20"></x-icon></a>
            </div>
          </div>
          <p class="agree-text" v-if="item.desBelow">{{item.desBelow}}</p>
          <confirm
            v-model="item.showPop"
            title="提示"
            :content="popContent"
            class="sign-pop"
            @on-confirm="popConfirm(item)"
          >
          </confirm>
        </div>
      </div>
      <div class="actions">
        <router-link class="cancel" :to="{ name: 'Personal'}">取消</router-link>
        <a class="sign" @click="sign">签约</a>
      </div>
    </div>
    <iframe id="iframe" :src="depositoryUrl" width="100%" height="100%" frameborder="no" v-else></iframe>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import { CheckIcon, Confirm } from "vux";
import Signature from "@/api/signature";
export default {
  components: {
    PageHeader,
    CheckIcon,
    Confirm
  },
  data() {
    return {
      title: this.$route.meta.title,
      showBack: true,
      showBtnClose: false,
      platform: this.utils.getPlatform(),
      loanTime: "",
      userName: this.utils.getCookie("userName"),
      mobile: this.utils.getCookie("mobile"),
      appNo: this.$route.query.appNo,
      isAgree0: false,
      isDepositoryUrl: false,
      depositoryUrl: "",
      loanAmount: "",
      monthPayAmt: "",
      term: "",
      agreementsH5: [],
      industryCode: "",
      showPop: true,
      popContent: "",
      popIsClosed: false
    };
  },
  methods: {
    getShowPI() {
      let ShowPIData = new URLSearchParams();
      ShowPIData.append("userName", this.userName);
      ShowPIData.append("uuid", this.utils.uuid());
      ShowPIData.append("userId", this.mobile);
      ShowPIData.append("appNo", this.appNo);
      ShowPIData.append("comeFrom", "H5");
      this.common.ShowPI(ShowPIData).then(res => {
        let data = res.data;
        if (data.resultCode === "1") {
          //data.depositoryUrl = "http://www.baidu.com";
          if (data.depositoryUrl) {
            this.isDepositoryUrl = true;
            this.title = "提示";
            this.depositoryUrl = data.depositoryUrl;
          } else if( data.regStatus === "2" || data.regStatus === "4" || data.regStatus === "5"){
            window.location.href = this.config.MWEB_PATH+"newweb/creditInfo/accopSchedule.html?type="+data.regStatus;
          } else {
            this.isDepositoryUrl = false;
            this.title = this.$route.meta.title;
          }
        } else {
          this.$vux.toast.show({
            type: "text",
            position: "middle",
            text: "授权失败，请重新登录"
          });
          setTimeout(() => {
            this.$router.push({ name: "Login" });
          }, 3000);
        }
      });
    },
    showWaitTime() {
      let showWaitTimeObj = new URLSearchParams();
      showWaitTimeObj.append("app_no", this.appNo);
      showWaitTimeObj.append("uuid", this.utils.uuid());
      Signature.showWaitTime(showWaitTimeObj).then( res=> {
        let data = res.data;
        if (data.resultCode === "1") {
          this.loanTime = data.date;
          this.loanAmount = data.applyAmt;
          this.monthPayAmt = data.monthPayAmt;
          this.term = data.term;
          let agreementsH5 = data.agreementsH5;
          agreementsH5.forEach( val => {
            val.isAgree = false;
            val.showPop = false;
            let agreementTmplArr = [];
            val.insurance.forEach( item => {
              agreementTmplArr[agreementTmplArr.length] = '<a href="' + item.url + '" target="_blank">' + item.name + '</a>';
            })
            val.agreementTmpl =agreementTmplArr.join("、") 
          });
          this.agreementsH5 = agreementsH5;
          this.industryCode=data.industryCode;
          if(data.isCancel == "true") {
            this.$vux.toast.show({
              type: "text",
              position: "middle",
              text: "由于该订单已取消，无法进行签约"
            });
            setTimeout( ()=> {
              this.$router.push({name: 'Home'})
            },1000)
          }
          if(data.userName != this.userName && data.userName.toLowerCase() != this.userName){
            this.$vux.toast.show({
              type: "text",
              position: "middle",
              text: "非法进入"
            });
            setTimeout( ()=> {
              this.$router.push({name: 'Home'})
            },1000)
          }
          this.utils.setCookie("prodetailInfo", data.applyAmt.replace("元","")+":"+data.loanProduct);
          this.utils.setCookie("realAddress", data.realAddress);
          this.utils.setCookie("identityCode", data.iCode);
        } else {
          this.$vux.toast.show({
            type: "text",
            position: "middle",
            text: data.resultMsg
          });
        }
      });
    },
    sign() {
      console.log("sign===", this.agreementsH5);
      let isAgreeArr = _.pluck(this.agreementsH5, "isAgree");
      if(_.contains(isAgreeArr,false)) {
        this.$vux.toast.show({
          type: "text",
          position: "middle",
          text: "请同意相关协议"
        });
        return;
      }
      this.$router.push({name: 'Reminder', query: {appNo: this.appNo, industryCode: this.industryCode}})
    },
    check(item) {
      if(item.popInsuranceMsg) {
        if(item.isAgree) {
          this.popIsClosed = false;
        }
        item.isAgree = false;
        if(!this.popIsClosed && !item.isAgree) {
          item.showPop = true;
          this.popContent = item.popInsuranceMsg;
        }
      }
    },
    popConfirm(item) {
      item.isAgree = true;
      this.popIsClosed = true;
    }
  },
  mounted() {
    this.getShowPI();
    this.showWaitTime();
  }
};
</script>

<style lang="scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";
#iframe{
    height: 95vh;
    margin-top: 50px;
}
.content {
  width: 100%;
  height: 100%;
  /deep/ .vux-header {
    background-color: #fd7f5f;
    .vux-header-left {
      .left-arrow {
        &:before {
          border-left: 1px solid #fff;
          border-top: 1px solid #fff;
        }
      }
    }
    .vux-header-title {
      color: #fff;
    }
  }
  .loan-content {
    padding-top: rem(40px);
    background: #fff;
    .loan-tips {
      padding-top: rem(10px);
      padding-bottom: rem(50px);
      background-image: linear-gradient(to bottom, #fd7f5f, #fb905c);
      .loan-time {
        margin-top: 0;
        opacity: 0.95;
        border-radius: rem(5px);
        width: 40%;
        margin: 0 auto;
        padding: rem(5px) rem(5px);
        color: #fff;
        background: #fb9574;
        text-align: center;
        font-size: 14px;
      }
      .loan-text {
        display: block;
        width: rem(203px);
        height: rem(34px);
        border-radius: 60px;
        color: #a28362;
        line-height: rem(34px);
        text-align: center;
        font-size: 18px;
        background: #fff;
        margin: 0 auto;
        margin-top: rem(20px);
      }
    }
    .loan-detail {
      width: rem(250px);
      height: rem(100px);
      background: #fff;
      box-shadow: 0px 1px 2px 1px rgba(252, 133, 94, 0.2);
      border-radius: 17px;
      margin: 0 auto;
      margin-top: rem(-34px);
      padding: rem(20px) rem(31px);
      font-size: 16px;
      color: #999999;
      .item {
        display: flex;
        justify-content: space-between;
        line-height: rem(26px);
        .value {
          color: #333;
        }
      }
      .coupon {
        width: 100%;
        height: rem(39px);
        line-height: rem(30px);
        border-top: 1px solid #ddd;
        margin: 0 auto;
        margin-top: rem(8px);
      }
    }
    .confirm-tips {
      margin-top: rem(20px);
      margin-bottom: rem(30px);
      text-align: center;
      font-size: 16px;
    }
    .agreement-list {
      .item-wrap {
        margin-top: rem(18px);
        .item {
          position: relative;
          width: rem(280px);
          line-height: rem(21px);
          color: #999;
          background: #fff;
          box-shadow: 0px 1px 2px 1px rgba(252, 133, 94, 0.2);
          border-radius: 15px;
          font-size: 14px;
          padding: rem(23px) rem(14px) rem(13px) rem(44px);
          margin: 0 auto;
          .agree-icon {
            position: absolute;
            left: rem(16px);
            top: rem(25px);
            color: #d0d0d0;
            /deep/ .weui-icon-circle {
              font-size: 18px;
            }
            /deep/ .weui-icon-success {
              font-size: 18px;
              &:before {
                color: #ff7640;
              }
            }
          }
          .desc {
            display: block;
          }
          .agreement-tmpl {
            /deep/ a {
              color: #c04e22;
              text-decoration: underline;
            }
          }
          .agreement-detail {
            position: relative;
            margin-top: rem(12px);
            display: flex;
            .jump-to-detail {
              display: flex;
              justify-content: space-between;
              align-items: center;
              position: absolute;
              color: #FF7640;
              right: 0;
              top: rem(-54px);
              text-align: right;
              padding-left: rem(20px);
              font-size: 14px;
              .vux-x-icon-ios-arrow-right {
                font-size: 16px;
                fill: #FF7640;
              }
            }
            .detail-item {
              padding: 0 rem(10px);
              border-right: 1px solid #ddd;
              &:first-child {
                padding-left: 0;
              }
              &:last-child {
                padding-right: 0;
                border-right: 0;
              }
              span {
                display: block;
                text-align: center;
                &.loan-amount {
                  color: #333;
                }
              }
            }
          }
        }
        .agree-text {
          margin-top: rem(18px);
          color: #999;
          font-size: 14px;
          padding: 0 rem(41px);
          line-height: rem(20px);
        }
      }
    }
    .actions {
      display: flex;
      justify-content: space-between;
      padding: rem(28px) rem(17px) rem(30px) rem(17px);
      a {
        width: rem(162px);
        height: rem(44px);
        line-height: rem(44px);
        border-radius: 5px;
        font-size: 16px;
        color: #fff;
        text-align: center;
        &.cancel {
          border: 1px solid #333333;
          color: #333;
        }
        &.sign {
          background: #333;
        }
      }
    }
  }
  .appContent {
    padding-top: 0;
  }
  .sign-pop {
    /deep/ .weui-dialog__hd {
      padding: .2em 1.6em .5em 1.6em;
      background: #FF7640;
      color: #fff;
    }
    /deep/ .weui-dialog__btn_default {
      font-size: 15px;
      color: #ccc;
    }
    /deep/ .weui-dialog__bd{
      padding: 1.6em 0.8em;
    }
  }
}
</style>

