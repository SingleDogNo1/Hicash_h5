<template>
    <tabbar class="vux-demo-tabbar footer" slot="bottom">
        <tabbar-item :link="{path:'/'}"  :selected="$route.path === '/'">>
            <span class="icon-home" slot="icon" style="position:relative;top: -2px;">&#xe637;</span>
            <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item :href="sxUrl">
            <span class="icon-broke-promise-area" slot="icon" style="position:relative;top: -2px;">&#xe637;</span>
            <span slot="label">失信专区</span>
        </tabbar-item>
        <tabbar-item :href="personCenterUrl" :show-dot="personCenterDotShow">
            <span class="icon-me" slot="icon" style="position:relative;top: -2px;">&#xe637;</span>
            <span slot="label">我的</span>
        </tabbar-item>
    </tabbar>
</template>

<script type="text/javascript">

    import { Tabbar, TabbarItem, Group, Cell } from 'vux'
    
    export default {
        components: {
            Tabbar,
            TabbarItem,
            Group,
            Cell
        },
        data () {
            return {
                'sxUrl':'',
                'personCenterUrl': '',
                'personCenterDotShow': false
            }
        },
        mounted: function () {
            this.sxUrl = this.config.MWEB_PATH + 'newweb/infoList/list.html';
            this.personCenterUrl = this.config.MWEB_PATH + 'newweb/personalCenter/perCenter.html';
            if(this.$route.path === '/') {
                this.selected = true
            }

            if(this.utils.getCookie('isHaveUnreadCoupon') > '0'){
                this.personCenterDotShow = true;
            }
        }
    }
</script>
