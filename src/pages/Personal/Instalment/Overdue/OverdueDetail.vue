<template>
    <div class="overdue-detail">
        <page-header :title="title" :showBack="showBack" :showBtnClose="showBtnClose" v-if="this.utils.getPlatform() != 'APP'" ></page-header>
        <div class="content" :style="{'padding-top': this.utils.getPlatform() == 'APP' ? 0 : '2.26667rem'}">
            <order-detail></order-detail>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "~bowerComponents/sass-rem/_rem.scss";

    .overdue-detail {
        width: 100%;
        height: 100%;
        .content {
            height: 100%;
        }
    }
</style>

<script>
    import PageHeader from '@/components/PageHeader.vue';
    import OrderDetail from '@/components/OrderDetail.vue';

    export default {
        components: {
            PageHeader,
            OrderDetail
        },
        data () {
            return {
                title: '逾期订单',
				showBtnClose: false,
				showBack: true
            }
        }
    }
</script>
