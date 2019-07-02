<template>
  <div>
    <div class="product" :class="{ 'rate-product' : isRateShowPop}">
      <div class="pro-title" v-if="!isRateShowPop"><i class="icon-loan"></i>借多少（元）</div>
      <div class="pro-title" v-else>借款金额</div>
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
    <div class="product" :class="{ 'rate-product' : isRateShowPop}">
      <div class="pro-title time" v-if="!isRateShowPop"><i class="icon-loan"></i>借多久（月）</div>
      <div class="pro-title time" v-else>借款期限</div>
      <ul class="list-wrap clearfix">
        <li
          v-for="(item, index) in programList"
          :key="index"
          :isActive2="time.index"
          :class="{active:time.index==index}"
          @click="changeColor2(item, index)"
        >{{ item.productPeriod + flag }}</li>
      </ul>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
@import "~bowerComponents/sass-rem/_rem.scss";
@import "../varibale.scss";
.product {
  //width: 100%;
  margin: 0 auto;
  margin-bottom: rem(8px);
  &.rate-product {
    //margin-top: rem(80px);
    padding: 0 rem(15px);
  }
  .pro-title {
    position: relative;
    font-size: rem(17px);
    color: #3f3f3f;
    text-align: left;
    margin-bottom: rem(16px);
    display: flex;
    align-items: center;
    .icon-loan {
      display: inline-block;
      width: rem(17px);
      height: rem(17px);
      background: url("../images/hmfq/icon_loan.png") center center no-repeat;
      background-size: cover;
      margin-top: rem(3px);
      margin-right: rem(7px);
    }
  }
  .list-wrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    li {
      float: left;
      width: rem(107px);
      height: 1.35rem;
      text-align: center;
      line-height: 1.35rem;
      margin-right: rem(8px);
      margin-bottom: rem(16px);
      border-radius: 5px;
      border: 1px solid $gray-font-color;
      font-size: rem(17px);
      color: $gray-font-color;
    }
    li:nth-child(3n) {
      margin-right: 0;
    }
    .active {
      border: 1px solid $hmfq-theme-color;
      border-color: none;
      color: $hmfq-theme-color;
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
    },
    value: {
      type: Boolean
    },
    programList: {
      type: Array
    },
    amounts:{
      type: Array
    }
  },
  data() {
    return {
      times: [],
      isActive: this.amount.index,
      isActive2: this.time.index,
      postDataAmount: this.amount.amount,
      postDataTime: this.time.productPeriod,
      flag: "",
      isRateShowPop: false
    };
  },
  ready() {},
  methods: {
    changeColor: function(val, index) {
      console.info('changeColor val', val);
      this.postDataAmount = val;
      this.isActive = index;
      let _obj = { amount: val, index: index };
      this.$emit("amount", _obj);
      this.LoanPay();
    },
    changeColor2: function(val, index) {
      this.postDataTime =
        this.utils.getCookie("industryCode") === "LDDD"
          ? val.productPeriod
          : val.productPeriod * 30;
      this.isActive2 = index;
      let _obj = { time: val, index: index };
      this.$emit("time", _obj);
      this.LoanPay();
    },
    LoanPay(productPeriod, amount) {
      let postData = new URLSearchParams();
      console.info('this.postDataAmount', this.postDataAmount);
      postData.append("industryCode", this.utils.getCookie("industryCode"));
      postData.append("amount", this.postDataAmount || amount);
      postData.append("days", this.postDataTime || productPeriod * 30);
      console.info('this.amount', this.amount);
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
      // console.info('this.programList', this.programList);
      // _.each(this.programList, (item, index) => {
        
      //   if (this.utils.getCookie("industryCode") === "LDDD") {
      //     item.productPeriod += "天";
      //   } else {
      //     item.productPeriod += "个月";
      //   }

      //   this.times.push({
      //     productId: item.productId,
      //     productPeriod: item.productPeriod
      //   });
      // });
    }
  },
  created: function() {
    // this.postDataTime =
    //   this.utils.getCookie("industryCode") === "LDDD"
    //     ? this.time.time.productPeriod
    //     : this.time.time.productPeriod * 30;
      this.flag =
        this.utils.getCookie("industryCode") === "LDDD" ? "天" : "个月";
  },
  mounted: function() {
    // this.LoanPay();
  },
  watch: {
    value: function(val, oldVal) {
      this.isRateShowPop = val
    }, 
    amount: function(val, oldVal) {
      console.info('11111', val);
      this.postDataAmount = val.amount
    }, 
    time: function(val, oldVal) {
      console.info('222222', val);
      this.postDataTime = val.time.productPeriod
    }
  },
  destroyed() {}
};
</script>
