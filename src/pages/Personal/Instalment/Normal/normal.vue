<template>
    <div>
        <div class="checker-wrap">
            <div @click="checkerStatus(1)"  :class="checkerType == 1 ? 'checker-selected' : ''" class="checker-default">
                申请中
                <badge></badge>
            </div>
            <div @click="checkerStatus(2)"  :class="checkerType == 2 ? 'checker-selected' : ''" class="checker-default">还款中</div>
            <div @click="checkerStatus(3)"  :class="checkerType == 3 ? 'checker-selected' : ''" class="checker-default">已完成</div>
        </div>

       

        <scroller lock-x height="-150px" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
            <flexbox orient="vertical"  class="order-list">
                <flexbox-item>
                    <div class="flex-order-item">
                        <div class="order-top">
                            <div class="order-des">
                                <div class="order-title">嗨秒分期</div>
                                <div class="order-num">订单号:21231231321</div>
                            </div>
                            <div class="order-date">2017-07-19</div>
                        </div>
                        <!-- passed 完成 | chat 等待 | close 失败 | gray 灰-->
                        <van-steps :active="active" active-color="#FF7640">
                            <van-step class="passed">申请订单</van-step>
                            <van-step class="chat">待签约</van-step>
                            <van-step class="close">审核失败</van-step>
                            <van-step class="gray">放款</van-step>
                        </van-steps>

                        <div class="order-bottom">
                            <div class="order-bottom-des left">借款金额：<span>650.00元</span></div>
                            <div class="order-bottom-des right">期数：<span>3期</span></div>
                        </div>
                    </div>
                </flexbox-item>

                <flexbox-item>
                    <div class="flex-order-item">
                        <div class="order-top">
                            <div class="order-des">
                                <div class="order-title">嗨秒分期</div>
                                <div class="order-num">订单号:21231231321</div>
                            </div>
                            <div class="order-date">2017-07-19</div>
                        </div>
                        <!-- passed 完成 | chat 等待 | close 失败 | gray 灰-->
                        <van-steps :active="active" active-color="#FF7640">
                            <van-step class="passed">申请订单</van-step>
                            <van-step class="chat">待签约</van-step>
                            <van-step class="close">审核失败</van-step>
                            <van-step class="gray">放款</van-step>
                        </van-steps>

                        <div class="order-bottom">
                            <div class="order-bottom-des left">借款金额：<span>650.00元</span></div>
                            <div class="order-bottom-des right">期数：<span>3期</span></div>
                        </div>
                    </div>
                </flexbox-item>

                <flexbox-item>
                    <div class="flex-order-item">
                        <div class="order-top">
                            <div class="order-des">
                                <div class="order-title">嗨秒分期</div>
                                <div class="order-num">订单号:21231231321</div>
                            </div>
                            <div class="order-date">2017-07-19</div>
                        </div>
                        <!-- passed 完成 | chat 等待 | close 失败 | gray 灰-->
                        <van-steps :active="active" active-color="#FF7640">
                            <van-step class="passed">申请订单</van-step>
                            <van-step class="chat">待签约</van-step>
                            <van-step class="close">审核失败</van-step>
                            <van-step class="gray">放款</van-step>
                        </van-steps>

                        <div class="order-bottom">
                            <div class="order-bottom-des left">借款金额：<span>650.00元</span></div>
                            <div class="order-bottom-des right">期数：<span>3期</span></div>
                        </div>
                    </div>
                </flexbox-item>

                <flexbox-item>
                    <div class="flex-order-item">
                        <div class="order-top">
                            <div class="order-des">
                                <div class="order-title">嗨秒分期</div>
                                <div class="order-num">订单号:21231231321</div>
                            </div>
                            <div class="order-date">2017-07-19</div>
                        </div>
                        <!-- passed 完成 | chat 等待 | close 失败 | gray 灰-->
                        <van-steps :active="active" active-color="#FF7640">
                            <van-step class="passed">申请订单</van-step>
                            <van-step class="chat">待签约</van-step>
                            <van-step class="close">审核失败</van-step>
                            <van-step class="gray">放款</van-step>
                        </van-steps>

                        <div class="order-bottom">
                            <div class="order-bottom-des left">借款金额：<span>650.00元</span></div>
                            <div class="order-bottom-des right">期数：<span>3期</span></div>
                        </div>
                    </div>
                </flexbox-item>

                <flexbox-item>
                    <div class="flex-order-item">
                        <div class="order-top">
                            <div class="order-des">
                                <div class="order-title">嗨秒分期</div>
                                <div class="order-num">订单号:21231231321</div>
                            </div>
                            <div class="order-date">2017-07-19</div>
                        </div>
                        <!-- passed 完成 | chat 等待 | close 失败 | gray 灰-->
                        <van-steps :active="active" active-color="#FF7640">
                            <van-step class="passed">申请订单</van-step>
                            <van-step class="chat">待签约</van-step>
                            <van-step class="close">审核失败</van-step>
                            <van-step class="gray">放款</van-step>
                        </van-steps>

                        <div class="order-bottom">
                            <div class="order-bottom-des left">借款金额：<span>650.00元</span></div>
                            <div class="order-bottom-des right">期数：<span>3期</span></div>
                        </div>
                    </div>
                </flexbox-item>
                <load-more tip="loading"></load-more>
            </flexbox>
        </scroller>
    </div>
</template> 

<style lang="scss">
    @import "~bowerComponents/sass-rem/_rem.scss";
    .MyInstalment {
        .checker-wrap{
            width: 100%;
            background: #fff;
            padding: rem(10px 15px);
            margin-bottom: 8px;
            .checker-default{
                color: #999;
                border: 1px solid #999;
                font-size: rem(15px);
                padding:rem(2px 3px);
                border-radius: rem(3px);
                margin-right: rem(10px);
                display: inline-block;
                position: relative;
            }
            .checker-selected{
                color: #FF7640;
                border: 1px solid #FF7640;
            }
            .vux-badge-dot{
                padding: rem(4px);
                position: absolute;
                right: rem(-3px);
                top: rem(-3px);
                display: block;
            }
        }
        .order-list{
            .flex-order-item{
                background: #fff;
                padding: rem(16px);
                
                span{
                    display: inline-block;
                    letter-spacing: 0;
                    text-align: left;
                }
                .order-top{
                    &:after{
                        content: '';
                        display: block;
                        clear: both;
                    }
                    div.order-des{
                        float: left;
                        .order-title{
                        font-family: PingFangSC-Medium;
                        font-size: rem(15px);
                        color: #333333;
                        }
                        .order-num{
                            font-family: PingFangSC-Regular;
                            font-size: rem(11px);
                            color: #999999;
                        }
                    }
                    div.order-date{
                        float: right;
                        font-size: 13px;
                        color: #999999;
                    }
                }
                
                .order-bottom{
                    &:after{
                        content: '';
                        display: block;
                        clear: both;
                    }
                    .order-bottom-des{
                        font-family: PingFangSC-Regular;
                        font-size: rem(15px);
                        color: #666666;
                        letter-spacing: 0;
                        text-align: left;
                        span{
                            font-family: PingFangSC-Regular;
                            color: #FF7640;
                        }
                    }
                }
                
            }
            
        }
        .van-steps{
            overflow: inherit;
        }
        .van-step--horizontal.van-step--finish .van-step__line{
            background-color: #FF7640 !important;
        }
        .van-step--horizontal .van-step__title{
            margin-top: 20px;
        }
        .van-step--horizontal .van-step__line{
            top: 0;
            background-color: #ccc;
            height: 2px;
            left: 1px;
        }
        .van-step--horizontal .van-step__circle-container{
            top: -8px;
            width: 16px;
            height: 16px;
            padding: 0;
        }
        .van-step--horizontal.van-step--process .van-step__circle-container{
            top: -7px;
            width: 16px;
            height: 16px;
            padding: 0;
        }
        .van-step--horizontal:last-child .van-step__circle-container{
            right: -7px;
        }
        .van-steps--horizontal{
            padding-right: 20px;
        }
        .van-steps--horizontal .van-steps__items{
            overflow: inherit;
        }
        .van-steps--horizontal .van-steps__items.van-steps__items--alone{
            padding: 30px 20px 20px;
        }
        .van-step--finish .van-step__title{
            color: #FF7640;
        }
        .van-step:last-child .van-step__title{
            margin-right: -28px;
        }
        .van-step:first-child .van-step__title{
            margin-left: -30px;
        }
        .van-step--horizontal .van-step__title{
            margin-left: 0px;
        }

        @font-face {
            font-style:normal;font-weight:400;font-family:vant-icon;src:url(https://img.yzcdn.cn/vant/vant-icon-872dd0.ttf) format('truetype')
        }

        .van-step.close .van-step__title{
            color: #D0021B !important;
        }
        .van-step__title{
            width: 60px;
            text-align: center;
        }
        .van-step.passed .van-step__circle,.van-step.passed .van-icon-checked{
            background-color: #fff;
            font-size: 16px;
            &:before {
                content: "\F012";
                color: #FF7640;
                position: relative;
                display: inline-block;
                font: normal normal normal 14px/1 vant-icon;
                font-size: inherit;
                text-rendering: auto
            }
        }
        .van-step.chat .van-step__circle, .van-step.chat .van-icon-checked{
            background-color: #fff;
            font-size: 16px;
            &:before {
                content: "\F034";
                color: #FF7640;
                position: relative;
                display: inline-block;
                font: normal normal normal 14px/1 vant-icon;
                font-size: inherit;
                text-rendering: auto
            }
        }
        .van-step.close .van-step__circle, .van-step.close .van-icon-checked{
            background-color: #fff;
            font-size: 16px;
            &:before {
                content: "\F013";
                color: #D0021B;
                position: relative;
                display: inline-block;
                font: normal normal normal 14px/1 vant-icon;
                font-size: inherit;
                text-rendering: auto
            }
        }
        .van-step.gray .van-step__circle{
            display: block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #ccc;
            margin-top: 3px;
        }
    }
</style>


<script>
    import { Checker, CheckerItem, Badge, Flexbox, FlexboxItem, Scroller, LoadMore } from 'vux'
    import vanStep from 'vant/lib/Step';
    import 'vant/lib/Step/style';
    import vanSteps from 'vant/lib/Steps';
    import 'vant/lib/Steps/style';

    export default {
        props: {

        },
        components: {
            Checker,
            CheckerItem,
            Badge,
            Flexbox,
            FlexboxItem,
            vanSteps,
            vanStep,
            Scroller,
            LoadMore 
        },
        data () {
            return {
                checkerType: 1,
                active: 2,
                onFetching: false
            }
        },
		mounted() {
			this.$nextTick(() => {
                this.$refs.scrollerBottom.reset({top: 0})
            })
		},
		methods: {
            checkerStatus:function(type){
                console.info('type===', type);
                this.checkerType = type;
                this.$refs.scrollerBottom.reset({top: 0})
            },
            onScrollBottom () {
                if (this.onFetching) {
                    // do nothing
                    // console.info('onFetching');
                } else {
                    this.onFetching = true;
                    setTimeout(() => {
                        this.$nextTick(() => {
                            this.$refs.scrollerBottom.reset();
                        })
                        this.onFetching = false;
                        console.info('请求中。。。');
                    }, 2000)
                }
            },
		}
    }
</script>