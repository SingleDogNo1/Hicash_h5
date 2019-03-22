<template>
	<div class="break-promise" v-cloak>
		<page-header
			:title="title"
			:showBack="showBack"
			:showBtnClose="showBtnClose"
		></page-header>
		<div class="content" :class="{ appContent: platform === 'APP' }">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<!-- <swiper :show-desc-mask="false" :auto="true" :show-dots="false" :interval="5000000">
                         <swiper-item class="swiper-demo-img" v-for="(item, index) in hotNews" :key="index">
                            <a class="arrow_box swiper-slide" :href="item.newUrl" :key="index">
                                {{item.title}}
                                <span class="ico" v-if="item.marker && item.marker != ''"><img :src="require('./images/' + item.marker + '-ico.png')" /></span>
                            </a>
                        </swiper-item>
                    </swiper> -->
					<router-link
						class="arrow_box swiper-slide"
						:to="{ name: 'ActivityIntroduction'}"
					>
						<img src="./images/auth-banner-hicash.png" alt="">
					</router-link>
					<div
						class="arrow_box swiper-slide"
						@click.stop="queryCreditUrl({'reportType': 'jd'})"
					>
						<img src="./images/auth-banner-jd.png" alt="">
					</div>
				</div>
			</div>

			<flexbox class="list" :gutter="0" wrap="wrap">
				<flexbox-item :span="1/3" v-for="(item ,  i) in list" :key="i">
					<div @click.stop="queryCreditUrl(item)">
						<img  :src="item.iconUrl" alt="">
						<h4>{{item.reportName}} {{item.status}}</h4>
						<h5 v-if="authStatus" :class="{'uncertified': item.status == '0' ,'certification': item.status == '1'}">{{item.statusFont}}</h5>
					</div>
				</flexbox-item>
			</flexbox>
		</div>
		<p class="des">丰富以上模块信息，构建您的信用体系<br />磐多拉征信提供数据支持</p>
		<page-footer v-if="platform === 'H5'"></page-footer>
	</div>
</template>

<style lang="scss">
@import "~bowerComponents/sass-rem/_rem.scss";
.Inquiry{
	background: #f5f5f5;
	.content {
		width: 100%;
		padding-top: 50px;
		background: #fff;
		.swiper-container {
			width: 100%;
			.arrow_box {
				width: 70%;
				height: auto;
				border-radius: 5px;
				position: relative;
				background: #f5f5f5;
				font-size: 0.65rem;
				display: block;
				color: #333 !important;
				.ico {
					display: block;
					position: absolute;
					top: -2px;
					left: 0;
					img {
						width: 37px;
					}
				}
				img{
					border-radius: 5px;
				}
			}
			.arrow_box:hover {
				color: #333 !important;
			}
			
			.swiper-slide {
				width: 90%;
				height: rem(150px);
				/* Center slide text vertically */
				display: -webkit-box;
				display: -ms-flexbox;
				display: -webkit-flex;
				display: flex;
				-webkit-box-pack: center;
				-ms-flex-pack: center;
				-webkit-justify-content: center;
				justify-content: center;
				-webkit-box-align: center;
				-ms-flex-align: center;
				-webkit-align-items: center;
				align-items: center;
				img{
					width: 100%;
				}
			}
		}
		.list{
			width: 100%;
			margin-top: rem(25px);
			.vux-flexbox-item{
				text-align: center;
				margin-bottom: rem(25px);
				img{
					margin: 0 auto;
					width: rem(70px);
				}
				h4{
					font-size: rem(14px);
					color: #666666;
					letter-spacing: 0;
					margin-top: rem(-6px);
				}
				h5{
					width: rem(54px);
					font-size: rem(12px);
					color: #23BC66;
					letter-spacing: 0;
					padding: rem(3px 0px);
					background: #E7FCEB;
					border-radius: 4px;
					margin: 0 auto;
					margin-top: rem(6px);
					&.uncertified{
						color: #FA741B;
						background: rgba(255,243,236,0.86);
					}
					&.certification{
						color: #34A6EA;
						background: #F0F9FF;
					}
				}
			}
			
		}
	}
	.des{
		margin-top: rem(15px);
		font-size: rem(12px);
		color: #999999;
		letter-spacing: 0.3px;
		text-align: center;
	}
	.appContent {
		padding-bottom: 0;
	}
}
</style>

<script>
import PageHeader from "@/components/PageHeader.vue";
import PageFooter from "@/components/PageFooter.vue";
import Swiper from "swiper";
import { Flexbox, FlexboxItem } from 'vux'

export default {
	components: {
		PageHeader,
		PageFooter,
		Swiper,
		Flexbox, 
		FlexboxItem
	},
	data() {
		return {
			title: this.$route.meta.title,
			showBack: false,
			showBtnClose: false,
			name: "",
			number: "",
			list: [],
			platform: this.utils.getPlatform(),
			userName: this.utils.getCookie('userName') || '',
			authStatus: false
		};
	},
	methods: {
		getUserCreditReports(){
			this.common.getUserCreditReports(this.userName)
			.then(res => {
				let data = res.data.data;
				
				_.each(data, function(v,i){
					if(v.status == '0'){
						data[i].statusFont = '未认证';
					}else if(v.status == '1'){
						data[i].statusFont = '认证中';
					}else if(v.status == '2'){
						data[i].statusFont = '已认证';
					}else{
						data[i].statusFont = '';
					}
				})
				this.list = data;
			});
		},
		queryCreditUrl(item){
			if(!this.userName){

				const params = {
					name: "Login",
					query: {
						redirect: this.$router.history.current.fullPath
					}
				}
				this.$router.push(params);
				return false;

			}
			let _params = {
				"userName": this.userName,
				"creditType": item.reportType
			};

			// let _params = new URLSearchParams();
			// _params.append("userName",this.userName);
			// _params.append("creditType", item.reportType);

			this.utils.setCookie('creditType', item.reportType);

			this.common.queryCreditUrl(_params)
			.then(res => {
				let data = res.data;
				console.info('data', data);
				if(data.userInfo){
					this.$router.push({name: 'PandoraAuth'});
				}else{
					this.$router.push({name: 'IdentityAuth'});
				}
			});
		}
	},
	mounted() {
		var swiper = new Swiper(".swiper-container", {
			pagination: '.swiper-pagination',
			slidesPerView: 'auto',
			centeredSlides: true,
			paginationClickable: true,
			spaceBetween: 10
		});
		
		if(this.userName) this.authStatus = true;

		this.getUserCreditReports();
	}
};
</script>
