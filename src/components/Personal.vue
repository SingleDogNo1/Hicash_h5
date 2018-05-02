<template>
<div>

<section class="personal-header-wrap">
<!-- 用户信息 -->
<div class="per-user-info">
<div class="avatar">
<img src="../assets/images/avator_oragin.png"alt=""/>
</div>
<div class="user-id clearfix">
<p class="per-name">李震</p>
<p class="per-num">123123123123</p>
</div>
<p class="current-rating">
当前评级:<i class="iconfont">&#xe672;
</i>
</p>
</div>

<!-- 额度信息 -->
<div class="money-amount-info clearfix">
<div class="left-box left">
<p>近7天待还款(元）</p>
<span class="perMoney">12312312</span>
</div>
<div class="right-box left">
<p>账户余额（元）</p>
<span class="balance">123123123123</span>
</div>
</div>

<input class="recharge-btn" value="充值还款"/>

</section>

<group>
    <cell title="我的分期" is-link >
        <span class="ico-money" slot="icon" width="20"></span>
    </cell>
    <div class=""></div>
</group>

</div>
</template>



<style lang="scss"rel="stylesheet/scss">
@import "../../bower_components/sass-rem/rem";

.personal-header-wrap {
    width: 100%;
    height: rem(185px);
    background: url(../assets/images/parson_center_bg.png) no-repeat;
    background-size: 100% 100%;
    color: #fff;

    

    .per-user-info {
        padding: rem(20px 15px);
        position: relative;
        height: rem(40px);

        .avatar {
            width: rem(32px);
            height: rem(32px);
            float: left;

            img {
                width: 100%;
                height: 100%;
            }

        }

        .user-id {
            margin-left: rem(10px);
            width: rem(85px);
            float: left;
            font-size: rem(11px);
            color: #fff;
            line-height: rem(16px);

            .per-name {
                padding-top: rem(2px);
            }

            .per-num {
                font-size: rem(10px);
            }

        }

        .current-rating {
            font-size: rem(11px);
            float: right;
            text-align: right;
        }

    }

    .money-amount-info {
        padding: rem(0 25px);

        .left-box, .right-box {
            width: 50%;
            font-size: rem(10px);

            span {
                font-size: rem(18px);
            }

        }

        .right-box {
            width: 40%;
            position: relative;
            padding-left: rem(18px);

            &:before {
                position: absolute;
                content: '';
                width: 2px;
                height: 1.525rem;
                background: #fff;
                left: -1px;
                top: rem(5px);
            }

        }

    }

    .recharge-btn {
        display: block;
        background: rgba(255, 255, 255, 0.3);
        width: 11.85rem;
        height: 1.4rem;
        font-size: 0.65rem;
        border-radius: 30px;
        color: #fff;
        margin: 0.35rem auto 0;
        text-align: center;
        border: 0;
    }

}

</style>

<script>
import { Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'

export default {
  mounted () {
    setTimeout(() => {
      this.money = -1024
    }, 2000)
  },
  components: {
    Group,
    Cell,
    CellFormPreview,
    CellBox,
    Badge
  },
  methods: {
    onClick () {
      console.log('on click')
    }
  },
  data () {
    return {
      list: [{
        label: 'Apple',
        value: '3.29'
      }, {
        label: 'Banana',
        value: '1.04'
      }, {
        label: 'Fish',
        value: '8.00'
      }],
      money: null,
      showContent001: false,
      showContent002: false,
      showContent003: false,
      showContent004: false
    }
  }
}
</script>
