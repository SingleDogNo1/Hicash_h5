<template>
  <div class="kefu">
    <page-header
      :title="title"
      :showBack="showBack"
      :showBtnClose="showBtnClose"
    ></page-header>
    <div class="content" :class="{ appContent: platform === 'APP' }">
      <img src="./images/bg_banner.png" class="banner">
      <div class="wrap">
        <ul class="help-list">
          <router-link :to="{ name: 'help', query: {helpItemKey: 'RMWT', platform: platform}}" tag="li">
            <img src="./images/icon_1.png">
            <p>热门问题</p>
          </router-link>
          <router-link :to="{ name: 'help', query: {helpItemKey: 'JKWT', platform: platform}}" tag="li">
            <img src="./images/icon_2.png">
            <p>借款问题</p>
          </router-link>
          <router-link :to="{ name: 'help', query: {helpItemKey: 'HKWT', platform: platform}}" tag="li">
            <img src="./images/icon_3.png">
            <p>还款问题</p>
          </router-link>
          <router-link :to="{ name: 'help', query: {helpItemKey: 'QTWT', platform: platform}}" tag="li">
            <img src="./images/icon_4.png">
            <p>其他问题</p>
          </router-link>
          <!-- <li>
          <img src="./images/icon_1.png">
          <p>热门问题</p>
        </li>
        <li>
          <img src="./images/icon_2.png">
          <p>借款问题</p>
        </li>
        <li>
          <img src="./images/icon_3.png">
          <p>还款问题</p>
        </li>
        <li>
          <img src="./images/icon_4.png">
          <p>其他问题</p>
          </li>-->
        </ul>
        <div class="concat-wrap">
          <p class="title">联系客服</p>
          <div class="content">
            <a class="to-concat" @click="toConcat">开始沟通</a>
            <p class="desc">联系人工客服效率更高哦</p>
          </div>
        </div>
        <div class="problem-wrap">
          <div class="problem-title">
            <h3>常见问题</h3>
            <router-link class="more" :to="{ name: 'help', query: {platform: platform}}">更多</router-link>
          </div>

          <div class="swiper-container">
            <div class="swiper-wrapper">
              <a
                :href="item.openUrl"
                class="arrow_box swiper-slide"
                v-for="(item, index) in list"
                :key="index"
              >
                {{ item.title }}
                <span class="ico">
                  <img :src="
									require('./images/' +
										'hot-ico.png')
								">
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <page-footer v-if="platform === 'H5'"></page-footer>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import Swiper from "swiper";
export default {
  components: {
    PageHeader,
    PageFooter,
    Swiper
  },
  data() {
    return {
      title: "客服",
      showBack: false,
      showBtnClose: false,
      platform: this.utils.getPlatform(),
      list: []
    };
  },
  methods: {
    toConcat() {
      if (this.platform === "H5") {
        let userName = this.utils.getCookie("userName");
        if (!userName) {
          this.$router.push({ name: "Login" });
          return;
        } else {
          let hxUserName = this.utils.getCookie("hxUserName");
          let hxPassword = this.utils.getCookie("hxPassword");
          if (hxUserName && hxPassword) {
            this.easemobimSet(hxUserName, hxPassword);
          } else {
            let postData = new URLSearchParams();
            postData.append("userName", userName);
            postData.append("token", "");
            this.common.userEaseModGet(postData).then(res => {
              let data = res.data;
              this.easemobimSet(data.hxUsername, data.hxPassword);
            });
          }
        }
      } else {
        let isAndroid = navigator.userAgent.indexOf('comeFrom:android') > -1;
        let isIos = navigator.userAgent.indexOf('comeFrom:iOS') > -1;
        if(isAndroid) {
          window.hicashJSCommunication.onCallApp(
              JSON.stringify({
                type: "h5_service_im"
              })
            );
        } else {
          let token = window.hicashJSCommunication.getToken();
          if (!token) {
            window.hicashJSCommunication.onCallApp(
              JSON.stringify({
                type: "dl"
              })
            );
          } else {
            let postData = new URLSearchParams();
            postData.append("userName", "");
            postData.append("token", token);
            if(isIos) {
              postData.append("type", "1");
            }
            this.common.userEaseModGet(postData).then(res => {
              let data = res.data;
              this.easemobimSet(data.hxUsername, data.hxPassword);
            });
          }
        }
      }
    },
    easemobimSet: function(hxUserName, hxPassword) {
      window.easemobim = window.easemobim || {};
      easemobim.config = {
        //configId: "69ecd9da-983a-4b3c-9501-8a3dfafa23eb",	//生产
        configId: "3c36390b-e501-417f-8825-d5c7db9e161a",	//测试
                  
        // 用户所在的 appKey 需要与 configId 中指定的关联的 appKey 一致
        user: {
          // username 必填，password 和 token 任选一项填写
          username: hxUserName,
          password: hxPassword,
          token: ""
        },
        hideKeyboard: true
      };
      easemobim.bind(easemobim.config);
    },
    getSysParam: function() {
      // 获取产品列表
      let postData = new URLSearchParams();
      postData.append("paramCode", "CJWT");
      postData.append("requestSource", "HTML5");
      postData.append("maxLine", "10000");
      postData.append("curPage", "1");
      postData.append("subType", "RMWT");

      this.common.getSysParam(postData).then(res => {
        let list = res.data.list;

        _.each(res.data.list, (v, i) => {
          list[i].createTime = list[i].createTime.substring(0, 10);
          list[i].openUrl =
            this.config.MWEB_PATH +
            "newweb/newsDetail/newsDetail.html?id=" +
            list[i].id+'&platform=' + this.platform + '&type=help';
        });

        this.list = list.splice(0, 5);
        console.log("this.list===", this.list);
        setTimeout(() => {
          var swiper = new Swiper(".swiper-container", {
            slidesPerView: "auto",
            autoplay: 2500
          });
        }, 500);
      });
    }
  },
  mounted() {
    this.getSysParam();
  }
};
</script>

<style lang="scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";
.kefu {
  width: 100%;
  height: 100%;
  background: #fff;
  .content {
    padding-top: rem(50px);
    padding-bottom: rem(60px);
    background: #fff;
    .banner {
      display: block;
      width: 100%;
      height: auto;
    }
    .wrap {
      position: relative;
      height: 100%;
      //width: 100%;
      margin-top: rem(-26px);
      background: #fff;
      border-radius: 8px 8px 0px 0px;
      padding: rem(24px) rem(15px) 0 rem(15px);
      .help-list {
        display: flex;
        justify-content: space-between;
        li {
          //width: rem(52px);
          margin-right: rem(40px);
          img {
            display: block;
            width: rem(44px);
            height: rem(44px);
            border-radius: 50%;
            margin: 0 auto;
          }
          p {
            margin-top: rem(4px);
            font-size: 13px;
            text-align: center;
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
      .concat-wrap {
        width: rem(345px);
        //height: rem(138px);
        margin: 0 auto;
        margin-top: rem(16px);
        .title {
          width: 100%;
          height: rem(43px);
          line-height: rem(43px);
          background: rgba(247, 247, 247, 1);
          border: 1px solid rgba(238, 238, 238, 1);
          border-radius: 4px 4px 0px 0px;
          text-align: center;
          font-size: 15px;
        }
        .content {
          width: 100%;
          border-radius: 0px 0px 4px 4px;
          border: 1px solid rgba(238, 238, 238, 1);
          border-top: 0;
          font-size: 15px;
          padding: 0;
          padding-top: rem(17px);
          .to-concat {
            display: block;
            width: rem(150px);
            height: rem(34px);
            line-height: rem(34px);
            margin: 0 auto;
            border-radius: 4px;
            border: 1px solid rgba(255, 120, 80, 1);
            font-size: 15px;
            color: rgba(255, 120, 80, 1);
            text-align: center;
          }
          .desc {
            margin-top: rem(15px);
            font-size: 13px;
            text-align: center;
            color: #999999;
            padding-bottom: rem(19px);
          }
        }
      }
      .problem-wrap {
        margin-top: rem(24px);
        .problem-title {
          display: flex;
          justify-content: space-between;
          h3 {
            display: inline-block;
            font-size: 13px;
            font-weight: 500;
          }
          .more {
            display: inline-block;
            font-size: 13px;
            color: #999999;
          }
        }
        .swiper-container {
          // width: 90%;
          // margin: 0 auto;
          margin-top: rem(16px);
          .arrow_box {
            width: 80%;
            height: auto;
            padding: 0 14px;
            border-radius: 5px;
            position: relative;
            background: #f5f5f5;
            font-size: 0.65rem;
            margin-right: 30px !important;
            display: block;
            color: #333 !important;
            .ico {
              display: block;
              position: absolute;
              top: -2px;
              left: 0;
              img {
                width: 37px;
              }
            }
          }
          .arrow_box:hover {
            color: #333 !important;
          }
          .arrow_box:after {
            right: -8px;
            bottom: -15px;
            border: solid transparent;
            content: " ";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
            border-color: rgba(136, 183, 213, 0);
            border-left-color: #f5f5f5;
            border-width: 15px;
            transform: rotate(135deg);
            -ms-transform: rotate(135deg);
            /* IE 9 */
            -moz-transform: rotate(135deg);
            /* Firefox */
            -webkit-transform: rotate(135deg);
            /* Safari 和 Chrome */
            -o-transform: rotate(135deg);
          }
          .swiper-slide {
            width: 62% !important;
            height: 72px !important;
            /* Center slide text vertically */
            display: -webkit-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            -webkit-align-items: center;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>
