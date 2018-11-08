<template>
    <div class="my-news" v-cloak>
        <page-header :title="title" :showBack="showBack" :showBtnClose="showBtnClose"></page-header>
        <div class="content">
            <ul>
                <li>
                    <div class="news-wrap">
                        <div class="news-title clearfix">
                            <p class="status">订单审核结果消息</p>
                            <span class="date">2018-08-07</span>
                        </div>
                        <div class="news-content clearfix">
                            <p class="desc">很抱歉,您的嗨秒贷审核未通过，可至【磐多拉信用】申请，选择更多、通过率更高</p>
                            <a class="action" href="#">立即前往</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
                    padding-left: .525rem;
                    border-bottom: 1px solid #ddd;
                    padding-right: .9rem;
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
                page: 1
            }
        },
        methods: {
            queryMyMsg: function() {
                let postData = new URLSearchParams();
                    postData.append('username', this.utils.getCookie("userName"));
                    postData.append('uuid', 'c3b522f8-72d3-4135-a04d-22b75b457e6b');
                    postData.append('curPage', this.page);
                    postData.append('maxLine', 10);
                    console.log(postData)
                this.common.QueryMyMsg(postData)
                    .then( res => {
                        let data = res.data;
                        console.log('data====', data)
                    })
            }
        },
        mounted () {
            this.queryMyMsg();
        }
    }   
</script>

