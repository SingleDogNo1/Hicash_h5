<template>
    <div>
        <!-- 评级弹框 171204 -->
        <div class="rate-pop-mask" v-transfer-dom style="display:none">
            <x-dialog v-model="show" class="dialog-demo">
                <div class="img-box">
                    <span class="level-up">{{level}}</span>
                    <!-- 跳转操作 -->
                    <router-link class="go-to-rate-page" :to="{name: 'CompreRat'}">
                        了解用户评级
                    </router-link>
                    <a class="i-konw" href="javascript:" @click="show=false">我知道了</a>
                </div>
            </x-dialog>
        </div>
        <!-- 优惠券弹框  171015 -->
        <div class="coupon-pop-mask" v-transfer-dom v-show="show">
            <popup v-model="show">
                <div class="popup0">
                    <h4 class="title">
                        您有<span class="total-num">{{totalNum}}</span>张优惠券，进入签约页面可选择使用
                        <span class="vux-close" @click="show=false"></span>
                    </h4>
                    <ul class="pro-coupon-list">
                        <li v-for="discountListItem in discountList" :class="{'coupon-percent': discountListItem.couponType === '1'}">
                            <div class="pro-coupon-wrap-left">
                                <h5>{{discountListItem.discountName}}</h5>
                                <p class="amount-limit">{{discountListItem.msgstr}}</p>
                                <p class="date-limit">{{discountListItem.timeStr}}</p>
                            </div>
                            <div class="pro-coupon-wrap-right">
                                <span v-if="discountListItem.couponType !== '1'">
                                    <span class="coupon-amount">{{discountListItem.discount}}</span>
                                    <span>元</span>
                                </span>
                                <span v-if="discountListItem.couponType === '1'">
                                    <span class="coupon-amount">{{discountListItem.discount}}</span>
                                    <span>%</span>
                                </span>
                                <button class="btn-use">去使用</button>
                            </div>
                            <div class="clear"></div>
                        </li>
                    </ul>
                </div>
            </popup>
        </div>
        <!-- 如果是三期的 就去app申请 -->
        <div class="apply-pop-mask" v-transfer-dom style="display:none">
            <x-dialog v-model="show" class="dialog-demo">
                <div class="img-box">
                    <div class="action">
                        <router-link class="btn-to-home" :to="{name: 'Home'}" @click="show=false">
                            以后再说
                        </router-link>
                        <router-link class="btn-download" :to="{name: 'Home'}">
                            下载app
                        </router-link>
                    </div>
                </div>
            </x-dialog>
        </div>
        <div class="container">
            <header class="miaodai-header">
                <a class="go-history" href="javascript:" @click="goBack"></a>
                <h1 style="display: none;"><a href="../../index.html"></a></h1>
                <!-- 20170830  添加QQ  start -->
                <div class="QQhandler"><a href="http://wpa.b.qq.com/cgi/wpa.php?ln=2&uin=4008085599" target='_blank'></a></div>
                <!-- 20170830  添加QQ  end -->
            </header>
            <div class="pro-name-wrap">
                <div class="pro-name-card-wrap">
                    <h3 class="title">
                        <strong></strong>
                        <span>期数灵活</span>
                    </h3>
                    <div class="content">
                        <img src="../assets/images/icon_miaodai.png"/>
                        <p>期数灵活 闪电到账<br />最快2小时到账</p>
                        <!-- 添加优惠券 171015 start -->
                        <div class="pro_coupon_note" style="display:none;">
                                优惠券(<span class="pro_coupon_number">5</span>)
                        </div>
                    </div>
                </div>
            </div>
            <div class="pro-data-wrap">
                <div class="loan-desc-wrap">
                    <div class="loan-amount-list">
                        <div class="title">借款金额</div>
                        <checker v-model="amountSelectedIndex" default-item-class="amount-item" radio-required selected-item-class="amount-item-selected">
                            <checker-item v-for="(amountListItem, index) in amountList" v-model="index" v-bind:data-amount="amountListItem" v-bind:data-index="index" @on-item-click="selectLoanAmount(amountListItem)" :key="index">
                                {{amountListItem}}
                            </checker-item>
                        </checker>
                        <div class="clear"></div>
                    </div>
                    <div class="loan-time-list">
                        <div class="title">借款时间</div>
                        <checker v-model="timeSelectedIndex" default-item-class="time-item" radio-required selected-item-class="time-item-selected">
                            <checker-item v-for="(programListItem, index) in programList" v-model="index" @on-item-click="selectLoanTime(programListItem)" :key="index">
                                <span>{{programListItem.installments}}</span><span>{{periodUnit}}</span>
                            </checker-item>
                            <div class="clear"></div>
                        </checker>
                    </div>
                    <div class="rate-wrap">
                        <p>每期最低本息还款：<span class="rate-repay">￥{{lowPay}}</span></p>
                        <div class="rate-handler">
                            <p>月利率：<span class="rate-percentage">{{ratePercentage}}</span></p>
                            <router-link class="rate-calculator" :to="{name: 'RateCalculation', params: {from: 'MDCP', tranPrice: amountSelected, loanProduct: timeSelected.loanProduct}}">
                                费率计算器
                            </router-link>
                        </div>
                    </div>
                    <button class="btn-by-stages" @click="btnByStages">立即分期</button>
                </div>
            </div>
        </div>
    </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
    body {
        background: #fff;
        .clear {
            clear: both;
        }
        .rate-pop-mask {
            position: fixed;
            width: 100%;
            height: 100%;
            background: rgba(50,50,50,.7);
            top: 0;
            left: 0;
            z-index: 9999;
            .weui-dialog {
                width: 11.525rem !important;
                height: 19.3rem !important;
                overflow: visible !important;
                .img-box {
                    width: 100%;
                    height: 100%;
                    background: url("../assets/images/bg_rate.png") center center no-repeat;
                    background-size: cover;
                    .level-up {
                        position: absolute;
                        z-index: 999;
                        width: 2.825rem;
                        height: 2.85rem;
                        background: url(../assets/images/bg_level_up.png) 0 0 no-repeat;
                        background-size: cover;
                        left: 38%;
                        top: 10.3rem;
                        font-size: 1.8rem;
                        line-height: 2.825rem;
                        text-align: center;
                        color: #282724;
                    }
                    .go-to-rate-page {
                        position: absolute;
                        left: 33%;
                        bottom: 1.4rem;
                        font-size: .65rem;
                        color: #2E2B25;
                        text-decoration: underline;
                    }
                    .i-konw {
                        position: absolute;
                        width: 7.625rem;
                        height: 1.875rem;
                        background: #424242;
                        border-radius: 8px;
                        font-size: .8rem;
                        color: #fff;
                        line-height: 1.875rem;
                        text-align: center;
                        left: 17%;
                        bottom: -1rem;
                    }
                }
            }
        }
        .coupon-pop-mask {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(20,20,20,.8);
            z-index: 999;
            .title {
                height: 1.8rem;
                line-height: 1.8rem;
                padding: 0 .85rem;
                font-size: 0.65rem;
                color: #696969;
                background: #fff;
            }
            .vux-close {
                position: absolute;
                top: .35rem;
                right: .85rem;
                display: inline-block;
                vertical-align: middle;
                color: #333;
                width: 24px;
                height: 24px;
                &:before,
                &:after {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 11px;
                    width: 24px;
                    height: 1px;
                    background-color: currentColor;
                    transform: rotate(-45deg);
                }
                &:after {
                    transform: rotate(45deg);
                }
            }
            .pro-coupon-list {
                padding: 0.85rem;
                height: 18rem;
                overflow: scroll;
                li {
                    padding: .75rem 0.8rem;
                    margin-bottom: 0.8rem;
                    border-top: 5px solid #F67534;
                    border-radius: 8px;
                    background: #fff;
                    .pro-coupon-wrap-left {
                        float: left;
                        width: 70%;
                        color: #A2A2A2;
                        font-size: 0.65rem;
                        line-height: 1.6em;
                        h5 {
                            margin-right: 1.5rem;
                            font-size: .8rem;
                            line-height: 2em;
                            color: #333;
                            border-bottom: 1px dashed #F3F3F3;
                            margin-bottom: 0.5rem;
                        }
                    }
                    .pro-coupon-wrap-right {
                        float: right;
                        width: 30%;
                        color: #F67534;
                        font-size: .75rem;
                        .coupon-amount {
                            font-size: 1.8rem;
                            font-weight: 400;
                        }
                        .btn-use {
                            width: 3rem;
                            height: 1.15rem;
                            border: 1px solid #FF7314;
                            color: #F67534;
                            font-size: .65rem;
                            margin-top: 0.2rem;
                            border-radius: 50px;
                            background: none;
                        }
                    }
                }
                li.coupon-percent {
                    border-color: #FFBF3C;
                    .pro-coupon-wrap-right {
                        color: #FFBF3C;
                        .btn-use {
                            border: 1px solid #FFBF3C;
                            color: #FFBF3C;
                        }
                    }
                }
            }
        }
        .apply-pop-mask {
            position: fixed;
            width: 100%;
            height: 100%;
            background: rgba(51,51,51,0.6);
            top: 0;
            left: 0;
            z-index: 999999;
            .weui-dialog {
                width: 14.5rem;
                height: 9.625rem;
                .img-box {
                    width: 100%;
                    height: 100%;
                    background: url("../assets/images/bg_st_3_pop.png") center center no-repeat;
                    background-size: 300px 216px;
                    .action {
                        width: 100%;
                        height: 1.45rem;
                        position: absolute;
                        bottom: .8rem;
                        text-align: center;
                        a {
                            display: inline-block;
                            font-size: 0.6rem;
                            width: 5.175rem;
                            height: 1.45rem;
                            line-height: 1.45rem;
                            border-radius: 5px;
                            margin: 0 .1rem;
                            background: #5B8FE9;
                            color: #fff;
                        }
                    }
                }
            }
        }
        .container {
            width: 100%;
            height: 100%;
            background: #fff;
            position: relative;
            .miaodai-header {
                position: absolute;
                background: none;
                left: 0;
                top: 0;
                .go-history {
                    left: .85rem;
                }
                .go-history:before {
                    color: #C04F23;
                }
                .QQhandler {
                    width: 1.2rem;
                    height: 1.2rem;
                    background: url(../assets/images/icon-QQHandler.png) center center no-repeat;
                    background-size: cover;
                    position: absolute;
                    top: 50%;
                    -webkit-transform: translate(0,-50%);
                    -moz-transform: translate(0,-50%);
                    -ms-transform: translate(0,-50%);
                    -o-transform: translate(0,-50%);
                    transform: translate(0,-50%);
                    right: 0.8rem;
                    a{
                        display: block;
                        width: 100%;
                        height: 100%;

                    }
                }
            }
            .pro-name-wrap {
                width: 100%;
                height: 8.82rem;
                background: -webkit-linear-gradient(top,#FD7F5F,#FC915C);
                position: absolute;
                top: 0;
                left: 0;
                .pro-name-card-wrap {
                    width: 13.875rem;
                    height: 6.75rem;
                    position: absolute;
                    left: 50%;
                    -webkit-transform: translate(-50%,0);
                    -moz-transform: translate(-50%,0);
                    -ms-transform: translate(-50%,0);
                    -o-transform: translate(-50%,0);
                    transform: translate(-50%,0);
                    bottom: 0;
                    box-shadow: 0px -8px 20px #F17D59;
                    h3 {
                        width: 100%;
                        height: 1.8rem;
                        background: -webkit-linear-gradient(left,#FAAD8A,#FC8E5D);
                        position: relative;
                        border-radius: 10px 10px 0 0;
                        strong {
                            position: absolute;
                            width: 3.725rem;
                            height: .925rem;
                            top: .45rem;
                            left: 1.25rem;
                            background: url(../assets/images/icon_miaodai_text.png) 0 0 no-repeat;
                            -webkit-background-size: cover;
                            background-size: cover;
                        }
                        span {
                            position: absolute;
                            width: 2.5rem;
                            height: .8rem;
                            line-height: .8rem;
                            text-align: center;
                            border: 1px solid #fff;
                            border-radius: 15px;
                            font-size: 0.5rem;
                            color: #fff;
                            right: 0.85rem;
                            top: .525rem;
                            font-weight: 400;
                        }
                    }
                    .content {
                        height: 4.95rem;
                        background: #fff;
                        position: relative;
                        img {
                            position: absolute;
                            width: 4.1rem;
                            height: 4.1rem;
                            top: .825rem;
                            left: 1.175rem;
                        }
                        p {
                            position: absolute;
                            font-size: 0.6rem;
                            color: #999;
                            top: 1.5rem;
                            right: 1.7rem;
                            line-height: 1.6em;
                        }
                    }
                }
            }
            .pro-data-wrap {
                width: 100%;
                height: 16.38rem;
                background: #fff;
                padding-top: 1.7rem;
                box-shadow: 0 -2px 5px #E3E0E0;
                position: absolute;
                top: 8.8rem;
                z-index: 99;
                .loan-desc-wrap {
                    width: 100%;
                    height: 100%;
                    overflow-y: scroll;
                    .loan-amount-list {
                        width: 13.5rem;
                        padding-bottom: .125rem;
                        border-bottom: none;
                        margin: 0 auto;
                        .title {
                            position: relative;
                            text-align: left;
                            border-bottom: 1px solid #DDDDDD;
                            padding: 0.5rem 0 0.4rem 1.3rem;
                            margin-bottom: 0.6rem;
                            font-size: 0.7rem;
                            color: #3f3f3f;
                        }
                        .vux-checker-box {
                            width: 100%;
                            padding: 0 .75rem;
                            .amount-item {
                                float: left;
                                width: 3.55rem;
                                height: 1.35rem;
                                text-align: center;
                                line-height: 1.35rem;
                                margin-left: .45rem;
                                margin-bottom: 0.45rem;
                                border-radius: 5px;
                                border: .075rem solid #fff;
                                font-size: 0.75rem;
                                color: #A4A4A4;
                                border: 1px dashed #ddd;
                            }
                            .amount-item-selected {
                                border-style: solid;
                                background: #FF7640;
                                color: #fff;
                            }
                        }
                    }
                    .loan-time-list {
                        width: 13.5rem;
                        padding: 0 0.75rem;
                        border-bottom: none;
                        margin: 0 auto;
                        .title {
                            position: relative;
                            text-align: left;
                            border-bottom: 1px solid #DDDDDD;
                            padding: 0.5rem 0 0.4rem 1.3rem;
                            margin-bottom: 0.6rem;
                            font-size: 0.7rem;
                            color: #3f3f3f;
                        }
                        .vux-checker-box {
                            width: 100%;
                            padding: 0 .75rem;
                            .time-item {
                                float: left;
                                width: 3.55rem;
                                height: 1.35rem;
                                text-align: center;
                                line-height: 1.35rem;
                                margin-left: .45rem;
                                margin-bottom: 0.45rem;
                                border-radius: 5px;
                                border: .075rem solid #fff;
                                font-size: 0.75rem;
                                color: #A4A4A4;
                                border: 1px dashed #ddd;
                            }
                            .time-item-selected {
                                border-style: solid;
                                background: #FF7640;
                                color: #fff;
                            }
                        }
                    }
                    .rate-wrap {
                        width: 90%;
                        height: 2rem;
                        font-size: .65rem;
                        color: #666;
                        padding: 0 0.675rem;
                        line-height: 1.6em;
                        margin: 0.8rem 0 0.4rem;
                        .rate-repay {
                            color: #FF7640;
                        }
                        .rate-handler {
                            position: relative;
                            .rate-calculator {
                                position: absolute;
                                color: #FF7640;
                                right: 0;
                                top: 0;
                                width: 4rem;
                                height: 0.9rem;
                                line-height: 0.9rem;
                                background: none;
                                text-align: right;
                            }
                            .rate-calculator:before {
                                position: absolute;
                                content: '\e66f';
                                font-family: 'iconfont';
                                font-size: 0.7rem;
                                left: 0rem;
                                top: 50%;
                                -webkit-transform: translate(0,-50%);
                                -moz-transform: translate(0,-50%);
                                -ms-transform: translate(0,-50%);
                                -o-transform: translate(0,-50%);
                                transform: translate(0,-50%);
                                cursor: pointer;
                            }
                        }
                    }
                    .btn-by-stages {
                        font-size: .65rem;
                        width: 14rem;
                        height: 1.9rem;
                        background: #333;
                        border-radius: 5px;
                        color: #fff;
                        display: block;
                        margin: 0 auto 0.5rem;
                        border: none;
                    }
                }
            }
        }
    }
    .vux-loading {
        .weui-toast {
            width: 5em !important;
            min-height: 5em !important;
            .weui-loading {
                margin: 22px 0 0 !important;
            }
        }
    }
</style>

<script type="text/javascript">
    import {Loading, XDialog, XButton, Popup, Group, Checker, CheckerItem, TransferDomDirective as TransferDom} from 'vux'
    import $ from 'jquery'
    import common from '@/api/common'
    import utils from '@/assets/js/utils'

    var getMonthPay = function(amountSelected, timeSelected) {
        return new Promise((resolve,reject)=>{
            var postData = new URLSearchParams();
            postData.append('firstRate', 0);
            postData.append('tranPrice', amountSelected);
            postData.append('loanProduct', timeSelected.loanProduct);
            common.loanAmtCalculateForNew(postData)
                .then((res)=>{
                    if(res.data.resultCode === '1') {
                        var params = new URLSearchParams();
                        var days = timeSelected.installments * 30;
                        params.append('industryCode', 'MDCP');
                        params.append('amount', amountSelected);
                        params.append('days', days);
                        common.loanPay(params)
                            .then((res)=>{
                                resolve(res.data);
                            });
                    } else {
                        reject(res.data.resultMsg);
                    }
                });
        })
    }

    export default {
        directives: {
            TransferDom
        },
        components: {
            Loading,
            XDialog,
            XButton,
            Popup,
            Group,
            Checker,
            CheckerItem
        },
        data () {
            return {
                show: false,
                amountSelectedIndex: 0,
                timeSelectedIndex: 1,
                amountSelected: 0,
                timeSelected: 0,
                level: '',
                totalNum: 0,
                discountList: [],
                amountList: [],
                programList: [],
                periodUnit: '',
                queryAmountSelected: 0,
                lowPay: '',
                ratePercentage: '',
                obj: {}
            }
        },
        ready () {

        },
        methods : {
            goBack () {
                var comeFrom = utils.getQueryString("comeFrom");
                // switch (comeFrom){
                //     case 'ddLdp':
                //         _this.$router.push({path: '/login'});
                //     break;
                //     case 1:
                //         break;
                //     case 2:
                //         break;
                // }
                this.$router.push({path: '/'});
            },
            selectLoanAmount (item) {
                this.amountSelected = item;
                getMonthPay(this.amountSelected , this.timeSelected)
                    .then((data)=>{
                        if(data.resultCode === '1') {
                            this.lowPay = data.lowPay;
                            this.ratePercentage = data.lowRate+ "%-" + data.highRate + "%";
                        } else {
                            this.errorMsg = res.data.resultMsg;
                            this.$vux.toast.show({
                                type: 'cancel',
                                position: 'middle',
                                text: this.errorMsg
                            })
                        }
                    });
            },
            selectLoanTime (item) {
                if(item.loanProduct == 0) {
                    this.$vux.toast.text('对不起，该期额度已被抢光哦！请选择3个月借款期限！', 'middle');
                    return;
                }
                this.timeSelected = item;
                getMonthPay(this.amountSelected , this.timeSelected)
                    .then((data)=>{
                        if(data.resultCode === '1') {
                            this.lowPay = data.lowPay;
                            this.ratePercentage = data.lowRate+ "%-" + data.highRate + "%";
                        } else {
                            this.errorMsg = res.data.resultMsg;
                            this.$vux.toast.show({
                                type: 'cancel',
                                position: 'middle',
                                text: this.errorMsg
                            })
                        }
                    });
            },
            btnByStages () {
                var postData = new URLSearchParams();
                postData.append('uuid', '0c8297d7-6d3a-46da-b782-0df2434f88b1');
                postData.append('fastAmt', this.amountSelected);
                postData.append('fastPeriod', this.timeSelected.loanProduct);
                postData.append('userName', utils.getCookie("userName"));
                postData.append('stu_card_front', utils.getCookie("mediasource"));
                if (utils.getQueryString("appNO")) {
                    postData.appFlowNo = utils.getQueryString("appNO");
                }
                //setTimeout(() => {
                    this.$vux.loading.show({
                        text: '加载中，请稍等……'
                    })
                //},1000)

                var params = new URLSearchParams();
                params.append('industryCode', this.obj.industryCode);
                params.append('custType', utils.getCookie("custType"));
                params.append('mobile', utils.getCookie("mobile"));
                params.append('is_type', 'N');
                params.append('uuid', utils.uuid());
                params.append('user_name', utils.getCookie("userName"));
                params.append('applyFrom', 'H5');
                params.append('periods', this.timeSelected.installments);
                common.checkSupportApp(params)
                    .then((result)=>{
                        if(result.data.resultCode=="1" && result.data.success){
                            common.fastLoanFirst(postData)
                                .then((res)=>{
                                    setTimeout(() => {
                                        this.$vux.loading.hide()
                                    },1000)
                                    if(res.data.resultCode == "1") {
                                        if(res.data.appFlowNo == ""){
                                            this.$vux.toast.show({
                                                type: 'cancel',
                                                position: 'middle',
                                                text: '临时订单创建失败'
                                            })
                                            return;
                                        }
                                        utils.setCookie("industryCode", this.obj.industryCode);
                                        utils.setCookie("xykFrom", "0");
                                        utils.setCookie("appFlowNo", utils.getCookie("userName") + ":"
                                                + res.data.appFlowNo);
                                        utils.setCookie("prodetailInfo", this.amountSelected + ":" + this.timeSelected.loanProduct);
                                        setTimeout(()=>{
                                            this.$router.push({path: '/identityAuthentication'});
                                        },1500)
                                    } else if (res.data.resultCode == "60100") {
                                        setTimeout(()=>{
                                            this.$router.push({path: '/login', query: {redirect: this.$route.fullPath}});
                                        },1500)
                                    } else if(result.data.resultCode=="1"){
                                        this.$vux.toast.show({
                                            type: 'cancel',
                                            position: 'middle',
                                            text: '您暂不支持该产品'
                                        })
                                    } else {
                                        this.$vux.toast.show({
                                            type: 'cancel',
                                            position: 'middle',
                                            text: result.data.resultMsg
                                        })
                                        this.$vux.loading.hide()
                                    }
                                });
                        } else if(result.resultCode=="1"){
                            setTimeout(() => {
                                this.$vux.loading.hide()
                            },1000)
                            this.$vux.toast.show({
                                type: 'cancel',
                                position: 'middle',
                                text: '您暂不支持该产品'
                            })
                        } else {
                            this.$vux.toast.show({
                                type: 'cancel',
                                position: 'middle',
                                text: result.data.resultMsg
                            })
                            this.$vux.loading.hide()
                        }
                    });
            }
        },
        mounted: function () {
            var userName = utils.getCookie("userName");
            if(userName && userName != "null" && utils.getCookie("pj") && utils.getCookie("pj") != "null" && utils.getCookie("pjread") == "0"){
                this.level = 'B';
                this.show = true;
                utils.setCookie("pjread","1");
            }
            var custType = utils.getCookie("custType");
            var inOneMonthReg = utils.getCookie("inOneMonthReg");
            var isLanUserFlag = utils.getCookie("isLanUserFlag");
            var isDoubleSales = utils.getCookie("isDoubleSales");//是否二次营销
            if(custType != "KHL1" && custType != "KHL2"){
                custType="KHL2";
            }
            var obj = {
                industryCode : "MDCP",//普通（白领+学生）
                merProId : "8537",
                supplierId : "2395",
                saleSiteId : "2072",
                custType : custType
            }
            if(isDoubleSales == "1"){
                obj.industryCode = "MDOH",//二次营销
                obj.merProId = "8537",
                obj.supplierId = "2395",
                obj.saleSiteId = "2072"
            }
            if(inOneMonthReg == "1" && isLanUserFlag == "1"){
                obj.industryCode = "LLMD",//蓝领
                obj.merProId = "8537",
                obj.supplierId = "2395",
                obj.saleSiteId = "2072"
            }
            this.obj = obj;
            if (unescape(utils.getCookie("userName")) != ""|| unescape(utils.getCookie("userName")) != "undefined"|| unescape(utils.getCookie("userName")) != "null") {
                var postData = new URLSearchParams();
                postData.append('uuid', '0c8297d7-6d3a-46da-b782-0df2434f88b1');
                postData.append('userName', unescape(utils.getCookie("userName")));
                postData.append('industryCode', obj.industryCode);
                common.getApplyCouponList(postData)
                    .then((res)=>{
                        if(res.data.resultCode == "1") {
                            if(res.data.discountList && res.data.discountList.length > 0){
                                this.totalNum = res.data.discountList.length;
                                this.discountList = res.data.discountList;
                            }
                        };
                    });
                var params = new URLSearchParams();
                postData.append('uuid', '0c8297d7-6d3a-46da-b782-0df2434f88b1');
                postData.append('industryCode', obj.industryCode);
                postData.append('requestSource', 'HTML5');
                postData.append('userName', userName);
                common.queryProductDetail(postData)
                    .then((res)=>{
                        if(res.data.resultCode == "1") {
                            var productinfoList = res.data.productinfoList[0];
                            this.periodUnit = productinfoList.periodUnit;
                            this.amountList = productinfoList.amountList;
                            this.programList = productinfoList.programList;
                            let tranPrice = this.$route.query.tranPrice;
                            let loanProduct = this.$route.query.loanProduct;
                            if(tranPrice && loanProduct){
                                let currentAmountSelectedIndex = this.amountList.indexOf(tranPrice);
                                this.amountSelectedIndex = currentAmountSelectedIndex;
                                this.amountSelected = tranPrice;
                                let loanProductList = _.pluck(this.programList, 'loanProduct');
                                let currentTimeSelectedIndex = loanProductList.indexOf(loanProduct);
                                this.timeSelectedIndex = currentTimeSelectedIndex;
                                let currentTimeSelected = this.programList.filter((item)=>{
                                    return item.loanProduct === loanProduct
                                })
                                this.timeSelected = currentTimeSelected[0];
                                getMonthPay(tranPrice, currentTimeSelected[0]).then((data)=>{
                                    if(data.resultCode === '1') {
                                        this.lowPay = data.lowPay;
                                        this.ratePercentage = data.lowRate+ "%-" + data.highRate + "%";
                                    } else {
                                        this.errorMsg = res.data.resultMsg;
                                        this.$vux.toast.show({
                                            type: 'cancel',
                                            position: 'middle',
                                            text: this.errorMsg
                                        })
                                    }
                                });
                            } else {
                                this.amountSelected = this.amountList[0];
                                this.timeSelected = this.programList[this.programList.length - 1];
                                getMonthPay(this.amountSelected, this.timeSelected).then((data)=>{
                                    if(data.resultCode === '1') {
                                        this.lowPay = data.lowPay;
                                        this.ratePercentage = data.lowRate+ "%-" + data.highRate + "%";
                                    } else {
                                        this.errorMsg = res.data.resultMsg;
                                        this.$vux.toast.show({
                                            type: 'cancel',
                                            position: 'middle',
                                            text: this.errorMsg
                                        })
                                    }
                                });
                            }
                        };
                    });
            }
        }
    }
</script>
