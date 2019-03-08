<template>
  <div class="operator">
    <page-header :title="title" :showBack="showBack" :showBtnClose="showBtnClose"></page-header>
    <div class="content">
      <div class="operator-report-wrap">
        <div class="title-wrap">
          <h1>运营商报告</h1>
          <div class="refresh">
            <i class="icon-refresh"></i>
            <p class="date">2019.02.14</p>
          </div>
        </div>
        <div class="score-wrap">
          <div style="width:150px;height:150px;z-index:1">
            <x-circle
              :percent="percent"
              :stroke-width="4"
              :trail-width="4"
              stroke-color="#209EFF"
              anticlockwise
            >
              <span class="score-value">587</span>
              <p class="score-text">信用分</p>
            </x-circle>
            <p class="icon-verified">实名认证</p>
            <!--<p>未实名</p>-->
          </div>
        </div>
        <div class="desc-wrap clearfix">
          <div class="desc-item left">
            <div class="item-name">
              <i class="icon-operator"></i>
              <span>运营商</span>
            </div>
            <p class="item-value">天津移动</p>
          </div>
          <div class="desc-item right">
            <div class="item-name">
              <i class="icon-time"></i>
              <span>使用时长</span>
            </div>
            <p class="item-value">124月</p>
          </div>
        </div>
      </div>
      <div class="contact-friend-circle-wrap">
        <h3>联系朋友圈</h3>
        <f2-pie :charData="charData" :id="'c1'"></f2-pie>
      </div>
      <div class="contacts-wrap" style="display:none">
        <h3>常用联系人</h3>
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(contactsItem, index) in contactsArr" :key="index">
              <div class="contacts-list">
                <ul class="item">
                  <li v-for="(item, index) in contactsItem" :key="index">
                    <span class="key">姓名</span>
                    <span class="value">天天</span>
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
      <div class="contacts-wrap-empty">
        <h3>常用联系人</h3>
        <p class="desc">没有获取到您的记录哦，
          <br>快去更新报告吧！
        </p>
      </div>
      <div class="number-verification-wrap" style="display:none">
        <h3>号码验真</h3>
        <p class="warn-text">
          <span>发现与110相关号码的通话记录</span>
        </p>
        <p class="warn-text">
          <span>发现与贷款类相关号码的通话记录</span>
        </p>
        <div class="report-desc">
          <p class="title">报告说明</p>
          <p class="desc">运营商报告通过手机号的实名验证和通信敏感信息判断，稳定的社交圈将有利于您的运营商评分</p>
        </div>
      </div>
      <div class="number-verification-wrap-empty">
        <h3>号码验真</h3>
        <div class="desc">
          <img src="./images/icon_no_problem.png">
          <p class="tips">未发现特殊相关号码的通话记录</p>
        </div>
      </div>
      <div class="btn" @click="shareMethods" v-if="shareBox">分享给朋友</div>
      <div id="share" @click="sharePopup" class="btn" v-if="!shareBox">分享给朋友</div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import F2Pie from "@/components/F2Pie.vue";
import { XCircle, Scroller, TransferDom } from "vux";
import Swiper from "swiper";
let share = require("@/assets/js/mShare");

export default {
  name: "Operator",
  components: {
    PageHeader,
    F2Pie,
    XCircle,
    Scroller
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      title: "征信报告",
      showBack: true,
      showBtnClose: false,
      percent: 50,
      id: "city",
      charData: [
        {
          assetType: "天津市",
          percent: 0.4,
          a: "1",
          const: "const"
        },
        {
          assetType: "广东省",
          percent: 0.2,
          a: "1",
          const: "const"
        },
        {
          assetType: "河北省",
          percent: 0.18,
          a: "1",
          const: "const"
        },
        {
          assetType: "河南省",
          percent: 0.15,
          a: "1",
          const: "const"
        },
        {
          assetType: "山东省",
          percent: 12.05,
          a: "1",
          const: "const"
        }
      ],
      contactsArr: [],
      shareBox: false
    };
  },
  methods: {
    contactsSwiper() {
      this.contactsArr = [
        {
          key: "姓名",
          value: "天天"
        },
        {
          key: "姓名",
          value: "天天"
        },
        {
          key: "姓名",
          value: "天天"
        },
        {
          key: "姓名",
          value: "天天"
        },
        {
          key: "姓名",
          value: "天天"
        },
        {
          key: "姓名",
          value: "天天"
        },
        {
          key: "姓名",
          value: "天天"
        }
      ];
      this.contactsArr = _.chunk(this.contactsArr, 6);
      console.log("this.contactsArr===", this.contactsArr);
      setTimeout(() => {
        var swiper = new Swiper(".swiper-container", {
          slidesPerView: "auto"
        });
      }, 500);
    },
    shareMethods: function() {
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
    sharePopup: function() {
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
    this.contactsSwiper();
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
          width: rem(150px);
          font-size: 30px;
          font-weight: 400;
        }
        .refresh {
          display: block;
          width: rem(55px);
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
        .score-value {
          font-size: 36px;
          color: #333333;
        }
        .score-text {
          font-size: 15px;
          color: #999999;
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
      margin-top: rem(8px);
      padding: rem(15px) rem(15px) rem(30px) rem(15px);
      background: #fff;
      h3 {
        font-size: 15px;
        font-weight: 400;
      }
      .swiper-slide {
        width: 90% !important;
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
        margin-right: 10px !important;
        .contacts-list {
          width: 100%;
          margin-top: rem(16px);
          background: #f5f5f5;
          border-radius: 8px;
          padding: rem(16px);
          .item {
            width: 100%;
            li {
              width: 46%;
              float: left;
              font-size: 15px;
              margin-right: rem(20px);
              margin-bottom: rem(16px);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              .key {
                color: #999999;
                margin-right: rem(16px);
              }
              &:nth-child(2n) {
                margin-right: 0;
              }
              &:nth-child(5),
              &:nth-child(6) {
                margin-bottom: 0;
              }
            }
          }
        }
      }
      .desc {
        padding: rem(39px) rem(90px) rem(30px) rem(90px);
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
          margin-bottom: rem(8px);
        }
        .desc {
          font-size: 13px;
          color: #999999;
          line-height: rem(20px);
        }
      }
      .desc {
        padding: rem(15px) rem(76px) rem(17px) rem(76px);
        img {
          display: block;
          width: rem(90px);
          height: rem(90px);
          margin: 0 auto;
        }
        .tips {
          margin-top: rem(24px);
          font-size: 15px;
          color: #333333;
          text-align: center;
        }
      }
    }
    .btn {
      width: rem(345px);
      height: rem(44px);
      text-align: center;
      line-height: rem(44px);
      margin: rem(20px) auto;
      background: #ff7640;
      border-radius: 5px;
      font-size: 14px;
      color: #fff;
    }
  }
}
</style>