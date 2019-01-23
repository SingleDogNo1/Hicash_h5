<template>
	<div class="auth-content">
		<page-header
			:title="title"
			:showBack="showBack"
			:showBtnClose="showBtnClose"
			:isShowCloseDialog="false"
			:closeDialogTitle="closeDialogTitle"
			:closeDialogContent="closeDialogContent"
			:closeDialogConfirmText="closeDialogConfirmText"
			:closeDialogCancelText="closeDialogCancelText"
			v-if="platform === 'H5'"
		></page-header>
		<div class="newActive">
			<img src="./images/newHeaderSteats1.png" alt="">
			<ul>
				<li class="active">身份认证</li>
				<li class="">基本信息</li>
				<li class="">信用认证</li>
			</ul>
		</div>
		<section class="creditMain">
			<div class="content front">
				<div class="tips">
					<span class="tipContent">
						身份证正面（卡片完整，字迹清晰）
						<img src="./images/tips.png" alt @click="photoIsShow">
					</span>
				</div>
				<div class="cardImg">
					<div @click="uploadFileInput('ZL02')" v-if="!idCardInfo[0].bigPath" class="idcard-frontal"></div>
					<!-- <form @click="uploadFileInput('ZL02')" v-if="!idCardInfo[0].bigPath">
						<i class="addImg"></i>
						<p>身份证正面</p>
					</form> -->
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
				<div class="tips">
					<span class="tipContent">
						身份证反面（卡片完整，字迹清晰）
						<img src="./images/tips.png" alt @click="photoIsShow">
					</span>
				</div>
				<div class="cardImg">
					<div @click="uploadFileInput('ZL03')" v-if="!idCardInfo[1].bigPath" class="idcard-reverse"></div>
					<!-- <form  @click="uploadFileInput('ZL03')" v-if="!idCardInfo[1].bigPath">
						<i class="addImg"></i>
						<p>身份证反面</p>
					</form> -->
					<img width="100%" height="100%" :src="idCardInfo[1].bigPath" v-if="idCardInfo[1].bigPath">
				</div>
				<ul class="second">
					<li class="idCardTime">
						<span class="title">有效期限</span>
						<span class="val" v-if="idCardInfo[1].faceResult.valid_date_start.result">{{idCardInfo[1].faceResult.valid_date_start.result}}-{{idCardInfo[1].faceResult.valid_date_end.result}}</span>
					</li>
				</ul>
			</div>
			<div class="nextStep">
				<a href="javascript:;" @click="nextStep" id="authNextBtn">下一步</a>
			</div>
		</section>
		<ajax-form class="uploadImgForm" :action="action" :method="method" :enctype="enctype" :responsetype="responsetype" :error="error" :complete="complete">
			<input ref="submit" type="submit" />
			<input ref="fileInput" @change="uploadIdcard" type="file" name="file" :accept="inputAccept">
		</ajax-form>
		<Confirm
		v-model="isShowDialog"
		:title="dialogTitle"
		:confirm-text="confirmText"
		:cancel-text="cancelText"
		:close-on-confirm="false"
		class="confirmDialog"
		@on-confirm="videoIsShow"
		@on-cancel="onCancel"
		>
		<div class="dialog-content">视频校验失败！</div>
		</Confirm>
		<alert v-model="showAlert" class="alertDialog" :title="alertTitle">
		<div class="alertContent">
			<dl v-for="(item, index) in items" :key="index">
			<dt>
				<img :src="item.src" alt>
			</dt>
			<dd>
				<h1>{{ item.title }}</h1>
				<span>{{ item.content }}</span>
			</dd>
			</dl>
		</div>
		</alert>
		<Popup
		v-model="isPopupShow"
		:hide-on-blur="hideOnBlur"
		:width="width"
		:height="height"
		:position="position"
		:show-mask="showMask"
		:hide-on-deactivated="hideOnDeactivated"
		:should-rerender-on-show="shouldRerenderOnShow"
		>
		<div class="video-wrap">
			<div class="v-content">
			<div class="v-title">录制一段自己朗读如下数字的视频</div>
			<div class="first">
				<div class="v-img">
				<img src="./images/selfTimer.png" alt>
				</div>
				<div class="v-tips">
				<p class="tipContent">
					<div>
						请使用
						<span>前置摄像头</span>
					</div>
					<div>
							请用
						<span>普通话</span>
						读
						<span>一遍</span>
					</div>
					<div>
						视频时长
						<span>3-5秒</span>
					</div>
				</p>
				</div>
			</div>
			<div class="v-num">
				<span>{{videoNumber}}</span>
			</div>
			</div>
			<div class="v-notice">
			<span>查看&nbsp;
				<span @click="videoIsShow">拍摄须知</span>
			</span>
			</div>
			<div class="startPlayBtn">
			<form action="">
				<span @click="uploadFileInput('video')">开始录制视频</span>
				<!-- <input type="file" name="file"> -->
			</form>
			</div>
			<div class="exit">
			<span @click="exit">退出验证</span>
			</div>
		</div>
		</Popup>
	</div>
</template>

<style lang="scss" rel="stylesheet/scss">
@import "~bowerComponents/sass-rem/_rem.scss";
.Auth {
  height: rem(800px);
  background: rgb(239, 239, 244);
  .auth-content{
	height: 100%;
    background: #efeff4;
  }
  .newActive {
    width: 100%;
    height: rem(107px);
    background: #fc905c;
    margin-top: rem(55px);
    text-align: center;
    img {
      display: inline-block;
      width: rem(218px);
      height: rem(54px);
      margin-top: rem(16px);
    }
    ul {
      clear: both;
      width: 244px;
      height: rem(20px);
      margin: 0 auto;
	  position: relative;
	  li{
		  	width: 62px;
			font-family: PingFangSC-Regular;
			font-size: rem(14px);
			color: #fff;
			letter-spacing: 0;
			float: left;
			margin-right: rem(26px);
	  }
      li.active {
        color: #333;
      }
      li:last-of-type {
        margin-right: rem(-26px);
      }
    }
  }
  .creditMain {
    width: 100%;
    height: auto;
    padding-top: rem(32px);
    .content {
      width: 100%;
      .tips {
        width: 100%;
        height: rem(21px);
        margin-bottom: rem(20px);
        .tipContent {
          display: inline-block;
          width: 100%;
          height: rem(21px);
          text-align: center;
          font-size: rem(15px);
          font-weight: normal;
          color: #333333;
          letter-spacing: rem(0px);
          line-height: rem(21px);
					opacity: 1;
					
          img {
            display: inline-block;
            position: relative;
            top: 0.12rem;
            width: rem(16px);
            height: rem(16px);
					}
        }
      }
      .cardImg {
        width: rem(207px);
        height: rem(132px);
        background: #ffffff;
        border: 1px solid #dddddd;
        border-radius: 4px;
        margin: auto;
		position: relative;
		.idcard-frontal{
			width: 100%;
			height: 100%;
			background: url('./images/iCardPosit.jpg') no-repeat 50% 50%;
			background-size: 100% 100%;
		}
		.idcard-reverse{
			width: 100%;
			height: 100%;
			background: url('./images/iCardBack.jpg') no-repeat 50% 50%;
			background-size: 100% 100%;
		}
		img{
			object-fit: contain;
		}
        .takeIdcard {
          width: rem(207px);
          height: rem(132px);
          display: inline-block;
          margin-top: 0.141875rem;
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
            padding-top: rem(94px);
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
        width: 100%;
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
        width: 100%;
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
  .confirmDialog {
    .weui-dialog {
      width: rem(270px);
      .weui-dialog__hd {
        padding: 0;
        width: 100%;
        height: 48px;
        line-height: 40px;
        background: #ff7640;
        border-radius: 5px 5px 0px 0px;
        .weui-dialog__title {
          font-family: PingFangSC-Regular;
          font-size: 17px;
          color: #ffffff;
        }
      }
      .weui-dialog__bd {
        .dialog-content {
          padding: 0;
          width: 100%;
          min-height: 40px;
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #333333;
          letter-spacing: -0.08px;
          text-align: center;
          padding-top: 20px;
        }
      }
      .weui-dialog__ft {
        .weui-dialog__btn_default {
          font-family: PingFangSC-Regular;
          font-size: 15px;
          color: #ff7640;
          letter-spacing: -0.36px;
          text-align: center;
        }
        .weui-dialog__btn_primary {
          font-family: PingFangSC-Regular;
          font-size: 15px;
          color: #999999;
          letter-spacing: -0.36px;
          text-align: center;
        }
      }
    }
  }
  .alertDialog {
    .weui-dialog {
      max-width: 100%;
      .weui-dialog__hd {
        padding: 0;
        width: 100%;
        height: rem(21px);
        padding-top: rem(20px);
        .weui-dialog__title {
          display: inherit;
          font-family: PingFangSC-Regular;
          font-size: rem(15px);
          color: #333333;
          letter-spacing: 0;
        }
      }
      .weui-dialog__bd {
        width: 100%;
        padding: 0;
        .alertContent {
          width: 100%;
          dl {
            padding: 24px 20px 0 30px;
            overflow: hidden;
            width: rem(255px);
            height: rem(83px);
            dt {
              float: left;
              width: rem(76px);
              height: rem(80px);
            }
            img {
              width: rem(68.6px);
              height: rem(73.5px);
            }
          }
          dl:last-of-type {
            padding-bottom: rem(37px);
          }
          dd {
            width: rem(165px);
            height: rem(53px);
            text-align: left;
            display: inline-block;
            float: right;
            h1 {
              font-size: rem(17px);
              color: #333333;
              letter-spacing: 0;
              font-weight: normal;
            }
            span {
              line-height: rem(21px);
              font-family: PingFangSC-Regular;
              font-size: rem(15px);
              color: #999999;
              letter-spacing: 0;
              text-align: left;
              display: inline-block;
              margin-top: 8px;
            }
          }
        }
      }
      .weui-dialog__btn {
        font-family: PingFangSC-Regular;
        font-size: rem(15px);
        color: #ff7640;
        letter-spacing: -0.36px;
        text-align: center;
      }
    }
  }
  .vux-popup-dialog {
    background: rgb(239, 239, 244);
	height: calc(100vh - 50px);
    .video-wrap {
      width: rem(345px);
      margin: auto;
      .v-content {
        width: 100%;
        height: rem(375px);
        margin-top: rem(16px);
        text-align: center;
        background: #fff;
        .v-title {
          width: 100%;
          height: rem(24px);
		  text-align: center;
          margin: auto;
          font-family: PingFangSC-Regular;
          font-size: rem(17px);
          color: #333333;
          letter-spacing: -0.41px;
          padding-top: rem(24px);
        }
        .first {
          width: rem(282px);
          height: rem(138px);
          margin: auto;
          margin-top: rem(32px);
          overflow: hidden;
          .v-img {
            width: rem(107px);
            display: inline-block;
            float: left;
            img {
              width: rem(107px);
            }
          }
          .v-tips {
            width: 143px;
            height: rem(95px);
            font-family: PingFangSC-Regular;
            font-size: rem(15px);
            color: #999999;
            letter-spacing: -0.36px;
            text-align: left;
            display: inline-block;
						float: right;
						line-height: rem(37px);
						font-size: rem(15px);
						span{
							display: inline-block;
							padding: 0 5px;
							color: #FF7640;
						}
          }
        }
        .v-num {
          width: rem(259px);
          margin: auto;
          margin-top: rem(24px);
          span {
            display: inline-block;
            width: 100%;
            height: rem(95px);
            font-family: PingFangSC-Semibold;
            font-size: rem(68px);
            color: #ff7640;
            letter-spacing: rem(18px);
            font-weight: normal;
          }
        }
      }
      .v-notice {
        width: 100%;
        height: rem(21px);
        margin: auto;
        font-family: PingFangSC-Regular;
        font-size: rem(15px);
        color: #999999;
        letter-spacing: -0.36px;
        text-align: right;
        margin-top: rem(16px);
        span {
          span {
            font-family: PingFangSC-Regular;
            font-size: rem(15px);
            color: #ff7640;
            letter-spacing: -0.36px;
            line-height: rem(21px);
          }
        }
      }
      .startPlayBtn {
        width: 100%;
        height: rem(44px);
        background: #333333;
        border-radius: 5px;
        text-align: center;
        line-height: rem(40px);
        margin-top: rem(24px);
        position: relative;
        form{
          width: 100%;
          height: rem(44px);
          position: absolute;
          span {
            position: absolute;
            display: inline-block;
            font-family: PingFangSC-Regular;
            font-size: rem(15px);
            color: #ffffff;
            letter-spacing: 0;
            width: rem(90px);
            height: rem(21px);
            left: rem(128px);
          }
          input {
            opacity: 0;
            cursor: pointer;
            width: 100%;
            height: rem(44px);
            outline: none;
          }
        }
      }
      .exit {
        width: 100%;
        height: rem(21px);
        text-align: center;
        margin-top: rem(32px);
        span {
          font-family: PingFangSC-Regular;
          font-size: rem(15px);
          color: #999999;
          letter-spacing: -0.36px;
          display: inherit;
        }
      }
    }
  }
  	.uploadImgForm{
		display: none;
	}
}

</style>

<script>
import { Alert, Popup, Confirm } from "vux";
import PageHeader from "@/components/PageHeader.vue";
import ajaxForm from 'vue2-ajax-form'

export default {
	components: {
		PageHeader,
		ajaxForm,
		Confirm,
		Alert,
		Popup
	}, 
	data() {
		return {
			title: this.$router.history.current.meta.title,
			showBack: true,
			showBtnClose: true,
			platform: this.utils.getPlatform(),
			isShowDialog: false, //录制失败弹出框标识
			dialogTitle: "提示",
			dialogDefaultTitle: "",
			showAlert: false,
			alertTitle: "",
			items: [],
			photoItems: [
				{
				src: require("./images/completeCorner.png"),
				title: "边角完整",
				content: "确认证件完全处于图片内"
				},
				{
				src: require("./images/clearFont.png"),
				title: "字体清晰",
				content: "保证精准对焦，使证件上文字和照片清晰可见"
				},
				{
				src: require("./images/uniformBrightness.png"),
				title: "亮度均匀",
				content: "避免图片出现遮挡光线、反光等情况"
				}
			],
			videoItems: [
				{
				src: require("./images/faceToScreen.png"),
				title: "正对屏幕",
				content: "确认人脸完全处于镜头内"
				},
				{
				src: require("./images/clearOutline.png"),
				title: "轮廓清晰",
				content: "保证精准对焦，使人像清晰可见"
				},
				{
				src: require("./images/videoBrightness.png"),
				title: "亮度均匀",
				content: "避免视频出现遮挡光线、反光等情况"
				}
			],
			confirmText: "如何录制",
			cancelText: "重新录制",
			position: "bottom",
			isPopupShow: false,
			height: "",
			hideOnBlur: false,
			width: "100%",
			showMask: false,
			hideOnDeactivated: false,
			shouldRerenderOnShow: true,
			idCard: '',
			action: '', // ajax 请求地址 (必须)
			method: 'POST', // ajax 请求方法 POST | GET (默认: POST)
			enctype: 'multipart/form-data', // ajax 请求编码 application/x-www-form-urlencoded | multipart/form-data | text/plain (默认: multipart/form-data)
			responsetype: 'json', // ajax 请求数据类型 blob | document | json | text (默认: json)
			uploadType: '',
			inputAccept: 'image/*',
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
			],
			closeDialogTitle: '是否放弃填写',
			closeDialogContent: '信息尚未填写完成，是否放弃申请？现金曾离你这么近，难道就舍它而去？',
			closeDialogConfirmText: '放弃填写',
			closeDialogCancelText: '继续填写',
			videoNumber: '',
			bizNo: '',
			token: ''
		}
	},
	methods: {
		photoIsShow() {
			this.items = this.photoItems;
			this.alertTitle = "证件拍摄须知";
			this.showAlert = true;
		},
		videoIsShow() {
			this.items = this.videoItems;
			this.alertTitle = "视频录制须知";
			this.showAlert = true;
		},
		onCancel () {
			console.log("重新录制")
			this.isShowDialog = false;
			this.isPopupShow = true;
			this.inputAccept = 'video/*';
		},
		nextStep() {
			if(this.idCardInfo[0].bigPath == ''){
				this.$vux.toast.text('请上传正面照', 'middle')
			}else if(this.idCardInfo[1].bigPath == ''){
				this.$vux.toast.text('请上传反面照', 'middle')
			}else{
				let getRandomNumberData = new URLSearchParams();
				getRandomNumberData.append("userName", this.utils.getCookie("userName"));
				getRandomNumberData.append("uuid", this.utils.uuid());
				this.inputAccept = 'video/*';
				this.GetRandomNumber(getRandomNumberData);
			}
		},
		exit() {
			this.inputAccept = 'image/*';
			this.isPopupShow = false;
		},
		uploadFileInput: function(type) {
			this.uploadType = type;
			if(type == 'video'){
				this.action = '/HicashAppService/VerifyVideo?bizNo='+ this.bizNo +'&userName='+ this.utils.getCookie('userName') +'&token='+ this.token +'&uuid=0c8297d7-6d3a-46da-b782-0df2434f88b' + '&randomNum=' + this.videoNumber + '&tempAppNo=' + this.utils.getCookie("appFlowNo").split(":")[1];
			}else{
				this.action = '/HicashAppService/UploadAppPic?imgType='+ this.uploadType +'&userName='+ this.utils.getCookie('userName') +'&tempAppNo='+ this.utils.getCookie("appFlowNo").split(":")[1] +'&uploadType=HTML5&uuid=0c8297d7-6d3a-46da-b782-0df2434f88b'
			}
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
        },
        complete(response) {
			this.$vux.loading.hide();
			if(response.resultCode == '50608'){
				this.$vux.toast.text(response.resultMsg);
				setTimeout(()=>{
					this.$router.push({
						name: "Home"
					});
				}, 2000)
			}else if(response.resultCode != '1'){
				if(this.uploadType=='video'){
					this.exit();
					this.isShowDialog = true;
					return false;
				}
				this.$vux.toast.text(response.resultMsg)
			}else if(response.resultCode == '1'){
				if(this.uploadType=='video'){
					let updateCustCardrData = new URLSearchParams();
					updateCustCardrData.append("userName", this.utils.getCookie("userName"));	//string	用户名
					updateCustCardrData.append("permanentAddressProvince", '000000');			//string	户籍省
					updateCustCardrData.append("permanentAddressCity", '000000');				//string	户籍市
					updateCustCardrData.append("permanentAddressArea", '000000');				//string	户籍区
					updateCustCardrData.append("permanentAddressRaod", this.idCardInfo[0].faceResult.address.result);						//string	户籍详细地址
					updateCustCardrData.append("nation", this.idCardInfo[0].faceResult.nationality.result);										//string	民族
					updateCustCardrData.append("idCardValStartDate", this.idCardInfo[1].faceResult.valid_date_start.result);							//string	身份证有效期开始时间
					updateCustCardrData.append("idCardValEndDate", this.idCardInfo[1].faceResult.valid_date_end.result);							//string	身份证有效期结束时间
					updateCustCardrData.append("identityNo", this.idCardInfo[0].faceResult.idcard_number.result);									//string	身份证号码
					updateCustCardrData.append("idcardFrom", this.idCardInfo[1].faceResult.issued_by.result);									//string	签发机关
					updateCustCardrData.append("name", this.idCardInfo[0].faceResult.name.result);										//string	真实姓名
					this.UpdateCustCard(updateCustCardrData)
				}else {
					let arrIndex = this.uploadType == 'ZL02' ? 0 : 1;
					response.bigPath = this.config.pic_path + response.bigPath
					this.$set(this.idCardInfo,arrIndex,response) 
				}
			}
			
		},
		UpdateTempAppInfo(params){
			this.common.UpdateTempAppInfo(params)
			.then((res)=>{
				console.info('UpdateTempAppInfo', res);
			});
		},
		GetRandomNumber(params){
			this.common.GetRandomNumber(params)
			.then((res)=>{
				console.info('GetRandomNumber', res);
				this.videoNumber = res.data.number;
				this.bizNo = res.data.bizNo;
				this.token = res.data.token;
				this.isPopupShow = true;
			});
		},
		UpdateCustCard(params){
			this.common.UpdateCustCard(params)
			.then((res)=>{
				console.info('GetRandomNumber', res);
				if(res.data.resultCode === '1'){
					let updatePicStatusData = new URLSearchParams();
					updatePicStatusData.append("userName", this.utils.getCookie("userName"));
					updatePicStatusData.append("uuid", "1b5f9201-773b-4d14-8ed5-b9f4c8538730");
					
					this.updatePicStatus(updatePicStatusData);
				}else{
					this.$vux.toast.text(res.data.resultMsg, 'middle')
				}
			});
		},
		updatePicStatus(params){
			this.common.updatePicStatus(params)
			.then((res)=>{
				let data = res.data;
				if(data.resultCode=="1"){
					let custType = this.utils.getCookie("custType");
					let industryCode = this.utils.getCookie("industryCode");
					let hqljb = this.utils.getCookie("hqljb");
					if(industryCode=="DDCP" && hqljb=="1"){
						window.location = this.config.MWEB_PATH + "newweb/creditInfo/editablePage.html?back=1";
					}else if(custType == "KHL2"){
						window.location = this.config.MWEB_PATH + "newweb/creditInfo/collarBaseInfo.html";
					}else{
						window.location = this.config.MWEB_PATH + "newweb/creditInfo/stuBaseInfo.html";
					}
				}else{
					this.$vux.toast.text(data.resultMsg, 'middle')
				}
			})
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
	}
};
</script>