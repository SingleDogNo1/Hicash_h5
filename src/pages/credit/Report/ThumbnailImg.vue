<template>
  <!--<transition name="slide-go">-->
    <div class="thumbnail-img">
      <img :src="imgUrl">
      <div class="tips">
        <img src="./images/icon_qrcode_operator.png" alt>
        <span>长按/扫描识别二维码，查看详情</span>
      </div>
    </div>
  <!--</transition>-->
</template>

<script>
export default {
  name: "ThumbnailImg",
  data() {
    return {
      imgUrl: this.$route.params.imgUrl || localStorage.getItem("imgUrl")
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";
.thumbnail-img {
  img {
    display: block;
    width: 90%;
    height: auto;
    margin: 0 auto;
    margin-top: rem(-45px);
  }
  .tips {
    width: 86%;
    margin: rem(20px) auto;
    height: rem(50px);
    line-height: rem(50px);
    font-size: 14px;
    display: flex;
    padding-bottom: rem(20px);
    //justify-content: space-between;
    //align-content: center;
    img {
      display: inline-block;
      width: 50px;
      height: 50px;
      margin: 0;
      margin-right: rem(20px);
    }
    span {
      display: inline-block;
    }
  }
}
// .slide-up-enter-active,
// .slide-up-leave-active {
//   transition: all 0.5s;
// }

// .slide-up-enter,
// .slide-up-leave-to {
//   opacity: 0;
//   transform: translate3d(0, 100%, 0);
// }

// .slide-go-enter-active,
// .slide-go-leave-active {
//   transition: all 0.5s;
//   opacity: 0.8;
// }

// .slide-go-enter,
// .slide-go-leave-to {
//   transition: all 0.5s;
//   transform: translate3d(100%, 0, 0);
//   opacity: 0.8;
// }

// .slide-back-enter-active,
// .slide-back-leave-active {
//   transition: all 0.5s;
// }

// .slide-back-enter,
// .slide-back-leave-to {
//   transition: all 0.5s;
//   transform: translate3d(-100%, 0, 0);
// }
</style>

