<template>
    <x-header :left-options="{backText: '', showBack: showBack}">{{title}}<a class="btn-close" slot="right" v-if="showBtnClose"></a></x-header>
</template> 

<style lang="scss" scoped>
    .vux-header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: #fff;
        z-index: 100;
        /deep/ .vux-header-left {
            /deep/ .left-arrow::before {
                border: 1px solid #333;
                content: "";
                position: absolute;
                width: 12px;
                height: 12px;
                border-width: 1px 0 0 1px;
                -webkit-transform: rotate(315deg);
                transform: rotate(315deg);
                top: 8px;
                left: 7px;
            }
        }
        /deep/ .vux-header-title {
            color: #333;
        }
        .btn-close:before {
            font-family: "iconfont";
            position: absolute;
            content: "\e6a0";
            top: .444444rem /* 10/22.5 */;
            right: 0;
            font-size: 0.85rem;
            color: #3f3f3f;
            -webkit-transform: translate(-50%,-50%);
            -moz-transform: translate(-50%,-50%);
            -ms-transform: translate(-50%,-50%);
            -o-transform: translate(-50%,-50%);
            transform: translate(-50%,-50%);
        }
    }
</style>


<script>

    import { XHeader } from 'vux'
    export default {
        props: {
            title: '',
            showBack: Boolean,
            showBtnClose: Boolean
        },
        components: {
            XHeader
        },
        data () {
            return {
            }
        }
    }
</script>
 