<template>
    <div class="break-promise-result" :class="{'bg-no-result': loseCreditDetailList.length === 0}" v-cloak>
        <page-header :title="title" :showBack="showBack" :showBtnClose="showBtnClose"></page-header>
        <div class="result-wrap" v-cloak>
            <div class="detail-wrap" v-show="loseCreditDetailList.length > 0">
                <div class="letter-notice" @click="popLetterNotice">
                    <div class="letter-notice-img"><img src="./images/icon_default.png"></div>
                    {{noticeTitle}}
                </div>
                <div class="swiper-container detail-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(loseCreditDetailListItem, index) in loseCreditDetailList" :key="loseCreditDetailListItem.hyApplicationNo">
                            <ul class="detail-wrap-list" :class="{'bg-flip': index === 0 && loseCreditDetailList.length >= 2}">
                                <li>
                                    流水账号：{{loseCreditDetailListItem.hyApplicationNo}}
                                </li>
                                <li>
                                    产品名称：{{loseCreditDetailListItem.productName}}
                                </li>
                                <li>
                                    期　　数：{{loseCreditDetailListItem.applyPeriod}}
                                </li>
                                <li>
                                    合同金额：{{loseCreditDetailListItem.contractAmount}}
                                </li>
                                <li>
                                    失信状态：<span v-if="loseCreditDetailListItem.sxButton === 'sx'">失信</span><span v-if="loseCreditDetailListItem.button === 'ss'"> 诉讼</span><span v-if="loseCreditDetailListItem.button === 'zc'"> 仲裁</span>
                                </li>
                            </ul>
                            <div class="actions">
                                <button @click="toDetail(0, loseCreditDetailListItem.hyApplicationNo)" class="btn-broke-promise" v-if="loseCreditDetailListItem.sxButton === 'sx'" :class="{'only-btn-broke-promise': loseCreditDetailListItem.sxButton === 'sx' && loseCreditDetailListItem.button === ''}">失信详情</button>
                                <button @click="toDetail(1, loseCreditDetailListItem.hyApplicationNo)" class="btn-litigation" v-if="loseCreditDetailListItem.button === 'ss'">诉讼详情</button>
                                <button @click="toDetail(2, loseCreditDetailListItem.hyApplicationNo)" class="btn-arbitration" v-if="loseCreditDetailListItem.button === 'zc'">仲裁详情</button>
                                <div style="clear:both;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets"></div>
                </div>
                <toRecharge></toRecharge>
                <div class="tips"><span>！还款至嗨钱指定账户，未经嗨钱同意，您不得将借款归还到其他任何账户。</span>及时还款后可恢复您的信用状态，您的个人信用将不再产生任何影响！</div>
                <div class="swiper-container case-container">
                    <div class="swiper-wrapper">
                        <router-link class="weui-media-box weui-media-box_appmsg swiper-slide" :to="{name: 'HotNewsDetail', query: {id: item.id, code: 'SXAL'}}" v-for="(item, index) in hotNews" :key="index">
                            <div class="weui-media-box__hd">
                                <img class="weui-media-box__thumb" :src="item.mediaImage">
                            </div>
                            <div class="weui-media-box__bd">
                                <h4 class="weui-media-box__title">{{item.title}}</h4>
                                <ul class="weui-media-box__info">
                                    <li class="weui-media-box__info__meta">&nbsp;</li>
                                </ul>
                            </div>
                        </router-link>
                    </div>
                    <div class="noticeAll" @click="caseAll">查看全部</div>
                </div>
            </div>
            <div class="no-result" v-if="loseCreditDetailList.length === 0">
                <p class="no-result-info">您的信用记录良好，请继续保持</p>
                <p class="no-result-tips">温馨提示：按时还款，避免逾期能有效维持良好的信用记录，请珍视您的个人征信</p>
            </div>

            <!-- 弹出框 -->
            <div class="pop_wrap" v-if="isShowCallDialog">
                <div class="pop_background"></div>
                <div class="pop_main">
                    <div class="pop_body">
                        <p>尊敬的客户，由于您之前的华融消费借款已超过最后还款日期，您的逾期记录已上报<span>中国人民银行个人征信系统</span>，为了不影响您的个人信用，请及时还款。</p>
                        详询：400-020-5566
                    </div>
                    <div class="pop_bottom">
                        <div class="btn cannel" @click="closeCallDialog">取消</div>
                        <div class="btn confirm" @click="call('4000205566')">呼叫</div>
                    </div>
                </div>
            </div>

            <!-- 弹出框 -->
            <div class="letter-notice-pop" v-if="isShowLetterDialog">
                <div class="close" @click="closePopLetterNotice">×</div>
                <div class="letter-notice-pop-main">
                    <div class="title">{{noticeDetail}}</div>
                    <!-- <ul class="tab" v-for="detailItem in detailList">
                        <li class="active">{{detailItem.bigTitle}}<i style="display:block"></i></li>
                    </ul> -->
                    <mt-navbar v-model="selected" class="tab">
                        <mt-tab-item :id="returnId(index + 1)" v-for="(detailItem, index) in detailList" :key="index" @click.native="setCurrentType(detailItem)">{{detailItem.bigTitle}}</mt-tab-item>
                    </mt-navbar>
                    
                    <!-- tab-container -->
                    <mt-tab-container v-model="selected">
                        <mt-tab-container-item :id="returnId(index + 1)" v-for="(detailItem, index) in detailList" :key="index">
                            <a class="pic-before-text" :href="detailItem.picBeforeUrl">{{detailItem.picBeforeText}}</a>
                            <div class="tips">{{detailItem.smallTitle}}</div>
                            <div class="big-img" v-if="detailItem.type === 'ZC' || detailItem.type === 'SS'">
                                <div class="swiper-container letter-container gallery-top">
                                    <div class="swiper-wrapper demo-gallery" :class="detailItem.type">
                                        <div class="swiper-slide" v-for="(item, index) in detailItem.picList" :key="index">
                                            <img class="previewer-demo-img" :src="item.picPrefix + item.picUrl" @click="show(index)">
                                            <div v-transfer-dom></div>
                                        </div>
                                    </div>
                                <div slot="pagination" class="img-swiper-pagination swiper-pagination-clickable swiper-pagination-bullets"></div>
                                </div>
                                <!-- <div  class="demo-gallery">

                                        <a href="https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg" data-size="1600x1600" data-med="https://farm4.staticflickr.com/3894/15008518202_b016d7d289_b.jpg" data-med-size="1024x1024" data-author="Folkert Gorter" class="demo-gallery__img--main">
                                        <img src="https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg" alt="" />
                                        </a>
                                    </div> -->
                            </div>
                            <div class="big-img" v-if="detailItem.type === 'SX' || detailItem.type === 'ZX'">
                                <div class="img-box demo-gallery" :class="detailItem.type">
                                    <div>
                                        <img :src="detailItem.picList[0].picPrefix + detailItem.picList[0].picUrl">
                                    </div>
                                </div>
                            </div>
                            <p class="pic-after-text">{{detailItem.picAfterText}}</p>
                            <ul class="pic-after-text-list">
                                <li v-for="(picAfterTextItem, index) in detailItem.picAfterTextList" :key="index">{{picAfterTextItem.text}}</li>
                            </ul>
                        </mt-tab-container-item>
                    </mt-tab-container>
                    <!-- <div class="tips">{{noticeName}}</div>
                    <div class="big-img">
                        <div class="swiper-container letter-container gallery-top">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="item in loseCreditDetailList">
                                    <img :src="picPath + item.imageUrl">
                                </div>
                            </div>
                        </div>
                    </div> -->
                
                </div>
            </div>
            <previewer v-if="isShow && this.currentType === 'SS'" :list="ssDetailList[0].picList" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
            <previewer v-if="isShow && this.currentType === 'ZC'" :list="zcDetailList[0].picList" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import 'weui/dist/style/weui.min.css';
    .break-promise-result {
        width: 100%;
        height: calc(100% - 2.888889rem);
        background: #eee;
        padding-top: 2.888889rem;
        .vux-header {
            border-bottom: 1px solid #ccc;
        }
        .result-wrap {
            width: 100%;
            height: 100%;
            .detail-wrap {
                width: 90%;
                height: 100%;
                margin: 0 auto;
                .letter-notice {
                    width: 100%;
                    height: 44px;
                    line-height: 44px;
                    background: #fff;
                    border-radius: 7px;
                    margin-bottom: 20px;
                    color: #F28BB1;
                    font-size: 15px;
                    text-align: center;
                    position: relative;
                    .letter-notice-img {
                        width: 50px;
                        height: 30px;
                        position: absolute;
                        top: 7px;
                        left: 13px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                .detail-container{
                    padding-bottom: 30px !important;
                    .swiper-slide {
                        border-radius: 7px;
                        background: #fff;
                        .detail-wrap-list {
                            height: auto;
                            padding: 0.5rem 1rem;
                            li {
                                width: 100%;
                                height: auto;
                                font-family: PingFangSC-Regular;
                                font-size: 15px;
                                color: #333333;
                                letter-spacing: 0;
                                margin-bottom: 8px;
                            }
                        }
                        .actions {
                            margin: 0 auto;
                            padding: 0 1rem 0.7rem;
                            button {
                                display: block;
                                width: 5.777778rem /* 130/22.5 */;
                                height: 44px;
                                border-radius: 5px;
                                border: none;
                                background: #F28BB1;
                                font-family: PingFangSC-Regular;
                                font-size: 15px;
                                color: #FFFFFF;
                                letter-spacing: 0;
                            }
                            .btn-broke-promise {
                                float: left;
                            }
                            .btn-litigation,
                            .btn-arbitration,
                            .btn-repay {
                                float: right;
                            }
                            .only-btn-broke-promise {
                                float: none;
                                margin: 0 auto;
                            }

                            .btn-litigation.only-btn-repay,
                            .btn-arbitration.only-btn-repay {
                                margin-bottom: .5rem;
                            }
                        }

                    }
                    /deep/ .swiper-pagination-bullet{
                        width: 6px !important;
                        height: 6px !important;
                        background: #F28BB1 !important;
                        opacity: .3 !important;
                    }
                    /deep/ .swiper-pagination-bullet-active{
                        background: #F28BB1 !important;
                        opacity: 1 !important;
                    }
                }
                .toRecharge{
                    width: 100%;
                    height: 44px;
                    background: #F28BB1;
                    color: #fff;
                    font-size: 15px;
                    display: block;
                    border-radius: 5px;
                    margin: 0 auto;
                    margin-top: 0.5rem;
                    border: 0;
                }
                .tips {
                    width: 100%;
                    height: auto;
                    font-family: PingFangSC-Semibold;
                    font-size: 13px;
                    color: #3F3F3F;
                    letter-spacing: 0;
                    margin: 0 auto;
                    text-align: justify;
                    margin-top: 0.5rem;
                    span {
                        color: #F28BB1;
                        font-weight: bold;
                    }
                }
                .case-container{
                    height: 100px;
                    .swiper-slide{
                        background: transparent !important;
                        border-radius: 7px;
                    }
                    .weui-media-box {
                        padding: 0;
                    }
                    .noticeAll{
                        position: absolute;
                        bottom: 5px;
                        right: 0;
                        font-family: PingFangSC-Regular;
                        font-size: 13px;
                        color: #999999;
                        z-index: 9999;
                        border-bottom: 1px solid #999;
                    }
                }
            }
            .pop_wrap {
                width: 100%;
                height: 100%;
                position: fixed;
                top: 0;
                left: 0;
                z-index: 9999;
                .pop_background {
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.50);
                }
                .pop_main {
                    width: 270px;
                    height: 260px;
                    background: #FFFFFF;
                    border-radius: 5px;
                    position: fixed;
                    top: 30%;
                    left: 50%;
                    margin-left: -135px;
                    overflow: hidden;
                    .title {
                        width: 100%;
                        height: 48px;
                        background: #FF7640;
                        text-align: center;
                        line-height: 48px;
                        font-family: PingFangSC-Regular;
                        font-size: 17px;
                        color: #FFFFFF;
                        letter-spacing: 0;
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                    .pop_body {
                        height: 100%;
                        overflow: hidden;
                        font-size: 15px;
                        padding: 30px;
                        text-align: justify;
                        color: #999;
                        p {
                            text-indent: 2em;
                            margin-bottom: 10px;
                            line-height: 24px;
                            span {
                                color: #151515;
                            }
                        }
                    }
                    .pop_bottom {
                        width: 100%;
                        height: 42px;
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        border-top: 1px solid #ddd;
                        .btn {
                            width: 50%;
                            height: 100%;
                            float: left;
                            color: #ccc;
                            font-size: 15px;
                            line-height: 42px;
                            text-align: center;
                        }
                        .confirm {
                            width: 49%;
                            border-left: 1px solid #ddd;
                            color: #F28BB1;
                        }
                    }
                }
            }
            .letter-notice-pop {
                width: 100%;
                height: 100%;
                background: #fff;
                position: fixed;
                top: 0;
                left: 0;
                z-index: 9998;
                overflow-y:auto;
                .close{
                    position: fixed;
                    right: 12px;
                    top: 4px;
                    font-size: 28px;
                    color: #ccc;
                }
                .letter-notice-pop-main{
                    padding: 7% 0;
                    width: 90%;
                    margin: 0 auto;
                    font-family: PingFangSC-Semibold;
                    color: #333333;
                    .title{
                        font-size: 17px;
                        text-align: center;
                        margin-bottom: 2%;
                    }
                    .tab{
                        width: 75%;
                        margin: 0 auto;
                        .mint-tab-item {
                            position: relative;
                            padding: 12px 0 !important;
                            /deep/ .mint-tab-item-label {
                                font-size: 15px !important;
                            }
                        }
                        .is-selected {
                            margin-bottom: 0 !important;
                            color: #F28BB1 !important;
                            border-bottom: none !important;;
                        }
                        .is-selected:after {
                            position: absolute;
                            content: '';
                            background-color:#F28BB1;
                            width: 1.422222rem /* 32/22.5 */;
                            height: 2px;
                            bottom: .03rem;
                            left: 50%;
                            transform: translate(-50%, 0);
                            z-index: 99;
                        }
                    }
                    .pic-before-text {
                        display: block;
                        width: 100%;
                        margin-top: 1.111111rem /* 25/22.5 */;
                        font-family: PingFangSC-Regular;
                        font-size: 13px;
                        text-align: left;
                        color: #F28BB1;
                        text-indent: 28px;
                        text-decoration: underline;
                    }
                    .tips{
                        font-size: 15px;
                        text-align: center;
                        margin-bottom: 5%;
                    }
                    .big-img{
                        width: 100%;
                        height: auto;
                        .img-box{
                            padding: 2% 5%;
                            border: 1px solid #EEEEEE;
                            border-radius: 0;
                            img {
                                width: 95%;
                                height: auto;
                                margin: 0 auto;
                                display: block;
                                padding: 2% 0;
                            }
                        }
                        .letter-container {
                            width: 100%;
                            height: auto;
                            margin-left: auto;
                            margin-right: auto;
                            .swiper-slide {
                                background-size: cover;
                                background-position: center;
                                img {
                                    width: 95%;
                                    height: auto;
                                    margin: 0 auto;
                                    display: block;
                                    padding: 2% 0;
                                }
                            }
                        }
                        .gallery-top {
                            height: 80%;
                            width: 100%;
                            .swiper-slide {
                                border: 1px solid #EEEEEE;
                                border-radius: 0;
                            }
                        }
                        .img-swiper-pagination {
                            width: 100%;
                            text-align: center;
                            /deep/ .swiper-pagination-bullet{
                                width: 6px !important;
                                height: 6px !important;
                                background: #F28BB1 !important;
                                opacity: .3 !important;
                                margin: 0 4px;
                                cursor: pointer;
                            }
                            /deep/ .swiper-pagination-bullet-active{
                                background: #F28BB1 !important;
                                opacity: 1 !important;
                            }
                        }
                    }
                    .pic-after-text {
                        display: block;
                        width: 100%;
                        margin-top: .6rem /* 18/22.5 */;
                        font-family: PingFangSC-Regular;
                        font-size: 13px;
                        color: #999999;
                        text-align: left;
                        text-indent: 28px;
                    }
                    .pic-after-text-list {
                        margin-top: .5rem /* 14/22.5 */;
                        font-family: PingFangSC-Medium;
                        font-size: 13px;
                        color: #333333;
                        line-height: 20px;
                        li {
                            width: 100%;
                            height: .533333rem /* 12/22.5 */;
                            background: url(./images/icon_li.png) left 8px no-repeat;
                            background-size: 3px 3px;
                            margin-bottom: .311111rem /* 7/22.5 */;
                            padding-left: .533333rem /* 12/22.5 */;  
                        }
                    }
                }
            }
            .pswp {
                z-index: 15000;
            }
        }
        .no-result {
            width: 80%;
            height: 5.6rem;
            margin: 0 auto;
            padding-top: 5rem;
            background: url("./images/bg_no_result.png") center 5rem no-repeat;
            background-size: 72px 88px;
            .no-result-info {
                text-align: center;
                padding-top: 5.555556rem;
                font-size: 16px;
                color: #EC6A9D;
            }
            .no-result-tips {
                position: absolute;
                width: 65%;
                left: 50%;
                -webkit-transform: translate(-50%,-50%);
                -moz-transform: translate(-50%,-50%);
                -ms-transform: translate(-50%,-50%);
                -o-transform: translate(-50%,-50%);
                transform: translate(-50%,-50%);
                font-size: 11px;
                text-align: center;
                padding: 0 8%;
                bottom: 4.888889rem;
                color: #999;
            }
        }
    }
    .bg-no-result {
        background: #fff;
        padding-top: 0;
    }
</style>

<script>
    import PageHeader from '@/components/PageHeader.vue'
    import PageFooter from '@/components/PageFooter.vue'
    import ToRecharge from '@/components/ToRecharge.vue'
    import { Previewer, TransferDom } from 'vux'
    import Swiper from 'swiper';


    export default {
        directives: {
            TransferDom
        },
        components: {
            PageHeader,
            PageFooter,
            ToRecharge,
            Previewer,
            Swiper
        }, 
        data () {
            return {
                title: '查询结果',
                showBack: true,
                showBtnClose: false,
                loseCreditDetailList: [],
                noticeTitle: '',
                hotNews: [],
                isShowCallDialog: false,
                isShowLetterDialog: false,
                noticeTitle: '',
                noticeDetail: '',
                noticeName: '',
                noticeImg: '',
                selected: '1',
                detailList: [],
                zcDetailList: [],
                ssDetailList: [],
                isShow: false,
                currentType: '',
                options: {
                getThumbBoundsFn (index) {
                    // find thumbnail element
                    let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
                    // get window scroll Y
                    let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                    // optionally get horizontal scroll
                    // get position of element relative to viewport
                    let rect = thumbnail.getBoundingClientRect()
                    // w = width
                    return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
                    // Good guide on how to get element coordinates:
                    // http://javascript.info/tutorial/coordinates
                    }
                }
            }
        },
        methods: {
            toDetail: function(type, hyApplicationNo) {
                switch (type){
                    case 0:
                        this.$router.push({path:"/breakPromiseDetail", query: {type: String(type), hyApplicationNo: hyApplicationNo}});
                        break;
                    case 1:
                        this.$router.push({path:"/breakPromiseDetail", query: {type: String(type), hyApplicationNo: hyApplicationNo}});
                        break;
                    case 2:
                        this.$router.push({path:"/breakPromiseDetail", query: {type: String(type), hyApplicationNo: hyApplicationNo}});
                        break;
                    case 3:
                        let userName = getCookie("userName");
                        let platform = this.utils.getPlatform();
                        if( platform === "APP" ){
                            window.location.href = MWEB_PATH+"newweb/infoList/redEnvelopeRepay.html?userName=" + userName + '&comeFrom=APP';
                        } else {
                            window.location.href = MWEB_PATH+"newweb/infoList/redEnvelopeRepay.html?userName=" + userName;
                        }
                        break;
                }
            },
            popLetterNotice: function() {
                this.isShowLetterDialog = true;
                window.setTimeout(function(){
                    _czc.push(['_trackEvent', '失信案例', '抓取查询结果页面“个人失信案例”点击量', '', '', 'SXAL']);
                }, 2000);
                setTimeout( () => {
                    let initialSlide;
                    if(this.detailList[0].type === 'ZC' && this.detailList[0].picList.length > 2 || this.detailList[0].type === 'SS' && this.detailList[0].picList.length > 2) {
                        initialSlide = 1;
                    } else {
                        initialSlide = 0;
                    }
                    var galleryTop = new Swiper('.gallery-top', {
                        paginationClickable: true,
                        observer:true,
                        observeParents:true,
                        loopAdditionalSlides: 1,
                        initialSlide: initialSlide,
                        effect: 'coverflow',
                        slidesPerView: 1.3, // 一屏装几个slider
                        centeredSlides: true,
                        coverflowEffect: {
                            rotate: 0,
                            stretch: -40, // slider 间距，越小间距越大
                            depth: 230,
                            modifier: 1,
                            slideShadows: false
                        },
                        pagination: {
                            el: '.img-swiper-pagination',
                            clickable: true,
                        }
                    });
                }, 100);
            },
            SysParam: function() {
                let _params = new URLSearchParams();
                    _params.append('paramCode', 'SXAL');
                    _params.append('maxLine', 10000);

                this.common.getSysParam(_params)
                    .then( res => {
                        let data = res.data;
                        data.list.forEach( (val, index) =>　{

                            //val.newUrl = './hotNewsDetails.html?id='+val.id+'&code=SXAL';
                            val.mediaImage = this.config.pic_path + val.mediaImage;
                            this.hotNews.push(val);
                        });
                        setTimeout(function(){
                            // 轮播图
                            var mySwiper = new Swiper ('.case-container', {
                                direction: 'vertical',
                                autoplay: {
                                    delay: 4300,
                                    disableOnInteraction: false,
                                },
                                loop:true
                            });
                        }, 500);
                    })
            },
            caseAll: function () {
                this.$router.push({path:"/hotNews", query: {code: 'SXAL'}})
            },
            closePopLetterNotice: function() {
                this.isShowLetterDialog = false;
            },
            returnId: function(index) {
                return index.toString()
            },
            logIndexChange: function (arg) {
            },
            show: function (index) {
                this.$refs.previewer.show(index)
            },
            setCurrentType: function(detailItem) {
                this.currentType = detailItem.type;
            },
            call: function(phoneNum) {
                window.hicashJSCommunication.onCallApp(JSON.stringify({ "type": "h5_service", "tell_number": String(phoneNum) }));
            },
            closeCallDialog: function () {
                this.isShowCallDialog = false;
            }
        },
        mounted () {
            let jsinner = $('<script src="https://s95.cnzz.com/z_stat.php?id=1260767143&web_id=1260767143" language="JavaScript"><\/script>');
            $('body').append(jsinner);
            
            let storage = window.sessionStorage;
            let loseCreditDetailList = JSON.parse(storage.getItem("loseCreditDetailList"));

            if(loseCreditDetailList[0].overDueFlag == '1' && loseCreditDetailList[0].invUsername == 'huarong_finance'){
                this.isShowCallDialog = true;
            }

            //弹出告知函浮层
            if(loseCreditDetailList.length){
                this.popLetterNotice();
            }

            //浮层告知函主标题
            this.noticeDetail = loseCreditDetailList[loseCreditDetailList.length - 1].noticeDetail;

            //浮层告知函副标题
            this.noticeName = loseCreditDetailList[loseCreditDetailList.length - 1].noticeName;
            
            //告知函last title
            this.noticeTitle = loseCreditDetailList[0].detailList[0].bigTitle;

            //告知函last image
            this.noticeImg = this.config.pic_path + loseCreditDetailList[loseCreditDetailList.length - 1].imageUrl;

            // 获取失信案例
            this.SysParam();

            this.loseCreditDetailList = loseCreditDetailList;
            this.detailList = loseCreditDetailList[0].detailList;
            this.zcDetailList = this.detailList.filter( (item, index)=> {
                return item.type === 'ZC'
            })
            this.ssDetailList = this.detailList.filter( (item, index)=> {
                return item.type === 'SS'
            })
            this.currentType = this.detailList[0].type
            this.isShow = true

            for (let i = 0; i < this.detailList.length; i++) {
                const picList = this.detailList[i].picList;
                for (let j = 0; j < picList.length; j++) {
                    picList[j].msrc = picList[j].picPrefix + picList[j].picUrl;
                    picList[j].src = picList[j].picPrefix + picList[j].picUrl;
                }
                this.detailList[i].picList = picList;
            }

            // 轮播图
            var mySwiper = new Swiper ('.detail-container', {
                paginationClickable: true,
                initialSlide :0,
                observer:true,
                observeParents:true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                spaceBetween: 20
            }); 
        }
    }
</script>

