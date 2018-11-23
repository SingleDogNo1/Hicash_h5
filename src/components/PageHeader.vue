<template>
    <x-header :left-options="{backText: '', showBack: showBack, preventGoBack: preventGoBack}" @on-click-back="jump">{{title}}<a class="btn-close" slot="right" v-if="showBtnClose"></a></x-header>
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
            /deep/ .left-arrow:before {
                border-left: 1px solid #333;
                border-top: 1px solid #333;
            }
        }
        /deep/ .vux-header-title {
            height: 1.955556rem /* 44/22.5 */;
            line-height: 1.955556rem /* 44/22.5 */;
            color: #333;
        }
        /deep/ .vux-header-right {
            right:　.444444rem /* 10/22.5 */;
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
            title: String,
            showBack: Boolean,
            showBtnClose: Boolean,
            jumpRouteName: String
        },
        components: {
            XHeader
        },
        data () {
            return {
                preventGoBack: false
            }
        },
        methods: {
            jump: function () {
                if(this.jumpRouteName) {
                    this.$router.push({name: this.jumpRouteName});
                }
            }
        },
        mounted () {
            this.preventGoBack = this.jumpRouteName ? true : false;
        }
    }
</script>
 