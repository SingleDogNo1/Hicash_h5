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
          <span class="title">借款期数</span>
          <span class="value">{{term}}</span>
        </p>
        <div class="coupon">无可用优惠券</div>
      </div>
      
      <p class="confirm-tips">请确认您的借款金额后签约提现</p>

      <div class="item-wrap" ref="feeListRef">
        <p class="item">
          <span class="title">本息还款</span>
          <span class="value">{{loanAmount}}</span>
        </p>
        <p class="item">
          <span class="title">金融信息服务费
            <x-icon type="ios-help-outline" ref="popoverHelp" size="20" class="help serviceFee" @click="serviceFeeClick"></x-icon>
          </span>
          <span class="value">{{term}}</span>
        </p>
        <p class="item">
          <span class="title">互联网信息服务费
            <x-icon type="ios-help-outline" ref="popoverInfoFeeHelp" size="20" class="help infoFee" @click="infoFeeClick"></x-icon>
          </span>
          <span class="value"><i class="des">一次性划扣</i>{{term}}</span>
        </p>
      </div>

      <div class="item-wrap">
        <swiper height="250px" :show-dots="false" v-model="swiper_index" :min-moving-distance="20000">
          <swiper-item>
            <div class="swiper-header">
              <div class="title">还款计划</div>
              <x-icon class="arrow-right" type="ios-arrow-right" size="18" @click.native="swiper_index = 1"></x-icon> 
            </div>
            <ul>
              <li>
                <div class="number">
                  首期
                </div>
                <div class="number-des">
                  <div class="money">1424</div>
                  <div class="des">含本金1000.00+利息61.00+金融信息服务费 168.00</div>
                </div>
              </li>
              <li>
                <div class="number">
                  2期
                </div>
                <div class="number-des">
                  <div class="money">1424</div>
                  <div class="des">含本金1000.00+利息61.00+金融信息服务费 168.00</div>
                </div>
              </li>
              <li>
                <div class="number">
                  3期
                </div>
                <div class="number-des">
                  <div class="money">1424</div>
                  <div class="des">含本金1000.00+利息61.00+金融信息服务费 168.00</div>
                </div>
              </li>
            </ul>
          </swiper-item>

          <swiper-item>
            <div class="swiper-header ">
              <x-icon class="arrow-left" type="ios-arrow-left" size="18" @click.native="swiper_index = 0"></x-icon> 
              <div class="title-right">还款计划</div>
              <div class="title-des">互联网信息服务费划扣失败</div>
            </div>
            <ul>
              <li>
                <div class="number">
                  首期
                </div>
                <div class="number-des">
                  <div class="money">1424</div>
                  <div class="des">含本金1000.00+利息61.00+金融信息服务费 168.00</div>
                </div>
              </li>
              <li>
                <div class="number">
                  2期
                </div>
                <div class="number-des">
                  <div class="money">1424</div>
                  <div class="des">含本金1000.00+利息61.00+金融信息服务费 168.00</div>
                </div>
              </li>
              <li>
                <div class="number">
                  3期
                </div>
                <div class="number-des">
                  <div class="money">1424</div>
                  <div class="des">含本金1000.00+利息61.00+金融信息服务费 168.00</div>
                </div>
              </li>
            </ul>
          </swiper-item>
        </swiper>
      </div>

      <div class="agreement-list">
        <div class="list-item-wrap" v-for="(item, index) in agreementsH5" :key="index">
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
          <!-- <confirm
            v-model="item.showPop"
            title="提示"
            :content="popContent"
            class="sign-pop"
            @on-confirm="popConfirm(item)"
          >
          </confirm> -->
           <confirm-dialog
            :isShowDialog="item.showPop"
            :dialogTitle="dialogTitle"
            :dialogContent="popContent"
            :onConfirm="popConfirm(item)"
            @showDialog="showDialog"
          ></confirm-dialog>
        </div>
      </div>
      <div class="actions">
        <router-link class="cancel" :to="{ name: 'Personal'}">取消</router-link>
        <a class="sign" @click="sign">签约</a>
      </div>
      <div class="help-popover" ref="helpPopoverRef" :style="{top: helpPopTop, display: popHelpServicesFee}">
        <div class="help-popover-arrow" :style="{left: helpArrowLeft}"></div>
        该服务产生的费用需按期缴纳，详情请查看
      </div>
      <div class="help-popover" ref="popHelpInfoFee" :style="{top: helpInfoPopTop, display: popHelpInfoFee}">
        <div class="help-popover-arrow" :style="{left: helpInfoArrowLeft}"></div>
        该服务产生的费用需按期缴纳，详情请查看
      </div>
    </div>
    
    <iframe id="iframe" :src="depositoryUrl" width="100%" height="100%" frameborder="no" v-else></iframe>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import { CheckIcon, Confirm, Swiper, SwiperItem  } from "vux";
import Signature from "@/api/signature";
import ConfirmDialog from "@/components/Dialog.vue";
export default {
  components: {
    PageHeader,
    CheckIcon,
    Confirm,
    ConfirmDialog,
    Swiper,
    SwiperItem
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
      showPop: false,
      popContent: "",
      popIsClosed: false,
      dialogTitle: "提示",
      swiper_index: 0,
      helpPopTop: 0,
      helpArrowLeft: 0,
      helpInfoPopTop: 0,
      helpInfoArrowLeft: 0,
      popHelpServicesFee: 'none',
      popHelpInfoFee: 'none'
    };
  },
  methods: {
    showDialog(showDialog) {
			this.isShowDialog = showDialog;
		},
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
            //this.$router.push({ name: "Login" });
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
            console.log('val===', val)
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
    },
    serviceFeeClick(){
      this.popHelpServicesFee = 'block';
      console.info('serviceFeeClick');
    },
    infoFeeClick(){
      this.popHelpInfoFee = 'block';
    },
    popHelpShow(e){
      if(e.path[0].classList.value.indexOf('serviceFee') > -1){
        this.popHelpInfoFee = 'none';
      }else if(e.path[0].classList.value.indexOf('infoFee') > -1){
        this.popHelpServicesFee = 'none';
      }else if(e.path[0].classList.value.indexOf('help-popover') > -1){

      }else{
        this.popHelpInfoFee = 'none';
        this.popHelpServicesFee = 'none';
      }
    }
  },
  mounted() {
    this.helpPopTop = this.$refs.popoverHelp.getBoundingClientRect().top + 45 +'px';
    this.helpArrowLeft = this.$refs.popoverHelp.getBoundingClientRect().left - window.screen.width * 0.05 + 11 +'px';
    
    this.helpInfoPopTop = this.$refs.popoverInfoFeeHelp.getBoundingClientRect().top + 45 +'px';
    this.helpInfoArrowLeft = this.$refs.popoverInfoFeeHelp.getBoundingClientRect().left - window.screen.width * 0.05 + 11 +'px';
    
    
    this.getShowPI();
    this.showWaitTime();
    
    document.addEventListener("click", this.popHelpShow,true)
  },
  destroyed(){
    document.removeEventListener("click", this.popHelpShow, true);
  }
};
</script>

<style lang="scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";
$main-theme-color:#ff7640;
$warning-color:#ff7640;
$disabled-color:#CCCCCC;
$tab-border-color:#EEEEEE;
$gray-font-color:#999999;
$hmfq-theme-color:#5DA7EC;
$vip-theme-color:#D9C38D;
$dialog-title-bg-color:#ff7640;
$dialog-title-font-color:#ffffff;
$dialog-btn-color: #ff7640;
.content {
  width: 100%;
  height: 100%;
  /deep/ .vux-header {
    background-color: $main-theme-color;
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
    position: relative;
    .loan-tips {
      padding-top: rem(10px);
      padding-bottom: rem(50px);
      //background-image: linear-gradient(to bottom, #fd7f5f, #fb905c);
      background: $main-theme-color;
      .loan-time {
        margin-top: 0;
        opacity: 0.95;
        border-radius: rem(5px);
        width: 40%;
        margin: 0 auto;
        padding: rem(5px) rem(5px);
        color: #fff;
        text-align: center;
        font-size: rem(14px);
        background: rgba(249,249,249,.15);
      }
      .loan-text {
        display: block;
        width: rem(203px);
        height: rem(34px);
        border-radius: 60px;
        color: $main-theme-color;;
        line-height: rem(34px);
        text-align: center;
        font-size: rem(18px);
        background: #fff;
        margin: 0 auto;
        margin-top: rem(20px);
      }
    }
    .loan-detail {
      width: calc(90% - 48px);
      height: auto;
      background: #fff;
      box-shadow: 0px 1px 2px 1px rgba(252, 133, 94, 0.2);
      border-radius: 10px;
      margin: 0 auto;
      margin-top: rem(-34px);
      padding: rem(16px) 24px;
      font-size: rem(15px);
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
        height: auto;
        border-top: 1px solid #ddd;
        margin: 0 auto;
        margin-top: rem(15px);
        padding-top: rem(15px);
      }
    }
    .item-wrap {
      width: calc(90% - 48px);
      height: auto;
      background: #fff;
      box-shadow: 0px 1px 2px 1px rgba(252, 133, 94, 0.2);
      border-radius: 10px;
      margin: 0 auto;
      margin-bottom: rem(17px);
      padding: rem(16px) 24px;
      font-size: rem(15px);
      color: #999999;
      position: relative;
      .swiper-header{
        height: 20px;
        padding-bottom: rem(16px);
        border-bottom: 1px solid #EEEEEE;
        margin-bottom: rem(16px);
        .title{
          float: left;
          color: #333333;
        }
        .arrow-right{
          float: right;
          fill: #999999;
        }
        .title-right{
          float: left;
          color: #333333;
          margin-left: rem(10px);
        }
        .title-des{
          float: right;
          color: #333333;
          text-align: right;
          font-size: rem(13px);
          margin-top: rem(2px);
        }
        .arrow-left{
          float: left;
          fill: #999999;
        }
      }
      ul li{
        width: 100%;
        height: rem(70px);
        color: #333333;
        .number{
          width: 20%;
          float: left;
        }
        .number-des{
          width: 80%;
          float: right;
          .des{
            color: #999999;
            font-size: rem(13px);
            margin-top: rem(5px);
          }
        }
        &:after{
          content: '';
          clear: both;
        }
      }
      .item {
        display: flex;
        justify-content: space-between;
        line-height: rem(26px);
        
        .help{
          margin-left:5px;
          vertical-align: sub;
          fill: $main-theme-color;
        }
        .value {
          color: #333;
          i.des{
            color: #FF7640;
            font-size: 12px;
            font-style: normal;
            vertical-align: bottom;
            margin-right: 5px;
          }
        }
      }
    }
    .confirm-tips {
      margin-top: rem(20px);
      margin-bottom: rem(30px);
      text-align: center;
      font-size: rem(13px);
    }
    .agreement-list {
      .list-item-wrap {
        margin-top: rem(18px);
        .item {
          position: relative;
          width: rem(280px);
          line-height: rem(21px);
          color: #999;
          background: #fff;
          box-shadow: 0px 1px 2px 1px rgba(252, 133, 94, 0.2);
          border-radius: 10px;
          font-size: rem(14px);
          padding: rem(23px) rem(14px) rem(13px) rem(44px);
          margin: 0 auto;
          .agree-icon {
            position: absolute;
            left: rem(16px);
            top: rem(25px);
            color: #d0d0d0;
            /deep/ .weui-icon-circle {
              font-size: rem(18px);
            }
            /deep/ .weui-icon-success {
              font-size: rem(18px);
              &:before {
                color: $main-theme-color;
              }
            }
          }
          .desc {
            display: block;
          }
          .agreement-tmpl {
            /deep/ a {
              color: $warning-color;
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
              color: $warning-color;
              right: 0;
              top: rem(-54px);
              text-align: right;
              padding-left: rem(20px);
              font-size: rem(14px);
              .vux-x-icon-ios-arrow-right {
                font-size: rem(16px);
                fill: $warning-color;
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
                  color: $main-theme-color;;
                }
              }
            }
          }
        }
        .agree-text {
          margin-top: rem(18px);
          color: $gray-font-color;
          font-size: rem(14px);
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
        font-size: rem(16px);
        color: #fff;
        text-align: center;
        &.cancel {
          border: 1px solid $main-theme-color;
          color: $main-theme-color;;
        }
        &.sign {
          background: $main-theme-color;
          &:active {
            background: darken($main-theme-color, 5%);
          }
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
      font-size: rem(15px);
      color: #ccc;
    }
    /deep/ .weui-dialog__bd{
      padding: 1.6em 0.8em;
    }
  }
  .help-popover{
    width: calc(90% - 32px);
    height: auto;
    background: rgba(0, 0, 0, 0.7);
    position: absolute;
    top: 0;
    left: 5%;
    padding: rem(10px 16px);
    border-radius:rem(5px);
    font-size: rem(13px);
    color:rgba(255,255,255,1);
    line-height: rem(16px);
    .help-popover-arrow {
      position: absolute;
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 7px solid rgba(0, 0, 0, 0.7);
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      top: -7px;
    }
  }
}
</style>
