<template>
    <div class="hot-news">
        <page-header :title="title" :showBack="showBack" :showBtnClose="showBtnClose"></page-header>
        <div id="list">
            <router-link class="weui-media-box weui-media-box_appmsg" :to="{name: 'HotNewsDetail', query: {id: item.id, code: code}}" v-for="(item, index) in hotNews" :key="index">
                <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb" :src="item.mediaImage">
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{item.title}}</h4>
                    <ul class="weui-media-box__info">
                        <li class="weui-media-box__info__meta">{{item.clickCount}}阅读</li>
                        <li class="weui-media-box__info__meta">{{item.createTime}}</li>
                        <li class="weui-media-box__info__meta marker-ico" v-if="item.marker && item.marker != ''">
                            <img :src="require('./images/' + item.marker + '-list-ico.png')" width="33px" />
                        </li>
                    </ul>
                </div>
            </router-link>
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
    .hot-news {
        width: 100%;
        height: auto;
        padding-top: 50px;
        overflow-y: auto;
        background: #fff;
        .vux-header {
            border-bottom: 1px solid #ccc;
        }
        .weui-media-box__hd {
            width : 110px;
            height: 75px;
        }
        .weui-media-box__info {
            .weui-media-box__info__meta {
                float: right !important;
                color: #999 !important;
            }
            .marker-ico img{
                width: 33px;
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
                title: '',
                showBack: true,
                showBtnClose: false,
                hotNews: [],
                curPage: '1',
                showMore: true,
                sw: true,
                code: 'RDTJ'    
            }
        },
        methods: {
            SysParam: function() {
                let _params = new URLSearchParams();
                    _params.append('paramCode', this.code);
                    _params.append('maxLine', 10);
                    _params.append('curPage', this.curPage);

                this.sw = false;
                this.common.getSysParam(_params)
                    .then( res => {
                        let data = res.data;
                        data.list.forEach( (val, index) => {
                            if(val.createTime){
                                val.createTime = val.createTime.substring(0, 10);
                            }
                            //val.newUrl = './hotNewsDetails.html?id=' + val.id + '&code=' + this.code;
                            val.mediaImage = this.config.pic_path + val.mediaImage;
                            this.hotNews.push(val);
                        });
                        if(data.list.length == 10) {
                            this.sw = true;
                            this.curPage++;
                        } else {
                            this.showMore = false;
                        }   
                    })
            }
        },
        mounted () {
            var jsinner = $('<script src="https://s95.cnzz.com/z_stat.php?id=1260767143&web_id=1260767143" language="JavaScript"><\/script>');
            $('body').append(jsinner);
            let code = this.$route.query.code;
            if(code) {
                this.code = code;
                if(code == 'SXAL'){
                    this.title = '失信执行案例';
                    window.setTimeout(function(){
                        _czc.push(['_trackEvent', '失信列表', '抓取首页“失信执行案例”浏览文章列表页的量', '', '', 'SXLB']);
                    },2000);
                }
            } else {
                this.title = '热点推荐';
                window.setTimeout(function(){
                    _czc.push(['_trackEvent', '热点列表', '抓取首页“热点推荐”浏览文章列表页的量', '', '', 'RDLB']);
                },2000);
            }
            this.SysParam();

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
                        this.SysParam();
                    }
                    
                }
            }, true);
        }
    }
</script>


