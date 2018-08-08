<template>
    <div>
        <div class="wrap">
            <swiper :list="bannerList" :show-desc-mask="false" dots-position="center" :auto="true" :loop="true" :interval="2000"></swiper>
            <div class="products">
                <div class="tips">
                    <span class="red-packet"><img src="../assets/images/red-packet.png"></span>
                    <span>昨日共申请132,423笔</span>
                </div>
                <div class="product-lists">
                    <ul>
                        <li v-for="item in productsList"><img :src="item.img"></li>
                    </ul>
                </div>
            </div>
            <div class="small-banner">
                <div class="small-banner-scroll-wrap" v-bind:style="{'width':smallBannerList.length*140 - 10 +'px'}">
                    <ul class="clearfix">
                        <li v-for="item in smallBannerList"><img :src="item.img"></li>
                    </ul>
                </div>
            </div>
            <ul class="link">
                <li>
                    <a @click="quickRepayment" href="javascript:;">
                        <span class="quick-repayment-ico">
                            快速还款
                        </span>
                    </a>
                </li>
                <li>
                    <router-link :to="{name: 'help'}">
                        <span class="help-center-ico">帮助中心</span>
                    </router-link>
                </li>
            </ul>

        </div>
        <iframe id="oldHicash" :src="oldHicash"></iframe>
        <page-footer></page-footer>
    </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
    @import "../../bower_components/sass-rem/rem";
    .products{
        width: 100%;
        height: auto;
        background: #fff;
        padding: rem(10px) 0;
        margin-bottom: rem(5px);

        .tips{
            width: 86%;
            height: rem(30px);
            line-height: rem(30px);
            background: #FFEEE5;
            border-radius: rem(20px);
            font-family: PingFangSC-Regular;
            font-size: rem(12px);
            color: #FF7640;
            letter-spacing: 0;
            text-align: center;
            margin: 0 auto rem(10px);
            position: relative;
            .red-packet{
                display: inline-block;
                position: absolute;
                top: rem(5px);
                left: rem(70px);
                img{
                    height: rem(20px);
                }
            }
        }

        .product-lists{
            width: 90%;
            height: auto;
            margin: 0 auto;
            ul li{
                width: 100%;
                height: auto;
                // margin-bottom: rem(5px);
                img{
                    width: 100%;
                }
            }
        }
    }

    .small-banner{
        width: 100%;
        height: auto;
        padding: rem(10px) 0;
        overflow-x: auto;
        background: #fff;
        &::-webkit-scrollbar{
            width: 0;
            height: 0;
        }
        .small-banner-scroll-wrap{
            width: 100%;
            padding: 0 5%;
            ul{
                width: 100%;
                li{
                    width: 130px;
                    height: 75px;
                    float: left;
                    margin-right: 10px;
                    // margin-bottom: rem(5px);
                    img{
                        width: 100%;
                    }
                }
                li:last-child{
                    margin-right: 0;
                }
            } 
        }
    }

    .link {
        height: 2rem;
        background: #fff;
        margin: 0;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
        padding: 0 1rem;
        font-size: rem(14px);
        list-style: none;
        li {
            position: relative;
            color: #333;
            float: left;
            line-height: 2rem;
            text-align: center;
            width: 50%;
            .quick-repayment-ico{
                height: 20px;
                display: inline-block;
                background: url(../assets/images/icon_s.png) left no-repeat;
                line-height:20px;
                padding-left:30px;
                background-size: 20px 20px;
            }
            .help-center-ico{
                height: 20px;
                display: inline-block;
                background: url(../assets/images/icon_q.png) left no-repeat;
                line-height:20px;
                padding-left:30px;
                background-size: 20px 20px;
            }
            a {
                color: #3f3f3f;
                i {
                    font-size: 0.8rem;
                    color: #ff743d;
                    padding-right: 0.35rem;
                    vertical-align: middle;
                }
            }
        }
        li:first-child {
            a:after {
                position: absolute;
                content: "";
                width: 1px;
                height: 1rem;
                top: 0.5rem;
                right: 0;
                background: #DADADA;
            }
        }
    }


    #oldHicash{
        display: none;
    }

    .vux-slider > .vux-indicator > a > .vux-icon-dot.active, .vux-slider .vux-indicator-right > a > .vux-icon-dot.active {
        background-color: #fff !important;
    }
</style>

<script type="text/javascript">
    import { Swiper} from 'vux'

    import PageFooter from '../components/PageFooter.vue'

    import bannerImg from '../assets/images/remove_1.png'
    import productsImg from '../assets/images/remove_2.png'
    import smbImg from '../assets/images/remove_3.png'

    export default {
        components: {
            Swiper,
            PageFooter
        },
        data () {
            return {
                oldHicash: '',
                bannerList: [
                    {
                        url: 'javascript:',
                        img: bannerImg,
                    }, {
                        url: 'javascript:',
                        img: bannerImg,
                    }
                ],
                productsList: [
                    {
                        url: 'javascript:',
                        img: productsImg
                    },{
                        url: 'javascript:',
                        img: productsImg
                    }
                ],
                smallBannerList: [
                    {
                        url: 'javascript:',
                        img: smbImg
                    },{
                        url: 'javascript:',
                        img: smbImg
                    },{
                        url: 'javascript:',
                        img: smbImg
                    }
                ],
            }
        },
        ready () {
            
        },
        methods : {
            quickRepayment: function(){

            }
        },
        mounted: function () {
            var userName = this.utils.getCookie("userName");
            if(userName){
                this.oldHicash = this.config.MWEB_PATH + 'newweb/template/fromAppTemp.html?userName=' + userName;
            }

            
        }
    }
</script>
