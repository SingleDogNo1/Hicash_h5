<template>
    <div id="app">
        <view-box ref="viewBox">
            <router-view></router-view>
            <tabbar class="vux-demo-tabbar" slot="bottom">
                <tabbar-item :link="{path:'/'}" :selected="$route.path === '/'">
                    <span class="icon-home" slot="icon" style="position:relative;top: -2px;">&#xe637;</span>
                    <span slot="label">首页</span>
                </tabbar-item>
                <tabbar-item :link="{path:'/demo'}">
                    <span class="icon-vip-area" slot="icon" style="position:relative;top: -2px;">&#xe637;</span>
                    <span slot="label">VIP专区</span>
                </tabbar-item>
                <tabbar-item :link="{path:'/demo'}">
                    <span class="icon-broke-promise-area" slot="icon" style="position:relative;top: -2px;">&#xe637;</span>
                    <span slot="label">失信专区</span>
                </tabbar-item>
                <tabbar-item :link="{path:'/personal'}">
                    <span class="icon-me" slot="icon" style="position:relative;top: -2px;">&#xe637;</span>
                    <span slot="label">我的</span>
                </tabbar-item>
            </tabbar>
        </view-box>
    </div>
</template>

<script>
import Home from "./components/Home.vue"
import MiaoDai from "./components/MiaoDai.vue"
export default {
    name: 'App',
    components: {
        Home,
        MiaoDai
    }
}
    console.log('qqqqq')
</script>

<style lang="scss" rel="stylesheet/scss">
    @import './assets/styles/rem.css';
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
        background: rgb(241, 241, 241);
        font-family: 微软雅黑;
    }
    #app {
        width: 100%;
        height: 100%;
    }
    .weui-tabbar {
        background: #fff !important;
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
        width: calc(337px / 2);
        height: calc(255px / 2);
        margin-top: 0.15rem;
        background: url("./assets/images/home_icons.png") calc(-295px /2) calc(-171px / 2) no-repeat;
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
        width: 1rem;
        height: 1rem;
        margin-top: 0.15rem;
        background: url("./assets/images/icon_me.png") center center no-repeat;
        background-size: cover;
    }
    .weui-bar__item_on {
        .icon-home {
            background: url("./assets/images/home_icons.png") calc(-295px /2) calc(-171px / 2) no-repeat;
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
            width: 0.9rem !important;
        }
    }
</style>

