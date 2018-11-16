<template>
    <div>
        <section class="detail-wrap">
            <div class="content-wrap">
                <div class="left-wrap">
                    <label class="title">嗨秒分期</label>
                    <p class="order-num">订单号:21231231321</p>
                </div>
                <p class="right-wrap">2017-07-19</p>
            </div>

            <div class="detail-list">
                <ol>
                    <li>逾期应还金额</li>
                    <li>逾期应还时间</li>
                    <li>状态</li>
                </ol>
                <ul>
                    <li>650.00元</li>
                    <li>2018.10.21</li>
                    <li>逾期立即还款</li>
                </ul>
            </div>

            <div class="actions">
                <a href="javascript:void(0);" class="btn-expand-all" :class="showOtherOrder ? 'up': 'down'" @click="expandAll" v-if="!showOtherOrder"><span>展开所有</span><i></i></a>
                <a href="javascript:void(0);" class="btn-recharge">充值还款</a>
            </div>

            <div class="other-order" :class="showOtherOrder?'animate':''">
                <div class="each-other-order-wrap clearfix" v-for="(item, index) in appDetail" :key="index">
                    <div class="content-wrap clearfix">
                        <div class="left-wrap">
                            <label class="title">{{item.title}}</label>
                            <p class="amount">{{item.amountName}}：<span>¥{{item.amount}}元</span></p>
                        </div>
                        <p class="right-wrap">期数：{{item.period}}期</p>
                    </div>
                    <div class="actions">
                        <router-link class="btn-repayment-plan" :to="{'path': '/personal/myInstalment/repaymentPlan', query:{'appNo': appNo, 'type': item.type}}"><span>还款计划</span><i class="iconfont">&#58999;</i></router-link>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
    @import "~bowerComponents/sass-rem/_rem.scss";

    .detail-wrap {
        height: 100%;
        margin-top: rem(8px);
        background: #fff;
        padding: rem(16px); 
        .content-wrap {
            width: 100%;
            height: rem(37px);
            .left-wrap {
                float: left;
                width: 70%;
                .title {
                    display: block;
                    font-size: 15px;
                    margin-bottom: 2px;
                }
                .order-num {
                    font-size: 11px;
                    color: #999999;
                }
            }
            .right-wrap {
                float: right;
                width: 30%;
                margin-top: rem(10px);
                font-size: 13px;
                color: #999999;
                text-align: right;
            }
        }
        .detail-list {
            margin-top: rem(16px);
            ol {
                width: 100%;
                height: rem(36px);
                background: #F4F4F4;
                border-radius: 5px; 
                list-style: none;
                li {
                    width: 33%;
                    height: 100%;
                    line-height: rem(36px); 
                    float: left;
                    font-size: 13px;
                    color: #666666;
                    text-align: center;
                }
            }
            ul {
                width: 100%;
                height: rem(36px);
                li {
                    width: 33%;
                    height: 100%;
                    line-height: rem(36px);
                    float: left;
                    font-size: 15px;
                    color: #FF7640;
                    text-align: center;
                }
            }
        }
        .actions {
            width: 100%;
            height: rem(30px);
            margin-top: rem(8px);
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
                display: block;
                float: right;
                width: rem(106px);
                height: rem(30px);
                line-height: rem(30px);
                background: #FF7640;
                border-radius: 5px;
                font-size: 15px;
                color: #FFFFFF;
                text-align: center;
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
                        padding: rem(4px) rem(8px) rem(4px) rem(10px);
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
    }
</style>

<script>
    export default {
        data () {
            return {
                showOtherOrder: false,
                appDetail: [],
                appNo: ''
            }
        },
        methods: {
            expandAll: function () {
                this.showOtherOrder = !this.showOtherOrder;
                let appDetail = [
                    {
                        "title": "分期订单", 
                        "amountName": "借款金额", 
                        "amount": "2000.00", 
                        "period": "3",
                        "type": "loanFee"
                    },
                    {
                        "title": "会员订单", 
                        "amountName": "会员服务费金额", 
                        "amount": "84.00", 
                        "period": "3",
                        "type": "infoFee"
                    },
                    {
                        "title": "消费综合订单", 
                        "amountName": "消费综合费金额", 
                        "amount": "36.00", 
                        "period": "3",
                        "type": "mthFee"
                    }
                ]
                this.appDetail = appDetail;
                let userName = this.utils.getCookie('userName');
                let appNo = this.$route.query.appNo;
                this.appNo = appNo;
                let postData = new URLSearchParams();
                    postData.append('userName', userName);
                    postData.append('appNo', appNo);
                this.common.orderDetailInfo(postData)
                    .then( res => {
                        let data = res.data;
                        this.appDetail = data.appDetail;
                    })
            }
        }
    }
</script>

