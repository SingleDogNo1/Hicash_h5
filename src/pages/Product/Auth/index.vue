<template>
  <div class="Auth">
    <page-header
      :title="title"
      :showBack="showBack"
      :showBtnClose="showBtnClose"
      v-if="platform === 'H5'"
    ></page-header>
    <div class="newActive">
      <img src="./images/newHeaderSteats1.png" alt>
      <ul>
        <li class="active">身份认证</li>
        <li class="active">基本信息</li>
        <li class="active">信用认证</li>
      </ul>
    </div>
    <section class="creditMain">
      <div class="content front">
        <div class="tips">
          <span class="tipContent">
            身份证正面（卡片完整，字迹清晰）
            <img src="./images/tips.png" alt @click="photoIsShow">
          </span>
        </div>
        <div class="cardImg">
          <form action="">
            <i class="addImg"></i>
            <p>身份证正面</p>
            <input type="file" name="file">
          </form>
        </div>
        <ul class="first">
          <li class="idCardName">
            <span class="title">姓名</span>
            <span class="val">张政</span>
          </li>
          <li class="idCardNo">
            <span class="title">身份证号</span>
            <span class="val">120110199309151832</span>
          </li>
        </ul>
      </div>
      <div class="content opposite">
        <div class="cardImg">
          <form action>
            <i class="addImg"></i>
            <p>身份证反面</p>
            <input type="file" name="file">
          </form>
        </div>
        <ul class="second">
          <li class="idCardTime">
            <span class="title">有效期限</span>
            <span class="val">2018.01.12</span>
          </li>
        </ul>
      </div>
      <div class="nextStep">
        <a href="javascript:;" id="authNextBtn" @click="nextStep">下一步</a>
      </div>
    </section>
    <Confirm
      v-model="isShowDialog"
      :title="dialogTitle"
      :confirm-text="confirmText"
      :cancel-text="cancelText"
      class="confirmDialog"
      @on-confirm="onConfirm"
      @on-cancel="onCancel"
    >
      <div class="dialog-content">视频校验失败！</div>
    </Confirm>
    <alert v-model="showAlert" class="alertDialog" :title="alertTitle">
      <div class="alertContent">
        <dl v-for="(item, index) in items" :key="index">
          <dt>
            <img :src="item.src" alt>
          </dt>
          <dd>
            <h1>{{ item.title }}</h1>
            <span>{{ item.content }}</span>
          </dd>
        </dl>
      </div>
    </alert>
    <Popup
      v-model="isPopupShow"
      :height="height"
      :hide-on-blur="hideOnBlur"
      :width="width"
      :position="position"
      :show-mask="showMask"
      :hide-on-deactivated="hideOnDeactivated"
      :should-rerender-on-show="shouldRerenderOnShow"
    >
      <div class="video-wrap">
        <div class="v-content">
          <div class="v-title">录制一段自己朗读如下数字的视频</div>
          <div class="first">
            <div class="v-img">
              <img src="./images/selfTimer.png" alt>
            </div>
            <div class="v-tips">
              <p class="tipContent">
                请使用&nbsp;&nbsp;
                <span>前置摄像头</span>
                <br>请用&nbsp;&nbsp;
                <span>普通话</span>&nbsp;&nbsp;读&nbsp;&nbsp;
                <span>一遍</span>
                视频时长&nbsp;&nbsp;
                <span>3-5秒</span>
              </p>
            </div>
          </div>
          <div class="v-num">
            <span>3333</span>
          </div>
        </div>
        <div class="v-notice">
          <span>查看&nbsp;
            <span @click="videoIsShow">拍摄须知</span>
          </span>
        </div>
        <div class="startPlayBtn">
          <form action="">
            <span>开始录制视频</span>
            <input type="file" name="file">
          </form>
        </div>
        <div class="exit">
          <span @click="exit">退出验证</span>
        </div>
      </div>
    </Popup>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
@import "~bowerComponents/sass-rem/_rem.scss";
.Auth {
  height: rem(800px);
  background: rgb(239, 239, 244);
  .newActive {
    width: 100%;
    height: rem(107px);
    background: #fc905c;
    margin-top: rem(65px);
    text-align: center;
    img {
      display: inline-block;
      width: rem(218px);
      height: rem(54px);
      margin-top: rem(16px);
    }
    ul {
      clear: both;
      width: rem(220px);
      height: rem(20px);
      margin: 0 auto;
      position: relative;
      .active {
        width: rem(56px);
        font-family: PingFangSC-Regular;
        font-size: rem(14px);
        color: #333333;
        letter-spacing: 0;
        float: left;
        margin-right: rem(26px);
      }
      .active:last-of-type {
        margin-right: rem(-26px);
      }
    }
  }
  .creditMain {
    width: 100%;
    height: rem(560px);
    padding-top: rem(32px);
    .content {
      width: 100%;
      .tips {
        width: 100%;
        height: rem(21px);
        margin-bottom: rem(20px);
        .tipContent {
          display: inline-block;
          width: 100%;
          height: rem(21px);
          text-align: center;
          font-size: rem(15px);
          font-weight: normal;
          color: #333333;
          letter-spacing: rem(0px);
          line-height: rem(21px);
          opacity: 1;
          img {
            display: inline-block;
            position: relative;
            top: 0.12rem;
            width: rem(16px);
            height: rem(16px);
          }
        }
      }
      .cardImg {
        width: rem(207px);
        height: rem(132px);
        background: #ffffff;
        border: 1px solid #dddddd;
        border-radius: 4px;
        margin: auto;
        position: relative;
        .takeIdcard {
          width: rem(207px);
          height: rem(132px);
          display: inline-block;
          margin-top: 0.141875rem;
          object-fit: contain;
        }
        form {
          width: rem(207px);
          height: rem(132px);
          position: absolute;
          i {
            width: rem(43px);
            height: rem(43px);
            display: inline-block;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: rem(-207px/2);
            margin-top: rem(-132px/2);
          }
          p {
            width: rem(207px);
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #999999;
            letter-spacing: 0;
            text-align: center;
            padding-top: rem(94px);
            position: absolute;
            display: inline-block;
          }
          input {
            width: rem(207px);
            height: rem(132px);
            outline: none;
            opacity: 0;
            cursor: pointer;
            position: absolute;
          }
        }
      }
      ul {
        margin-top: rem(30px);
        margin-bottom: rem(35px);
        width: 100%;
        height: rem(96px);
        background: #fff;
        padding-left: rem(15px);
        li {
          width: 100%;
          height: rem(47px);
          background-color: #fff;
          font-size: rem(15px);
          color: #333333;
          clear: both;
          .title {
            width: 30%;
            height: rem(47px);
            line-height: rem(47px);
            display: block;
            float: left;
            text-align: left;
          }
          .val {
            width: calc(70% - rem(10px));
            height: rem(47px);
            line-height: rem(47px);
            display: block;
            float: right;
            text-align: right;
            padding-right: rem(30px);
          }
        }
        .idCardName {
          border-bottom: 1px solid #ddd;
        }
      }
      .second {
        border: none;
        margin-top: rem(24px);
        margin-bottom: rem(30px);
        width: 100%;
        height: rem(47px);
        background: #fff;
      }
    }
    .nextStep {
      width: 100%;
      height: rem(44px);
      margin-bottom: rem(30px);
      border-radius: 5px;
      text-align: center;
      a {
        display: inline-block;
        width: rem(345px);
        background-color: #333333;
        height: rem(44px);
        border-radius: rem(5px);
        font-size: rem(15px);
        line-height: rem(44px);
        color: #fff;
      }
    }
  }
  .confirmDialog {
    .weui-dialog {
      width: rem(270px);
      .weui-dialog__hd {
        padding: 0;
        width: 100%;
        height: 48px;
        line-height: 40px;
        background: #ff7640;
        border-radius: 5px 5px 0px 0px;
        .weui-dialog__title {
          font-family: PingFangSC-Regular;
          font-size: 17px;
          color: #ffffff;
        }
      }
      .weui-dialog__bd {
        .dialog-content {
          padding: 0;
          width: 100%;
          height: 88px;
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #333333;
          letter-spacing: -0.08px;
          text-align: center;
          line-height: 88px;
        }
      }
      .weui-dialog__ft {
        .weui-dialog__btn_default {
          font-family: PingFangSC-Regular;
          font-size: 15px;
          color: #ff7640;
          letter-spacing: -0.36px;
          text-align: center;
        }
        .weui-dialog__btn_primary {
          font-family: PingFangSC-Regular;
          font-size: 15px;
          color: #999999;
          letter-spacing: -0.36px;
          text-align: center;
        }
      }
    }
  }
  .alertDialog {
    .weui-dialog {
      max-width: 100%;
      .weui-dialog__hd {
        padding: 0;
        width: 100%;
        height: rem(21px);
        padding-top: rem(20px);
        .weui-dialog__title {
          display: inherit;
          font-family: PingFangSC-Regular;
          font-size: rem(15px);
          color: #333333;
          letter-spacing: 0;
        }
      }
      .weui-dialog__bd {
        width: 100%;
        padding: 0;
        .alertContent {
          width: 100%;
          dl {
            padding: 24px 20px 0 30px;
            overflow: hidden;
            width: rem(255px);
            height: rem(83px);
            dt {
              float: left;
              width: rem(76px);
              height: rem(80px);
            }
            img {
              width: rem(68.6px);
              height: rem(73.5px);
            }
          }
          dl:last-of-type {
            padding-bottom: rem(37px);
          }
          dd {
            width: rem(165px);
            height: rem(53px);
            text-align: left;
            display: inline-block;
            float: right;
            h1 {
              font-size: rem(17px);
              color: #333333;
              letter-spacing: 0;
              font-weight: normal;
            }
            span {
              line-height: rem(21px);
              font-family: PingFangSC-Regular;
              font-size: rem(15px);
              color: #999999;
              letter-spacing: 0;
              text-align: left;
              display: inline-block;
              margin-top: 8px;
            }
          }
        }
      }
      .weui-dialog__btn {
        font-family: PingFangSC-Regular;
        font-size: rem(15px);
        color: #ff7640;
        letter-spacing: -0.36px;
        text-align: center;
      }
    }
  }
  .vux-popup-dialog {
    background: rgb(239, 239, 244);
    .video-wrap {
      width: rem(345px);
      margin: auto;
      .v-content {
        width: 100%;
        height: rem(375px);
        margin-top: rem(16px);
        text-align: center;
        background: #fff;
        .v-title {
          width: rem(249px);
          height: rem(24px);
          margin: auto;
          font-family: PingFangSC-Regular;
          font-size: rem(17px);
          color: #333333;
          letter-spacing: -0.41px;
          padding-top: rem(24px);
        }
        .first {
          width: rem(282px);
          height: rem(138px);
          margin: auto;
          margin-top: rem(32px);
          overflow: hidden;
          .v-img {
            width: rem(107px);
            display: inline-block;
            float: left;
            img {
              width: rem(107px);
            }
          }
          .v-tips {
            width: rem(143px);
            height: rem(95px);
            font-family: PingFangSC-Regular;
            font-size: rem(15px);
            color: #999999;
            letter-spacing: -0.36px;
            text-align: left;
            display: inline-block;
            float: right;
            p {
              line-height: rem(37px);
              span {
                font-family: PingFangSC-Regular;
                font-size: rem(15px);
                color: #ff7640;
                letter-spacing: -0.36px;
              }
            }
          }
        }
        .v-num {
          width: rem(259px);
          margin: auto;
          margin-top: rem(24px);
          span {
            display: inline-block;
            width: 100%;
            height: rem(95px);
            font-family: PingFangSC-Semibold;
            font-size: rem(68px);
            color: #ff7640;
            letter-spacing: rem(18px);
            font-weight: normal;
          }
        }
      }
      .v-notice {
        width: 100%;
        height: rem(21px);
        margin: auto;
        font-family: PingFangSC-Regular;
        font-size: rem(15px);
        color: #999999;
        letter-spacing: -0.36px;
        text-align: right;
        margin-top: rem(16px);
        span {
          span {
            font-family: PingFangSC-Regular;
            font-size: rem(15px);
            color: #ff7640;
            letter-spacing: -0.36px;
            line-height: rem(21px);
          }
        }
      }
      .startPlayBtn {
        width: 100%;
        height: rem(44px);
        background: #333333;
        border-radius: 5px;
        text-align: center;
        line-height: rem(40px);
        margin-top: rem(24px);
        position: relative;
        form{
          width: 100%;
          height: rem(44px);
          position: absolute;
          span {
            position: absolute;
            display: inline-block;
            font-family: PingFangSC-Regular;
            font-size: rem(15px);
            color: #ffffff;
            letter-spacing: 0;
            width: rem(90px);
            height: rem(21px);
            left: rem(128px);
          }
          input {
            opacity: 0;
            cursor: pointer;
            width: 100%;
            height: rem(44px);
            outline: none;
          }
        }
      }
      .exit {
        width: 100%;
        height: rem(21px);
        text-align: center;
        margin-top: rem(32px);
        span {
          font-family: PingFangSC-Regular;
          font-size: rem(15px);
          color: #999999;
          letter-spacing: -0.36px;
          display: inherit;
        }
      }
    }
  }
}
</style>

<script>
import { Alert, Popup, Confirm } from "vux";
import PageHeader from "@/components/PageHeader.vue";
import axios from "axios";

export default {
  components: {
    PageHeader,
    Confirm,
    Alert,
    Popup
  },
  data() {
    return {
      title: this.$router.history.current.meta.title,
      showBack: true,
      showBtnClose: true,
      platform: this.utils.getPlatform(),
      isShowDialog: false, //录制失败弹出框标识
      dialogTitle: "提示",
      dialogDefaultTitle: "",
      showAlert: false,
      alertTitle: "",
      items: [],
      photoItems: [
        {
          src: require("./images/completeCorner.png"),
          title: "边角完整",
          content: "确认证件完全处于图片内"
        },
        {
          src: require("./images/clearFont.png"),
          title: "字体清晰",
          content: "保证精准对焦，使证件上文字和照片清晰可见"
        },
        {
          src: require("./images/uniformBrightness.png"),
          title: "亮度均匀",
          content: "避免图片出现遮挡光线、反光等情况"
        }
      ],
      videoItems: [
        {
          src: require("./images/faceToScreen.png"),
          title: "正对屏幕",
          content: "确认人脸完全处于镜头内"
        },
        {
          src: require("./images/clearOutline.png"),
          title: "轮廓清晰",
          content: "保证精准对焦，使人像清晰可见"
        },
        {
          src: require("./images/videoBrightness.png"),
          title: "亮度均匀",
          content: "避免视频出现遮挡光线、反光等情况"
        }
      ],
      confirmText: "如何录制",
      cancelText: "重新录制",
      position: "bottom",
      isPopupShow: false,
      height: "94%",
      hideOnBlur: false,
      width: "100%",
      showMask: false,
      hideOnDeactivated: false,
      shouldRerenderOnShow: true
    };
  },
  methods: {
    photoIsShow() {
      this.items = this.photoItems;
      this.alertTitle = "证件拍摄须知";
      this.showAlert = true;
    },
    videoIsShow() {
      this.items = this.videoItems;
      this.alertTitle = "视频录制须知";
      this.showAlert = true;
    },
    onConfirm () {
      this.items = this.videoItems;
      this.alertTitle = "视频录制须知";
      this.showAlert = true;
    },
    onCancel () {
      console.log("重新录制")
    },
    nextStep() {
      this.isPopupShow = true;
    },
    exit() {
      this.isPopupShow = false;
    }
  },
  computed: {},
  mounted() {}
};
</script>
