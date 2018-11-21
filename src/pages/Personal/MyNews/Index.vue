<template>
    <div class="my-news" v-cloak>
        <page-header :title="title" :showBack="showBack" :showBtnClose="showBtnClose" v-if="platform === 'H5'"></page-header>
        <div class="content">
            <ul>
                <li v-for="(item, index) in news" :key="index">
                    <div class="news-wrap">
                        <i v-if="item.is_read === '0'"></i>
                        <div class="news-title clearfix">
                            <p class="status">{{item.title}}</p>
                            <span class="date">{{item.createTime}}</span>
                        </div>
                        <div class="news-content clearfix">
                            <p class="desc">{{item.content}}</p>
                            <a class="action" :href="item.url" v-if="item.isCancel !== 'Y' && item.operate && (item.filterType === 'ljtx' || item.filterType === 'czhk' || item.filterType === 'hinslb' || item.filterType === 'qtxjd' || item.filterType === 'ljqy' || item.filterType === 'hqlsq' || item.filterType === 'linkh5')">{{item.operate}}</a>
                            <router-link class="action" v-if="item.isCancel !== 'Y' && item.operate && (item.filterType !== 'ljtx' && item.filterType !== 'czhk' && item.filterType !== 'hinslb' && item.filterType !== 'qtxjd' && item.filterType !== 'ljqy' && item.filterType !== 'hqlsq' && item.filterType !== 'linkh5')" :to="{path: item.url}">{{item.operate}} </router-link>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="weui-loadmore" v-if="showMore">
                <i class="weui-loading"></i>
                <span class="weui-loadmore__tips">正在加载</span>
            </div>
            <div class="weui-loadmore weui-loadmore_line" v-if="!showMore">
                <span class="weui-loadmore__tips">已经到底了</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import 'weui/dist/style/weui.min.css';
    .content {
        padding-top: 2.444444rem /* 55/22.5 */;
        margin-top: .325rem;
        background: #fff;
        padding-bottom: 1.025rem;
        ul {
            li {
                position: relative;
                background-color: #fff;
                padding-top: .55rem;
                padding-bottom: .725rem;
                padding: .375rem .65rem;
                padding-right: 0;
                .news-wrap {
                    position: relative;
                    padding-left: .525rem;
                    border-bottom: 1px solid #ddd;
                    padding-right: .9rem;
                    i {
                        position: absolute;
                        display: inline-block;
                        width: .225rem;
                        height: .225rem;
                        border-radius: 50%;
                        background-color: #FF001F;
                        left: 0;
                        top: 0.2rem;
                    }
                    .news-title {
                        width: 100%;
                        .status {
                            float: left;
                            font-size: .65rem;
                            color: #333333;
                        }
                        .date {
                            float: right;
                            font-size: 0.6rem;
                            color: #ccc;
                        }
                    }
                    .news-content {
                        margin-top: .25rem;
                        margin-bottom: .75rem;
                        .desc {
                            width: 11rem;
                            float: left;
                            font-size: .6rem;
                            color: #999999;
                            line-height: .95rem;
                        }
                        .action {
                            float: right;
                            padding: .1rem .3rem;
                            border: 1px solid #FF6F0D;
                            border-radius: 2.15rem;
                            font-size: .55rem;
                            color: #FF6F0D;
                        }
                    }
                }
            }
        }
    }
</style>

<script>
    import PageHeader from '@/components/PageHeader.vue';

    export default {
        components: {
            PageHeader
        },
        data () {
            return {
                title: '我的消息',
                showBack: true,
                showBtnClose: false,
                sw: true,
                showMore: true,
                curPage: '1',
                list: [],
                news: [],
                platform: ''
            }
        },
        methods: {
            queryMyMsg: function() {
                let postData = new URLSearchParams();
                    postData.append('username', this.utils.getCookie("userName"));
                    postData.append('uuid', 'c3b522f8-72d3-4135-a04d-22b75b457e6b');
                    postData.append('curPage', this.curPage);
                    postData.append('maxLine', 10);
                this.sw = false;
                this.common.QueryMyMsg(postData)
                    .then( res => {
                        let data = res.data;
                        if(data.resultCode === '1') {
                            this.list = data.list;
                            this.list.forEach( (val, index) => {
                                if(val.isCancel !== "Y") {
                                    let filterType = val.type;
                                    let urlParam="";
                                    if(filterType.indexOf("&") !== -1){
                                        urlParam = filterType.substring(filterType.indexOf("&") + 1, filterType.length);
                                        filterType = filterType.substring(0, filterType.indexOf("&"));
                                    }
                                    val.filterType = filterType;
                                    if(val.operate) {
                                        const MWEB_PATH = this.config.MWEB_PATH;
                                        let url;
                                        switch (filterType) {
                                            case 'ljtx':
                                                url = MWEB_PATH+'/newweb/product/sijidai.html';
                                                break;
                                            case 'czhk':
                                                url = MWEB_PATH+'/newweb/personalCenter/rechargePay.html';
                                                break;
                                            case 'ckyhq':
                                                //url = MWEB_PATH+'/newweb/product/sijidai.html';
                                                // 跳转到我的优惠券
                                                url = 'myCoupon';
                                                //this.$router.push({path: 'myCoupon'});
                                                break;
                                            case 'hinslb':
                                                url = 'javascript:void(0);';
                                                break;
                                            case 'qtxjd':
                                                url = MWEB_PATH+'/newweb/product/cashProduct.html';
                                                break;
                                            case 'ljqy':
                                                //url = MWEB_PATH+'/newweb/product/cashProduct.html';
                                                let arr = urlParam.split('&');
                                                let index = -1;
                                                let ref = '';
                                                for(var i in arr) {
                                                    let str = arr[i];
                                                    let key = str.split('=')[0];
                                                    let value = str.split('=')[1];
                                                    if(key === 'proid' && value === 'DDCP') {
                                                        index = 0;
                                                    } else if (key === 'appid') {
                                                        ref = value;
                                                    }
                                                }
                                                const platform = this.utils.getPlatform();
                                                this.platform = platform;
                                                const ua = navigator.userAgent;
                                                const comeFrom = ua.indexOf('comeFrom:iOS') > -1 || ua.indexOf('comeFrom:android') > -1 ? 'APP' : 'H5';

                                                if(index === -1){
                                                    url = MWEB_PATH+'/newweb/personalCenter/signature.html?appNo=' + ref + '&comeFrom=' + comeFrom;
                                                } else {
                                                    url = MWEB_PATH+'/newweb/creditInfo/signContract.html?appNo=' + ref;
                                                }
                                                break;
                                            case 'hqlsq': //申请嗨钱来
                                                url = MWEB_PATH+'/newweb/creditInfo/editablePage.html?' + urlParam;
                                                break;
                                            case 'linkh5':
                                                url = urlParam;
                                                break;
                                            default:
                                                url = '/';
                                                //this.$router.push({path: '/'});
                                                break;
                                        }
                                        val.url = url;
                                    }
                                }
                                this.news.push(val)
                                if(val.is_read === "0"){
                                    let params = new URLSearchParams();
                                        params.append('id', val.id);
                                        params.append('is_read', '1');
                                    this.common.UpdateMsgStatus(params)
                                        .then( res => {
                                        })
                                }
                            })
                            if(data.list.length == 10) {
                                this.sw = true;
                                this.curPage++;
                            } else {
                                this.showMore = false;
                            }   
                        } else {
                            this.errorMsg = data.resultMsg;
                            this.$vux.toast.show({
                                type: 'cancel',
                                position: 'middle',
                                text: this.errorMsg
                            })
                        }
                    })
            }
        },
        mounted () {
            this.queryMyMsg();

            // 缓存指针
            var scrollTop = 0;
            // 设置一个开关来避免重负请求数据
            
            window.addEventListener('scroll', () => {
                scrollTop = document.documentElement.scrollTop;
                if(scrollTop == 0){
                    scrollTop = document.body.scrollTop;
                }
                // 判断是否滚动到底部
                if (scrollTop + window.innerHeight + 40 >= document.body.offsetHeight) {
                    // 如果开关打开则加载数据
                    if(this.sw){
                        this.queryMyMsg();
                    }
                    
                }
            }, true);
        }
    }   
</script>

