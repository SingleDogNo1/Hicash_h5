<template>
  <div class="jingdong">
    <page-header
      :title="title"
      :showBack="showBack"
      :showBtnClose="showBtnClose"
      :jumpRouteName="'Inquiry'"
      v-if="platform === 'H5'"
    ></page-header>
    <div class="content" :class="{ appContent: platform === 'APP' }">
      <div class="jingdong-report-wrap">
        <div class="title-wrap">
          <h1>京东消费报告</h1>
          <div class="refresh">
            <i class="icon-refresh" @click="refresh"></i>
            <p class="date">{{date}}</p>
          </div>
        </div>
        <div class="score-wrap">
          <div style="width:150px;z-index:1">
            <x-circle
              :percent="profile.percent"
              :stroke-width="4"
              :trail-width="4"
              stroke-color="#E61A0F"
            >
              <span class="score-value">{{profile.situation}}</span>
              <p class="score-text">账号活动情况</p>
            </x-circle>
            <p class="icon-verified" v-if="profile.verified">实名认证</p>
            <p class="icon-not-verified" v-else>未实名</p>
            <p class="score-tips">小白信用分 {{baiScore}}</p>
          </div>
        </div>
      </div>
      <div class="year-consumption-wrap">
        <h3>年度消费情况</h3>
        <div class="tab-wrap">
          <button-tab v-model="selected">
            <button-tab-item @on-item-click="yearSwitch()">2019</button-tab-item>
            <button-tab-item @on-item-click="yearSwitch()">2018</button-tab-item>
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
      <div class="price-wrap" v-if="billsDetailBySort.length > 0">
        <h3>单品价格前三</h3>
        <div class="price-ranking">
          <!-- <div class="first">
            <p class="name">{{billsDetailBySort[0].items[0].product_name}}</p>
            <p class="price">¥{{billsDetailBySort[0].total_price}}</p>
          </div>
          <div class="second">
            <p class="name">{{billsDetailBySort[1].items[0].product_name}}</p>
            <p class="price">¥{{billsDetailBySort[1].total_price}}</p>
          </div>
          <div class="third">
            <p class="name">{{billsDetailBySort[2].items[0].product_name}}</p>
            <p class="price">¥{{billsDetailBySort[2].total_price}}</p>
          </div>-->
          <div
            :class="{ 'first': index == 0, 'second': index == 1, 'third': index == 2 }"
            v-for="(item, index) in billsDetailBySort"
            :key="index"
          >
            <p class="name">{{item.items[0].product_name}}</p>
            <p class="price">¥{{item.total_price}}</p>
          </div>
        </div>
        <div class="price-tips">
          <p class="title">消费价格说明</p>
          <p class="desc">消费价格评估将您购买产品的单价进行排名，评估您的消费承受能力，单品价格越高，越有利于对您还款能力的评估。</p>
        </div>
      </div>
      <div class="price-wrap-empty" v-else>
        <h3>单品价格前三</h3>
        <p class="empty-desc">没有获取到您的记录哦，
          <br>快去更新报告吧！
        </p>
      </div>
      <div class="btn" @click="shareMethods" v-if="shareBox">分享给朋友</div>
      <div id="share" @click="sharePopup" class="btn" v-if="!shareBox">分享给朋友</div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import ConsumptionTrendLine from "@/components/ConsumptionTrendLine.vue";
import { XCircle, ButtonTab, ButtonTabItem } from "vux";
import Swiper from "swiper";
let share = require("@/assets/js/mShare");
let moment = require("moment");

export default {
  name: "Jingdong",
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
      baiScore: "",
      profile: {
        creditScore: 0,
        percent: 0,
        verified: false,
        situation: ""
      },
      contactsArr: [],
      shareBox: false,
      selected: 0,
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
      billsDetailBySort: [],
      platform: this.utils.getPlatform()
    };
  },
  methods: {
    refresh() {
      let postData = {
        userName: this.utils.getCookie("userName"),
        creditType: "jd"
      };
      this.common.queryCreditUrl(postData).then(res => {
        let data = res.data;
        if (data.resultCode === "1") {
          let url = data.url;
          if(data.userInfo) {
            window.location.href = url;
          } else {
            this.$router.push({ name: "IdentityAuth" });
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
    getActiveSituation(lastTransTime, currentTime) {
      function datedifference(sDate1, sDate2) {
        //2006-12-18格式
        var dateSpan, tempDate, iDays;
        sDate1 = Date.parse(sDate1);
        sDate2 = Date.parse(sDate2);
        dateSpan = sDate2 - sDate1;
        dateSpan = Math.abs(dateSpan);
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
        return iDays;
      }
      let betweenDay = datedifference(lastTransTime, currentTime);
      if (betweenDay < 30) {
        this.profile.percent = 25;
        this.profile.situation = "活跃";
      } else if (betweenDay > 30 && betweenDay < 60) {
        this.profile.percent = 50;
        this.profile.situation = "正常";
      } else if (betweenDay > 60 && betweenDay < 90) {
        this.profile.percent = 75;
        this.profile.situation = "偶尔";
      } else if (betweenDay > 90) {
        this.profile.percent = 100;
        this.profile.situation = "休眠";
      }
    },
    getReportInfo() {
      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      let day = new Date().getDate();
      this.date = year + "." + month + "." + day;
      let postData = {
        reportType: "jd",
        userName: this.utils.getCookie("userName")
      };
      this.common.getCreditReport(postData).then(res => {
        if (res.data.resultCode === "1") {
          let data = JSON.parse(res.data.data);
          this.baiScore = data.basic_info.bai_score;
          this.profile.verified = data.basic_info.is_validate_real_name;
          let billsDetail = data.bills_detail;
          let lastTransTime = moment(billsDetail[0].trans_time).format(
            "YYYY-MM-DD"
          );
          let currentTime = moment(new Date()).format("YYYY-MM-DD");
          this.getActiveSituation(lastTransTime, currentTime);
          let billsSummary = data.bills_summary;
          let thisYearSummary = billsSummary.filter(item => {
            return item.month.slice(0, 4) == new Date().getFullYear();
          });
          let lastYearSummary = billsSummary.filter(item => {
            return item.month.slice(0, 4) == new Date().getFullYear() - 1;
          });
          let thisTotalPrice = _.pluck(thisYearSummary, "total_price");
          let lastTotalPrice = _.pluck(lastYearSummary, "total_price");
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
          this.thisMonthAverage = parseInt(
            this.thisTotalPriceSum / thisYearSummary.length
          );
          this.lastMonthAverage = parseInt(
            this.lastTotalPriceSum / lastYearSummary.length
          );
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
          let serverConsumptionTrend = [];
          for (let j = 0; j < billsSummary.length; j++) {
            let val = {
              detail: parseInt(billsSummary[j].total_price),
              date: billsSummary[j].month
            };
            serverConsumptionTrend.push(val);
          }
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
          this.historyList = historyList.reverse();

          let billsDetailBySort = _.sortBy(
            billsDetail,
            "total_price"
          ).reverse();
          this.billsDetailBySort = billsDetailBySort.splice(0, 3);
          this.billsDetailBySort = [];
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
      this.selected === 1
        ? (this.totalPriceSum = this.lastTotalPriceSum)
        : (this.totalPriceSum = this.thisTotalPriceSum);
      this.selected === 1
        ? (this.monthAverage = this.lastMonthAverage)
        : (this.monthAverage = this.thisMonthAverage);
      this.selected === 1
        ? (this.countSum = this.lastCountSum)
        : (this.countSum = this.thisCountSum);
    },
    shareMethods() {
      window.hicashJSCommunication.onCallApp(
        JSON.stringify({
          type: "h5_share",
          shareTitle: this.title,
          shareContent: "征信报告分享",
          shareUrl: window.location.href,
          shareImageUrl: _this.wxShareIco
        })
      );
    },
    sharePopup() {
      var config = {
        title: this.title,
        desc: "征信报告分享", // 描述, 默认读取head标签：<meta name="description" content="desc" />
        types: ["wx", "qq", "qzone", "sina"], // 开启的分享图标, 默认为全部
        infoMap: {
          wx: {
            title: this.title,
            desc: "征信报告分享",
            link: window.location.href,
            imgUrl: this.wxShareIco
          }
        },
        fnDoShare: function(type) {}
      };
      share.Mshare.popup(config);
    }
  },
  mounted() {
    this.getReportInfo();
  }
};
</script>

<style lang="scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";
.jingdong {
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
    .jingdong-report-wrap {
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
    .consumption-trend,
    .price-wrap,
    .price-wrap-empty {
      margin-top: rem(8px);
      padding: rem(15px) 0 rem(16px) 0;
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
      .price-ranking {
        position: relative;
        width: rem(312px);
        height: rem(117px);
        background: url("./images/bg_price_ranking.png") center center no-repeat;
        background-size: 100% 100%;
        margin: 0 auto;
        margin-top: rem(66px);
        .first {
          position: absolute;
          top: rem(-26px);
          width: rem(90px);
          -webkit-transform: translate(-50%, -50%);
          -moz-transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
          -o-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          left: 50%;
          text-align: center;
          .name {
            font-size: 15px;
            color: #333333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .price {
            font-size: 15px;
            color: #ff7640;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .second {
          position: absolute;
          top: rem(-10px);
          left: rem(10px);
          width: rem(90px);
          text-align: center;
          .name {
            font-size: 15px;
            color: #333333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .price {
            font-size: 15px;
            color: #ff7640;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .third {
          position: absolute;
          right: rem(10px);
          width: rem(90px);
          text-align: center;
          .name {
            font-size: 15px;
            color: #333333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .price {
            font-size: 15px;
            color: #ff7640;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .price-tips {
        margin: 0 rem(15px);
        margin-top: rem(24px);
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
      .empty-desc {
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
}
</style>