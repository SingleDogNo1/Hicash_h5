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
      <div class="banner">
        <img src="./images/banner.png" alt>
      </div>
      <div class="list">
        <!-- <div class="list-box">
          <div @click.stop="queryCreditUrl(list[0])" class="list-row">
            <div class="icon">
              <img src="./images/operator.png" alt>
            </div>
            <div class="txt">运营商</div>
          </div>
        </div>
        <div class="list-box">
          <div @click.stop="queryCreditUrl(list[1])" class="list-row">
            <div class="icon">
              <img src="./images/element.png" alt>
            </div>
            <div class="txt">饿了么</div>
          </div>
        </div>
        <div class="list-box active">
          <div @click.stop="queryCreditUrl(list[2])" class="list-row">
            <div class="icon">
              <img src="./images/haluo.png" alt>
            </div>
            <div class="txt">哈罗单车</div>
          </div>
        </div>
        <div class="list-box active">
          <div @click="queryCreditUrl(list[3])" class="list-row">
            <div class="icon">
              <img src="./images/jd.png" alt>
            </div>
            <div class="txt">京东</div>
          </div>
        </div>-->
        <div
          class="list-box"
          :span="1/3"
          v-for="(item ,  i) in list"
          :key="i"
          :class="{'active':i!=0&&i!=1}"
        >
          <div @click.stop="queryCreditUrl(item)" class="list-row">
            <div class="icon">
              <img :src="item.iconUrl" alt>
            </div>
            <div class="txt">{{item.reportName}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="rule">
      <h3>活动规则</h3>
      <div class="rule-detail">
        <p>即日起，首次在嗨钱+进行信用认证的用户即可获得嗨钱免息代金券</p>
        <p class="rule-list">
          1、完成运营商信用认证可获得10元免息代金券
          <br>2、完成京东信用认证可获得10元免息代金券
          <br>3、完成哈喽单车信用认证可获得10元免息代金券
          <br>4、完成饿了么信用认证可获得10元免息代金券
          <br>
        </p>
        <p class="p1">完成嗨钱+全部信用认证，更有机会获得随机发放的10元免息代金券</p>
        <p class="p1">PS：用户还款金额需在2000元以上时才能使用该优惠券。</p>
        <p>#本活动最终解释权归嗨钱所有#</p>
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
      platform: this.utils.getPlatform(),
      list: [],
      userName: this.utils.getCookie("userName"),
      mediasource: this.$route.query.mediasource
    };
  },
  created() {
    this.getUserCreditReports();
  },
  methods: {
    getUserCreditReports() {
      window.sessionStorage.setItem('mediasource', this.mediasource);
      if (!this.userName) {
        this.list = [
          {
            reportType: "operator",
            status: "",
            iconUrl: require("./images/operator.png"),
            reportName: "运营商"
          },

          {
            reportType: "eleme",
            status: "",
            iconUrl: require("./images/element.png"),
            reportName: "饿了么"
          },
          {
            reportType: "helloBike",
            status: "",
            iconUrl: require("./images/haluo.png"),
            reportName: "哈啰单车"
          },
          {
            reportType: "jd",
            status: "",
            iconUrl: require("./images/jd.png"),
            reportName: "京东"
          }
        ];
      } else {
        this.common.getUserCreditReports(this.userName).then(res => {
          this.list = res.data.data;
        });
      }
    },
    queryCreditUrl(item) {
      if (!this.userName) {
        const params = {
          name: "Login",
          query: {
            redirect: this.$router.history.current.fullPath
          }
        };
        this.$router.push(params);
        return false;
      }
      let _params = {
        userName: this.userName,
        creditType: item.reportType
      };

      // let _params = new URLSearchParams();
      // _params.append("userName",this.userName);
      // _params.append("creditType", item.reportType);
      console.log(this.list);

      this.utils.setCookie("creditType", item.reportType);
      if (item.status == 0 || item.status == 3) {
        this.common.queryCreditUrl(_params).then(res => {
          let data = res.data;
          // console.info("data", data);
          if (data.userInfo) {
            this.$router.push({ name: "PandoraAuth" });
          } else {
            this.$router.push({ name: "IdentityAuth" });
          }
        });
        return false;
      }
      if (item.status == 1) {
        this.$router.push({ name: "CreditLoading" });
        return false;
      }
      if (item.status == 2) {
        let urlName = "";
        switch (item.reportType) {
          case "operator":
            urlName = "operator";
            break;
          case "jd":
            urlName = "jingdong";
            break;
          case "helloBike":
            urlName = "Haluo";
            break;
          case "eleme":
            urlName = "Eleme";
            break;
        }
        this.$router.push({ name: urlName });
        return false;
      }
    }
    // goAuthentication(val) {
    //   this.utils.setCookie("creditType", val);
    //   let obj = {};
    //   obj.userName = this.utils.getCookie("userName");
    //   obj.creditType = val;

    //   this.common.queryCreditUrl(obj).then(res => {
    //     let data = res.data;
    //     // console.info("data", data);
    //     console.log(this.$router);
    //     if (data.userInfo) {
    //       this.$router.push({ name: "PandoraAuth" });
    //     } else {
    //       this.$router.push({ name: "IdentityAuth" });
    //     }
    //   });
    // }
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
      border-radius: rem(8px);
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .list {
      padding: rem(24px) rem(42px) rem(32px);
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      // height: rem(229px);
      // align-items: space-between;
      .list-box {
        text-align: center;
        width: 50%;
        .list-row {
          //
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
            margin-top: rem(6px);
          }
        }
      }
      .active {
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
.contents {
  padding-top: 0;
}
</style>
