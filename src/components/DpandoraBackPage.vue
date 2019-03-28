<template>
  <div>
    <div class="skip" v-if="skipFlag">
      <span class="skipBtn" @click="skip">跳过</span>
    </div>
    <iframe
      :src="dpandoraUrl"
      id="dpandoraUrl"
      style="width: 100%;height: 100%;"
      frameborder="0"
      target="#dpandoraUrl2"
    ></iframe>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.vux-loading {
  .weui-toast {
    width: 5em !important;
    min-height: 5em !important;
    .weui-loading {
      margin: 22px 0 0 !important;
    }
  }
}
/deep/ .weui-dialog__hd {
  padding: 0;
  width: 100%;
  height: 48px;
  line-height: 40px;
  background: #ff7640;
  border-radius: 5px 5px 0 0;
  color: #fff;
}
/deep/ .weui-dialog__bd {
    padding: 0 1.6em .8em;
    min-height: 40px;
    font-size: 15px;
    line-height: 1.3rem;
    word-wrap: break-word;
    word-break: break-all;
    color: #353535;
}
.weui-dialog__btn_primary {
  color: #353535 !important;
}
.weui-dialog__title {
  font-family: PingFangSC-Regular;
  font-size: 17px;
  color: #ffffff;
}
.skip {
  width: 100%;
  background: #eee;
  line-height: 2rem;
  text-align: right;
  .skipBtn {
    font-size: 0.6rem;
    color: #2b2b2b;
    border: 1px solid #2b2b2b;
    padding: 0.1rem 0.4rem;
    border-radius: 10px;
    margin-right: 1rem;
  }
}
</style>

<script type="text/javascript">
import { Loading, Confirm } from "vux";
import $ from "jquery";
import common from "@/api/common";
import utils from "@/assets/js/utils";

export default {
  components: {
    Loading,
    Confirm
  },
  data() {
    return {
      dpandoraUrl: "",
      show: false,
      skipFlag: false,
      cancleMsg: ""
    };
  },
  ready() {},
  methods: {
    goBack() {},
    close() {},
    btnNext() {},
    skip() {
      var _this = this;
      _this.$vux.confirm.show({
        title: "提示",
        content: _this.cancleMsg,
        // 组件除show外的属性
        onCancel() {
          _this.$vux.confirm.hide();
        },
        onConfirm() {
          window.location.href =
            _this.config.MWEB_PATH + "newweb/creditInfo/bandBank.html";
        }
      });
    }
  },
  mounted: function() {
    var _this = this;
    let type = _this.$route.query.type;
    let flag = true;
    let industryCode = utils.getCookie("industryCode");
    let userName = utils.getCookie("userName");
    console.log("type======", type);
    console.log(_this.$route.query.source);
    if (industryCode == "MDCP" || industryCode == "LDDD") {
      //用户正在申请嗨秒贷产品
      let creditItems = utils.getCookie("creditItems");
      console.log("creditItems===", creditItems);
      creditItems = JSON.parse(creditItems);
      _this.cancleMsg = creditItems[1].cancleMsg;

      if (type === "0") {
        type = "3";
        flag = false;
        var paramsStr = "";
        if (creditItems[1].url.indexOf("?") != -1) {
          paramsStr =
            "&source=hq&id_card_no=" +
            utils.getCookie("identityCode") +
            "&name=" +
            unescape(utils.getCookie("realName")) +
            "&mobile=" +
            utils.getCookie("mobile");
        } else {
          paramsStr =
            "?source=hq&id_card_no=" +
            utils.getCookie("identityCode") +
            "&name=" +
            unescape(utils.getCookie("realName")) +
            "&mobile=" +
            utils.getCookie("mobile");
        }
        _this.dpandoraUrl = creditItems[1].url + paramsStr;
        console.log("_this.dpandoraUrl====", _this.dpandoraUrl);
        var UUserCard = utils.getCookie("identityCode");
        var myDate = new Date();
        var month = myDate.getMonth() + 1;
        var day = myDate.getDate();
        var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
        if (
          UUserCard.substring(10, 12) < month ||
          (UUserCard.substring(10, 12) == month &&
            UUserCard.substring(12, 14) <= day)
        ) {
          age++;
        }
        if (creditItems[1].optional) {
          _this.skipFlag = true;
        } else {
          _this.skipFlag = false;
        }
      } else if (type == "3") {
        //学信网认证
        flag = false;
        if (creditItems[2]) {
          var paramsStr = "";
          if (creditItems[2].url.indexOf("?") != -1) {
            paramsStr =
              "&source=hq&id_card_no=" +
              utils.getCookie("identityCode") +
              "&name=" +
              userName +
              "&mobile=" +
              utils.getCookie("mobile");
          } else {
            paramsStr =
              "?source=hq&id_card_no=" +
              utils.getCookie("identityCode") +
              "&name=" +
              userName +
              "&mobile=" +
              utils.getCookie("mobile");
          }
          window.location.href = creditItems[2].url + paramsStr;
        } else {
          window.location.href =
            _this.config.MWEB_PATH + "newweb/creditInfo/bandBank.html";
        }
      } else if (type == "8") {
        //芝麻信用
        flag = false;
        window.location.href =
          _this.config.MWEB_PATH + "newweb/creditInfo/bandBank.html";
      }
    } else if (industryCode == "DDCP") {
      if (type == "0") {
        //从手机运营商认证跳回
        flag = false;
        window.location.href =
          _this.config.MWEB_PATH + "newweb/creditInfo/newcreditPrv.html";
      } else if (type == "3" || type == "4" || type == "7" || type == "9") {
        window.location.href =
          _this.config.MWEB_PATH + "/newweb/creditInfo/newcreditPrv.html";
      }
    } else {
      _this.$vux.toast.show({
        position: "middle",
        text: "请选择产品"
      });
    }
    if (flag) {
      let userName = encodeURIComponent(unescape(utils.getCookie("realName")));
      let postData = new URLSearchParams();
      postData.append("type", type);
      postData.append("industryCode", utils.getCookie("industryCode"));
      postData.append("tempNo", utils.getCookie("appFlowNo").split(":")[1]);
      common.QueryPandoraUrl(postData).then(res => {
        let data = res.data;
        if (data.resultCode == "1") {
          var paramsStr = "";
          if (data.url.indexOf("?") != -1) {
            paramsStr =
              "&source=hq&id_card_no=" +
              utils.getCookie("identityCode") +
              "&name=" +
              userName +
              "&mobile=" +
              utils.getCookie("mobile");
          } else {
            paramsStr =
              "?source=hq&id_card_no=" +
              utils.getCookie("identityCode") +
              "&name=" +
              userName +
              "&mobile=" +
              utils.getCookie("mobile");
          }
        } else {
          _this.$vux.toast.hide();
          //   _this.$vux.toast.show({
          //     position: "middle",
          //     text: data.resultMsg
          //   });
        }
      });
    }
  }
};
</script>
