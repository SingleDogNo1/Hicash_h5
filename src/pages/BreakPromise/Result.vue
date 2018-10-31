<template>
    <div class="break-promise-result" :class="{'bg-no-result': loseCreditDetailList.length === 0}">
        <page-header :title="title" :showBack="showBack" :showBtnClose="showBtnClose"></page-header>
        <div class="result-wrap" v-cloak>
            <div class="detail-wrap" v-show="loseCreditDetailList.length > 0">
                <div class="letter-notice" @click="popLetterNotice">
                    <div class="letter-notice-img"><img src="./images/icon_default.png"></div>
                    {{noticeTitle}}
                </div>
                <div class="swiper-container detail-container" ref="slider">
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
                <input type="button" class="toRecharge btn" value="立即还款" />
                <div class="tips"><span>！还款至嗨钱指定账户，未经嗨钱同意，您不得将借款归还到其他任何账户。</span>及时还款后可恢复您的信用状态，您的个人信用将不再产生任何影响！</div>
                <div class="swiper-container case-container">
                    <div class="swiper-wrapper">
                        <a :href='item.newUrl' class="weui-media-box weui-media-box_appmsg swiper-slide" v-for="item in hotNews">
                            <div class="weui-media-box__hd">
                                <img class="weui-media-box__thumb" :src="item.mediaImage">
                            </div>
                            <div class="weui-media-box__bd">
                                <h4 class="weui-media-box__title">{{item.title}}</h4>
                                <ul class="weui-media-box__info">
                                    <li class="weui-media-box__info__meta">&nbsp;</li>
                                </ul>
                            </div>
                        </a>
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
                        <div class="btn cannel">取消</div>
                        <div class="btn confirm" data-tel="4000205566">呼叫</div>
                    </div>
                </div>
            </div>

            <!-- 弹出框 -->
            <div class="letter-notice-pop">
                <div class="close" @click="closePopLetterNotice">×</div>
                <div class="letter-notice-pop-main">
                    <div class="title">{{noticeDetail}}</div>
                    <!-- <ul class="tab" v-for="detailItem in detailList">
                        <li class="active">{{detailItem.bigTitle}}<i style="display:block"></i></li>
                    </ul> -->
                    <mt-navbar v-model="selected" class="tab">
                        <mt-tab-item :id="returnId(index + 1)" v-for="(detailItem, index) in detailList" :key="index" >{{detailItem.bigTitle}}</mt-tab-item>
                    </mt-navbar>
                    
                    <!-- tab-container -->
                    <mt-tab-container v-model="selected">
                        <mt-tab-container-item :id="returnId(index + 1)" v-for="(detailItem, index) in detailList" :key="index" >
                            <a class="pic-before-text" :href="detailItem.picBeforeUrl">{{detailItem.picBeforeText}}</a>
                            <div class="tips">{{detailItem.smallTitle}}</div>
                            <div class="big-img" v-if="detailItem.type === 'ZC' || detailItem.type === 'SS'">
                                <div class="swiper-container letter-container gallery-top">
                                    <div class="swiper-wrapper demo-gallery" :class="detailItem.type">
                                        <div class="swiper-slide" v-for="item in detailItem.picList">
                                            <a :href="item.picPrefix + item.picUrl" v-bind:data-size="detailItem.originSize" v-bind:data-med="item.picPrefix + item.picUrl" v-bind:data-med-size="detailItem.previewSize">
                                                <img :src="item.picPrefix + item.picUrl">
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="detailItem.picList.length > 1" class="img-swiper-pagination swiper-pagination-clickable swiper-pagination-bullets"></div>
                                <!-- <div  class="demo-gallery">

                                        <a href="https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg" data-size="1600x1600" data-med="https://farm4.staticflickr.com/3894/15008518202_b016d7d289_b.jpg" data-med-size="1024x1024" data-author="Folkert Gorter" class="demo-gallery__img--main">
                                        <img src="https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg" alt="" />
                                        </a>
                                    </div> -->
                            </div>
                            <div class="big-img" v-if="detailItem.type === 'SX' || detailItem.type === 'ZX'">
                                <div class="img-box demo-gallery" :class="detailItem.type">
                                    <div>
                                        <a :href="detailItem.picList[0].picPrefix + detailItem.picList[0].picUrl" v-bind:data-size="detailItem.originSize" v-bind:data-med="detailItem.picList[0].picPrefix + detailItem.picList[0].picUrl" v-bind:data-med-size="detailItem.previewSize">
                                            <img :src="detailItem.picList[0].picPrefix + detailItem.picList[0].picUrl">
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <p class="pic-after-text">{{detailItem.picAfterText}}</p>
                            <ul class="pic-after-text-list">
                                <li v-for="picAfterTextItem in detailItem.picAfterTextList" >{{picAfterTextItem.text}}</li>
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
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .Result {
        height: auto;
    }
    .break-promise-result {
        width: 100%;
        height: 100%;
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
                .swiper-slide {
                    border-radius: 7px;
                    background: #fff;
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
    import Button from 'mint-ui/lib/button';

    export default {
        components: {
            PageHeader,
            PageFooter
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
                noticeTitle: '',
                noticeDetail: '',
                noticeName: '',
                noticeImg: '',
                selected: '1',
                detailList: []
            }
        },
        methods: {
            popLetterNotice: function() {

            },
            caseAll: function () {

            },
            closePopLetterNotice: function() {

            }

        },
        mounted () {
            let jsinner = $('<script src="https://s95.cnzz.com/z_stat.php?id=1260767143&web_id=1260767143" language="JavaScript"><\/script>');
            $('body').append(jsinner);
            
            let storage = window.sessionStorage;
            let loseCreditDetailList = JSON.parse(storage.getItem("loseCreditDetailList"));
            console.log('loseCreditDetailList====', loseCreditDetailList)
            if(loseCreditDetailList[0].overDueFlag == '1' && loseCreditDetailList[0].invUsername == 'huarong_finance'){
                this.isShowCallDialog = true;
            }

            //浮层告知函主标题
            this.noticeDetail = loseCreditDetailList[loseCreditDetailList.length - 1].noticeDetail;

            //浮层告知函副标题
            this.noticeName = loseCreditDetailList[loseCreditDetailList.length - 1].noticeName;
            
            //告知函last title
            this.noticeTitle = loseCreditDetailList[0].detailList[0].bigTitle;

            //告知函last image
            this.noticeImg = this.config.pic_path + loseCreditDetailList[loseCreditDetailList.length - 1].imageUrl;

            this.loseCreditDetailList = loseCreditDetailList;
        }
    }
</script>

