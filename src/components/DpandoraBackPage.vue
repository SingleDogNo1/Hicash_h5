<template>
  <div>
    <div id="skip" v-if="skipFlag">
      <span class="skipBtn" @click="skip">跳过</span>
    </div>
    <iframe
      :src="dpandoraUrl"
      id="dpandoraUrl"
      style="width: 100%;height: 20rem;"
      frameborder="0"
      target="#dpandoraUrl2"
    ></iframe>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
.weui-dialog__hd {
  padding: 0 !important;
  width: 100%;
  height: 48px !important;
  line-height: 40px;
  background: #ff7640 !important;
  border-radius: 5px 5px 0 0;
  color: #fff !important;
}
.weui-dialog__bd {
  padding: 0 !important;
  width: 100%;
  min-height: 40px;
  font-family: PingFangSC-Regular;
  font-size: 13px !important;
  color: #333 !important;
  letter-spacing: -0.08px;
  text-align: center;
  padding-top: 39px !important;
}
.weui-dialog__ft {
  position: relative;
  line-height: 48px;
  font-size: 17px !important;
  display: -ms-flexbox;
  display: flex;
  .weui-dialog__btn_default {
    color: #353535 !important;
  }
  .weui-dialog__btn_primary {
    color: #ff7640 !important;
  }
}
#skip {
  width: 100%;
  background: #eee !important;
  line-height: 2rem;
  text-align: right;
  .skipBtn {
    font-size: 0.6rem;
    color: #000 !important;
    border: 1px solid #000 !important;
    padding: 0.1rem 0.4rem;
    border-radius: 4px;
    margin-right: 0.5rem;
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
        confirmText: "取消",
        cancelText: "确定",
        content: _this.cancleMsg,
        // 组件除show外的属性
        onConfirm() {
          _this.$vux.confirm.hide();
        },
        onCancel() {
          window.location.href =
            _this.config.MWEB_PATH + "newweb/creditInfo/bandBank.html";
            _this.skipFlag = false;
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
    if (industryCode == "MDCP" || industryCode == "LDDD") {
      //用户正在申请嗨秒贷产品
      let creditItems = utils.getCookie("creditItems");
      creditItems = JSON.parse(creditItems);
      _this.cancleMsg = creditItems[1].cancleMsg;

      if (type === "0") {
        // type = "3";
        _this.skipFlag = false;
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
        $("#skip").css('display','none'); 
        _this.skipFlag = false;
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
        _this.skipFlag = false;
        window.location.href =
          _this.config.MWEB_PATH + "newweb/creditInfo/bandBank.html";
      }
    } else if (industryCode == "DDCP") {
      if (type == "0") {
        //从手机运营商认证跳回
        flag = false;
        _this.skipFlag = false;
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
        }
      });
    }
  }
};
</script>
