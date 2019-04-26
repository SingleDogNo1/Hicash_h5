<template>
  <div class="content">
    <div class="jump-bank" v-if="isJumpBank">
      <p>正在跳转银行页面...</p>
    </div>
    <div class="success" v-else>
      <p>
        提现中
        <br>请等待
      </p>
      <input type="button" value="返回" class="btn" @click="jumpPersonalCenter">
    </div>
  </div>
</template>

<script>
import WithdrawalsTransfer from "@/api/withdrawalsTransfer";
import JumpBank from "@/assets/js/jumpBank";
export default {
  data() {
    return {
      isJumpBank: false,
      type: this.$route.query.type,
      txAmount: this.$route.query.txAmount,
      appNo: this.$route.query.appNo,
      userName: this.$route.query.userName
    };
  },
  methods: {
    jumpPersonalCenter() {
      //跳转到个人中心
      var obj = { type: "h5_user_center" };
      window.hicashJSCommunication.jumpPage(JSON.stringify(obj));
    }
  },
  mounted() {
    if (this.type) {
      this.isJumpBank = false;
      setTimeout( () => {
        this.jumpPersonalCenter();
      }, 3000);
    } else {
      this.isJumpBank = true;
      let withdrawDataObj = new URLSearchParams();
      withdrawDataObj.append("txAmount", this.txAmount);
      withdrawDataObj.append("appNo", this.appNo);
      withdrawDataObj.append("userName", this.userName);
      withdrawDataObj.append("uuid", this.utils.uuid());
      WithdrawalsTransfer.queryWithdrawData(withdrawDataObj).then(res => {
        let data = res.data;
        if (data.resultCode === "0") {
          this.$vux.toast.show({
            type: "text",
            position: "middle",
            text: data.resultMsg
          });
          setTimeout( ()=> {
            this.jumpPersonalCenter();
          }, 3000);
          return false;
        }
        setTimeout( ()=> {
          JumpBank.postcall(data.followUrl, data.map);
        },2000)
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";
.content {
  width: 100%;
  height: 100%;
  padding-top: rem(88px);
  background: #efefef url("./images/bg_withdrawals.png") center rem(88px)
    no-repeat;
  background-size: 142.5px 202.5px;
  p {
    margin-top: rem(220px);
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 15px;
    color: #333333;
  }
  .btn {
    display: block;
    width: 50%;
    height: rem(44px);
    line-height: rem(42px);
    color: #fff;
    background: #ff7640;
    border-radius: 5px;
    margin: 0 auto;
    margin-top: 10%;
    font-size: 16px;
    cursor: pointer;
    border: 0;
  }
}
</style>

