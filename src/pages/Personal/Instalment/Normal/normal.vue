<template>
    <div>
        <div class="checker-wrap">
            <div @click="checkerStatus('applying')"  :class="checkerType == 'applying' ? 'checker-selected' : ''" class="checker-default">
                申请中
                <badge></badge>
            </div>
            <div @click="checkerStatus('repay')"  :class="checkerType == 'repay' ? 'checker-selected' : ''" class="checker-default">
                还款中
                <badge></badge>
            </div>
            <div @click="checkerStatus('end')"  :class="checkerType == 'end' ? 'checker-selected' : ''" class="checker-default">已完成</div>
        </div>

       

        <scroller lock-x height="-150px" @on-scroll="onScroll" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
            <flexbox orient="vertical"  class="order-list">
                <!-- 申请中 -->
                <flexbox-item v-if="checkerType == 'applying'">
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

                        <div v-if="btnStatus === 'REJECTNODE'" class="notice">很抱歉，您的审核未通过，<br />查看此次被拒原因</div>

                        <div class="actions">
                            <a v-if="btnStatus === 'REJECTNODE'" href="javascript:void(0);" class="btn btn-go">立即前往</a>
                            <a v-if="btnStatus === 'SIGNNODE'" href="javascript:void(0);" class="btn btn-recharge">签约</a>
                            <a v-if="btnStatus === 'NEWNODE' || btnStatus === 'AUDITNODE' || btnStatus === 'SIGNNODE'" href="javascript:void(0);" class="btn btn-channel">取消订单</a>
                        </div>
                    </div>
                </flexbox-item>

                <!-- 还款中 -->
                <flexbox-item v-if="checkerType == 'repay'" v-for="(item, index) in items">
                    <div class="flex-order-item" ref="flexboxItem">
                        <div class="order-top">
                            <div class="order-des">
                                <div class="order-title">嗨秒分期</div>
                                <div class="order-num">订单号:21231231321</div>
                            </div>
                            <div class="order-date">2017-07-19</div>
                        </div>
                        
                        <x-table :cell-bordered="false"  :content-bordered="false" style="background-color:#fff;">
                            <thead>
                            <tr style="background-color: #F7F7F7">
                                <th>当期应还金额</th>
                                <th>当期应还时间</th>
                                <th>状态</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>金额计算中</td>
                                <td>2018.10.21 
                                    <popover placement="bottom"  v-if="btnStatus==='WITHDRAWALNODE' || btnStatus==='WITHDRAWALING'">
                                        <div slot="content" class="popover-content">
                                        放款成功，已经开始计息
                                        </div>
                                        <van-icon class="question" size="14px" name="question" color="#FF7640" />
                                    </popover>
                                </td>
                                <td>待提现</td>
                            </tr>
                            </tbody>
                        </x-table>

                        <div class="actions">
                            <a href="javascript:void(0);" class="btn-expand-all" :class="item.showOtherOrder ? 'up': 'down'" @click="openAll(item, index)" v-if="!item.showOtherOrder && btnStatus==='REPAYNODE'"><span>展开所有</span><i></i></a>
                            <a href="javascript:void(0);" class="btn btn-recharge" v-if="btnStatus==='REPAYNODE'">充值还款</a>
                            <a href="javascript:void(0);" class="btn btn-recharge" v-if="btnStatus==='WITHDRAWALNODE'">提现</a>
                        </div>

                        <div class="other-order" ref="otherOrder" :class="item.showOtherOrder?'animate':''">
                            <div class="each-other-order-wrap clearfix">
                                <div class="content-wrap clearfix">
                                    <div class="left-wrap">
                                        <label class="title">分期订单</label>
                                        <p class="amount">借款金额：<span>¥2000.00元</span></p>
                                    </div>
                                    <p class="right-wrap">期数：3期</p>
                                </div>
                                <div class="actions">
                                    <router-link class="btn-repayment-plan" :to="{'path': '/personal/myInstalment/repaymentPlan'}"><span>还款计划</span><i class="iconfont">&#58999;</i></router-link>
                                </div>
                            </div>
                            <div class="each-other-order-wrap clearfix">
                                <div class="content-wrap clearfix">
                                    <div class="left-wrap">
                                        <label class="title">分期订单</label>
                                        <p class="amount">借款金额：<span>¥2000.00元</span></p>
                                    </div>
                                    <p class="right-wrap">期数：3期</p>
                                </div>
                                <div class="actions">
                                    <router-link class="btn-repayment-plan" :to="{'path': '/personal/myInstalment/repaymentPlan'}"><span>还款计划</span><i class="iconfont">&#58999;</i></router-link>
                                </div>
                            </div>
                            <div class="each-other-order-wrap clearfix">
                                <div class="content-wrap clearfix">
                                    <div class="left-wrap">
                                        <label class="title">分期订单</label>
                                        <p class="amount">借款金额：<span>¥2000.00元</span></p>
                                    </div>
                                    <p class="right-wrap">期数：3期</p>
                                </div>
                                <div class="actions">
                                    <router-link class="btn-repayment-plan" :to="{'path': '/personal/myInstalment/repaymentPlan'}"><span>还款计划</span><i class="iconfont">&#58999;</i></router-link>
                                </div>
                            </div>
                            <a href="javascript:void(0);" class="btn-takeup-all" :class="item.showOtherOrder ? 'up': 'down'" @click="closeAll(item, index)"><span>收起所有</span><i></i></a>
                        </div>
                    </div>
                </flexbox-item>

                <!-- 已完成 -->
                <flexbox-item v-if="checkerType == 'end'" v-for="(item, index) in items">
                    <div class="flex-order-item"  ref="flexboxItem">
                        <div class="order-top">
                            <div class="order-des">
                                <div class="order-title">嗨秒分期</div>
                                <div class="order-num">订单号:21231231321</div>
                            </div>
                            <div class="order-date">2017-07-19</div>
                        </div>
                        
                        <x-table class="finish-item" :cell-bordered="false"  :content-bordered="false">
                            <thead>
                                <tr>
                                    <th>借款金额：<span>2000.00元</span></th>
                                    <th>期数：3期</th>
                                </tr>
                            </thead> 
                        </x-table>

                        <div class="actions">
                            <a href="javascript:void(0);" class="btn-expand-all" :class="item.showOtherOrder ? 'up': 'down'" @click="openAll(item, index)" v-if="!item.showOtherOrder && btnStatus==='ENDNODE'"><span>展开所有</span><i></i></a>
                            <a href="javascript:void(0);" class="btn btn-channel" v-if="btnStatus==='ENDNODE'">订单已完成</a>
                            <a href="javascript:void(0);" class="btn btn-canceled" v-if="btnStatus==='CANCLEED'">订单已取消</a>
                        </div>

                        <div class="other-order" ref="otherOrder" :class="item.showOtherOrder?'animate':''">
                            <div class="each-other-order-wrap clearfix">
                                <div class="content-wrap clearfix">
                                    <div class="left-wrap">
                                        <label class="title">分期订单</label>
                                        <p class="amount">借款金额：<span>¥2000.00元</span></p>
                                    </div>
                                    <p class="right-wrap">期数：3期</p>
                                </div>
                                <div class="actions">
                                    <router-link class="btn-repayment-plan" :to="{'path': '/personal/myInstalment/repaymentPlan'}"><span>还款计划</span><i class="iconfont">&#58999;</i></router-link>
                                </div>
                            </div>
                            <div class="each-other-order-wrap clearfix">
                                <div class="content-wrap clearfix">
                                    <div class="left-wrap">
                                        <label class="title">分期订单</label>
                                        <p class="amount">借款金额：<span>¥2000.00元</span></p>
                                    </div>
                                    <p class="right-wrap">期数：3期</p>
                                </div>
                                <div class="actions">
                                    <router-link class="btn-repayment-plan" :to="{'path': '/personal/myInstalment/repaymentPlan'}"><span>还款计划</span><i class="iconfont">&#58999;</i></router-link>
                                </div>
                            </div>
                            <div class="each-other-order-wrap clearfix">
                                <div class="content-wrap clearfix">
                                    <div class="left-wrap">
                                        <label class="title">分期订单</label>
                                        <p class="amount">借款金额：<span>¥2000.00元</span></p>
                                    </div>
                                    <p class="right-wrap">期数：3期</p>
                                </div>
                                <div class="actions">
                                    <router-link class="btn-repayment-plan" :to="{'path': '/personal/myInstalment/repaymentPlan'}"><span>还款计划</span><i class="iconfont">&#58999;</i></router-link>
                                </div>
                            </div>
                            <a href="javascript:void(0);" class="btn-takeup-all" :class="item.showOtherOrder ? 'up': 'down'" @click="closeAll(item, index)"><span>收起所有</span><i></i></a>
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
    .AllIndex {
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

        .notice{
            font-family: PingFangSC-Regular;
            font-size: rem(11px);
            color: #D0021B;
            letter-spacing: 0;
            text-align: left;
            float: left;
            margin-top: rem(13px);
        }

        .actions {
            width: 100%;
            height: rem(30px);
            margin-top: rem(16px);
            .btn{
                position: relative;
                display: block;
                float: right;
                width: rem(104px);
                height: rem(28px);
                line-height: rem(28px);
                border-radius: 5px;
                font-size: 15px;
                text-align: center;
                margin-left: rem(8px);
                border: 1px solid #FF7640;
            }
            .btn-expand-all {
                position: relative;
                display: block;
                float: left;
                text-align: left;
                border: 1px solid #FF7640;
                border-radius: 5px;
                font-size: 12px;
                color: #FF7640;
                padding: rem(6px) rem(10px);
                span {
                    display: block;
                    float: left;
                }
                i {
                    content: " ";
                    display: block;
                    float: left;
                    height: 8px;
                    width: 8px;
                    border-width: 1px 1px 0 0;
                    border-color: #FF7640;
                    border-style: solid;
                    -webkit-transform: matrix(.71,.71,-.71,.71,0,0) rotate(90deg);
                    transform: matrix(.71,.71,-.71,.71,0,0) rotate(90deg);
                    position: relative;
                    top: 50%;
                    margin-top: 1px;
                    margin-left: 6px;
                }
            }
            .btn-recharge {
                background: #FF7640;
                color: #FFFFFF;
            }
            .btn-channel {
                background: #fff;
                color: #FF7640;
                border: 1px solid #FF7640;
            }
            .btn-go {
                background: #D0021B;
                color: #FFFFFF;
                border-color: #D0021B;
            }
            .btn-canceled{
                background: #fff;
                color: #ccc;
                border-color: #eee;
            }
        }

        .other-order {
            width: 100%;
            overflow: hidden;
            max-height: 0;
            transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
            .each-other-order-wrap {
                margin-top: rem(16px);
                width: 100%;
                height: 100%;
                padding-top: rem(16px);
                border-top: 1px solid #eee;
                .content-wrap {
                    height: 100%;
                    .left-wrap {
                        float: left;
                        width: 70%;
                        .title {
                            display: block;
                            font-size: 11px;
                            color: #999999;
                            margin-bottom: 2px;
                        }
                        .amount {
                            font-size: 15px;
                            color: #333333;
                            span {
                                color: #FF7640;;
                            }
                        }
                    }
                    .right-wrap {
                        float: right;
                        width: 30%;
                        margin-top: rem(10px);
                        font-size: 15px;
                        color: #333333;
                        text-align: right;
                    }
                }
                .actions {
                    width: 30%;
                    margin: 0 auto;
                    margin-top: 0.35556rem;
                    .btn-repayment-plan {
                        position: relative;
                        display: block;
                        float: left;
                        border: 1px solid #FF7640;
                        border-radius: 13px;
                        font-size: 12px;
                        color: #FF7640;
                        padding: rem(4px) rem(10px);
                        span {
                            display: block;
                            float: left;
                            margin-right: rem(3px);
                        }
                        i {
                            font-size: 12px;
                        }
                    }
                }
            }
            .btn-takeup-all {
                position: relative;
                display: block;
                float: left;
                text-align: left;
                border: 1px solid #FF7640;
                border-radius: 5px;
                font-size: 12px;
                color: #FF7640;
                padding: rem(6px) rem(10px);
                margin-top: rem(20px);
                span {
                    display: block;
                    float: left;
                }
                i {
                    content: " ";
                    display: block;
                    float: left;
                    height: 8px;
                    width: 8px;
                    border-width: 1px 1px 0 0;
                    border-color: #FF7640;
                    border-style: solid;
                    -webkit-transform: matrix(.71,.71,-.71,.71,0,0) rotate(270deg);
                    transform: matrix(.71,.71,-.71,.71,0,0) rotate(270deg);
                    position: relative;
                    top: 50%;
                    margin-top: 6px;
                    margin-left: 6px;
                }
            }
        }

        .animate {
            max-height: 9999px;
            transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
            transition-delay: 0s;
        }

        .finish-item{
            background-color:#fff;
            tr{
                background-color: #F7F7F7;
                th:first-child{
                    padding-left:10px;
                    text-align:left;
                    span{
                        color: #FF7640;
                    }
                }
                th:last-child{
                    padding-right: 10px; 
                    text-align: right;
                }
            }
        }

        .vux-table{
            margin-top: rem(30px);
            &:after{
                border: 0;
            }
            th{
                font-family: PingFangSC-Regular;
                font-size: rem(13px);
                color: #666666;
                letter-spacing: 0;
                text-align: center;
                &:before{
                    border:0;
                }
            }
            tr{
                font-family: PingFangSC-Regular;
                font-size: rem(15px);
                color: #FF7640;
                letter-spacing: 0;
                text-align: center;
                td{
                    position: inherit;
                    &:before{
                        border:0;
                    }
                    .icon-question{
                        position: absolute;
                        top: rem(13px);
                        right: rem(10px);

                    }
                    div{
                        display: inline-block;
                        top: rem(3px);
                    }
                    .question{
                        position: relative;
                        top: rem(2px);
                        right: 0;
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

    .vux-popover{
        margin-top: rem(15px);
        margin-left:rem(15px);
        border-radius: 5px;
    }
    .popover-content{
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
        font-family: PingFangSC-Medium;
        font-size: rem(11px);
        color: #333333;
        letter-spacing: 0;
        text-align: center;
        padding: rem(10px 15px);
    }
    .vux-popover-arrow-up{
        display: none;
    }
</style>



<script>
    import { Checker, CheckerItem, Badge, Flexbox, FlexboxItem, Scroller, LoadMore, XTable, Popover } from 'vux'
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
            LoadMore,
            XTable,
            Popover
        },
        data () {
            return {
                checkerType: 'applying',
                active: 2,
                onFetching: false,
                showOtherOrder: false,
                btnStatus: 'ENDNODE',
                scrollTop: '0',
                otherOrderHeight: 0,
                items:[{
                    showOtherOrder: false
                },{
                    showOtherOrder: false
                },{
                    showOtherOrder: false
                },{
                    showOtherOrder: false
                },{
                    showOtherOrder: false
                },{
                    showOtherOrder: false
                }]
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
            onScroll (pos){
                this.scrollTop = pos.top;
            },
            openAll (item, index){
                this.items[index].showOtherOrder = !this.items[index].showOtherOrder;
                setTimeout(() => {
                    this.otherOrderHeight = this.$refs.otherOrder[index].offsetHeight;
                    this.$nextTick(() => {
                        this.$refs.scrollerBottom.reset();
                    })
                }, 1000)

                    console.info('this.$refs.flexboxItem === ', this.$refs.flexboxItem);
                    let _top = 0;
                    if(index > 0){
                        _.each(this.$refs.flexboxItem, (item, i)=>{ 
                            if(i >= index) return false;
                            console.info('this.$refs.flexboxItem', this.$refs.flexboxItem);
                            _top = _top + this.$refs.flexboxItem[i].offsetHeight + 8;
                        });
                    }
                    this.$nextTick(() => {
                        this.$refs.scrollerBottom.reset({top: _top});
                    })
                    
            },
            closeAll (item, index){
                let _otherHeight = this.$refs.otherOrder[0].offsetHeight;

                this.items[index].showOtherOrder = !this.items[index].showOtherOrder;
                
                    this.$nextTick(() => {
                        console.info('this.scrollTop - this.otherOrderHeight', this.scrollTop - this.otherOrderHeight);
                        let _top = this.scrollTop - this.otherOrderHeight;
                        if(_top<-0) _top=0;
                        this.$refs.scrollerBottom.reset({top: _top},500,'ease');

                        
                    })
                setTimeout(() => {
                    this.$refs.scrollerBottom.reset();
                }, 501)
            }
		}
    }
</script>