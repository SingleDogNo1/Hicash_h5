<template>
    <div class="hot-news-detail">
        <page-header :title="title" :showBack="showBack" :showBtnClose="showBtnClose"></page-header>
        <div id="details">
            <div class="news_title">
                <h2 v-html="newsTitle"></h2>
                <span>
                    <em class="timer">时间：<span v-html="createTime"></span></em>
                </span>
            </div>
            <div class="content" v-html="content">
                
            </div>
            <img src="./images/hicash-ico.png" width="50%" class="hotNewsLogo">
            <div class="btn" @click="shareMethods" v-if="shareBox">分享</div>
            <div id="share" @click="sharePopup" class="btn" v-if="!shareBox">分享</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '../../assets/share/css/share.min.css';
    .hot-news-detail {
        padding-top: 2.2rem;
        width     : 100%;
        height    : auto;
        overflow-y: auto;
        background: #fff;
        .news_title {
            padding   : 0 0.85rem;
            h2 {
                font-size  : 1.2rem;
                color      : #333;
                font-weight: 400;
                padding    : 1rem 0 0.3rem;
            }
            em{
                font-style: normal;
            }
            span {
                font-size: 0.65rem;
                color    : #a4a4a4;
            }
        }
        .content {
            padding   : 0 0.85rem;
        }
        .hotNewsLogo {
            display   : block;
            margin    : 0 auto;
            width     : 160px;
            margin-top: 20px;
        }
        .btn{
            width        : 80px;
            height       : 30px;
            text-align   : center;
            line-height  : 30px;
            margin       : 20px auto;
            background   : #fd87bf;
            border-radius: 5px;
            font-size    : 14px;
            color        : #fff;
        }
    }
</style>

<script type="text/javascript">
    let share = require('@/assets/js/mShare');
    import PageHeader from '@/components/PageHeader.vue';

    export default {
        components: {
            PageHeader
        },
        data () {
            return {
                title: '热点推荐',
                showBack: true,
                showBtnClose: false,
                newsTitle: '',
                createTime: '',
                content: '',
                shareBox: false,
                wxShareIco: './images/icon_default.png'
            }
        },
        methods: {
            GsdtHyzxDetailMsg: function() {
                var id = this.$route.query.id;
                let _params = new URLSearchParams();
                    _params.append('id', id);
                    _params.append('uuid', 'c3b522f8-72d3-4135-a04d-22b75b457e6b');
                    _params.append('requestSource', 'HTML5');
                this.common.GsdtHyzxDetailMsg(_params)
                    .then( res => {
                        let data = res.data;
                        this.newsTitle = data.title;
                        if (data.createTime) {
                            this.createTime = data.createTime.substring(0, 10);
                        }
                        this.content = data.content;   
                });
            },
            shareMethods: function(){
                window.hicashJSCommunication.onCallApp(JSON.stringify({"type":"h5_share","shareTitle":this.title,"shareContent": "失信文章分享","shareUrl":window.location.href,"shareImageUrl":_this.wxShareIco}));
            },
            sharePopup: function () {
                var config = {
                    title: this.title,
                    desc: '失信文章分享', // 描述, 默认读取head标签：<meta name="description" content="desc" />
                    types: ['wx', 'qq', 'qzone', 'sina'], // 开启的分享图标, 默认为全部
                    infoMap: {
                        wx: {
                            title: this.title,
                            desc: '失信文章分享',
                            link: window.location.href,
                            imgUrl:this.wxShareIco
                        }
                    },
                    fnDoShare: function (type) {
                        console.log(1);
                    }
                };
                share.Mshare.popup(config);
            }
        },
        mounted: function () {
            var code = this.$route.query.code;
            if(code){
                this.code = code;
                if(code == 'SXAL'){
                    this.title = '失信执行案例';
                }
            }else{
                this.title = '热点推荐';
            }
            this.GsdtHyzxDetailMsg();

            let platform = this.utils.getPlatform();
            if (platform != 'H5') {
                this.shareBox = true;
            }

            // let url = 'http://dev.hicash.cn/newweb/infoList/lib/m-share.min.js'
            // let script = document.createElement('script')
            // script.setAttribute('src', url)
            // document.getElementsByTagName('head')[0].appendChild(script)
        }
    }
</script>