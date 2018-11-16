<template>
    <div class="overdue">
        <scroller v-if="overdueList.length > 0" lock-x :height="scrollHeight" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
            <div class="overdue-content">
                <group v-if="currentType === 'default'" class="default-group">
                    <cell v-for="(item, index) in overdueList" :key="index" :title="item.industryName" :link="{path:'/personal/myInstalment/overdueDetail', query: {'appNo': item.value, 'createDate': item.createDate, 'amount': item.amount, 'repayDate': item.repayDate, 'repayStatus': item,repayStatus}}" :inline-desc='item.appNo'><slot name="value" class="amont-wrap"><p class="amount">{{item.amountStr}}元</p><p class="tip">逾期金额</p></slot></cell>
                </group>

                <!-- <checklist :options="inlineDescList" v-model="inlineDescListValue" @on-change="change">
                </checklist> -->
                <group v-if="currentType === 'batchRepayment'" class="repaymen-group">
                    <checker v-model="currentValue" type="checkbox" default-item-class="default-item" selected-item-class="item-selected" @on-change="change">
                        <checker-item :value="item" v-for="(item, index) in overdueList" :key="index">
                            <cell :is-link="false" :title="item.industryName" :inline-desc='item.appNo'>
                                <i slot="icon"></i>
                                <slot name="value"><p class="amount">{{item.amountStr}}元</p><p class="tip">逾期金额</p></slot></cell>
                        </checker-item>
                    </checker>
                </group>
                <!--<button class="btn-recharge">充值还款</button>-->
            </div>
        </scroller>
        <div class="bg-instalment-empty" v-if="overdueList.length === 0">
            <p>这里暂时什么都没有</p>
        </div>
    </div>
</template> 

<style lang="scss" scoped>
    @import "~bowerComponents/sass-rem/_rem.scss";

    .overdue-content {
        width: 100%;
        height: 100%;
        margin-top: rem(8px);
        .default-group {
            /deep/ .weui-cells {
                margin-top: 0;
                .weui-cell {
                    padding: rem(10px) rem(20px);
                    .vux-cell-primary {
                        /deep/ .vux-label {
                            font-size: 15px;
                        }
                        /deep/ .vux-label-desc {
                            font-size: 13px;
                            color: #999999;
                        }
                    }
                    .weui-cell__ft {
                        padding-right: rem(26px); 
                        .amount {
                            font-size: 15px;
                            color: #FF7640;
                            margin-top: rem(2px);
                            margin-bottom: rem(4px);
                        }
                        .tip {
                            font-size: 13px;
                            color: #999999;
                        }
                    }
                }
            }
        }
        .repaymen-group {
            /deep/ .weui-cells{
                margin-top: 0;
                margin-bottom: rem(50px);
                .vux-checker-box {
                    .vux-checker-item {
                        position: relative;
                        width: 100%;
                        i {
                            margin-right: 13px;
                            display: inline-block;
                            vertical-align: middle;
                            font: normal normal normal 14px/1 "weui";
                            font-size: inherit;
                            text-rendering: auto;
                            -webkit-font-smoothing: antialiased;
                        }
                        i:before {
                            content: '\EA01';
                            color: #C9C9C9;
                            font-size: 23px;
                            display: block;
                        }
                        .weui-cell {
                            padding: 10px rem(16px);
                            .vux-cell-primary {
                                /deep/ .vux-label {
                                    font-size: 15px;
                                }
                                /deep/ .vux-label-desc {
                                    font-size: 13px;
                                    color: #999999;
                                }
                            }
                            .weui-cell__ft {
                                padding-right: rem(2px); 
                                .amount {
                                    font-size: 15px;
                                    color: #FF7640;
                                    margin-top: rem(2px);
                                    margin-bottom: rem(4px);
                                }
                                .tip {
                                    font-size: 13px;
                                    color: #999999;
                                }
                            }
                            /deep/ .weui-cell__ft:after {
                                display: none;
                            }
                        }
                    }
                    .vux-checker-item:before {
                        content: " ";
                        position: absolute;
                        left: 15px;
                        top: 0;
                        right: 0;
                        height: 1px;
                        border-top: 1px solid #D9D9D9;
                        color: #D9D9D9;
                        -webkit-transform-origin: 0 0;
                        transform-origin: 0 0;
                        -webkit-transform: scaleY(0.5);
                        transform: scaleY(0.5);
                    }
                    .vux-checker-item:last-child {
                        //margin-bottom: rem(20px);
                    }
                    .item-selected {
                        background: rgba(255,118,64,0.10);
                        i:before {
                            content: '\EA06';
                            color: #FF7640;
                        }
                    }
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
</style>


<script>
    import PageFooter from '@/components/PageFooter.vue'
    import { Cell, Group, Checker, CheckerItem, CheckIcon, Scroller, LoadMore } from 'vux'

    export default {
        props: {
            value: {
                type: String,
                default: ''
            },
            currentType: {
                type: String,
                default: ''
            },
            isShowBanner: {
                type: Boolean,
                default: true
            }
        },
        components: {
            PageFooter,
            Cell,
            Group,
            Checker,
            CheckerItem,
            CheckIcon,
            Scroller,
            LoadMore
        },
        data () {
            return {
                title: '嗨秒分期',
                desc: '订单号:21231231321',
                currentValue: [],
                scrollHeight: '-200px',
                maxPage: '20',
                curNum: '1',
                overdueList: []
            }
        },
        methods: {
            change: function () {
                this.$emit('selectedItems', this.currentValue);
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
            }
        },
        watch: {
            isShowBanner: function (val, oldVal) {
                this.isShowBanner = val;
                this.scrollHeight = this.isShowBanner ? '-200px' : '-150px';
                if(!this.isShowBanner) {
                    this.$nextTick(() => {
                        this.$refs.scrollerBottom.reset({top: 0})
                    })
                }
            }
        },
        mounted () {
             const list = [{
                    'appNo': '21231231321',
                    'industryCode': 'MDFQ',
                    'industryName': '嗨秒分期',
                    'createDate': '2017-07-19',
                    'amount': '651.01',
                    'period': '3',
                    'repayDate': '2017-07-19',
                    'repayStatus': 'SSS'
                },
                {
                    'appNo': '21231231322',
                    'industryCode': 'MDFQ',
                    'industryName': '嗨秒分期',
                    'createDate': '2017-07-19',
                    'amount': '652.02',
                    'period': '3',
                    'repayDate': '2017-07-19',
                    'repayStatus': 'SSS'
                },
                {
                    'appNo': '21231231323',
                    'industryCode': 'MDFQ',
                    'industryName': '嗨秒分期',
                    'createDate': '2017-07-19',
                    'amount': '653.03',
                    'period': '3',
                    'repayDate': '2017-07-19',
                    'repayStatus': 'SSS'
                },
                {
                    'appNo': '21231231324',
                    'industryCode': 'MDFQ',
                    'industryName': '嗨秒分期',
                    'createDate': '2017-07-19',
                    'amount': '654.06',
                    'period': '3',
                    'repayDate': '2017-07-19',
                    'repayStatus': 'SSS'
                },
                {
                    'appNo': '21231231325',
                    'industryCode': 'MDFQ',
                    'industryName': '嗨秒分期',
                    'createDate': '2017-07-19',
                    'amount': '655.05',
                    'period': '3',
                    'repayDate': '2017-07-19',
                    'repayStatus': 'SSS'
                }]
                list.forEach( (val, index) => {
                    val.key = index + 1;
                    val.value = val.appNo;
                    val.amountStr = val.amount;
                    val.amount = Number(val.amount);
                    val.appNo = '订单号：' + val.appNo;
                    this.overdueList.push(val);
                });

            let userName = this.utils.getCookie('userName');
            let postData = new URLSearchParams();
                postData.append('userName', userName);
                postData.append('type', 'overdue');
                postData.append('maxPage', this.maxPage);
                postData.append('curNum', this.curNum);
            this.common.accountOrderList(postData)
            .then( res => {
                let data = res.data;
                const list = [{
                    'appNo': '21231231321',
                    'industryCode': 'MDFQ',
                    'industryName': '嗨秒分期',
                    'createDate': '2017-07-19',
                    'amount': '654.00',
                    'period': '3',
                    'repayDate': '2017-07-19',
                    'repayStatus': 'SSS'
                },
                {
                    'appNo': '21231231321',
                    'industryCode': 'MDFQ',
                    'industryName': '嗨秒分期',
                    'createDate': '2017-07-19',
                    'amount': '654.00',
                    'period': '3',
                    'repayDate': '2017-07-19',
                    'repayStatus': 'SSS'
                },
                {
                    'appNo': '21231231321',
                    'industryCode': 'MDFQ',
                    'industryName': '嗨秒分期',
                    'createDate': '2017-07-19',
                    'amount': '654.00',
                    'period': '3',
                    'repayDate': '2017-07-19',
                    'repayStatus': 'SSS'
                },
                {
                    'appNo': '21231231321',
                    'industryCode': 'MDFQ',
                    'industryName': '嗨秒分期',
                    'createDate': '2017-07-19',
                    'amount': '654.00',
                    'period': '3',
                    'repayDate': '2017-07-19',
                    'repayStatus': 'SSS'
                },
                {
                    'appNo': '21231231321',
                    'industryCode': 'MDFQ',
                    'industryName': '嗨秒分期',
                    'createDate': '2017-07-19',
                    'amount': '654.00',
                    'period': '3',
                    'repayDate': '2017-07-19',
                    'repayStatus': 'SSS'
                }]
                list.forEach( (val, index) => {
                    val.key = index + 1;
                    val.value = val.appNo;
                    val.amountStr = val.amount;
                    val.amount = Number(val.amount);
                    val.appNo = '订单号：' + val.appNo;
                    this.overdueList.push(val);
                });
                //this.list = data.list;
            })
        }
    }
</script>
 