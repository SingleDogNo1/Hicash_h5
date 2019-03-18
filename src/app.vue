<template>
	<div id="app" :class="[path, platform]">
		<router-view></router-view>
		<x-dialog v-model="authShowDialog" class="dialog">
			<div class="img-box">
				<img src="./assets/images/pop-coupon.png" alt="">
				<div class="btns">
					<button @click="authShowDialog=false" class="auth-btn confirm">看优惠券</button>
					<button @click="cancel" class="auth-btn cancel">看新报告</button>
				</div>
			</div>
			<div @click="authShowDialog=false">
				<span class="vux-close"></span>
			</div>
		</x-dialog>
	</div>
</template>

<script>
import Home from "@/components/Home.vue";
import MiaoDai from "@/components/MiaoDai.vue";
import { XDialog } from "vux";

export default {
	name: "App",
	created() {
		//自动登录
		let userName =
			localStorage.getItem("userName") ||
			this.utils.getCookie("userName");
		let token =
			localStorage.getItem("token") || this.utils.getCookie("token");
		let _this = this;

    if (userName && token) {
      this.jsCommon.setAuthorization(userName, token);
    }

    if (this.$router.history.current.meta.title) {
      document.title = this.$router.history.current.meta.title;
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
		XDialog
	},
	mounted() {
		//添加友盟埋点
		const script = document.createElement("script");
		script.src =
			"https://s95.cnzz.com/z_stat.php?id=1260767143&web_id=1260767143";
		script.language = "JavaScript";
		document.body.appendChild(script);

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
		};
	},
	data() {
		return {
			path: this.$route.name,
			platform: this.utils.getPlatform(),
			authShowDialog: true
		};
	},
	methods: {
		cancel(){
			
		}
	}
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "./assets/css/common.scss";
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
  background-size: cover;
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
		background: url("./assets/images/icon_home_act.png") center center
			no-repeat;
		background-size: cover;
	}
	.icon-vip-area {
		background: url("./assets/images/icon_vip_area_act.png") center center
			no-repeat;
		background-size: cover;
	}
	.icon-broke-promise-area {
		background: url("./assets/images/icon_broke_promise_area_act.png")
			center center no-repeat;
		background-size: cover;
	}
	.icon-me {
		background: url("./assets/images/icon_me_act.png") center center
			no-repeat;
		background-size: cover;
	}
	.weui-tabbar__label {
		color: #ff6700 !important;
	}
	.icon-inquiry {
		background: url("./assets/images/icon-inquiry-select.png") center center no-repeat;
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

.dialog {
	/deep/ .weui-dialog{
		background: transparent;
		border-radius: 8px;
		padding-bottom: 8px;
	}
	/deep/ .dialog-title {
		line-height: 30px;
		color: #666;
	}
	/deep/ .img-box {
		position: relative;
		img{
			width: 100%;
		}
		.btns{
			width: 100%;
			position: absolute;
			bottom: rem(60px);
			.auth-btn{
				width: 70%;
				height: rem(40px);
				border: 0;
				border-radius: 25px;
				background: linear-gradient(#FFF2A7, #FFD96F); /* 标准的语法 */
				color: #E63F06;
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
		background: url('./assets/images/pop-close-coupon.png') no-repeat;
		display: block;
		margin: rem(20px) auto;
		background-size: rem(37px) rem(37px);
	}
}
</style>
