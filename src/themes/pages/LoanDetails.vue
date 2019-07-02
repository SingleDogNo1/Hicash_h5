<template>
  <div>
    <div class="product">
      <div class="pro-title">借款金额</div>
      <ul class="list-wrap clearfix">
        <li
          v-for="(item, index) in amounts"
          :key="index"
          :isActive="amount.index"
          :class="{active:amount.index==index}"
          @click="changeColor(item, index)"
        >{{ item }}</li>
      </ul>
    </div>
    <div class="product">
      <div class="pro-title time">借款时间</div>
      <ul class="list-wrap clearfix">
        <li
          v-for="(item, index) in times"
          :key="index"
          :isActive2="time.index"
          :class="{active:time.index==index}"
          @click="changeColor2(item, index)"
        >{{ item.installments + flag }}</li>
      </ul>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
@import "../varibale.scss";
.product {
  width: 13.5rem;
  margin: 0 auto;
  padding-bottom: 0.125rem;
  .pro-title {
    position: relative;
    font-size: 0.7rem;
    color: #3f3f3f;
    text-align: left;
    border-bottom: 1px solid #dddddd;
    padding: 0.5rem 0 0.4rem 1.3rem;
    margin-bottom: 0.6rem;
  }
  .list-wrap {
    width: 100%;
    li {
      float: left;
      width: 3.55rem;
      height: 1.35rem;
      text-align: center;
      line-height: 1.35rem;
      margin-left: 0.45rem;
      margin-bottom: 0.45rem;
      border-radius: 5px;
      border: 0.025rem dashed #a4a4a4;
      font-size: 0.75rem;
      color: #a4a4a4;
    }
    li:nth-of-type(1) {
      margin: 0;
    }
    li:nth-of-type(4) {
      margin: 0;
    }
    .active {
      background: $main-theme-color;
      border-color: none;
      color: #fff;
    }
  }
  .cleatflex {
    zoom: 1;
  }
}
</style>

<script type="text/javascript">
export default {
  props: {
    amount: {
      type: Object
    },
    time: {
      type: Object
    },
    repayMoney: {
      type: String
    },
    monRate: {
      type: String
    },
    headerPic: {
      type: String
    }
  },
  data() {
    return {
      amounts: [],
      times: [],
      isActive: this.amount.index,
      isActive2: this.time.index,
      postDataAmount: this.amount.amount,
      postDataTime: this.time,
      flag: ""
    };
  },
  ready() {},
  methods: {
    changeColor: function(val, index) {
      this.postDataAmount = val;
      this.isActive = index;
      let _obj = { amount: val, index: index };
      this.$emit("amount", _obj);
      this.LoanPay();
    },
    changeColor2: function(val, index) {
      this.postDataTime =
        this.utils.getCookie("industryCode") === "LDDD"
          ? val.installments
          : val.installments * 30;
      this.isActive2 = index;
      let _obj = { time: val, index: index };
      this.$emit("time", _obj);
      this.LoanPay();
    },
    LoanPay() {
      let postData = new URLSearchParams();
      postData.append("industryCode", this.utils.getCookie("industryCode"));
      postData.append("amount", this.postDataAmount);
      postData.append("days", this.postDataTime);
      this.common.loanPay(postData).then(res => {
        let data = res.data;
        if (data.resultCode == "1") {
          let lowPay = data.lowPay;
          let lowRate = data.lowRate;
          let highRate = data.highRate;
          let monRate = lowRate + "%" + "-" + highRate + "%";
          this.$emit("lowPay", lowPay);
          this.$emit("monRate", monRate);
        }
      });
    },
    queryProductDetail() {
      let postData = new URLSearchParams();
      postData.append("industryCode", this.utils.getCookie("industryCode"));
      postData.append("userName", this.utils.getCookie("userName"));
      postData.append("uuid", "0c8297d7-6d3a-46da-b782-0df2434f88b1");
      postData.append("requestSource", "HTML5");

      this.common.queryProductDetail(postData).then(res => {
        let data = res.data;
        this.amounts = data.productinfoList[0].amountList;
        let headerPic = data.productinfoList[0].infoHeaderPic;
        this.$emit("headerPic", headerPic);
        let programList = data.productinfoList[0].programList;
        _.each(programList, (item, index) => {
          this.times.push({
            loanProduct: item.loanProduct,
            installments: item.installments
          });
          if (this.utils.getCookie("industryCode") === "LDDD") {
            item.installments += "天";
          } else {
            item.installments += "个月";
          }
        });
      });
    }
  },
  created: function() {
    this.postDataTime =
      this.utils.getCookie("industryCode") === "LDDD"
        ? this.time.time.installments
        : this.time.time.installments * 30;
      this.flag =
        this.utils.getCookie("industryCode") === "LDDD" ? "天" : "个月";
  },
  mounted: function() {
    this.queryProductDetail();

    this.LoanPay();
  },
  watch: {
    amount: function(val, oldVal) {},
    time: function(val, oldVal) {}
  },
  destroyed() {}
};
</script>
