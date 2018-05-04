<template>
    <div class="register-body">
        <!-- header -->
        <header  class="login-header">
            <a class="go-back"  href="JavaScript:history.back(-1)"></a>
            <router-link class="go-to-register" :to="{name: 'Login'}">
                   登录
            </router-link>
        </header>
        <!-- header -->
        <div class="user-login">
            <h2></h2>
        </div>
        <div class="register-wrap">
            <div class="register-form" >
                <x-input v-model="mobile" class="mobile" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" :max="11"></x-input>
                <x-input v-model="imgCode" class="img-code" placeholder="请输入图形验证码" :max="4">
                    <img slot="right-full-height" :src="authPic" @click="change">
                </x-input>
                <x-input v-model="messageCode" placeholder="请输入短信号码" class="weui-vcode message-code" :max="4">
                    <x-button slot="right" type="primary" mini @click.native="showPosition('middle')">
                    {{getMessageCodeText}}</x-button>
                </x-input>
                <x-input v-model="password" class="password" name="password" placeholder="请输入密码" type="password"></x-input>
                <toast v-model="showPositionValue" type="text" :time="3000" is-show-mask :position="position">{{errorMsg}}</toast>
                <button class="btn-login" @click="messageLogin('middle')">注册</button>
                <router-link class="go-to-forget-pwd" :to="{name: 'ForgetPassword'}">
                    忘记密码?
                </router-link>
            </div>
        </div>
    </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
    .weui-tab__panel{
        padding-bottom: 0 !important;
    }
    .register-body {
        height: auto;
        background: url(../assets/images/bg_user.png) 0 0 no-repeat;
        background-size: cover;
        .login-header {
            background: none;
            border: none;
            position: relative;
            .go-back {
                left: .85rem;
            }
            .go-back:before {
                font-family: "iconfont";
                position: absolute;
                content: "\ed72";
                top: 50%;
                left: 50%;
                font-size: 1.25rem;
                color: #fff;
                -webkit-transform: translate(-50%,-50%);
                -moz-transform: translate(-50%,-50%);
                -ms-transform: translate(-50%,-50%);
                -o-transform: translate(-50%,-50%);
                transform: translate(-50%,-50%);
            }
            .go-to-register {
                font-size: 0.8rem;
                float: right;
                height: 2.2rem;
                line-height: 2.2rem;
                color: #fff;
                margin-right: .85rem;
            }
        }
        .user-login {
            h2 {
                margin: .5rem auto 0;
                width: 4.65rem;
                height: 1.8rem;
                background: url(../assets/images/logo_user.png) 0 0 no-repeat;
                background-size: cover;
            }
        }
        .register-wrap {
            width: 14.35rem;
            margin: 0 auto;
            padding: 3.4rem 0;
            .register-form {
                width: 11.775rem;
                margin: 1rem auto 0;
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
                .img-code {
                    position: relative;
                    height: 1.95rem;
                    border-bottom: 1px solid #DDDDDD;
                    font-size: .7rem;
                    padding: 5px 0 5px 1.35rem;
                    margin-bottom: .5rem;
                    background: url(../assets/images/icon_img_code.png) left center no-repeat;
                    background-size: 0.666667rem 0.666667rem;
                    .vux-x-input-right-full {
                        img {
                            width: 4rem;
                        }
                    }
                }
                .img-code:before {
                    border-top: none !important;
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
                        background-color: #FF7640 !important;
                        border: none !important;
                        font-size: .65rem !important;
                    }
                }
                .message-code:before {
                    border-top: none !important;
                }
                .password {
                    position: relative;
                    height: 1.95rem;
                    border-bottom: 1px solid #DDDDDD;
                    font-size: .7rem;
                    padding: 5px 0 5px 1.35rem;
                    margin-bottom: .5rem;
                    background: url(../assets/images/icon_password.png) left center no-repeat;
                    background-size: 0.666667rem 0.666667rem;
                }
                .password:before {
                    border-top: none !important;
                }
                .btn-login {
                    display: block;
                    width: 11rem;
                    height: 2.375rem;
                    margin: 1.25rem auto;
                    font-size: 0.75rem;
                    background: #FF7640;
                    color: #fff;
                    border-radius: 5px;
                    border: none;
                }
                .go-to-forget-pwd {
                    display: block;
                    color: #C45930;
                    font-size: .7rem;
                    text-align: center;
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
