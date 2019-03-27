<template>
  <div class="eleme">
    <page-header
      :title="title"
      :showBack="showBack"
      :showBtnClose="showBtnClose"
      :jumpRouteName="'Inquiry'"
      v-if="platform === 'H5'"
    ></page-header>
    <div class="content" :class="{ appContent: platform === 'APP' }">
      <div class="eleme-report-wrap">
        <div class="title-wrap">
          <h1>饿了么消费报告</h1>
          <div class="refresh">
            <i class="icon-refresh" @click="refresh"></i>
            <p class="date">{{date}}</p>
          </div>
        </div>
      </div>
      <div class="year-consumption-wrap">
        <h3>年度消费情况</h3>
        <div class="tab-wrap">
          <button-tab v-model="selected">
            <button-tab-item @on-item-click="yearSwitch()">2018</button-tab-item>
            <button-tab-item @on-item-click="yearSwitch()">2019</button-tab-item>
          </button-tab>
          <div class="line"></div>
        </div>
        <ul class="consumption-list">
          <li>
            <p class="value">{{totalPriceSum}}</p>
            <p class="title">总消费(元)</p>
          </li>
          <li>
            <p class="value">{{monthAverage}}</p>
            <p class="title">月均消费(元)</p>
          </li>
          <li>
            <p class="value">{{countSum}}</p>
            <p class="title">消费次数</p>
          </li>
        </ul>
        <div class="consumption-tips">
          <p class="title">年度消费说明</p>
          <p class="desc">年度消费情况反映您的个人消费能力。总消费、月均消费、消费次数越高，网购年龄越长，将会有利于您的还款能力评估。</p>
        </div>
      </div>
      <div class="consumption-trend">
        <h3>消费走势</h3>
        <consumption-trend-line :historyList="historyList"></consumption-trend-line>
        <div class="consumption-tips">
          <p class="title">消费走势说明</p>
          <p class="desc">消费走势反映您消费情况的稳定性，平稳的消费走势一般表示您收入及消费水平的稳定，将有利于您的还款能力评估。</p>
        </div>
      </div>
      <div class="meal-record">
        <h3>壕餐记录</h3>
        <p class="title">
          <i class="line-left"></i>
          <span>在饿了么</span>
          <i class="line-right"></i>
        </p>
        <p class="desc">
          <span class="small">与</span>
          <span class="large">{{shopNameSum}}</span>
          <span class="small">家商家发生纯洁的供求关系</span>
        </p>
      </div>
      <div class="most-expensive-meal" v-if="thisYearOrderListSortBy.length > 0">
        <p class="title">今年最壕一餐是</p>
        <div class="name">
          <i class="icon-meal-left"></i>
          <span class="value">{{mostExpensiveMealName}}</span>
          <i class="icon-meal-right"></i>
        </div>
        <p class="total-price">
          <span class="small">总消费</span>
          <span class="price">{{mostExpensiveMealPrice}}</span>
          <span class="small">元</span>
        </p>
      </div>
      <div class="most-expensive-meal-empty" v-else>
        <p class="title">今年最壕一餐是</p>
        <p class="desc">没有获取到您的记录哦，
          <br>快去更新报告吧！
        </p>
      </div>
      <div class="usually-favorite" v-if="favoriteFoodName">
        <h3>平时最爱吃</h3>
        <div class="favorite-food-wrap">
          <div class="favorite-food">
            <p class="name">{{favoriteFoodName}}</p>
            <p class="frequency">
              点餐次数
              <span class="value">{{favoriteFoodCount}}</span>次
            </p>
          </div>
          <div class="bg-usually-favorite"></div>
        </div>
      </div>
      <div class="usually-favorite-empty" v-else>
        <h3>平时最爱吃</h3>
        <p class="desc">没有获取到您的记录哦，
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
var moment = require("moment");

export default {
  name: "Eleme",
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
      date: "",
      percent: 0,
      situation: "",
      contactsArr: [],
      shareBox: false,
      selected: 1,
      totalPriceSum: 0,
      thisTotalPriceSum: 0,
      lastTotalPriceSum: 0,
      monthAverage: 0,
      thisMonthAverage: 0,
      lastMonthAverage: 0,
      countSum: 0,
      thisCountSum: 0,
      lastCountSum: 0,
      historyList: [],
      shopNameSum: 0,
      favoriteFoodCount: 0,
      favoriteFoodName: "",
      mostExpensiveMealName: "",
      mostExpensiveMealPrice: "",
      thisYearOrderListSortBy: [],
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
        creditType: "eleme"
      };
      this.common.queryCreditUrl(postData).then(res => {
        let data = res.data;
        if (data.resultCode === "1") {
          let url = data.url;
          if(data.userInfo) {
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
              link: this.config.NEW_MWEB_PATH + "/activityIntroduction",
              imgUrl: this.config.MWEB_PATH + this.wxShareIco,
              success: function() {},
              cancel: function() {}
            });
            wx.onMenuShareTimeline({
              desc: "分享更有机会获得额外惊喜哦~",
              title: "完善个人征信报告，拿免息优惠劵！",
              link: this.config.NEW_MWEB_PATH + "/activityIntroduction",
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
        reportType: "eleme",
        userName: this.utils.getCookie("userName")
      };
      this.common.getCreditReport(postData).then(res => {
        if (res.data.resultCode === "1") {
          let data = JSON.parse(res.data.data);
          console.log("data=", data);
          let monthSummary = data.month_summary;
          let thisYearSummary = monthSummary.filter(item => {
            return moment(item.month).isValid() && item.month.slice(0, 4) == new Date().getFullYear();
          });
          let lastYearSummary = monthSummary.filter(item => {
            return moment(item.month).isValid() && item.month.slice(0, 4) == new Date().getFullYear() - 1;
          });
          console.log('thisYearSummary', thisYearSummary, lastYearSummary)
          let thisTotalPrice = _.pluck(thisYearSummary, "price");
          let lastTotalPrice = _.pluck(lastYearSummary, "price");
          let thisCount = _.pluck(thisYearSummary, "count");
          let lastCount = _.pluck(lastYearSummary, "count");
          this.thisTotalPriceSum = parseInt(
            _.reduce(
              thisTotalPrice,
              function(memo, num) {
                return memo + num;
              },
              0
            )
          );
          this.lastTotalPriceSum = parseInt(
            _.reduce(
              lastTotalPrice,
              function(memo, num) {
                return memo + num;
              },
              0
            )
          );
          this.thisCountSum = parseInt(
            _.reduce(
              thisCount,
              function(memo, num) {
                return memo + num;
              },
              0
            )
          );
          this.lastCountSum = parseInt(
            _.reduce(
              lastCount,
              function(memo, num) {
                return memo + num;
              },
              0
            )
          );
          this.thisMonthAverage =
            thisYearSummary.length === 0
              ? 0
              : parseInt(this.thisTotalPriceSum / (new Date().getMonth() + 1));
          this.lastMonthAverage =
            lastYearSummary.length === 0
              ? 0
              : parseInt(this.lastTotalPriceSum / 12);
          this.yearSwitch();
          let originalConsumptionTrend = [];
          let date = new Date();
          let year = date.getFullYear();
          date.setMonth(date.getMonth() + 1, 1); //获取到当前月份,设置月份
          for (let i = 0; i < 12; i++) {
            date.setMonth(date.getMonth() - 1); //每次循环一次 月份值减1
            let m = date.getMonth() + 1;
            m = m < 10 ? "0" + m : m;
            let item = {
              detail: 0,
              date: date.getFullYear() + "-" + m
            };
            originalConsumptionTrend.push(item);
          }
          console.log('originalConsumptionTrend====', originalConsumptionTrend)
          let serverConsumptionTrend = [];
          for (let j = 0; j < monthSummary.length; j++) {
            if(moment(monthSummary[j].month).isValid()) {
              let val = {
                detail: parseInt(monthSummary[j].price),
                date: monthSummary[j].month
              };
              serverConsumptionTrend.push(val);
            }
          }
          serverConsumptionTrend = serverConsumptionTrend
            .reverse()
            .splice(0, 12);
          console.log('serverConsumptionTrend===', serverConsumptionTrend)
          const obj = {};
          const historyList = [];
          originalConsumptionTrend
            .concat(serverConsumptionTrend)
            .forEach(item => {
              obj[item.date] = item.detail;
            });
          for (let o in obj) {
            historyList.push({ detail: obj[o], date: o });
          }
          console.log('historyList====', historyList)
          this.historyList = historyList.reverse();
          let orderList = data.order_list;
          console.log('orderList===', orderList)
          let thisYearOrderList = orderList.filter(item => {
            return moment(item.setup_time).isValid() && item.setup_time.slice(0, 4) == new Date().getFullYear();
          });
          let thisYearOrderListSortBy = _.sortBy(
            thisYearOrderList,
            "price"
          ).reverse();
          console.log('thisYearOrderList===', thisYearOrderList)
          this.thisYearOrderListSortBy = thisYearOrderListSortBy;
          this.mostExpensiveMealName = thisYearOrderListSortBy[0].shop_name;
          this.mostExpensiveMealPrice = thisYearOrderListSortBy[0].price;
          let shopNameArr = _.pluck(orderList, "shop_name");
          this.shopNameSum = _.uniq(shopNameArr).length;
          let favoriteFood = _.countBy(orderList, "shop_name");
          let favoriteFoodValues = _.values(favoriteFood);
          let favoriteFoodValuesSort = favoriteFoodValues.sort((a, b) => {
            return b - a;
          });
          this.favoriteFoodCount = favoriteFoodValuesSort[0];
          function findKey(obj, value, compare = (a, b) => a === b) {
            return Object.keys(obj).find(k => compare(obj[k], value));
          }
          this.favoriteFoodName = findKey(favoriteFood, this.favoriteFoodCount);
        } else {
          this.$vux.toast.show({
            type: "text",
            position: "middle",
            text: res.data.resultMsg
          });
        }
      });
    },
    yearSwitch() {
      this.selected === 0
        ? (this.totalPriceSum = this.lastTotalPriceSum)
        : (this.totalPriceSum = this.thisTotalPriceSum);
      this.selected === 0
        ? (this.monthAverage = this.lastMonthAverage)
        : (this.monthAverage = this.thisMonthAverage);
      this.selected === 0
        ? (this.countSum = this.lastCountSum)
        : (this.countSum = this.thisCountSum);
    },
    getActiveSituation() {
      let status = (this.status = 3);
      switch (status) {
        case 1:
          this.percent = 25;
          this.situation = "活跃";
          break;
        case 2:
          this.percent = 50;
          this.situation = "正常";
          break;
        case 3:
          this.percent = 75;
          this.situation = "偶尔";
          break;
        case 4:
          this.percent = 100;
          this.situation = "休眠";
          break;
      }
    },
    shareMethods() {
      window.hicashJSCommunication.onCallApp(
        JSON.stringify({
          type: "h5_share",
          shareTitle: this.title,
          shareContent: "征信报告分享",
          shareUrl:  this.config.NEW_MWEB_PATH + '/activityIntroduction',
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
      //       link: this.config.NEW_MWEB_PATH + '/activityIntroduction',
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
.eleme {
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
    .eleme-report-wrap {
      padding: rem(8px) rem(15px) rem(24px) rem(15px);
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
        .score-tips {
          margin-top: rem(24px);
          font-size: 15px;
          color: #c99d3a;
          text-align: center;
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
    .year-consumption-wrap,
    .consumption-trend {
      padding-bottom: rem(16px);
      background: #fff;
      h3 {
        font-size: 15px;
        font-weight: 400;
        padding: 0 rem(15px);
      }
      .tab-wrap {
        position: relative;
        margin-top: rem(16px);
        /deep/ .vux-button-group {
          position: relative;
          padding: 0 rem(115px);
          z-index: 100;
          a {
            width: rem(64px);
            height: rem(25px);
            line-height: rem(25px);
            flex: none;
            margin-right: rem(14px);
            border-radius: 12.5px;
            border: 1px solid #ff7640;
            color: #ff7640;
            &:after {
              border: 0;
            }
          }
          a.vux-button-group-current {
            background: #ff7640;
            color: #fff;
          }
          a.vux-button-tab-item-last {
            margin-right: 0;
          }
        }
        .line {
          position: absolute;
          width: 100%;
          top: rem(12px);
          border: 1px solid #ff7640;
          z-index: 1;
        }
      }
      .consumption-list {
        display: flex;
        justify-content: space-between;
        padding: 0 rem(30px);
        margin-top: rem(30px);
        margin-bottom: rem(22px);
        li {
          text-align: center;
          margin-right: rem(20px);
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
    }
    .consumption-trend {
      margin-top: rem(8px);
      padding-top: rem(15px);
    }
    .meal-record {
      width: 100%;
      height: rem(188px);
      background: url("./images/bg_meal_record.png") center center no-repeat;
      background-size: cover;
      margin-top: rem(8px);
      padding-top: rem(15px);
      h3 {
        font-size: 15px;
        font-weight: 400;
        padding: 0 rem(15px);
        color: #fff;
      }
      .title {
        margin-top: rem(24px);
        padding: 0 rem(90px);
        text-align: center;
        i {
          width: 26px;
          display: inline-block;
          margin-bottom: 5px;
          &.line-left {
            border-bottom: 1px solid #fff;
            margin-right: rem(16px);
          }
          &.line-right {
            border-bottom: 1px solid #fff;
            margin-left: rem(16px);
          }
        }
        span {
          display: inline-block;
          font-size: 15px;
          color: #fff;
        }
      }
      .desc {
        margin-top: rem(16px);
        text-align: center;
        font-size: 15px;
        color: #fff;
        .small {
          display: inline-block;
        }
        .large {
          display: inline-block;
          font-size: 32px;
          margin-left: rem(3px);
          margin-right: rem(3px);
        }
      }
    }
    .most-expensive-meal,
    .most-expensive-meal-empty {
      width: 100%;
      height: rem(141px);
      background: #fff;
      padding-top: rem(24px);
      .title {
        font-size: 15px;
        text-align: center;
      }
      .name {
        text-align: center;
        margin-top: rem(20px);
        //height: rem(40px);
        //line-height: rem(40px);
        i {
          display: inline-block;
          width: rem(24px);
          height: rem(41px);
          vertical-align: top;
          &.icon-meal-left {
            background: url("./images/icon_meal_left.png") center center
              no-repeat;
            background-size: cover;
          }
          &.icon-meal-right {
            background: url("./images/icon_meal_right.png") center center
              no-repeat;
            background-size: cover;
          }
        }
        .value {
          display: inline-block;
          width: rem(156px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-top: rem(4px);
        }
      }
      .total-price {
        text-align: center;
        font-size: 15px;
        color: #999999;
        .small {
          display: inline-block;
        }
        .price {
          display: inline-block;
          font-size: 24px;
          color: #ff7640;
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
    .usually-favorite,
    .usually-favorite-empty {
      margin-top: rem(8px);
      padding: rem(15px) rem(15px) rem(10px) rem(15px);
      background: #fff;
      h3 {
        font-size: 15px;
        font-weight: 400;
      }
      .favorite-food-wrap {
        display: flex;
        justify-content: space-between;
        .favorite-food {
          padding-top: rem(17px);
          width: rem(200px);
          .name {
            font-size: 26px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .frequency {
            margin-top: rem(4px);
            font-size: 15px;
            color: #999999;
            .value {
              color: #ff7640;
            }
          }
        }
        .bg-usually-favorite {
          width: rem(116px);
          height: rem(83px);
          background: #fff url("./images/bg_usually_favorite.png") right center
            no-repeat;
          background-size: cover;
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