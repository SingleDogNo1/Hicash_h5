<template>
  <div class="content" :class="{'contents':platform==='APP'}">
    <page-header
      :title="title"
      :showBack="showBack"
      :showBtnClose="showBtnClose"
      :jumpRouteName="'Inquiry'"
      v-if="platform==='H5'"
    ></page-header>
    <div class="box">
      <div class="box-top">
        <div class="warn">
          <img src="./images/loading.png" alt>
          <!-- <progress-ring :complete="complete"/> -->
        </div>
        <div class="tips">
          报告生成需要一点时间，成功后立即告诉您
          <br>推荐您先看看别的～
        </div>
      </div>
      <div class="btn-box" v-show="isShow">
        <div class="authentication" v-show="isDisappear">
          <p class="recommend">推荐：{{msg}}认证</p>
          <div class="btn">
            <button class="buttons waiting" @click="isWait()">继续等待</button>
            <button class="buttons go_authentication" @click="goAuthentication()">去认证</button>
          </div>
        </div>
        <div class="authentication no" v-show="!isDisappear">
          <div class="btn">
            <button class="buttons waiting" @click="isWait()">继续等待</button>
            <button class="buttons go_authentication" @click="others()">看看别的</button>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="dialog" v-show="isShowDialog">
      <h3>报告获取成功</h3>
      <p class="dialog-p">新鲜的报告已经准备好了，快来看看</p>
      <div class="dialog-btn">
        <button class="cancel buttons" @click="isShowDialog=false">取消</button>
        <button class="confirm buttons" @click="confirm()">看报告</button>
      </div>
    </div>-->
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
      isDisappear: false,
      isShow: true,
      msg: "",
      // isShowDialog: true,
      report: "",
      platform:this.utils.getPlatform()
    };
  },
  created() {
    this.getUserCreditReports();
  },
  methods: {
    // confirm() {
      // switch (this.utils.getCookie("creditType")) {
      //   case "operator":
      //     this.report = "operator";
      //     break;
      //   case "jd":
      //     this.report = "jingdong";
      //     break;
      //   case "helloBike":
      //     this.report = "Haluo";
      //     break;
      //   case "eleme":
      //     this.report = "Eleme";
      //     break;
      // }
    //   this.$router.push({ name: this.report });
    // },
    isWait() {
      // 继续等待
      // this.CheckCreditResult();
      window.location.reload()
      this.isShow = false;
    },
    goAuthentication(val) {
      // 去认证
      let obj = {};
      obj.userName = this.utils.getCookie("userName");
      obj.creditType = this.utils.getCookie("creditType");

      this.common.queryCreditUrl(obj).then(res => {
        let data = res.data;
        // console.info("data", data);
        // console.log(this.$router)
        if (data.userInfo) {
          this.$router.push({ name: "PandoraAuth" });
        } else {
          this.$router.push({ name: "IdentityAuth" });
        }
      });
    },
    // CheckCreditResult() {
    //   let obj = {};
    //   obj.userName = this.utils.getCookie("userName");
    //   obj.creditType = this.utils.getCookie("creditType");
    //   let checkCreditResultTimer = setInterval(() => {
    //     this.common.CheckCreditResult(obj).then(res => {
    //       if (res.data.data.status == 2) {
    //         clearInterval(checkCreditResultTimer);
    //         // this.isShowDialog = true;
    //       }
    //       if(res.data.resultCode==-1){
    //         this.$router.push({name:"FailedLoad"})
    //       }
    //     });
    //   }, 5000);
    // },
    getUserCreditReports() {
      this.common
        .getUserCreditReports(this.utils.getCookie("userName"))
        .then(res => {
          // console.log(res.data);
          let arr = res.data.data;
          let arr1 = [];
          arr.map(item => {
            if (item.status == 0) {
              arr1.push(item);
              this.isDisappear = true;
            }
            if (item.reportName == "饿了么") {
              item.reportName = "饿了么外卖";
            }
          });
          let number = Math.round(Math.random() * (arr1.length - 1));
          this.msg = arr1[number].reportName;
        });
    },
    others() {
      //看看别的
      this.$router.push({ name: "Inquiry" });
    }
  }
  // mounted() {
  //   // setTimeout(() => {
  //   //   this.complete = true;
  //   // }, 2000);
  // }
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
    .btn-box {
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
          justify-content: space-around;
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
  // .dialog {
  //   position: absolute;
  //   left: 0;
  //   right: 0;
  //   top: 0;
  //   bottom: 0;
  //   margin: auto;
  //   height: rem(180px);
  //   width: 80%;
  //   background: #fff;
  //   text-align: center;
  //   border: 1px solid #666;
  //   border-radius: rem(10px);
  //   h3 {
  //     font-size: rem(18px);
  //     color: #444;
  //     margin-top: rem(28px);
  //     letter-spacing: rem(0.38px);
  //   }
  //   .dialog-p {
  //     font-size: rem(15px);
  //     line-height: rem(60px);
  //     color: #666666;
  //     letter-spacing: rem(0.38px);
  //     text-align: center;
  //   }
  //   .dialog-btn {
  //     display: flex;
  //     justify-content: space-around;
  //     margin: 0 auto;
  //     .buttons {
  //       border-radius: 6px;
  //       font-size: rem(14px);
  //       letter-spacing: rem(0.35px);
  //       text-align: center;
  //       width: rem(100px);
  //       height: rem(35px);
  //       line-height: rem(35px);
  //       border: 1px solid #ff7640;
  //     }
  //     .cancel {
  //       background: #fff;
  //       color: #ff7640;
  //     }
  //     .confirm {
  //       background: #ff7640;
  //       color: #ffffff;
  //     }
  //   }
  // }
}
.contents {
  padding-top: 0;
}
</style>
