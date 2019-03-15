<template>
  <div class="box">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in historyList" :key="index">
          <p :class="{'txt':index==activeIndex}">{{item.detail}}元</p>
          <p :class="[{'circular':index!=activeIndex},{'circulars':index==activeIndex}]"></p>
          <p class="line" v-show="index!=11"></p>
          <p>{{item.date}}月</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";

export default {
  data() {
    return {
      activeIndex: "",
      historyList: [
        { detail: "11", date: "1" },
        { detail: "12", date: "2" },
        { detail: "13", date: "3" },
        { detail: "14", date: "4" },
        { detail: "15", date: "5" },
        { detail: "16", date: "6" },
        { detail: "17", date: "7" },
        { detail: "18", date: "8" },
        { detail: "19", date: "9" },
        { detail: "20", date: "10" },
        { detail: "21", date: "11" },
        { detail: "21", date: "12" }
      ]
    };
  },
  mounted() {
    this.getData();

  },
  methods: {
    getData() {
      setTimeout(() => {
        let mySwiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          slidesPerView: 'auto',
          centeredSlides: true, //滑块居中
          spaceBetween: 0,
          onSlideChangeStart: swiper => {
            this.activeIndex = swiper.activeIndex;
            // console.log(this.activeIndex)
            this.$forceUpdate();
          },
          onInit:swiper=>{
            swiper.slideTo(12)
          }
          // slidesPerView: "auto",
        });
      }, 100);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";

.box {
  .swiper-container {
    padding-top: rem(10px);
    .swiper-wrapper {
      width: rem(644px);
      display: flex;
      align-items: center;
      .swiper-slide {
        width: rem(56px);
        font-family: PingFangSC-Regular;
        font-size: rem(11px);
        color: #999999;
        letter-spacing: 0;
        text-align: center;
        position: relative;
        margin-right: 0;
        .circular {
          display: inline-block;
          border: 1px solid #cccccc;
          width: rem(9px);
          height: rem(9px);
          border-radius: 50%;
          margin: rem(7px) 0 rem(9px);
          background: #fff;
        }
        .circulars {
          border: rem(6px) solid #ff7640;
          display: inline-block;
          width: rem(6px);
          height: rem(6px);
          border-radius: 50%;
          margin: rem(7px) 0 rem(9px);
          background: #fff;
        }
        .line {
          width: 100%;
          // display: inline-block;
          height: rem(1px);
          line-height: rem(1px);
          background: #999;
          position: absolute;
          right: -50%;
          top: 45%;
          z-index: -1;
        }
        .txt {
          font-size: rem(15px);
          color: #ff7640;
          height: rem(15px);
          position: relative;
          top: rem(-6px);
        }
      }
    }
  }
}
</style>
