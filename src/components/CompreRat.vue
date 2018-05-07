<template>
    <div class="register-body">
        <!-- header -->
        <header  class="credit-header">
            <a class="go-history"  href="JavaScript:history.back(-1)"></a>
            <h1>综合评级FAQ</h1>
        </header>
        <!-- header -->
    </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
    .credit-header {
        border: none;
        .go-history {
            left: .85rem;
        }
        .go-history:before {
            color: #3f3f3f;
        }
        h1 {
            font-size: .75rem;
            height: 2.2rem;
            line-height: 2.2rem;
            font-weight: normal;
            color: #3f3f3f;
            width: 100%;
            text-align: center;
        }
    }
</style>

<script type="text/javascript">
    import { Tab, TabItem, XInput, XButton, Toast, CheckIcon} from 'vux'
    import $ from 'jquery'
    import common from '@/api/common'
    import utils from '@/assets/js/utils'

    export default {
        components: {
            Tab,
            TabItem,
            XInput,
            XButton,
            Toast,
            CheckIcon
        },
        data () {
            return {
            }
        },
        ready () {
        },
        methods: {
        },
        mounted: function () {
            var _this = this;
            common.getImgCode()
                .then((res)=>{
                    // 图片验证码
                    _this.authPic = 'data:image/jpg;base64,' + res.data.authPic;
                    _this.authId = res.data.authId;
                    console.log('res====', res)
                });
            var userName = utils.getCookie("userName");
            var inviteCode = utils.getCookie("inviteCode");
            if(inviteCode){
                _this.inviteCode = inviteCode;
            }
        }
    }
</script>
