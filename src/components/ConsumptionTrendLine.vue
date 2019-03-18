<template>
  <div id="swiper-history">
    <div class="swiper-container">
      <div class="swiper-pagination"></div>
      <div class="swiper-wrapper"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modifier: 1.8,
      historyList: [
        { detail: "69元", date: "2018-03-01" },
        { detail: "12345元", date: "2018-04-01" },
        { detail: "12345元", date: "2018-05-01" },
        { detail: "12345元", date: "2018-06-01" },
        { detail: "12345元", date: "2018-07-01" },
        { detail: "12345元", date: "2018-08-01" },
        {
          detail: "12345元",
          date: "2018-09-01"
        },
        { detail: "12345元", date: "2018-10-01" },
        { detail: "12345元", date: "2018-11-01" },
        { detail: "12345元", date: "2018-12-01" },
        { detail: "12345元", date: "2019-01-01" },
        { detail: "12345元", date: "2019-02-01" },
        { detail: "12345元", date: "2019-03-01" }
      ],
      historyListShow: [
        { detail: "69元", date: "3月" },
        { detail: "12345元", date: "2月" },
        { detail: "12345元", date: "1月" },
        { detail: "12345元", date: "2018.12" },
        { detail: "12345元", date: "2018.11" },
        { detail: "12345元", date: "2018.10" },
        {
          detail: "12345元",
          date: "2018.09"
        },
        { detail: "12345元", date: "2018.08" },
        { detail: "12345元", date: "2018.07" },
        { detail: "12345元", date: "2018.06" },
        { detail: "12345元", date: "2018.05" },
        { detail: "12345元", date: "2018.04" },
        { detail: "12345元", date: "2018.03" }
      ]
    };
  },
  methods: {
    init() {
      this.historyListShow = this.historyListShow.reverse();
      var mySwiper = new Swiper("#swiper-history .swiper-container", {
        virtualTranslate: true,
        preventClicks: false,
        pagination: "#swiper-history .swiper-pagination",
        paginationBulletRender: (swiper, index, className) => {
          let marginLeft, time;
          if (index > 0) {
            var day1 = new Date(
              this.historyList[index]["date"].replace(/-/g, "/")
            );
            var day2 = new Date(
              this.historyList[index - 1]["date"].replace(/-/g, "/")
            );
            time = day1 - day2;
            marginLeft = parseInt(time / (1000 * 60 * 60 * 24)) * this.modifier;
          } else {
            marginLeft = 0;
          }
          return (
            '<div class="line-wrap"><p class="amount amount'+
            index + '">' +
            this.historyListShow[index]["detail"] +
            '</p><span class="' +
            className +
            '" style="margin-left:' +
            marginLeft +
            'px;display:block"></span><p class="current-date current-date' +
            index + '">' +
            this.historyListShow[index]["date"] +
            "</p></div>"
          );
        },

        onInit: swiper => {
          let mySlides = "";
          for (var i = 0; i < this.historyList.length; i++) {
            swiper.appendSlide(
              '<div class="swiper-slide slide' +
                i +
                '"><span class="detail">' +
                this.historyList[i]["detail"] +
                '</span><span class="date">' +
                this.historyList[i]["date"] +
                "</span></div>"
            );
            // swiper.slides[i].style.transform =
            //   "translate3d(" + -i * swiper.width + "px, 0px, 0px)";
          }
          swiper.slideTo(12);
        },
        onSlideChangeStart: swiper => {
          let moveDay1, moveDay2, moveTime, moveDistance, move;
          let currentAmount = ".amount" + swiper.activeIndex;
          let currentDate = ".current-date" + swiper.activeIndex;
          let prevAmount = ".amount" + swiper.previousIndex;
          let currentAmountEl = document.querySelector(currentAmount);
          let prevAmountEl = document.querySelector(prevAmount);
          let firstAmountEl = document.querySelector(".amount0");
          let firstDateEl = document.querySelector(".current-date0");
          currentAmountEl.style.color = "#FF7640";
          currentAmountEl.style.fontSize = "15px";
          currentAmountEl.style.top = "-5px";
          prevAmountEl.style.color = "#999999";
          prevAmountEl.style.fontSize = "11px";
          prevAmountEl.style.top = "-2px";
          firstAmountEl.style.right = "20px";
          firstDateEl.style.right = "20px";

          moveDay1 = new Date(
            this.historyList[swiper.activeIndex]["date"].replace(/-/g, "/")
          );
          moveDay2 = new Date(this.historyList[0]["date"].replace(/-/g, "/"));
          moveTime = moveDay1 - moveDay2;
          moveDistance =
            parseInt(moveTime / (1000 * 60 * 60 * 24)) * this.modifier +
            10 * swiper.activeIndex;
          move = swiper.width / 2 - 5 - moveDistance;

          swiper.paginationContainer[0].style.left = move + "px";
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
#swiper-history {
  width: 100%;
  max-width: 820px;
  position: relative;
  .swiper-container {
    height: 100px;
    margin: 0 auto;
    /deep/ .swiper-slide {
      span {
        display: inline-block;
        width: 100%;
        text-align: center;
        position: absolute;
        //transition: 700ms;
        &.detail {
          height: 20px;
          line-height: 20px;
          top: 9px;
          opacity: 0;
          font-size: 15px;
          color: #ff7640;
        }
        &.date {
          position: absolute;
          bottom: 12px;
          opacity: 0;
          font-size: 11px;
          color: #999999;
        }
      }
    }
    .swiper-slide-active {
      // span {
      //   transition: 700ms 700ms;
      // }
    }
    /deep/ .swiper-pagination-bullets {
      display: flex;
      align-content: center;
      white-space: nowrap;
      width: auto;
      bottom: 50px;
      height: 24px;
      //transition: 700ms;
      border-bottom: 1px solid #eeeeee;
      .swiper-pagination-bullet {
        margin: 0;
        background: #fff;
        border: 1px solid #cccccc;
        opacity: 1;
      }
      .swiper-pagination-bullet-active {
        position: relative;
        width: 15px;
        height: 15px;
        border: 1px solid #ff7640;
        background: #ff7640;
        &:after {
          width: 5px;
          height: 5px;
          border-radius: 100%;
          background-color: #fff;
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(1);
        }
      }
      .line-wrap {
        display: flex;
        align-items: center;
        height: 50px;
        position: relative;
        .amount {
          font-size: 11px;
          width: 100%;
          top: -2px;
          position: absolute;
          color: #999999;
          text-align: center;
          right: -23px;
        }
        .current-date {
          font-size: 11px;
          width: 100%;
          bottom: -5px;
          position: absolute;
          text-align: center;
          right: -23px;
          color: #999999;
        }
      }
    }
  }
}
</style>
