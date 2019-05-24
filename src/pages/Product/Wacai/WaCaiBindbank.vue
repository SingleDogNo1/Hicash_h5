<template>
  <div class="content">
    <!-- <page-header
      :title="title"
      :showBack="showBack"
      :showBtnClose="showBtnClose"
      :isShowCloseDialog="false"
      :closeDialogTitle="closeDialogTitle"
      :closeDialogContent="closeDialogContent"
      :closeDialogConfirmText="closeDialogConfirmText"
      :closeDialogCancelText="closeDialogCancelText"
      v-if="platform === 'H5'"
    ></page-header> -->
    <!-- 绑定银行卡加newbindBank -->
    <div class="bind-bank-wrap">
      <group class="bind-bank-group">
        <cell
          title="银行卡"
          :value="cardInfo"
          is-link
          class="card-wrap"
          @click.native="chooseCardShow = true"
        ></cell>
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
          v-model="cardNum"
          @on-blur="checkCardNum(cardNum)"
        ></x-input>
        <selector
          name="请选择银行"
          v-model="bankListVal"
          direction="rtl"
          title="请选择银行"
          :options="bankList"
        ></selector>
        <x-address
          title="开户省市"
          @on-shadow-change="openAccountChange"
          v-model="openAccountVal"
          :list="addressData"
          placeholder="请选择开户省市"
        ></x-address>
      </group>
    </div>
    <div class="next-step">
      <a href="javascript:;" @click="btnNext">确认</a>
    </div>
    <p class="tips">您的个人隐私将被严格保密，嗨钱网不会泄漏任何您的个人信息</p>
    <div v-transfer-dom>
      <popup class="choose-card-pop" v-model="chooseCardShow">
        <div class="popup">
          <p class="title">
            <x-icon type="ios-arrow-left" size="24" @click.native="chooseCardShow = false"></x-icon>
            <span>选择银行卡</span>
          </p>
          <ul>
            <li v-for="(item, index) in chooseBankList" :key="index" @click="chooseCard(item)">
              <p>{{item.cardInfo}}</p>
            </li>
            <li class="add-card" @click="addCard">
              <span>新增银行卡</span>
              <i></i>
            </li>
          </ul>
        </div>
      </popup>
    </div>
    <confirm
      v-model="showAbleModifyName"
      :show-cancel-button="false"
      :close-on-confirm="false"
      @on-confirm="modifyName"
      title="提示"
      confirm-text="确认"
    >
      <div class="msg-content">
        <p>您提交的信息与银行预留信息不符</p>
        <p class="gray">请核对您的姓名是否正确，如不正确请修改</p>
        <p>
          姓名：
          <span class="gray">{{realName}}</span>
          <span class="orange action" @click="showModifyNameInput">{{modifyNameActionText}}</span>
        </p>
        <input
          type="text"
          v-model="modifyNameVal"
          placeholder="重新输入姓名"
          name="modifyName"
          v-if="modifyNameActionText === '收起'"
        >
        <p>如姓名正确，则为其他信息不符。请将问题发送至客服邮箱反馈修改。</p>
        <p class="orange">kfhicash@hengyuan-finance.com</p>
      </div>
    </confirm>
    <confirm
      v-model="showEnableModifyName"
      :show-cancel-button="false"
      title="提示"
      confirm-text="确认"
    >
      <div class="msg-content">
        <p>您提交的信息与银行预留信息不符</p>
        <p class="gray">请将问题发送至客服邮箱反馈修改。</p>
        <p class="orange">kfhicash@hengyuan-finance.com</p>
      </div>
    </confirm>
    <confirm v-model="showSinaPayPop" title="提示" @on-confirm="ifJumpSinaPay(jumpSinaPayData)">
      <p style="text-align:center;">{{dialogMsg}}</p>
    </confirm>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";
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
    .selector-control {
      select {
        color: #999;
      }
    }
    .choose-card-wrap {
      height: 2rem;
      line-height: 2rem;
      position: relative;
      border-bottom: 1px solid #dadada;
      span {
        font-size: 0.6rem;
        float: left;
        color: #3f3f3f;
        display: inline-block;
        height: 1.95rem;
        line-height: 1.95rem;
        width: 25%;
      }
      .choose-card {
        float: left;
        padding-right: 0;
        height: 1.95rem;
        outline: none;
        font-size: 0.6rem;
        text-align: right;
        background-color: #fff;
        width: 64%;
        color: #999;
      }
      .vux-x-icon {
        width: 1rem;
        height: 2rem;
        fill: #a4a4a4;
      }
    }
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
  .next-step {
    width: 100%;
    text-align: center;
    padding-bottom: 1.75rem;
    margin-top: 1.25rem;
    a {
      display: inline-block;
      width: 14.2rem;
      background-color: #333;
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
  /deep/ .vux-confirm {
    .weui-dialog {
      width: 90%;
      max-width: 353px;
      .weui-dialog__hd {
        padding: 0.6em 1.6em 0.5em !important;
      }
      .msg-content {
        text-align: left;
        color: #333;
        font-size: 16px;
        p {
          margin-top: rem(6px);
          line-height: rem(24px);
          .action {
            margin-left: rem(18px);
          }
        }
        .orange {
          color: #ff7640;
        }
        .gray {
          color: #999;
        }
        input {
          width: 95%;
          height: rem(32px);
          //line-height: rem(32px);
          border: 1px solid #aeaeae;
          margin-left: 0;
          margin-top: rem(6px);
          border-radius: 5px;
          padding-left: rem(12px);
          color: #666;
          font-size: 14px;
        }
      }
      .weui-dialog__btn_primary {
        font-size: 16px;
      }
    }
  }
}
.vux-loading {
  .weui-toast {
    width: 5em !important;
    min-height: 5em !important;
    .weui-loading {
      margin: 22px 0 0 !important;
    }
  }
}
// .vux-popup-dialog {
//   z-index: 100000
// }

.choose-card-pop {
  background: #fff;
  .popup {
    padding: 0 rem(10px);
    .title {
      position: relative;
      height: rem(40px);
      line-height: rem(40px);
      text-align: center;
      font-size: 16px;
      color: #3f3f3f;
      border-bottom: 1px solid #dadada;
      .vux-x-icon-ios-arrow-left {
        position: absolute;
        display: inline-block;
        width: rem(28px);
        height: rem(28px);
        left: 0;
        top: 16%;
        fill: #3f3f3f;
      }
    }
    ul {
      height: rem(260px);
      overflow: scroll;
      li {
        position: relative;
        height: rem(40px);
        line-height: rem(40px);
        text-align: center;
        font-size: 16px;
        color: #3f3f3f;
        border-bottom: 1px solid #dadada;
        i:before {
          right: rem(35px);
          font-family: "iconfont";
          content: "\e665";
          color: #ff7640;
          font-size: 0.65rem;
          position: absolute;
          top: 0;
          position: absolute;
          font-style: normal;
        }
        &.add-card {
          border-bottom: 0;
        }
      }
    }
  }
}
</style>

<script type="text/javascript">
import PageHeader from "@/components/PageHeader.vue";
import {
  Group,
  Cell,
  Selector,
  XInput,
  XAddress,
  ChinaAddressV4Data,
  Loading,
  Confirm,
  Popup,
  PopupPicker,
  TransferDomDirective as TransferDom
} from "vux";
import $ from "jquery";
import common from "@/api/common";
import bindCardApi from "@/api/bindCard";
import utils from "@/assets/js/utils";

export default {
  directives: {
    TransferDom
  },
  components: {
    PageHeader,
    Group,
    Cell,
    Selector,
    XInput,
    XAddress,
    ChinaAddressV4Data,
    Loading,
    Confirm,
    Popup,
    PopupPicker
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
      dpandoraUrl: "",
      selectBank: [{ key: "add", value: "新增银行卡" }],
      selectBankVal: "add",
      realName: unescape(utils.getCookie("realName")),
      cardNum: "",
      cardInfo: "新增银行卡",
      bankList: [],
      bankListVal: "0000",
      addressData: ChinaAddressV4Data,
      bankLisCh: "",
      openAccountVal: [],
      province: "",
      city: "",
      area: "",
      openAccountProvince: "",
      chooseCardShow: false,
      uuid: utils.uuid(),
      userName: utils.getCookie("userName"),
      chooseBankList: [],
      showAbleModifyName: false,
      showEnableModifyName: false,
      modifyNameActionText: "修改", //修改姓名弹窗修改还是收起文字,
      isChangeName: 0, // 是否是要修改姓名(0:不是,1:是),
      modifyNameVal: "",
      showSinaPayPop: false,
      dialogMsg: false,
      jumpSinaPayData: ""
    };
  },
  ready() {},
  methods: {
    goBack() {},
    close() {},
    showPop() {
      this.show = true;
    },
    hidePop() {
      this.show = false;
    },
    showModifyNameInput() {
      this.modifyNameActionText =
        this.modifyNameActionText === "修改" ? "收起" : "修改";
    },
    modifyName() {
      if (this.modifyNameActionText === "修改") {
        this.isChangeName = 0;
        this.showAbleModifyName = false;
      } else {
        this.isChangeName = 1;
        if (!this.modifyNameVal) {
          this.$vux.toast.show({
            type: "text",
            position: "middle",
            text: "请重新输入姓名"
          });
          return;
        }
        this.checkCard();
        //this.showAbleModifyName = false;
      }
    },
    btnNext() {
      let errorMsg = "";
      if (!utils.checkCardNum(this.cardNum)) {
        errorMsg = "借记卡号格式错误";
      } else if (this.bankListVal === "0000") {
        errorMsg = "银行不能为空";
      } else if (this.openAccountVal.length == 0) {
        errorMsg = "请选择开户省市区";
      }
      if (errorMsg) {
        this.$vux.toast.show({
          type: "text",
          position: "middle",
          text: errorMsg
        });
        return;
      }
      utils.setCookie("backBankCard", this.bankListVal);
      utils.setCookie("backCardNum", this.cardNum);
      utils.setCookie("backBankAdd", this.openAccountVal);
      utils.setCookie("backAccContent", this.cardInfo);

      let bankCardObj = new URLSearchParams();
      bankCardObj.append("bankCard", this.cardNum);
      common.bankBin(bankCardObj).then(res => {
        let data = res.data;
        if (data.resultCode === "1") {
          if (this.bankListVal === data.bankCode) {
            this.checkCard();
          } else {
            this.$vux.toast.show({
              type: "text",
              position: "middle",
              text: "输入的卡号与选择的银行不匹配"
            });
          }
        } else {
          this.$vux.toast.show({
            type: "text",
            position: "middle",
            text: data.resultMsg
          });
        }
      });
    },
    checkCard() {
      let realname = unescape(this.realName);
      let cardCheckFourObj = new URLSearchParams();
      cardCheckFourObj.append("card", this.cardNum);
      cardCheckFourObj.append("name", realname);
      cardCheckFourObj.append("id_number", utils.getCookie("identityCode"));
      cardCheckFourObj.append("card_type", "jjk");
      cardCheckFourObj.append("mobile", utils.getCookie("mobile"));
      cardCheckFourObj.append("bank", this.bankListVal);

      let queryNameObj = new URLSearchParams();
      queryNameObj.append("userName", this.userName);
      common.cardCheckFour(cardCheckFourObj).then(res => {

        let data = res.data;
        this.$vux.loading.hide();
        if (data.resultCode === "1") {
          if (this.isChangeName === 1) {
            realname = this.modifyNameVal;
            common.queryValName(queryNameObj).then(res => {
              let data = res.data;
              if (data.resultCode === "1" && data.isUpdateName == "0") {
                let updateNameObj = new URLSearchParams();
                updateNameObj.append("userName", this.userName);
                updateNameObj.append("realname", realname);
                //没有修改过姓名，可以修改
                common.updateRealName(updateNameObj).then(res => {
                  let data = res.data;
                  if (data.resultCode == "1") {
                    utils.setCookie("realName", escape(realname));
                    this.realName = realname;
                    console.log("this.realName==", this.realName);
                    this.showAbleModifyName = false;
                    this.submitOrder();
                  } else {
                    this.$vux.toast.show({
                      type: "text",
                      position: "middle",
                      text: data.resultMsg
                    });
                  }
                });
              } else {
                this.showAbleModifyName = false;
              }
            });
          } else {
            this.submitOrder();
          }
        } else if (data.resultCode === "60100") {
          this.$vux.toast.show({
            type: "text",
            position: "middle",
            text: data.resultMsg
          });
          setTimeout(() => {
            this.authFail();
          }, 1000);
        } else if (data.resultCode == "500055") {
          this.$vux.toast.show({
            type: "text",
            position: "middle",
            text: data.resultMsg
          });
        } else {
          let obj = {
            applyFrom: "03",
            node: "09",
            status: "05"
          };
          this.updateTempAppInfo(obj);

          common.queryValName(queryNameObj).then(res => {
            let data = res.data;
            if (data.resultCode === "1" && data.isUpdateName == "0") {
              this.showAbleModifyName = true;
            } else {
              this.showEnableModifyName = true;
            }
          });
        }
      });
    },
    checkCardNum(cardNum) {
      console.log("cardNum===", cardNum);
      if (!utils.checkCardNum(cardNum)) {
        this.bankListVal = "0000";
        this.$vux.toast.show({
          type: "text",
          position: "middle",
          text: "银行卡账号格式错误"
        });
        return;
      }
      let bankCardObj = new URLSearchParams();
      bankCardObj.append("bankCard", this.cardNum);
      common.bankBin(bankCardObj).then(res => {
        let data = res.data;
        if (data.resultCode === "1") {
          this.bankListVal = data.bankCode;
        } else {
          this.bankListVal = "0000";
          this.$vux.toast.show({
            type: "text",
            position: "middle",
            text: "对不起，暂不支持该银行，请更换银行卡"
          });
        }
      });
    },
    submitOrder() {
      this.$vux.loading.show({
        text: "加载中，请稍等……"
      });
      let registerFrom = "HTML5";
      if (utils.getCookie("mediasource") == "iosddd") {
        registerFrom = "iOS";
      } else if (utils.getCookie("mediasource") == "andddd") {
        registerFrom = "Android";
      }

      var ua = navigator.userAgent;
      var comeFrom =
        ua.indexOf("comeFrom:iOS") > -1 || ua.indexOf("comeFrom:android") > -1
          ? "APP"
          : "H5";
      let queryBindingStatusObj = new URLSearchParams();
      queryBindingStatusObj.append("uuid", utils.uuid());
      queryBindingStatusObj.append("userName", this.userName);
      queryBindingStatusObj.append("comeFrom", comeFrom);
      queryBindingStatusObj.append("bankRealName", this.realName);
      queryBindingStatusObj.append("bankCard", this.cardNum);
      queryBindingStatusObj.append("bankCode", this.bankListVal);
      common.dispatchWithHoldChannel(queryBindingStatusObj).then(res => {
        let data = res.data;
        this.$vux.loading.hide();
        if (data.resultCode === "1") {
          // window.location.href = data.followUrl;
          if (data.dialogMsg) {
            this.showSinaPayPop = true;
            this.dialogMsg = data.dialogMsg;
            this.jumpSinaPayData = data;
          } else {
            this.ifJumpSinaPay(data);
          }
        } else {
          this.$vux.toast.show({
            type: "text",
            position: "middle",
            text: data.resultMsg
          });
        }
      });
      this.createOrder();
    },
    createOrder() {
      let submitBindCardInfoObj = {
        userName: this.userName,
        bankCard: this.cardNum,
        bankRealName: this.realName,
        openBank: this.bankListVal,
        province: this.province,
        city: this.city,
        area: this.area,
        bankNo: this.bankListVal,
        channelUserName: this.utils.getCookie('channelUserName'),
        channelApplicationNo: this.utils.getCookie('channelApplicationNo')
      }
      this.submitBindCardInfo(submitBindCardInfoObj);
    },
    openAccountChange(ids, names) {
      this.bankLisCh = names.join("");
      this.province = ids[0];
      this.city = ids[1];
      this.area = ids[2];
    },
    authFail() {
      var source = utils.getCookie("source");
      var vipCount = utils.getCookie("vipCount");
      utils.clearCookie();
      if (vipCount && vipCount == "0") {
        utils.setCookie("vipCount", "1");
      }
      var params = "";
      console.log("location.search===", location.search);
      if (location.search) {
        params = location.search;
      }
      if (source == "APP") {
        utils.setCookie("source", "APP");
        if (params != "") {
          params += "&source=APP";
        } else {
          params = "?source=APP";
        }
      }
      window.location = this.config.NEW_MWEB_PATH + "/login" + params;
    },
    updateTempAppInfo(obj) {
      let params = new URLSearchParams();
      params.append("tempAppNo", utils.getCookie("appFlowNo").split(":")[1]);
      params.append("applyFrom", obj.applyFrom);
      params.append("custType", utils.getCookie("custType"));
      params.append("industryCode", utils.getCookie("industryCode"));
      params.append("node", obj.node);
      params.append("status", obj.status);
      common.UpdateTempAppInfo(params).then(res => {});
    },
    getBankList() {
      bindCardApi.withHoldBank().then(res => {
        let data = res.data;
        if (data.banks) {
          let bankList = [];
          for (let i = 0; i < res.data.banks.length; i++) {
            let bankListItem = {};
            bankListItem.value = res.data.banks[i].bankName;
            bankListItem.key = res.data.banks[i].bankCode;
            bankList.push(bankListItem);
          }
          let defaultArr = [{ value: "请选择", key: "0000" }];
          this.bankList = defaultArr.concat(bankList);
          console.log("this.bankList===", this.bankList);
          //this.currentBank = defaultArr[0].value.split();
        }
      });
    },
    getBankInfo() {
      bindCardApi.getOwnData().then(res => {
        function loadPayEgisDidJs() {
          var _protocol =
            "https:" == document.location.protocol ? "https://" : "http://";
          var element = document.createElement("script");
          element.src =
            _protocol +
            "pws.payegis.com.cn/did/js/dp.js?appId=" +
            res.data.appId +
            "&sessionId=" +
            res.data.sessionId +
            "&ts=" +
            res.data.ts +
            "&callback=";
          document.body.appendChild(element);
        }
        if (window.addEventListener) {
          window.addEventListener("load", loadPayEgisDidJs, false);
        } else if (window.attachEvent) {
          window.attachEvent("onload", loadPayEgisDidJs);
        } else {
          window.onload = loadPayEgisDidJs;
        }
      });
      if (utils.getCookie("jumpType") != "bindCard") {
        let obj = {
          applyFrom: "03",
          node: "09",
          status: "01"
        };
        this.updateTempAppInfo(obj);
      }
      let postData = new URLSearchParams();
      postData.append("uuid", this.uuid);
      postData.append("userName", this.userName);
      bindCardApi.searchBankCard(postData).then(res => {
        let data = res.data;
        console.log("data===", data);
        if (data.resultCode === "1") {
          let bank = utils.getCookie("bindCardBank") || res.data.bank;
          let cardNum = utils.getCookie("bindCardNum") || res.data.cardNum;
          let bankName =
            utils.getCookie("bindCardBankName") || res.data.bankName;
          let province =
            utils.getCookie("bindCardProvince") || res.data.province;
          let city = utils.getCookie("bindCardCity") || res.data.city;
          let provinceName =
            utils.getCookie("bindCardProvinceName") || res.data.provinceName;
          let cityName =
            utils.getCookie("bindCardCityName") || res.data.cityName;
          let area = utils.getCookie("bindCardArea") || res.data.area;
          let areaName =
            utils.getCookie("bindCardAreaName") || res.data.areaName;
          utils.setCookie("backCardNum", cardNum);
          this.cardNum = cardNum;
          this.cardInfo =
            bankName +
            "***" +
            cardNum.substring(cardNum.length - 4, cardNum.length);
          if (
            province &&
            city &&
            provinceName &&
            cityName &&
            area &&
            areaName
          ) {
            this.openAccountVal = [province, city, area];
            this.province = province;
            this.city = city;
            this.area = area;
          }
          this.bankListVal = bank;
        } else if (data.resultCode === "60100") {
          this.$vux.toast.show({
            type: "text",
            position: "middle",
            text: data.resultMsg
          });
          setTimeout(() => {
            this.authFail();
          }, 1000);
        } else {
          this.$vux.toast.show({
            type: "text",
            position: "middle",
            text: data.resultMsg
          });
        }
      });
    },
    getChooseCardPop() {
      let postData = new URLSearchParams();
      postData.append("uuid", this.uuid);
      postData.append("userName", this.userName);
      bindCardApi.bankcardInfo(postData).then(res => {
        let data = res.data;
        if (data.resultCode === "1") {
          let chooseBankList = data.accountList;
          chooseBankList.forEach(item => {
            item.cardInfo =
              item.bankName +
              item.cardNum.substring(0, 4) +
              " **** **** " +
              item.cardNum.substring(
                item.cardNum.length - 4,
                item.cardNum.length
              );
          });
          this.chooseBankList = chooseBankList;
        } else if (data.resultCode === "60100") {
          this.$vux.toast.show({
            type: "text",
            position: "middle",
            text: data.resultMsg
          });
          setTimeout(() => {
            this.authFail(data.resultMsg);
          }, 1000);
        } else {
          this.$vux.toast.show({
            type: "text",
            position: "middle",
            text: data.resultMsg
          });
        }
      });
    },
    chooseCard(item) {
      console.log("item==-==", item);
      this.chooseCardShow = false;
      this.cardInfo = item.cardInfo;
      this.cardNum = item.cardNum;
      this.bankListVal = item.bank;
      if (
        item.province &&
        item.city &&
        item.provinceName &&
        item.cityName &&
        item.area &&
        item.areaName
      ) {
        this.openAccountVal = [item.province, item.city, item.area];
        console.log("this.openAccountVal====", this.openAccountVal);
      }
    },
    addCard() {
      this.chooseCardShow = false;
      this.cardInfo = "新增银行卡";
      this.cardNum = "";
      this.bankListVal = "0000";
      this.openAccountVal = [];
    },
    ifJumpSinaPay(data) {
      if (data.status === "1") {
        if (utils.getCookie("jumpType") === "bindCard") {
          this.$router.push({ name: "Home" });
          return;
        }
        this.createOrder();
      } else {
        window.location.href = data.followUrl;
      }
    },
    submitBindCardInfo(data){
      common.submitBindCardInfo(data)
      .then(res => {
        window.location.href = utils.getCookie('backUrl');
      })
    }
  },
  mounted: function() {
    let type = this.$route.query.type;
    this.getBankList();
    this.getBankInfo();
    this.getChooseCardPop();
    if (type === "bind_card_success") {
      this.$vux.loading.show({
        text: "加载中，请稍等……"
      });
      if (utils.getCookie("jumpType") === "bindCard") {
        this.$router.push({ name: "Home" });
        return;
      }
      setTimeout(() => {
        this.createOrder();
      }, 3000);
    }
  }
};
</script>
