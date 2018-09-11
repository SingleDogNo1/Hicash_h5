<template>
    <iframe :src="dpandoraUrl" id="dpandoraUrl" style="width: 100%;height: 100%;" frameborder="0" target="#dpandoraUrl2"></iframe>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
    .vux-loading {
        .weui-toast {
            width: 5em !important;
            min-height: 5em !important;
            .weui-loading {
                margin: 22px 0 0 !important;
            }
        }
    }
    .weui-dialog__btn_primary {
        color: #f90 !important;
    }
</style>

<script type="text/javascript">
    import {Loading, Confirm } from 'vux'
    import $ from 'jquery'
    import common from '@/api/common'
    import utils from '@/assets/js/utils'

    export default {
        components: {
            Loading,
            Confirm
        },
        data () {
            return {
                dpandoraUrl: '',
                show: false
            }
        },
        ready () {

        },
        methods : {
            goBack () {

            },
            close () {

            },
            btnNext () {

            }

        },
        mounted: function () {
            var _this = this;
            let type = _this.$route.query.type;
            let flag = true;
            let industryCode = utils.getCookie("industryCode");
            console.log('type======', type);
            if(industryCode=="MDCP"||industryCode=="LDDD"){ //用户正在申请嗨秒贷产品
                let creditItems = window.sessionStorage.getItem('creditItems');
                creditItems = JSON.parse(creditItems);
                if (type === '0') {
                    flag = false;
                    var paramsStr = "";
                    if(creditItems[1].url.indexOf("?")!=-1){
                        paramsStr = "&source=hq&id_card_no=" + utils.getCookie("identityCode") + "&name="+unescape(utils.getCookie("realName")) + "&mobile=" + utils.getCookie("mobile");
                    }else{
                        paramsStr = "?source=hq&id_card_no=" + utils.getCookie("identityCode") + "&name="+unescape(utils.getCookie("realName")) + "&mobile=" + utils.getCookie("mobile");
                    }
                    _this.dpandoraUrl = creditItems[1].url + paramsStr;
                    console.log('_this.dpandoraUrl====', _this.dpandoraUrl);
                    var UUserCard = utils.getCookie("identityCode");
                    var myDate = new Date();
                    var month = myDate.getMonth() + 1;
                    var day = myDate.getDate();
                    var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
                    if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
                        age++;
                    }
                    if(age>22){
                        this.$vux.confirm.show({
                            title: '是否跳过学信网',
                            // 组件除show外的属性
                            onCancel () {
                                this.$vux.confirm.hide()
                            },
                            onConfirm () {
                                _this.$router.push({path:"/bandBank"})
                            }
                        })
                    }
                }
            }
        }
    }

</script>
