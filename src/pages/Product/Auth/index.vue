<template>
	<div class="auth">
		<page-header
			:title="title"
			:showBack="showBack"
			:showBtnClose="showBtnClose"
			v-if="platform === 'H5'"
		></page-header>
		<div class="newActive">
			<img src="./images/newHeaderSteats1.png" alt="">
			<ul>
				<li class="active">身份认证</li>
				<li class="active">基本信息</li>
				<li class="active">信用认证</li>
			</ul>
		</div>
		<section class="creditMain">
			<div class="content front">
				<div class="tips">
					<span class="tipContent">身份证正面（卡片完整，字迹清晰）</span>
					<span class="question">
						<img src="./images/tips.png" alt="">
					</span>
				</div>
				<div class="cardImg">
					<form @click="uploadFileInput('ZL02')" v-if="!idCardInfo[0].bigPath">
						<i class="addImg"></i>
						<p>身份证正面</p>
					</form>
					<img width="100%" height="100%" :src="idCardInfo[0].bigPath" v-if="idCardInfo[0].bigPath">
				</div>
				<ul class="first">
					<li class="idCardName">
						<span class="title">姓名</span>
						<span class="val">{{idCardInfo[0].faceResult.name.result}}</span>
					</li>
					<li class="idCardNo">
						<span class="title">身份证号</span>
						<span class="val">{{idCardInfo[0].faceResult.idcard_number.result}}</span>
					</li>
				</ul>
			</div>
			<div class="content opposite">
				<div class="cardImg">
					<form  @click="uploadFileInput('ZL03')" v-if="!idCardInfo[1].bigPath">
						<i class="addImg"></i>
						<p>身份证反面</p>
					</form>
					<img width="100%" height="100%" :src="idCardInfo[1].bigPath" v-if="idCardInfo[1].bigPath">
				</div>
				<ul class="second">
					<li class="idCardTime">
						<span class="title">有效期限</span>
						<span class="val">{{idCardInfo[1].faceResult.valid_date_start.result}}-{{idCardInfo[1].faceResult.valid_date_end.result}}</span>
					</li>
				</ul>
			</div>
			<div class="nextStep">
				<a href="javascript:;" id="authNextBtn">下一步</a>
			</div>
		</section>
		<ajax-form class="uploadImgForm" :action="action" :method="method" :enctype="enctype" :responsetype="responsetype" :error="error" :complete="complete">
			<input ref="submit" type="submit" />
			<input ref="fileInput" @change="uploadIdcard" type="file" name="file">
		</ajax-form>
		<confirm-dialog
			:isShowDialog="isShowDialog"
			:dialogTitle="dialogTitle"
			:dialogDefaultTitle="dialogDefaultTitle"
			:appNoList="appNoList"
			:popType="popType"
			@showDialog="showDialog"
			:totalAmount="totalAmount"
		></confirm-dialog>
	</div>
</template>

<style lang="scss" rel="stylesheet/scss">
@import "~bowerComponents/sass-rem/_rem.scss";
.auth {
	height: rem(800px);
	background: rgb(239, 239, 244);
	.newActive {
		width: 100%;
		height: rem(107px);
		background: #FC905C;
		margin-top: rem(65px);
		text-align: center;
		img {
			display: inline-block;
			width: rem(218px);
			height: rem(54px);
			margin-top: rem(16px);
		}
		ul {
			clear: both;
			width: rem(220px);
			height: rem(20px);
			margin: 0 auto;
			position: relative;
			.active {
				width: rem(56px);
				font-family: PingFangSC-Regular;
				font-size: rem(14px);
				color: #333333;
				letter-spacing: 0;
				float: left;
				margin-right: rem(26px);
			}
			.active:last-of-type {
				margin-right: rem(-26px);
			}
		}
	}
	.creditMain {
		width: 100%;
		height: rem(560px);
		padding-top: rem(32px);
		.content {
			width: 100%;
			.tips {
				width: 100%;
				height: rem(21px);
				margin-bottom: rem(20px);
				.tipContent {
					display: inline-block;
					width:100%;
					height: rem(21px);
					text-align: center;
					font-size: rem(15px);
					font-weight: normal;
					color: #333333;
					letter-spacing: rem(0px);
					line-height: rem(21px);
					opacity: 1;
				}
				.question {
					display: inline-block;
					position: relative;
					left: rem(308px);
					top: rem(-27px);
					img {
						width: rem(16px);
						height: rem(16px);
					}
				}
			}
			.cardImg {
				width: rem(207px);
				height: rem(132px);
				background: #ffffff;
				border: 1px solid #DDDDDD;
				border-radius: 4px;
				margin: auto;
				position: relative;
				.takeIdcard {
					width: rem(207px);
					height: rem(132px);
					display: inline-block;
					margin-top: .141875rem;
					object-fit: contain;
				}
				form {
    				width: rem(207px);
					height: rem(132px);
					position: absolute;
					i {
						width: rem(43px);
						height: rem(43px);
						display: inline-block;
						position: absolute;
						left: 50%;
						top: 50%;
						margin-left: rem(-207px/2);
						margin-top: rem(-132px/2);
					}
					p {
						width: rem(207px);
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #999999;
						letter-spacing: 0;
						text-align: center;
						padding-top: 94px;
						position: absolute;
						display: inline-block;
					}
					input {
						width: rem(207px);
						height: rem(132px);
						outline: none;
						opacity: 0;
						cursor: pointer;
						position: absolute;
					}
				}
			}
			ul {
				margin-top: rem(30px);
				margin-bottom: rem(35px);
				width: rem(375px);
				height: rem(96px);
				background: #fff;
				padding-left: rem(15px);
				li {
					width: 100%;
					height: rem(47px);
					background-color: #fff;
					font-size: rem(15px);
					color: #333333;
					clear: both;
					.title {
						width: 30%;
						height: rem(47px);
						line-height: rem(47px);
						display: block;
						float: left;
						text-align: left;
					}
					.val {
						width: calc(70% - rem(10px));
						height: rem(47px);
						line-height: rem(47px);
						display: block;
						float: right;
						text-align: right;
						padding-right: rem(30px);
					}
				}
				.idCardName {
					border-bottom: 1px solid #ddd;
				}
			}
			.second {
				border: none;
				margin-top: rem(24px);
				margin-bottom: rem(30px);
				width: rem(375px);
				height: rem(47px);
				background: #fff;
			}
		}
		.nextStep {
			width: 100%;
			height: rem(44px);
			margin-bottom: rem(30px);
			border-radius: 5px;
			text-align: center;
			a {
				display: inline-block;
				width: rem(345px);
				background-color: #333333;
				height: rem(44px);
				border-radius: rem(5px);
				font-size: rem(15px);
				line-height: rem(44px);
				color: #fff;
			}
		}
	}
	.uploadImgForm{
		display: none;
	}
}
</style>

<script>
// import {} from "vux";
import PageHeader from "@/components/PageHeader.vue";
import ConfirmDialog from "@/components/Dialog.vue";
import ajaxForm from 'vue2-ajax-form'

export default {
	components: {
		PageHeader,
		ConfirmDialog,
		ajaxForm
	}, 
	data() {
		return {
			title: this.$router.history.current.meta.title,
			showBack: true,
			showBtnClose: true,
			platform: this.utils.getPlatform(),
			isShowDialog: false,
			dialogTitle: "提示",
			popType: "rechargePop",
			dialogDefaultTitle: "",
			appNoList: [],
			totalAmount: "视频校验失败！",
			idCard: '',
			action: 'aaa', // ajax 请求地址 (必须)
			method: 'POST', // ajax 请求方法 POST | GET (默认: POST)
			enctype: 'multipart/form-data', // ajax 请求编码 application/x-www-form-urlencoded | multipart/form-data | text/plain (默认: multipart/form-data)
			responsetype: 'json', // ajax 请求数据类型 blob | document | json | text (默认: json)
			uploadType: '',
			idCardInfo:[
				{
					bigPath: '',
					faceResult:{
						name:{
							result: ''
						},
						idcard_number:{
							result: ''
						}
					}
				},
				{
					bigPath: '',
					faceResult:{
						valid_date_end:{
							result: ''
						},
						valid_date_start:{
							result: ''
						}
					}
				}
			]
		}
	},
	methods: {
		showDialog: function(showDialog) {
			this.isShowDialog = showDialog;
		},
		uploadFileInput: function(type) {
			this.uploadType = type;
			this.action = '/HicashAppService/UploadAppPic?imgType='+ this.uploadType +'&userName='+ this.utils.getCookie('userName') +'&tempAppNo='+ this.utils.getCookie("appFlowNo").split(":")[1] +'&uploadType=HTML5&uuid=0c8297d7-6d3a-46da-b782-0df2434f88b'
			this.$refs.fileInput.click();
		},
		uploadIdcard: function(e) {
			let fileFize = e.target.files[0].size;
			if(fileFize > 10485760){
				this.$vux.toast.text('上传图片不得大于10M', 'middle')
				return false;
			}
			console.info('this.uploadType', this.uploadType);
			console.info('this.action', this.action);
			this.$vux.loading.show({
				text: '加载中，请稍等……',
				position: 'absolute'
			})
			this.$refs.submit.click();
		},
		error(err) {
            console.log(err)
            // ajax请求出现错误
        },
        complete(response) {
			this.$vux.loading.hide();
			let arrIndex = this.uploadType == 'ZL02' ? 0 : 1;
			response.bigPath = this.config.pic_path + response.bigPath
			// this.idCardInfo[arrIndex] = response;
			this.$set(this.idCardInfo,arrIndex,response) 
			console.log('this.idCardInfo', this.idCardInfo)
			console.info('this.idCardInfo[arrIndex]', this.idCardInfo[arrIndex]);
            // ajax请求完成
		},
		UpdateTempAppInfo(params){
			this.common.UpdateTempAppInfo(params)
			.then((res)=>{
				console.info('UpdateTempAppInfo', res);
			});
		}
	},
	mounted() {
		let updateTempAppInfoData = new URLSearchParams();
		updateTempAppInfoData.append("tempAppNo", this.utils.getCookie("appFlowNo").split(":")[1]);
		updateTempAppInfoData.append("applyFrom", '03');
		updateTempAppInfoData.append("custType", this.utils.getCookie("custType"));
		updateTempAppInfoData.append("industryCode", this.utils.getCookie("industryCode"));
		updateTempAppInfoData.append("node", '01');
		updateTempAppInfoData.append("status", '05');
		this.UpdateTempAppInfo(updateTempAppInfoData);
	},
	watch:{
		idCard: function(val, oldVal){
			console.info(val, oldVal);
		}
	}
};
</script>
