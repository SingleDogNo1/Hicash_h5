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
                <tab :line-width="1" v-model="index" :custom-bar-width="getBarWidth">
                  <tab-item :selected="'借款' === columnListItem.columnName" v-for="(columnListItem, index) in columnList" class="loan" @click="'借款' === columnListItem.columnName" :key="index" v-if="columnListItem.columnStatus === '1'">
                        <em></em>
                        {{columnListItem.columnName}}
                  </tab-item>
                </tab>
                <div class="QQhandler"><a href="http://wpa.b.qq.com/cgi/wpa.php?ln=2&uin=4008085599" target='_blank'></a></div>
            </nav>
        </header>
        <swiper v-model="index"  :show-dots="false" @on-index-change="onSwiperItemIndexChange">
            <swiper-item v-if="columnListItem.columnStatus === '1'" v-for="(columnListItem, index) in columnList" :key="index">
              <img :src="columnListItem.imgUrl" >
              <ul class="notice-swiper-list" v-if="'公告' === columnListItem.columnName">
                  <li v-for="bannelListItem in bannelList"><a :href="bannelListItem.picUrl"><img :src="bannelListItem.picPrefixUrl + bannelListItem.picBigUrl"/></a></li>
              </ul>
                <!-- <group>
                    <cell is-link v-for="productListItem in columnListItem.productList">
                    <div class="loan-application-left">
                        <img src="../assets/images/icon_haiMiao.png" />
                    </div>
                </cell>
                </group> -->
                <!-- <cell is-link>
                    <div class="loan-application-left">
                        <img src="../assets/images/icon_haiMiao.png" />
                    </div>
                </cell> -->
            </swiper-item>
        </swiper>
        <div class="loan-content-wrap" v-if="listType === 'loan'">
            <p class="all-loan-application" >昨日共申请{{allLoanApplication}}笔</p>
            <ul class="loan-list">
                <li v-for="productListItem in productList">
                    <router-link class="clearfix" :to="{name: productListItem.jupmUrl}">
                        <div class="loan-application-left" :class="{'network-car-left': productListItem.industryCode === 'DDSJ'}">
                            <img :src="productListItem.iconUrl1" />
                            <img :src="productListItem.iconUrl2" class="title"/>
                            <img :src="productListItem.iconUrl3" class="desc"/>
                            <div class="clear"></div>
                            <span class="max-amont">
                                {{productListItem.limitDescribe}}&emsp;
                            </span>
                        </div>
                        <div class="loan-application-right" :class="{'network-car-right': productListItem.industryCode === 'DDSJ'}">
                                {{productListItem.simpleContent1}}
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="notice-content-wrap" v-if="listType === 'notice'">
            <div class="news-wrap">
                <h2>近期新闻<strong>&ensp;NEWS</strong></h2>
            </div>
            <scroller lock-x scrollbar-y use-pullup use-pulldown height="200px" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
              <div class="box2">
                <ul class="news-list">
                    <li>
                        <time>2018-04-23</time>
                        <p class="content">我们不生产手机，但我们可以让你零元拿走iPhone X</p>
                        <div class="news-type">
                            败货
                        </div>
                        <div class="clear"></div>
                    </li>
                    <li>
                        <time>2018-04-23</time>
                        <p class="content">我们不生产手机，但我们可以让你零元拿走iPhone X</p>
                        <div class="news-type">
                            败货
                        </div>
                        <div class="clear"></div>
                    </li>
                    <li>
                        <time>2018-04-23</time>
                        <p class="content">我们不生产手机，但我们可以让你零元拿走iPhone X</p>
                        <div class="news-type">
                            败货
                        </div>
                        <div class="clear"></div>
                    </li>
                    <li>
                        <time>2018-04-23</time>
                        <p class="content">我们不生产手机，但我们可以让你零元拿走iPhone X</p>
                        <div class="news-type">
                            败货
                        </div>
                        <div class="clear"></div>
                    </li>
                    <li>
                        <time>2018-04-23</time>
                        <p class="content">我们不生产手机，但我们可以让你零元拿走iPhone X</p>
                        <div class="news-type">
                            败货
                        </div>
                        <div class="clear"></div>
                    </li>
                </ul>
              </div>
              <!--pullup slot-->
              <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
                <span v-show="status.pullupStatus === 'default'"></span>
                <span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
                <span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
              </div>
            </scroller>
        </div>
        <ul class="link">
            <li><a href="http://115.29.193.125/newweb/login/login.html?from=perCenter"><i class="iconfont"></i>快速还款</a></li>
            <li><a href="http://115.29.193.125/newweb/login/login.html?from=perCenter"><i class="iconfont"></i>借款攻略</a></li>
        </ul>
        <page-footer></page-footer>
    </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
    .box2-wrap {
        height: 300px;
        overflow: hidden;
    }
    .rotate {
        display: inline-block;
        transform: rotate(-180deg);
    }
    .pullup-arrow {
        transition: all linear 0.2s;
        color: #666;
        font-size: 25px;
    }
    body {
        padding: 0;
        max-width: 640px;
        min-width: 320px;
        margin: 0 auto;
        background-color: rgb(241, 241, 241);
        font-family: 微软雅黑;
        overflow: hidden !important;
    }
    .clear {
        clear:both;
    }
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
    .vux-slider > .vux-swiper {
        background: #fff;
        .vux-swiper-item {
            img {
                display: block;
                width: 83%;
                margin: 0 auto;
            }
        }
    }
    .notice-swiper-list {
        list-style: none;
        margin-top: 0;
        li {
            float: left;
            margin-right: 0.444444rem;
            a {
                display: block;
                width: 4.3rem;
                height: 6.425rem;
                left: 0;
                top: 0;
                border-radius: 8px;
                img {
                    width: 4.3rem !important;
                    height: 6.425rem;
                }
            }
        }
    }
    .loan-content-wrap {
        background: #fff;
        font-size: .65rem;
        text-align: center;
        .all-loan-application {
            margin-top: 0;
            margin-bottom: .55rem;
        }
        .loan-list{
            list-style: none;
            width: 87%;
            margin: 0 auto;
            padding: 0;
            li {
                height: 1.8rem;
                border-top: 1px solid #ddd;
                padding: .9rem .7rem;
                line-height: 1.4em;
                font-size: .5rem;
                color: #999;
                .loan-application-left {
                    float: left;
                    text-align: left;
                    width: 68%;
                    img {
                        display: block;
                        float: left;
                        width: .875rem;
                        height: .875rem;
                    }
                    .title {
                        position: relative;
                        display: block;
                        float: left;
                        width: 3.05rem;
                        height: .775rem;
                        margin-bottom: .4rem;
                        text-indent: -9999px;
                        margin-left: 0.4rem;
                    }
                    .desc {
                        position: relative;
                        display: block;
                        float: left;
                        margin-left: 0.2rem;
                        width: 3.05rem;
                        height: .725rem;
                        text-indent: -9999px;
                    }
                    .max-amont {
                        display: block;
                        padding-left: 1.275rem;
                        color: #999;
                    }
                }
                .loan-application-right {
                    float: right;
                    position: relative;
                    width: 32%;
                    height: 1.8rem;
                    line-height: 1.8rem;
                    color: #999;
                    text-align: right;
                }
                .network-car-left {
                    width: 80%;
                    .title {
                        width: 5.125rem;
                        height: .775rem;
                    }
                    .desc {
                        width: 3.45rem;
                    }
                }
                .network-car-right {
                    width: 20%;
                }
            }
        }
    }
    .link {
        height: 2rem;
        background: #fff;
        margin: 0;
        margin-top: 0.5rem;
        padding: 0 1rem;
        font-size: 0.7rem;
        border-bottom: 1px solid #E3E3E3;
        list-style: none;
        li {
            position: relative;
            color: #3f3f3f;
            float: left;
            line-height: 2rem;
            text-align: center;
            width: 50%;
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
    .notice-content-wrap {
        background: #fff;
        font-size: .65rem;
        text-align: center;
        .news-wrap {
            h2 {
                text-align: center;
                padding: .35rem 0;
                font-size: .8rem;
                strong {
                    color: #FD7F5F;
                }
            }
        }
        .news-list {
            list-style: none;
            padding: 0 .6rem;
            li {
                border-top: 1px solid #DADADA;
                font-size: 0.5rem;
                color: #A4A4A4;
                padding: .55rem 0;
                time {
                    float: left;
                }
                .content {
                    float: left;
                    width: 100%;
                    font-size: 0.7rem;
                    color: #3f3f3f;
                    padding: .375rem 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .news-type {
                    float: left;
                    background: #FFF7E9;
                    padding: .15rem .625rem;
                    border-radius: 13px;
                    color: #ff7640;
                }
            }
        }
    }
</style>

<script type="text/javascript">
    import { Tab, TabItem, Swiper, SwiperItem, Panel, Group, Cell, Scroller, Divider, Spinner} from 'vux'
    // import $ from 'jquery'
    // import common from '@/api/common'
    // import utils from '@/assets/js/utils'

    import PageFooter from '../components/PageFooter.vue'
    var page = 1;
    var countPage;
    var getSysParam = (maxLine, page) => {
        var postData = new URLSearchParams();
        postData.append('paramCode', 'WZGG,GSDT');
        postData.append('sourceFrom', 'HTML5');
        postData.append('maxLine', maxLine);
        postData.append('curPage', page);
        this.common.getSysParam(postData)
            .then((res)=>{
                console.log('res===', res);
                res.data.countPage = 3;
                countPage = res.data.countPage;
            })
    }
    console.log('page====', page)

    export default {
        components: {
            Tab,
            TabItem,
            Swiper,
            SwiperItem,
            Panel,
            Group,
            Cell,
            Scroller,
            Divider,
            Spinner,
            PageFooter
        },
        data () {
            return {
                index: 0,
                from: '',
                columnList: [],
                bannelList: [],
                allLoanApplication: '',
                loanList: [],
                listType: 'loan',
                productList: [],
                n: 10,
                pullupEnabled: true,
                status: {
                    pullupStatus: 'default',
                    pulldownStatus: 'default'
                },
                getBarWidth: function (index) {
                    return '2.8rem'
                }
            }
        },
        ready () {

        },
        methods : {
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
            let uuid = this.utils.uuid();
            indexMainPostData.requestSource = 'HTML5';
            indexMainPostData.platform = '';
            indexMainPostData.version = '';
            indexMainPostData.uuid = uuid;
            this.common.getIndexMain(indexMainPostData)
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
                            productList[x].jupmUrl = "MiaoDai";
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
                    this.common.getHomePagePic(homePagePicPostData)
                        .then((res)=>{
                            console.log('res.data====', res.data)
                            _this.bannelList = res.data.bannelList;
                        })
                })
            this.common.getAllLoanApplication()
                .then((res) => {
                    _this.allLoanApplication = res.data.AllLoanApplication;
                })
        }
    }
</script>
