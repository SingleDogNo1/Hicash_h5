<template>
    <div class="overdue">
        <div class="overdue-content">
            <group v-if="currentType === 'default'">
                <cell :title="title" :link="{path:'/personal/myInstalment/overdueDetail'}" :inline-desc='desc'><slot name="value"><p class="amount">654.00元</p><p class="tip">逾期金额{{currentType}}</p></slot></cell>
                <cell :title="title" :link="{path:'/personal/myInstalment/overdueDetail'}" :inline-desc='desc'><slot name="value"><p class="amount">654.00元</p><p class="tip">逾期金额</p></slot></cell>
                <cell :title="title" :link="{path:'/personal/myInstalment/overdueDetail'}" :inline-desc='desc'><slot name="value"><p class="amount">654.00元</p><p class="tip">逾期金额</p></slot></cell>
                <cell :title="title" :link="{path:'/personal/myInstalment/overdueDetail'}" :inline-desc='desc'><slot name="value"><p class="amount">654.00元</p><p class="tip">逾期金额</p></slot></cell>
            </group>

            <!-- <checklist :options="inlineDescList" v-model="inlineDescListValue" @on-change="change">
            </checklist> -->
            <group v-if="currentType === 'batchRepayment'">
                <checker v-model="currentValue" type="checkbox" default-item-class="default-item" selected-item-class="item-selected" @on-change="change">
                    <checker-item :value="item" v-for="(item, index) in list" :key="index">
                        <cell is-link :title="title" :inline-desc='desc'>
                            <i slot="icon"></i>
                            <slot name="value"><p class="amount">654.00元</p><p class="tip">逾期金额</p></slot></cell>
                    </checker-item>
                </checker>
            </group>
            <!--<button class="btn-recharge">充值还款</button>-->
        </div>
    </div>
</template> 

<style lang="scss" scoped>
    @import "~bowerComponents/sass-rem/_rem.scss";
    .overdue-content {
        width: 100%;
        height: 100%;
        margin-top: rem(8px);
        background: #fff;
        /deep/ .weui-cells {
            margin-top: 0;
            /deep/ .weui-cell {
                /deep/ .vux-label {
                    font-size: 15px;
                }
                /deep/ .vux-label-desc {
                    font-size: 13px;
                    color: #999999;
                }
                /deep/ .weui-cell__ft {
                    padding-right: rem(26px); 
                    /deep/ .amount {
                        font-size: 15px;
                        color: #FF7640;
                        margin-top: rem(2px);
                        margin-bottom: rem(4px);
                    }
                    /deep/ .tip {
                        font-size: 13px;
                        color: #999999;
                    }
                }
            }
        }
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
                    /deep/ .vux-label {
                        font-size: 15px;
                    }
                    /deep/ .vux-label-desc {
                        font-size: 13px;
                        color: #999999;
                    }
                    /deep/ .weui-cell__ft {
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
            .item-selected {
                background: rgba(255,118,64,0.10);
                i:before {
                    content: '\EA06';
                    color: #FF7640;
                }
            }
        }
    }
</style>


<script>
    import PageFooter from '@/components/PageFooter.vue'
    import { Cell, Group, Checker, CheckerItem, CheckIcon } from 'vux'

    export default {
        props: {
            value: String,
            currentType: String
        },
        components: {
            PageFooter,
            Cell,
            Group,
            Checker,
            CheckerItem,
            CheckIcon
        },
        data () {
            return {
                title: '嗨秒分期',
                desc: '订单号:21231231321',
                currentValue: [],
                list: [{
                    key: '1',
                    value: 'A'
                }, {
                    key: '2',
                    value: 'B'
                }, {
                    key: '3',
                    value: 'C'
                }, {
                    key: '4',
                    value: 'C'
                }, {
                    key: '5',
                    value: 'C'
                }, {
                    key: '6',
                    value: 'C'
                }, {
                    key: '7',
                    value: 'C'
                }, {
                    key: '8',
                    value: 'C'
                }, {
                    key: '9',
                    value: 'C'
                }]
            }
        },
        methods: {
            change: function () {
                this.$emit('selectedItems', this.currentValue);
            }
        },
        mounted () {
            console.log('this.currentType===', this.currentType)
        }
    }
</script>
 