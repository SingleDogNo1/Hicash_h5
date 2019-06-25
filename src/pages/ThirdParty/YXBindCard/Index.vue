<template>
  <div class="content">
    <page-header
      :title="title"
      :showBack="showBack"
      :showBtnClose="showBtnClose"
      :isShowCloseDialog="false"
      :closeDialogTitle="closeDialogTitle"
      :closeDialogContent="closeDialogContent"
      :closeDialogConfirmText="closeDialogConfirmText"
      :closeDialogCancelText="closeDialogCancelText"
      v-if="platform === 'H5'"
    ></page-header>
    <!-- 绑定银行卡加newbindBank -->
    <div class="bind-bank-wrap">
      <group class="bind-bank-group">
        <x-input
          title="姓名"
          placeholder="请输入姓名"
          text-align="right"
          :readonly="true"
          v-model="realName"
        ></x-input>
        <x-input
          title="借记卡号"
          placeholder="请输入卡号"
          text-align="right"
          v-model="bankCardNo"
          :readonly="true"
        ></x-input>
        <x-input
          title="开户行"
          text-align="right"
          v-model="bankName"
          :readonly="true"
        ></x-input>
        <x-input title="发送验证码" v-model="vcode" class="weui-vcode">
          <button  :class="vCodeBtnStatus ? 'gray': ''" class="get-vcode" slot="right" type="primary" mini  @click.prevent="signNindCardSendSms">{{vCodeVal}}{{vCodeBtnStatus ? 's': ''}}</button>
        </x-input>
      </group>
    </div>
    <div class="next-step">
      <a href="javascript:;" @click="signBindCard">确认</a>
    </div>
    <p class="tips">您的个人隐私将被严格保密，嗨钱网不会泄漏任何您的个人信息</p>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";
// @import "~static$/themes/varibale.scss";
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
  font-family: PingFangSC-Medium;
  width: 100%;
  height: auto;
  min-height: 100%;
  overflow-y: auto;
  background-color: #efeff4;
  //background: rgb(241, 241, 241);
  header {
    .btn-close {
      right: 0.85rem;
      left: auto;
    }
    .btn-close:before {
      font-family: "iconfont";
      position: absolute;
      content: "\e6a0";
      top: 50%;
      left: 50%;
      font-size: 1rem;
      color: #3f3f3f;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
  }
  .bind-bank-wrap {
    padding: 0;
    padding-top: 1.4rem;
    background-color: #fff;
    margin-bottom: 1.25rem;
    .bind-bank-group {
      /deep/ .weui-cells {
        &:before,
        &:after {
          display: none;
        }
        .weui-cell,
        .weui-cell_select {
          font-size: rem(14px);
          color: #3f3f3f;
          .weui-select {
            color: #999;
            padding-right: 35px;
          }
        }
      }
      .card-wrap {
        /deep/ .weui-cell__ft {
          padding-right: 20px;
          &:after {
            width: rem(8px);
            height: rem(8px);
            top: 38%;
            transform: rotate(135deg);
          }
        }
      }
    }
  }
  .get-vcode{
    width: rem(90px);
    height:rem(30px);
    text-align: center;
    line-height: rem(30px);
    border: 0;
    border-radius: rem(5px);
    color: #fff;
    background: $main-theme-color;
    &.gray{
      background: #DDDDDD;
    }
  }
  .next-step {
    width: 100%;
    text-align: center;
    padding-bottom: 1.75rem;
    margin-top: 1.25rem;
    a {
      display: inline-block;
      width: 14.2rem;
      background-color: $main-theme-color;
      height: 1.875rem;
      border-radius: 0.15rem;
      font-size: 0.65rem;
      line-height: 1.875rem;
      color: #fff;
    }
  }
  .tips {
    font-size: 0.55rem;
    color: #999;
    padding: 0 1rem;
    line-height: 0.8rem;
    padding-bottom: 1.5rem;
    margin-top: -0.6rem;
  }
}

.weui-btn_primary{
  background: $dialog-btn-color;
}

/deep/ .haiqian {
  .weui-dialog__bd {
    padding-top: 0;
    padding: 1.6em .8em;
  }
}
</style>

<script type="text/javascript">
import PageHeader from "@/components/PageHeader.vue";
import bindCardApi from "@/api/bindCard";

import {
  Group,
  Cell,
  XInput,
  XButton
} from "vux";

export default {
  components: {
    PageHeader,
    Group,
    Cell,
    XInput,
    XButton
  },
  data() {
    return {
      title: this.$router.history.current.meta.title,
      showBack: true,
      showBtnClose: true,
      platform: this.utils.getPlatform(),
      closeDialogTitle: "是否放弃填写",
      closeDialogContent:
        "信息尚未填写完成，是否放弃申请？现金曾离你这么近，难道就舍它而去？",
      closeDialogConfirmText: "放弃填写",
      closeDialogCancelText: "继续填写",
      appNo: this.$route.query.appNo,
      userName: this.$route.query.userName,
      realName: '',
      bankName: '',
      bankCardNo: '',
      vcode: '',
      vCodeVal: '获取验证码',
      vCodeBtnStatus: false,
      bindCardInfo: {},
      transactionNo: ''
    };
  },
  ready() {},
  methods: {
    queryAppBankInfo(){
      let params = {
        appNo: this.appNo,
        userName: this.userName
      }

      bindCardApi.queryAppBankInfo(params)
      .then((res) => {
        let data = res.data;
        this.bindCardInfo = data;
        this.realName = data.realName;
        this.bankName = data.bankName;
        this.bankCardNo = data.bankCardNo;

      })
    },
    signNindCardSendSms(){
      let params = {
        userName: this.userName,
        appNo: this.appNo,
        realName: this.bindCardInfo.realName,
        mobile:  this.bindCardInfo.mobile,
        bankType:  this.bindCardInfo.bankType,
        bankCardNo:  this.bindCardInfo.bankCardNo
      }
      if(this.vCodeBtnStatus) return false;
      bindCardApi.signNindCardSendSms(params)
      .then((res) => {
        let data = res.data;
        
        if(data.resultCode == '1'){
          this.vCodeVal = '60';
          this.vCodeBtnStatus = true;
          this.transactionNo = data.transactionNo;
          var vCodeValInterva = setInterval(()=>{
            this.vCodeVal--
            if(this.vCodeVal < 0){
              clearInterval(vCodeValInterva);
              this.vCodeBtnStatus = false;
              this.vCodeVal = '获取验证码';
            }
          }, 1000)
        }
      })
    },
    signBindCard(){
      let params = {
        userName: this.userName,
        appNo: this.appNo,
        transactionNo: this.transactionNo,
        smsCode:  this.vcode
      }

      bindCardApi.signBindCard(params)
      .then((res) => {
        if(res.data.resultCode == '1'){
          console.info('this.appNo', this.appNo);
          this.$router.push({name: 'YXBindCardComplete', query:{appNo: this.appNo}});
        }else if(res.data.resultCode == '-1'){
          this.$router.push({name: 'YXBindCardFail'});
        }else{
          this.$vux.toast.text(res.data.resultMsg);
        }
        
      })
    }
  },
  mounted: function() {
    this.queryAppBankInfo();
  }
};
</script>
