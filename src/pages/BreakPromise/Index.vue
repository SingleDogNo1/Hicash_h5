<template>
    <div class="break-promise">
        <page-header :title="title" :showBack="showBack" :showBtnClose="showBtnClose"></page-header>
        <div class="content">
            <div class="loan">
                <img src="./images/bg_broke_promise.png" width="100%" />
            </div>

            <div class="hot-wrap">
                <p>
                    <span>热点推荐</span>
                    <a href="./hotNewsList.html">更多</a>
                </p>
            </div>

            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <!-- <swiper :show-desc-mask="false" :auto="true" :show-dots="false" :interval="5000000">
                         <swiper-item class="swiper-demo-img" v-for="(item, index) in hotNews" :key="index">
                            <a class="arrow_box swiper-slide" :href="item.newUrl" :key="index">
                                {{item.title}}
                                <span class="ico" v-if="item.marker && item.marker != ''"><img :src="require('./images/' + item.marker + '-ico.png')" /></span>
                            </a>
                        </swiper-item>
                    </swiper> -->
                    <a class="arrow_box swiper-slide" :href="item.newUrl" v-for="(item, index) in hotNews" :key="index">
                        {{item.title}}
                        <span class="ico" v-if="item.marker && item.marker != ''"><img :src="require('./images/' + item.marker + '-ico.png')" /></span>
                    </a>
                </div>
            </div>

            <div class="search-wrap">
                <div class="search-form">
                <p class="search-form-tips">
                    本专区为您提供全面准确的个人财务状况，您可以通过输入<span class="pink">“姓名” + “身份证号码”</span>或<span class="pink">“姓名” + “手机号码”</span>进行查询，便于您及时掌握相关信息。
                </p>
                <input  v-model="name" class="name" type="text" name="name" placeholder="姓名" maxlength="10">
                <input v-model="number" class="tel" type="text" name="tel" placeholder="身份证号/手机号" maxlength="20">
                <button @click="search" class="btn-search" name="search">查询</button>
                <p class="advice-info">如有任何疑问<br />可拨打<a class="btn-tel" data-href="4000205566">400-020-5566</a>咨询</p>
                </div>
            </div>
            <div class="loan" title="失信案例库">
                <img @click="adShiXin" src="./images/ad-shixin.png" width="100%" />
            </div>
            <div class="loan" title="天下信用">
                <img @click="adClick" src="./images/ad.png" width="100%" />
            </div>
        </div>
        <page-footer></page-footer>
    </div>
</template>

<style lang="scss" scoped>
    .content {
        width      : 100%;
        margin-bottom: 1.8rem;
        padding-top: 46px;
        background : #fff;
        .loan {
            width : 100%;
            height: auto;
        }
        .hot-wrap {
            width        : 90%;
            border-radius: 8px;
            margin       : 0.5rem auto 1rem auto;
            font-size    : 0.53rem;
            p {
                width        : 100%;
                height       : 0.75rem;
                margin-bottom: 0.75rem;
                span {
                    display    : block;
                    float      : left;
                    font-weight: bold;
                    color      : #333;
                }
                a {
                    display: block;
                    float  : right;
                    color  : #999;
                }
            }
            &:after {
                content: " ";
                clear  : both;
            }
        }
        .swiper-container {
            width: 90%;
            margin: 0 auto;
            .arrow_box {
                width        : 80%;
                height       : auto;
                border-radius: 5px;
                position     : relative;
                background   : #f5f5f5;
                font-size    : 0.65rem;
                margin-right : 30px !important;
                display      : block;
                color        : #333 !important;
                .ico{
                    display : block;
                    position: absolute;
                    top     : -2px;
                    left    : 0;
                    img{
                        width: 37px;
                    }
                }
            }
            .arrow_box:hover {
                color: #333 !important;
            }
            .arrow_box:after {
                right            : -8px;
                bottom           : -15px;
                border           : solid transparent;
                content          : " ";
                height           : 0;
                width            : 0;
                position         : absolute;
                pointer-events   : none;
                border-color     : rgba(136, 183, 213, 0);
                border-left-color: #f5f5f5;
                border-width     : 15px;
                transform        : rotate(135deg);
                -ms-transform    : rotate(135deg);
                /* IE 9 */
                -moz-transform: rotate(135deg);
                /* Firefox */
                -webkit-transform: rotate(135deg);
                /* Safari 和 Chrome */
                -o-transform: rotate(135deg);
            }
            .swiper-slide {
                width : 70% !important;
                height: 72px !important;
                /* Center slide text vertically */
                display                : -webkit-box;
                display                : -ms-flexbox;
                display                : -webkit-flex;
                display                : flex;
                -webkit-box-pack       : center;
                -ms-flex-pack          : center;
                -webkit-justify-content: center;
                justify-content        : center;
                -webkit-box-align      : center;
                -ms-flex-align         : center;
                -webkit-align-items    : center;
                align-items            : center;
            }
        }
        .search-wrap {
            width        : 90%;
            border-radius: 8px;
            background   : #f5f5f5;
            margin       : 1rem auto;
            .search-form{
                padding      : 0.75rem;
                .search-form-tips {
                    width      : 100%;
                    margin     : 0 auto;
                    font-size  : 0.53rem;
                    line-height: 0.888889rem;
                    color      : #333;
                }
                .pink {
                    color: #F28BB1;
                }
                .name {
                    display      : block;
                    width        : 100%;
                    height       : 1.96rem;
                    margin-top   : 0.5rem;
                    padding-left : 0.56rem;
                    border       : 1px solid #ccc;
                    border-radius: 5px;
                    font-size: 14px;
                }
                .tel {
                    display      : block;
                    width        : 100%;
                    height       : 1.96rem;
                    margin-top   : 0.44rem;
                    padding-left : 0.56rem;
                    border       : 1px solid #ccc;
                    border-radius: 5px;
                    font-size: 14px;
                }
                .btn-search {
                    display      : block;
                    width        : 100%;
                    height       : 1.96rem;
                    margin-top   : 0.5rem;
                    background   : #fd87bf;
                    border       : none;
                    border-radius: 5px;
                    color        : #fff;
                    font-size    : 0.65rem;
                }
                .advice-info {
                    width     : 100%;
                    margin-top: 0.5rem;
                    font-size : 0.53rem;
                    color     : #999;
                    text-align: center;
                }
            }
        }
    }
</style>


<script>

    import PageHeader from '@/components/PageHeader.vue';
    import PageFooter from '@/components/PageFooter.vue';
    import Swiper from 'swiper';

    export default {
        components: {
            PageHeader,
            PageFooter,
            Swiper
        }, 
        data () {
            return {
                title: '失信专区',
                showBack: false,
                showBtnClose: false,
                name: '',
                number: '',
                loseCreditDetailList: [],
                hotNews: []
            }
        },
        methods: {
            search: function(){
                var errorMsg = '';
                if(this.name === '') {
                    errorMsg = '请输入姓名';
                }
                if(this.name !== '' && this.number === '') {
                    errorMsg = '请输入身份证号或手机号';
                }
                console.log(this.utils.checkMobile(this.number))
                if((this.name !== '' && this.number !== '' && !this.utils.checkMobile(this.number)) && (this.name !== '' && this.number !== '' && !this.utils.checkIdCardNumber(this.number))) {
                    errorMsg = '身份证号或手机号输入有误';
                }
                if(errorMsg!="") {
                    console.log(this.$vux.toast)
                    // /this.$vux.toast.width('auto')
                    this.$vux.toast.text(errorMsg, 'middle');
                    return;
                }

                // 请求地址

                let _params = new URLSearchParams();
                    _params.append('name', this.name);
                    _params.append('number', this.number);

                this.common.loseCreditInfo(_params)
                    .then( res => {
                        let data = res.data;
                        var storage = window.sessionStorage;

                        storage.setItem("loseCreditDetailList", JSON.stringify(data.loseCreditDetailList));
                        //window.location.href = MWEB_PATH + "newweb/infoList/searchResult.html?comefrom=h5";
                        this.$router.push({path: 'result'});
                        var err_code = parseInt(data.resultCode);
                        switch (err_code) {
                            case 60200:
                                alert('获取失信诉讼名单失败');
                                break;
                            case 60201:
                                alert('获取失信诉讼名单请求参数无效');
                                break;
                            case 60202:
                                alert('请输入15位或18位有效身份证号码');
                                break;
                            case 60203:
                                alert('已经没有更多的数据了');
                                break;
                        }
                    })
            },
            SysParam: function() {
                let _params = new URLSearchParams();
                    _params.append('paramCode', 'RDTJ');

                this.common.getSysParam(_params)
                    .then( res => {
                        let data = res.data;
                        data.list.forEach( (val, index) => {
                            val.newUrl = './hotNewsDetails.html?id=' + val.id;
                            this.hotNews.push(val);
                        });
                        console.log('res====', res)
                        setTimeout(() => {
                            var swiper = new Swiper('.swiper-container', {
                                slidesPerView: 'auto',
                                autoplay: {
                                    delay: 2500,
                                    disableOnInteraction: false,
                                },
                            });
                        }, 500);
                    })
            },
            adClick: function () {
                _czc.push(['_trackEvent', '天下信用', '天下信用打开的次数', '', '', 'TXXY']);
                // $('.txxyIframe').show();
                // $('.sxsy').hide();
                // $('#app').css("overflow-y", "hidden");
                window.location.href = 'https://m.tianxiaxinyong.com/cooperation/crp-op/product-select-v2.html?channel1=L1R6ZXcxSzhoNWZub2swUlFoalFhZz09&channel2=N3hUZmtVR0dET1VrTzVncE9hMjRPQT09&channel3=YkFCK3BUc3VSbFJPZ2RwSDJ4VXpUUT09';
            },
            adShiXin: function() {
               // window.location.href = MWEB_PATH + 'newweb/infoList/hotNewsList.html?code=SXAL' 
            }
        },
        mounted () {
            this.SysParam();

            var jsinner = $('<script src="https://s95.cnzz.com/z_stat.php?id=1260767143&web_id=1260767143" language="JavaScript"><\/script>');
            $('body').append(jsinner);

            window.setTimeout(function(){
                _czc.push(['_trackEvent', '失信公告', '记录失信公告页面打开的次数', '','','SXGG']);
            },2000);
            var source = this.$route.query.source
            if(source=='message'){
                window.setTimeout(function(){
                    _czc.push(['_trackEvent', '通过短信进入失信页面', '记录通过短信进入失信页面打开的次数', '','','DXSX']);
                },2000);
            }
            if(source=='wx'){
                window.setTimeout(function(){
                    _czc.push(['_trackEvent', '通过微信进入失信页面', '记录通过微信进入失信页面打开的次数', '','','WXSX']);
                },2000);
            }
            
        }
    }
</script>

