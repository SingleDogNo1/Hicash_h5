<template>
  <div class="operator">
    <page-header :title="title" :showBack="showBack" :showBtnClose="showBtnClose"></page-header>
    <div class="content">
      <div class="operator-report-wrap">
        <div class="title-wrap">
          <h1>运营商报告</h1>
          <div class="refresh">
            <i class="icon-refresh"></i>
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
        <p class="desc">没有获取到您的记录哦，
          <br>快去更新报告吧！
        </p>
      </div>
      <div
        class="number-verification-wrap"
        v-if="specialNum1 !== '未发现与110电话通话记录' && specialNum2 !== '未找到贷款类相关号码' "
      >
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
      <div class="number-verification-wrap-empty" v-else>
        <h3>号码验真</h3>
        <div class="desc">
          <img src="./images/icon_no_problem.png">
        </div>
        <p class="tips">未发现特殊相关号码的通话记录</p>
      </div>
      <div class="btn" @click="shareMethods" v-if="shareBox">分享给朋友</div>
      <div id="share" @click="sharePopup" class="btn" v-if="!shareBox">分享给朋友</div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import F2Pie from "@/components/F2Pie.vue";
import { XCircle } from "vux";
import Swiper from "swiper";
let share = require("@/assets/js/mShare");
var moment = require("moment");

export default {
  name: "Operator",
  components: {
    PageHeader,
    F2Pie,
    XCircle
  },
  data() {
    return {
      title: "征信报告",
      showBack: true,
      showBtnClose: false,
      date: "",
      profile: {
        creditScore: 0,
        percent: 0,
        verified: true
      },
      dataSource: {
        name: "",
        useTime: ""
      },
      specialNum1: "",
      specialNum2: "",
      id: "city",
      charData: [],
      contactsArr: [],
      shareBox: false
    };
  },
  methods: {
    getReportInfo() {
      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      let day = new Date().getDate();
      this.date = year + "." + month + "." + day;
      this.common.getReport().then(res => {
        res.data = {
          call_data_summary: [
            {
              items: [
                {
                  callee_count: 10,
                  callee_time: 429,
                  caller_count: 26,
                  caller_time: 1455,
                  contact_1m: 2,
                  contact_1w: 1,
                  contact_3m: 10,
                  contact_3m_plus: 23,
                  contact_afternoon: 18,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 10,
                  contact_night: 1,
                  contact_noon: 7,
                  contact_weekday: 36,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "15022646429",
                    owner_name: null
                  },
                  region: "\u5929\u6d25",
                  total_count: 36,
                  total_time: "00:31:24"
                },
                {
                  callee_count: 7,
                  callee_time: 850,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 1,
                  contact_3m_plus: 6,
                  contact_afternoon: 4,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 1,
                  contact_night: 2,
                  contact_noon: 0,
                  contact_weekday: 7,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "13821919232",
                    owner_name: null
                  },
                  region: "\u5929\u6d25",
                  total_count: 7,
                  total_time: "00:14:10"
                },
                {
                  callee_count: 0,
                  callee_time: 0,
                  caller_count: 3,
                  caller_time: 460,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 3,
                  contact_3m_plus: 0,
                  contact_afternoon: 1,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 2,
                  contact_noon: 0,
                  contact_weekday: 3,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "10010",
                    owner_name:
                      "\u4e2d\u56fd\u8054\u901a\u5ba2\u670d\u7535\u8bdd"
                  },
                  region: "\u5168\u56fd",
                  total_count: 3,
                  total_time: "00:07:40"
                },
                {
                  callee_count: 3,
                  callee_time: 309,
                  caller_count: 1,
                  caller_time: 57,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 4,
                  contact_afternoon: 0,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 3,
                  contact_noon: 1,
                  contact_weekday: 4,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "18622231759",
                    owner_name: null
                  },
                  region: "\u5929\u6d25",
                  total_count: 4,
                  total_time: "00:06:06"
                },
                {
                  callee_count: 0,
                  callee_time: 0,
                  caller_count: 4,
                  caller_time: 242,
                  contact_1m: 1,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 3,
                  contact_afternoon: 3,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 2,
                  contact_morning: 0,
                  contact_night: 0,
                  contact_noon: 1,
                  contact_weekday: 2,
                  contact_weekend: 2,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "1008633",
                    owner_name: "\u9a9a\u6270\u7535\u8bdd"
                  },
                  region: "\u5168\u56fd",
                  total_count: 4,
                  total_time: "00:04:02"
                },
                {
                  callee_count: 4,
                  callee_time: 142,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 1,
                  contact_3m_plus: 3,
                  contact_afternoon: 2,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 1,
                  contact_night: 0,
                  contact_noon: 1,
                  contact_weekday: 4,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "02210086",
                    owner_name: "\u5929\u6d25\u5e02\u4e2d\u56fd\u79fb\u52a8"
                  },
                  region: "\u5929\u6d25",
                  total_count: 4,
                  total_time: "00:02:22"
                },
                {
                  callee_count: 2,
                  callee_time: 113,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 2,
                  contact_afternoon: 1,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 0,
                  contact_noon: 1,
                  contact_weekday: 2,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "13821269253",
                    owner_name: null
                  },
                  region: "\u5929\u6d25",
                  total_count: 2,
                  total_time: "00:01:53"
                },
                {
                  callee_count: 0,
                  callee_time: 0,
                  caller_count: 2,
                  caller_time: 63,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 2,
                  contact_afternoon: 0,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 2,
                  contact_noon: 0,
                  contact_weekday: 2,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "15722210939",
                    owner_name: null
                  },
                  region: "\u5929\u6d25",
                  total_count: 2,
                  total_time: "00:01:03"
                },
                {
                  callee_count: 0,
                  callee_time: 0,
                  caller_count: 1,
                  caller_time: 61,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 1,
                  contact_afternoon: 0,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 1,
                  contact_noon: 0,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "15122201963",
                    owner_name: null
                  },
                  region: "\u5929\u6d25",
                  total_count: 1,
                  total_time: "00:01:01"
                },
                {
                  callee_count: 1,
                  callee_time: 55,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 1,
                  contact_afternoon: 0,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 0,
                  contact_noon: 1,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "13174835334",
                    owner_name: null
                  },
                  region: "\u5929\u6d25",
                  total_count: 1,
                  total_time: "00:00:55"
                },
                {
                  callee_count: 1,
                  callee_time: 55,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 1,
                  contact_3m_plus: 0,
                  contact_afternoon: 1,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 0,
                  contact_noon: 0,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "079185138367",
                    owner_name: null
                  },
                  region: "\u6c5f\u897f",
                  total_count: 1,
                  total_time: "00:00:55"
                },
                {
                  callee_count: 2,
                  callee_time: 52,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 2,
                  contact_afternoon: 0,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 0,
                  contact_noon: 2,
                  contact_weekday: 2,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "13502099719",
                    owner_name: null
                  },
                  region: "\u5929\u6d25",
                  total_count: 2,
                  total_time: "00:00:52"
                },
                {
                  callee_count: 1,
                  callee_time: 49,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 1,
                  contact_3m_plus: 0,
                  contact_afternoon: 0,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 1,
                  contact_night: 0,
                  contact_noon: 0,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "02228320061",
                    owner_name: "\u80af\u5fb7\u57fa(\u5357\u697c\u5e97)"
                  },
                  region: "\u5929\u6d25",
                  total_count: 1,
                  total_time: "00:00:49"
                },
                {
                  callee_count: 0,
                  callee_time: 0,
                  caller_count: 1,
                  caller_time: 45,
                  contact_1m: 0,
                  contact_1w: 1,
                  contact_3m: 0,
                  contact_3m_plus: 0,
                  contact_afternoon: 1,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 0,
                  contact_noon: 0,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "13662123660",
                    owner_name: "\u6ee1\u6ee1\u9999\u706b\u9505\u9e21"
                  },
                  region: "\u5929\u6d25",
                  total_count: 1,
                  total_time: "00:00:45"
                },
                {
                  callee_count: 1,
                  callee_time: 44,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 1,
                  contact_afternoon: 0,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 1,
                  contact_noon: 0,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "18920264281",
                    owner_name: null
                  },
                  region: "\u5929\u6d25",
                  total_count: 1,
                  total_time: "00:00:44"
                },
                {
                  callee_count: 0,
                  callee_time: 0,
                  caller_count: 1,
                  caller_time: 43,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 1,
                  contact_afternoon: 0,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 1,
                  contact_noon: 0,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "15010306758",
                    owner_name: null
                  },
                  region: "\u5317\u4eac",
                  total_count: 1,
                  total_time: "00:00:43"
                },
                {
                  callee_count: 5,
                  callee_time: 34,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 2,
                  contact_3m_plus: 3,
                  contact_afternoon: 3,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 1,
                  contact_night: 0,
                  contact_noon: 1,
                  contact_weekday: 5,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "95030",
                    owner_name: "\u5e7f\u544a\u63a8\u9500"
                  },
                  region: "\u5168\u56fd",
                  total_count: 5,
                  total_time: "00:00:34"
                },
                {
                  callee_count: 1,
                  callee_time: 25,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 1,
                  contact_3m_plus: 0,
                  contact_afternoon: 1,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 0,
                  contact_noon: 0,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "02258820313",
                    owner_name: null
                  },
                  region: "\u5929\u6d25",
                  total_count: 1,
                  total_time: "00:00:25"
                },
                {
                  callee_count: 1,
                  callee_time: 21,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 1,
                  contact_afternoon: 0,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 1,
                  contact_noon: 0,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "13920891324",
                    owner_name: null
                  },
                  region: "\u5929\u6d25",
                  total_count: 1,
                  total_time: "00:00:21"
                },
                {
                  callee_count: 0,
                  callee_time: 0,
                  caller_count: 2,
                  caller_time: 19,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 1,
                  contact_3m_plus: 1,
                  contact_afternoon: 1,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 1,
                  contact_morning: 0,
                  contact_night: 1,
                  contact_noon: 0,
                  contact_weekday: 1,
                  contact_weekend: 1,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "1008611",
                    owner_name:
                      "\u4e2d\u56fd\u79fb\u52a8\u8bdd\u8d39\u67e5\u8be2\u670d\u52a1\u7535\u8bdd"
                  },
                  region: "\u5168\u56fd",
                  total_count: 2,
                  total_time: "00:00:19"
                },
                {
                  callee_count: 1,
                  callee_time: 18,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 1,
                  contact_afternoon: 1,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 0,
                  contact_noon: 0,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "07538165566",
                    owner_name: "\u54cd\u4e00\u58f0"
                  },
                  region: "\u5e7f\u4e1c",
                  total_count: 1,
                  total_time: "00:00:18"
                },
                {
                  callee_count: 1,
                  callee_time: 18,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 1,
                  contact_afternoon: 0,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 1,
                  contact_night: 0,
                  contact_noon: 0,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "15722234940",
                    owner_name: "\u5e7f\u544a\u63a8\u9500"
                  },
                  region: "\u5929\u6d25",
                  total_count: 1,
                  total_time: "00:00:18"
                },
                {
                  callee_count: 1,
                  callee_time: 17,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 1,
                  contact_afternoon: 1,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 0,
                  contact_noon: 0,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "18920354941",
                    owner_name: "\u5e7f\u544a\u63a8\u9500"
                  },
                  region: "\u5929\u6d25",
                  total_count: 1,
                  total_time: "00:00:17"
                },
                {
                  callee_count: 1,
                  callee_time: 16,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 1,
                  contact_afternoon: 0,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 1,
                  contact_morning: 0,
                  contact_night: 1,
                  contact_noon: 0,
                  contact_weekday: 0,
                  contact_weekend: 1,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "18522204923",
                    owner_name: "\u51fa\u79df\u8f66"
                  },
                  region: "\u5929\u6d25",
                  total_count: 1,
                  total_time: "00:00:16"
                },
                {
                  callee_count: 1,
                  callee_time: 16,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 1,
                  contact_afternoon: 0,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 1,
                  contact_night: 0,
                  contact_noon: 0,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "95510",
                    owner_name: "\u9633\u5149\u4fdd\u9669"
                  },
                  region: "\u5168\u56fd",
                  total_count: 1,
                  total_time: "00:00:16"
                },
                {
                  callee_count: 1,
                  callee_time: 14,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 1,
                  contact_afternoon: 0,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 1,
                  contact_noon: 0,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "07716407326",
                    owner_name: "\u7591\u4f3c\u6b3a\u8bc8"
                  },
                  region: "\u5e7f\u897f",
                  total_count: 1,
                  total_time: "00:00:14"
                },
                {
                  callee_count: 1,
                  callee_time: 12,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 1,
                  contact_afternoon: 1,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 1,
                  contact_morning: 0,
                  contact_night: 0,
                  contact_noon: 0,
                  contact_weekday: 0,
                  contact_weekend: 1,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "07538167451",
                    owner_name: "\u5e7f\u544a\u63a8\u9500"
                  },
                  region: "\u5e7f\u4e1c",
                  total_count: 1,
                  total_time: "00:00:12"
                },
                {
                  callee_count: 1,
                  callee_time: 12,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 1,
                  contact_afternoon: 1,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 0,
                  contact_noon: 0,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "089831292117",
                    owner_name: "\u7591\u4f3c\u6b3a\u8bc8"
                  },
                  region: "\u6d77\u5357",
                  total_count: 1,
                  total_time: "00:00:12"
                },
                {
                  callee_count: 1,
                  callee_time: 11,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 1,
                  contact_3m_plus: 0,
                  contact_afternoon: 1,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 0,
                  contact_noon: 0,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "15712252103",
                    owner_name: "\u9a9a\u6270\u7535\u8bdd"
                  },
                  region: "\u5929\u6d25",
                  total_count: 1,
                  total_time: "00:00:11"
                },
                {
                  callee_count: 1,
                  callee_time: 10,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 1,
                  contact_afternoon: 1,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 0,
                  contact_noon: 0,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "017694842956",
                    owner_name: null
                  },
                  region: "\u5168\u56fd",
                  total_count: 1,
                  total_time: "00:00:10"
                },
                {
                  callee_count: 1,
                  callee_time: 10,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 1,
                  contact_3m_plus: 0,
                  contact_afternoon: 0,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 0,
                  contact_noon: 1,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "02295202495",
                    owner_name: "\u63a8\u9500"
                  },
                  region: "\u5929\u6d25",
                  total_count: 1,
                  total_time: "00:00:10"
                },
                {
                  callee_count: 1,
                  callee_time: 8,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 1,
                  contact_afternoon: 0,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 1,
                  contact_night: 0,
                  contact_noon: 0,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "02295235666",
                    owner_name: "\u63a8\u9500"
                  },
                  region: "\u5929\u6d25",
                  total_count: 1,
                  total_time: "00:00:08"
                },
                {
                  callee_count: 1,
                  callee_time: 8,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 1,
                  contact_afternoon: 0,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 0,
                  contact_noon: 1,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "02295235624",
                    owner_name: "\u63a8\u9500"
                  },
                  region: "\u5929\u6d25",
                  total_count: 1,
                  total_time: "00:00:08"
                },
                {
                  callee_count: 1,
                  callee_time: 8,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 1,
                  contact_afternoon: 0,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 1,
                  contact_night: 0,
                  contact_noon: 0,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "02295223406",
                    owner_name: "\u63a8\u9500"
                  },
                  region: "\u5929\u6d25",
                  total_count: 1,
                  total_time: "00:00:08"
                },
                {
                  callee_count: 1,
                  callee_time: 7,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 1,
                  contact_3m_plus: 0,
                  contact_afternoon: 1,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 0,
                  contact_noon: 0,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "02295225644",
                    owner_name: "\u5e7f\u544a\u63a8\u9500"
                  },
                  region: "\u5929\u6d25",
                  total_count: 1,
                  total_time: "00:00:07"
                },
                {
                  callee_count: 1,
                  callee_time: 7,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 1,
                  contact_3m_plus: 0,
                  contact_afternoon: 0,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 0,
                  contact_noon: 1,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "02295223263",
                    owner_name: "\u63a8\u9500"
                  },
                  region: "\u5929\u6d25",
                  total_count: 1,
                  total_time: "00:00:07"
                },
                {
                  callee_count: 1,
                  callee_time: 7,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 1,
                  contact_afternoon: 1,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 0,
                  contact_noon: 0,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "02295235605",
                    owner_name: "\u63a8\u9500"
                  },
                  region: "\u5929\u6d25",
                  total_count: 1,
                  total_time: "00:00:07"
                },
                {
                  callee_count: 1,
                  callee_time: 7,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 1,
                  contact_afternoon: 1,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 0,
                  contact_noon: 0,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "02295774436",
                    owner_name: "\u5e7f\u544a\u63a8\u9500"
                  },
                  region: "\u5929\u6d25",
                  total_count: 1,
                  total_time: "00:00:07"
                },
                {
                  callee_count: 1,
                  callee_time: 6,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 1,
                  contact_afternoon: 1,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 0,
                  contact_noon: 0,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "02295235332",
                    owner_name: "\u63a8\u9500"
                  },
                  region: "\u5929\u6d25",
                  total_count: 1,
                  total_time: "00:00:06"
                },
                {
                  callee_count: 1,
                  callee_time: 5,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 1,
                  contact_afternoon: 1,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 0,
                  contact_noon: 0,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "18952970870",
                    owner_name: "\u9a9a\u6270\u7535\u8bdd"
                  },
                  region: "\u6c5f\u82cf",
                  total_count: 1,
                  total_time: "00:00:05"
                },
                {
                  callee_count: 1,
                  callee_time: 5,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 1,
                  contact_afternoon: 1,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 0,
                  contact_noon: 0,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "051380983295",
                    owner_name: "\u7591\u4f3c\u6b3a\u8bc8"
                  },
                  region: "\u6c5f\u82cf",
                  total_count: 1,
                  total_time: "00:00:05"
                },
                {
                  callee_count: 1,
                  callee_time: 5,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 1,
                  contact_afternoon: 0,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 1,
                  contact_night: 0,
                  contact_noon: 0,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "95075374",
                    owner_name: "\u5e7f\u544a\u63a8\u9500"
                  },
                  region: "\u5168\u56fd",
                  total_count: 1,
                  total_time: "00:00:05"
                },
                {
                  callee_count: 1,
                  callee_time: 5,
                  caller_count: 0,
                  caller_time: 0,
                  contact_1m: 0,
                  contact_1w: 0,
                  contact_3m: 0,
                  contact_3m_plus: 1,
                  contact_afternoon: 1,
                  contact_all_day: false,
                  contact_early_morning: 0,
                  contact_holiday: 0,
                  contact_morning: 0,
                  contact_night: 0,
                  contact_noon: 0,
                  contact_weekday: 1,
                  contact_weekend: 0,
                  peer_mobile: {
                    internet_id: {
                      name: null
                    },
                    mobile: "13593196739",
                    owner_name: "\u7591\u4f3c\u6b3a\u8bc8"
                  },
                  region: "\u5c71\u897f",
                  total_count: 1,
                  total_time: "00:00:05"
                }
              ],
              title: "\u901a\u8bdd\u6570\u636e\u5206\u6790"
            },
            {
              items: [
                {
                  callee_count: 10,
                  callee_time: 429,
                  caller_count: 26,
                  caller_time: 1455,
                  earliest_time: "2018-09-05 18:43:58",
                  latest_time: "2019-03-09 10:10:38",
                  peer_mobile: {
                    in_black: {
                      arised: false
                    },
                    internet_id: {
                      name: null
                    },
                    mobile: "15022646429",
                    owner_name: null
                  },
                  region: "\u5929\u6d25",
                  total_count: 36,
                  total_time: "00:31:24"
                },
                {
                  callee_count: 7,
                  callee_time: 850,
                  caller_count: 0,
                  caller_time: 0,
                  earliest_time: "2018-09-21 19:36:26",
                  latest_time: "2019-01-03 09:47:27",
                  peer_mobile: {
                    in_black: {
                      arised: false
                    },
                    internet_id: {
                      name: null
                    },
                    mobile: "13821919232",
                    owner_name: null
                  },
                  region: "\u5929\u6d25",
                  total_count: 7,
                  total_time: "00:14:10"
                },
                {
                  callee_count: 5,
                  callee_time: 34,
                  caller_count: 0,
                  caller_time: 0,
                  earliest_time: "2018-09-20 14:15:11",
                  latest_time: "2018-12-25 14:42:54",
                  peer_mobile: {
                    in_black: {
                      arised: false
                    },
                    internet_id: {
                      name: null
                    },
                    mobile: "95030",
                    owner_name: "\u5e7f\u544a\u63a8\u9500"
                  },
                  region: "\u5168\u56fd",
                  total_count: 5,
                  total_time: "00:00:34"
                },
                {
                  callee_count: 4,
                  callee_time: 142,
                  caller_count: 0,
                  caller_time: 0,
                  earliest_time: "2018-11-26 09:27:37",
                  latest_time: "2018-12-21 11:47:12",
                  peer_mobile: {
                    in_black: {
                      arised: false
                    },
                    internet_id: {
                      name: null
                    },
                    mobile: "02210086",
                    owner_name: "\u5929\u6d25\u5e02\u4e2d\u56fd\u79fb\u52a8"
                  },
                  region: "\u5929\u6d25",
                  total_count: 4,
                  total_time: "00:02:22"
                },
                {
                  callee_count: 0,
                  callee_time: 0,
                  caller_count: 4,
                  caller_time: 242,
                  earliest_time: "2018-09-09 15:06:05",
                  latest_time: "2019-03-02 11:48:39",
                  peer_mobile: {
                    in_black: {
                      arised: false
                    },
                    internet_id: {
                      name: null
                    },
                    mobile: "1008633",
                    owner_name: "\u9a9a\u6270\u7535\u8bdd"
                  },
                  region: "\u5168\u56fd",
                  total_count: 4,
                  total_time: "00:04:02"
                },
                {
                  callee_count: 3,
                  callee_time: 309,
                  caller_count: 1,
                  caller_time: 57,
                  earliest_time: "2018-09-22 12:45:14",
                  latest_time: "2018-11-16 19:44:05",
                  peer_mobile: {
                    in_black: {
                      arised: false
                    },
                    internet_id: {
                      name: null
                    },
                    mobile: "18622231759",
                    owner_name: null
                  },
                  region: "\u5929\u6d25",
                  total_count: 4,
                  total_time: "00:06:06"
                },
                {
                  callee_count: 0,
                  callee_time: 0,
                  caller_count: 3,
                  caller_time: 460,
                  earliest_time: "2019-02-05 18:35:09",
                  latest_time: "2019-02-05 19:27:47",
                  peer_mobile: {
                    in_black: {
                      arised: false
                    },
                    internet_id: {
                      name: null
                    },
                    mobile: "10010",
                    owner_name:
                      "\u4e2d\u56fd\u8054\u901a\u5ba2\u670d\u7535\u8bdd"
                  },
                  region: "\u5168\u56fd",
                  total_count: 3,
                  total_time: "00:07:40"
                },
                {
                  callee_count: 0,
                  callee_time: 0,
                  caller_count: 2,
                  caller_time: 19,
                  earliest_time: "2018-09-29 21:37:39",
                  latest_time: "2019-01-13 17:39:12",
                  peer_mobile: {
                    in_black: {
                      arised: false
                    },
                    internet_id: {
                      name: null
                    },
                    mobile: "1008611",
                    owner_name:
                      "\u4e2d\u56fd\u79fb\u52a8\u8bdd\u8d39\u67e5\u8be2\u670d\u52a1\u7535\u8bdd"
                  },
                  region: "\u5168\u56fd",
                  total_count: 2,
                  total_time: "00:00:19"
                },
                {
                  callee_count: 2,
                  callee_time: 52,
                  caller_count: 0,
                  caller_time: 0,
                  earliest_time: "2018-12-14 11:14:21",
                  latest_time: "2018-12-14 11:15:13",
                  peer_mobile: {
                    in_black: {
                      arised: false
                    },
                    internet_id: {
                      name: null
                    },
                    mobile: "13502099719",
                    owner_name: null
                  },
                  region: "\u5929\u6d25",
                  total_count: 2,
                  total_time: "00:00:52"
                },
                {
                  callee_count: 2,
                  callee_time: 113,
                  caller_count: 0,
                  caller_time: 0,
                  earliest_time: "2018-10-04 11:39:03",
                  latest_time: "2018-10-13 15:15:03",
                  peer_mobile: {
                    in_black: {
                      arised: false
                    },
                    internet_id: {
                      name: null
                    },
                    mobile: "13821269253",
                    owner_name: null
                  },
                  region: "\u5929\u6d25",
                  total_count: 2,
                  total_time: "00:01:53"
                }
              ],
              title: "\u5e38\u7528\u8054\u7cfb\u4eba"
            }
          ],
          contacts_and_addresses: [
            {
              items: [],
              title: "\u8054\u7cfb\u4eba\u6570\u636e"
            }
          ],
          contacts_region_summary: [
            {
              avg_callee_time: "00:00:48",
              avg_caller_time: "00:00:54",
              callee_count: 46,
              callee_count_pct: 0.7419354838709677,
              callee_time: "00:36:59",
              callee_time_pct: 0.9207468879668049,
              caller_count: 31,
              caller_count_pct: 0.7560975609756098,
              caller_time: "00:28:01",
              caller_time_pct: 0.6875255623721881,
              mobile_count: 27,
              region: "\u5929\u6d25"
            },
            {
              avg_callee_time: "00:00:08",
              avg_caller_time: "00:01:20",
              callee_count: 8,
              callee_count_pct: 0.12903225806451613,
              callee_time: "00:01:05",
              callee_time_pct: 0.026970954356846474,
              caller_count: 9,
              caller_count_pct: 0.21951219512195122,
              caller_time: "00:12:01",
              caller_time_pct: 0.2948875255623722,
              mobile_count: 7,
              region: "\u5168\u56fd"
            },
            {
              avg_callee_time: "00:00:15",
              avg_caller_time: "00:00:00",
              callee_count: 2,
              callee_count_pct: 0.03225806451612903,
              callee_time: "00:00:30",
              callee_time_pct: 0.012448132780082987,
              caller_count: 0,
              caller_count_pct: 0.0,
              caller_time: "00:00:00",
              caller_time_pct: 0.0,
              mobile_count: 2,
              region: "\u5e7f\u4e1c"
            },
            {
              avg_callee_time: "00:00:05",
              avg_caller_time: "00:00:00",
              callee_count: 2,
              callee_count_pct: 0.03225806451612903,
              callee_time: "00:00:10",
              callee_time_pct: 0.004149377593360996,
              caller_count: 0,
              caller_count_pct: 0.0,
              caller_time: "00:00:00",
              caller_time_pct: 0.0,
              mobile_count: 2,
              region: "\u6c5f\u82cf"
            },
            {
              avg_callee_time: "00:00:00",
              avg_caller_time: "00:00:43",
              callee_count: 0,
              callee_count_pct: 0.0,
              callee_time: "00:00:00",
              callee_time_pct: 0.0,
              caller_count: 1,
              caller_count_pct: 0.024390243902439025,
              caller_time: "00:00:43",
              caller_time_pct: 0.017586912065439674,
              mobile_count: 1,
              region: "\u5317\u4eac"
            },
            {
              avg_callee_time: "00:00:05",
              avg_caller_time: "00:00:00",
              callee_count: 1,
              callee_count_pct: 0.016129032258064516,
              callee_time: "00:00:05",
              callee_time_pct: 0.002074688796680498,
              caller_count: 0,
              caller_count_pct: 0.0,
              caller_time: "00:00:00",
              caller_time_pct: 0.0,
              mobile_count: 1,
              region: "\u5c71\u897f"
            },
            {
              avg_callee_time: "00:00:14",
              avg_caller_time: "00:00:00",
              callee_count: 1,
              callee_count_pct: 0.016129032258064516,
              callee_time: "00:00:14",
              callee_time_pct: 0.005809128630705394,
              caller_count: 0,
              caller_count_pct: 0.0,
              caller_time: "00:00:00",
              caller_time_pct: 0.0,
              mobile_count: 1,
              region: "\u5e7f\u897f"
            },
            {
              avg_callee_time: "00:00:55",
              avg_caller_time: "00:00:00",
              callee_count: 1,
              callee_count_pct: 0.016129032258064516,
              callee_time: "00:00:55",
              callee_time_pct: 0.022821576763485476,
              caller_count: 0,
              caller_count_pct: 0.0,
              caller_time: "00:00:00",
              caller_time_pct: 0.0,
              mobile_count: 1,
              region: "\u6c5f\u897f"
            },
            {
              avg_callee_time: "00:00:12",
              avg_caller_time: "00:00:00",
              callee_count: 1,
              callee_count_pct: 0.016129032258064516,
              callee_time: "00:00:12",
              callee_time_pct: 0.004979253112033195,
              caller_count: 0,
              caller_count_pct: 0.0,
              caller_time: "00:00:00",
              caller_time_pct: 0.0,
              mobile_count: 1,
              region: "\u6d77\u5357"
            }
          ],
          data_source: {
            is_real_name_verified: 1,
            mobile: "15902270724",
            name: "\u5929\u6d25\u79fb\u52a8",
            net_in_time: "2010-06-15 12:03:55",
            type: "\u8fd0\u8425\u5546"
          },
          direct_contacts: 18,
          fee_summary: [
            {
              avg_callee_time: "00:00:08",
              avg_caller_time: "00:00:33",
              call_count: 3,
              callee_count: 1,
              callee_time: "00:00:26",
              caller_count: 2,
              caller_time: "00:01:39",
              fee: 15.0,
              mobile: "15902270724",
              month: "201903",
              net_flow: 0.0,
              operator: "\u5929\u6d25\u79fb\u52a8",
              operator_en: "",
              region: "\u5929\u6d25",
              sms_count: 0
            },
            {
              avg_callee_time: "00:00:06",
              avg_caller_time: "00:01:11",
              call_count: 11,
              callee_count: 2,
              callee_time: "00:01:11",
              caller_count: 9,
              caller_time: "00:13:04",
              fee: 28.0,
              mobile: "15902270724",
              month: "201902",
              net_flow: 0.0,
              operator: "\u5929\u6d25\u79fb\u52a8",
              operator_en: "",
              region: "\u5929\u6d25",
              sms_count: 0
            },
            {
              avg_callee_time: "00:00:22",
              avg_caller_time: "00:00:46",
              call_count: 7,
              callee_count: 3,
              callee_time: "00:02:38",
              caller_count: 4,
              caller_time: "00:05:25",
              fee: 28.0,
              mobile: "15902270724",
              month: "201901",
              net_flow: 0.0,
              operator: "\u5929\u6d25\u79fb\u52a8",
              operator_en: "",
              region: "\u5929\u6d25",
              sms_count: 0
            },
            {
              avg_callee_time: "00:00:29",
              avg_caller_time: "00:00:08",
              call_count: 25,
              callee_count: 20,
              callee_time: "00:12:15",
              caller_count: 5,
              caller_time: "00:03:44",
              fee: 28.1,
              mobile: "15902270724",
              month: "201812",
              net_flow: 0.0,
              operator: "\u5929\u6d25\u79fb\u52a8",
              operator_en: "",
              region: "\u5929\u6d25",
              sms_count: 1
            },
            {
              avg_callee_time: "00:00:11",
              avg_caller_time: "00:00:18",
              call_count: 26,
              callee_count: 15,
              callee_time: "00:04:48",
              caller_count: 11,
              caller_time: "00:08:07",
              fee: 28.1,
              mobile: "15902270724",
              month: "201811",
              net_flow: 0.0,
              operator: "\u5929\u6d25\u79fb\u52a8",
              operator_en: "",
              region: "\u5929\u6d25",
              sms_count: 1
            },
            {
              avg_callee_time: "00:00:38",
              avg_caller_time: "00:00:23",
              call_count: 12,
              callee_count: 8,
              callee_time: "00:07:42",
              caller_count: 4,
              caller_time: "00:04:38",
              fee: 28.0,
              mobile: "15902270724",
              month: "201810",
              net_flow: 0.0,
              operator: "\u5929\u6d25\u79fb\u52a8",
              operator_en: "",
              region: "\u5929\u6d25",
              sms_count: 1
            },
            {
              avg_callee_time: "00:00:35",
              avg_caller_time: "00:00:13",
              call_count: 19,
              callee_count: 13,
              callee_time: "00:11:10",
              caller_count: 6,
              caller_time: "00:04:08",
              fee: 34.38,
              mobile: "15902270724",
              month: "201809",
              net_flow: 0.0,
              operator: "\u5929\u6d25\u79fb\u52a8",
              operator_en: "",
              region: "\u5929\u6d25",
              sms_count: 2
            }
          ],
          info_verification: [
            {
              items: [
                {
                  check_point: "check_idcard_validation",
                  name:
                    "\u8eab\u4efd\u8bc1\u53f7\u7801\u662f\u5426\u6709\u6548",
                  remarks:
                    "\u901a\u8fc7\u56fd\u9645\u8eab\u4efd\u8bc1\u7b97\u6cd5",
                  result: "\u662f"
                },
                {
                  check_point: "reliability",
                  name:
                    "\u624b\u673a\u53f7\u7801\u662f\u5426\u672c\u4eba\u5b9e\u540d\u8ba4\u8bc1",
                  remarks:
                    "\u901a\u8fc7\u8fd0\u8425\u5546\u5b9e\u540d\u8ba4\u8bc1\uff0c\u8fd0\u8425\u5546\u767b\u8bb0\u59d3\u540d\uff1a*\u54f2",
                  result: "\u662f"
                },
                {
                  check_point: "check_name",
                  name:
                    "\u8fd0\u8425\u5546\u767b\u8bb0\u4eba\u59d3\u540d\u662f\u5426\u5339\u914d",
                  remarks:
                    "\u7528\u6237\u59d3\u540d\u4e0e\u8fd0\u8425\u5546\u63d0\u4f9b\u7684\u59d3\u540d[*\u54f2]\u5339\u914d\u6210\u529f",
                  result: "\u662f"
                },
                {
                  check_point: "check_idcard",
                  name:
                    "\u8fd0\u8425\u5546\u767b\u8bb0\u4eba\u8eab\u4efd\u8bc1\u662f\u5426\u5339\u914d",
                  remarks:
                    "\u8fd0\u8425\u5546\u672a\u63d0\u4f9b\u8eab\u4efd\u8bc1\u53f7\u7801",
                  result: "\u5426"
                },
                {
                  check_point: "check_phone_financial_blacklist",
                  name:
                    "\u7533\u8bf7\u4eba\u624b\u673a\u53f7\u662f\u5426\u51fa\u73b0\u5728\u91d1\u878d\u670d\u52a1\u7c7b\u673a\u6784\u9ed1\u540d\u5355\u4e0a",
                  remarks:
                    "\u63d0\u4f9b\u7684\u624b\u673a\u53f7[15902270724]\u672a\u51fa\u73b0\u5728\u91d1\u878d\u670d\u52a1\u7c7b\u673a\u6784\u9ed1\u540d\u5355\u4e0a",
                  result: "\u5426"
                },
                {
                  check_point: "check_idcard_financial_blacklist",
                  name:
                    "\u7533\u8bf7\u4eba\u8eab\u4efd\u8bc1\u53f7\u662f\u5426\u51fa\u73b0\u5728\u91d1\u878d\u670d\u52a1\u7c7b\u673a\u6784\u9ed1\u540d\u5355\u4e0a",
                  remarks:
                    "\u63d0\u4f9b\u7684\u8eab\u4efd\u8bc1\u53f7\u7801[120103199112061418]\u672a\u51fa\u73b0\u5728\u91d1\u878d\u670d\u52a1\u7c7b\u673a\u6784\u9ed1\u540d\u5355\u4e0a",
                  result: "\u5426"
                },
                {
                  check_point: "check_idcard_court_blacklist",
                  name:
                    "\u7533\u8bf7\u4eba\u8eab\u4efd\u8bc1\u53f7\u662f\u5426\u51fa\u73b0\u5728\u6cd5\u9662\u9ed1\u540d\u5355\u4e0a",
                  remarks:
                    "\u63d0\u4f9b\u7684\u8eab\u4efd\u8bc1\u53f7\u7801[120103199112061418]\u672a\u51fa\u73b0\u5728\u6cd5\u9662\u9ed1\u540d\u5355\u4e0a",
                  result: "\u5426"
                }
              ],
              title: "\u7533\u62a5\u4fe1\u606f\u6838\u5bf9",
              title_en: "application_check"
            },
            {
              items: [
                {
                  check_point: "regular_circle",
                  name: "\u670b\u53cb\u5708\u5728\u54ea\u91cc",
                  remarks:
                    "\u5929\u6d25\u5730\u533a\u901a\u8bdd\u65f6\u95f4\u5360\u6bd4\u4e3a80.33%",
                  result:
                    "\u670b\u53cb\u5708\u4e3b\u8981\u6d3b\u8dc3\u5728\u5929\u6d25\u5730\u533a",
                  score: 1
                },
                {
                  check_point: "phone_used_time",
                  name: "\u53f7\u7801\u4f7f\u7528\u65f6\u95f4",
                  remarks:
                    "\u6839\u636e\u53f7\u7801[15902270724]\u8fd0\u8425\u5546\u63d0\u4f9b\u7684\u8ba4\u8bc1\u65f6\u95f4\uff0c\u63a8\u7b97\u8be5\u53f7\u7801\u4f7f\u7528106.5\u4e2a\u6708",
                  result:
                    "\u957f\u671f\u4f7f\u7528\uff0824\u4e2a\u6708\u4ee5\u4e0a\uff0c\u5305\u542b24\uff09",
                  score: 1
                },
                {
                  check_point: "phone_silent",
                  name: "\u624b\u673a\u9759\u9ed8\u60c5\u51b5",
                  remarks:
                    "\u6839\u636e\u8fd0\u8425\u5546\u901a\u8bdd\u8be6\u60c5\u6570\u636e\uff0c\u8fde\u7eed\u4e09\u5929\u4ee5\u4e0a\u65e0\u901a\u8bdd\u8bb0\u5f5518\u6b21\uff1a2019-03-09 10:10:38 - 2019-03-13 18:56:58\uff0c4\u5929\uff1b2019-03-02 11:48:39 - 2019-03-09 10:10:38\uff0c6\u5929\uff1b2019-02-25 18:24:35 - 2019-03-02 11:48:39\uff0c4\u5929\uff1b2019-02-12 09:32:18 - 2019-02-25 18:05:46\uff0c13\u5929\uff1b2019-02-01 16:13:10 - 2019-02-05 18:35:09\uff0c4\u5929\uff1b2019-01-22 09:10:20 - 2019-02-01 16:13:10\uff0c10\u5929\uff1b2019-01-13 17:39:12 - 2019-01-21 11:14:40\uff0c7\u5929\uff1b2019-01-07 15:38:42 - 2019-01-13 17:39:12\uff0c6\u5929\uff1b2019-01-03 09:47:27 - 2019-01-07 15:38:42\uff0c4\u5929\uff1b2018-12-26 15:36:11 - 2019-01-03 09:47:27\uff0c7\u5929\uff1b2018-12-14 16:54:23 - 2018-12-19 17:23:43\uff0c5\u5929\uff1b2018-12-09 14:57:46 - 2018-12-13 19:22:02\uff0c4\u5929\uff1b2018-12-01 18:13:52 - 2018-12-06 16:43:57\uff0c4\u5929\uff1b2018-11-02 12:10:45 - 2018-11-06 18:33:44\uff0c4\u5929\uff1b2018-10-24 15:47:26 - 2018-10-29 15:36:25\uff0c4\u5929\uff1b2018-10-13 15:15:03 - 2018-10-17 19:21:08\uff0c4\u5929\uff1b2018-10-04 11:39:03 - 2018-10-13 15:15:03\uff0c9\u5929\uff1b2018-09-12 19:13:24 - 2018-09-17 10:56:59\uff0c4\u5929",
                  result:
                    "165\u5929\u5185\u6709139\u5929\u65e0\u901a\u8bdd\u8bb0\u5f55",
                  score: 2
                },
                {
                  check_point: "contact_each_other",
                  name:
                    "\u4e92\u901a\u8fc7\u7535\u8bdd\u7684\u53f7\u7801\u6570\u91cf",
                  remarks:
                    "\u4e92\u901a\u8fc7\u7535\u8bdd\u7684\u53f7\u7801\u67092\u4e2a\uff0c\u6bd4\u4f8b\u4e3a4.65%",
                  result:
                    "\u6570\u91cf\u7a00\u5c11\uff0810\u4ee5\u5185\uff0c\u4e0d\u542b10\uff09",
                  score: 2
                },
                {
                  check_point: "contact_macao",
                  name: "\u6fb3\u95e8\u7535\u8bdd\u901a\u8bdd\u60c5\u51b5",
                  remarks:
                    "\u672a\u53d1\u73b0\u6fb3\u95e8\u5730\u533a\u7535\u8bdd\u901a\u8bdd\u8bb0\u5f55",
                  result: "\u65e0\u901a\u8bdd\u8bb0\u5f55",
                  score: 1
                },
                {
                  check_point: "contact_110",
                  name: "110\u8bdd\u901a\u8bdd\u60c5\u51b5",
                  remarks:
                    "\u672a\u53d1\u73b0\u4e0e110\u7535\u8bdd\u901a\u8bdd\u8bb0\u5f55",
                  result: "\u65e0\u901a\u8bdd\u8bb0\u5f55",
                  score: 1
                },
                {
                  check_point: "contact_120",
                  name: "120\u8bdd\u901a\u8bdd\u60c5\u51b5",
                  remarks:
                    "\u672a\u53d1\u73b0\u4e0e120\u7535\u8bdd\u901a\u8bdd\u8bb0\u5f55",
                  result: "\u65e0\u901a\u8bdd\u8bb0\u5f55",
                  score: 1
                },
                {
                  check_point: "contact_lawyer",
                  name:
                    "\u662f\u5426\u547c\u53eb\u8fc7\u5f8b\u5e08\u76f8\u5173\u53f7\u7801",
                  remarks:
                    "\u672a\u53d1\u73b0\u4e0e\u5f8b\u5e08\u7535\u8bdd\u901a\u8bdd\u8bb0\u5f55",
                  result: "\u65e0\u901a\u8bdd\u8bb0\u5f55",
                  score: 1
                },
                {
                  check_point: "contact_court",
                  name:
                    "\u662f\u5426\u547c\u53eb\u8fc7\u6cd5\u9662\u76f8\u5173\u53f7\u7801",
                  remarks:
                    "\u672a\u53d1\u73b0\u4e0e\u6cd5\u9662\u7535\u8bdd\u901a\u8bdd\u8bb0\u5f55",
                  result: "\u65e0\u901a\u8bdd\u8bb0\u5f55",
                  score: 1
                },
                {
                  check_point: "contact_night",
                  name:
                    "\u591c\u95f4\u6d3b\u52a8\u60c5\u51b5(23\u70b9-6\u70b9)",
                  remarks:
                    "\u665a\u95f4\u6d3b\u8dc3\u9891\u7387\u5360\u5168\u5929\u76840.00%",
                  result:
                    "\u5f88\u5c11\u591c\u95f4\u6d3b\u52a8\uff08\u591c\u95f4\u901a\u8bdd\u6bd4\u4f8b\u4f4e\u4e8e20%\uff09",
                  score: 1
                },
                {
                  check_point: "contact_loan",
                  name:
                    "\u8d37\u6b3e\u7c7b\u53f7\u7801\u8054\u7cfb\u60c5\u51b5",
                  remarks:
                    "\u672a\u627e\u5230\u8d37\u6b3e\u7c7b\u76f8\u5173\u53f7\u7801",
                  result: "\u65e0\u6b64\u7c7b\u53f7\u7801\u8bb0\u5f55",
                  score: 1
                },
                {
                  check_point: "contact_bank",
                  name:
                    "\u94f6\u884c\u7c7b\u53f7\u7801\u8054\u7cfb\u60c5\u51b5",
                  remarks:
                    "\u672a\u627e\u5230\u94f6\u884c\u7c7b\u76f8\u5173\u53f7\u7801",
                  result: "\u65e0\u6b64\u7c7b\u53f7\u7801\u8bb0\u5f55",
                  score: 1
                }
              ],
              title: "\u7528\u6237\u884c\u4e3a\u68c0\u6d4b",
              title_en: "behavior_check"
            }
          ],
          org_biz_no: "5c816253-7795-4eec-b6b4-ae1b8e5bfecc",
          profile: {
            age: 28,
            birth_place:
              "\u5929\u6d25\u5e02/\u5929\u6d25\u5e02/\u6cb3\u897f\u533a",
            constellation: "\u5c04\u624b\u5ea7",
            credit_score: 606,
            full_name: "\u738b\u54f2",
            gender: 1,
            id: "120103199112061418"
          },
          report_id: "2058880439849997231",
          report_time: "2019-03-15 10:15:49",
          status: 0
        };
        let data = res.data;
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
        let netInTime = moment(dataSource.net_in_time).format("YYYY-MM-DD");
        let currentTime = moment(new Date()).format("YYYY-MM-DD");
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
        this.dataSource.useTime = datemonth(netInTime, currentTime) + "月";

        let contactsRegionSummary = data.contacts_region_summary;
        let callerCountArr = _.pluck(contactsRegionSummary, "caller_count");
        let calleeCountArr = _.pluck(contactsRegionSummary, "callee_count");
        console.log(callerCountArr, calleeCountArr);
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
        console.log(totlaSum);

        contactsRegionSummary.forEach(item => {
          item.assetType = item.region;
          item.percent =
            Math.round(
              ((item.caller_count + item.callee_count) / totlaSum) * 100
            ) / 100;
          item.const = "const";
        });
        this.charData = contactsRegionSummary.splice(0, 5);
        // this.charData = [
        //   {
        //     assetType: "天津市",
        //     percent: 0.4,
        //     const: "const"
        //   },
        //   {
        //     assetType: "广东省",
        //     percent: 0.2,
        //     const: "const"
        //   },
        //   {
        //     assetType: "河北省",
        //     percent: 0.18,
        //     const: "const"
        //   },
        //   {
        //     assetType: "河南省",
        //     percent: 0.15,
        //     const: "const"
        //   },
        //   {
        //     assetType: "山东省",
        //     percent: 12.05,
        //     const: "const"
        //   }
        // ];

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
        console.log("infoVerification===", infoVerification);
        let specialNumAll = infoVerification.filter(item => {
          return item.title === "用户行为检测";
        });
        let specialNum1Arr = specialNumAll[0].items.filter(item => {
          return item.check_point === "contact_110";
        });
        let specialNum2Arr = specialNumAll[0].items.filter(item => {
          return item.check_point === "contact_loan";
        });
        this.specialNum1 = specialNum1Arr[0].remarks;
        this.specialNum2 = specialNum2Arr[0].remarks;
      });
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
    this.getReportInfo();
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
}
</style>