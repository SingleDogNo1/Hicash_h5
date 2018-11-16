<template>
    <div class="dialog" v-transfer-dom>
      <confirm v-model="showDialog"
      :title="dialogTitle"
      :show-cancel-button="false"
      :show-confirm-button="false">
        <div class="dialog-content" v-if="popType === 'rechargePop'">
            <p class="content-title">{{dialogDefaultTitle}}</p>
            <ul class="content-app-no"><li v-for="(item, index) in appNoList" :key="index">{{item}}</li></ul>
            <p class="content-total-amount" v-html="totalAmount"></p>
        </div>
        <p v-if="popType === 'normalPop'">
            {{dialogContent}}
        </p>
        <div class="weui-dialog__ft">
            <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="onConfirm">{{confirmText}}</a>
            <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="onCancel">{{cancelText}}</a>
        </div>
      </confirm>
    </div>
</template>

<style lang="scss" scoped>
    @import "~bowerComponents/sass-rem/_rem.scss";
    /deep/ .weui-dialog__hd {
        height: rem(48px);
        line-height: rem(48px);
        background: #FF7640;
        padding: 0 rem(10px);
        .weui-dialog__title {     
            font-size: 17px;
            color: #fff;
        }
    }
    /deep/ .weui-dialog__bd {
        padding: 0;
        .dialog-content {
            padding: 0 1.6em 0.8em;
            margin-top: rem(20px);
            text-align: center;
            font-size: 13px;
            color: #333333;
            line-height: 16px;
            .content-title {
                margin-bottom: rem(3px);
            }
            .content-app-no {
                margin-bottom: rem(3px);
            }
            .content-total-amount {
                margin-bottom: 5px;
                /deep/ span {
                    color: #FF7640;
                }
            }
        }
    }
    /deep/ .weui-dialog__ft {
        position: relative;
        line-height: 48px;
        font-size: 18px;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        .weui-dialog__btn {
            display: block;
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            flex: 1;
            color: #3cc51f;
            text-decoration: none;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            position: relative;
        }
        .weui-dialog__btn_default {
            color: #999999;
            font-size: rem(15px);
        }
        .weui-dialog__btn_primary {
            color: #FF7640;
            font-size: rem(15px);
        }
    }
    /deep/ .weui-dialog__ft:after {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid #d5d5d6;
        color: #d5d5d6;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
    }
</style>

<script>
    import { Confirm, TransferDomDirective as TransferDom } from 'vux'
    export default {
        directives: {
            TransferDom
        },
        components: {
            Confirm
        },
        props: {
            isShowDialog: {
                type: Boolean,
                default: false
            },
            dialogTitle: { // 标题
                type: String,
                default: '提示'
            },
            dialogContent: { // 内容
                type: String,
                default: ''
            },
            cancelText: {
                type: String,
                default: '取消'
            },
            confirmText: {
                type: String,
                default: '确定'
            },
            dialogDefaultTitle: {
                type: String,
                default: ''
            },
            appNoList: {
                type: Array,
                default: []
            },
            totalAmount: {
                type: String,
                default: ''
            },
            popType: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                showDialog: this.isShowDialog
            }
        },
        methods: {
            onCancel: function() {
                this.showDialog = false;
                this.$emit('showDialog', this.showDialog);
                console.log('cancel')
            },
            onConfirm: function() {
                this.showDialog = false;
                this.$emit('showDialog', this.showDialog);
                let appNoStr = this.appNoList.join(',');
                window.location.href = this.config.MWEB_PATH + 'newweb/personalCenter/rechargePay.html?appNo=' + appNoStr;
            }
        },
        watch: {
            isShowDialog: function (val, oldVal) {
                this.showDialog = val;
            }
        }
    }
</script>

