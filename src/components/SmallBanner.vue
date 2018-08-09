<template>
    <div class="loan-strategy-body">
        <!-- header -->
        <header  class="credit-header">
            <a class="go-history"  href="javascript:history.go(-1);"></a>
            <h1>借款攻略</h1>
        </header>
        <!-- header -->
        <div class="container">
            
        </div>
    </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
    .loan-strategy-body{
        width: 100%;
        height: auto;
        background-color: #fff;
        .credit-header {
            border: 0;
        }
        .container {
            width: 100%;
            padding-bottom: 0;
            min-height: 100%;
            margin-top: 2.2rem;
        }
    }
</style>

<script type="text/javascript">

    export default {
        data () {
            return {
            }
        },
        ready () {

        },
        methods : {
            getSmallBannerDetail: function(id){
                let _this = this;
                _this.common.getHomePagePic(id)
                .then(function(res){
                    console.info('res.data', res.data);
                });
            }
        },
        mounted: function () {
            let id = this.utils.getQueryString('id');
            this.getSmallBannerDetail(id);
        }
    }
</script>
