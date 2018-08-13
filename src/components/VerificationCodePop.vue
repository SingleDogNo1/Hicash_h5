 <template>
    <div v-transfer-dom>
        <x-dialog v-model="showToast1">
            <div class="pop-warp">
                <x-input v-model="imgCode" class="img-code" placeholder="请输入图形验证码" :max="4" autocomplete="off">
                    <img slot="right-full-height" :src="newAuthPic" @click="change" class="img-code-pic">
                </x-input>
                <button class="btn-submit" @click="btnSubmit">确认</button>
            </div>
        </x-dialog>
    </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
    .weui-dialog {
        width: 12rem /* 270/22.5 */;
        background-color:transparent !important;
        border-radius: 5px;
        .pop-warp {
            width: 100%;
            height: 100%;
            background: #fff;
            .img-code {
                position: relative;
                width: 10.8rem /* 238/22.5 */;
                height: 1.8rem;
                margin: 0  auto;
                border-bottom: 1px solid #DDDDDD;
                font-family: PingFangSC-Regular;
                font-size: 15px;
                padding: 1.2rem 0 5px 0;
                margin-bottom: .5rem;
                .vux-x-input-right-full {
                    img {
                        width: 4rem;
                    }
                }
            }
            .img-code:before {
                border-top: none !important;
            }
            .vux-x-input-right-full {
                height: 1.8rem !important;
            }
            .img-code-pic {
                width: 3.733333rem /* 84/22.5 */;
                height: 1.022222rem /* 23/22.5 */;
                margin-top: .35rem;
            }
            .btn-submit {
                display: block;
                width: 11rem;
                height: 2rem;
                margin: .8rem auto;
                font-size: 15px;
                background: #FF7640;
                color: #fff;
                border-radius: 5px;
                border: none;
                font-family: PingFangSC-Regular;
            }
        }
    }
</style>

<script type="text/javascript">
    import {XDialog, XInput, TransferDomDirective as TransferDom} from 'vux'

    export default {
        props: {
            mobile: {
                type: String
            },
            authId: {
                type: String
            },
            authPic : {
                type: String
            },
            showToast: {
                type: Boolean
            },
            type: {
                type: String
            }
        },
        directives: {
            TransferDom
        },
        components: {
           XDialog,
           XInput
        },
        data () {
            return {
                imgCode: '',
                getMessageCodeText: '',
                showToast1: false,
                newAuthPic: ''
            }
        },
        ready () {
        },
        methods: {
            btnSubmit() {
                var errorMsg = "";
                if (this.imgCode == "") {
                    errorMsg="请输入图形验证码";
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
                postData.append('requestSource', 'HTML5');
                postData.append('uuid', this.utils.uuid());
                postData.append('authId', this.authId);
                postData.append('imageCode', this.imgCode);
                this.common.getMessageCode(postData)
                    .then((res)=>{
                        let data = res.data;
                        if(data.resultCode=="1"){
                            console.log('data====', data)
                            this.showToast1 = false;
                            this.$emit('showToast', this.showToast1);
                            // this.$emit('newAuthId', data.authId);
                            // this.$emit('newAuthPic', data.authPic);
                            this.utils.timeCount(60, (data) => {
                                this.getMessageCodeText = data;
                                this.$emit('timeCount', this.getMessageCodeText);
                            });
                            this.$emit('imgCode', this.imgCode);
                        } else {
                            this.errorMsg = data.resultMsg;
                            this.$vux.toast.show({
                                type: 'cancel',
                                position: 'middle',
                                text: this.errorMsg
                            })
                            // 图片验证码
                            this.newAuthPic = 'data:image/jpg;base64,' + res.data.authPic;
                            //this.authId = res.data.authId;
                        }
                    });
            },
            change() {
                this.getImgCode();
            },
            getImgCode() {
                let params = new URLSearchParams();
                params.append('userName', this.mobile);
                params.append('uuid', this.utils.uuid());
                this.common.getImgCode(params)
                .then((res)=>{
                    // 图片验证码
                    this.newAuthPic = 'data:image/jpg;base64,' + res.data.authPic;
                });
            }
        },
        mounted: function () {
        },
        watch: {
            showToast: function (val, oldVal) {
                this.showToast1 = val;
                this.imgCode = ''
            },
            authPic: function (val, oldVal) {
                this.newAuthPic = val;
            }
        },
        destroyed () {
            this.showToast1 = false;
        }
    }
</script>
