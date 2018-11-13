<template>
    <div class="repayment-plan">
        <page-header :title="title" :showBack="showBack" :showBtnClose="showBtnClose"></page-header>
            <div class="content">
            <section class="detail-wrap">
                <p class="title">分期订单</p>
                <div class="detail-list">
                    <ol>
                        <li>期数</li>
                        <li>还款时间</li>
                        <li>应还金额</li>
                        <li>状态</li>
                    </ol>
                    <ul>
                        <li>1期</li>
                        <li>2018.11.23</li>
                        <li>¥667.00</li>
                        <li>待还</li>
                    </ul>
                    <ul>
                        <li>1期</li>
                        <li>2018.11.23</li>
                        <li>¥667.00</li>
                        <li>待还</li>
                    </ul>
                    <ul>
                        <li>1期</li>
                        <li>2018.11.23</li>
                        <li>¥667.00</li>
                        <li>待还</li>
                    </ul>
                    <ul>
                        <li>1期</li>
                        <li>2018.11.23</li>
                        <li>¥667.00</li>
                        <li>待还</li>
                    </ul>
                    <ul>
                        <li>1期</li>
                        <li>2018.11.23</li>
                        <li>¥667.00</li>
                        <li>待还</li>
                    </ul>
                    <ul>
                        <li>1期</li>
                        <li>2018.11.23</li>
                        <li>¥667.00</li>
                        <li>待还</li>
                    </ul>
                    <ul>
                        <li>1期</li>
                        <li>2018.11.23</li>
                        <li>¥667.00</li>
                        <li>待还</li>
                    </ul>
                    <ul>
                        <li>1期</li>
                        <li>2018.11.23</li>
                        <li>¥667.00</li>
                        <li>待还</li>
                    </ul>
                    <ul>
                        <li>1期</li>
                        <li>2018.11.23</li>
                        <li>¥667.00</li>
                        <li>待还</li>
                    </ul>
                    <ul>
                        <li>1期</li>
                        <li>2018.11.23</li>
                        <li>¥667.00</li>
                        <li>待还</li>
                    </ul>
                    <ul>
                        <li>1期</li>
                        <li>2018.11.23</li>
                        <li>¥667.00</li>
                        <li>待还</li>
                    </ul>
                    <ul>
                        <li>1期</li>
                        <li>2018.11.23</li>
                        <li>¥667.00</li>
                        <li>待还</li>
                    </ul>
                    <ul>
                        <li>1期</li>
                        <li>2018.11.23</li>
                        <li>¥667.00</li>
                        <li>待还</li>
                    </ul>
                    <ul>
                        <li>1期</li>
                        <li>2018.11.23</li>
                        <li>¥667.00</li>
                        <li>待还</li>
                    </ul>
                    <ul>
                        <li>1期</li>
                        <li>2018.11.23</li>
                        <li>¥667.00</li>
                        <li>待还</li>
                    </ul>
                </div>
            </section>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "~bowerComponents/sass-rem/_rem.scss";
    
    .repayment-plan {
        width: 100%;
        height: 100%;
        .content {
            height: 100%;
            padding-top: rem(51px);
            .detail-wrap {
                height: 100%;
                margin-top: rem(8px);
                background: #fff;
                padding: rem(16px); 
                .title {
                    font-size: 17px;
                    color: #333333;
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
                            width: 25%;
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
                            width: 25%;
                            height: 100%;
                            line-height: rem(36px);
                            float: left;
                            color: #666;
                            font-size: 13px;
                            text-align: center;
                        }
                        li:last-child {
                            color: #FF7640;
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
                title: '还款计划',
				showBtnClose: false,
				showBack: true
            }
        }
    }
</script>
