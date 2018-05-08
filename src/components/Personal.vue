<template>
<div>
    <section class="personal-header-wrap">
        <!-- 用户信息 -->
        <div class="per-user-info">
            <div class="avatar">
                <img :src="avatarImg" alt="" />
            </div>
            <div class="user-id clearfix">
                <p class="per-name">{{realName}}</p>
                <p class="per-num">{{userMobile}}</p>
            </div>
            <p class="current-rating">
                当前评级: <i class="iconfont"> &#xe672;</i>
            </p>
        </div>
        <!-- 额度信息 -->
        <div class="money-amount-info clearfix">
            <div class="left-box left">
                <p>近7天待还款(元）</p>
                <span class="perMoney">{{lateTotal}}</span>
            </div>
            <div class="right-box left">
                <p>账户余额（元）</p>
                <span class="balance">{{balance}}</span>
            </div>
        </div>
        <input class="recharge-btn" value="充值还款" />
    </section>
    <group>
        <cell title="我的分期" is-link :border-intent="true">
            <span class="cell-ico my-money" slot="icon" width="20"></span>
        </cell>
    </group>
    <!-- 借款状态 -->
    <div class="brrow-active" v-if="accountPays.length" v-for="accountPay in accountPays">
        <div class="borr-pruduct clearfix">
            <p>
                <span>{{accountPay.appProductName}} {{accountPay.installMentStri}}</span>
                <span class="total-amount">{{accountPay.totalAmount}}</span>
            </p>
        </div>
        <div class="weui-wepay-flow">
            <div class="weui-wepay-flow__bd">
                <template v-for="(node, index) in accountPay.nodeList">
                    <div class="weui-wepay-flow__li" :class="{ 'weui-wepay-flow__li_done': (index<=flowStateStep)}">
                        <div class="weui-wepay-flow__state"></div>
                        <p class="weui-wepay-flow__title-bottom"><span>{{node}}</span></p>
                    </div>
                    <div class="weui-wepay-flow__line " :class="{ 'weui-wepay-flow__line_done': (index<flowStateStep)}" v-if="3 != index">
                        <div class="weui-wepay-flow__process"></div>
                    </div>
                </template>
            </div>
        </div>
        <flow v-show="false">
            <template v-for="(node, index) in accountPay.nodeList">
                <flow-state is-done>
                    <span slot="title">{{node}}</span>
                </flow-state>
                <flow-line is-done v-if="3 != index"></flow-line>
            </template>
        </flow>
        <div class="nopass-tips" v-if="isRefuse">
            <div class="nopass-text-tips">
                <p>{{refuseMsg}}</p>
            </div>
                <a class="btn" :href="btnHref">
                <span class="ico" :class="[isDDCP ? 'ico-apply' : 'ico-go']"></span>
                <span class="title">{{btnTitle}}</span>
            </a>
        </div>
        <input v-if="signButton" class="contract-btn" type="button" value="签约" />
        <input v-if="cancelButton" class="cancel-btn" type="button" value="取消订单" />
    </div>

    <group>
        <cell title="我的优惠券" value="0张" is-link>
            <span class="cell-ico my-coupon" slot="icon" width="20"></span>
        </cell>
        <cell title="我的邀请" is-link>
            <span class="cell-ico my-invitation" slot="icon" width="20"></span>
        </cell>
    </group>

    <group> </group>

    <group>
        <cell title="我的消息" is-link>
            <span class="cell-ico" slot="icon" width="20">&#xe657;</span>
            <badge></badge>
        </cell>
        <cell title="QQ在线客服" is-link>
            <span class="cell-ico" slot="icon" width="20"></span>
        </cell>
    </group>

    <group>
        <cell title="交易明细" is-link>
            <span class="cell-ico my-money" slot="icon" width="20"></span>
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
        height: rem(260px);
        background: url(../assets/images/person_center_bg.png) no-repeat;
        background-size: 100% 100%;
        color: #fff;

        .per-user-info {
            padding: rem(30px 15px);
            position: relative;
            height: rem(40px);

            .avatar {
                width: rem(40px);
                height: rem(40px);
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
                font-size: rem(14px);
                color: #fff;
                line-height: rem(16px);

                .per-name {
                    padding-top: rem(5px);
                    margin-bottom: rem(4px);
                }

                .per-num {
                    font-size: rem(10px);
                }

            }

            .current-rating {
                font-size: rem(14px);
                float: right;
                text-align: right;
            }

        }

        .money-amount-info {
            padding: rem(0 55px);

            .left-box, .right-box {
                width: 43%;
                font-size: rem(10px);

                span {
                    font-size: rem(22px);
                }

            }

            .left-box {
                position: relative;
                text-align: left;
                padding-right: rem(18px);
            }

            .right-box {
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
            margin: rem(30px) auto 0;
            text-align: center;
            border: 0;
        }
    }

    .brrow-active{
        background: #fff;
        padding: rem(10px 30px);
        font-size: rem(12px);
        clear: both;
        overflow: hidden;
        zoom: 1;
        border-bottom: 1px solid #dadada;
        .borr-pruduct{
            p{
                color: #a4a4a4;
                span.total-amount{
                    color: #FF7640;
                    float: right;
                    display: inline-block;
                }
            }
        }
        .nopass-tips{
            width: 100%;
            padding-top: rem(10px);
            margin-top:rem(10px);
            border-top: 1px dotted #ccc;
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
                display:block;
                .ico{
                    width: 100%;
                    height: rem(20px);
                    display: block;
                    margin: 0 auto;
                }
                .ico-go{
                    background: url(../assets/images/person_center_go.png) 50% 50% no-repeat;
                    background-size: 40%
                }
                .ico-apply{
                    background: url(../assets/images/person_center_apply.png) 50% 50% no-repeat;
                    background-size: 24%
                }
                .title{
                    width: 100%;
                    display: block;
                    text-align: center;
                }
            }
        }
        .contract-btn{
            border: 1px solid #FF7640;
            color: #fff;
            float: right;
            border-radius: 5px;
            background: #FF7640;
            padding: rem(3px 5px);
            font-size: rem(14px);
        }
        .cancel-btn{
            border: 1px solid #FF7640;
            color: #FF7640;
            float: right;
            border-radius: 5px;
            background: #fff;
            padding: rem(3px 5px);
            font-size: rem(14px);
            margin-right: rem(10px);
        }
        .weui-wepay-flow, .weui-wepay-flow-auto {
            padding: rem(20px 10px 40px 10px); 
        }
    }

    .cell-ico {
        font-family: "iconfont";
        width: .75rem;
        display: inline-block;
        margin-right: rem(10px);
        font-size: .875rem;
        color: #a4a4a4;
    }
    .cell-ico:before{
        font-size: rem(20px);
        color: #a4a4a4;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
    

    .my-money:before {
        content: "\e68a";
    }
    .my-coupon:before{
        content: '\e658';
    }
    .my-invitation:before{
        content: '\e659';
    }
    .my-msg:before{
        content: '&#xe657';
    }
    .myorder:before{
        content: '\e658';
    }
    .myorder:before{
        content: '\e658';
    }
    .myorder:before{
        content: '\e658';
    }
    .myorder:before{
        content: '\e658';
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
    [class^="weui-wepay-flow__title-"], [class*=" weui-wepay-flow__title-"]{
        font-size: rem(12px);
    }
    .weui-cells{
        font-size: rem(14px)
    }
}
</style>

<script>
import { Cell, CellBox, CellFormPreview, Group, Badge, Flow, FlowState, FlowLine, Toast } from 'vux'
import PageFooter from '../components/PageFooter.vue'
import axios from 'axios'

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
    PageFooter,
    Toast
  },
  mounted () {
    var _this = this;

    function initAccountInfo(app){
        console.info('app', app);
        if(app.isRefuse){
            _this.isRefuse = true;

            _this.flowStateStep = 3;

            _this.refuseMsg = app.refuse_msg;

            if((app.industryCode=="LDDD"||app.industryCode=="MDCP"||app.industryCode=="MDOH"||app.industryCode=="LLMD"||app.industryCode=="DDCP")&&app.refuse_msg!=""){
                app.selectPro[0]='DDCP'

                _this.isDDCP = _.contains(app.selectPro, 'DDCP');

                _this.btnTitle = app.skip_btn;
                _this.btnHref = app.skip_btn_link;
                
            }else{
                // h[h.length]='<div class="notPassAudit"><p class="notPass-p">很抱歉，您提交的资料未通过审核</p><span class="notPass-span">现在您仍可以申请';
                // var arr=[];
                // for(var i  in app.selectPro){
                //     var hrefUrl="miaodai.html";
                //     if(_.contains(app.selectPro, 'DDCP')){
                //         hrefUrl="didi.html";
                //     }else if(_.contains(app.selectPro, 'LDDD')){
                //         hrefUrl="dida.html";
                //     }
                //     if(arr.length!=0){
                //         arr[arr.length]='或<a href="'+MWEB_PATH+'newweb/product/'+hrefUrl+'">【'+app.selectPro[i]+'】</a>';
                //     }else{
                //         arr[arr.length]='<a href="'+MWEB_PATH+'newweb/product/'+hrefUrl+'">【'+app.selectPro[i]+'】</a>';
                //     }
                // }
                // h[h.length]=arr.join("")+'，<br>或者在【'+app.nextDate+'】再次申请'+app.appProductName+'。';
                // h[h.length]='</span></div>';
            }
        }
    }   

    const getAccountInfoDatas = {
        'userName': _this.utils.getCookie("userName"),
        'curPage': 1,
        'maxLine': 1,
        'uuid': _this.utils.uuid()
    }

    _this.common.getAccountInfo(getAccountInfoDatas)
    .then((res) => {
        var data = res.data;
        if(data.resultCode != '1'){
            console.info('personal', _this.$route);
            _this.$vux.toast.text(data.resultMsg);
            _this.$router.push({path:"/login", query: {redirect: _this.$route.fullPath}});
        }else{
            var app = data.accountPays[0];
            _this.signButton = app.signButton;
            _this.cancelButton = app.cancelButton
            _this.realName = data.appUserRealName;       //姓名
            _this.lateTotal = data.lateTotal;            //近7天代还款
            _this.balance = data.balance;                //账户余额
            _this.accountPays = data.accountPays;        //我的分期

            if(data.headUrl){
                _this.avatarImg = data.headUrlPrefix+data.headUrl+"?t="+Math.random()
            }
            
            if(data.accountPays[0]) initAccountInfo(data.accountPays[0]);
        }
    });
  },
  methods: {
    onClick () {
      this.a
    }
  },
  data () {
    return {
        realName: this.utils.getCookie('realName'),
        userMobile: this.utils.getCookie('mobile'),
        lateTotal: 0.00,
        balance: 0.00,
        accountPays:[],
        flowStateStep:1,
        avatarImg:require('../assets/images/avator_oragin.png'),
        btnTitle: '',
        btnHref: '',
        isDDCP:'',
        refuseMsg:'',
        signButton: false,
        cancelButton: false,
        rechargeButton: false,
        detailButton: false,
        isRefuse: false
    }
  }
}
</script>
