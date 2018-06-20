<template>
    <div class="rate-calculation-body">
        <header class="credit-header">
            <!-- 返回按钮 -->
            <a class="go-history baseInco" href="javascript:;"></a>
            <h1>所在地区</h1>
        </header>
        <ul class="select-adress">
            <li class="provinceNameShow" @click="getProvince" :class="{'active': isShowProvinceActive}" v-if="isShowProvinceTitle" >{{currentProvince}}</li>
            <li class="cityNameShow" @click="changeProvince(provinceItem)" :class="{'active': isShowCityActive}" v-if="isShowCityTitle">{{currentCity}}</li>
            <li class="areaNameShow" @click="changeCity(cityItem)" :class="{'active': isShowAreaActive}" v-if="isShowAreaTitle">{{currentArea}}</li>
        </ul>
        <section class="region">
            <!-- 省 -->
            <div class="selt-province" v-if="isShowProvince">
                <div class="prov-module" v-for="province in provinces">
                    <p>{{province.pinyin}}</p>
                    <ul class="addrs-detail" v-for="provinceItem in province.province">
                        <li v-bind:data-id="provinceItem.provinceCode" @click="changeProvince(provinceItem)">{{provinceItem.provinceName}}</li>
                    </ul>
                </div>
            </div>
            <!-- 市 -->
            <div class="selt-province" v-if="isShowCity">
                <div class="prov-module" v-for="city in citys">
                    <p>{{city.pinyin}}</p>
                    <ul class="addrs-detail" v-for="cityItem in city.city">
                        <li v-bind:data-id="cityItem.cityCode" @click="changeCity(cityItem)">{{cityItem.cityName}}</li>
                    </ul>
                </div>
            </div>
            <!-- 区 -->
            <div class="selt-province" v-if="isShowArea">
                <div class="prov-module" v-for="area in areas">
                    <p>{{area.pinyin}}</p>
                    <ul class="addrs-detail" v-for="areaItem in area.area">
                        <li v-bind:data-id="areaItem.areaCode" @click="changeArea(areaItem)">{{areaItem.areaName}}</li>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
    .rate-calculation-body{
        .credit-header {
            border: 0;
        }
        .select-adress {
            height: 1.875rem;
            line-height: 1.875rem;
            background-color: #fff;
            font-size: .6rem;
            margin-top: 2.2rem;
            border-bottom: 1px solid #dadada;
            padding: 0 .5rem;
            li {
                width: 2.5rem;
                text-align: center;
                color: #3f3f3f;
                float: left;
                height: 1.7rem;
            }
            li.active {
                border-bottom: 4px solid #ff7640;
                color: #ff7640;
            }
        }
        .region {
            .selt-province {
                .prov-module {
                    p {
                        height: 1.15rem;
                        background-color: #efeff4;
                        color: #a4a4a4;
                        font-size: .6rem;
                        line-height: 1.15rem;
                        padding: 0 .85rem;
                    }
                    .addrs-detail {
                        background-color: #fff;
                        li {
                            height: 2rem;
                            line-height: 2rem;
                            font-size: .6rem;
                            color: #3f3f3f;
                            padding: 0 .85rem;
                        }
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
</style>

<script type="text/javascript">
    import {XInput, Group, PopupPicker} from 'vux'
    import $ from 'jquery'
    import common from '@/api/common'
    import utils from '@/assets/js/utils'
    import pinyin from '@/vendor/pinyin'
    console.log('pinyin====', pinyin)

    function makePy(str) {
        if(typeof(str) != "string")
        throw new Error(-1,"函数makePy需要字符串类型参数!");
        var arrResult = new Array();
        //将字符串转码后转为数组
        for(var i=0,len=str.length;i<len;i++)
        {
            var ch = str.charAt(i);
            arrResult.push(checkCh(ch));
        }
        return mkRslt(arrResult);
    }
    function checkCh(ch) {
        var uni = ch.charCodeAt(0);
        //如果不在汉字处理范围之内,返回原字符,也可以调用自己的处理函数
        if(uni > 40869 || uni < 19968)
        return ch; //dealWithOthers(ch);
        //检查是否是多音字,是按多音字处理,不是就直接在strChineseFirstPY字符串中找对应的首字母
        return (pinyin.oMultiDiff[uni]?pinyin.oMultiDiff[uni]:(pinyin.strChineseFirstPY.charAt(uni-19968)));
    }
    function mkRslt(arr) {
        var arrRslt = [""];
        for(var i=0,len=arr.length;i<len;i++)
        {
            var str = arr[i];
            var strlen = str.length;
            if(strlen == 1)
            {
                for(var k=0;k<arrRslt.length;k++)
                {
                    arrRslt[k] += str;
                }
            }
            else
            {
                var tmpArr = arrRslt.slice(0);
                arrRslt = [];
                for(k=0;k<strlen;k++)
                {
                    //复制一个相同的arrRslt
                    var tmp = tmpArr.slice(0);
                    //把当前字符str[k]添加到每个元素末尾
                    for(var j=0;j<tmp.length;j++)
                    {
                        tmp[j] += str.charAt(k);
                    }
                    //把复制并修改后的数组连接到arrRslt上
                    arrRslt = arrRslt.concat(tmp);
                }
            }
        }
        return arrRslt;
    }
    function compare(property){
        return function(a,b){
            var value1 = a[property].charCodeAt();
            var value2 = b[property].charCodeAt();
            return value1 - value2;
        }
    }

    export default {
        components: {
            XInput,
            Group,
            PopupPicker
        },
        data () {
            return {
                isShowProvince: true,
                isShowCity: false,
                isShowArea: false,
                isShowProvinceTitle: true,
                isShowCityTitle: false,
                isShowAreaTitle: false,
                currentProvince: '请选择',
                currentCity: '请选择',
                currentArea: '请选择',
                provinces: [],
                citys: [],
                areas: [],
                isShowProvinceActive: true,
                isShowCityActive: false,
                isShowAreaActive: false,
                provinceItem: '',
                cityItem: ''
            }
        },
        ready () {

        },
        methods : {
            goBack () {
            },
            close () {

            },
            changeProvince (provinceItem) {
                var params = {
                    provinceId: provinceItem.provinceCode
                }
                this.provinceItem = provinceItem;
                this.isShowProvince = false;
                this.isShowCity = true;
                this.isShowarea = false;
                this.isShowCityTitle = true;
                this.isShowProvinceActive = false;
                this.isShowCityActive = true;
                this.isShowAreaActive = false;
                this.currentProvince = provinceItem.provinceName;
                common.getCity(params)
                    .then((res)=>{
                        var citys = [];
                        var sameInitialCitys = [];
                        this.cityList = res.data.city;
                        for (var i = 0; i < this.cityList.length; i++) {
                            var pinyin = '';
                            var cityItem = {};
                            pinyin = makePy(this.cityList[i].cityName)[0].substring(0,1);
                            cityItem.pinyin = pinyin;
                            var index = -1;
                            for (var j = 0; j < citys.length; j++) {
                                if(citys[j].pinyin === pinyin) {
                                    index = 0;
                                    citys[j].city[citys[j].city.length] = {"cityCode": this.cityList[i].cityCode, "cityName": this.cityList[i].cityName, "provinceCode": this.cityList[i].provinceCode};
                                    //return;
                                }
                            }
                            if(index === -1) {
                                cityItem.city = [];
                                cityItem.city[0] = {"cityCode": this.cityList[i].cityCode, "cityName": this.cityList[i].cityName, "provinceCode": this.cityList[i].provinceCode};
                                citys.push(cityItem);
                            }
                        }
                        citys.sort(compare("pinyin"));
                        this.citys = citys;
                    });
            },
            changeCity (cityItem) {
                var params = {
                    cityId: cityItem.cityCode
                }
                this.cityItem = cityItem;
                this.isShowProvince = false;
                this.isShowCity = false;
                this.isShowArea = true;
                this.isShowCityTitle = true;
                this.isShowAreaTitle = true;
                this.isShowProvinceActive = false;
                this.isShowCityActive = false;
                this.isShowAreaActive = true;
                this.currentCity = cityItem.cityName;
                common.getArea(params)
                    .then((res)=>{
                        var areas = [];
                        var sameInitialAreas = [];
                        this.areaList = res.data.area;
                        for (var i = 0; i < this.areaList.length; i++) {
                            var pinyin = '';
                            var areaItem = {};
                            pinyin = makePy(this.areaList[i].areaName)[0].substring(0,1);
                            areaItem.pinyin = pinyin;
                            var index = -1;
                            for (var j = 0; j < areas.length; j++) {
                                if(areas[j].pinyin === pinyin) {
                                    index = 0;
                                    areas[j].area[areas[j].area.length] = {"areaCode": this.areaList[i].areaCode, "areaName": this.areaList[i].areaName, "cityCode": this.areaList[i].cityCode};
                                    //return;
                                }
                            }
                            if(index === -1) {
                                areaItem.area = [];
                                areaItem.area[0] = {"areaCode": this.areaList[i].areaCode, "areaName": this.areaList[i].areaName, "cityCode": this.areaList[i].cityCode};
                                areas.push(areaItem);
                            }
                        }
                        areas.sort(compare("pinyin"));
                        this.areas = areas;
                    });
            },
            changeArea (areaItem) {
                console.log('areaItem=====', areaItem, this.provinceItem, this.cityItem);
                utils.setCookie("chooseAdd", this.provinceItem.proCode + ":" + this.cityItem.cityCode + ":" + areaItem.areaCode);
                utils.setCookie("chooseAddName", this.provinceItem.provinceName + "/" + this.cityItem.cityName + "/" + areaItem.areaName);
                var from = this.$route.params.from;
                console.log('from====', from);
                switch (from) {
                    case 'address':
                        console.log('address------')
                        this.$router.push({path:"/baseInfo", query: {back: from}})
                        break;
                    case 'companyAddress':
                        this.$router.push({path:"/baseInfo", query: {back: from}})
                        break;
                    case 'openAccountProvince':
                        this.$router.push({path:"/bandBank", query: {back: from}})
                        break;
                };
            },
            getProvince () {
                this.isShowProvince = true;
                this.isShowCity = false;
                this.isShowarea = false;
                this.isShowProvinceTitle = true;
                this.isShowProvinceActive = true;
                this.isShowCityActive = false;
                this.isShowAreaActive = false;
                common.getProvince()
                    .then((res)=>{
                        var provinces = [];
                        var sameInitialProvinces = [];
                        this.provinceList = res.data.province;
                        for (var i = 0; i < this.provinceList.length; i++) {
                            var pinyin = '';
                            var provinceItem = {};
                            if(this.provinceList[i].provinceName === "重庆市") {
                                pinyin = "C";
                            } else {
                                pinyin = makePy(this.provinceList[i].provinceName)[0].substring(0,1);
                            }
                            provinceItem.pinyin = pinyin;
                            var index = -1;
                            for (var j = 0; j < provinces.length; j++) {
                                if(provinces[j].pinyin === pinyin) {
                                    index = 0;
                                    provinces[j].province[provinces[j].province.length] = {"provinceCode": this.provinceList[i].provinceCode, "provinceName": this.provinceList[i].provinceName, "proCode": this.provinceList[i].proCode};
                                    //return;
                                }
                            }
                            if(index === -1) {
                                provinceItem.province = [];
                                provinceItem.province[0] = {"provinceCode": this.provinceList[i].provinceCode, "provinceName": this.provinceList[i].provinceName, "proCode": this.provinceList[i].proCode};
                                provinces.push(provinceItem);
                            }
                        }
                        provinces.sort(compare("pinyin"));
                        this.provinces = provinces;
                    });
            }
        },
        mounted: function () {
            this.getProvince();
        }
    }

</script>
