<template>
    <div>
        <!-- 评级弹框 171204 -->
        <div class="rate-pop-mask" v-transfer-dom style="display:none">
            <x-dialog v-model="show" class="dialog-demo">
                <div class="img-box">
                </div>
                <div @click="show=false">
                  <span class="vux-close"></span>
                </div>
            </x-dialog>
        </div>
        <!-- 优惠券弹框  171015 -->
        <div class="coupon-pop-mask" v-transfer-dom style="display:none">
            <popup v-model="show">
                <div class="popup0">
                    <h4 class="title">
                        您有<span class="total-num">0</span>张优惠券，进入签约页面可选择使用
                        <span class="vux-close" @click="show=false"></span>
                    </h4>
                    <ul class="pro-coupon-list">
                        <li>
                            <div class="pro-coupon-wrap-left">
                                <h5>嗨秒贷优惠券</h5>
                                <p class="amount-limit">2000元可用</p>
                                <p class="date-limit">有效期 2017.3.28-2017.5.4</p>
                            </div>
                            <div class="pro-coupon-wrap-right">
                                <span class="coupon-amount">50</span>元
                                <button class="btn-use">去使用</button>
                            </div>
                            <div class="clear"></div>
                        </li>
                        <li class="coupon-percent">
                            <div class="pro-coupon-wrap-left">
                                <h5>嗨秒贷优惠券</h5>
                                <p class="amount-limit">2000元可用</p>
                                <p class="date-limit">有效期 2017.3.28-2017.5.4</p>
                            </div>
                            <div class="pro-coupon-wrap-right">
                                <span class="coupon-amount">50</span>元
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
            <header>
                <a class="go-history" href="javascript:"></a>
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
                        <checker v-model="amountSelected" default-item-class="amount-item" radio-required selected-item-class="amount-item-selected">
                            <checker-item value="1">
                                2000
                            </checker-item>
                            <checker-item value="2">
                                3000
                            </checker-item>
                            <checker-item value="3">
                                4000
                            </checker-item>
                            <checker-item value="4">
                                6000
                            </checker-item>
                            <checker-item value="5">
                                8000
                            </checker-item>
                        </checker>
                        <div class="clear"></div>
                    </div>
                    <div class="loan-time-list">
                        <div class="title">借款时间</div>
                        <checker v-model="timeSelected" default-item-class="time-item" radio-required selected-item-class="time-item-selected">
                            <checker-item value="1">
                                3个月
                            </checker-item>
                            <checker-item value="2">
                                6个月
                            </checker-item>
                            <div class="clear"></div>
                        </checker>
                    </div>
                    <div class="rate-wrap">
                        <p>每期最低本息还款：<span class="rate-repay">￥345</span></p>
                        <div class="rate-handler">
                            <p>月利率：<span class="rate-percentage">1.0%-1.4%</span></p>
                            <span class="rate-calculator">费率计算器</span>
                        </div>
                    </div>
                    <button class="btn-by-stages">立即分期</button>
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
            .weui-dialog {
                width: 11.525rem !important;
                height: 19.3rem !important;
                background-color:transparent !important;
                .img-box {
                    width: 100%;
                    height: 100%;
                    background: url("../assets/images/bg_rate.png") center center no-repeat;
                    background-size: cover;
                }
            }
        }
        .coupon-pop-mask {
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
                            color: #FFBF3C;
                        }
                    }
                }
            }
        }
        .apply-pop-mask {
            .weui-dialog {
                width: 14.5rem;
                height: 9.625rem;
                background-color:transparent !important;
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
            header {
                position: absolute;
                background: none;
                left: 0;
                top: 0;
                width: 100%;
                height: 2.2rem;
                z-index: 99;
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
</style>

<script type="text/javascript">
    import {XDialog, XButton, Popup, Group, Checker, CheckerItem, TransferDomDirective as TransferDom} from 'vux'
    import $ from 'jquery'
    import common from '@/api/common'
    import utils from '@/assets/js/utils'

    export default {
        directives: {
            TransferDom
        },
        components: {
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
                amountSelected: '1',
                timeSelected: '2'
            }
        },
        ready () {

        },
        methods : {
            onItemClick (index) {
                console.log('on item click:', index)
            },
            switchTabItem (index) {
                console.log('on-before-index-change', index)
                this.$vux.loading.show({
                    text: 'loading'
                })
                setTimeout(() => {
                    this.$vux.loading.hide()
                    this.index01 = index
                }, 1000)
            },
            onItemClick (index) {
                console.log('on item click:', index)
            },
            onSwiperItemIndexChange (index) {
                index === 0 ? this.listType = 'loan' : this.listType = 'notice'
                if(this.listType = 'notice') getSysParam(3, 1);
            },
            loadMore () {
                setTimeout(() => {
                    console.log('page====', page)
                    if(page < countPage){
                        page++;
                        getSysParam(10, page);
                    }
                    setTimeout(() => {
                        console.log(222)
                        this.$refs.scroller.donePullup()
                    }, 10)
                }, 2000)
            },
            refresh () {
              setTimeout(() => {
                this.n = 10
                this.$nextTick(() => {
                  setTimeout(() => {
                    this.$refs.scroller.donePulldown()
                    this.pullupEnabled && this.$refs.scroller.enablePullup()
                  }, 10)
                })
              }, 2000)
            },
            changePullupStatus (enabled) {
              if (enabled) {
                this.$refs.scroller.enablePullup()
                this.pullupEnabled = true
              } else {
                this.$refs.scroller.disablePullup()
                this.pullupEnabled = false
              }
            }
        },
        mounted: function () {
            var _this = this;
            let indexMainPostData = {}
            let uuid = utils.uuid();
            indexMainPostData.requestSource = 'HTML5';
            indexMainPostData.platform = '';
            indexMainPostData.version = '';
            indexMainPostData.uuid = uuid;
            common.getIndexMain(indexMainPostData)
                .then((res)=>{
                    _this.columnList = res.data.columnList;
                    let loanColumnList = _this.columnList.filter((columnListItem) => {
                        console.log('columnListItem====',columnListItem);
                        return columnListItem.productList.length > 0;
                    })
                    console.log('loanColumnList====', loanColumnList[0].productList)
                    let productList = loanColumnList[0].productList;
                    productList = productList.filter((productListItem) => {
                        return productListItem.showStatus === '1';
                    })
                    let x;
                    _this.productList = productList;
                    for (x in _this.productList) {
                        console.log('productList[x]====', productList[x])
                        if(productList[x].industryCode === 'MDCP') {
                            productList[x].jupmUrl = "/newweb/product/miaodai.html";
                            productList[x].iconUrl1 = require("../assets/images/icon_haimiao.png");
                            productList[x].iconUrl2 = require("../assets/images/icon_haimiao_text.png");
                            productList[x].iconUrl3 = require("../assets/images/icon_haimiao_desc.png");
                        } else {
                            productList[x].jupmUrl = "/newweb/product/miaodai.html";
                            productList[x].iconUrl1 = require("../assets/images/icon_network_car.png");
                            productList[x].iconUrl2 = require("../assets/images/icon_network_car_text.png");
                            productList[x].iconUrl3 = require("../assets/images/icon_network_car_desc.png");
                        }
                    }
                    console.log('_this.productList====', _this.productList)
                    let homePagePicPostData = {}
                    homePagePicPostData.cityCode = '000003';
                    homePagePicPostData.uuid = uuid;
                    common.getHomePagePic(homePagePicPostData)
                        .then((res)=>{
                            console.log('res.data====', res.data)
                            _this.bannelList = res.data.bannelList;
                        })
                })
            common.getAllLoanApplication()
                .then((res) => {
                    _this.allLoanApplication = res.data.AllLoanApplication;
                })
        }
    }
</script>
