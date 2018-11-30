<template>
    <div>
        <div class="checker-wrap" ref="checkerBody">
            <div @click="checkerStatus('applying')"  :class="checkerType == 'applying' ? 'checker-selected' : ''" class="checker-default">
                申请中
                <badge v-if="applyingStatus"></badge>
            </div>
            <div @click="checkerStatus('repay')"  :class="checkerType == 'repay' ? 'checker-selected' : ''" class="checker-default">
                还款中
                <badge v-if="repayStatus"></badge>
            </div>
            <div @click="checkerStatus('end')"  :class="checkerType == 'end' ? 'checker-selected' : ''" class="checker-default">已完成</div>
        </div>
        <scroller v-if="items.length" lock-x :height="isShowBanner ? swiperHeight-bannerADHeight-checkerBodyHeight-8+'px' : swiperHeight-checkerBodyHeight-8+'px'" @on-scroll="onScroll" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
            <flexbox orient="vertical"  class="order-list">
                <!-- 申请中 -->
                <flexbox-item v-if="checkerType == 'applying'"  v-for="(item, index) in items" :key="index">
                    <div class="flex-order-item">
                        <div class="order-top">
                            <div class="order-des">
                                <div class="order-title">{{item.industryName}}</div>
                                <div class="order-num">订单号:{{item.appNo}}</div>
                            </div>
                            <div class="order-date">{{item.createDate}}</div>
                        </div>
                        <!-- success 完成 | wait 等待 | failed 失败 | grep 灰-->
                        <van-steps :active="item.nodeList.length - item.nodeGrepNum - 1" active-color="#FF7640">
                            <van-step  v-for="(step, index) in item.nodeList" :key="index" :class="step.nodeStyle">{{step.nodeName}}</van-step>
                        </van-steps>

                        <div class="order-bottom">
                            <div class="order-bottom-des left">借款金额：<span>{{item.amount}}</span></div>
                            <div class="order-bottom-des right">期数：<span>{{item.period}}期</span></div>
                        </div>

                        <div v-if="item.appStatus === 'REJECTNODE'" class="notice">{{item.rejectMsg}}</div>

                        <div class="actions" v-if="item.appStatus !== 'LOANFAILED' && item.appStatus !== 'LOAN'">
                            <a v-if="item.appStatus === 'REJECTNODE'" :href="item.rejectUrl" class="btn btn-go">立即前往</a>
                            <a v-if="item.appStatus === 'SIGNNODE'" href="javascript:void(0);" @click="sign(item)" class="btn btn-sign">签约</a>
                            <a v-if="item.appStatus === 'NEWNODE' || item.appStatus === 'AUDITNODE' || item.appStatus === 'SIGNNODE'" href="javascript:void(0);" @click="cancelOrder(item, index)" class="btn btn-channel">取消订单</a>
                        </div>
                    </div>
                </flexbox-item>

                <!-- 还款中 -->
                <flexbox-item v-if="checkerType == 'repay'" v-for="(item, index) in items" :key="index">
                    <div class="flex-order-item" ref="flexboxItem">
                        <div class="order-top">
                            <div class="order-des">
                                <div class="order-title">{{item.industryName}}</div>
                                <div class="order-num">订单号:{{item.appNo}}</div>
                            </div>
                            <div class="order-date">{{item.createDate}}</div>
                        </div>
                        
                        <x-table :cell-bordered="false"  :content-bordered="false" style="background-color:#fff;">
                            <thead>
                            <tr style="background-color: #F7F7F7">
                                <th>当期应还金额</th>
                                <th>当期应还时间</th>
                                <th width="100">状态</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td v-html="item.appStatus === 'WITHDRAWALNODE' || item.appStatus === 'WITHDRAWALING' || item.appStatus==='WITHDRAWALSUCCESS'? '金额计算中' : item.amount+'元'"></td>
                                <td>{{item.repayDate}}
                                    <popover placement="bottom"  v-if="item.appStatus==='WITHDRAWALNODE' || item.appStatus==='WITHDRAWALING'  || item.appStatus==='WITHDRAWALSUCCESS'">
                                        <div slot="content" class="popover-content">
                                            放款成功，已经开始计息
                                        </div>
                                        <van-icon class="question" size="14px" name="question" color="#FF7640" />
                                    </popover>
                                </td>
                                <td>{{item.repayStatus}}</td>
                            </tr>
                            </tbody>
                        </x-table>

                        <div class="actions" v-if="item.appStatus !== 'WITHDRAWALING' && item.appStatus !== 'WITHDRAWALSUCCESS'">
                            <a href="javascript:void(0);" class="btn-expand-all" :class="item.showOtherOrder ? 'up': 'down'" @click="openAll(item, index)" v-if="!item.showOtherOrder && item.appStatus==='REPAYNODE'"><span>展开所有</span><i></i></a>
                            <a :href="item.rechargeUrl" class="btn btn-recharge" v-if="item.appStatus==='REPAYNODE'">充值还款</a>
                            <a href="javascript:void(0);" class="btn btn-recharge" @click="withdrawals(item)" v-if="item.appStatus==='WITHDRAWALNODE'">提现</a>
                        </div>

                        <div class="other-order" ref="otherOrder" :class="item.showOtherOrder?'animate':''">
                            <div class="each-other-order-wrap clearfix" v-for="(plan, planIndex) in item.appDetail" :key="planIndex">
                                <div class="content-wrap clearfix">
                                    <div class="left-wrap">
                                        <label class="title">{{plan.title}}</label>
                                        <p class="amount">{{plan.amountName}}：<span>¥{{plan.amount}}元</span></p>
                                    </div>
                                    <p class="right-wrap">期数：{{plan.period}}期</p>
                                </div>
                                <div class="actions">
                                    <router-link class="btn-repayment-plan" :to="{'path': '/personal/myInstalment/repaymentPlan', query:{'appNo': item.appNo, 'type': plan.type}}"><span>还款计划</span><i class="iconfont">&#58999;</i></router-link>
                                </div>
                            </div>
                            <a href="javascript:void(0);" class="btn-takeup-all" :class="item.showOtherOrder ? 'up': 'down'" @click="closeAll(item, index)"><span>收起所有</span><i></i></a>
                        </div>
                    </div>
                </flexbox-item>

                <!-- 已完成 -->
                <flexbox-item v-if="checkerType == 'end'" v-for="(item, index) in items" :key="index">
                    <div class="flex-order-item"  ref="flexboxItem">
                        <div class="order-top">
                            <div class="order-des">
                                <div class="order-title">{{item.industryName}}</div>
                                <div class="order-num">订单号:{{item.appNo}}</div>
                            </div>
                            <div class="order-date">{{item.createDate}}</div>
                        </div>
                        
                        <x-table class="finish-item" :cell-bordered="false"  :content-bordered="false">
                            <thead>
                                <tr>
                                    <th>借款金额：<span>{{item.amount}}</span></th>
                                    <th>期数：{{item.period}}期</th>
                                </tr>
                            </thead> 
                        </x-table>
                        
                        <div v-if="item.appStatus === 'REJECTNODE'" class="notice">{{item.rejectMsg}}</div>

                        <div class="actions">
                            <a href="javascript:void(0);" class="btn-expand-all" :class="item.showOtherOrder ? 'up': 'down'" @click="openAll(item, index)" v-if="!item.showOtherOrder && item.appStatus==='ENDNODE'"><span>展开所有</span><i></i></a>
                            <a href="javascript:void(0);" class="btn btn-channel" v-if="item.appStatus==='ENDNODE'">订单已完成</a>
                            <a href="javascript:void(0);" class="btn btn-canceled" v-if="item.appStatus==='CANCLEED'">订单已取消</a>
                            <a v-if="item.appStatus === 'REJECTNODE'" :href="item.rejectUrl" class="btn btn-go">立即前往</a>
                        </div>

                        <div class="other-order" ref="otherOrder" :class="item.showOtherOrder?'animate':''">
                            <div class="each-other-order-wrap clearfix" v-for="(plan, planIndex) in item.appDetail" :key="planIndex">
                                <div class="content-wrap clearfix">
                                    <div class="left-wrap">
                                        <label class="title">{{plan.title}}</label>
                                        <p class="amount">{{plan.amountName}}：<span>¥{{plan.amount}}元</span></p>
                                    </div>
                                    <p class="right-wrap">期数：{{plan.period}}期</p>
                                </div>
                                <div class="actions">
                                    <router-link class="btn-repayment-plan" :to="{'path': '/personal/myInstalment/repaymentPlan', query:{'appNo': item.appNo, 'type': plan.type}}"><span>还款计划</span><i class="iconfont">&#58999;</i></router-link>
                                </div>
                            </div>
                            
                            <a href="javascript:void(0);" class="btn-takeup-all" :class="item.showOtherOrder ? 'up': 'down'" @click="closeAll(item, index)"><span>收起所有</span><i></i></a>
                        </div>
                    </div>
                </flexbox-item>

                <!-- 数据加载中 -->
                <load-more v-if="listDataloading" tip="数据加载中"></load-more>
            </flexbox>
        </scroller>

        <div class="bg-instalment-empty" v-if="showNoData">
            <p>这里暂时什么都没有</p>
        </div>
        <load-more v-if="!showNoData" tip=""></load-more>
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
                font-size: 15px;
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
                        font-size: 15px;
                        color: #333333;
                        }
                        .order-num{
                            font-family: PingFangSC-Regular;
                            font-size: 11px;
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
                        font-size: 15px;
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
            font-size: 11px;
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
                bottom: inherit;
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
            .btn-recharge, .btn-sign {
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
            margin-top: rem(8px);
            &:after{
                border: 0;
            }
            th{
                font-family: PingFangSC-Regular;
                font-size: 13px;
                color: #666666;
                letter-spacing: 0;
                text-align: center;
                &:before{
                    border:0;
                }
            }
            tr{
                font-family: PingFangSC-Regular;
                font-size: 15px;
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

        .bg-instalment-empty {
            width: 50%;
            height: rem(200px);
            margin: 0 auto;
            margin-top: 40%;
            background: url("../images/bg_instalment_empty.png") center rem(35px) no-repeat;
            background-size: rem(61px) rem(40px);
            p {
                text-align: center;
                color: #999;
                height: rem(200px);
                line-height: rem(200px);
                font-size: 12px;
                margin-top: rem(10px);
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
            font-size: 15px;
        }

        @font-face {
            font-style:normal;font-weight:400;font-family:vant-icon;
        }

        .van-step.failed .van-step__title{
            color: #D0021B !important;
        }
        .van-step__title{
            width: 60px;
            text-align: center;
        }
        .van-step.success .van-step__circle,.van-step.success .van-icon-checked{
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
        .van-step.wait .van-step__circle, .van-step.wait .van-icon-checked{
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
        .van-step.failed .van-step__circle, .van-step.failed .van-icon-checked{
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
        .van-step.grep .van-step__circle-container{
            background-color: transparent;
        }
        .van-step.grep .van-step__circle, .van-step.grep .van-icon-checked{
            display: block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #ccc;
            margin-top: 3px;
            font-size: 16px;
            color: #ccc;
            &:before {
                content: "";
            }
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
        font-size: 11px;
        color: #333333;
        letter-spacing: 0;
        text-align: center;
        padding: rem(10px 15px);
    }
    .vux-popover-arrow-up{
        display: none;
    }
    .weui-dialog__btn_primary{
        color: #FF7640 !important;
    }
</style>



<script>
    import { Checker, CheckerItem, Badge, Flexbox, FlexboxItem, Scroller, LoadMore, XTable, Popover } from 'vux'
    import { Step, Steps, Icon } from 'vant';
    export default {
        props: {
            isShowBanner: {
                type: Boolean,
                default: true
            },
            bannerADHeight:{
                type: Number,
                default: 50
            },
            swiperHeight:{
                type: Number,
                default: 50
            }
        },
        components: {
            Checker,
            CheckerItem,
            Badge,
            Flexbox,
            FlexboxItem,
            Scroller,
            LoadMore,
            XTable,
            Popover,
            [Step.name]:Step,
            [Steps.name]:Steps,
            [Icon.name]:Icon
        },
        data () {
            return {
                active: 2,                  // * 初始化一级 Tag 属性
                checkerType: 'applying',    // * 初始化二级 Tag 属性
                onFetching: false,          // * 给 Scroller 分页加锁
                showOtherOrder: false,      // * 初始化还款计划显示状态
                btnStatus: 'ENDNODE',       // TODO 测试属性，调试API之后删除
                scrollTop: '0',             // * 初始化滚动条位置
                otherOrderHeight: 0,        // * 初始化还款计划高度
                items:[],                   // * 初始化列表数据
                scrollHeight: this.utils.getPlatform() == 'APP' ? '-110px' : '-160px',     // * 初始化列表高度
                pageSize: '20',             // * 设置每页最大数
                pageNo: '1',                // * 初始化当前页
                listDataloading: true,      // * 初始化Loading显示状态 
                showNoData: false,          // * 初始化无数据页面
                applyingStatus: false,      // * 申请中小红点显示状态
                repayStatus: false,          // * 还款中小红点显示状态
                checkerBodyHeight: 0
            }
        },
		mounted() {
            // setTimeout(()=>{
            this.checkerBodyHeight = this.$refs.checkerBody.offsetHeight;
            this.scrollHeight = this.isShowBanner ? this.swiperHeight - this.bannerADHeight - this.$refs.checkerBody.offsetHeight + 'px' : this.swiperHeight - this.$refs.checkerBody.offsetHeight + 'px';
            console.info('this.scrollHeight', this.swiperHeight, this.bannerADHeight, this.$refs.checkerBody.offsetHeight,this.scrollHeight);
            // }, 1000)
            console.info('this.checkerBodyHeight', this.checkerBodyHeight);
            //this.checkerStatus();                         // * 获取默认数据
			// this.$nextTick(() => {
            //     this.$refs.scrollerBottom.reset({top: 0});          // * 初始化scroller的高度
            // })
		},
		methods: {
            /**
             *  ! 监听二级Tag的变化
             *  ! 获取对应数据
             *  ! 初始化状态
             * */
            checkerStatus (type){
                if(this.checkerType !== type){
                    this.items = [];                                // * 初始化数据
                    this.pageNo = '1';                              // * 初始化页码
                    this.checkerType = type || 'applying';          // * 更新当前的Tag
                    this.getListData(this.checkerType);             // * 请求列表数据
                    this.onFetching = false;                        // * 初始化分页锁定状态
                }
            },
            // ! 签约
            sign (item){
                const appNo = item.appNo;
                const applyAmount = item.amount;
                const loanProduct = item.loanProduct;
                const industryCode = item.industryCode;
                this.utils.setCookie("prodetailInfo",applyAmount+":"+loanProduct);
                if(this.utils.getPlatform()=="APP"){
                    window.hicashJSCommunication.onCallApp(JSON.stringify({"type":"h5_sign","industry_code":industryCode,"app_no":appNo}));
                    return false;
                }
                window.location.href=this.config.MWEB_PATH + "newweb/personalCenter/signature.html?comefrom=H5&appNo="+appNo;
            },
            // ! 提现
            withdrawals(item){
                let userName = this.utils.getCookie('userName');
                let postData = new URLSearchParams();
                    postData.append('userName', userName);
                    postData.append('txAmount', item.amount);
                    postData.append('uuid', this.utils.uuid());
                    postData.append('appNo', item.appNo);

                this.common.QueryWithdrawData(postData)
                .then( res => {
                    let _data = res.data;
                    if(typeof data === 'string') _data = JSON.parse(data);

                    if(_data.followUrl && _data.followUrl !== ''){
                        window.location.href = _data.followUrl;
                    }else{
                        window.location.href = MWEB_PATH+"newweb/personalCenter/withdrawalsTransfer.html?txAmount=" + item.amount + '&appNo=' + item.appNo + '&userName=' + userName;
                    }
                })
            },
            // ! 展开还款计划
            openAll (item, index){
                this.items[index].showOtherOrder = !this.items[index].showOtherOrder;
                setTimeout(() => {
                    this.otherOrderHeight = this.$refs.otherOrder[index].offsetHeight;
                    this.$nextTick(() => {
                        this.$refs.scrollerBottom.reset();
                    })
                }, 1000)

                let _top = 0;
                if(index > 0){
                    _.each(this.$refs.flexboxItem, (item, i)=>{ 
                        if(i >= index) return false;
                        _top = _top + this.$refs.flexboxItem[i].offsetHeight + 8;
                    });
                }
                this.$nextTick(() => {
                    this.$refs.scrollerBottom.reset({top: _top});
                })

                let vm = this;
                let userName = this.utils.getCookie('userName');
                let postData = new URLSearchParams();
                    postData.append('userName', userName);
                    postData.append('appNo', item.appNo);
                this.common.orderDetailInfo(postData)
                .then( res => {
                    let data = res.data;
                    if(data.resultCode == '1'){
                        this.otherOrderHeight = this.$refs.otherOrder[index].offsetHeight; 
                        this.$nextTick(() => {
                            this.$refs.scrollerBottom.reset();
                        })
                        let newAppDetail = _.map(data.appDetail, (list)=>{
                            return this.planMapping(list);
                        });
                        this.$set(this.items[index], 'appDetail', newAppDetail);
                    }else{
                        this.$vux.toast.text(data.resultMsg, 'middle')
                    }
                })
            },
            // ! 收起还款计划
            closeAll (item, index){
                let _otherHeight = this.$refs.otherOrder[0].offsetHeight;

                this.items[index].showOtherOrder = !this.items[index].showOtherOrder;
                
                    this.$nextTick(() => {
                        let _top = this.scrollTop - this.otherOrderHeight;
                        if(_top<-0) _top=0;
                        this.$refs.scrollerBottom.reset({top: _top},500,'ease');

                        
                    })
                setTimeout(() => {
                    this.$refs.scrollerBottom.reset();
                }, 501)
            },
            // ! 获取列表数据
            getListData (type){
                console.info('getListData ==== ');
                this.listDataloading = true;
                let userName = this.utils.getCookie('userName');
                let postData = new URLSearchParams();
                    postData.append('userName', userName);
                    postData.append('type', type);
                    postData.append('pageSize', this.pageSize);
                    postData.append('pageNo', this.pageNo);
                this.common.accountOrderList(postData)
                .then( res => {
                    let data = res.data;
                    if(data.resultCode == '1'){
                        data.list.forEach( (val, index) => {
                            val.showOtherOrder = false;
                            if(val.appStatus === 'REPAYNODE'){
                                val.rechargeUrl = this.config.MWEB_PATH + 'newweb/personalCenter/rechargePay.html?appNo='+ val.appNo +'&userName=' + userName
                            }
                            
                            if(val.nodeList){
                                let nodeGrep = _.filter(val.nodeList, function(node){
                                    return node.nodeStyle == "grep"; 
                                });
                                val.nodeGrepNum = nodeGrep.length;
                            }
                            this.items.push(val);
                        });

                        if(data.list.length < 20){
                            this.listDataloading = false;
                        }

                        this.onFetching = false;
                        
                    }else if(data.resultCode == '-1'){
                        this.listDataloading = false;
                        if(!this.items.length){
                            this.showNoData = true;
                        }
                        
                    }else{
                        this.$vux.toast.text(data.resultMsg, 'middle')
                    }
                    if(this.items.length){
                        this.$nextTick(() => {
                            this.$refs.scrollerBottom.reset();
                        })
                    }
                    
                    this.pageNo ++
                    //this.list = data.list;
                })
            },
            // ! 监听滚动事件
            onScrollBottom () {
                if (this.onFetching) {
                    // do nothing
                } else {
                    this.onFetching = true;
                    
                    this.getListData(this.checkerType);
                }
            },
            parentHandleclick: function (headerData) {
                this.applyingStatus = headerData.applyingShowTip ? true : false;
                this.repayStatus = headerData.repayShowTip ? true : false;
                this.checkerStatus();
            },
            // ! 取消订单接口
            CancelAppPayByPad (itemOrder, index){
                // 显示
                this.$vux.loading.show({
                    text: '取消中...'
                })
                let userName = this.utils.getCookie('userName');
                let postData = new URLSearchParams();
                    postData.append('userName', userName);
                    postData.append('cancelType', 'CUST');
                    postData.append('cancelReason', '客户自己取消');
                    postData.append('appPayNo', itemOrder.appNo);
                    postData.append('uuid', this.utils.uuid());
                this.common.CancelAppPayByPad(postData)
                .then( res => {
                    //更新红点已经列表数据状态
                    console.info('更新红点已经列表数据状态');
                    this.$emit('watchChild', true);
                    this.$vux.loading.hide();
                    // this.items.splice(index,1);
                    // if(!this.items.length){
                    //     this.showNoData = true;
                    // }
                    let data = res.data;
                    if(data.resultCode == '1'){
                        this.$vux.toast.show({
                            text: '取消成功',
                            type: 'success',
                            time: 1000
                        })
                    }else{
                        this.$vux.toast.text(data.resultMsg, 'middle')
                    }
                })
            },
            // ! 取消订单对话框
            cancelOrder: function(itemOrder){
                let vm = this;
                this.$vux.confirm.show({
                    title: '提示',
                    content: '确定要取消订单吗？',
                    onCancel () {
                    },
                    onConfirm () {
                        vm.CancelAppPayByPad(itemOrder);
                    }
                })
            },
            // ! 根据订单类型映射 title 和 amountName
            planMapping: function(mapObj){
                switch (mapObj.type) {
                    case 'loanFee':     // * 订单费用
                        mapObj.title = '分期订单';
                        mapObj.amountName = '借款金额';
                        break;
                    case 'infoFee':     // * 会员费
                        mapObj.title = '会员订单';
                        mapObj.amountName = '会员服务费金额';
                        break;
                    case 'mthFee':      // * 综合消费
                        mapObj.title = '消费综合订单';
                        mapObj.amountName = '消费综合费金额';    
                            break;
                    case 'addFee':      // * 保费
                        mapObj.title = '保费订单';
                        mapObj.amountName = '保费金额';    
                            break;
                }
                return mapObj;
            },
            onScroll(pos){
                console.info('top', pos.top);
                this.scrollTop = pos.top;
            }
        },
        watch: {
			isShowBanner: function (val, oldVal) {
                this.isShowBanner = val;
                this.$nextTick(() => {
                    const top = this.scrollTop - 70 <= 0 ? 0 : this.scrollTop - 70;
                    this.$refs.scrollerBottom.reset({top: top});       
                })
			}
		}
    }
</script>