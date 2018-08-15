<template>
    <div id="app" :class="[path, platform]">
            <router-view></router-view>
    </div>
</template>

<script>

import Home from "./components/Home.vue"
import MiaoDai from "./components/MiaoDai.vue"

export default {
    name: 'App',
    created(){
        this.jsCommon.setAuthorization();
    },
    components: {
        Home,
        MiaoDai
    },
    mounted () {
        
        this.$router.beforeEach((to, from, next) => {
            this.path = to.name;
            if (to.matched.some(record => record.meta.requireAuth)) {
                var userName = this.utils.getCookie("userName");
                var realName = this.utils.getCookie("realName");
                var mobile = this.utils.getCookie("mobile");

                // 判断该路由是否需要登录权限
                if(!userName || userName=="null"){
                    
                    next({
                        // 将跳转的路由path作为参数，登录成功后跳转到该路由
                        path:'/login', query: {redirect: to.fullPath}
                    })

                }else{

                    next();
                }
            }else {
                next();
            }
        });
    },
    data () {
        return {
            path: this.$route.name,
            platform: this.utils.getPlatform()
        }
    }
}

</script>


<style lang="scss" rel="stylesheet/scss">
    @import './assets/css/common.scss';
    a {
        text-decoration: none;
    }
    html, body {
      height: 100%;
      width: 100%;
      overflow-x: hidden;
    }
    body {
        padding: 0;
        max-width: 640px;
        min-width: 320px;
        margin: 0 auto;
        font-family: 微软雅黑;
    }
    #app {
        width: 100%;
        height: 100%;
    }
    .footer{
        max-width: 640px;
        min-width: 320px;
    }
    .weui-tabbar {
        background: #F9F8F8 !important;
        height: 2.075rem !important;
    }
    .weui-tabbar__label {
        line-height: 1.8 !important;
        font-size: 0.45rem !important;
        margin: 0.2rem !important;
    }
    .weui-tabbar__icon {
        width: 0.72rem !important;
        height: 0.8rem !important;
    }
    .icon-home {
        display: block;
        width: .7rem;
        height: 0.85rem;
        margin-top: 0.2rem;
        background: url("./assets/images/icon_home.png") center center no-repeat;
        background-size: cover;
    }
    .icon-vip-area {
        display: block;
        width: 0.87rem;
        height: 0.88rem;
        margin-top: 0.15rem;
        background: url("./assets/images/icon_vip_area.png") center center no-repeat;
        background-size: cover;
    }
    .icon-broke-promise-area {
        display: block;
        width: 0.8rem;
        height: 0.85rem;
        margin-top: 0.15rem;
        background: url("./assets/images/icon_broke_promise_area.png") center center no-repeat;
        background-size: cover;
    }
    .icon-me {
        display: block;
        width: 0.8rem;
        height: 0.8rem;
        margin-top: 0.15rem;
        background: url("./assets/images/icon_me.png") center center no-repeat;
        background-size: cover;
    }
    .weui-bar__item_on {
        .icon-home {
            background: url("./assets/images/icon_home_act.png") center center no-repeat;
            background-size: cover;
        }
        .icon-vip-area {
            background: url("./assets/images/icon_vip_area_act.png") center center no-repeat;
            background-size: cover;
        }
        .icon-broke-promise-area {
            background: url("./assets/images/icon_broke_promise_area_act.png") center center no-repeat;
            background-size: cover;
        }
        .icon-me {
            background: url("./assets/images/icon_me_act.png") center center no-repeat;
            background-size: cover;
        }
        .weui-tabbar__label {
            color: #FF6700 !important;
        }
    }
    .weui-tabbar__item:last-child {
        .weui-tabbar__icon {
            width: 0.8rem !important;
        }
    }
    .weui-cell:before{
        height: 1px;
    }
</style>

