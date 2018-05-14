<template>
    <div class="rate-calculation-body">
        <header  class="credit-header">
            <!-- go-history -->
            <a class="go-history" href="javascript:;" @click="goBack"></a>
            <a class="go-history btn-close" href="javascript:;" @click="close"></a>
            <h1>基本信息</h1>
        </header>
        <div class="authentication-step">
            <img src="../assets/images/base_info_step.png" alt="" />
            <ul>
                <li class="active">身份认证</li>
                <li class="active">基本信息</li>
                <li>信用认证</li>
            </ul>
        </div>
        <p class="step-header">个人信息</p>
        <section class="base-main">
            <div class="person-content">
                <label>姓名</label>
                <x-input v-model="userName" name="userName" placeholder="请输入真实姓名" disabled="true" value="WW">
                </x-input>
            </div>
            <div class="person-content">
                <label>身份证号码</label>
                <x-input v-model="idCard" name="idCard" placeholder="请输入身份证号码" disabled="true" value="WW">
                </x-input>
            </div>
            <div class="person-content">
                <label>婚姻状况</label>
                <popup-picker :data="list" v-model="maritalStatus" value-text-align="right">
                </popup-picker>
            </div>
            <div class="person-content">
                <label>最高学历</label>
                <popup-picker :data="list" v-model="maritalStatus" value-text-align="right">
                </popup-picker>
            </div>
            <div class="person-content">
                <label>现居地址</label>
                <popup-picker :data="list" v-model="maritalStatus" value-text-align="right">
                </popup-picker>
            </div>
            <div class="person-content">
                <label>现居详细地址</label>
                <x-input v-model="userName" name="userName" placeholder="请输入详细地址" disabled="true" value="WW">
                </x-input>
            </div>
            <div class="person-content">
                <label>电子邮箱</label>
                <x-input v-model="userName" name="userName" placeholder="请输入邮箱" disabled="true" value="WW">
                </x-input>
            </div>
            <div class="person-content">
                <label>借款用途</label>
                <popup-picker :data="list" v-model="maritalStatus" value-text-align="right">
                </popup-picker>
            </div>
        </section>
        <!-- 单位信息 -->
        <p class="step-header">单位信息</p>
        <section class="base-main">
            <div class="person-content">
                <label>单位名称</label>
                <x-input v-model="idCard" name="idCard" placeholder="请输入单位名称" disabled="true" value="WW">
                </x-input>
            </div>
            <div class="person-content">
                <label>单位电话（需填写区号）</label>
                <x-input v-model="idCard" name="idCard" placeholder="示例：021-51234567" disabled="true" value="WW">
                </x-input>
            </div>
            <div class="person-content">
                <label>工作年限</label>
                <popup-picker :data="list" v-model="maritalStatus" value-text-align="right">
                </popup-picker>
            </div>
            <div class="person-content">
                <label>单位行业</label>
                <popup-picker :data="list" v-model="maritalStatus" value-text-align="right">
                </popup-picker>
            </div>
            <div class="person-content">
                <label>单位地址</label>
                <popup-picker :data="list" v-model="maritalStatus" value-text-align="right">
                </popup-picker>
            </div>
            <div class="person-content">
                <label>单位详细地址</label>
                <x-input v-model="idCard" name="idCard" placeholder="请输入详细地址" disabled="true" value="WW">
                </x-input>
            </div>
        </section>
    </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
    .rate-calculation-body{
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
        .authentication-step {
            width: 100%;
            height: 4.55rem;
            background-color: #ff7640;
            margin-top: 2.2rem;
            text-align: center;
            img {
                width: 9.325rem;
                height: 2.325rem;
                display: inline-block;
                margin-top: .7rem;
            }
            ul {
                clear: both;
                width: 9.3rem;
                margin: 0 auto;
                position: relative;
                li {
                    float: left;
                    font-size: .6rem;
                    margin-right: 1.12rem;
                    color: #fff;
                }
                li.active {
                    color: #333;
                }
                li:last-child {
                    margin-right: 0;
                    position: absolute;
                    right: -.155rem;
                }
            }
        }
        .step-header {
            height: 1.625rem;
            line-height: 1.625rem;
            color: #3f3f3f;
            font-size: .55rem;
            text-align: left;
            padding-left: .85rem;
            border-bottom: 1px solid #dadada;
        }
        .base-main {
            margin-bottom: 0;
            border-bottom: 1px solid #dadada;
            padding: 0;
            background-color: #fff;
            padding-left: .85rem;
            .person-content {
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
                .weui-cell {
                    padding: 0 !important;
                    input {
                        width: 70%;
                        height: 1.95rem;
                        outline: none;
                        font-size: .6rem;
                        float: right;
                        text-align: right;
                        padding-right: .85rem;
                        background-color: #fff;
                        color: #999;
                    }
                }
                .weui-cell:before {
                    border-top: none !important;
                }
                .weui-cell_access {
                    width: 64%;
                    height: 1.95rem;
                    outline: none;
                    font-size: .6rem;
                    float: right;
                    text-align: right;
                    padding-right: .85rem !important;
                    background-color: #fff;
                    color: #999;
                }
            }
            .person-content:last-child{
                border-bottom: none;
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
</style>

<script type="text/javascript">
    import {XInput, Group, PopupPicker} from 'vux'
    import $ from 'jquery'
    import common from '@/api/common'
    import utils from '@/assets/js/utils'

    export default {
        components: {
            XInput,
            Group,
            PopupPicker
        },
        data () {
            return {
                maritalStatus: ['A'],
                list: [['A', 'B', 'C']]

            }
        },
        ready () {

        },
        methods : {
        },
        mounted: function () {
            var userName = utils.getCookie("userName");
            if(!userName || userName === 'null') {
                this.$router.push({path:"/login", query: {redirect: this.$route.fullPath}});
            }
            let postData = new URLSearchParams();
            postData.append('tempAppNo', utils.getCookie("appFlowNo").split(":")[1]);
            postData.append('applyFrom', '03');
            postData.append('custType', utils.getCookie("custType"));
            postData.append('industryCode', utils.getCookie("industryCode"));
            postData.append('node', '02');
            postData.append('status', '01');
            common.updateTempAppInfo(postData)
                .then((res)=>{
                });
            let params = new URLSearchParams();
            params.append('uuid', '0c8297d7-6d3a-46da-b782-0df2434f88b1');
            params.append('userName', utils.getCookie("userName"));
            common.stuInfoQuery(params)
                .then((res)=>{
                });
        }
    }

</script>
