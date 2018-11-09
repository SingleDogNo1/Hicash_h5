<template>
    <div class="overdue">
        <div class="overdue-content">
            <group>
                <cell :title="title" :link="{path:'/demo'}" :inline-desc='desc'><span slot="value"><p class="amount">654.00元</p><p class="tip">逾期金额</p></span></cell>
            </group>
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
        .weui-cells {
            .weui-cell {
                /deep/ .vux-label {
                    font-size: 15px;
                }
                /deep/ .vux-label-desc {
                    font-size: 13px;
                    color: #999999;
                }
                /deep/ .weui-cell__ft {
                    padding-right: rem(28px); 
                    /deep/ .amount {
                        font-size: 15px;
                        color: #FF7640;
                        margin-bottom: rem(6px);
                    }
                    /deep/ .tip {
                        font-size: 13px;
                        color: #999999;
                    }
                }
            }
        }
    }
</style>


<script>
    import { Cell, Group } from 'vux'
    export default {
        props: {

        },
        components: {
            Cell,
            Group
        },
        data () {
            return {
                title: '嗨秒分期',
                desc: '订单号:21231231321'
            }
        }
    }
</script>
 