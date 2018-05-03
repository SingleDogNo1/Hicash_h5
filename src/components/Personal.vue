<template>
<div>
    <section class="personal-header-wrap">
        <!-- 用户信息 -->
        <div class="per-user-info">
            <div class="avatar">
                <img src="../assets/images/avator_oragin.png" alt="" />
            </div>
            <div class="user-id clearfix">
                <p class="per-name">李震</p>
                <p class="per-num">123123123123</p>
            </div>
            <p class="current-rating">
                当前评级:<i class="iconfont">&#xe672;</i>
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
        <input class="recharge-btn" value="充值还款" />
    </section>
    <group>
        <cell title="我的分期" is-link :border-intent="true">
            <span class="ico-money" slot="icon" width="20"></span>
        </cell>
    </group>
    <!-- 借款状态 -->
    <div class="brrow-active">
        <div class="borr-pruduct clearfix">
            <p>嗨秒分期 3个月</p>
        </div>
        <flow>
            <flow-state title="1" is-done></flow-state>
            <flow-line is-done :line-span="15"></flow-line>

            <flow-state title="2" is-done></flow-state>
            <flow-line is-done :line-span="30"></flow-line>

            <flow-state title="3" is-done></flow-state>
            <flow-line :line-span="45" :process-span="60"></flow-line>

            <flow-state title="5"></flow-state>
        </flow>
        <div class="nopass-tips">
            <div class="nopass-text-tips">
                <p>很抱歉您的嗨秒分期审核未通过，</p>
                <p>可至【磐多拉信用】申请，选择更多、通过率更高</p>
            </div>
            <div class="btn">
                
            </div>
        </div>
    </div>

    <group>
        <cell title="我的优惠券" value="0张" is-link>
            <span class="ico-money" slot="icon" width="20"></span>
        </cell>
        <cell title="我的邀请" is-link>
            <span class="ico-money" slot="icon" width="20"></span>
        </cell>
    </group>

    <group> </group>

    <group>
        <cell title="我的消息" is-link>
            <span class="ico-money" slot="icon" width="20"></span>
            <badge></badge>
        </cell>
        <cell title="QQ在线客服" is-link>
            <span class="ico-money" slot="icon" width="20"></span>
        </cell>
    </group>

    <group>
        <cell title="交易明细" is-link>
            <span class="ico-money" slot="icon" width="20"></span>
        </cell>
    </group>
    <page-footer></page-footer>
</div>
</template>



<style lang="scss"rel="stylesheet/scss">
@import "../../bower_components/sass-rem/rem";
.Personal{
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

    .brrow-active{
        background: #fff;
        padding: rem(10px 30px);
        font-size: .5rem;
        clear: both;
        overflow: hidden;
        zoom: 1;
        border-bottom: 1px solid #dadada;
        .borr-pruduct{
            p{
                color: #a4a4a4;
            }
        }
        .nopass-tips{
            width: 100%;
            margin-top: rem(10px);
            .nopass-text-tips{
                width: 70%;
                color: #333;
                font-size: rem(10px);
                text-align: justify;
                float: left;
            }
            .btn{
                width: 20%;
                padding: rem(3px 5px);
                background: #ff7640;
                color:#fff;
                float: right;
                border-radius: 5px;
                margin-top: rem(5px);
                &:before{
                    content: '';
                    width: 100%;
                    height: rem(20px);
                    display: block;
                    margin: 0 auto;
                    background: url(../assets/images/parson_center_go.png) 50% 50% no-repeat;
                    background-size: 40%
                }
                &:after{
                    content: '立即前往';
                    width: 100%;
                    display: block;
                    text-align: center;
                }
            }
        }
        .weui-wepay-flow, .weui-wepay-flow-auto {
            padding: rem(20px 10px 25px 10px);
            border-bottom: 1px dotted #ccc;
        }
    }


    .weui-cells{
        margin-top: rem(8px) !important;
    }
    .weui-wepay-flow__li_done .weui-wepay-flow__state,.weui-wepay-flow__process, [class^="weui-wepay-flow__info-"]{
        background-color: #ff7640 !important;
    }
    .weui-wepay-flow__info-bottom:after {
        border-color: transparent transparent #ff7640 transparent  !important;
    }
}
</style>

<script>
import { Cell, CellBox, CellFormPreview, Group, Badge, Flow, FlowState, FlowLine } from 'vux'
import PageFooter from '../components/PageFooter.vue'

export default {
  components: {
    Group,
    Cell,
    CellFormPreview,
    CellBox,
    Badge,
    Flow,
    FlowState,
    FlowLine,
    PageFooter
  },
  mounted () {

    const getAccountInfoDatas = {
        'userName': this.utils.getCookie("userName"),
        'curPage': 1,
        'maxLine': 1,
        'uuid': this.utils.uuid()
    }

    this.common.getAccountInfo(getAccountInfoDatas)
    .then((res) => {

    });
  },
  methods: {
    onClick () {
      this.a
    }
  },
  data () {
    return {
      a:''
    }
  }
}
</script>
