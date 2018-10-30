<template>
    <div class="rate-calculation-body">
        <header  class="credit-header">
            <!-- go-history -->
            <a class="go-history" href="javascript:;" @click="goBack"></a>
            <a class="go-history btn-close" href="javascript:;" @click="close"></a>
            <h1>绑定银行卡</h1>
        </header>
        <!-- 绑定银行卡加newbindBank -->
        <section class="bind-bank-wrap">
        	<div class="choose-card-wrap" @click="showPop">
                    <span>银行卡</span>
                    <p class="add-card">{{cardInfo}}</p>
                    <x-icon type="ios-arrow-down" class="right-inco" size="34"></x-icon>
	         </div>
             <div class="perContent">
                <label>姓名</label>
                <span name="realName" class="addName">{{realName}}</span>
            </div>
             <div class="perContent ">
                <label>借记卡号</label>
                <x-input class="card-num" text-align="right" v-model="cardNum" name="cardNum" placeholder="请输入卡号" :show-clear="false">
                </x-input>
            </div>
             <div class="perContent">
                <label>请选择银行</label>
                    <span class="seleContent"></span>
                    <popup-picker :data="bankList" v-model="currentBank" value-text-align="right" :columns="5" @on-change="bankChange" show-name>
                    </popup-picker>
            </div>
            <div class="perContent chooseAdd">
                <label>开户省市</label>
                <router-link class="open-account-province" :to="{name: 'Address', params: {from: 'openAccountProvince'}}">
                    {{openAccountProvince}}
                </router-link>
            </div>
            <!-- 开户网点 -->
            <!--  <div class="perContent netContainer perBot">
             	<div class="netText">
                	<label>开户网点</label>
                    <input  class="seleContent netSelect" id="netSelect" type="search" name="netSelect" />
                     <i class="dropInco"></i>
                 </div>
                    <ul class="netContent mustJudge notNull" id="bankBranch" data-errorMsg="开户网点不能为空">
                    </ul>

            </div> -->
            <div class="perContent lastBankBank" style="display:none;">
                <label>优惠券</label>
                <span name="" class="addName couponName" data-id="0"></span>
            </div>

        </section>
        <!-- 选择银行 -->
        <section class="add-card-pop-mask" v-transfer-dom v-show="show">
            <popup v-model="show">
                <div class="select-card-wrap">
                    <p><x-icon @click="hidePop" type="ios-arrow-left" class="right-inco" size="34"></x-icon>请选择银行卡</p>
                    <ul class="select-card-list">
                        <li><p>中国农业银行6228 **** **** 6870</p></li>
                        <li><span>新增银行卡</span><i></i></li>
                    </ul>
                </div>
            </popup>
        </section>
        <div class="next-step">
            <a href="javascript:;" @click="btnNext">确认</a>
        </div>
        <p class="tips">您的个人隐私将被严格保密，嗨钱网不会泄漏任何您的个人信息</p>
    </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.BandBank{
    .rate-calculation-body{
        width: 100%;
        height: 100%;
        background: #efeff4;
        header {
            .btn-close {
                right: .85rem;
                left: auto;
            }
            .btn-close:before {
                font-family: "iconfont";
                position: absolute;
                content: "\e6a0";
                top: 50%;
                left: 50%;
                font-size: 1rem;
                color: #3f3f3f;
                -webkit-transform: translate(-50%,-50%);
                -moz-transform: translate(-50%,-50%);
                -ms-transform: translate(-50%,-50%);
                -o-transform: translate(-50%,-50%);
                transform: translate(-50%,-50%);
            }
        }
        .bind-bank-wrap {
            padding: 0;
            background-color: #fff;
            padding-left: .85rem;
            margin-bottom: 1.25rem;
            margin-top: 2.2rem;
            .choose-card-wrap {
                height: 2rem;
                line-height: 2rem;
                position: relative;
                border-bottom: 1px solid #dadada;
                span {
                        font-size: .6rem;
                        float: left;
                        color: #3f3f3f;
                        display: inline-block;
                        height: 1.95rem;
                        line-height: 1.95rem;
                        width: 25%;
                }
                .add-card {
                    float: left;
                    padding-right: 0;
                    height: 1.95rem;
                    outline: none;
                    font-size: .6rem;
                    text-align: right;
                    background-color: #fff;
                    width: 64%;
                    color: #999;
                }
                .vux-x-icon {
                    width: 1rem;
                    height: 2rem;
                    fill: #a4a4a4;

                }
            }
            .perContent {
                height: 1.95rem;
                line-height: 1.95rem;
                clear: both;
                overflow: hidden;
                zoom: 1;
                border-bottom: 1px solid #dadada;
                position: relative;
                label {
                    width: 30%;
                    font-size: .6rem;
                    float: left;
                    color: #3f3f3f;
                    display: inline-block;
                    height: 1.95rem;
                    line-height: 1.95rem;
                }
                .addName {
                    position: absolute;
                    width: auto;
                    right: .85rem;
                    height: 1.95rem;
                    line-height: 1.95rem;
                    display: inline-block;
                    text-align: right;
                    font-size: .6rem;
                    color: #3f3f3f;
                }
                .card-num {
                    width: 60%;
                    float: right;
                    height: 1.95rem;
                    outline: none;
                    font-size: .6rem;
                    float: right;
                    padding: 0 .85rem 0 0 !important;
                    background-color: #fff;
                }
                .weui-cell_access {
                    width: 64%;
                    height: 1.95rem;
                    outline: none;
                    font-size: .6rem;
                    float: right;
                    text-align: right;
                    padding: 0 .85rem 0 0 !important;
                    background-color: #fff;
                }
                .weui-cell__ft:after{
                    border-color: #a4a4a4 !important;
                }
                .open-account-province {
                    position: absolute;
                    width: 65%;
                    height: 1.95rem;
                    line-height: 1.95rem;
                    display: inline-block;
                    right: 1.7rem;
                    text-align: right;
                    font-size: .6rem;
                    color: #3f3f3f;
                }
            }
        }
        .next-step {
            width: 100%;
            text-align: center;
            padding-bottom: 1.75rem;
            margin-top: 1.25rem;
            a {
                display: inline-block;
                width: 14.2rem;
                background-color: #333;
                height: 1.875rem;
                border-radius: .15rem;
                font-size: .65rem;
                line-height: 1.875rem;
                color: #fff;
            }
        }
        .tips {
            font-size: .55rem;
            color: #999;
            padding: 0 1rem;
            line-height: .8rem;
            padding-bottom: 1.5rem;
            margin-top: -.6rem;
        }
    }
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
    .add-card-pop-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
        .select-card-wrap {
            width: 94%;
            height: auto;
            background-color: #fff;
            position: fixed;
            bottom: 0;
            padding: 0 .55rem;
            z-index: 9999;
            p {
                height: 2rem;
                line-height: 2rem;
                text-align: center;
                font-size: .6rem;
                color: #3f3f3f;
                border-bottom: 1px solid #dadada;
                position: relative;
                .vux-x-icon-ios-arrow-left {
                    position: absolute;
                    width: 1rem;
                    height: 2rem;
                    display: inline-block;
                    left: 0;
                    fill: #3f3f3f;
                }
            }
            .select-card-list {
                height: 10rem;
                overflow: scroll; 
                li {
                    cursor: pointer;
                    height: 2rem;
                    line-height: 2rem;
                    text-align: center;
                    font-size: .6rem;
                    color: #3f3f3f;
                    border-bottom: 1px solid #dadada;
                    position: relative;  
                    p {
                        height: 2rem;
                        line-height: 2rem;
                        text-align: center;
                        font-size: .6rem;
                        color: #3f3f3f;
                        border-bottom: 1px solid #dadada;
                        position: relative;
                    }
                }
                li:last-child {
                    border-bottom: none;
                    i:before {
                        right: .85rem;
                        font-family: 'iconfont';
                        content: '\e665';
                        color: #ff7640;
                        font-size: .65rem;
                        top: 0;
                        font-style: normal;
                        position: absolute;
                    }
                }
            }
        }
    }
    .vux-popup-header-right {
        color: #FF9900 !important;
    }
    .weui-cell_access .weui-cell__ft {
        padding-right: 18px !important;
    }
    .weui-cell_access .weui-cell__ft:after {
        border-width: 0px 2px 2px 0px !important;
    }
}
</style>

<script type="text/javascript">
    import {XInput, Loading, Confirm, Popup, PopupPicker, TransferDomDirective as TransferDom} from 'vux'
    import $ from 'jquery'
    import common from '@/api/common'
    import utils from '@/assets/js/utils'

    export default {
        directives: {
            TransferDom
        },
        components: {
            XInput,
            Loading,
            Confirm,
            Popup,
            PopupPicker
        },
        data () {
            return {
                dpandoraUrl: '',
                show: false,
                realName: '',
                cardNum: '',
                cardInfo: '新增银行卡',
                currentBank: ['请选择'],
                bankList: [
                    {name: '请选择', value: '0000'},
                    {name: '中国建设银行', value: 'CCB'},
                    {name: '中国工商银行', value: 'ICBC'},
                    {name: '中国银行', value: 'BOC'},
                    {name: '中国农业银行', value: 'ABC'},
                    {name: '中国民生银行', value: 'CMBC'},
                    {name: '广东发展银行', value: 'GDB'},
                    {name: '中国光大银行', value: 'CEB'},
                    {name: '中信银行', value: 'CITIC'},
                    {name: '华夏银行', value: 'HXBC'},
                    {name: '招商银行', value: 'CMB'},
                    {name: '兴业银行', value: 'CIB'},
                    {name: '上海浦东发展银行', value: 'SPDB'},
                    {name: '中国邮政储蓄银行', value: 'PSBC'},
                    {name: '交通银行', value: 'BOCO'},
                    {name: '平安银行', value: 'PAYH'},
                ],
                openAccountProvince: ''
            }
        },
        ready () {

        },
        methods : {
            goBack () {

            },
            close () {

            },
            showPop () {
                this.show = true;
            },
            hidePop () {
                this.show = false;
            },
            btnNext () {
                let errorMsg = "";
            },
            bankChange (val) {
                console.log('val======', val)
                this.currentBank = val;
            }
        },
        mounted: function () {
            common.getOwnData()
                .then((res)=>{
                    function loadPayEgisDidJs(){
                        var _protocol = (("https:" == document.location.protocol) ? "https://" : "http://");
                        var element = document.createElement("script");
                        element.src = _protocol+'pws.payegis.com.cn/did/js/dp.js?appId='+ res.data.appId + '&sessionId='+ res.data.sessionId + '&ts=' + res.data.ts + '&callback=';
                        document.body.appendChild(element);
                    }
                    if(window.addEventListener){
                        window.addEventListener("load",loadPayEgisDidJs,false);
                    }else if(window.attachEvent){
                        window.attachEvent("onload",loadPayEgisDidJs);
                    }else{
                        window.onload=loadPayEgisDidJs;
                    }
                });
            this.realName = unescape(utils.getCookie("realName"))
            console.log('this.realName=====', this.realName)
            if(utils.getCookie("jumpType") != 'bindCard'){
                let params = new URLSearchParams();
                params.append('tempAppNo', utils.getCookie("appFlowNo").split(":")[1]);
                params.append('applyFrom', '03');
                params.append('custType', utils.getCookie("custType"));
                params.append('industryCode', utils.getCookie("industryCode"));
                params.append('node', '09');
                params.append('status', '01');
                common.updateTempAppInfo(params)
                    .then((res)=>{
                    });
            }
            let postData = new URLSearchParams();
            postData.append('uuid', utils.uuid());
            postData.append('userName', utils.getCookie("userName"));
            common.searchBankCard(postData)
                .then((res)=>{
                    let bank = utils.getCookie("bindCardBank") || res.data.bank;
                    let cardNum = utils.getCookie("bindCardNum") || res.data.cardNum;
                    let bankName = utils.getCookie("bindCardBankName") || res.data.bankName;
                    let province = utils.getCookie("bindCardProvince") || res.data.province;
                    let city = utils.getCookie("bindCardCity") || res.data.city;
                    let provinceName = utils.getCookie("bindCardProvinceName") || res.data.provinceName;
                    let cityName = utils.getCookie("bindCardCityName") || res.data.cityName;
                    let area = utils.getCookie("bindCardArea") || res.data.area;
                    let areaName = utils.getCookie("bindCardAreaName") || res.data.areaName;
                    this.cardNum = cardNum;
                    this.cardInfo = bankName + "***" + cardNum.substring(cardNum.length - 4,cardNum.length)
                    if(province && city && provinceName && cityName && area && areaName){
                        this.openAccountProvince = provinceName + '/' + cityName + '/' + areaName;
                    }
                }); 
            common.withHoldBank()
                .then((res)=>{
                    if(res.data.banks){
                        console.log('res.data.banks======', res.data.banks);
                        let bankList = [];
                        for (let i = 0; i < res.data.banks.length; i++) {
                            let bankListItem = {};
                            bankListItem.name = res.data.banks[i].bankName;
                            bankListItem.value = res.data.banks[i].bankCode;
                            bankList.push(bankListItem)   
                        }
                        let defaultArr = [{name: '请选择', value: '0000'}];
                        this.bankList = defaultArr.concat(bankList);
                        console.log('bankList====', bankList)
                        this.currentBank = defaultArr[0].value.split();
                    }
                });
        }
    }

</script>
