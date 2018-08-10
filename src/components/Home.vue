<template>
    <div>
        <header class="home-header">
            <div class="bg" :style="'opacity:' + opacity"></div>
            <router-link :to="{name: 'notice'}">
                <img width="22px" src="../assets/images/icon-notice.png" >
            </router-link>
        </header>
        <scroller lock-x @on-scroll="onScroll" ref="scroller">
            <div class="wrap">
                <swiper :list="bannerList" :show-desc-mask="false" dots-position="center" :auto="true" :loop="true" :interval="5000"></swiper>
                <div class="products">
                    <div class="tips">
                        <span class="red-packet"><img src="../assets/images/red-packet.png"></span>
                        <span>昨日共申请{{allLoanApplication}}笔</span>
                    </div>
                    <div class="product-lists">
                        <ul>
                            <li v-for="item in productsList" :id="item.industryCode"><a :href="item.url"><img :src="item.img"></a></li>
                        </ul>
                    </div>
                </div>
                <div class="small-banner">
                    <scroller lock-y>
                        <div class="small-banner-scroll-wrap" v-bind:style="{'width':smallBannerList.length*140 - 10 +'px'}">
                            <ul class="clearfix">
                                <li v-for="item in smallBannerList">
                                    <a :href="item.picUrl">
                                        <img :src="item.picPrefixUrl + item.picSmallUrl">
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </scroller>
                </div>
                <ul class="link">
                    <li>
                        <a :href="quickRepaymentUrl">
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
        </scroller>
        <iframe id="oldHicash" :src="oldHicash"></iframe>
        <page-footer></page-footer>
    </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
    @import "../../bower_components/sass-rem/rem";

    body{
        background: #f2f2f2 !important;
    }
    header.home-header{
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        width: 100%;
        height: rem(44px);
        background: transparent;
        .bg{
            background: #fff;
            opacity: 0;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
        }
        img{
            top: rem(10px);
            right: rem(10px);
            z-index: 2;
            position: absolute;
            width: 22px;
            display: block;
        }
    }
    .wrap{
        height: auto;
        position: relative;
    }
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
    import { Swiper, Scroller} from 'vux'

    import PageFooter from '../components/PageFooter.vue'

    import bannerImg from '../assets/images/remove_1.png'
    import productsImg from '../assets/images/remove_2.png'
    import smbImg from '../assets/images/remove_3.png'

    export default {
        components: {
            Swiper,
            PageFooter,
            Scroller
        },
        data () {
            return {
                opacity: 0,
                oldHicash: '',
                allLoanApplication: '0',
                quickRepaymentUrl: '',
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
                        img: productsImg,
                        industryCode: ''
                    },{
                        url: 'javascript:',
                        img: productsImg,
                        industryCode: ''
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
            onScroll: function(pos) {
                let top = pos.top > 44 ? 44 : pos.top;
                this.opacity = 0.65/44 * top;
            },
            getHomePagePic: function(params){
                let _this = this;
                _this.common.getHomePagePic(params)
                .then(function(res){
                    if(params.cityCode === '000003'){
                        let bannerList = [];
                        _.each(res.data.bannelList, function(v){
                            const item = {
                                url: v.picUrl,
                                img: v.picPrefixUrl + v.picBigUrl
                            }
                            bannerList.push(item);
                        });
                        console.info('bannerList: ', bannerList);

                        _this.bannerList = bannerList;
                        // _this.
                    }else if(params.cityCode === '000002'){
                        console.info('000002: ', res);
                        _this.smallBannerList = res.data.bannelList;
                    }
                });
            },
            getAllLoanApplication: function(){
                this.common.getAllLoanApplication()
                .then((res)=>{
                    let data = res.data;
                    this.allLoanApplication = data.AllLoanApplication;
                })
            },
            getIndexMain: function(params){
                console.info('111111');
                this.common.getIndexMain(params)
                .then((res)=>{
                    let productList = res.data.columnList[0].productList;
                    let arr = [];
                    let _this = this;
                    const MWEB_PATH = this.config.MWEB_PATH;
                    console.info('productList === ', productList);
                    _.each(productList, function(v){
                        if(v.showStatus == '1'){
                            let obj = {
                                img: v.proShowImg,
                                industryCode: v.industryCode
                            }
                            if(v.industryCode == 'MDCP'){
                                obj.url = MWEB_PATH + 'newweb/product/miaodai.html'
                            }else if(v.industryCode == 'VIPD'){
                                obj.url = MWEB_PATH + 'newweb/product/vipdai.html'
                            }
                            arr.push(obj);
                        }

                        if(arr.length){
                            _this.productsList = arr;
                        }

                    });
                })
            }
            
        },
        mounted: function () {
            let _this = this;
            var userName = this.utils.getCookie("userName");
            if(userName){
                this.oldHicash = this.config.MWEB_PATH + 'newweb/template/fromAppTemp.html?userName=' + userName;
            }

            // 初始化scroller
            setTimeout(function(){
                _this.$refs.scroller.reset();
            });

            //获取大banner
            let bigBannerObj = {
                cityCode: '000003',
                uuid: this.utils.uuid(),
                position: '1'
            };
            this.getHomePagePic(bigBannerObj);  

            //获取小banner
            let smallBannerObj = {
                cityCode: '000002',
                uuid: this.utils.uuid(),
                position: '5'
            };
            this.getHomePagePic(smallBannerObj);  

            // 获取昨日申请笔数
            this.getAllLoanApplication(); 

            // 获取产品列表
            var postData = new URLSearchParams();
                postData.append('requestSource', 'HTML5');
                postData.append('platform', '');
                postData.append('version', '');
                postData.append('uuid', this.utils.uuid());
                console.info('2222');
            this.getIndexMain(postData);

            //快速还款URL
            this.quickRepaymentUrl = this.config.MWEB_PATH + 'newweb/personalCenter/rechargePay.html';
        }
    }
</script>
