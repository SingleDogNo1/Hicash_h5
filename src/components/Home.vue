<template>
    <div>
        <!-- <header class="header-wrap">
            <nav>
                <a class="loan act" href="" ng-class="">借款</a>
                <a class="notice" href="">公告</a>
                <span></span>
            </nav>
        </header> -->
        <header class="header-wrap">
            <nav>
                <tab :line-width="1" :custom-bar-width="getBarWidth">
                  <tab-item class="loan" selected @on-item-click="onItemClick"><em></em>借款</tab-item>
                  <tab-item :custom-bar-width="getBarWidth"class="notice" @on-item-click="onItemClick"><em></em>公告</tab-item>
                </tab>
                <div class="QQhandler"><a href="http://wpa.b.qq.com/cgi/wpa.php?ln=2&uin=4008085599" target='_blank'></a></div>
            </nav>
        </header>
        <swiper>
            <swiper-item class="black">
                <img src="http://ios2.hicash.cn:8081/NewHicashService/proImage/indexyellow.png">
            </swiper-item>
        </swiper>
    </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
    header {
        width: 100%;
        height: 2.2rem;
        text-align: center;
        background: #fff;
        position: relative;
        nav {
            padding: 0 3.15rem !important;
            height: 2.2rem !important;
            line-height: 2.2rem !important;
            font-size: .85rem !important;
            color: #333 !important;;
            font-weight: 700 !important;
            margin: 0 auto !important;
            .loan {
                display: block !important;
                width: 50% !important;
                float: left !important;
                color: #333 !important;
                em {
                    display: inline-block;
                    margin-right: .2rem;
                    width: .8rem;
                    height: .625rem;
                    background: url("../assets/images/icon_loan.png") left center no-repeat !important;
                    background-size: cover !important;
                }
            }
            .notice {
                display: block !important;
                width: 50% !important;
                float: right !important;
                color: #333 !important;
                em {
                    display: inline-block;
                    margin-right: .2rem;
                    width: .8rem;
                    height: .625rem;
                    background: url("../assets/images/icon_notice.png") left center no-repeat !important;
                    background-size: cover !important;
                }
            }
            .vux-tab-container {
                height: 2.2rem !important;
                .vux-tab {
                    height: 2.2rem !important;
                    .vux-tab-item {
                        font-size: .85rem !important;
                        line-height: 2.2rem;
                    }
                    .loan.vux-tab-selected {
                        color: #F4AD48 !important;
                        em {
                            display: inline-block;
                            margin-right: .2rem;
                            width: .8rem;
                            height: .625rem;
                            background: url("../assets/images/icon_loan_act.png") left center no-repeat !important;
                            background-size: cover !important;
                        }
                    }
                    .vux-tab-ink-bar-transition-backward {
                        bottom: 0.4rem !important;
                    }
                    .notice.vux-tab-selected {
                        color: #F4AD48 !important;
                        em {
                            display: inline-block;
                            margin-right: .2rem;
                            width: .8rem;
                            height: .625rem;
                            background: url("../assets/images/icon_notice_act.png") left center no-repeat !important;
                            background-size: cover !important;
                        }
                    }
                    .vux-tab-ink-bar-transition-forward {
                        bottom: 0.4rem !important;
                    }
                    .vux-tab-bar-inner {
                        height: 2px;
                        background: #F4AD48 !important;
                    }
                }
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
                a {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>

<script type="text/javascript">
    import { Tab, TabItem, Swiper, SwiperItem} from 'vux'

    export default {
        components: {
            Tab,
            TabItem,
            Swiper,
            SwiperItem
        },
        data () {
            return {
                getBarWidth: function (index) {
                    return '2.8rem'
                  }
            }
        },
        methods : {
            onItemClick (index) {
              console.log('on item click:', index)
            }
        }
    }
</script>
