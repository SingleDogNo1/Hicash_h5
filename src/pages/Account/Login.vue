 <template>
    <div class="login-body" id="login-body">
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
            <tab :line-width="1" :custom-bar-width="getBarWidth" class="tab-container">
                <tab-item selected @on-item-click="onItemClick">短信登录</tab-item>
                <tab-item @on-item-click="onItemClick">密码登录</tab-item>
            </tab>
            <div class="message-login-form" v-if="type === 'message'">
                <x-input v-model="mobile" class="mobile" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" :max="11" autocomplete="off"></x-input>
                <x-input v-model="messageCode" placeholder="请输入短信号码" class="weui-vcode message-code" @keyup.enter.native="passwordLogin">
                    <x-button slot="right" type="primary" mini @click.native="getMessageCode('middle')">
                    {{getMessageCodeText}}</x-button>
                </x-input>
                <button class="btn-login" @click="messageLogin('middle')"> 登录</button>
            </div>
            <div class="message-login-form" v-if="type === 'password'">
                <x-input v-model="mobile" class="mobile" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" :max="11" autocomplete="off"></x-input>
                <x-input v-model="password" class="password" name="password" placeholder="请输入密码" type="password"  @keyup.enter.native="passwordLogin"></x-input>
                <button class="btn-login" @click="passwordLogin">登录</button>
            </div>
        </div>
        <VerificationCodePop :mobile="mobile" :showToast="showToast" :authPic="authPic" @timeCount="showTimeCount" ></VerificationCodePop>
        <iframe id="oldHicash" :src="oldHicash"></iframe>
    </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
    #oldHicash{
        display: none;
    }
    .weui-tab__panel{
        padding-bottom: 0 !important;
    }
    #login-body {
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
                color: #fff;
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
        .user-login-wrap {
            width: 14.35rem;
            height: calc(100% - 6.7rem);
            margin: 0 auto;
            margin-top: 2.2rem;
            background: #fff;
            border-radius: 10px 10px 0 0 !important;
            .tab-container {
                .vux-tab-container {
                    border-radius: 10px 10px 0 0 !important;
                }
                .vux-tab {
                    height: 1.8rem !important;
                    background-color: #ffeeea !important;
                    .vux-tab-item {
                        height: 1.8rem !important;
                        line-height: 1.8rem !important;
                        font-size: 13px !important;
                        color: #999;
                    }
                    .vux-tab-selected {
                        color:  #FF7640;;
                    }
                    .vux-tab-ink-bar-transition-backward, .vux-tab-ink-bar-transition-forward{
                        height: 2px !important;
                        .vux-tab-bar-inner {
                            width: 2.5rem !important;;
                            background-color:  #FF7640 !important;
                        }
                    }
                }
            }
            .message-login-form {
                width: 11.775rem;
                margin: .5rem auto;
                .mobile {
                    position: relative;
                    height: 1.8rem;
                    border-bottom: 1px solid #DDDDDD;
                    font-size: 15px;
                    padding: 5px 0 5px 1.35rem;
                    background: url(./icon_tel.png) left center no-repeat;
                    background-size: 0.666667rem 0.666667rem;
                    font-family: PingFangSC-Regular;
                }
                .message-code {
                    position: relative;
                    height: 1.8rem;
                    border-bottom: 1px solid #DDDDDD;
                    font-size: 15px;
                    padding: 5px 0 5px 1.35rem;
                    background: url(./icon_message_code.png) left center no-repeat;
                    background-size: 0.666667rem 0.666667rem;
                    font-family: PingFangSC-Regular;
                    .weui-btn_primary {
                        width: 4rem !important;
                        height: 1.45rem !important;
                        padding: 0 !important;
                        background-color: #FF7640 !important;
                        border: none !important;
                        font-size: .666667rem /* 15/22.5 */ !important;
                    }
                }
                .message-code:before {
                    border-top: none !important;
                }
                .password {
                    position: relative;
                    height: 1.8rem;
                    border-bottom: 1px solid #DDDDDD;
                    font-size: 15px;
                    padding: 5px 0 5px 1.35rem;
                    background: url(./icon_password.png) left center no-repeat;
                    background-size: 0.666667rem 0.666667rem;
                    font-family: PingFangSC-Regular;
                }
                .password:before {
                    border-top: none !important;
                }
                .btn-login {
                    display: block;
                    width: 11rem;
                    height: 2rem;
                    margin: 1.25rem auto;
                    font-size: 15px;
                    background: #FF7640;
                    color: #fff;
                    border-radius: 5px;
                    border: none;
                    font-family: PingFangSC-Regular;
                }
                .go-to-forget-pwd {
                    display: block;
                    color: #C45930;
                    font-size: .7rem;
                    text-align: center;
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
        min-height: 5em !important;
        .weui-icon_toast {
            margin: 8px 0 6px 0 !important
        }
    }
</style>

<script type="text/javascript">
    import { Tab, TabItem, XInput, XButton, Loading} from 'vux'

    import VerificationCodePop from '@/components/VerificationCodePop'

    // todo

    export default {
        components: {
            Tab,
            TabItem,
            XInput,
            XButton,
            VerificationCodePop,
            Loading
        },
        data () {
            return {
                type: '',
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
                },
                showToast: false,
                oldHicash: '',
                authPic: ''
            }
        },
        ready () {
        },
        methods: {
            onItemClick (index) {
                index === 0 ? this.type = 'message' : this.type = 'password'
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
                var postData = new URLSearchParams();
                postData.append('userName', this.mobile);
                postData.append('mobile', this.mobile);
                postData.append('sendFrom', 'HTML5');
                postData.append('sendType', 'login');
                postData.append('uuid', this.utils.uuid());
                this.common.getMessageCode(postData)
                    .then((res)=>{
                        let data = res.data;
                        if(data.resultCode=="1"){
                            // 是否显示图片验证码 （1显示，0不显示）
                            if(data.showAuthPic === 0) {
                                this.utils.timeCount(60, function(timeCount){
                                    this.getMessageCodeText = timeCount;
                                });
                            } else {
                                this.showToast = true;
                                this.authPic = data.authPic;
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
            messageLogin (position) {
                var errorMsg="";
                if (this.mobile == "") {
                    errorMsg="请输入您的手机号";
                } else if (!this.utils.checkMobile(this.mobile)) {
                    errorMsg="手机号码格式错误";
                } else if (this.messageCode == "") {
                    errorMsg="请输入短信验证码";
                }
                if(errorMsg!="") {
                    this.$vux.toast.text(errorMsg, 'middle');
                    return;
                }

                this.oldHicash = this.config.MWEB_PATH + 'newweb/template/fromAppTemp.html?userName=' + this.mobile;

                

                var postData = new URLSearchParams();
                postData.append('uuid', '0c8297d7-6d3a-46da-b782-0df2434f88b1');
                postData.append('cityCode', '310100');
                postData.append('userName', this.mobile);
                postData.append('passWord', '11111');
                postData.append('type', 2);
                postData.append('requestSource', 'h5');
                console.log('postData=====', postData)
                this.common.login(postData)
                    .then((res)=>{
                        console.info('res', res);
                        let data = res.data;
                        if(data.resultCode === '1') {
                            this.jsCommon.setAuthorization(data.userName, data.token);
                            this.afterLogin(data).then((res)=>{
                                var redirect = this.$route.query.redirect ? this.$route.query.redirect : '/';
                                this.$router.push({path: redirect});
                            });
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
            passwordLogin () {
                var errorMsg="";
                if (this.mobile == "") {
                    errorMsg="请输入您的手机号";
                } else if (!this.utils.checkMobile(this.mobile)) {
                    errorMsg="手机号码格式错误";
                } else if (this.password == "") {
                    errorMsg="请输入密码";
                }
                if(errorMsg!="") {
                    this.$vux.toast.text(errorMsg, 'middle');
                    return;
                }
                this.oldHicash = this.config.MWEB_PATH + 'newweb/template/fromAppTemp.html?userName=' + this.mobile;

                var postData = new URLSearchParams();
                postData.append('uuid', '0c8297d7-6d3a-46da-b782-0df2434f88b1');
                postData.append('cityCode', '310100');
                postData.append('userName', this.mobile);
                postData.append('passWord', this.password);
                postData.append('imageCode', this.imgCode);
                postData.append('type', 1);
                console.log('postData=====', postData)
                this.common.login(postData)
                    .then((res)=>{
                        let data = res.data;
                        if(data.resultCode === '1') {
                            this.jsCommon.setAuthorization(data.userName, data.token);
                            this.afterLogin(data).then((res)=>{
                                var redirect = this.$route.query.redirect ? this.$route.query.redirect : '/';
                                this.$router.push({path: redirect});
                            });
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
            showTimeCount(timeCount) {
                this.getMessageCodeText = timeCount;
                console.log('this.getMessageCodeText====', this.getMessageCodeText)
            },
            afterLogin(data) {
                return new Promise((resolve,reject)=> {
                    console.log('data=====', data)
                    var params = new URLSearchParams();
                    params.userName = data.userName;
                    params.uuid = '0c8297d7-6d3a-46da-b782-0df2434f88b1';
                    this.common.getUserGrade(params)
                        .then((result)=>{
                            var source = this.utils.getCookie("source");
                            var vipCount = this.utils.getCookie("vipCount");
                            var dxObj = this.utils.getCookie("dxObj");
                            var telObj = this.utils.getCookie("telObj");
                            var mediasource = this.utils.getCookie("mediasource");
                            var afFrom = this.utils.getCookie("afFrom");
                            var siji_realName = this.utils.getCookie("siji_realName");
                            var siji_didiMobile = this.utils.getCookie("siji_didiMobile");
                            var siji_loanAmount = this.utils.getCookie("siji_loanAmount");
                            var siji_proid = this.utils.getCookie("siji_proid");
                            this.utils.clearCookie();
                            if(result.data.userGrade){
                                var getUserPj = this.utils.getCookie("pj");
                                if(!getUserPj||getUserPj!=result.data.userGrade){
                                    this.utils.setCookie("pj",result.data.userGrade);
                                    this.utils.setCookie("pjread","0");
                                }
                            }
                            this.utils.setCookie("siji_realName",siji_realName);
                            this.utils.setCookie("siji_didiMobile",siji_didiMobile);
                            this.utils.setCookie("siji_loanAmount",siji_loanAmount);
                            this.utils.setCookie("siji_proid",siji_proid);
                            this.utils.setCookie("userName", data.userName);
                            this.utils.setCookie("realName", escape(data.realName));
                            this.utils.setCookie("mobile", data.mobile);
                            this.utils.setCookie("identityCode", data.identityNo);
                            this.utils.setCookie("custType", data.custType);
                            this.utils.setCookie("isDoubleSales", data.isDoubleSales);
                            this.utils.setCookie("inOneMonthReg", data.inOneMonthReg);
                            this.utils.setCookie("isLanUserFlag", data.isLanUserFlag);

                            const MWEB_PATH = this.config.MWEB_PATH;

                            this.$vux.loading.show({
                                text: '数据请求中'
                            })
                            
                            // TODU 新老嗨钱融合中的代码，后续优化
                            document.getElementById('oldHicash').onload=()=>{
                                if(data.isVip&&vipCount!="1"){
                                    this.utils.setCookie("vipCount", "0");
                                }

                                let jumpType;

                                if(jumpType === 'bindCard'){	//如果是绑卡的快捷入口隐藏返回和注册按钮
                                    window.location.href = MWEB_PATH + 'newweb/creditInfo/bandBank.html?jumpType=bindCard';
                                    return;
                                }

                                var ref=window.location.href;
                                var from = this.utils.getQueryString("from");
                                if(from == 'shixin'){
                                    var _appNo = this.utils.getQueryString('appNo');
                                    var postData = new URLSearchParams();
                                        postData.append('appNo', _appNo);
                                        postData.append('userName', this.utils.getCookie("userName"));
                                        postData.append('comeFrom', this.utils.getPlatform());
                                        postData.append('uuid', this.utils.uuid());

                                    this.common.navigateToRecharge(postData)
                                    .then(function(){
                                        window.location.href = data.rechargeUrl;
                                    });
                                    
                                    return false;
                                }
                                
                                if("sharkResult"==this.utils.getQueryString("from")){
                                    var custFrom=this.utils.getQueryString("custFrom")&&this.utils.getQueryString("custFrom")!="null"?this.utils.getQueryString("custFrom"):"H5";
                                    window.location.href=MWEB_PATH+"newweb/sharkActivity/sharkResult.html?custFrom="+custFrom;
                                    return false;
                                }
                                if(ref.indexOf("sharkLogin.html")!=-1){
                                    var custFrom=this.utils.getQueryString("custFrom")&&this.utils.getQueryString("custFrom")!="null"?this.utils.getQueryString("custFrom"):"H5";
                                    window.location.href=MWEB_PATH+"newweb/sharkActivity/sharkIndex.html?custFrom="+custFrom;
                                    return false;
                                }
                                if(data.isVip&&this.utils.getCookie("vipCount")=="0"){
                                    window.location.href=MWEB_PATH+"newweb/product/vipdai.html";
                                    return false;
                                }
                                if(dxObj && telObj){
                                    this.utils.setCookie("dxObj",dxObj);
                                    this.utils.setCookie("telObj",telObj);
                                }

                                if(this.utils.getCookie("afFrom") && this.utils.getCookie("afFrom") == "miaodai"){
                                    window.location.href = MWEB_PATH+"newweb/product/vipdai.html";
                                }

                                if(from == 'perCenter'){
                                    window.location.href = MWEB_PATH + 'newweb/personalCenter/perCenter.html';
                                }


                                console.log('result====', result)
                                resolve(result);
                            };
                           

                            
                            
                        });
                })
            }
        },
        mounted: function () {
            this.type = 'message';
            // common.getImgCode()
            //     .then((res)=>{
            //         // 图片验证码
            //         this.authPic = 'data:image/jpg;base64,' + res.data.authPic;
            //         this.authId = res.data.authId;
            //         console.log('res====', res)
            //     });
        }
    }
</script>
