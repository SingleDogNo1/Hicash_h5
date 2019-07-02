<template>
  <div class="content">
    <x-header :left-options="{showBack: false}" v-if="platform === 'H5'">{{ title }}<a @click="jump" class="btn-close" slot="right"></a></x-header>

    <!-- 绑定银行卡加newbindBank -->
    <div class="bind-bank-wrap" :style="{
				'padding-top':
					this.utils.getPlatform() == 'APP' ? 0 : '2.26667rem'
			}">
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
          title="开户银行"
          text-align="right"
          v-model="bankName"
          :readonly="true"
        ></x-input>
        <x-input title="验证码"  v-model="vcode" text-align="right" class="weui-vcode">
          <button :disabled='vCodeBtnStatus' :class="vCodeBtnStatus ? 'gray': ''" class="get-vcode" slot="right" type="primary" mini  @click.prevent="signNindCardSendSms">{{vCodeVal}}{{vCodeBtnStatus ? 's': ''}}</button>
        </x-input>
      </group>
    </div>
    <div class="next-step">
      <a href="javascript:;" @click="signBindCard">确定</a>
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
.vux-header {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	background-color: #fff;
	z-index: 100;	//暫時由10000改为100
	/deep/ .vux-header-left {
		/deep/ .left-arrow:before {
			border-left: 1px solid #333;
			border-top: 1px solid #333;
		}
	}
	/deep/ .vux-header-title {
		height: 1.955556rem /* 44/22.5 */;
		line-height: 1.955556rem /* 44/22.5 */;
		color: #333;
	}
	/deep/ .vux-header-right {
		right: 0.444444rem /* 10/22.5 */;
	}
	.btn-close:before {
		font-family: "iconfont";
		position: absolute;
		content: "\e6a0";
		top: 0.444444rem /* 10/22.5 */;
		right: 0;
		font-size: 0.85rem;
		color: #3f3f3f;
		-webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		-o-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}
}
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
    margin-left: rem(10px);
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
import bindCardApi from "@/api/bindCard";

import {
  Group,
  Cell,
  XInput,
  XButton,
  XHeader
} from "vux";

export default {
  components: {
    Group,
    Cell,
    XInput,
    XButton,
    XHeader
  },
  data() {
    return {
      title: this.$router.history.current.meta.title,
      showBack: true,
      platform: this.utils.getPlatform(),
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
      this.vCodeBtnStatus = true;
      this.vCodeVal = '60';
      var vCodeValInterva = setInterval(()=>{
        this.vCodeVal--
        if(this.vCodeVal < 0){
          clearInterval(vCodeValInterva);
          this.vCodeBtnStatus = false;
          this.vCodeVal = '获取验证码';
        }
      }, 1000)
      bindCardApi.signNindCardSendSms(params)
      .then((res) => {
        let data = res.data;
        
        if(data.resultCode == '1'){
          // this.vCodeVal = '60';
          this.transactionNo = data.transactionNo;
          // var vCodeValInterva = setInterval(()=>{
          //   this.vCodeVal--
          //   if(this.vCodeVal < 0){
          //     clearInterval(vCodeValInterva);
          //     this.vCodeBtnStatus = false;
          //     this.vCodeVal = '获取验证码';
          //   }
          // }, 1000)
        }else{
          clearInterval(vCodeValInterva);
          this.vCodeVal = '获取验证码';
          this.vCodeBtnStatus = false;
          this.$vux.toast.text(data.resultMsg, 'middle')
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
          this.$router.push({name: 'YXBindCardComplete', query:{appNo: this.appNo, industryCode:this.$route.query.industryCode}});
        }else if(res.data.resultCode == '-1'){
          this.$router.push({name: 'YXBindCardFail'});
        }else{
          this.$vux.toast.text(res.data.resultMsg);
        }
        
      })
    },
    jump(){
      this.$router.push({name: 'MyInstalment'});
    }
  },
  mounted: function() {
    this.queryAppBankInfo();
  }
};
</script>
