<template>
<div>
    <section class="personal-header-wrap">
        <!-- 用户信息 -->
        <div class="per-user-info">
            <div class="avatar">
                <img :src="avatarImg" alt="" />
            </div>
            <div class="user-id clearfix">
                <p class="per-name">{{realName}}</p>
                <p class="per-num">{{userMobile}}</p>
            </div>
            <p class="current-rating">
                当前评级: {{userGrade}}<a :href="helpLick"><i class="iconfont"> &#xe672;</i></a>
            </p>
        </div>
        <!-- 额度信息 -->
        <div class="money-amount-info clearfix">
            <div class="left-box left">
                <p>近7天待还款(元）</p>
                <span class="perMoney">{{lateTotal}}</span>
            </div>
            <div class="right-box left">
                <p>账户余额（元）</p>
                <span class="balance">{{balance}}</span>
            </div>
        </div>
    </section>
    <group>
        <cell title="我的分期" is-link :border-intent="true" :link="{path:'/personal/myInstalment'}">
            <span class="cell-ico my-money" slot="icon" width="20"></span>
        </cell>
        <cell title="交易明细" is-link :link="transactDetailLink">
            <span class="cell-ico my-details" slot="icon" width="20"></span>
        </cell>
    </group>

    <group>
        <cell title="我的优惠券"  is-link :link="{path:'/personal/MyCoupon'}">
            <span class="cell-ico my-coupon" slot="icon" width="20"></span>
            <badge v-if="newCoupon"></badge>
        </cell>
        <cell title="我的消息" is-link :link="{path:'/personal/MyNews'}">
            <span class="cell-ico my-msg" slot="icon" width="20"></span>
            <badge v-if="newMsg"></badge>
        </cell>
        <cell title="我的邀请" is-link :link="invitePageLink">
            <span class="cell-ico my-invitation" slot="icon" width="20"></span>
            <span class="my-invit-des">{{invitDes}}</span>
            <span class="my-invit-icon"><img :src="invitIcon" /></span>
        </cell>
    </group>

    <group>
        <cell title="关于我们" is-link :link="aboutLink">
            <span class="cell-ico about-us" slot="icon" width="20"></span>
        </cell>
    </group>

    <group v-if="customGroupIsShow">
        <cell :title="customGroupTitle" is-link :link="customGroupLink">
            <img  class="cell-ico" slot="icon" width="20"  :src="customGroupIcon">
        </cell>
    </group>
 
    <page-footer></page-footer>
</div>
</template>



<style lang="scss"rel="stylesheet/scss">
@import "~bowerComponents/sass-rem/_rem.scss";
.PersonIndex{
    background: rgb(239, 239, 244);
    padding-bottom: rem(80px);
    .personal-header-wrap {
        width: 100%;
        height: rem(190px);
        background: url(./images/person_center_bg.png) no-repeat;
        background-size: 100% 100%;
        color: #fff;

        .per-user-info {
            padding: rem(30px 15px);
            position: relative;
            height: rem(40px);

            .avatar {
                width: rem(45px);
                height: rem(45px);
                float: left;

                img {
                    width: 100%;
                    height: 100%;
                }

            }

            .user-id {
                margin-left: rem(10px);
                width: rem(85px);
                float: left;
                font-size: rem(15px);
                color: #fff;
                line-height: rem(15px);

                .per-name {
                    padding-top: rem(5px);
                    margin-bottom: rem(4px);
                }

                .per-num {
                    font-size: rem(13px);
                }

            }

            .current-rating {
                font-size: rem(15px);
                float: right;
                text-align: right;
                a{
                    color: #fff;
                }
            }

        }

        .money-amount-info {
            padding: rem(10px 55px);

            .left-box, .right-box {
                width: 43%;
                font-size: rem(13px);

                span {
                    font-size: rem(24px);
                }

            }

            .left-box {
                position: relative;
                text-align: left;
                padding-right: rem(18px);
            }

            .right-box {
                position: relative;
                padding-left: rem(18px);

                &:before {
                    position: absolute;
                    content: '';
                    width: 2px;
                    height: 1.525rem;
                    background: #fff;
                    left: -1px;
                    top: rem(5px);
                }

            }

        }

        .recharge-btn {
            display: block;
            background: rgba(255, 255, 255, 0.3);
            width: 11.85rem;
            height: 1.4rem;
            font-size: 0.65rem;
            border-radius: 30px;
            color: #fff;
            margin: rem(30px) auto 0;
            text-align: center;
            border: 0;
        }
    }
    .my-invit-des{
        font-size: rem(14px);
        color: #ff7640;
        vertical-align: super;
        margin-right: rem(10px);
    }
    .my-invit-icon{
        width: rem(19px);
        img{
            width: rem(19px);
        }
    }
    .brrow-active{
        background: #fff;
        padding: rem(10px 30px);
        font-size: rem(12px);
        clear: both;
        overflow: hidden;
        zoom: 1;
        border-bottom: 1px solid #dadada;
        .borr-pruduct{
            p{
                color: #a4a4a4;
                span.total-amount{
                    color: #FF7640;
                    float: right;
                    display: inline-block;
                }
            }
        }
        .nopass-tips{
            width: 100%;
            padding-top: rem(10px);
            margin-top:rem(10px);
            border-top: 1px dotted #ccc;
            .nopass-text-tips{
                width: 70%;
                color: #333;
                font-size: rem(10px);
                text-align: justify;
                float: left;
            }
            .btn{
                width: 20%;
                padding: rem(3px 5px);
                background: #ff7640;
                color:#fff;
                float: right;
                border-radius: 5px;
                margin-top: rem(5px);
                display:block;
                .ico{
                    width: 100%;
                    height: rem(20px);
                    display: block;
                    margin: 0 auto;
                }
                .ico-go{
                    background: url(./images/person_center_go.png) 50% 50% no-repeat;
                    background-size: 40%
                }
                .ico-apply{
                    background: url(./images/person_center_apply.png) 50% 50% no-repeat;
                    background-size: 24%
                }
                .title{
                    width: 100%;
                    display: block;
                    text-align: center;
                }
            }
        }
        .contract-btn{
            border: 1px solid #FF7640;
            color: #fff;
            float: right;
            border-radius: 5px;
            background: #FF7640;
            padding: rem(3px 5px);
            font-size: rem(14px);
        }
        .cancel-btn{
            border: 1px solid #FF7640;
            color: #FF7640;
            float: right;
            border-radius: 5px;
            background: #fff;
            padding: rem(3px 5px);
            font-size: rem(14px);
            margin-right: rem(10px);
        }
        .weui-wepay-flow, .weui-wepay-flow-auto {
            padding: rem(20px 10px 40px 10px); 
        }
    }

    .cell-ico {
        width: rem(20px);
        height: rem(24px);
        display: inline-block;
        margin-right: rem(10px);
    }

    .my-money{
        background: url(./images/icon_fenqi.png) no-repeat;
        background-size: 100%;
        background-position-y: rem(4px); 
    }

    .my-details {
        background: url(./images/icon_transaction_details.png) no-repeat;
        background-size: 100%;
        background-position-y: rem(4px); 
    }
    .my-coupon{
        background: url(./images/icon_myBorrow.png) no-repeat;
        background-size: 100%;
        background-position-y: rem(4px); 
    }
    .my-invitation{
        background: url(./images/icon_my_invite.png) no-repeat;
        background-size: 100%;
        background-position-y: rem(4px); 
    }
    .my-msg{
        background: url(./images/icon_my_info.png) no-repeat;
        background-size: 100%;
        background-position-y: rem(4px); 
    }
    .about-us{
        background: url(./images/icon_about_us.png) no-repeat;
        background-size: 100%;
        background-position-y: rem(4px); 
    }


    .weui-cells{
        margin-top: 0;
        margin-bottom: rem(8px);
        font-size: rem(15px);
        color: #333;
    }
    .weui-wepay-flow__li_done .weui-wepay-flow__state,.weui-wepay-flow__process, [class^="weui-wepay-flow__info-"]{
        background-color: #ff7640 !important;
    }
    .weui-wepay-flow__info-bottom:after {
        border-color: transparent transparent #ff7640 transparent  !important;
    }
    .vux-badge-dot{
        padding: 3px;
        margin-top: -4px;
    }
    [class^="weui-wepay-flow__title-"], [class*=" weui-wepay-flow__title-"]{
        font-size: rem(12px);
    }
}
</style>

<script>
import { Cell, CellBox, CellFormPreview, Group, Badge, Flow, FlowState, FlowLine, Toast } from 'vux'
import PageFooter from '@/components/PageFooter'
import axios from 'axios'

export default {
  components: {
    Group,
    Cell,
    CellFormPreview,
    CellBox,
    Badge,
    Flow,
    FlowState,
    FlowLine,
    PageFooter,
    Toast
  },//mobile.length>10?mobile.substring(0,3)+"****"+mobile.substring(7,11):mobile
  data () {
    return {
        realName: this.utils.getCookie('realName'),
        userMobile: this.utils.getCookie('mobile').substring(0,4)+"****"+this.utils.getCookie('mobile').substring(8,11),
        lateTotal: 0.00,
        balance: 0.00,
        accountPays:[],
        flowStateStep:1,
        avatarImg:require('./images/avator_oragin.png'),
        btnTitle: '',
        btnHref: '',
        isDDCP:'',
        refuseMsg:'',
        signButton: false,
        cancelButton: false,
        rechargeButton: false,
        detailButton: false,
		isRefuse: false,
        userGrade: '',
        invitDes:'',
        invitIcon: '',
        customGroupTitle:'',
        customGroupIcon:'',
        customGroupLink:'',
        customGroupIsShow: false,
        brrowLink: this.config.MWEB_PATH + 'newweb/personalCenter/myBrrow.html',
        transactDetailLink: this.config.MWEB_PATH + 'newweb/personalCenter/transactDetail.html',
        myNewslLink: this.config.MWEB_PATH + 'newweb/personalCenter/myNews.html',
        invitePageLink: this.config.MWEB_PATH + 'newweb/personalCenter/invitePage.html',
        aboutLink: this.config.MWEB_PATH + 'newweb/personalCenter/about.html',
        helpLick: this.config.MWEB_PATH + 'newweb/personalCenter/compreRat.html',
        newMsg: false,
        newCoupon: false
    }
  },
  methods: {
	  	getAccountInfo (getAccountInfoDatas){
			this.common.getAccountInfo(getAccountInfoDatas)
			.then((res) => {
                let data = res.data;
                console.info('getAccountInfo', data);
				if(data.resultCode != '1'){
					this.$vux.toast.text(data.resultMsg);
					this.$router.push({path:"/login", query: {redirect: this.$route.fullPath}});
				}else{
					this.realName = data.appUserRealName;       //姓名
					this.lateTotal = data.lateTotal;            //近7天代还款
					this.balance = data.balance;                //账户余额
					this.accountPays = data.accountPays;        //我的分期
					this.userGrade = data.userGrade;			//用户等级

					if(data.headUrl){
						this.avatarImg = data.headUrlPrefix+data.headUrl+"?t="+Math.random();	//用户头像
					}
				}
			});
        },
        OwnPageShow (OwnPageShowData){
            this.common.OwnPageShow(OwnPageShowData)
            .then((res)=>{
                let data = res.data;
                console.info('OwnPageShow data', data);
                this.invitDes = data.inviteMsg;
                this.invitIcon = data.inviteIcon;
                this.customGroupTitle = data.guoXinBaoMsg;
                this.customGroupLink = data.guoXinBaoUrl;
                this.customGroupIcon = data.guoXinBaoIcon;
                this.customGroupIsShow = data.guoXinBaoShow;
            })
        },
        QueryMyMsg (QueryMyMsgData){
            this.common.QueryMyMsg(QueryMyMsgData)
            .then((res)=>{
                let data = res.data;
                this.newCoupon = data.noMsgNum > 0;
            })
        }
	  	
  	},
  	mounted () {
		let getAccountInfoDatas = {
			'userName': this.utils.getCookie("userName"),
			'curPage': 1,
			'maxLine': 1,
			'uuid': this.utils.uuid()
		}
        this.getAccountInfo(getAccountInfoDatas);
        
        let OwnPageShowData = new URLSearchParams();
        OwnPageShowData.append('userName',  this.utils.getCookie("userName"));
        OwnPageShowData.append('uuid', this.utils.uuid());
        this.OwnPageShow(OwnPageShowData);

        let QueryMyMsgData = new URLSearchParams();
        QueryMyMsgData.append('userName',  this.utils.getCookie("userName"));
        QueryMyMsgData.append('uuid', this.utils.uuid());
        QueryMyMsgData.append('curPage', 1);
        QueryMyMsgData.append('maxLine', 1);
        this.QueryMyMsg(QueryMyMsgData);

        let isHaveUnreadCoupon = this.utils.getCookie('isHaveUnreadCoupon');
        if(isHaveUnreadCoupon > 0){
            this.newCoupon = true;
        }
  	}
}
</script>
