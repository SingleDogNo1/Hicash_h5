<template>
    <div class="login-body">
        <!-- header -->
        <header  class="login-header">
            <a class="go-back"  href="JavaScript:history.back(-1)"></a>
            <a class="go-to-register" href="javascript:">注册</a>
        </header>
        <!-- header -->
        <div class="user-login">
            <h2></h2>
        </div>
        <div class="user-login-wrap">
            <tab :line-width="1" :custom-bar-width="getBarWidth">
                <tab-item selected @on-item-click="onItemClick">短信登录</tab-item>
                <tab-item @on-item-click="onItemClick">密码登录</tab-item>
            </tab>
            <div class="message-login-form" v-if="type === 'message'">
                <x-input v-model="mobile" class="mobile" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
                <x-input v-model="imgCode" class="img-code" placeholder="请输入图形验证码">
                    <img slot="right-full-height" :src="authPic" @click="change">
                </x-input>
                <x-input v-model="messageCode" placeholder="请输入短信号码" class="weui-vcode message-code">
                    <x-button slot="right" type="primary" mini @click.native="showPosition('middle')" :time="3000">
                    {{getMessageCodeText}}</x-button>
                </x-input>
                <toast v-model="showPositionValue" type="text" :time="800" is-show-mask :position="position">{{errorMsg}}</toast>
                <button class="btn-login" @click="messageLogin('middle')">登录</button>
                <a href="#" class="go-to-forget-pwd">忘记密码?</a>
            </div>
            <div class="message-login-form" v-if="type === 'password'">
                <x-input class="mobile" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
                <x-input class="password" name="password" placeholder="请输入密码" type="password"></x-input>
                <button class="btn-login" @click="passwordLogin">登录</button>
                <a href="#" class="go-to-forget-pwd">忘记密码?</a>
            </div>
        </div>
    </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
    .weui-tab__panel{
        padding-bottom: 0 !important;
    }
    .login-body {
        height: auto;
        background: url(../assets/images/bg_user.png) 0 0 no-repeat;
        background-size: cover;
        .login-header {
            width: 100%;
            height: 2.2rem;
            background: #FF7640;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 99;
            background: none;
            border: none;
            position: relative;
            .go-back {
                width: 1.8rem;
                height: 1.8rem;
                position: absolute;
                top: 50%;
                left: .85rem;
                -webkit-transform: translate(0,-50%);
                -moz-transform: translate(0,-50%);
                -ms-transform: translate(0,-50%);
                -o-transform: translate(0,-50%);
                transform: translate(0,-50%);
                z-index: 999;
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
        .user-login-wrap {
            width: 14.35rem;
            margin: 0 auto;
            padding: 3.4rem 0;
            .vux-tab-container {
                height: 1.8rem !important;
                border-radius: 10px 10px 0 0 !important;
                .vux-tab {
                    height: 1.8rem !important;
                    background-color: #FFEEEA !important;
                    .vux-tab-item {
                        height: 1.8rem !important;
                        line-height: 1.8rem !important;
                        font-size: .8rem !important;
                        color: #999;
                    }
                    .vux-tab-selected {
                        color: #C04E22;
                    }
                    .vux-tab-ink-bar-transition-backward, .vux-tab-ink-bar-transition-forward{
                        height: 2px !important;
                        .vux-tab-bar-inner {
                            background-color: #C04E22 !important;
                        }
                    }
                }
            }
            .message-login-form {
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
                type: '',
                authPic: '',
                authId: '',
                mobile: '',
                imgCode: '',
                messageCode: '',
                position: 'default',
                showPositionValue: false,
                errorMsg: '',
                getMessageCodeText: '获取验证码',
                getBarWidth: function (index) {
                    return '4rem'
                }
            }
        },
        ready () {
        },
        methods: {
            onItemClick (index) {
                index === 0 ? this.type = 'message' : this.type = 'password'
            },
            showPosition (position) {
                var _this = this;
                var errorMsg="";
                if (_this.mobile == "") {
                    errorMsg="请输入您的手机号";
                } else if (!utils.checkMobile(_this.mobile)) {
                    errorMsg="手机号码格式错误";
                }else if (_this.imgCode == "") {
                    errorMsg="请输入图形验证码";
                }
                if(errorMsg!="") {
                    this.position = position;
                    this.showPositionValue = true;
                    this.errorMsg = errorMsg;
                    return;
                }
                var postData = new URLSearchParams();
                postData.append('userName', _this.mobile);
                postData.append('mobile', _this.mobile);
                postData.append('sendFrom', 'HTML5');
                postData.append('sendType', 'login');
                postData.append('requestSource', 'HTML5');
                postData.append('uuid', utils.uuid());
                postData.append('authId', _this.authId);
                postData.append('imageCode', _this.imgCode);
                console.log('postData=====', postData)
                common.getMessageCode(postData)
                    .then((res)=>{
                        var time = 60;
                        var timer;
                        if(res.data.resultCode=="1"){
                            timeCount(60);
                        }
                        function timeCount(time) {
                            if (time == 0) {
                                _this.getMessageCodeText = '获取验证码'
                            } else {
                                _this.getMessageCodeText = time + 's'
                                time--;
                                timer =  setTimeout(function() {
                                     timeCount(time) ;
                                }, 1000);
                            }
                        }
                    });
            },
            change () {
                common.getImgCode()
                .then((res)=>{
                    // 图片验证码
                    this.authPic = 'data:image/jpg;base64,' + res.data.authPic;
                    this.authId = res.data.authId;
                    console.log('res====', res)
                });
            },
            messageLogin (position) {
                var _this = this;
                var errorMsg="";
                if (_this.mobile == "") {
                    errorMsg="请输入您的手机号";
                } else if (!utils.checkMobile(_this.mobile)) {
                    errorMsg="手机号码格式错误";
                } else if (_this.imgCode == "") {
                    errorMsg="请输入图形验证码";
                } else if (_this.messageCode == "") {
                    errorMsg="请输入短信验证码";
                }
                if(errorMsg!="") {
                    this.position = position;
                    this.showPositionValue = true;
                    this.errorMsg = errorMsg;
                    return;
                }
                var postData = new URLSearchParams();
                postData.append('uuid', '0c8297d7-6d3a-46da-b782-0df2434f88b1');
                postData.append('cityCode', '310100');
                postData.append('userName', _this.mobile);
                postData.append('passWord', _this.messageCode);
                postData.append('imageCode', _this.imgCode);
                postData.append('type', 2);
                postData.append('authId', _this.authId);
                postData.append('requestSource', 'h5');
                console.log('postData=====', postData)
                common.login(postData)
                    .then((res)=>{
                        console.info('res', res);
                        var params = new URLSearchParams();
                        params.userName = _this.mobile;
                        params.uuid = '0c8297d7-6d3a-46da-b782-0df2434f88b1';
                        common.getUserGrade(postData)
                            .then((result)=>{
                                console.log('res=====', res)
                                var source = utils.getCookie("source");
                                var vipCount = utils.getCookie("vipCount");
                                var dxObj = utils.getCookie("dxObj");
                                var telObj = utils.getCookie("telObj");
                                var mediasource = utils.getCookie("mediasource");
                                var afFrom = utils.getCookie("afFrom");
                                var siji_realName = utils.getCookie("siji_realName");
                                var siji_didiMobile = utils.getCookie("siji_didiMobile");
                                var siji_loanAmount = utils.getCookie("siji_loanAmount");
                                var siji_proid = utils.getCookie("siji_proid");
                                    utils.clearCookie();
                                    if(result.data.userGrade){
                                        var getUserPj = utils.getCookie("pj");
                                        if(!getUserPj||getUserPj!=result.data.userGrade){
                                            utils.setCookie("pj",result.data.userGrade);
                                            utils.setCookie("pjread","0");
                                        }
                                    }
                                utils.setCookie("siji_realName",siji_realName);
                                utils.setCookie("siji_didiMobile",siji_didiMobile);
                                utils.setCookie("siji_loanAmount",siji_loanAmount);
                                utils.setCookie("siji_proid",siji_proid);
                                console.log('res====', res)
                                utils.setCookie("userName", res.data.userName);
                                utils.setCookie("realName", escape(res.data.realName));
                                utils.setCookie("mobile", res.data.mobile);
                                utils.setCookie("identityCode", res.data.identityNo);
                                utils.setCookie("custType",res.data.custType);
                                utils.setCookie("isDoubleSales",res.data.isDoubleSales);
                                utils.setCookie("inOneMonthReg",res.data.inOneMonthReg);
                                utils.setCookie("isLanUserFlag",res.data.isLanUserFlag);
                                _this.$router.push({name: 'Home', params: { from: 'bg-body' }});
                            });
                        console.log('res====', res)
                    });

            },
            passwordLogin () {

            }
        },
        mounted: function () {
            this.type = 'message';
            common.getImgCode()
                .then((res)=>{
                    // 图片验证码
                    this.authPic = 'data:image/jpg;base64,' + res.data.authPic;
                    this.authId = res.data.authId;
                    console.log('res====', res)
                });
        }
    }
</script>
