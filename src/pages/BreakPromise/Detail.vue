<template>
    <div class="break-promise-detail" v-cloak>
        <page-header :title="title" :showBack="showBack" :showBtnClose="showBtnClose"></page-header>
        <div class="main" v-if="type === '1' || type === '2'">
            <div class="date">
                <span class="title">逾期天数</span>
                <span>{{dayNum}}天</span>
            </div>
            <div class="detial" v-for="(listDetial,index) in list" :key="index">
                <div class="title" v-html="index === 0 ? detailTitle : listDetial.titleName"></div>
                <div class="process">
                    <div class="item" :class="item.isHighLight ? 'highLight' : ''" v-for="(item, index) in listDetial.loseCreditStatus" :key="index">
                        <span class="symbol">●</span>
                        <span class="value">{{item.loseStatusName}}</span>
                        <span class="line" v-if="listDetial.loseCreditStatus.length > index + 1"></span>
                    </div>
                </div>
                <div class="cleanFix"> </div>
            </div>
        </div>
        <ul class="detail-list" v-if="type === '0'">
            <li v-for="(loseCreditStatusListItem, index) in list" :class="{'on': loseCreditStatusListItem.isHighLight}" :key="index">
                <div class="list-info">{{loseCreditStatusListItem.collectionM}}</div>
                <b class="list-icon" :class="{'on': loseCreditStatusListItem.isHighLight}"></b>
            </li>
        </ul>
        <toRecharge :type="type"></toRecharge>
        <div class="tips"><span>！还款至嗨钱指定账户，未经嗨钱同意，您不得将借款归还到其他任何账户。</span>及时还款后可恢复您的信用状态，您的个人信用将不再产生任何影响！</div>
    </div>
</template>

<style lang="scss" scoped>
    .break-promise-detail {
        width: 100%;
        height: auto;
        padding-top: 3rem;
        padding-bottom: 2rem;
        background: #eee !important;
        .vux-header {
            border-bottom: 1px solid #ccc;
        }
        .main {
            width: 90%;
            height: auto;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 8px;
            span{
                display: inline-block;
                font-size: 15px;
            }
            .date{
                width: 100%;
                height: 60px;
                line-height: 60px;
                margin: 0 0.5rem;
                border-bottom: 1px solid #EEEEEE;
                color: #999;
                .title{
                    width: 130px;
                    height: auto;
                    font-family: PingFangSC-Regular;
                    color: #333333;
                }
            }
            .detial {
                margin: 0 0.5rem;
            .title {
                    float: left;
                    width: 40%;
                    font-size: 15px;
                    color: #333;
                    height: 38px;
                    line-height: 38px;
                }
                .process{
                    width: 60%;
                    float: left;
                    .item{
                        width: 100%;
                        height: 40px;
                        position: relative;
                        color: #999;
                        .symbol{
                            width: 10%;
                            height: 40px;
                            line-height: 40px;
                            font-size: 8px;
                            display: block;
                            float: left;
                        }
                        .value{
                            width: 86%;
                            margin-left: 5px;
                            line-height: 40px;
                            display: block;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            float: left;
                        }
                        .line{
                            width: 1px;
                            height: 25px;
                            position: absolute;
                            top: 29px;
                            left: 3px;
                            background: #999;
                        }
                    }
                    .item.highLight{
                        color: #F28BB1 !important;
                        .line{
                            background: #F28BB1 !important;
                        }
                    }
                }
                .cleanFix{
                    clear: both;
                }
            }
        }
        .detail-list {
            width: 90%;
            height: auto;
            margin: 0 auto;
            li{
                width: 100%;
                margin-bottom: 0.444444rem;
                position: relative;
                .list-info{
                    width: 75%;
                    display: inline-block;
                    font-size: 15px;
                    padding: 0.577778rem 0.644444rem;
                    background-color: #fff;
                    border-radius: 8px;
                    font-size: 15px;
                    color: #999999;
                    text-align: justify;
                }
                .list-icon {
                    display: inline-block;
                    width: 26px;
                    height: 26px;
                    margin-left: 0.4rem;
                    background: url("./images/icon_empty.png") center center no-repeat;
                    background-size: 25px 25px;
                    position: absolute;
                    top: 50%;
                    margin-top: -13px;
                }
                .list-icon.on{
                    background: url("./images/icon_act.png") center center no-repeat;
                    background-size: 25px 25px;
                }
            }
            li.on {
                .list-info{
                    background: #e0719c;
                    color: #fff;
                }
            }
        }
        .btn{
            width: 90%;
            height: 44px;
            background: #F28BB1;
            color: #fff;
            font-size: 15px;
            display: block;
            border-radius: 5px;
            margin: 0 auto;
            margin-top: 1rem;
        }
        .tips{
            width: 90%;
            height: auto;
            font-family: PingFangSC-Semibold;
            font-size: 13px;
            color: #3F3F3F;
            letter-spacing: 0;
            margin: 0 auto;
            text-align: justify;
            margin-top: 0.5rem;
            span{
                color: #F28BB1;
                font-weight: bold;
            }
        }
    }
</style>

<script>
    import PageHeader from '@/components/PageHeader.vue'
    import PageFooter from '@/components/PageFooter.vue'
    import ToRecharge from '@/components/ToRecharge.vue'

    export default {
        components: {
            PageHeader,
            PageFooter,
            ToRecharge
        },
        data () {
            return {
                detailTitle: '',
                title: '',
                showBack: true,
                showBtnClose: false,
                type: '',
                dayNum: '',
                list: []
            }
        },
        mounted: function () {
            let hyApplicationNo = this.$route.query.hyApplicationNo;
            let type = this.$route.query.type;
            this.type = type

            var jsinner = $('<script src="https://s95.cnzz.com/z_stat.php?id=1260767143&web_id=1260767143" language="JavaScript"><\/script>');
            $('body').append(jsinner);

            if(type === '0'){
                $('.creditHeader h1').html('失信详情');
                this.detailTitle = '失信';
                this.title = this.detailTitle + '详情';
                window.setTimeout(function(){
                    _czc.push(['_trackEvent', '失信详情', '抓取“失信详情”按钮的点击量', '', '', 'SXXQ']);
                },2000);
            } else if(type === '1') {
                $('.creditHeader h1').html('诉讼详情');
                this.detailTitle = '诉讼';
                this.title = this.detailTitle + '详情';
                window.setTimeout(function(){
                    _czc.push(['_trackEvent', '诉讼详情', '抓取“诉讼详情”按钮的点击量', '', '', 'SSXQ']);
                },2000);
            } else {
               $('.creditHeader h1').html('仲裁详情');
                this.detailTitle = '仲裁';
                this.title = this.detailTitle + '详情';
                window.setTimeout(function(){
                    _czc.push(['_trackEvent', '仲裁详情', '抓取“仲裁详情”按钮的点击量', '', '', 'ZCXQ']);
                },2000); 
            }

            // 请求地址
            let postData = new URLSearchParams();
                postData.append('hyApplicationNo', hyApplicationNo);
                postData.append('type', type);
            this.common.loseCreditDetail(postData)
                .then( res => {
                    let data = res.data;
                    if(data.resultCode === '1') {
                        if(type === '0') {
                            const list = data.loseCreditStatusList;
                            this.list = list;
                        } else {
                            const list = data.litigationStatusList || data.arbitrationStatusList;
                            this.list = list;
                            this.dayNum = list[0].titleName;    
                        }
                    } else {
                        var err_code = parseInt(data.resultCode);
                        switch (err_code){
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
                    }
            })
        }
    }
</script>

