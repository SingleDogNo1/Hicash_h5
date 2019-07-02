
<template>
  <div class=content>
    <header class="rate-header">
      <div class="left-arrow" :class="{'black':changeBlackColor}" @click="jump"></div>
      <div class="bg" :style="'opacity:' + opacity"></div>
      <div class="title" :class="{'black':changeBlackColor}">费率计算</div>
    </header>
    <scroller lock-x @on-scroll="onScroll" ref="scroller">
      <div class="rateWrap">
        <div class="rateUpBg">
          <div class="rateDesNumber">
            <ul class="rateDesHd clearfix">
              <li>借款金额</li>
              <li>借款期限</li>
              <li>每期最低本息还款</li>
            </ul>
            <ul class="rateDesCon clearfix">
              <li>{{vipMoneyVal}}元</li>
              <li>{{installments}}{{periodUnit}}</li>
              <li>{{loanPayData.lowPay}}元</li>
            </ul>
          </div>
        </div>
        <div class="product">
          <div class="pro-title">借款金额</div>
          <!-- <ul class="list-wrap clearfix">
            <li
              v-for="(item, index) in amounts"
              :key="index"
              :isActive="amount.index"
              :class="{active:amount.index==index}"
              @click="changeColor(item, index)"
            >{{ item }}</li>
          </ul> -->
          <scale @slideVal='slideVal' :isShowMoney="isShowMoney" :initialSlide="initialSlide"></scale>
        </div>
        <div class="product">
          <div class="pro-title time">借款期限</div>
          <!-- <ul class="list-wrap clearfix">
            <li
              v-for="(item, index) in times"
              :key="index"
              :isActive2="time.index"
              :class="{active:time.index==index}"
              @click="changeColor2(item, index)"
            >{{ item.installments + flag }}</li>
          </ul> -->
          <ul class="list-wrap clearfix">
						<li :class="{'active': currentIndex == index}" v-for="(item, index) in repayProgramData.productShowList" :index="index" @click="clickPerList(item, index)" :key="index">
              {{item.productPeriod}}{{periodUnit}}
						</li>
					</ul>
        </div>
        <div class="rateDes">
          <strong>借款费用说明</strong>
          <p>
            利率按实际的借款月数收取，每月收取借款金额的{{ monthRate }}，
            实际利率将根据您的资料最终审核确定，提供真实有效的资料有助于提高您的审批通过率。
          </p>
        </div>
      </div>
    </scroller>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
  @import "~bowerComponents/sass-rem/_rem.scss";
  @import "../varibale.scss";
  .content {
    width: 100%;
    .rate-header {
      position: fixed;
      z-index: 999;
      top: 0;
      left: 0;
      width: 100%;
      height: rem(46px);
      background: transparent;
      .left-arrow, .black {
        position: absolute;
        width: 30px;
        height: 30px;
        top: 9px;
        left: 13px;
        z-index: 999;
        &:before {
          content: "";
          position: absolute;
          width: 12px;
          height: 12px;
          border: 1px solid #ccc;
          border-width: 1px 0 0 1px;
          transform: rotate(315deg);
          top: 8px;
          left: 7px;
          border-left: 1px solid #fff;
          border-top: 1px solid #fff;
        }
      }
      .left-arrow.black:before{
        border-left: 1px solid #333;
        border-top: 1px solid #333;
      }
      .bg {
        background: #fff;
        opacity: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        font-size: rem(17px);
        text-align: center;
        height: rem(46px);
        line-height: rem(46px);
        color: #333;
      }
      .title {
        width: 100%;
        font-size: rem(17px);
        text-align: center;
        height: rem(46px);
        line-height: rem(46px);
        color: #fff;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        &.black {
          color: #333;
        }
      }
    }
    .rateWrap {
      width: 100%;
      min-height: 100%;
      .rateUpBg {
        background:linear-gradient(90deg,rgba(98,98,98,1) 0%,rgba(51,51,51,1) 100%);
        padding-top: rem(78px);
        height: rem(48px);
        margin-bottom: rem(80px);
        .rateDesNumber {
          width: rem(345px);
          border-radius: 5px;
          margin: 0 auto;
          .rateDesHd {
            color: #fff;
            border-radius: 5px 5px 0 0;
            background:rgba(255,255,255,0.2043);
            li {
              float: left;
              width: 25%;
              text-align: center;
              height: rem(48px);
              line-height: rem(48px);
              color:#fff;
              font-size: rem(15px);
            }
            li:last-of-type {
              width: 50%;
            }
          }
          .rateDesCon {
            box-shadow:0px 4px 6px 0px rgba(153,153,153,0.1);
            border-radius:0px 0px 5px 5px;
            li {
              float: left;
              width: 25%;
              text-align: center;
              height: 2.1rem;
              line-height: 2.1rem;
              color: #A28462;
              font-size: rem(17px);
            }
            li:last-of-type {
              width: 50%;
            }
          }
        }
      }
      .product {
        margin: 0 auto;
        padding: 0 rem(15px);
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
        .swiper-container-wrap {
          color: #333;
          margin-bottom: rem(27px);
          .center-line {
            i {
              background: url("../images/vip/icon_slider_black.png") center center no-repeat;
              background-size: cover;
            }
          }
          .swiper-container {
            border: 1px solid #333;
          }
        }
        .list-wrap {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          li {
            float: left;
            width: rem(108px);
            height: rem(40px);
            line-height: rem(40px);
            text-align: center;
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
            background: $vip-theme-color;
						border: 1px solid $vip-theme-color;
						color: #fff;
          }
        }
        .cleatflex {
          zoom: 1;
        }
      }
      .rateDes {
        padding: 0 rem(15px);
        strong {
          font-size: rem(17px);
          color: #333;
          padding: rem(5px) 0 rem(8px) 0;
          display: block;
          font-weight: 400;
        }
        p {
          font-size: rem(15px);
          width: 100%;
          line-height: rem(21px);
          color: $gray-font-color;
          word-break: normal;
        }
      }
    }
  }
</style>

<script type="text/javascript">
  import { Scroller } from "vux";
  import Scale from "./Scale";
  export default {
    components: {
      Scale,
      Scroller
    },
    data() {
      return {
        opacity: 0,
        rateTitle: "费率计算",
        changeBlackColor: false,
        monthRate: "",
        isShowMoney: false,
        initialSlide: this.$route.query.vipMoneyVal - 1,
        repayProgramData: {},
        currentIndex: this.$route.query.currentIndex,
        loanProduct: '',
        installments: '',
        vipMoneyVal: this.$route.query.vipMoneyVal * 100,
        loanPayData: {},
        periodUnit: ""
      };
    },
    methods: {
      jump() {
        this.$router.go(-1);
      },
      onScroll(pos) {
        console.log('pos==', pos)
        let top = pos.top > 44 ? 44 : pos.top;
        if (pos.top > 44) {
          pos.top = 44;
          this.changeBlackColor = true;
        } else {
          this.changeBlackColor = false;
        }
        this.opacity = (1 / 44) * top;
        console.log(this.opacity)
      },
      slideVal(num) {
        if(!num) num = 0;
        this.vipMoneyVal = num * 100;
        this.loanPay()
      },
      getVipProductDetail(params){
        this.common.getVipProductDetail(params)
        .then((res)=>{
          this.repayProgramData = res.data;
          this.periodUnit = this.repayProgramData.periodUnit;

          this.clickPerList(res.data.productShowList[this.currentIndex], this.currentIndex);
          
        });
      },
      clickPerList(item, index){
        this.currentIndex = index;
        this.loanProduct = item.productId;
        this.installments = item.productPeriod;
        
        this.loanPay();
      },
      loanPay(){
        let loanPayData = new URLSearchParams();
        loanPayData.append("amount", this.vipMoneyVal);
        loanPayData.append("industryCode", 'XYVIP');
        loanPayData.append("days", this.installments * 30);

        this.common.loanPay(loanPayData)
        .then((res)=>{
          this.loanPayData = res.data;
          let lowRate = res.data.lowRate;
          let highRate = res.data.highRate;
          this.monthRate = lowRate + "%" + "-" + highRate + "%";
        });
      }
    },
    mounted () {
      let  custType = this.utils.getCookie("custType");
      if(custType != "KHL1" && custType != "KHL2"){
        custType = "KHL2";
      }
      // let RepayProgramData = new URLSearchParams();
      // RepayProgramData.append("userName", this.utils.getCookie("userName"));
      // RepayProgramData.append("industryCode", 'XYVIP');
      // RepayProgramData.append("merProId", '8665');
      // RepayProgramData.append("custType", custType);
      // RepayProgramData.append("supplierId", '2395');
      // RepayProgramData.append("saleSiteId", '2072');
      let vipProductDetailData = {};
      vipProductDetailData.userName = this.utils.getCookie("userName");
      vipProductDetailData.industryCode = "XYVIP";
      this.getVipProductDetail(vipProductDetailData);	//	VIP 借贷方案
    }
  }
</script>