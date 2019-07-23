<template>
  <div class="content" @click="closeMsg" @touchmove="touchmove" @touchstart="touchstart">
    <download-pop v-if="this.utils.getPlatform() != 'APP'"></download-pop>
    <header class="home-header">
      <div class="bg" :style="'opacity:' + opacity"></div>
      <div class="title" :style="'opacity:' + opacity">{{appName}}</div>
      <router-link :to="{ name: 'notice' }">
        <img width="22px" :src="noticeIcon">
      </router-link>
    </header>
    <scroller lock-x @on-scroll="onScroll" ref="scroller">
      <div class="wrap">
        <swiper
          :list="bannerList"
          :show-desc-mask="false"
          :show-dots="showDots"
          dots-position="center"
          :auto="true"
          :loop="true"
          :interval="5000"
        ></swiper>
        <div class="products">
          <div class="product-lists">
            <ul>
              <li v-for="(item, index) in productsList" :id="item.industryCode" :key="index">
                <a :href="item.url">
                  <img :src="item.img">
                </a>
              </li>
            </ul>
          </div>
        </div>
        <h3 class="title">新手指南</h3>
        <ul class="small-banner-list">
          <li v-for="(item, index) in smallBannerList" :key="index">
            <a :href="item.url">
              <img
                :src="item.img"
              >
            </a>
          </li>
        </ul>
        <div class="footer-tips">客服热线：{{customerNum}}</div>
      </div>
    </scroller>
    <div v-transfer-dom>
      <x-dialog
        v-model="adShow"
        :hide-on-blur="true"
        class="ad-pop"
        v-for="(item, index) in adList"
        :key="index"
      >
        <div class="img-box">
          <a :href="item.adPicLink">
            <img :src="item.picPrefixUrl + item.adPic" style="width: 100%; height:100%">
          </a>
        </div>
        <div @click="adShow = false" class="ad-close">
          <!-- <span class="vux-close"></span> -->
        </div>
      </x-dialog>
    </div>
    <alert v-model="shortcutPopup" title="创建桌面图标" @click="closeAlertDiv">
      <span class="share-tips">添加到桌面将有助于提高您的借款效率！</span>
      <div class="ios_tip" v-if="iosIsShow">
        <br>点击页面下方的
        <span class="collect"></span>按钮，在弹出的菜单中选择【添加至主屏幕】即可。
        <div class="collect_arrow"></div>
      </div>
      <div class="android_tip" v-if="androidIsShow">
        <ul>
          <li>
            <span class="circle"></span>请点击浏览器底部设置按钮—添加书签—手机桌面—确定
          </li>
          <li>
            <span class="circle"></span>（部分机型）请点击浏览器底部设置按钮—工具箱—添加快捷方式—手机桌面—确定
          </li>
        </ul>
      </div>
    </alert>

    <div @touchmove="drag($event)" class="drag" @click.stop="shortcutPopup=true">
      <span class="iconfont icon-zhuomiankuaijiefangshi2"></span>
    </div>
    <!-- <iframe id="oldHicash" :src="oldHicash"></iframe> -->
    <page-footer></page-footer>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";
@import "../varibale.scss";
body {
  background: #f2f2f2 !important;
}
.icon-zhuomiankuaijiefangshi2 {
  width: rem(77px);
  height: rem(78px);
  display: block;
}
.icon-zhuomiankuaijiefangshi2{
  background: url("../images/home/collectHicash.png");
  background-repeat: no-repeat;
  background-size: 100%;
  width: 100%;
  height: 100%;
}
.content {
  width: 100%;
  height: auto;
  //background: #F0F0F0;
  background:linear-gradient(180deg,rgba(240,240,240,1) 0%,rgba(255,255,255,1) 100%);
  header.home-header {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: rem(44px);
    background: transparent;
    .collect-btn {
      font-size: 15px;
      height: rem(44px);
      line-height: rem(44px);
      padding-left: 20px;
      color: #FFF;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 3;
    }
    .collect-btn2 {
      font-size: 15px;
      height: rem(44px);
      line-height: rem(44px);
      margin-left: 20px;
      color: #3f3f3f;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 3;
      opacity: 1;
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
      height: rem(44px);
      line-height: rem(44px);
      color: #3f3f3f;
    }
    .title {
      width: 100%;
      font-size: rem(17px);
      text-align: center;
      height: rem(44px);
      line-height: rem(44px);
      color: #3f3f3f;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
    }
    img {
      top: rem(13px);
      right: rem(10px);
      z-index: 2;
      position: absolute;
      width: 22px;
      display: block;
    }
  }
  .wrap {
    height: auto;
    position: relative;
  }
  .vux-slider {
    z-index: 2;
    /deep/ .vux-indicator {
      bottom: 25px;
      i {
        width: rem(10px);
        height: rem(2px);
        background-color: #fff;
        opacity: 0.2006;
        &.active {
          background-color: #fff;
          opacity: 1;
        }
      }
    }
  }
  .products {
    position: relative;
    width: auto;
    height: auto;
    padding: 0 rem(15px);
    margin-top: rem(-25px);
    margin-bottom: rem(25px);
    z-index: 1000;
    .product-lists {
      width: 100%;
      height: auto;
      margin: 0 auto;
      position: relative;
      ul li {
        width: 100%;
        height: auto;
        img {
          width: 100%;
        }
      }
    }
  }
  .title {
    padding: 0 rem(15px);
    font-size: rem(17px);
    font-weight: 400;
  }
  .small-banner-list {
    padding: 0 rem(15px);
    li {
      width: 100%;
      height: rem(74px);
      box-shadow: 0px 4px 6px 0px rgba(153,153,153,0.1);
      border-radius: 4px;
      margin-top: rem(8px);
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .footer-tips {
    width: 100%;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: rem(13px);
    color: $gray-font-color;
    letter-spacing: 0;
    margin-top: rem(20px);
    margin-bottom: rem(18px);
  }

  .vux-slider > .vux-indicator > a > .vux-icon-dot.active,
  .vux-slider .vux-indicator-right > a > .vux-icon-dot.active {
    background-color: #fff !important;
  }

  .ad-pop {
    .weui-dialog {
      width: 11.675rem !important;
      height: 15.85rem !important;
      padding-bottom: 8px;
      border-radius: 0 !important;
      overflow: auto !important;
    }
    .dialog-title {
      line-height: 30px;
      color: #666;
    }
    .img-box {
      height: 100%;
      overflow: hidden;
      img {
        border-radius: 10px;
      }
    }
    .ad-close {
      position: absolute;
      width: 1.375rem;
      height: 1.375rem;
      top: -2.075rem;
      right: 0;
      background: none;
      display: block;
      z-index: 99999;
      &:before {
        position: absolute;
        content: "";
        width: 1.375rem;
        height: 1.375rem;
        background: url("../images/home/ad-close.png");
        background-size: 1.375rem 1.375rem;
        font-family: "iconfont";
        font-size: 1.375rem;
        color: #fff;
        top: 0;
        left: 0;
      }
    }
  }

  .drag {
    width: 66px;
    height: 80px;
    margin: 0;
    padding: 0px;
    border-radius: 5px;
    position: absolute;
    right: 10px;
    bottom: 30%;
    z-index: 999;
  }
  /deep/ .weui-dialog {
    width: 92%;
    height: rem(230px);
    max-width: rem(345px);
    margin-bottom: 1rem;
    .weui-dialog__hd {
      width: 100%;
      height: 2.4rem !important;
      padding: 0px !important;
      color: #000 !important;
      background: #fff !important;
      .weui-dialog__title {
        display: inline-block;
        width: 100%;
        font-weight: bold;
        font-size: 22px;
        text-align: left;
        margin: 20px 0 16px 20px;
      }
    }
    .weui-dialog__bd {
      width: 92%!important;
      margin: -1.5rem auto;
      min-height: 40px;
      font-size: 14px!important;
      line-height: 1.1rem;
      word-wrap: break-word;
      word-break: break-all;
      color: #666!important;
      text-align: left;
      border: none;
      .share-tips {
        display: inline-block;
        font-size: 13px !important;
        color: $gray-font-color;
        padding: 1.5rem 0 0 0;
      }
      .collect {
        display: inline-block;
        width: 0.6rem;
        height: 0.6rem;
        background: url("../images/home/share.png");
        background-repeat: no-repeat;
        background-size: contain;
        margin: -1px 1px;
      }
      .android_tip {
        margin-top: 1rem;
        padding-left: 5px;
        li {
          font-size: 13px;
          margin-top: 13px;
          .circle {
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #ff7640;
            margin-right: 10px;
          }
        }
      }
    }
    .collect_arrow {
      width: 100%;
      height: 2rem;
      background: url("../images/home/downArrow.png");
      background-repeat: no-repeat;
      background-size: 11.5%;
      background-position-x: center;
      position: relative;
      bottom: -2rem;
    }
    .weui-dialog__ft {
      display: none;
    }
  }
}
</style>

<script type="text/javascript">
import { Swiper, Scroller, XDialog, TransferDom, Alert } from "vux";

import PageFooter from "@/components/PageFooter.vue";
import downloadPop from "@/components/downloadPop.vue";

import noticeWIcon from "../images/home/icon-notice-w.png";
import noticeBIcon from "../images/home/icon-notice.png";
import "../../../src/assets/js/youmeng.js";
import Index from "@/api/index";

export default {
  components: {
    Swiper,
    PageFooter,
    downloadPop,
    Scroller,
    XDialog,
    Alert
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      opacity: 0,
      titleOpacity: 0,
      oldHicash: "",
      allLoanApplication: "0",
      quickRepaymentUrl: "",
      adShow: false,
      adList: [],
      bannerList: [],
      productsList: [],
      smallBannerList: [],
      noticeIcon: noticeWIcon,
      showDots: false,
      tags: null,
      shortcutPopup: false,
      iosIsShow: false,
      androidIsShow: false,
      moveEndY: "",
      startY: "",
      customerServiceShow: false,
      scIsShow: true,
      scIsShow2: false,
      customerNum: "",
      appName: ""
    };
  },
  ready() {},
  methods: {
    onScroll: function(pos) {
      let top = pos.top > 44 ? 44 : pos.top;
      if (pos.top > 44) {
        pos.top = 44;
        this.scIsShow2 = true;
        this.scIsShow = false;
        this.noticeIcon = noticeBIcon;
      } else {
        this.scIsShow2 = false;
        this.scIsShow = true;
        this.noticeIcon = noticeWIcon;
      }

      this.opacity = (1 / 44) * top;
      console.log(this.opacity)
    },
    getIndexData() {
      Index.indexMain().then( res => {
        let data = res.data;
        if(data.resultCode === "1") {
          let bannerList = [];
          _.each(data.topBanner, v => {
            const item = {
              url: v.picUrl,
              img: v.picPrefixUrl + v.bigPic
            };
            bannerList.push(item);
          });
          this.bannerList = bannerList;
          if (this.bannerList.length > 1) {
            this.showDots = true;
          }

          let smallBannerList = [];
          _.each(data.bottomBanner, v => {
            const item = {
              url: v.picUrl,
              img: v.picPrefixUrl + v.smallPic
            };
            smallBannerList.push(item);
          });
          this.smallBannerList = smallBannerList;
          console.log(this.smallBannerList)

          let arr = [];
          _.each(data.productList, v => {
            if (v.showStatus == "1") {
              let obj = {
                img: v.productShowImg,
                industryCode: v.industryCode
              };
              if (v.industryCode == "XYFQ") {
                obj.url = "/#/product/hmfq?industryCode=" + v.industryCode;
              } else if (v.industryCode == "XYVIP") {
                obj.url = "/#/product/vip";
              }
              arr.push(obj);
            }

            if (arr.length) {
              this.productsList = arr;
            }
          });

          this.customerNum = data.customerNum;
        } else {
          this.$vux.toast.show({
            type: "text",
            position: "middle",
            text: data.resultMsg
          });
        }
      })
    },
    getHomePagePic: function(params) {
      let _this = this;
      _this.common.getHomePagePic(params).then(function(res) {
        if (params.cityCode === "000003") {
          let bannerList = [];
          _.each(res.data.bannelList, function(v) {
            const item = {
              url: v.picUrl,
              img: v.picPrefixUrl + v.picBigUrl
            };
            bannerList.push(item);
          });
          _this.bannerList = bannerList;
          if (_this.bannerList.length > 1) {
            _this.showDots = true;
          }
          // _this.
        } else if (params.cityCode === "000002") {
          _this.smallBannerList = res.data.bannelList;
        }
      });
    },
    getAllLoanApplication: function() {
      this.common.getAllLoanApplication().then(res => {
        let data = res.data;
        this.allLoanApplication = this.utils.toThousands(
          data.AllLoanApplication
        );
      });
    },
    getIndexMain: function(params) {
      this.common.getIndexMain(params).then(res => {
        let productList = res.data.columnList[0].productList;
        let arr = [];
        let _this = this;
        const MWEB_PATH = this.config.MWEB_PATH;
        _.each(productList, function(v) {
          if (v.showStatus == "1") {
            let obj = {
              img: v.proShowImg,
              industryCode: v.industryCode
            };
            if (v.industryCode == "MDCP" || v.industryCode == "LDDD") {
              // obj.url =
              //   MWEB_PATH +
              //   "newweb/product/miaodai.html?industryCode=" +
              //   v.industryCode;
              obj.url = "/#/product/hmfq??industryCode=" + v.industryCode;
            } else if (v.industryCode == "VIPD") {
              obj.url = "/#/product/vip";
            }
            arr.push(obj);
          }

          if (arr.length) {
            _this.productsList = arr;
          }
        });
      });
    },
    indexAdvertising: function(params) {
      this.common.indexAdvertising(params).then(res => {
        let currentTime = window.localStorage.getItem("adTime");
        if (currentTime) {
          currentTime = parseInt(currentTime);
        }
        if (
          !currentTime ||
          new Date(currentTime).toDateString() !== new Date().toDateString()
        ) {
          currentTime = Date.parse(new Date());
          if (res.data.list && res.data.list.length) {
            window.localStorage.setItem("adTime", currentTime);
            this.adList = res.data.list;
            this.adShow = true;

            let _this = this;
            let delay = res.data.list[0].times * 1000;
            setTimeout(function() {
              _this.adShow = false;
            }, delay);
          }
        }
      });
    },
    drag: function(e) {
      e.stopPropagation(); //原生阻止冒泡事件
      var pageX = e.changedTouches[0].pageX;
      var pageY = e.changedTouches[0].pageY;

      if (pageX - e.target.clientWidth / 2 < 0) {
        pageX = 0;
      } else if (
        pageX - e.target.clientWidth / 2 >
        window.screen.width - e.target.clientWidth
      ) {
        pageX = window.screen.width - e.target.clientWidth;
      } else {
        pageX = pageX - e.target.clientWidth / 2;
      }

      if (pageY - e.target.clientHeight / 2 < 0) {
        pageY = 0;
      } else if (
        pageY - e.target.clientHeight / 2 >
        window.screen.height - e.target.clientHeight
      ) {
        pageY = window.screen.height - e.target.clientHeight;
      } else {
        pageY = pageY - e.target.clientHeight / 2;
      }

      if (e.srcElement.className == "iconfont icon-zhuomiankuaijiefangshi2") {
        e.srcElement.parentElement.style.left = pageX + "px";
        e.srcElement.parentElement.style.top = pageY + "px";
      } else {
        e.srcElement.style.left = pageX + "px";
        e.srcElement.style.top = pageY + "px";
      }
    },
    touchstart: function(e) {
      e.stopPropagation();pageYOffset
      this.startY = e.changedTouches[0].pageY;
    },
    touchmove: function(e) {
      e.stopPropagation();
      this.moveEndY = e.changedTouches[0].pageY;
      let Y = this.moveEndY - this.startY;
      Y < 0 ? this.customerServiceShow = true : this.customerServiceShow = false;
    },
    openMsg: function() {
      this.shortcutPopup = true;
    },
    closeMsg: function() {
      this.shortcutPopup = false;
    },
    closeAlertDiv: function() {
      this.shortcutPopup = false;
    }
  },
  mounted: function() {
    //var token = window.hicashJSCommunication.getToken();
    //alert("token" + token)
    let _this = this;
    let queryTexObj= {
			source: _this.config.ProductName === 'hicash' ? "gk" : "ch",
			key: "app_name"
    };
    _this.common.queryTextConfig(queryTexObj).then( res => {
			let data = res.data;
			_this.appName = data.dataMap.app_name;
		})
    let userName = this.utils.getCookie("userName") || "";

    //添加友盟埋点
    setTimeout(function() {
      if (window._czc) {
        window._czc.push([
          "_trackEvent",
          "首页",
          "首页打开的次数",
          "",
          "",
          "SS"
        ]);
      }
    }, 2000);

    // 初始化scroller
    setTimeout(function() {
      _this.$refs.scroller.reset();
    });

    //获取大banner
    // let bigBannerObj = {
    //   cityCode: "000003",
    //   uuid: this.utils.uuid(),
    //   position: "1"
    // };
    // this.getHomePagePic(bigBannerObj);

    // //获取小banner
    // let smallBannerObj = {
    //   cityCode: "000002",
    //   uuid: this.utils.uuid(),
    //   position: "5"
    // };
    // this.getHomePagePic(smallBannerObj);

    // // 获取昨日申请笔数
    // this.getAllLoanApplication();

    // // 获取产品列表
    // var postData = new URLSearchParams();
    // postData.append("requestSource", "HTML5");
    // postData.append("platform", "HTML5");
    // postData.append("version", "");
    // postData.append("uuid", this.utils.uuid());
    // postData.append("userName", userName);
    // this.getIndexMain(postData);

    this.getIndexData();

    //首页弹屏广告
    var postData = new URLSearchParams();
    postData.append("userName", userName);
    postData.append("adPosition", "1");
    postData.append("uuid", this.utils.uuid());
    this.indexAdvertising(postData);

    //判断ios/android终端弹窗
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
       _this.androidIsShow = true;
    }
    if (isiOS) {
　　　　_this.iosIsShow = true;
    }
    if(this.$route.query.lkyx){
      window.gio('page.set', 'lkyx', this.$route.query.lkyx);  
    }
  }
  // watch: {
  //   shortcutPopup: function(val,oldVal) {
  //     console.log("123123")
  //   }
  // }
};
</script>
