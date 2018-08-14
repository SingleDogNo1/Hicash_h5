<template>
    <div class="register-body">
        <!-- header -->
        <header  class="login-header">
            <router-link class="go-back" :to="{name: 'Home'}"></router-link>
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
                <x-input v-model="mobile" class="mobile" name="mobile" placeholder="请输入手机号" keyboard="number" is-type="china-mobile" :max="11"></x-input>
                <x-input v-model="messageCode" placeholder="请输入短信验证码" class="weui-vcode message-code" keyboard="number" type="tel" :max="5">
                    <x-button slot="right" type="primary" mini @click.native="getMessageCode('middle')" :disabled="isDisabled">
                    {{getMessageCodeText}}</x-button>
                </x-input>
                <x-input  class="recommend" type="text" value="我有推荐码" readonly="readonly"  @click.native="toggle"></x-input>
                <transition name="enter-recommend">
                    <x-input v-model="inviteCode" class="enter-recommend" type="text" placeholder="请输入推荐码" text-align="left" v-show="boxshow"></x-input>
                </transition>
                <button class="btn-register" @click="register('middle')">注册</button>
                <div class="register-agreement-wrap">
                    <check-icon :value.sync="selected">
                        <span>注册即表示同意</span>
                        <a :href="agreementUrl1" class="go-to-forget-pwd" >《嗨钱网注册协议》</a>
                        <span>及</span>
                        <a :href="agreementUrl2" class="go-to-forget-pwd" >《信息收集授权协议》</a>
                    </check-icon>
                </div>
            </div>
        </div>
        <VerificationCodePop :mobile="mobile" :showToast="showToast" :authId="authId" :authPic="authPic" :type="type" @timeCount="showTimeCount" @imgCode="newImgCode" @showToast="showToast1"></VerificationCodePop>
    </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
    .weui-tab__panel{
        padding-bottom: 0 !important;
    }
    .register-body {
        height: 100%;
        background-image: linear-gradient(-180deg, #FD7F5F 3%, #FC915C 98%);
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
                font-size: 15px;
                font-family: PingFangSC-Regular;
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
                background: url(./logo_user.png) 0 0 no-repeat;
                background-size: cover;
            }
        }
        .register-wrap {
            width: 14.35rem;
            height: calc(100% - 6.7rem);
            margin: 0 auto;
            margin-top: 2.2rem;
            background: #fff;
            border-radius: 10px 10px 0 0 !important;
            /* padding: 3.4rem 0; */
            .register-form {
                width: 11.775rem;
                margin: 1rem auto 0;
                padding-top: .2rem;
                .mobile {
                    position: relative;
                    height: 1.95rem;
                    border-bottom: 1px solid #DDDDDD;
                    font-size: 15px;
                    font-family: PingFangSC-Regular;
                    padding: 5px 0 5px 1.35rem;
                    background: url(./icon_tel.png) left center no-repeat;
                    background-size: 0.666667rem 0.666667rem;
                }
                .message-code {
                    position: relative;
                    height: 1.8rem;
                    border-bottom: 1px solid #DDDDDD;
                    font-size: 15px;
                    font-family: PingFangSC-Regular;
                    padding: 5px 0 5px 1.35rem;
                    background: url(./icon_message_code.png) left center no-repeat;
                    background-size: 0.666667rem 0.666667rem;
                    .weui-btn_primary {
                        width: 4rem !important;
                        height: 1.45rem !important;
                        padding: 0 !important;
                        background-color: #FF7640 !important;
                        border: none !important;
                        font-size: .65rem !important;
                    }
                    .weui-btn_primary:disabled {
                        background-color: #ddd !important;
                        color: #fff;
                    }
                }
                .message-code:before {
                    border-top: none !important;
                }
                .recommend {
                    position: relative;
                    height: 1.95rem;
                    font-family: PingFangSC-Regular;
                    font-size: 15px;
                    padding: 5px 0 5px 1.35rem;
                    background: url(./icon_recommend_code.png) left center no-repeat;
                    background-size: 0.666667rem 0.666667rem;
                }
                .recommend:before {
                    border-top: none !important;
                }
                .enter-recommend {
                    position: relative;
                    height: 1rem;
                    border-bottom: 1px solid #DDDDDD;
                    font-size: 15px;
                    font-family: PingFangSC-Regular;
                    padding-left: 0;
                    margin-bottom: .5rem;
                }
                .enter-recommend:before {
                    border-top: none !important;
                }
                .enter-recommend-leave-active,.enter-recommend-enter-active{
                    transition:  all .5s ease; 
                }
                .enter-recommend-leave-active,.enter-recommend-enter{
                    height:0px !important;
                }
                .enter-recommend-leave,.enter-recommend-enter-active{
                    height: 1rem;
                }
                .btn-register {
                    display: block;
                    width: 11rem;
                    height: 1.955556rem /* 44/22.5 */;
                    margin: .5rem auto;
                    font-size: 15px;
                    font-family: PingFangSC-Regular;
                    background: #FF7640;
                    color: #fff;
                    border-radius: 5px;
                    border: none;
                }
                .register-agreement-wrap {
                    font-size: .6rem;
                    color: #CCCCCC;
                    span {
                        font-size: .6rem;
                        color: #CCCCCC;
                    }
                    .weui_icon_circle {
                        font-size: .6rem !important;
                    }
                    .weui-icon-success {
                        font-size: .6rem !important;
                        color: #FD7F5F !important;
                    }
                    .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before {
                        color: #FD7F5F !important;
                    }
                    a {
                        color: #FD7F5F;
                    }
                }
                input::-webkit-input-placeholder{
                    color: #ccc;
                }
                input::-moz-placeholder{   /* Mozilla Firefox 19+ */
                    color: #ccc;
                }
                input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
                    color: #ccc;
                }
                input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
                    color: #ccc;
                }
            }
        }
    }
    .weui-toast_cancel {
        width: auto !important;
        padding: 0 .444444rem /* 10/22.5 */;
        min-height: auto !important;
        .weui-icon_toast {
            margin: 8px 0 6px 0 !important
        }
        .weui-icon_toast.weui-icon-success-no-circle:before{
            font-size: 35px !important;
        }
    }
    .weui-toast {
        width: auto !important;
    }
</style>

<script type="text/javascript">
    import { Tab, TabItem, XInput, XButton, Toast, CheckIcon} from 'vux'

    import VerificationCodePop from '@/components/VerificationCodePop'

    export default {
        components: {
            Tab,
            TabItem,
            XInput,
            XButton,
            Toast,
            CheckIcon,
            VerificationCodePop
        },
        data () {
            return {
                type: 'register',
                authPic: '',
                authId: '',
                mobile: '',
                password: '',
                imgCode: '',
                messageCode: '',
                getMessageCodeText: '获取验证码',
                boxshow: false,
                selected: true,
                inviteCode: '',
                agreementUrl1: '',
                agreementUrl2: '',
                showToast: false,
                isDisabled: false
            }
        },
        ready () {
        },
        methods: {
            toggle () {
                this.boxshow = !this.boxshow;
            },
            getMessageCode (position) {
                var errorMsg = "";
                if (this.mobile == "") {
                    errorMsg="请输入您的手机号";
                } else if (!this.utils.checkMobile(this.mobile)) {
                    errorMsg="手机号码格式错误";
                }
                if(errorMsg!="") {
                    this.$vux.toast.text(errorMsg, 'middle');
                    return;
                }
                this.imgCode = '';
                var postData = new URLSearchParams();
                postData.append('userName', this.mobile);
                postData.append('mobile', this.mobile);
                postData.append('sendFrom', 'HTML5');
                postData.append('sendType', 'regist');
                postData.append('requestSource', 'HTML5');
                postData.append('uuid', this.utils.uuid());
                postData.append('authId', this.authId);
                postData.append('imageCode', this.imgCode);
                this.common.getMessageCode(postData)
                    .then((res)=>{
                        let data = res.data;
                        if(data.resultCode=="1" || data.resultCode=="2"){
                            console.log('data-----', data)
                            // 是否显示图片验证码 （1显示，0不显示）
                            if(data.showAuthPic === "0") {
                                this.isDisabled = true;
                                this.utils.timeCount(60, (timeCount)=>{
                                    this.getMessageCodeText = timeCount;
                                    if(this.getMessageCodeText === '获取验证码') this.isDisabled = false;
                                });
                            } else {
                                this.showToast = true;
                                this.authPic = 'data:image/jpg;base64,' + data.authPic;
                            }
                        } else {
                            this.errorMsg = data.resultMsg;
                            this.$vux.toast.show({
                                type: 'cancel',
                                position: 'middle',
                                text: this.errorMsg
                            })
                        }
                    });
            },
            register () {
                var mobile = this.mobile.replace(/\s/g,"");
                var messageCode = this.messageCode.replace(/\s/g,"");
                var custType = "KHL2";
                var password = this.password.replace(/\s/g,"");
                var inviteCode = this.inviteCode;
                var imgCode = this.imgCode.replace(/\s/g,"");
                var mediasource = "HY";
                if(this.utils.getCookie("mediasource")){
                    mediasource = this.utils.getCookie("mediasource");
                }
                var errorMsg="";
                if(this.mobile == ""){
                    errorMsg = "请输入您的手机号";
                } else if (!this.utils.checkMobile(this.mobile)){
                    errorMsg = "手机号码格式错误";
                } else if (this.inviteCode != "" && !this.utils.checkMobile(this.inviteCode)){
                    errorMsg = "推荐码格式错误";
                } else if (this.getMessageCodeText === '获取验证码') {
                    errorMsg="请点击获取验证码";
                } else if (this.messageCode.length < 5) {
                    errorMsg="短信验证码格式错误";
                } else if (!this.selected){
                    errorMsg = "请同意相关协议";
                }

                if(errorMsg!=""){
                    this.$vux.toast.text(errorMsg, 'middle');
                    return;
                }

                var registerFrom = "HTML5";
                if(mediasource == "iosddd"){
                    registerFrom = "iOS";
                } else if (mediasource == "andddd"){
                    registerFrom = "Android";
                }

                var postData = new URLSearchParams();
                postData.append('uuid', '0c8297d7-6d3a-46da-b782-0df2434f88b1');
                postData.append('custType', 'KHL2');
                postData.append('mobileNo', this.mobile);
                postData.append('identifyingCode', this.messageCode);
                postData.append('registerFrom', registerFrom);
                postData.append('browserStr', navigator.userAgent);
                postData.append('custFrom', mediasource);
                postData.append('reference', '');
                postData.append('upPage', '');
                postData.append('bussiness', 'Regist');
                postData.append('recommend', this.mobile);
                postData.append('recommendCode', this.inviteCode);
                postData.append('requestSource', 'HTML5');
                postData.append('activeFrom', '');
                var reference = this.utils.getCookie("reference");
                var upPage = this.utils.getCookie("upPage");
                var activeFrom = this.utils.getCookie("activeFrom");
                if(reference && reference != "null"){
                    postData.append('reference', reference);
                }
                if(upPage && upPage != "null"){
                    postData.append('upPage', upPage);
                }
                if(activeFrom && activeFrom != "null"){
                    postData.append('activeFrom', activeFrom);
                }
                this.common.register(postData).then((res)=>{
                    // token为空代表异常情况，不为空代表注册成功
                    let data = res.data;
                    if (data.token !== '') {
                        console.log('res======', res);
                        this.jsCommon.setAuthorization(data.loginInfo.userName, data.loginInfo.token);
                        this.imgCode = '';
                        var source = this.utils.getCookie("source");
                        var dxObj = this.utils.getCookie("dxObj");
                        var telObj = this.utils.getCookie("telObj");
                        var activeFrom = this.utils.getCookie("activeFrom");
                        var mediasource = this.utils.getCookie("mediasource");
                        this.utils.clearCookie();
                        if(source && source == "APP"){
                            this.utils.setCookie("source", "APP");
                        }
                        if(activeFrom && activeFrom != "" && activeFrom != "null"){
                            this.utils.setCookie("activeFrom", activeFrom);
                        }
                        if(mediasource && mediasource != "" && mediasource != "null"){
                            this.utils.setCookie("mediasource", mediasource);
                        }
                        this.utils.setCookie("userName", data.loginInfo.userName);
                        this.utils.setCookie("mobile", data.loginInfo.mobile);
                        this.utils.setCookie("custType", data.loginInfo.custType);
                        this.utils.setCookie("realName", escape(data.loginInfo.realName));
                        this.utils.setCookie("identityCode", data.loginInfo.identityNo);
                        this.utils.setCookie("isDoubleSales", data.loginInfo.isDoubleSales);
                        this.utils.setCookie("inOneMonthReg", data.loginInfo.inOneMonthReg);
                        this.utils.setCookie("isLanUserFlag", data.loginInfo.isLanUserFlag);

                        if(dxObj && telObj){
                            this.utils.setCookie("dxObj",dxObj);
                            this.utils.setCookie("telObj",telObj);
                        }
                        var from = this.utils.getQueryString("from");
                        var redirect = this.utils.getQueryString("redirect");
                        if("hicash.ericsky.com"==redirect){
                        window.location.href = "http://hicash.ericsky.com";
                            return false;
                            this.$vux.toast.show({
                                position: 'middle',
                                text: '注册成功'
                            })
                        }
                        this.$vux.toast.show({
                            position: 'middle',
                            text: '注册成功'
                        })
                        setTimeout( () => { 
                            var redirect = this.$route.query.redirect ? this.$route.query.redirect : '/';
                            this.$router.push({path: redirect});
                        }, 2000)
                    } else {
                        // this.errorMsg = res.data.resultMsg;
                        // this.$vux.toast.show({
                        //     type: 'cancel',
                        //     position: 'middle',
                        //     text: this.errorMsg
                        // })
                        this.imgCode = '';
                        this.$vux.toast.show({
                            type: 'cancel',
                            position: 'middle',
                            text: data.resultMsg
                        })
                    }
                });
            },
            showTimeCount(timeCount) {
                this.getMessageCodeText = timeCount;
                this.isDisabled = true;
                if(this.getMessageCodeText === '获取验证码') this.isDisabled = false;
                console.log('this.getMessageCodeText====', this.getMessageCodeText)
            },
            newImgCode(newImgCode) {
                this.imgCode = newImgCode;
                console.log('newImgCode====', newImgCode)
            },
            showToast1(showToast1) {
                this.showToast = showToast1;
            },
        },
        mounted: function () {
            this.agreementUrl1 = this.config.MWEB_PATH + 'newweb/agreement/registAgreement.html?comeCode=gk';
            this.agreementUrl2 = this.config.MWEB_PATH + 'newweb/agreement/thirdParty.html?comeCode=gk';
            var userName = this.utils.getCookie("userName");
            var inviteCode = this.utils.getCookie("inviteCode");
            if(inviteCode){
                this.inviteCode = inviteCode;
            }
        }
    }
</script>
