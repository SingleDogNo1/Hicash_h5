<template>
    <div class="forget-password-body">
        <!-- header -->
        <header  class="credit-header">
            <!-- closeBtn -->
            <a class="go-history" href="javascript:history.go(-1);"></a>
            <h1>忘记密码</h1>
        </header>
        <div class="container">
            <div class="forget-password-form">
                <x-input v-model="mobile" class="mobile" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
                <x-input v-model="messageCode" placeholder="请输入短信号码" class="weui-vcode message-code">
                    <x-button slot="right" type="primary" mini @click.native="showPosition('middle')" :time="3000">
                        {{getMessageCodeText}}
                    </x-button>
                </x-input>
                <button class="btn-next" @click="messageLogin('middle')">下一步</button>
            </div>
        </div>
    </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
    .weui-tab__panel {
        padding-bottom: 0 !important;
    }
    .forget-password-body {
        width: 100%;
        height: 100%;
        background-color: #fff;
        .credit-header {
            background: #fff;
            border-bottom: 1px solid #ccc;
            .go-history {
                left: .85rem;
            }
            h1 {
                font-size: .75rem;
                height: 2.2rem;
                line-height: 2.2rem;
                font-weight: normal;
                color: #3f3f3f;
                width: 100%;
                text-align: center;
            }
        }
        .container {
            padding-top: 3.95rem;
            width: 100%;
            .forget-password-form {
                width: 14.3rem;
                margin: 0 auto;
                .mobile {
                    position: relative;
                    height: 1.95rem;
                    border-bottom: 1px solid #DDDDDD;
                    font-size: .7rem;
                    padding: 5px 0 5px 1.35rem;
                    margin-bottom: .5rem;
                    background: url(../assets/images/icon_tel.png) left center no-repeat;
                    background-size: 0.666667rem 0.666667rem;
                }
                .message-code {
                    position: relative;
                    height: 1.95rem;
                    border-bottom: 1px solid #DDDDDD;
                    font-size: .7rem;
                    padding: 5px 0 5px 1.35rem;
                    margin-bottom: .5rem;
                    background: url(../assets/images/icon_message_code.png) left center no-repeat;
                    background-size: 0.666667rem 0.666667rem;
                    .weui-btn_primary {
                        width: 4rem !important;
                        height: 1.45rem !important;
                        padding: 0 !important;
                        background: none;
                        color: #ff7640;
                        border: none !important;
                        font-size: 0.55rem !important;
                    }
                    .weui-btn_primary:after {
                        border: none;
                    }
                }
                .message-code:before {
                    border-top: none !important;
                }
                .btn-next {
                    margin-top: 1.125rem;
                    width: 14.3rem;
                    height: 1.85rem;
                    font-size: 0.75rem;
                    background: #FF7640;
                    color: #fff;
                    border-radius: 5px;
                    margin-bottom: .75rem;
                    border: none;
                }
            }
        }
    }
</style>

<script type="text/javascript">
    import { Tab, TabItem, XInput, XButton, Toast} from 'vux'
    import $ from 'jquery'
    import common from '@/api/common'
    import utils from '@/assets/js/utils'

    export default {
        components: {
            Tab,
            TabItem,
            XInput,
            XButton,
            Toast
        },
        data () {
            return {
                mobile: '',
                messageCode: ''
            }
        },
        ready () {
        },
        methods: {
        },
        mounted: function () {
        }
    }
</script>
