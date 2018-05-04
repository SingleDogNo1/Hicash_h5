<template>
    <div class="login-body">
        <!-- header -->
        <header  class="login-header">
            <a class="go-back"  href="JavaScript:history.back(-1)"></a>
            <router-link class="go-to-register" :to="{name: 'Register'}">
                    注册
            </router-link>
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
                <x-input v-model="mobile" class="mobile" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" :max="11"></x-input>
                <x-input v-model="imgCode" class="img-code" placeholder="请输入图形验证码" :max="4">
                    <img slot="right-full-height" :src="authPic" @click="change">
                </x-input>
                <x-input v-model="messageCode" placeholder="请输入短信号码" class="weui-vcode message-code" :max="4">
                    <x-button slot="right" type="primary" mini @click.native="showPosition('middle')">
                    {{getMessageCodeText}}</x-button>
                </x-input>
                <toast v-model="showPositionValue" type="text" :time="3000" is-show-mask :position="position">{{errorMsg}}</toast>
                <button class="btn-login" @click="messageLogin('middle')">登录</button>
                <router-link class="go-to-forget-pwd" :to="{name: 'ForgetPassword'}">
                    忘记密码?
                </router-link>
            </div>
            <div class="message-login-form" v-if="type === 'password'">
                <x-input v-model="mobile" class="mobile" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" :max="11"></x-input>
                <x-input v-model="password" class="password" name="password" placeholder="请输入密码" type="password"></x-input>
                <button class="btn-login" @click="passwordLogin">登录</button>
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
    .login-body {
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
                color: #C04F23;
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

    var afterLogin = function(data) {
        return new Promise((resolve,reject)=>{
            console.log('data=====', data)
            var params = new URLSearchParams();
            params.userName = data.userName;
            params.uuid = '0c8297d7-6d3a-46da-b782-0df2434f88b1';
            common.getUserGrade(params)
                .then((result)=>{
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
                    utils.setCookie("userName", data.userName);
                    utils.setCookie("realName", escape(data.realName));
                    utils.setCookie("mobile", data.mobile);
                    utils.setCookie("identityCode", data.identityNo);
                    utils.setCookie("custType", data.custType);
                    utils.setCookie("isDoubleSales", data.isDoubleSales);
                    utils.setCookie("inOneMonthReg", data.inOneMonthReg);
                    utils.setCookie("isLanUserFlag", data.isLanUserFlag);
                    resolve(result);
                });
        })
    }

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
                password: '',
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
                var errorMsg = "";
                if (_this.mobile == "") {
                    errorMsg="请输入您的手机号";
                } else if (!utils.checkMobile(_this.mobile)) {
                    errorMsg="手机号码格式错误";
                } else if (_this.imgCode == "") {
                    errorMsg="请输入图形验证码";
                }
                if(errorMsg!="") {
                    this.position = position;
                    this.showPositionValue = true;
                    this.errorMsg = errorMsg;
                    return;
                }
                var postData = new URLSearchParams();
                postData.append('uuid', '0c8297d7-6d3a-46da-b782-0df2434f88b1');
                postData.append('mobile', _this.mobile);
                common.getMessageCode(postData)
                    .then((res)=>{
                        if(res.data.resultCode=="1"){
                            utils.timeCount(60, function(data){
                                _this.getMessageCodeText = data;
                            });
                        } else {
                            _this.position = position;
                            _this.showPositionValue = true;
                            _this.errorMsg = res.data.resultMsg;
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
                    _this.position = position;
                    _this.showPositionValue = true;
                    _this.errorMsg = errorMsg;
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
                        if(res.data.resultCode === '1') {
                            afterLogin(res.data).then((res)=>{
                                var redirect = _this.$route.query.redirect;
                                _this.$router.push({path: redirect});
                            });
                        } else {
                            _this.position = position;
                            _this.showPositionValue = true;
                            _this.errorMsg = res.data.resultMsg;
                        }
                    });

            },
            passwordLogin () {
                var _this = this;
                var errorMsg="";
                if (_this.mobile == "") {
                    errorMsg="请输入您的手机号";
                } else if (!utils.checkMobile(_this.mobile)) {
                    errorMsg="手机号码格式错误";
                } else if (_this.password == "") {
                    errorMsg="请输入密码";
                }
                if(errorMsg!="") {
                    _this.position = position;
                    _this.showPositionValue = true;
                    _this.errorMsg = errorMsg;
                    return;
                }
                var postData = new URLSearchParams();
                postData.append('uuid', '0c8297d7-6d3a-46da-b782-0df2434f88b1');
                postData.append('cityCode', '310100');
                postData.append('userName', _this.mobile);
                postData.append('passWord', _this.password);
                postData.append('imageCode', _this.imgCode);
                postData.append('type', 1);
                console.log('postData=====', postData)
                common.login(postData)
                    .then((res)=>{
                        if(res.data.resultCode === '1') {
                            afterLogin(res.data).then((res)=>{
                                var redirect = _this.$route.query.redirect;
                                _this.$router.push({path: redirect});
                            });
                        } else {
                            _this.position = position;
                            _this.showPositionValue = true;
                            _this.errorMsg = res.data.resultMsg;
                        }
                    });
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
