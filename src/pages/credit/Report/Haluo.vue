<template>
  <div class="haluo">
    <page-header
      :title="title"
      :showBack="showBack"
      :showBtnClose="showBtnClose"
      :jumpRouteName="'Inquiry'"
      v-if="platform === 'H5'"
    ></page-header>
    <div class="content" :class="{ appContent: platform === 'APP' }">
      <div class="haluo-report-wrap">
        <div class="title-wrap">
          <h1>哈啰单车报告</h1>
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
            <p class="icon-verified" v-if="profile.verified">实名认证</p>
            <p class="icon-not-verified" v-else>未实名</p>
          </div>
        </div>
      </div>
      <div class="trip-summary-wrap">
        <h3>行程汇总</h3>
        <ul class="trip-summary-list">
          <li>
            <p class="value">{{summary.sumNumber}}</p>
            <p class="title">次数</p>
          </li>
          <li>
            <p class="value">{{summary.sumTime}}</p>
            <p class="title">总时长(分)</p>
          </li>
          <li>
            <p class="value">{{summary.sumDistance}}</p>
            <p class="title">总里程(米)</p>
          </li>
          <li>
            <p class="value">{{summary.sumFee}}</p>
            <p class="title">总费用(元)</p>
          </li>
        </ul>
      </div>
      <div class="longest-trip-wrap">
        <h3>最长行程</h3>
        <div class="distance-wrap">
          <p class="distance-num">
            <i class="icon-start"></i>
            <span class="value">{{distanceObj.distance}}米</span>
            <i class="icon-end"></i>
          </p>
          <p class="distance-location">
            <span>{{distanceObj.startLocation}}</span>
            <span>{{distanceObj.endLocation}}</span>
          </p>
        </div>
        <div class="distance-tips">
          <div class="time-warp">
            <i class="icon-time"></i>
            <span class="title">时间</span>
            <span class="value">{{distanceObj.time}}</span>
          </div>
          <div class="speed-warp">
            <i class="icon-speed"></i>
            <span class="title">速度</span>
            <span class="value">{{distanceObj.speed}}</span>
          </div>
        </div>
      </div>
      <div class="fastest-wrap">
        <h3>速度最快</h3>
        <div class="distance-wrap">
          <p class="distance-num">
            <i class="icon-start"></i>
            <span class="value">{{speedObj.speed}}</span>
            <i class="icon-end"></i>
          </p>
          <p class="distance-location">
            <span>{{speedObj.startLocation}}</span>
            <span>{{speedObj.endLocation}}</span>
          </p>
        </div>
        <div class="distance-tips">
          <div class="time-warp">
            <i class="icon-time"></i>
            <span class="title">时间</span>
            <span class="value">{{speedObj.time}}</span>
          </div>
          <div class="distance-warp">
            <i class="icon-distance"></i>
            <span class="title">距离</span>
            <span class="value">{{speedObj.distance}}米</span>
          </div>
        </div>
      </div>
      <div class="frequent-address" v-if="frequentAddress.length > 0">
        <h3>常去地址</h3>
        <div class="address-ranking">
          <p>
            <i class="icon-champion"></i>
            <span class="value">{{frequentAddress[0]}}</span>
          </p>
          <p>
            <span class="num">2</span>
            <span class="value">{{frequentAddress[1]}}</span>
          </p>
          <p>
            <span class="num">3</span>
            <span class="value">{{frequentAddress[2]}}</span>
          </p>
        </div>
        <div class="address-tips">
          <p class="title">报告说明</p>
          <p class="desc">通过对骑行次数、距离、常去地址的汇总，有效的运动轨迹和稳定的生活圈，将会有利于您的还款能力评估。</p>
        </div>
      </div>
      <div class="frequent-address-empty" v-else>
        <h3>常去地址</h3>
        <p class="desc">
          没有获取到您的记录哦，
          <br>快去更新报告吧！
        </p>
      </div>
      <div class="btn" @click="shareMethods" v-if="shareBox">分享给朋友</div>
      <div id="share" @click="sharePopup" class="btn" v-if="!shareBox && isWeiXinShare">分享给朋友</div>
    </div>
    <div class="weixin-pop" v-if="isShowWeixinPop">
      <div class="weixin-share-wrap" v-if="isShowWeixinShareWrap">
        <img src="./images/icon_weixin_share.png">
        <p>点击右上角</p>
        <p>分享给朋友和朋友圈</p>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import ConsumptionTrendLine from "@/components/ConsumptionTrendLine.vue";
import { XCircle, ButtonTab, ButtonTabItem } from "vux";
import Swiper from "swiper";
let share = require("@/assets/js/mShare");

export default {
  name: "Haluo",
  components: {
    PageHeader,
    ConsumptionTrendLine,
    XCircle,
    ButtonTab,
    ButtonTabItem
  },
  data() {
    return {
      title: this.$route.meta.title,
      showBack: true,
      showBtnClose: false,
      situation: "",
      contactsArr: [],
      shareBox: false,
      date: "",
      profile: {
        creditScore: 0,
        percent: 0,
        verified: false
      },
      summary: {
        sumNumber: 0,
        sumTime: 0,
        sumDistance: 0,
        sumFee: 0
      },
      distanceObj: {
        distance: "0",
        startLocation: "",
        endLocation: "",
        time: 0,
        speed: "0"
      },
      speedObj: {
        distance: "0",
        startLocation: "",
        endLocation: "",
        time: 0,
        speed: "0"
      },
      frequentAddress: [],
      platform: this.utils.getPlatform(),
      wxShareIco: require("./images/icon_share.png"),
      showToast: true,
      thumbnailImg: "",
      isShowWeixinPop: false,
      isWeiXinShare: false,
      isShowWeixinShareWrap: true,
      mediasource: ''
    };
  },
  methods: {
    refresh() {
      let postData = {
        userName: this.utils.getCookie("userName"),
        creditType: "helloBike"
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
      this.mediasource = window.sessionStorage.getItem('mediasource');
      this.isWeiXinShare = this.isWeiXin();
      if (this.isWeiXinShare) {
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
            wx.onMenuShareAppMessage({
              desc: "分享更有机会获得额外惊喜哦~",
              title: "完善个人征信报告，拿免息优惠劵！",
              link: this.config.NEW_MWEB_PATH + "/activityIntroduction?mediasource=" + this.mediasource,
              imgUrl: this.config.MWEB_PATH + this.wxShareIco,
              success: function() {},
              cancel: function() {}
            });
            wx.onMenuShareTimeline({
              desc: "分享更有机会获得额外惊喜哦~",
              title: "完善个人征信报告，拿免息优惠劵！",
              link: this.config.NEW_MWEB_PATH + "/activityIntroduction?mediasource=" + this.mediasource,
              imgUrl: this.config.MWEB_PATH + this.wxShareIco,
              success: function() {},
              cancel: function() {}
            });
          });
        });
      }
      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      let day = new Date().getDate();
      this.date = year + "." + month + "." + day;
      let postData = {
        reportType: "helloBike",
        userName: this.utils.getCookie("userName")
      };
      this.common.getCreditReport(postData).then(res => {
        if (res.data.resultCode === "1") {
          let data = JSON.parse(res.data.data).data;
          let profile = data.profile;
          this.profile.verified = profile.verified;
          this.profile.creditScore = !profile.credit_score
            ? 0
            : profile.credit_score;
          this.profile.percent =
            this.profile.creditScore > 1000
              ? 100
              : (this.profile.creditScore / 1000) * 100;
          let summary = data.summary;
          this.summary.sumNumber = !summary.sum_number ? 0 : summary.sum_number;
          this.summary.sumTime = !summary.sum_time ? 0 : summary.sum_time;
          this.summary.sumDistance = !summary.sum_distance
            ? 0
            : summary.sum_distance;
          this.summary.sumFee = !summary.sum_fee ? 0 : summary.sum_fee;

          let trafficDetail = data.traffic_detail;
          trafficDetail.forEach(item => {
            item.speed = item.distance / item.seconds;
          });
          let distanceObj = _.max(trafficDetail, item => {
            return item.distance;
          });
          let speedObj = _.max(trafficDetail, item => {
            return item.speed;
          });
          this.distanceObj.distance = distanceObj.distance
            ? distanceObj.distance
            : "0";
          this.distanceObj.startLocation = distanceObj.start_location
            ? distanceObj.start_location
            : "暂无数据";
          this.distanceObj.endLocation = distanceObj.end_location
            ? distanceObj.end_location
            : "暂无数据";
          this.distanceObj.time = distanceObj.seconds
            ? this.utils.formatSeconds(distanceObj.seconds)
            : "0秒";
          this.distanceObj.speed =
            distanceObj.distance / distanceObj.seconds
              ? parseInt((distanceObj.distance / distanceObj.seconds) * 3.6) +
                "km/h"
              : "0km/h";

          this.speedObj.distance = speedObj.distance ? speedObj.distance : "0";
          this.speedObj.startLocation = speedObj.start_location
            ? speedObj.start_location
            : "暂无数据";
          this.speedObj.endLocation = speedObj.end_location
            ? speedObj.end_location
            : "暂无数据";
          this.speedObj.time = speedObj.seconds
            ? this.utils.formatSeconds(speedObj.seconds)
            : "0秒";
          this.speedObj.speed =
            speedObj.distance / speedObj.seconds
              ? parseInt((speedObj.distance / speedObj.seconds) * 3.6) + "km/h"
              : "0km/h";

          let endLocationArr = _.pluck(trafficDetail, "end_location");
          let sortByCount = function(arr) {
            let arrUni = [];
            let arrCnt = [];
            arr.forEach(val => {
              let idx = arrUni.indexOf(val);
              if (idx < 0) {
                arrUni.push(val);
                arrCnt.push(1);
              } else {
                arrCnt[idx]++;
              }
            });
            let arrTmp = arrUni.slice();
            arrUni.sort((a, b) => {
              let idxa = arrTmp.indexOf(a);
              let idxb = arrTmp.indexOf(b);
              return arrCnt[idxb] - arrCnt[idxa];
            });
            return arrUni;
          };
          this.frequentAddress = sortByCount(endLocationArr).splice(0, 3);
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
          shareUrl: this.config.NEW_MWEB_PATH + "/activityIntroduction?mediasource=" + this.mediasource,
          shareImageUrl: this.wxShareIco
        })
      );
    },
    sharePopup() {
      // var config = {
      //   title: this.title,
      //   desc: "征信报告分享", // 描述, 默认读取head标签：<meta name="description" content="desc" />
      //   types: ["wx", "qq", "qzone", "sina"], // 开启的分享图标, 默认为全部
      //   infoMap: {
      //     wx: {
      //       title: this.title,
      //       desc: "征信报告分享",
      //       link:  this.config.NEW_MWEB_PATH + '/activityIntroduction',
      //       imgUrl: this.wxShareIco
      //     }
      //   },
      //   fnDoShare: function(type) {}
      // };
      // share.Mshare.popup(config);
      this.isShowWeixinPop = true;
      setTimeout( ()=> {
        this.isShowWeixinPop = false;
      }, 3000)
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
  }
};
</script>

<style lang="scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";
.haluo {
  width: 100%;
  height: 100%;
  background: #f1f1f1;
  overflow-y: auto;
  overflow-x: hidden;
  .content {
    width: 100%;
    height: auto;
    padding-top: rem(50px);
    background: #f1f1f1;
    .haluo-report-wrap {
      padding: rem(8px) rem(15px) rem(44px) rem(15px);
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
    }
    .trip-summary-wrap,
    .frequent-address,
    .frequent-address-empty {
      margin-top: rem(8px);
      padding: rem(15px) 0 rem(16px) 0;
      background: #fff;
      h3 {
        font-size: 15px;
        font-weight: 400;
        padding: 0 rem(15px);
      }
      .trip-summary-list {
        display: flex;
        justify-content: space-between;
        padding: 0 rem(30px);
        margin-top: rem(24px);
        margin-bottom: rem(8px);
        li {
          text-align: center;
          .value {
            font-size: 20px;
          }
          .title {
            margin-top: rem(4px);
            font-size: 11px;
            color: #999999;
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
      .consumption-tips {
        margin: 0 rem(15px);
        background: #f5f5f5;
        border-radius: 8px;
        padding: rem(10px);
        .title {
          font-size: 15px;
          color: #333333;
          margin-bottom: rem(4px);
        }
        .desc {
          font-size: 13px;
          color: #999999;
          line-height: rem(20px);
        }
      }
      .address-ranking {
        margin-top: rem(16px);
        p {
          display: flex;
          align-content: center;
          font-size: 15px;
          padding: 0 rem(27px);
          margin-bottom: rem(16px);
          .icon-champion {
            display: inline-block;
            width: rem(23px);
            height: rem(30px);
            background: url("./images/icon_champion.png") left center no-repeat;
            background-size: cover;
          }
          .value {
            display: inline-block;
            width: 85%;
            height: rem(30px);
            line-height: rem(30px);
            margin-left: rem(10px);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .num {
            display: inline-block;
            width: rem(23px);
            height: rem(30px);
            line-height: rem(30px);
            text-align: center;
          }
        }
      }
      .address-tips {
        margin: 0 rem(15px);
        background: #f5f5f5;
        border-radius: 8px;
        padding: rem(10px);
        .title {
          font-size: 15px;
          color: #333333;
          margin-bottom: rem(4px);
        }
        .desc {
          font-size: 13px;
          color: #999999;
          line-height: rem(20px);
          padding: 0;
          text-align: left;
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
    .longest-trip-wrap,
    .fastest-wrap {
      width: 100%;
      //height: rem(209px);
      margin-top: rem(8px);
      padding-bottom: rem(40px);
      background: #fff url("./images/bg_map.png") center center no-repeat;
      background-size: cover;
      h3 {
        font-size: 15px;
        font-weight: 400;
        padding: rem(15px);
      }
      .distance-wrap {
        padding: 0 rem(45px);
        .distance-num {
          i {
            display: inline-block;
            width: rem(18px);
            height: rem(22px);
            vertical-align: bottom;
            &.icon-start {
              margin-left: rem(43px);
              background: url("./images/icon_location.png") center center
                no-repeat;
              background-size: cover;
              margin-right: rem(5px);
            }
            &.icon-end {
              margin-right: rem(37px);
              background: url("./images/icon_location.png") center center
                no-repeat;
              background-size: cover;
              margin-left: rem(5px);
            }
          }
          .value {
            display: inline-block;
            width: rem(130px);
            border-bottom: 2px dashed #cccccc;
            margin-bottom: 6px;
            text-align: center;
            font-size: 17px;
            line-height: 34px;
          }
        }
        .distance-location {
          margin-top: rem(15px);
          font-size: 15px;
          color: #999999;
          display: flex;
          justify-content: space-between;
          span {
            height: 20px;
            width: 44%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
          }
        }
      }
      .distance-tips {
        margin-top: rem(26px);
        display: flex;
        padding: 0 rem(48px);
        justify-content: space-between;
        .time-warp {
          display: flex;
          align-content: center;
          .icon-time {
            display: inline-block;
            width: rem(16px);
            height: rem(16px);
            margin-top: rem(3px);
            margin-right: rem(4px);
            background: url("./images/icon_time.png") center center no-repeat;
            background-size: 100% 100%;
          }
          .title {
            margin-right: rem(8px);
            font-size: 15px;
            color: #999999;
          }
          .value {
            font-size: 15px;
          }
        }
        .speed-warp {
          display: flex;
          align-content: center;
          .icon-speed {
            display: inline-block;
            width: rem(11px);
            height: rem(17px);
            margin-top: rem(3px);
            margin-right: rem(4px);
            background: url("./images/icon_speed.png") left top no-repeat;
            background-size: cover;
          }
          .title {
            margin-right: rem(8px);
            font-size: 15px;
            color: #999999;
          }
          .value {
            font-size: 15px;
          }
        }
        .distance-warp {
          display: flex;
          align-content: center;
          .icon-distance {
            display: inline-block;
            width: rem(16px);
            height: rem(16px);
            margin-top: rem(3px);
            margin-right: rem(4px);
            background: url("./images/icon_distance.png") left top no-repeat;
            background-size: cover;
          }
          .title {
            margin-right: rem(8px);
            font-size: 15px;
            color: #999999;
          }
          .value {
            font-size: 15px;
          }
        }
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
}
</style>