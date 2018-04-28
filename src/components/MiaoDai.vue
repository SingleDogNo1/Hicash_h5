<template>
    <div>
        <!-- 评级弹框 171204 -->
        <div class="rate-pop-mask" v-transfer-dom style="display:none">
            <x-dialog v-model="show" class="dialog-demo">
                <div class="img-box">
                </div>
                <div @click="show=false">
                  <span class="vux-close"></span>
                </div>
            </x-dialog>
        </div>
        <!-- 优惠券弹框  171015 -->
        <div class="coupon-pop-mask" v-transfer-dom>
            <popup v-model="show" @on-hide="log('hide')" @on-show="log('show')">
                <div class="popup0">
                  <group>
                    <div>2222</div>
                  </group>
                </div>
            </popup>
        </div>
    </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
    @import '../assets/styles/main.css';
    .weui-dialog {
        width: 11.525rem !important;
        height: 19.3rem !important;
        background-color:transparent !important;
        .img-box {
            width: 100%;
            height: 100%;
            background: url("../assets/images/bg_rate.png") center center no-repeat;
            background-size: cover;
        }
    }
</style>

<script type="text/javascript">
    import {XDialog, XButton, Popup, Group, TransferDomDirective as TransferDom} from 'vux'
    import $ from 'jquery'
    import common from '@/api/common'
    import utils from '@/assets/js/utils'

    export default {
        directives: {
            TransferDom
        },
        components: {
            XDialog,
            XButton,
            Popup,
            Group
        },
        data () {
            return {
                show: true
            }
        },
        ready () {

        },
        methods : {
            onItemClick (index) {
                console.log('on item click:', index)
            },
            switchTabItem (index) {
                console.log('on-before-index-change', index)
                this.$vux.loading.show({
                    text: 'loading'
                })
                setTimeout(() => {
                    this.$vux.loading.hide()
                    this.index01 = index
                }, 1000)
            },
            onItemClick (index) {
                console.log('on item click:', index)
            },
            onSwiperItemIndexChange (index) {
                index === 0 ? this.listType = 'loan' : this.listType = 'notice'
                if(this.listType = 'notice') getSysParam(3, 1);
            },
            loadMore () {
                setTimeout(() => {
                    console.log('page====', page)
                    if(page < countPage){
                        page++;
                        getSysParam(10, page);
                    }
                    setTimeout(() => {
                        console.log(222)
                        this.$refs.scroller.donePullup()
                    }, 10)
                }, 2000)
            },
            refresh () {
              setTimeout(() => {
                this.n = 10
                this.$nextTick(() => {
                  setTimeout(() => {
                    this.$refs.scroller.donePulldown()
                    this.pullupEnabled && this.$refs.scroller.enablePullup()
                  }, 10)
                })
              }, 2000)
            },
            changePullupStatus (enabled) {
              if (enabled) {
                this.$refs.scroller.enablePullup()
                this.pullupEnabled = true
              } else {
                this.$refs.scroller.disablePullup()
                this.pullupEnabled = false
              }
            }
        },
        mounted: function () {
            var _this = this;
            let indexMainPostData = {}
            let uuid = utils.uuid();
            indexMainPostData.requestSource = 'HTML5';
            indexMainPostData.platform = '';
            indexMainPostData.version = '';
            indexMainPostData.uuid = uuid;
            common.getIndexMain(indexMainPostData)
                .then((res)=>{
                    _this.columnList = res.data.columnList;
                    let loanColumnList = _this.columnList.filter((columnListItem) => {
                        console.log('columnListItem====',columnListItem);
                        return columnListItem.productList.length > 0;
                    })
                    console.log('loanColumnList====', loanColumnList[0].productList)
                    let productList = loanColumnList[0].productList;
                    productList = productList.filter((productListItem) => {
                        return productListItem.showStatus === '1';
                    })
                    let x;
                    _this.productList = productList;
                    for (x in _this.productList) {
                        console.log('productList[x]====', productList[x])
                        if(productList[x].industryCode === 'MDCP') {
                            productList[x].jupmUrl = "/newweb/product/miaodai.html";
                            productList[x].iconUrl1 = require("../assets/images/icon_haimiao.png");
                            productList[x].iconUrl2 = require("../assets/images/icon_haimiao_text.png");
                            productList[x].iconUrl3 = require("../assets/images/icon_haimiao_desc.png");
                        } else {
                            productList[x].jupmUrl = "/newweb/product/miaodai.html";
                            productList[x].iconUrl1 = require("../assets/images/icon_network_car.png");
                            productList[x].iconUrl2 = require("../assets/images/icon_network_car_text.png");
                            productList[x].iconUrl3 = require("../assets/images/icon_network_car_desc.png");
                        }
                    }
                    console.log('_this.productList====', _this.productList)
                    let homePagePicPostData = {}
                    homePagePicPostData.cityCode = '000003';
                    homePagePicPostData.uuid = uuid;
                    common.getHomePagePic(homePagePicPostData)
                        .then((res)=>{
                            console.log('res.data====', res.data)
                            _this.bannelList = res.data.bannelList;
                        })
                })
            common.getAllLoanApplication()
                .then((res) => {
                    _this.allLoanApplication = res.data.AllLoanApplication;
                })
        }
    }
</script>
