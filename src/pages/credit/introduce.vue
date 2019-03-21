<template>
  <div class="content" :class="{'contents':platform==='APP'}">
    <page-header :title="title" :showBack="showBack" :showBtnClose="showBtnClose" :jumpRouteName="'Inquiry'" v-if="platform==='H5'"></page-header>
    <div class="box">
      <div class="banner">
        <img src="./images/banner.png" alt>
      </div>
      <div class="list">
        <div class="list-row row1">
          <div class="list-box">
            <div class="icon">
              <img src="./images/operator.png" @click="goAuthentication('operator')">
            </div>
            <div class="txt">运营商</div>
          </div>
          <div class="list-box">
            <div class="icon">
              <img src="./images/jd.png" @click="goAuthentication('jd')">
            </div>
            <div class="txt">京东</div>
          </div>
        </div>
        <div class="list-row row2">
          <div class="list-box">
            <div class="icon">
              <img src="./images/element.png" @click="goAuthentication('eleme')">
            </div>
            <div class="txt">饿了么</div>
          </div>
          <div class="list-box">
            <div class="icon">
              <img src="./images/haluo.png" @click="goAuthentication('helloBike')">
            </div>
            <div class="txt">哈罗单车</div>
          </div>
        </div>
      </div>
    </div>
    <div class="rule">
      <h3>活动规则</h3>
      <div class="rule-detail">
        <p>即日起，首次在嗨钱+进行信用认证的用户即可获得嗨钱免息券</p>
        <p class="rule-list">1.完成运营商信用认证可获得40元免息代金券
          <br>2.完成京东信用认证可获得50元免息代金券
          <br>3.完成哈喽单车信用认证可获得30元免息代金券
          <br>4.完成饿了么信用认证可获得30元免息代金券
          <br>
        </p>
        <p class="p1">完成嗨钱+全部信用认证，更有机会获得随机发放的50元免息代金券</p>
        <p>本活动最终解释权归嗨钱所有</p>
      </div>
    </div>
  </div>
</template>
<script>
import PageHeader from "@/components/PageHeader.vue";
export default {
  components: {
    PageHeader
  },
  data() {
    return {
      title: "征信活动介绍",
      showBack: true,
      showBtnClose: false,
      platform:this.utils.getPlatform()
    };
  },
  methods: {
    goAuthentication(val) {
      this.utils.setCookie("creditType", val);
      let obj = {};
      obj.userName = this.utils.getCookie("userName");
      obj.creditType = val;

      this.common.queryCreditUrl(obj).then(res => {
        let data = res.data;
        // console.info("data", data);
        console.log(this.$router)
        if (data.userInfo) {
          this.$router.push({ name: "PandoraAuth" });
        } else {
          this.$router.push({ name: "IdentityAuth" });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";
.content {
  font-family: PingFangSC-Medium;
  padding-top: 2.2rem;
  width: 100%;
  height: auto;
  overflow-y: auto;
  background: rgb(241, 241, 241);
  .box {
    background: #fff;
    .banner {
      height: rem(150px);
      width: rem(345px);
      margin: 0 auto;
      img {
        width: 100%;
      }
    }
    .list {
      padding: rem(24px) 0 rem(32px);
      .list-row {
        display: flex;
        justify-content: space-around;
        .list-box {
          text-align: center;
          .icon {
            height: rem(62px);
            width: rem(62px);
            display: inline-block;
            img {
              width: 100%;
            }
          }
          .txt {
            font-size: rem(16px);
            color: #666666;
            letter-spacing: 0;
            margin-top: rem(12px);
          }
        }
      }
      .row2 {
        margin-top: rem(37px);
      }
    }
  }
  .rule {
    margin-top: rem(10px);
    margin-bottom: rem(40px);
    padding: rem(20px) rem(15px) rem(24px);
    background: #fff;
    h3 {
      font-size: rem(16px);
      color: #666666;
      letter-spacing: rem(0.3px);
      line-height: rem(8px);
    }
    .rule-detail {
      font-size: rem(13px);
      color: #999999;
      letter-spacing: rem(0.32px);
      line-height: rem(16px);
      margin-top: rem(12px);
      .rule-list {
        line-height: rem(28px);
      }
      .p1 {
        margin: rem(8px) 0 rem(12px);
      }
    }
  }
}
.contents{
  padding-top: 0
}
</style>
