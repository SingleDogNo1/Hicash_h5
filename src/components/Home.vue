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
                  <tab-item :selected="'借款' === columnListItem.columnName" v-for="(columnListItem, index) in columnList" class="loan" @click="'借款' === columnListItem.columnName" :key="index" v-if="columnListItem.columnStatus === '1'"><em></em>{{columnListItem.columnName}}</tab-item>
                </tab>
                <div class="QQhandler"><a href="http://wpa.b.qq.com/cgi/wpa.php?ln=2&uin=4008085599" target='_blank'></a></div>
            </nav>

          <!--   <nav>
                <tab :line-width=2 active-color='#fc378c' v-model="index">
                    <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
                </tab>
                <swiper v-model="index" height="100px" :show-dots="false">
                    <swiper-item v-for="(item, index) in list2" :key="index">
                      <div class="tab-swiper vux-center">{{item}} Container</div>
                    </swiper-item>
                </swiper>
            </nav> -->
        </header>
        <swiper v-model="index"  :show-dots="false">
            <swiper-item v-if="columnListItem.columnStatus === '1'" v-for="(columnListItem, index) in columnList" :key="index">
              <img :src="columnListItem.imgUrl" >
              <ul>
                  <li v-for="bannelListItem in bannelList"><a :href="bannelListItem.picUrl"><img :src="bannelListItem.picPrefixUrl + bannelListItem.picBigUrl"/></a></li>
              </ul>
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
    .vux-slider > .vux-swiper {
        background: #fff;
        .vux-swiper-item {
            img {
                display: block;
                width: 90%;
                margin: 0 auto;
            }
        }
    }
</style>

<script type="text/javascript">
    import { Tab, TabItem, Swiper, SwiperItem} from 'vux'
    import $ from 'jquery'
    import common from '@/api/common'
    import utils from '@/assets/js/utils'

    export default {
        components: {
            Tab,
            TabItem,
            Swiper,
            SwiperItem
        },
        data () {
            return {
                index: 0,
                columnList: [],
                bannelList: [],
                getBarWidth: function (index) {
                    return '2.8rem'
                  }
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
            }
        },
        mounted: function () {
            var _this = this;
            let indexMainPostData = {}
            indexMainPostData.requestSource = 'HTML5';
            indexMainPostData.platform = '';
            indexMainPostData.version = '';
            indexMainPostData.uuid = '0c8297d7-6d3a-46da-b782-0df2434f88b1';
            common.getIndexMain(indexMainPostData)
                .then((res)=>{
                    _this.columnList = res.data.columnList;
                    let homePagePicPostData = {}
                    homePagePicPostData.cityCode = '000003';
                    homePagePicPostData.uuid = utils.uuid();
                    common.getHomePagePic(homePagePicPostData)
                        .then((res)=>{
                            _this.bannelList = res.data.bannelList;
                        })
                })
        }
    }
</script>
