<template>
  <div class="jingdong">
    <page-header :title="title" :showBack="showBack" :showBtnClose="showBtnClose"></page-header>
    <div class="content">
      <div class="jingdong-report-wrap">
        <div class="title-wrap">
          <h1>京东消费报告</h1>
          <div class="refresh">
            <i class="icon-refresh"></i>
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
            <p class="icon-verified">实名认证</p>
            <!--<p>未实名</p>-->
            <p class="score-tips">小白信用分 {{baiScore}}</p>
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
            <p class="value">325012</p>
            <p class="title">总消费(元)</p>
          </li>
          <li>
            <p class="value">325012</p>
            <p class="title">月均消费(元)</p>
          </li>
          <li>
            <p class="value">325012</p>
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
        <consumption-trend-line></consumption-trend-line>
        <div class="consumption-tips">
          <p class="title">消费走势说明</p>
          <p class="desc">消费走势反映您消费情况的稳定性，平稳的消费走势一般表示您收入及消费水平的稳定，将有利于您的还款能力评估。</p>
        </div>
      </div>
      <div class="price-wrap">
        <h3>单品价格前三</h3>
        <div class="price-ranking">
          <div class="first">
            <p class="name">美的饮水机…</p>
            <p class="price">¥1245</p>
          </div>
          <div class="second">
            <p class="name">美的饮水机…</p>
            <p class="price">¥1245</p>
          </div>
          <div class="third">
            <p class="name">美的饮水机…</p>
            <p class="price">¥1245</p>
          </div>
        </div>
        <div class="price-tips">
          <p class="title">消费价格说明</p>
          <p class="desc">消费价格评估将您购买产品的单价进行排名，评估您的消费承受能力，单品价格越高，越有利于对您还款能力的评估。</p>
        </div>
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
var moment = require("moment");

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
      title: "征信报告",
      showBack: true,
      showBtnClose: false,
      date: "",
      baiScore: "",
      profile: {
        creditScore: 0,
        percent: 0,
        verified: true,
        situation: ""
      },
      contactsArr: [],
      shareBox: false,
      selected: 0
    };
  },
  methods: {
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
      // switch (betweenDay) {
      //   case betweenDay < 30 :
      //     console.log(21111)
      //     this.profile.percent = 25;
      //     this.profile.situation = "活跃";
      //     break;
      //   case betweenDay > 30 && betweenDay < 60 :
      //     this.profile.percent = 50;
      //     this.profile.situation = "正常";
      //     break;
      //   case betweenDay > 60 && betweenDay < 90 :
      //     this.profile.percent = 75
      //     this.profile.situation = "偶尔";
      //     break;
      //   case betweenDay > 90:
      //     this.profile.percent = 100;
      //     this.profile.situation = "休眠";
      //     break;
      // }
    },
    getReportInfo() {
      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      let day = new Date().getDate();
      this.date = year + "." + month + "." + day;
      this.common.getReport().then(res => {
        res.data = {
          addresses: [
            {
              city: "\u6cb3\u897f\u533a",
              is_default_address: true,
              receiver_addr:
                "\u5929\u6d25\u6cb3\u897f\u533a\u5168\u5883\u5929\u6d25\u5e02\u6cb3\u897f\u533a\u5c0f\u6d77\u5730\u96c5\u81f4\u91cc66\u95e8209",
              receiver_cell_phone: "150****6429",
              receiver_name: "\u738b\u54f2"
            },
            {
              city: "\u6cb3\u5317\u533a",
              is_default_address: false,
              receiver_addr:
                "\u5929\u6d25\u6cb3\u5317\u533a\u5168\u5883\u5929\u6d25\u5e02\u6cb3\u5317\u533a\u6b63\u4e49\u9053\u8861\u5c71\u91cc42\u95e8602",
              receiver_cell_phone: "138****6313",
              receiver_name: "\u674e\u6653\u4e1c"
            }
          ],
          basic_info: {
            alias_name: "wangzhe_19911206",
            amount_balance: null,
            bai_score: 92.8,
            datasource: "\u7535\u5546\u4eac\u4e1c",
            email: "",
            huabei: null,
            huabei_avail_amount: null,
            huabei_total_amount: null,
            is_validate_real_name: true,
            jiebei: null,
            level: "\u91d1\u724c\u7528\u6237",
            perm_limt: 0.0,
            score: 10309.0,
            security_level: null,
            website_id: "wangzhe_19911206",
            yeb_total_price: null
          },
          bills_detail: [
            {
              bill_type: "\u4e2a\u4eba",
              delivery_type: "\u4eac\u4e1c\u5feb\u9012",
              is_success: true,
              items: [
                {
                  product_cnt: "1",
                  product_name:
                    "\u7f57\u6280\uff08Logitech\uff09M546\uff08M545\uff09\u65e0\u7ebf\u9f20\u6807 \u4fa7\u952e \u53cc\u5411\u6eda\u8f6e \u9ed1\u8272",
                  product_no: "1748084",
                  product_price: 149.0
                }
              ],
              order_id: "88683463151",
              payment_time: "2019-03-01 20:28:43",
              payment_type: "\u5728\u7ebf\u652f\u4ed8",
              receiver_addr:
                "\u5929\u6d25\u6cb3\u897f\u533a\u5168\u5883\u5929\u6d25\u5e02\u6cb3\u897f\u533a\u5c0f\u6d77\u5730\u96c5\u81f4\u91cc66\u95e8209",
              receiver_cell_phone: "150****6429",
              receiver_name: "\u738b\u54f2",
              status: true,
              total_price: 129.5,
              trans_time: "2019-03-01 20:28:30"
            },
            {
              bill_type: "\u4e2a\u4eba",
              delivery_type: "\u4eac\u4e1c\u5feb\u9012",
              is_success: true,
              items: [
                {
                  product_cnt: "1",
                  product_name:
                    "\u5357\u5b5a(NANFU)5\u53f7\u5145\u7535\u9502\u7535\u6c604\u7c92\u5957\u88c5 1.5V\u6052\u538b\u5feb\u5145 TENAVOLTS USB\u5145\u7535 \u9002\u7528\u6e38\u620f\u624b\u67c4/\u5438\u5976\u5668/\u9f20\u6807\u7b49 AA\u4e94\u53f7",
                  product_no: "8340171",
                  product_price: 159.0
                }
              ],
              order_id: "87115171054",
              payment_time: "2019-02-12 09:03:23",
              payment_type: "\u5728\u7ebf\u652f\u4ed8",
              receiver_addr:
                "\u5929\u6d25\u6cb3\u897f\u533a\u5168\u5883\u5929\u6d25\u5e02\u6cb3\u897f\u533a\u5c0f\u6d77\u5730\u96c5\u81f4\u91cc66\u95e8209",
              receiver_cell_phone: "150****6429",
              receiver_name: "\u738b\u54f2",
              status: true,
              total_price: 149.5,
              trans_time: "2019-02-12 09:03:09"
            },
            {
              bill_type: "\u4e2a\u4eba",
              delivery_type: "\u4eac\u4e1c\u5feb\u9012",
              is_success: true,
              items: [
                {
                  product_cnt: "1",
                  product_name:
                    "\u4e09\u661f (SAMSUNG) 31.5\u82f1\u5bf8 144Hz\u5237\u65b0 1800R\u7075\u6670\u9ad8\u6e05 \u66f2\u9762\u663e\u793a\u5668 (C32JG53FDC)",
                  product_no: "100000996926",
                  product_price: 3699.0
                }
              ],
              order_id: "86761935022",
              payment_time: "2019-02-06 09:05:00",
              payment_type: "\u8d27\u5230\u4ed8\u6b3e",
              receiver_addr:
                "\u5929\u6d25\u6cb3\u897f\u533a\u5168\u5883\u5929\u6d25\u5e02\u6cb3\u897f\u533a\u5c0f\u6d77\u5730\u96c5\u81f4\u91cc66\u95e8209",
              receiver_cell_phone: "150****6429",
              receiver_name: "\u738b\u54f2",
              status: true,
              total_price: 1849.5,
              trans_time: "2019-02-05 15:51:30"
            },
            {
              bill_type: "\u4e2a\u4eba",
              delivery_type: "\u4eac\u4e1c\u5feb\u9012",
              is_success: true,
              items: [
                {
                  product_cnt: "1",
                  product_name:
                    "\u4e09\u661f (SAMSUNG) 31.5\u82f1\u5bf8 144Hz\u5237\u65b0 1800R\u7075\u6670\u9ad8\u6e05 \u66f2\u9762\u663e\u793a\u5668 (C32JG53FDC)",
                  product_no: "100000996926",
                  product_price: 3699.0
                }
              ],
              order_id: "83641151793",
              payment_time: "2019-02-03 15:01:54",
              payment_type: "\u5728\u7ebf\u652f\u4ed8",
              receiver_addr:
                "\u5929\u6d25\u6cb3\u897f\u533a\u5168\u5883\u5929\u6d25\u5e02\u6cb3\u897f\u533a\u5c0f\u6d77\u5730\u96c5\u81f4\u91cc66\u95e8209",
              receiver_cell_phone: "150****6429",
              receiver_name: "\u738b\u54f2",
              status: true,
              total_price: 2279.5,
              trans_time: "2019-02-03 15:01:42"
            },
            {
              bill_type: "\u4e2a\u4eba",
              delivery_type: "\u4eac\u4e1c\u5feb\u9012",
              is_success: true,
              items: [
                {
                  product_cnt: "1",
                  product_name:
                    "\u8054\u60f3\uff08Lenovo\uff09\u62ef\u6551\u8005 \u52037000\u2161 UIY\u5403\u9e21\u6e38\u620f\u53f0\u5f0f\u7535\u8111\u4e3b\u673a(I5-8400 8G 1T+128G SSD GTX1060 6G\u4e09\u5e74\u4e0a\u95e8)",
                  product_no: "7661480",
                  product_price: 5999.0
                }
              ],
              order_id: "83625295547",
              payment_time: "2019-02-03 14:55:10",
              payment_type: "\u5728\u7ebf\u652f\u4ed8",
              receiver_addr:
                "\u5929\u6d25\u6cb3\u897f\u533a\u5168\u5883\u5929\u6d25\u5e02\u6cb3\u897f\u533a\u5c0f\u6d77\u5730\u96c5\u81f4\u91cc66\u95e8209",
              receiver_cell_phone: "150****6429",
              receiver_name: "\u738b\u54f2",
              status: true,
              total_price: 5979.5,
              trans_time: "2019-02-03 14:46:19"
            },
            {
              bill_type: "",
              delivery_type: "\u666e\u901a\u5feb\u9012",
              is_success: true,
              items: [
                {
                  product_cnt: "1",
                  product_name:
                    "ThinkPad \u3010\u5305\u90ae\u3011\u8054\u60f3\u6709\u7ebfUSB\u9f20\u6807 \u7b14\u8bb0\u672c\u4e00\u4f53\u673a\u53f0\u5f0f\u7535\u8111\u901a\u7528\u5bb6\u7528\u529e\u516cU\u53e3\u65b9\u53e3\u9f20\u6807 \u5c0f\u9ed1\u84dd\u5149\u9f20\u6807",
                  product_no: "10719397320",
                  product_price: 49.0
                }
              ],
              order_id: "76858068374",
              payment_time: "2018-07-18 19:38:12",
              payment_type: "\u5728\u7ebf\u652f\u4ed8",
              receiver_addr:
                "\u5929\u6d25\u6cb3\u897f\u533a\u5168\u5883\u5929\u6d25\u5e02\u6cb3\u897f\u533a\u5c0f\u6d77\u5730\u96c5\u81f4\u91cc66\u95e8209",
              receiver_cell_phone: "150****6429",
              receiver_name: "\u738b\u54f2",
              status: true,
              total_price: 45.8,
              trans_time: "2018-07-18 19:37:33"
            },
            {
              bill_type: "\u4e2a\u4eba",
              delivery_type: "\u666e\u901a\u5feb\u9012",
              is_success: true,
              items: [
                {
                  product_cnt: "1",
                  product_name:
                    "\u5409\u5217\uff08Gillette\uff09 \u5409\u5217\u5a01\u950b\u624b\u52a8\u5243\u987b\u5200\u7537\u58eb\u522e\u80e1\u5200\u7247\u624b\u52a8\u522e\u80e1\u5200\u5200\u67b61\u5200\u67b611\u5200\u5934",
                  product_no: "10558427498",
                  product_price: 39.9
                }
              ],
              order_id: "76884204009",
              payment_time: "2018-06-16 21:56:35",
              payment_type: "\u5728\u7ebf\u652f\u4ed8",
              receiver_addr:
                "\u5929\u6d25\u6cb3\u897f\u533a\u5168\u5883\u5929\u6d25\u5e02\u6cb3\u897f\u533a\u5c0f\u6d77\u5730\u96c5\u81f4\u91cc66\u95e8209",
              receiver_cell_phone: "150****6429",
              receiver_name: "\u738b\u54f2",
              status: true,
              total_price: 33.9,
              trans_time: "2018-06-16 21:55:37"
            },
            {
              bill_type: "\u4e2a\u4eba",
              delivery_type: "\u666e\u901a\u5feb\u9012",
              is_success: true,
              items: [
                {
                  product_cnt: "1",
                  product_name:
                    "\u7075\u86c7 \u6e38\u620f\u9f20\u6807\u57ab\u8d85\u5927\u53f7\u52a0\u539a\u7535\u8111\u684c\u57ab \u7cbe\u5bc6\u5305\u8fb9 \u5e95\u90e8\u9632\u6ed1 \u529e\u516c\u6e38\u620f\u7686\u5b9c P05 \u9ed1\u84dd\u8272",
                  product_no: "3632025",
                  product_price: 19.9
                }
              ],
              order_id: "76377743149",
              payment_time: "2018-05-26 16:56:20",
              payment_type: "\u5728\u7ebf\u652f\u4ed8",
              receiver_addr:
                "\u5929\u6d25\u6cb3\u897f\u533a\u5168\u5883\u5929\u6d25\u5e02\u6cb3\u897f\u533a\u5c0f\u6d77\u5730\u96c5\u81f4\u91cc66\u95e8209",
              receiver_cell_phone: "150****6429",
              receiver_name: "\u738b\u54f2",
              status: true,
              total_price: 28.4,
              trans_time: "2018-05-26 16:55:50"
            },
            {
              bill_type: "\u4e2a\u4eba",
              delivery_type: "\u666e\u901a\u5feb\u9012",
              is_success: true,
              items: [
                {
                  product_cnt: "1",
                  product_name:
                    "ikbc c87 \u6a31\u6843\u8f74\u673a\u68b0\u952e\u76d8 87\u952e\u539f\u5382Cherry\u8f74 \u767d\u8272 \u9752\u8f74 \u6e38\u620f\u952e\u76d8 \u7edd\u5730\u6c42\u751f \u5403\u9e21\u952e\u76d8",
                  product_no: "3491222",
                  product_price: 399.0
                }
              ],
              order_id: "76288317097",
              payment_time: "2018-05-24 22:08:36",
              payment_type: "\u5728\u7ebf\u652f\u4ed8",
              receiver_addr:
                "\u5929\u6d25\u6cb3\u897f\u533a\u5168\u5883\u5929\u6d25\u5e02\u6cb3\u897f\u533a\u5c0f\u6d77\u5730\u96c5\u81f4\u91cc66\u95e8209",
              receiver_cell_phone: "150****6429",
              receiver_name: "\u738b\u54f2",
              status: true,
              total_price: 399.5,
              trans_time: "2018-05-24 22:08:15"
            },
            {
              bill_type: "",
              delivery_type: "\u666e\u901a\u5feb\u9012",
              is_success: true,
              items: [
                {
                  product_cnt: "1",
                  product_name:
                    "ThinkPad \u8054\u60f3\uff08ThinkLife\uff09\u65e0\u7ebf\u9759\u97f3\u9f20\u6807WLM200\u7b14\u8bb0\u672c\u53f0\u5f0f\u673a\u529e\u516c\u901a\u7528",
                  product_no: "12717412582",
                  product_price: 128.0
                }
              ],
              order_id: "76275938409",
              payment_time: "2018-05-24 12:59:16",
              payment_type: "\u5728\u7ebf\u652f\u4ed8",
              receiver_addr:
                "\u5929\u6d25\u6cb3\u897f\u533a\u5168\u5883\u5929\u6d25\u5e02\u6cb3\u897f\u533a\u5c0f\u6d77\u5730\u96c5\u81f4\u91cc66\u95e8209",
              receiver_cell_phone: "150****6429",
              receiver_name: "\u738b\u54f2",
              status: true,
              total_price: 69.7,
              trans_time: "2018-05-24 12:58:20"
            },
            {
              bill_type: "\u4e2a\u4eba",
              delivery_type: "\u666e\u901a\u5feb\u9012",
              is_success: true,
              items: [
                {
                  product_cnt: "1",
                  product_name:
                    "\u7edf\u4e00 \u6c34\u8da3\u591a \u4e73\u9178\u83cc\u53d1\u9175\u98ce\u5473\u996e\u6599  \u5154\u65af\u57fa\u5b9a\u5236\u7248 \u9650\u91cf\u88c5 500ml*6\u74f6",
                  product_no: "7458189",
                  product_price: 49.9
                }
              ],
              order_id: "73970884795",
              payment_time: "2018-05-17 22:15:00",
              payment_type: "\u5728\u7ebf\u652f\u4ed8",
              receiver_addr:
                "\u5929\u6d25\u548c\u5e73\u533a\u5168\u5883\u5c0f\u767d\u697c\u8857\u56fd\u8d38\u5199\u5b57\u697cB\u5ea72706\u5ba4",
              receiver_cell_phone: "150****2119",
              receiver_name: "\u4e8e\u5973\u58eb",
              status: true,
              total_price: 55.9,
              trans_time: "2018-05-17 22:08:46"
            },
            {
              bill_type: "",
              delivery_type: "\u666e\u901a\u5feb\u9012",
              is_success: true,
              items: [
                {
                  product_cnt: "1",
                  product_name:
                    "\u5357\u6781\u4eba\u889c\u5b50\u7537\u4f4e\u5e2e\u6d45\u53e3\u9690\u5f62\u8fd0\u52a8\u9632\u6ed1\u9632\u81ed\u77ed\u889c\u8584\u6b3e\u8239\u889c\u4e2d\u7b52\u5168\u68c9\u889c\u590f\u5b63 65%\u7eaf\u68c9 \u77ed\u7b52\u767d\u827210\u53cc \u5747\u7801",
                  product_no: "26736495562",
                  product_price: 29.9
                }
              ],
              order_id: "73409445046",
              payment_time: "2018-04-24 00:34:12",
              payment_type: "\u5728\u7ebf\u652f\u4ed8",
              receiver_addr:
                "\u5929\u6d25\u6cb3\u897f\u533a\u5168\u5883\u5929\u6d25\u5e02\u6cb3\u897f\u533a\u5c0f\u6d77\u5730\u96c5\u81f4\u91cc66\u95e8209",
              receiver_cell_phone: "150****6429",
              receiver_name: "\u738b\u54f2",
              status: true,
              total_price: 29.9,
              trans_time: "2018-04-24 00:34:00"
            },
            {
              bill_type: "\u4e2a\u4eba",
              delivery_type: "\u666e\u901a\u5feb\u9012",
              is_success: true,
              items: [
                {
                  product_cnt: "2",
                  product_name:
                    "\u516b\u559c \u51b0\u6dc7\u6dcb \u5de7\u514b\u529b\u53e3\u5473 1100g*1\u6876 \u5bb6\u5ead\u88c5 \u6876\u88c5 \u91cf\u8d29\u88c5",
                  product_no: "3098495",
                  product_price: 66.0
                }
              ],
              order_id: "73301065272",
              payment_time: "2018-04-20 19:18:35",
              payment_type: "\u5728\u7ebf\u652f\u4ed8",
              receiver_addr:
                "\u5929\u6d25\u6cb3\u897f\u533a\u5168\u5883\u5929\u6d25\u5e02\u6cb3\u897f\u533a\u5c0f\u6d77\u5730\u96c5\u81f4\u91cc66\u95e8209",
              receiver_cell_phone: "150****6429",
              receiver_name: "\u738b\u54f2",
              status: true,
              total_price: 104.0,
              trans_time: "2018-04-20 19:18:23"
            },
            {
              bill_type: "\u4e2a\u4eba",
              delivery_type: "\u666e\u901a\u5feb\u9012",
              is_success: true,
              items: [
                {
                  product_cnt: "1",
                  product_name:
                    "\u65af\u6cf0\u514b\uff08stiger\uff09Type-C\u8f6cHDMI+HUB\u9ad8\u6e05\u8f6c\u6362\u5668 \u82f9\u679cMacBook\u8f6c\u63a5\u5934USB-C\u8f6c\u6362\u5668 Type-C\u8f6cHDMI+USB3.0",
                  product_no: "5524567",
                  product_price: 139.0
                }
              ],
              order_id: "73923267653",
              payment_time: "2018-04-09 15:36:26",
              payment_type: "\u5728\u7ebf\u652f\u4ed8",
              receiver_addr:
                "\u5929\u6d25\u6cb3\u897f\u533a\u5168\u5883\u5929\u6d25\u5e02\u6cb3\u897f\u533a\u5c0f\u6d77\u5730\u96c5\u81f4\u91cc66\u95e8209",
              receiver_cell_phone: "150****6429",
              receiver_name: "\u738b\u54f2",
              status: true,
              total_price: 139.5,
              trans_time: "2018-04-09 15:35:59"
            },
            {
              bill_type: "\u4e2a\u4eba",
              delivery_type: "\u666e\u901a\u5feb\u9012",
              is_success: true,
              items: [
                {
                  product_cnt: "1",
                  product_name:
                    "\u98de\u5229\u6d66\uff08PHILIPS\uff09HDMI\u7ebf2.0\u7248 4K\u6570\u5b57\u9ad8\u6e05\u7ebf 18Gbps 1.5\u7c73 SWL6118C/93",
                  product_no: "2238360",
                  product_price: 29.9
                }
              ],
              order_id: "73922985575",
              payment_time: "2018-04-09 15:36:26",
              payment_type: "\u5728\u7ebf\u652f\u4ed8",
              receiver_addr:
                "\u5929\u6d25\u6cb3\u897f\u533a\u5168\u5883\u5929\u6d25\u5e02\u6cb3\u897f\u533a\u5c0f\u6d77\u5730\u96c5\u81f4\u91cc66\u95e8209",
              receiver_cell_phone: "150****6429",
              receiver_name: "\u738b\u54f2",
              status: true,
              total_price: 29.9,
              trans_time: "2018-04-09 15:35:59"
            },
            {
              bill_type: "\u4e2a\u4eba",
              delivery_type: "\u666e\u901a\u5feb\u9012",
              is_success: false,
              items: [
                {
                  product_cnt: "1",
                  product_name:
                    "\u65af\u6cf0\u514b\uff08stiger\uff09Type-C\u8f6cHDMI+HUB\u9ad8\u6e05\u8f6c\u6362\u5668 \u82f9\u679cMacBook\u8f6c\u63a5\u5934USB-C\u8f6c\u6362\u5668 Type-C\u8f6cHDMI+USB3.0",
                  product_no: "5524567",
                  product_price: 139.0
                },
                {
                  product_cnt: "1",
                  product_name:
                    "\u98de\u5229\u6d66\uff08PHILIPS\uff09HDMI\u7ebf2.0\u7248 4K\u6570\u5b57\u9ad8\u6e05\u7ebf 18Gbps 1.5\u7c73 SWL6118C/93",
                  product_no: "2238360",
                  product_price: 29.9
                }
              ],
              order_id: "73922917579",
              payment_time: "",
              payment_type: "\u5728\u7ebf\u652f\u4ed8",
              receiver_addr:
                "\u5929\u6d25\u6cb3\u897f\u533a\u5168\u5883\u5929\u6d25\u5e02\u6cb3\u897f\u533a\u5c0f\u6d77\u5730\u96c5\u81f4\u91cc66\u95e8209",
              receiver_cell_phone: "150****6429",
              receiver_name: "\u738b\u54f2",
              status: false,
              total_price: 168.9,
              trans_time: "2018-04-09 15:31:52"
            },
            {
              bill_type: "\u4e2a\u4eba",
              delivery_type: "\u666e\u901a\u5feb\u9012",
              is_success: false,
              items: [
                {
                  product_cnt: "1",
                  product_name:
                    "\u6ee1\u51cf\u4e0d\u6b625\u6298\u4e09\u53ea\u677e\u9f20_\u70ad\u70e7\u8170\u679c90g\u96f6\u98df\u575a\u679c\u7092\u8d27\u5e72\u679c\u7279\u4ea7\u8170\u679c\u4ec1 1\u888b\u88c5",
                  product_no: "21796552045",
                  product_price: 40.0
                }
              ],
              order_id: "72188531653",
              payment_time: "",
              payment_type: "\u5728\u7ebf\u652f\u4ed8",
              receiver_addr:
                "\u5929\u6d25\u6cb3\u897f\u533a\u5168\u5883\u5929\u6d25\u5e02\u6cb3\u897f\u533a\u5c0f\u6d77\u5730\u96c5\u81f4\u91cc66\u95e8209",
              receiver_cell_phone: "150****6429",
              receiver_name: "\u738b\u54f2",
              status: false,
              total_price: 212.8,
              trans_time: "2018-02-10 17:59:05"
            }
          ],
          bills_summary: [
            {
              count: 4,
              month: "2018-04",
              total_price: 303.29999999999995
            },
            {
              count: 4,
              month: "2018-05",
              total_price: 553.5
            },
            {
              count: 1,
              month: "2018-06",
              total_price: 33.9
            },
            {
              count: 1,
              month: "2018-07",
              total_price: 45.8
            },
            {
              count: 4,
              month: "2019-02",
              total_price: 10258.0
            },
            {
              count: 1,
              month: "2019-03",
              total_price: 129.5
            }
          ],
          data_source: {
            mobile: "15902270724",
            name: "jd",
            type: "\u7535\u5546"
          },
          info_verification: {
            items: [
              {
                check_point: "check_idcard_validation",
                name: "\u8eab\u4efd\u8bc1\u53f7\u7801\u662f\u5426\u6709\u6548",
                remarks:
                  "\u901a\u8fc7\u56fd\u9645\u8eab\u4efd\u8bc1\u7b97\u6cd5",
                result: "\u662f"
              },
              {
                check_point: "check_name",
                name:
                  "\u7535\u5546\u771f\u5b9e\u59d3\u540d\u4e0e\u7533\u8bf7\u4fe1\u606f\u662f\u5426\u5339\u914d",
                remarks:
                  "\u7535\u5546\u771f\u5b9e\u59d3\u540d[*\u54f2]\u4e0e\u7533\u8bf7\u59d3\u540d\u5339\u914d\u4e00\u81f4",
                result: "\u662f"
              },
              {
                check_point: "check_idcard",
                name:
                  "\u7535\u5546\u8eab\u4efd\u8bc1\u53f7\u7801\u4e0e\u7533\u8bf7\u4fe1\u606f\u662f\u5426\u5339\u914d",
                remarks:
                  "\u7535\u5546\u8eab\u4efd\u8bc1\u53f7\u7801[1****************8]\u4e0e\u7533\u8bf7\u4fe1\u606f\u6a21\u7cca\u5339\u914d\u4e00\u81f4",
                result: "\u662f"
              },
              {
                check_point: "check_phone",
                name:
                  "\u7528\u6237\u624b\u673a\u53f7\u7801\u4e0e\u7533\u8bf7\u4fe1\u606f\u662f\u5426\u5339\u914d",
                remarks:
                  "\u7528\u6237\u624b\u673a\u53f7\u7801[159*****724]\u4e0e\u7533\u8bf7\u4fe1\u606f\u5339\u914d\u4e00\u81f4",
                result: "\u662f"
              },
              {
                check_point: "check_use_time",
                name: "\u7535\u5546\u8d26\u53f7\u4f7f\u7528\u65f6\u95f4",
                remarks:
                  "\u6839\u636e\u7b2c\u4e00\u7b14\u8ba2\u5355\u65f6\u95f4\uff0c\u63a8\u7b97\u8be5\u8d26\u53f7\u4f7f\u752813.23\u4e2a\u6708",
                result: "\u4f7f\u75281\u5e74\u4ee5\u4e0a"
              },
              {
                check_point: "check_use_info",
                name: "\u7535\u5546\u4f7f\u7528\u60c5\u51b5",
                remarks:
                  "\u8fd112\u4e2a\u6708\u5185\u8ba2\u5355\u603b\u657016\u4e2a",
                result: "\u4e00\u822c"
              },
              {
                check_point: "check_active_info",
                name: "\u7535\u5546\u8d26\u53f7\u6d3b\u8dc3\u60c5\u51b5",
                remarks:
                  "\u6700\u8fd1\u4e00\u7b14\u8ba2\u5355\u65f6\u95f4\u8ddd\u79bb\u7533\u8bf7\u65e5\u671f\u76f8\u5dee13\u5929",
                result: "\u6d3b\u8dc3"
              },
              {
                check_point: "check_phone_in_address",
                name:
                  "\u7528\u6237\u624b\u673a\u53f7\u7801\u662f\u5426\u51fa\u73b0\u5728\u6536\u8d27\u624b\u673a\u53f7\u4e2d",
                remarks:
                  "\u7528\u6237\u624b\u673a\u53f7\u7801\u4f5c\u4e3a\u6536\u8d27\u4eba\u624b\u673a\u53f7\u5171\u51fa\u73b00\u6b21",
                result: "\u5426"
              },
              {
                check_point: "check_home_addr",
                name:
                  "\u5c45\u4f4f\u5730\u5740\u662f\u5426\u53ef\u7cbe\u786e\u5b9a\u4f4d",
                remarks: "\u672a\u63d0\u4f9b\u5c45\u4f4f\u5730\u5740",
                result: "\u5426"
              },
              {
                check_point: "home_addr_in_address",
                name:
                  "\u5c45\u4f4f\u5730\u5740\u662f\u5426\u51fa\u73b0\u5728\u6536\u8d27\u5730\u5740\u4e2d",
                remarks:
                  "\u5c45\u4f4f\u5730\u5740\u5728\u6536\u8d27\u5730\u5740\u4e2d\u51fa\u73b00\u6b21",
                result: "\u5426"
              },
              {
                check_point: "check_work_addr",
                name:
                  "\u5de5\u4f5c\u5730\u5740\u662f\u5426\u53ef\u7cbe\u786e\u5b9a\u4f4d",
                remarks: "\u672a\u63d0\u4f9b\u5de5\u4f5c\u5730\u5740",
                result: "\u5426"
              },
              {
                check_point: "work_addr_in_address",
                name:
                  "\u5de5\u4f5c\u5730\u5740\u662f\u5426\u51fa\u73b0\u5728\u6536\u8d27\u5730\u5740\u4e2d",
                remarks:
                  "\u5de5\u4f5c\u5730\u5740\u5728\u6536\u8d27\u5730\u5740\u4e2d\u51fa\u73b00\u6b21",
                result: "\u5426"
              },
              {
                check_point: "most_city",
                name:
                  "\u51fa\u73b0\u9891\u6b21\u6700\u9ad8\u7684\u6536\u8d27\u5730\u5740\u6240\u5c5e\u57ce\u5e02",
                remarks:
                  "\u8fd112\u4e2a\u6708\u51fa\u73b0\u9891\u6b21\u6700\u9ad8\u7684\u6536\u8d27\u5730\u5740\u6240\u5728\u57ce\u5e02\u4e3a:\u5929\u6d25\u6cb3\u897f\u533a",
                result: "\u5929\u6d25\u6cb3\u897f\u533a"
              }
            ],
            title: "\u4fe1\u606f\u9a8c\u771f",
            title_en: "application_check"
          },
          org_biz_no: "bf7284e3-7dee-43e8-aa36-69a6484851d3",
          profile: {
            age: 28,
            birth_place:
              "\u5929\u6d25\u5e02/\u5929\u6d25\u5e02/\u6cb3\u897f\u533a",
            constellation: "\u5c04\u624b\u5ea7",
            full_name: "\u738b\u54f2",
            gender: 1,
            id_card_no: "120103199112061418"
          },
          report_id: "2058990551595897647",
          report_time: "2019-03-15 17:33:21",
          status: 0
        };
        let data = res.data;
        console.log("data===", data);
        this.baiScore = data.basic_info.bai_score;
        this.profile.verified = data.basic_info.is_validate_real_name;
        let billsDetail = data.bills_detail;
        let lastTransTime = moment(billsDetail[0].trans_time).format(
          "YYYY-MM-DD"
        );
        let currentTime = moment(new Date()).format("YYYY-MM-DD");
        this.getActiveSituation(lastTransTime, currentTime);
      });
    },
    yearSwitch() {
      console.log(this.selected);
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
    .price-wrap {
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
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
          }
          .price {
            font-size: 15px;
            color: #ff7640;
          }
        }
        .second {
          position: absolute;
          top: rem(-10px);
          left: rem(10px);
          width: rem(90px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
          .name {
            font-size: 15px;
            color: #333333;
          }
          .price {
            font-size: 15px;
            color: #ff7640;
          }
        }
        .third {
          position: absolute;
          right: rem(10px);
          width: rem(90px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
          .name {
            font-size: 15px;
            color: #333333;
          }
          .price {
            font-size: 15px;
            color: #ff7640;
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