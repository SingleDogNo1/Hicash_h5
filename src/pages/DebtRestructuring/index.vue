<template>
	<div>
		<div class="container" v-if="showPage">
			<div class="bar">
				<span @click="logout">退出登录</span>
			</div>
			<h3>诉前案件债务重组承诺书</h3>
			<p>本人【{{appInfo.userName}}】，身份证号【{{appInfo.idCard}}】，于{{appInfo.applyTime}}通过嗨钱平台申请了一笔贷款，贷款合同号【{{appInfo.appNo}}】，因个人原因未能按时还款，现经充分沟通，对相关债务重组做出如下承诺：</p>
			<b>第一条  债务重组计划</b>
			<p>如本人按照如下债务重组计划按时履行还款义务，相关债权人同意为本人减免除债务重组计划外的所有逾期金额。</p>
			<p>本次债务重组期限为{{appInfo.period}}个月，即{{appInfo.repayStart}}—{{appInfo.repayEnd}}。具体债务重组方案及还款计划如下：</p>
			<table border="1" cellspacing="0">
				<tr>
					<td>期数</td>
					<td>应还款日期</td>
					<td>应还款金额</td>
				</tr>
				<tr v-for="row in appInfo.rows">
					<td>{{row.idx}}</td>
					<td>{{row.paydate}}</td>
					<td>{{row.payamount}}</td>
				</tr>
			</table>
			<b>第二条  还款方式</b>
			<p>本人将按时将应还款金额存入如下指定账户，并及时提供相关银行凭证，供财务核实相关金额是否到账。</p>
			<table border="1" cellspacing="0">
				<tr>
					<td>方式1：对公充值</td>
					<td>方式2：支付宝充值</td>
					<td>方式3：官方网页充值</td>
				</tr>
				<tr>
					<td>账号名称：大同果壳金融信息服务有限公司
						开户行名称：中国民生银行股份有限公司天津白堤路支行
						开 户账号：610006592</td>
					<td>公司名称：大同果壳金融信息服务有限公司
						支付宝账号bd@guolidai.xin</td>
					<td>登录官网m.hicash.cn充值还款</td>
				</tr>
			</table>
			<b>第三条  责任追究</b>
			<p>如果本人再次出现违约的情况，则视为本人放弃诉讼前的和解机会，如相关债权人提起诉讼/仲裁，因此产生的一切法律后果及相关费用将由本人全部承担。</p>
			<div class="pic">
				<img class="pic" src="./upload.png" alt="" v-if="!imgURL">
				<img class="pic" :src="imgURL" alt="" v-else>
				<input v-if="!hasUpload" type="file" @change="selectPic($event)"  accept="image/jpeg,image/x-png">
				<div class="agree" v-if="hasUpload">
					<img src="./agree.png" alt="">
					<p>{{appInfo.responseTime?appInfo.responseTime.substr(0,10):''}}</p>
				</div>

			</div>
			<input v-if="!hasUpload" type="button" :disabled="!imgURL" value="我已阅读以上内容,并同意按照协议规定还款" @click="submit" />
		</div>
		<div class="modal" v-if="showDialog">
			<div>
				<p >登录用户与债务重组用户不一致</p>
				<p>请重新登录</p>
				<p class="confirm" @click="logout">确定</p>
			</div>
		</div>
	</div>
</template>

<script>
	import { getInfo, uploadPic, getPic } from '@/api/debtRestructuring'
	export default {
		name: "index",
		data(){
			return{
				mobile: this.$route.query.mobile,
				appNo: this.$route.query.appNo,
				appInfo: {},
				file:'',
				imgURL: '',
				showPage:false,
				showDialog: false,
				hasUpload: false
			}
		},
		methods:{
			selectPic(e){
			  let files = e.currentTarget.files,file
			  if (files && files.length > 0) {
				  file = files[0];
				  this.file = file;
				  if (file.size > 1024 * 1024 * 5) {
					  alert('图片大小不能超过 5MB!');
					  return false;
				  }
				  var URL = window.URL || window.webkitURL;
				  this.imgURL = URL.createObjectURL(file);
				  console.log(this.file)
			  }
			},
			submit(){
				let params = new FormData();
				params.append("file",this.file)
				uploadPic(this.appNo, params).then((res)=>{
					if(res.data.resultCode === '1'){
						this.hasUpload = true
						alert("上传成功")
					} else {
						alert("上传失败，请稍后重新尝试")
					}
				})
			},
			logout(){
				this.$router.push({name: 'Login', query:{redirect: this.$route.fullPath}})
			},
			getAppInfo(){
				let params = new URLSearchParams();
				params.append("appNo", this.appNo);
				getInfo(params).then((res)=>{
					if(res.data.resultCode === '1'){
						this.appInfo = res.data
						if(res.data.status === 3){
							this.hasUpload = true
							this.imgURL = `/hicash-api-service/ccms/downloadImg/${this.appNo}`
						}
					} else {
						alert("服务器暂时无法响应，请您稍后再试")
					}
				})
			}
		},
		created(){
			let mobile = this.utils.getCookie("mobile");
			if( mobile !==this.mobile){
				this.showDialog = true
			} else {
				this.showPage = true
				this.getAppInfo()
			}
		}
	};
</script>

<style scoped lang="scss">
	.container{
		padding: 10px;
	}

	.bar{
		border-top: 1px solid black;
		border-bottom: 1px solid black;
		margin:0 -10px;
		padding: 0 10px;
		span{
			font-size:14px;
			line-height:30px;
		}
	}

	h3{
		font-size:20px;
		text-align: center;
		line-height:100px;
	}
	b{
		font-size:16px;
		line-height:44px;
	}
	p{
		text-indent:2em;
		font-size:14px;
		line-height:20px;
	}
	table{
		margin: 10px auto;
		width:100%;
		td{
			font-size: 12px;
			width:33%;
			text-align: center;
		}
	}

	img.pic{
		max-width:200px;
		height:150px;
	}
	div.pic{
		margin: 10px auto;
		position: relative;
		input[type='file']{
			display:block;
			width:200px;
			height:150px;
			position:absolute;
			top:0;
			opacity: 0;
		}
		div.agree{
			top:50px;
			right:15px;
			position: absolute;
			transform: rotate(-15deg);
		}
	}
	input[type='button']{
		display:block;
		margin: 10px auto;
		width:90%;
		font-size:14px;
		line-height:44px;
		border-radius: 5px;
		background: #55acee;
		color:#fff;
		border-width: 0;
		&:disabled{
			background: #999999;
		}
	}

	.modal{
		position: fixed;
		top:0;
		bottom:0;
		left:0;
		right:0;
		background: rgba(0,0,0,0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		div{
			width:80%;
			background: #fff;
			border-top-right-radius: 5px;
			border-top-left-radius: 5px;
			padding-top:10px;
			p{
				font-size:14px;
				text-indent: 0;
				text-align: center;
				&.confirm{
					margin-top:20px;
					line-height:44px;
					color:#fff;
					background: rgb(255,111,14);
				}
			}

		}
	}
</style>
