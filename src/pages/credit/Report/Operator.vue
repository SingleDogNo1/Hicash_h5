<template>
  <div class="operator" id="operator" ref="operator">
    <page-header
      :title="title"
      :showBack="showBack"
      :showBtnClose="showBtnClose"
      :jumpRouteName="'Inquiry'"
      v-if="platform === 'H5'"
    ></page-header>
    <div class="content" id="content" :class="{ appContent: platform === 'APP' }">
      <div class="operator-report-wrap">
        <div class="title-wrap">
          <h1>运营商报告</h1>
          <div class="refresh">
            <i class="icon-refresh" @click="refresh"></i>
            <p class="date">{{date}}</p>
          </div>
        </div>
        <div class="score-wrap">
          <div style="width:150px;height:150px;z-index:1">
            <x-circle
              :percent="profile.percent"
              :stroke-width="4"
              :trail-width="4"
              stroke-color="#209EFF"
            >
              <span class="score-value">{{profile.creditScore}}</span>
              <p class="score-text">信用分</p>
            </x-circle>
            <p class="icon-verified" v-if="dataSource.isRealNameVerified === 1">实名认证</p>
            <p class="icon-not-verified" v-else>未实名</p>
          </div>
        </div>
        <div class="desc-wrap clearfix">
          <div class="desc-item left">
            <div class="item-name">
              <i class="icon-operator"></i>
              <span>运营商</span>
            </div>
            <p class="item-value">{{dataSource.name}}</p>
          </div>
          <div class="desc-item right">
            <div class="item-name">
              <i class="icon-time"></i>
              <span>使用时长</span>
            </div>
            <p class="item-value">{{dataSource.useTime}}</p>
          </div>
        </div>
      </div>
      <div class="contact-friend-circle-wrap">
        <h3>联系朋友圈</h3>
        <f2-pie :charData="charData" :id="'c1'"></f2-pie>
      </div>
      <div class="contacts-wrap" v-if="contactsArr.length > 0">
        <h3>常用联系人</h3>
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(contactsItem, index) in contactsArr" :key="index">
              <div class="contacts-list">
                <ul class="item">
                  <li>
                    <span class="key">电话</span>
                    <span class="value">{{contactsItem.peer_mobile.mobile}}</span>
                  </li>
                  <li>
                    <span class="key">联系次数</span>
                    <span class="value">{{contactsItem.callee_count}}</span>
                  </li>
                  <li>
                    <span class="key">联系时长</span>
                    <span class="value">{{contactsItem.total_time}}</span>
                  </li>
                  <li>
                    <span class="key">主叫次数</span>
                    <span class="value">{{contactsItem.caller_count}}</span>
                  </li>
                  <li>
                    <span class="key"></span>
                    <span class="value"></span>
                  </li>
                  <li>
                    <span class="key">被叫次数</span>
                    <span class="value">{{contactsItem.callee_count}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="contacts-list">
            <scroller lock-y :bounce="false">
              <div  v-for="(contactsItem, index) in contactsArr" :key="index">
              <ul class="item">
                    <li v-for="(item, index) in contactsItem" :key="index">
                      <span class="key">姓名</span>
                      <span class="value">天天</span>
                    </li>
                  </ul>
              </div>
            </scroller>
        </div>-->
      </div>
      <div class="contacts-wrap-empty" v-else>
        <h3>常用联系人</h3>
        <p class="desc">
          没有获取到您的记录哦，
          <br>快去更新报告吧！
        </p>
      </div>
      <div
        class="number-verification-wrap"
        v-if="specialNum1 !== '未发现与110电话通话记录' || specialNum2 !== '未找到贷款类相关号码' "
      >
        <h3>号码验真</h3>
        <p class="warn-text" v-if="specialNum1 !== '未发现与110电话通话记录'">
          <span>发现与110相关号码的通话记录</span>
        </p>
        <p class="warn-text" v-if="specialNum2 !== '未找到贷款类相关号码'">
          <span>发现与贷款类相关号码的通话记录</span>
        </p>
        <div class="report-desc">
          <p class="title">报告说明</p>
          <p class="desc">运营商报告通过手机号的实名验证和通信敏感信息判断，稳定的社交圈将有利于您的运营商评分</p>
        </div>
      </div>
      <div class="number-verification-wrap-empty" v-else>
        <h3>号码验真</h3>
        <div class="desc">
          <img src="./images/icon_no_problem.png">
        </div>
        <p class="tips">未发现特殊相关号码的通话记录</p>
      </div>
      <div class="btn" @click="shareMethods" v-if="shareBox">分享给朋友</div>
      <div id="share" @click="sharePopup" class="btn" v-if="!shareBox && isWeiXinShare">分享给朋友</div>
    </div>
    <!-- <popup v-model="shareShow" position="bottom" max-height="50%">
      <share :config="config"></share>
    </popup> -->
    <div class="weixin-pop" v-if="isShowWeixinPop">
      <div class="weixin-share-wrap" v-if="isShowWeixinShareWrap">
        <img src="./images/icon_weixin_share.png">
        <p>点击右上角</p>
        <p>分享给朋友和朋友圈</p>
      </div>
    </div>
    <!--<div v-transfer-dom>
      <x-dialog v-model="showToast" class="thumbnail-dialog">
        <div class="thumbnail-wrap">
          <img class="thumbnail-img" :src="thumbnailImg" alt>
          <div class="tips">
            <img src="./images/icon_qrcode_operator.png" alt>
            <span>长按/扫描识别二维码，查看详情</span>
          </div>
          <img class="thumbnail-img" src="./images/bg_map.png">
        </div>
      </x-dialog>
    </div>-->
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import F2Pie from "@/components/F2Pie.vue";
import { XCircle, XDialog, TransferDom, Popup } from "vux";
import Swiper from "swiper";
let share = require("@/assets/js/mShare");
var moment = require("moment");
import html2canvas from "html2canvas";

export default {
  name: "Operator",
  directives: {
    TransferDom
  },
  components: {
    PageHeader,
    F2Pie,
    XCircle,
    XDialog,
    Popup
  },
  data() {
    return {
      title: this.$route.meta.title,
      showBack: true,
      showBtnClose: false,
      date: "",
      profile: {
        creditScore: 0,
        percent: 0
      },
      dataSource: {
        name: "",
        useTime: "",
        isRealNameVerified: 0
      },
      specialNum1: "",
      specialNum2: "",
      id: "city",
      charData: [],
      contactsArr: [],
      shareBox: false,
      platform: this.utils.getPlatform(),
      wxShareIco: require("./images/icon_share.png"),
      showToast: true,
      thumbnailImg: "",
      isShowWeixinPop: false,
      isWeiXinShare: false,
      isShowWeixinShareWrap: true
    };
  },
  methods: {
    refresh() {
      let postData = {
        userName: this.utils.getCookie("userName"),
        creditType: "operator"
      };
      this.common.queryCreditUrl(postData).then(res => {
        let data = res.data;
        if (data.resultCode === "1") {
          let url = data.url;
          if (data.userInfo) {
            this.$router.push({ name: "PandoraAuth" });
          } else {
            this.$router.push({ name: "IdentityAuth" });
          }
        } else {
          this.$vux.toast.show({
            type: "text",
            position: "middle",
            text: res.data.resultMsg
          });
        }
      });
    },
    getReportInfo() {
      //if (this.isWeiXinShare) {
        let params = new URLSearchParams();
        params.append("url", window.location.href);
        this.common.wxfx(params).then(res => {
          let data = res.data;
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: [
              "checkJsApi",
              "onMenuShareTimeline",
              "onMenuShareAppMessage",
              "onMenuShareQQ",
              "onMenuShareWeibo"
            ]
          });

          wx.ready(()=> {
            console.log('this.config===', this, this.config, this.wxShareIco)
            wx.onMenuShareAppMessage({
              desc: "征信报告分享",
              title: "征信报告分享",
              link: this.config.NEW_MWEB_PATH + "/activityIntroduction",
              imgUrl: this.wxShareIco,
              success: function() {},
              cancel: function() {}
            });
            wx.onMenuShareTimeline({
              desc: "征信报告分享",
              title: "征信报告分享",
              link: this.config.NEW_MWEB_PATH + "/activityIntroduction",
              imgUrl: this.wxShareIco,
              success: function() {},
              cancel: function() {}
            });
          });
        });
      //}
      //}

      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      let day = new Date().getDate();
      this.date = year + "." + month + "." + day;
      let postData = {
        reportType: "operator",
        userName: this.utils.getCookie("userName")
      };
      this.common.getCreditReport(postData).then(res => {
        if (res.data.resultCode === "1") {
          let data = JSON.parse(res.data.data);
          console.log("data===", data);
          let profile = data.profile;
          this.profile.verified = profile.verified;
          this.profile.creditScore = !profile.credit_score
            ? 0
            : profile.credit_score;
          this.profile.percent =
            this.profile.creditScore > 1000
              ? 100
              : (this.profile.creditScore / 1000) * 100;

          let dataSource = data.data_source;
          this.dataSource.name = dataSource.name;
          this.dataSource.isRealNameVerified = dataSource.is_real_name_verified;
          console.log(dataSource);
          let netInTime = moment(dataSource.net_in_time).format("YYYY-MM-DD");
          let currentTime = moment(new Date()).format("YYYY-MM-DD");
          console.log("netInTime===", netInTime, currentTime);
          function datemonth(date1, date2) {
            // 拆分年月日
            date1 = date1.split("-");
            // 得到月数
            date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);
            // 拆分年月日
            date2 = date2.split("-");
            // 得到月数
            date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);
            var m = Math.abs(date1 - date2);
            return m;
          }
          this.dataSource.useTime = dataSource.net_in_time
            ? datemonth(netInTime, currentTime) + "月"
            : "0月";

          let contactsRegionSummary = data.contacts_region_summary;
          let callerCountArr = _.pluck(contactsRegionSummary, "caller_count");
          let calleeCountArr = _.pluck(contactsRegionSummary, "callee_count");
          let callerCountSum = _.reduce(
            callerCountArr,
            function(memo, num) {
              return memo + num;
            },
            0
          );
          let calleeCounttSum = _.reduce(
            calleeCountArr,
            function(memo, num) {
              return memo + num;
            },
            0
          );
          let totlaSum = callerCountSum + calleeCounttSum;
          contactsRegionSummary.forEach(item => {
            item.assetType = item.region;
            item.percent =
              Math.round(
                ((item.caller_count + item.callee_count) / totlaSum) * 100
              ) / 100;
            item.const = "const";
          });
          this.charData = contactsRegionSummary.splice(0, 5);

          let contactsArr = data.call_data_summary.filter(item => {
            return item.title === "常用联系人";
          });
          this.contactsArr = contactsArr[0].items.splice(0, 5);
          this.contactsArr.forEach(item => {
            let len = item.peer_mobile.mobile.length;
            item.peer_mobile.mobile =
              item.peer_mobile.mobile.substring(0, 3) +
              "****" +
              item.peer_mobile.mobile.substring(len - 4, len);
          });
          setTimeout(() => {
            var swiper = new Swiper(".swiper-container", {
              slidesPerView: "auto"
            });
          }, 500);

          let infoVerification = data.info_verification;
          let specialNumAll = infoVerification.filter(item => {
            return item.title === "用户行为检测";
          });
          let specialNum1Arr = specialNumAll[0].items.filter(item => {
            return item.check_point === "contact_110";
          });
          console.log("specialNum1Arr===", specialNum1Arr);
          let specialNum2Arr = specialNumAll[0].items.filter(item => {
            return item.check_point === "contact_loan";
          });
          this.specialNum1 = specialNum1Arr[0].remarks;
          this.specialNum2 = specialNum2Arr[0].remarks;
        } else {
          this.$vux.toast.show({
            type: "text",
            position: "middle",
            text: res.data.resultMsg
          });
        }
      });
    },
    shareMethods() {
      window.hicashJSCommunication.onCallApp(
        JSON.stringify({
          type: "h5_share",
          shareTitle: this.title,
          shareContent: "征信报告分享",
          shareUrl: this.config.NEW_MWEB_PATH + "/activityIntroduction",
          shareImageUrl: this.wxShareIco
        })
      );
    },
    sharePopup() {
      this.isShowWeixinPop = true;
      setTimeout( ()=> {
        this.isShowWeixinPop = false;
      }, 3000)
      // if (this.isWeiXin()) {
      //   this.common.wxfx().then(res => {
      //     let data = res.data;
      //     alert('data' + JSON.stringify(data))
      //     wx.config({
      //       debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      //       appId: data.appId,
      //       timestamp: data.timestamp,
      //       nonceStr: data.nonceStr,
      //       signature: data.signature,
      //       jsApiList: [
      //         "checkJsApi",
      //         "onMenuShareTimeline",
      //         "onMenuShareAppMessage",
      //         "onMenuShareQQ",
      //         "onMenuShareWeibo"
      //       ]
      //     });

      //     wx.ready(function() {
      //       wx.onMenuShareAppMessage({
      //         desc: "征信报告分享",
      //         title: "征信报告分享",
      //         link: this.config.NEW_MWEB_PATH + '/activityIntroduction',
      //         imgUrl: this.wxShareIco,
      //         success: function() {},
      //         cancel: function() {}
      //       });
      //       wx.onMenuShareTimeline({
      //         desc: "征信报告分享",
      //         title: "征信报告分享",
      //         link: this.config.NEW_MWEB_PATH + '/activityIntroduction',
      //         imgUrl: this.wxShareIco,
      //         success: function() {},
      //         cancel: function() {}
      //       });
      //     });
      //   });
      // }
      //this.shareShow = true;
      // var option = {
      //   url: "http://www.baidu.com",
      //   title: "百度",
      //   img: "https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png",
      //   desc: "百度搜索",
      //   from: "百度"
      // }
      // console.log('mshare===', mshare)
      // mshare.init(option);
      // share.Mshare.wxConfig({

      // })
      // var config = {
      //   title: this.title,
      //   desc: "征信报告分享", // 描述, 默认读取head标签：<meta name="description" content="desc" />
      //   types: ["wx", "qq", "qzone", "sina"], // 开启的分享图标, 默认为全部
      //   infoMap: {
      //     wx: {
      //       appId: "",
      //       timestamp: "",
      //       nonceStr: "",
      //       signature: "",
      //       title: this.title,
      //       desc: "征信报告分享",
      //       link: this.config.NEW_MWEB_PATH + "/activityIntroduction",
      //       imgUrl: this.wxShareIco
      //     }
      //   },
      //   fnDoShare: function(type) {}
      // };
      // share.Mshare.popup(config);
      //   // html2canvas(document.getElementById("operator"), {
      //   //   backgroundColor: null
      //   // }).then(canvas => {
      //   //   var imgData = canvas.toDataURL("image/jpeg");
      //   //   console.log("imgData==", imgData);
      //   //   this.thumbnailImg = imgData;
      //   //   this.showToast = true;
      //   //   //this.fileDownload(imgData);
      //   // });
      //   // var cntElem = document.getElementById("content");

      //   // var shareContent = cntElem; //需要截图的包裹的（原生的）DOM 对象
      //   // var width = shareContent.offsetWidth; //获取dom 宽度
      //   // var height = shareContent.offsetHeight; //获取dom 高度
      //   // var canvas = document.createElement("canvas"); //创建一个canvas节点
      //   // var scale = 2; //定义任意放大倍数 支持小数
      //   // canvas.width = width * scale; //定义canvas 宽度 * 缩放
      //   // canvas.height = height * scale; //定义canvas高度 *缩放
      //   // canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
      //   // var opts = {
      //   //   scale: scale, // 添加的scale 参数
      //   //   canvas: canvas, //自定义 canvas
      //   //   // logging: true, //日志开关，便于查看html2canvas的内部执行流程
      //   //   width: width, //dom 原始宽度
      //   //   height: height,
      //   //   useCORS: true, // 【重要】开启跨域配置,
      //   //   scrollY: -40
      //   // };

      //   // html2canvas(shareContent, opts).then(canvas => {
      //   //   var context = canvas.getContext("2d");
      //   //   // 【重要】关闭抗锯齿
      //   //   context.mozImageSmoothingEnabled = false;
      //   //   context.webkitImageSmoothingEnabled = false;
      //   //   context.msImageSmoothingEnabled = false;
      //   //   context.imageSmoothingEnabled = false;

      //   //   // 【重要】默认转化的格式为png,也可设置为其他格式
      //   //   // var img = Canvas2Image.convertToJPEG(
      //   //   //   canvas,
      //   //   //   canvas.width,
      //   //   //   canvas.height
      //   //   // );
      //   //   let imgData = canvas.toDataURL("image/jpeg");
      //   //   console.log("imgData===", imgData, this);
      //   //   this.thumbnailImg = imgData;
      //   //   window.localStorage.setItem("imgUrl", this.thumbnailImg);
      //   //   //this.showToast = true;
      //   //   this.$router.push( { name: 'ThumbnailImg', params: {imgUrl: this.thumbnailImg}})
      //   // });
    },
    isWeiXin() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    this.getReportInfo();
    //this.isWeiXinShare = this.isWeiXin();
    this.isWeiXinShare = true;
  }
};
</script>

<style lang="scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";
.operator {
  width: 100%;
  height: 100%;
  background: #f1f1f1;
  overflow-y: auto;
  .content {
    width: 100%;
    height: auto;
    padding-top: rem(50px);
    background: #f1f1f1;
    .operator-report-wrap {
      padding: rem(8px) rem(15px) rem(28px) rem(15px);
      background: #fff;
      .title-wrap {
        display: flex;
        height: rem(45px);
        justify-content: space-between;
        h1 {
          display: block;
          font-size: 30px;
          font-weight: 400;
        }
        .refresh {
          display: block;
          height: rem(45px);
          .icon-refresh {
            display: block;
            width: rem(26px);
            height: rem(26px);
            background: url("./images/icon_refresh.png") center top no-repeat;
            background-size: 24px 24px;
            margin: 0 auto;
            margin-bottom: rem(5px);
          }
          .date {
            font-size: 11px;
            text-align: center;
          }
        }
      }
      .score-wrap {
        width: rem(146px);
        height: rem(146px);
        margin: 0 auto;
        margin-top: rem(26px);
        /deep/ .vux-circle {
          transform: rotate(180deg);
          -ms-transform: rotate(180deg); /* IE 9 */
          -moz-transform: rotate(180deg); /* Firefox */
          -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
          -o-transform: rotate(180deg);
          .vux-circle-content {
            top: 30%;
            transform: rotate(180deg);
            -ms-transform: rotate(180deg); /* IE 9 */
            -moz-transform: rotate(180deg); /* Firefox */
            -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
            -o-transform: rotate(180deg);
          }
          .score-value {
            font-size: 36px;
            color: #333333;
          }
          .score-text {
            font-size: 15px;
            color: #999999;
          }
        }
        .icon-verified {
          position: relative;
          width: rem(75px);
          height: rem(28px);
          line-height: rem(28px);
          margin: 0 auto;
          margin-top: rem(-20px);
          background: #209eff;
          box-shadow: 0 2px 4px 0 rgba(32, 158, 255, 0.4);
          border-radius: 14px;
          font-size: 13px;
          color: #ffffff;
          text-align: center;
          z-index: 100;
        }
        .icon-not-verified {
          position: relative;
          width: rem(75px);
          height: rem(28px);
          line-height: rem(28px);
          margin: 0 auto;
          margin-top: rem(-20px);
          background: #cccccc;
          border-radius: 14px;
          font-size: 13px;
          color: #ffffff;
          text-align: center;
          z-index: 100;
        }
      }
      .desc-wrap {
        margin-top: rem(30px);
        padding: 0 rem(52px) 0 rem(58px);
        .desc-item {
          &:nth-child(1) {
            width: rem(90px);
          }
          &:nth-child(2) {
            width: rem(98px);
          }
          .item-name {
            display: flex;
            align-items: center; /*副轴居中*/
            font-size: 15px;
            color: #999999;
            .icon-operator {
              display: inline-block;
              width: 12px;
              height: 16px;
              background: url("./images/icon_operator.png") left center
                no-repeat;
              background-size: 100% 100%;
              margin-right: rem(8px);
            }
            .icon-time {
              display: inline-block;
              width: 16px;
              height: 16px;
              background: url("./images/icon_time.png") left center no-repeat;
              background-size: 100% 100%;
              margin-right: rem(8px);
            }
          }
          .item-value {
            margin-top: rem(6px);
            font-size: 18px;
          }
        }
      }
    }
    .contact-friend-circle-wrap {
      margin-top: rem(8px);
      //height: rem(210px);
      padding: rem(15px) 0 rem(4px) rem(15px);
      background: #fff;
      //margin-bottom: 100px;
      h3 {
        font-size: 15px;
        font-weight: 400;
      }
      .chart-wrapper {
        margin-top: rem(-25px);
        margin-left: rem(-30px);
      }
    }
    .contacts-wrap,
    .contacts-wrap-empty {
      overflow: hidden;
      margin-top: rem(8px);
      padding: rem(15px) rem(15px) rem(30px) rem(15px);
      background: #fff;
      h3 {
        font-size: 15px;
        font-weight: 400;
      }
      .swiper-container {
        overflow: visible;
        .swiper-slide {
          width: 94% !important;
          /* Center slide text vertically */
          display: -webkit-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          -webkit-justify-content: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          -webkit-align-items: center;
          align-items: center;
          margin-right: 8px !important;
          .contacts-list {
            width: 100%;
            margin-top: rem(16px);
            background: #f5f5f5;
            border-radius: 8px;
            padding: rem(16px);
            .item {
              width: 100%;
              li {
                font-size: 15px;
                // margin-right: rem(14px);
                margin-bottom: rem(16px);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                .key {
                  color: #999999;
                  margin-right: rem(16px);
                }
                &:nth-child(2n) {
                  width: 40%;
                  float: right;
                  margin-right: 0;
                }
                &:nth-child(2n + 1) {
                  width: 50%;
                  float: left;
                  margin-right: rem(10px);
                }
                &:nth-child(5),
                &:nth-child(6) {
                  margin-bottom: 0;
                }
              }
            }
          }
        }
      }
      .desc {
        padding: rem(39px) 0 rem(30px) 0;
        font-size: 15px;
        color: #999999;
        text-align: center;
        line-height: rem(26px);
      }
    }
    .number-verification-wrap,
    .number-verification-wrap-empty {
      margin-top: rem(8px);
      padding: rem(15px);
      background: #fff;
      h3 {
        font-size: 15px;
        font-weight: 400;
        margin-bottom: rem(17px);
      }
      .warn-text {
        font-size: 15px;
        height: 21px;
        line-height: 21px;
        color: #999999;
        width: 100%;
        background: url("./images/icon_warn.png") left center no-repeat;
        background-size: 18px 18px;
        margin-bottom: rem(15px);
        span {
          padding-left: rem(26px);
        }
      }
      .report-desc {
        margin-top: rem(22px);
        background: #f5f5f5;
        border-radius: 8px;
        padding: rem(10px);
        .title {
          font-size: 15px;
          color: #333333;
          margin-bottom: rem(4px);
        }
        .desc {
          padding: 0;
          font-size: 13px;
          color: #999999;
          line-height: rem(20px);
        }
      }
      .desc {
        padding: rem(15px) rem(76px) 0 rem(76px);
        img {
          display: block;
          width: rem(90px);
          height: rem(90px);
          margin: 0 auto;
        }
      }
      .tips {
        margin-top: rem(24px);
        font-size: 15px;
        color: #333333;
        text-align: center;
        padding-bottom: rem(17px);
      }
    }
    .btn {
      width: rem(345px);
      height: rem(44px);
      text-align: center;
      line-height: rem(44px);
      margin: rem(32px) auto;
      background: #ff7640;
      border-radius: 5px;
      font-size: 14px;
      color: #fff;
    }
  }
  .appContent {
    padding-top: 0;
  }
}
.weixin-pop {
  position: fixed;
  z-index: 10000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  .weixin-share-wrap {
    position: absolute;
    right: rem(40px);
    img {
      display: block;
      width: rem(58.5px);
      height: rem(99.5px);
      margin: 0 auto;
      margin-right: rem(4px);
    }
    p {
      font-size: 12px;
      color: #ddd;
      text-align: center;
      margin: rem(6px) 0;
    }
  }
}
</style>