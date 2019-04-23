<template>
  <div id="app" :class="[path, platform]">
    <router-view></router-view>
    <x-dialog v-model="authShowDialog" class="app-auth-dialog">
      <div class="img-box">
        <img src="./assets/images/pop-coupon.png" width="100%" alt>
        <p>
          恭喜获得
          <span>{{couponAmount}}元</span> 优惠券
        </p>
        <div class="btns">
          <button @click="seeCoupon" class="auth-btn confirm">看优惠券</button>
          <button @click="seeCredit" class="auth-btn cancel">看新报告</button>
        </div>
      </div>
      <div @click="authShowDialog=false">
        <span class="vux-close"></span>
      </div>
    </x-dialog>
    <!-- <confirm
      v-model="getReportSuccess"
      :close-on-confirm="false"
      title="获取报告成功"
      @on-confirm="onConfirmReport"
      confirm-text="看报告"
      class="reportConfirm"
    >
      <p style="text-align:center;">新鲜的报告已经准备好了，快来看看</p>
    </confirm> -->
  </div>
</template>

<script>
import Home from "@/components/Home.vue";
import MiaoDai from "@/components/MiaoDai.vue";
import { XDialog, Confirm } from "vux";

export default {
  name: "App",
  created() {
    //自动登录
    let userName =
      localStorage.getItem("userName") || this.utils.getCookie("userName");
    let token = localStorage.getItem("token") || this.utils.getCookie("token");
    let _this = this;

    if (userName && token) {
      this.jsCommon.setAuthorization(userName, token);
    }

    if (this.$router.history.current.meta.title) {
      document.title = this.$router.history.current.meta.title;
    }

    if (this.$router.history.current.query.source == "iframe") {
      parent.location.href =
        this.config.NEW_MWEB_PATH + this.$router.history.current.path;
    }

    if (this.$route.query.newSource == "auth_iframe") {
      var urlArr = window.location.href.split("&");
      parent.location.href = urlArr[0];
      console.log(urlArr[0])
    }

    if (this.$router.history.current.meta.requireAuth) {
      // 判断该路由是否需要登录权限
      if (!userName || userName == "null") {
        const params = {
          name: "Login"
        };
        if (this.$router.history.current.query.jumpType) {
          params.query = {
            jumpType: this.$router.history.current.query.jumpType
          };
        } else {
          params.query = {
            redirect: this.$router.history.current.fullPath
          };
        }
        this.$router.push(params);
      }
    }

    this.getCreditResult(); //拉取征信报告

    var usergps = this.utils.getCookie("gpsArr");
    if (!usergps || usergps == "") {
      var getLocation = function() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              locationSuccess,
              locationError,
              {
                enableHighAcuracy: true, // 指示浏览器获取高精度的位置，默认为false
                timeout: 50000, // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
                maximumAge: 3000 // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
              }
            );
          }
        },
        locationSuccess = function(position) {
          //将经纬度转换为坐标数组
          var gpsArr = [position.coords.longitude, position.coords.latitude];
          _this.utils.setCookie("gpsArr", gpsArr);
        },
        locationError = function(error) {};
      getLocation();
    }
  },
  components: {
    Home,
    MiaoDai,
    XDialog,
    Confirm
  },
  mounted() {
    //添加友盟埋点
    const script = document.createElement("script");
    script.src =
      "https://s95.cnzz.com/z_stat.php?id=1260767143&web_id=1260767143";
    script.language = "JavaScript";
    document.body.appendChild(script);

    this.$router.beforeEach((to, from, next) => {
      this.getCreditResult(); //拉取征信报告

      document.body.scrollTop = 0;

      this.path = to.name;
      if (to.meta.title) {
        document.title = to.meta.title;
      }
      if (to.matched.some(record => record.meta.requireAuth)) {
        var userName = this.utils.getCookie("userName");
        var realName = this.utils.getCookie("realName");
        var mobile = this.utils.getCookie("mobile");

				// 判断该路由是否需要登录权限
				if (!userName || userName == "null") {
					next({
						// 将跳转的路由path作为参数，登录成功后跳转到该路由
						path: "/login",
						query: { redirect: to.fullPath }
					});
				} else {
					next();
				}
			} else {
				next();
      }
    });
    
    //这里监听键盘收起，然后滚动顶部
    document.body.addEventListener("focusout", () => {
      //软键盘收起的事件处理
      let ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf("iphone") > 0 || ua.indexOf("ipad") > 0) {
        //键盘收齐页面空白问题
        document.body.scrollTop = document.body.scrollHeight;
        document.body.scrollIntoView(false);
      }
    });

	},
	data() {
		return {
			path: this.$route.name,
			platform: this.utils.getPlatform(),
      authShowDialog: false,
      getReportSuccess: false,
      couponAmount: "",
      creditType: "",
      creditRouterName: ""
    };
  },
  methods: {
    seeCoupon() {
      this.authShowDialog = false;
      this.$router.push({ name: "MyCoupon" });
    },
    seeCredit() {
      console.info("this.routerNameMapping", this.routerNameMapping());
      this.authShowDialog = false;
      this.$router.push({ name: this.routerNameMapping() });
    },
    onConfirmReport() {
      console.info("this.routerNameMapping", this.routerNameMapping());
      this.getReportSuccess = false;
      this.$router.push({ name: this.routerNameMapping() });
    },
    getCreditResult() {
      let userName = this.utils.getCookie("userName");
      let whiteList = [
        // 拉取报告白名单页面列表
        "Inquiry",
        "IdentityAuth",
        "PandoraAuth",
        "Personal",
        "Home",
        "BreakPromise",
        "operator",
        "jingdong",
        "Haluo",
        "Eleme",
        "ActivityIntroduction",
        "CreditFailedLoad",
        "CreditLoading"
      ];
      if (!userName || whiteList.indexOf(this.path) < 0) return false;
      let getCreditResultData = new URLSearchParams();
      getCreditResultData.append("userName", this.utils.getCookie("userName"));
      this.common.getCreditResult(getCreditResultData).then(res => {
        if (res.data.resultCode != "1") return false;

        this.creditType = res.data.creditType;
        let _params = {
          userName: res.data.userName,
          creditType: this.creditType
        };

        this.checkCreditResult(_params);
      });
    },
    checkCreditResult(_params) {
      this.common.CheckCreditResult(_params).then(res => {
        let data = res.data.data;
        if (data.firstRecevie) {
          this.couponAmount = data.amount;
          this.authShowDialog = true;
        } else {
          this.getReportSuccess = true;
        }
      });
    },
    routerNameMapping() {
      let creditRouterName = "";
      switch (this.creditType) {
        case "operator": // * 运营商
          creditRouterName = "operator";
          break;
        case "jd": // * 京东
          creditRouterName = "jingdong";
          break;
        case "helloBike": // * 哈啰单车
          creditRouterName = "Haluo";
          break;
        case "eleme": // * 饿了么
          creditRouterName = "Eleme";
          break;
      }
      return creditRouterName;
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "~bowerComponents/sass-rem/_rem.scss";
a {
  text-decoration: none;
}
html,
body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
body {
  padding: 0;
  max-width: 640px;
  min-width: 320px;
  margin: 0 auto;
  font-family: 微软雅黑;
}
#app {
  width: 100%;
  height: 100%;
}
.BreakPromiseDetail,
.Result {
  background: #eee;
}
.OverdueDetail,
.RepaymentPlan {
  background: #f2f2f2;
}
.footer {
  max-width: 640px;
  min-width: 320px;
}
.weui-tabbar {
  background: #f9f8f8 !important;
  height: 2.075rem !important;
}
.weui-tabbar__label {
  line-height: 1.8 !important;
  font-size: 0.45rem !important;
  margin: 0.2rem !important;
}
.weui-tabbar__icon {
  width: 0.72rem !important;
  height: 0.8rem !important;
}
.icon-home {
  display: block;
  width: 0.8rem;
  height: 0.85rem;
  margin-top: 0.2rem;
  background: url("./assets/images/icon_home.png") center center no-repeat;
  background-size: 100% 100%;
}
.icon-vip-area {
  display: block;
  width: 0.87rem;
  height: 0.88rem;
  margin-top: 0.15rem;
  background: url("./assets/images/icon_vip_area.png") center center no-repeat;
  background-size: cover;
}
.icon-credit {
  display: block;
  width: rem(20px);
  height: rem(22px);
  margin-top: 0.15rem;
  background: url("./assets/images/icon_credit.png") center center no-repeat;
  background-size: cover;
}
.icon-broke-promise-area {
  display: block;
  width: 0.8rem;
  height: 0.85rem;
  margin-top: 0.15rem;
  background: url("./assets/images/icon_broke_promise_area.png") center center
    no-repeat;
  background-size: cover;
}
.icon-inquiry {
  display: block;
  width: 0.8rem;
  height: 0.85rem;
  margin-top: 0.15rem;
  background: url("./assets/images/icon-inquiry.png") center center no-repeat;
  background-size: cover;
}
.icon-kefu {
  display: block;
  width: rem(20px);
  height: rem(19px);
  margin-top: 0.15rem;
  background: url("./assets/images/icon_kefu.png") center center no-repeat;
  background-size: 100% 100%;
}
.icon-me {
  display: block;
  width: 0.8rem;
  height: 0.8rem;
  margin-top: 0.15rem;
  background: url("./assets/images/icon_me.png") center center no-repeat;
  background-size: cover;
}
.weui-bar__item_on {
  .icon-home {
    background: url("./assets/images/icon_home_act.png") center center no-repeat;
    background-size: cover;
  }
  .icon-vip-area {
    background: url("./assets/images/icon_vip_area_act.png") center center
      no-repeat;
    background-size: cover;
  }
  .icon-broke-promise-area {
    background: url("./assets/images/icon_broke_promise_area_act.png") center
      center no-repeat;
    background-size: cover;
  }
  .icon-me {
    background: url("./assets/images/icon_me_act.png") center center no-repeat;
    background-size: cover;
  }
  .weui-tabbar__label {
    color: #ff6700 !important;
  }
  .icon-inquiry {
    background: url("./assets/images/icon-inquiry-select.png") center center
      no-repeat;
    background-size: cover;
  }
  .icon-kefu {
    background: url("./assets/images/icon_kefu_act.png") center center
      no-repeat;
    background-size: cover;
  }
}
.weui-tabbar__item:last-child {
  .weui-tabbar__icon {
    width: 0.8rem !important;
  }
}
.weui-cell:before {
  height: 1px;
}

.app-auth-dialog {
  .weui-dialog {
    background: transparent;
    border-radius: 8px;
    padding-bottom: 8px;
    max-width: auto !important;
    top: 10% !important;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    position: relative;
    width: 100%;
    img {
      width: 100%;
    }
    p {
      width: 100%;
      position: absolute;
      top: rem(100px);
      color: #ff7e53;
      font-size: rem(18px);
      text-align: center;
      font-weight: 500;
      span {
        color: #e63f06;
        font-weight: 600;
        font-size: rem(24px);
      }
    }
    .btns {
      width: 100%;
      position: absolute;
      bottom: rem(45px);
      .auth-btn {
        width: 70%;
        height: rem(40px);
        border: 0;
        border-radius: 25px;
        background: linear-gradient(#fff2a7, #ffd96f); /* 标准的语法 */
        color: #e63f06;
        font-size: rem(15px);
        display: block;
        margin: 0 auto;
        margin-bottom: rem(20px);
      }
    }
  }
  .vux-close {
    width: rem(37px);
    height: rem(37px);
    background: url("./assets/images/pop-close-coupon.png") no-repeat;
    display: block;
    margin: rem(20px) auto;
    background-size: rem(37px) rem(37px);
  }
}

.reportConfirm {
  .weui-dialog__hd {
    padding: 0;
    height: 50px;
    line-height: 50px;
    background: #ff7640;
    font-size: 17px;
    color: #ffffff;
  }
  .weui-dialog__bd {
    padding: 36px 0px;
    font-size: 13px;
    color: #333333;
    letter-spacing: -0.08px;
    min-height: auto;
  }
  .weui-dialog__btn_primary {
    font-size: 15px;
    color: #ff7640;
    letter-spacing: -0.36px;
  }
  .weui-dialog__btn_default {
    font-size: 15px;
    color: #999999;
    letter-spacing: -0.36px;
  }
}
.defConfirm {
  .weui-dialog__hd {
    padding: 0;
    height: 50px;
    line-height: 50px;
    background: #ff7640;
    font-size: 17px;
    color: #ffffff;
  }
  .weui-dialog__bd {
    padding: 10px 10px;
    font-size: 13px;
    color: #333333;
    letter-spacing: -0.08px;
    min-height: auto;
  }
  .weui-dialog__btn_primary {
    font-size: 15px;
    color: #ff7640;
    letter-spacing: -0.36px;
  }
  .weui-dialog__btn_default {
    font-size: 15px;
    color: #999999;
    letter-spacing: -0.36px;
  }
}
.weui-dialog__btn_primary {
  font-size: 15px;
  color: #ff7640;
  letter-spacing: -0.36px;
}
.MyCoupon, .Coupon {
  background-color: rgb(245, 245, 245);
}
</style>
