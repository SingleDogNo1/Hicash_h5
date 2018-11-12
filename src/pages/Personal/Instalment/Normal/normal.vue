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
                    

                    <flow>
                        <flow-state state="1" title="1111" is-done></flow-state>
                        <flow-line is-done></flow-line>

                        <flow-state state="2" is-done>
                            <span slot="title">2222</span>
                        </flow-state>
                        <flow-line></flow-line>

                        <flow-state state="3" title="3333333"></flow-state>
                        <flow-line></flow-line>

                        <flow-state state="4" title="4444"></flow-state>
                    </flow>


                    <div class="order-bottom">
                        <div class="order-bottom-des left">借款金额：<span>650.00元</span></div>
                        <div class="order-bottom-des right">期数：<span>3期</span></div>
                    </div>
                    
                </div>
            </flexbox-item>
        </flexbox>
    </div>
</template> 

<style lang="scss" scoped>
    @import "~bowerComponents/sass-rem/_rem.scss";
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
   
</style>


<script>
    import { Checker, CheckerItem, Badge, Flexbox, FlexboxItem, Flow, FlowState, FlowLine } from 'vux'

    export default {
        props: {

        },
        components: {
            Checker,
            CheckerItem,
            Badge,
            Flexbox,
            FlexboxItem,
            Flow,
            FlowState,
            FlowLine
        },
        data () {
            return {
                checkerType: 1
            }
        },
		mounted() {
			
		},
		methods: {
            checkerStatus:function(type){
                console.info('type===', type);
                this.checkerType = type;
            }
		}
    }
</script>