<template>
  <div class="content">
    <page-header :title="title" :showBack="showBack" :showBtnClose="showBtnClose"></page-header>
    <div class="box">
      <div class="box-top">
        <div class="warn">
          <img src="./images/loading.png" alt>
          <!-- <progress-ring :complete="complete"/> -->
        </div>
        <div class="tips">报告生成需要一点时间，成功后立即告诉您
          <br>推荐您先看看别的～
        </div>
      </div>

      <div class="authentication" v-show="isDisappear">
        <p class="recommend">推荐：饿了么外卖认证</p>
        <div class="btn">
          <button class="buttons waiting" @click="isWait()">继续等待</button>
          <button class="buttons go_authentication" @click="goAuthentication()">去认证</button>
        </div>
      </div>
      <div class="authentication no" v-show="isDisappear">
        <div class="btn">
          <button class="buttons waiting" @click="isWait()">继续等待</button>
          <button class="buttons go_authentication">看看别的</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PageHeader from "@/components/PageHeader.vue";
// import ProgressRing from "@/components/ProgressRing";
export default {
  components: {
    PageHeader
    // ProgressRing
  },
  data() {
    return {
      // complete: false,
      title: "征信报告",
      showBack: true,
      showBtnClose: false,
      isDisappear: true
    };
  },
  created() {
    this.CheckCreditResult();
  },
  methods: {
    isWait() {
      this.isDisappear = false;
    },
    goAuthentication() {
      this.CheckCreditResult();
    },
    CheckCreditResult() {
      let obj = {};
      obj.username = this.utils.getCookie("userName");
      obj.creditType = this.utils.getCookie("creditType");
      // let checkCreditResultTimer = setInterval(() => {
      //   this.common.CheckCreditResult(obj).then(res => {
      //     console.log(1)
      //     clearInterval(timer)
      //     if(res.data.data==1){
      //       clearInterval(checkCreditResultTimer)
      //     }
      //   });
      // }, 5000);
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.complete = true;
    // }, 2000);
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
  min-height: 100%;
  overflow-y: auto;
  background: rgb(241, 241, 241);
  .box {
    .box-top {
      background: #fff;
      padding-bottom: rem(60px);
      padding-top: rem(60px);
      .warn {
        width: rem(66px);
        height: rem(66px);
        margin: 0 auto;
        img {
          width: 100%;
        }
      }
      .tips {
        font-size: rem(15px);
        color: #666666;
        letter-spacing: rem(0.38px);
        text-align: center;
        line-height: rem(30px);
        margin-top: rem(36px);
      }
    }
    .authentication {
      margin-top: rem(10px);
      background: #fff;
      padding-top: rem(32.6px);
      padding-bottom: rem(32px);
      .recommend {
        text-align: center;
        font-size: rem(18px);
        color: #ff7640;
        letter-spacing: rem(0.45px);
        line-height: rem(25px);
        margin-bottom: rem(24px);
      }
      .btn {
        width: rem(282px);
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        .buttons {
          border-radius: 6px;
          font-size: rem(14px);
          letter-spacing: rem(0.35px);
          text-align: center;
          width: rem(125px);
          height: rem(35px);
          line-height: rem(35px);
          border: 1px solid #ff7640;
        }
        .waiting {
          background: #fff;
          color: #ff7640;
        }
        .go_authentication {
          background: #ff7640;
          color: #ffffff;
        }
      }
    }
    .no {
      margin-top: 0;
      padding-top: 0;
    }
  }
}
</style>
