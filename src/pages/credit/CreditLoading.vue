<template>
	<div class="content" :class="{ contents: platform === 'APP' }">
		<page-header
			:title="title"
			:showBack="showBack"
			:showBtnClose="showBtnClose"
			:jumpRouteName="'Inquiry'"
			v-if="platform === 'H5'"
		></page-header>
		<div class="box">
			<div class="box-top">
				<div class="warn">
					<!-- <img
            src="data:image/png;base64,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"
          > -->
					<span class="icon iconfont">&#xe605;</span>
					<!-- <progress-ring :complete="complete"/> -->
				</div>
				<div class="tips">
					报告生成需要一点时间，成功后立即告诉您 <br />推荐您先看看别的～
				</div>
			</div>
			<div class="btn-box">
				<div class="authentication" v-show="isDisappear">
					<p class="recommend">推荐：{{ msg }}认证</p>
					<div class="btn">
						<button class="buttons waiting" @click="isWait()">继续等待</button>
						<button class="buttons go_authentication" @click="goAuthentication()">
							去认证
						</button>
					</div>
				</div>
				<div class="authentication no" v-show="!isDisappear">
					<div class="btn">
						<button class="buttons waiting" @click="isWait()">继续等待</button>
						<button class="buttons go_authentication" @click="others()">
							看看别的
						</button>
					</div>
				</div>
			</div>
		</div>
		<!-- <div class="dialog" v-show="isShowDialog">
      <h3>报告获取成功</h3>
      <p class="dialog-p">新鲜的报告已经准备好了，快来看看</p>
      <div class="dialog-btn">
        <button class="cancel buttons" @click="isShowDialog=false">取消</button>
        <button class="confirm buttons" @click="confirm()">看报告</button>
      </div>
    </div>-->
	</div>
</template>
<script>
import PageHeader from "@/components/PageHeader.vue"
// import ProgressRing from "@/components/ProgressRing";
export default {
	components: {
		PageHeader
		// ProgressRing
	},
	data() {
		return {
			userName: this.utils.getCookie("userName"),
			// complete: false,
			title: "征信报告",
			showBack: true,
			showBtnClose: false,
			isDisappear: false,
			msg: "",
			// isShowDialog: true,
			report: "",
			creditType: "",
			platform: this.utils.getPlatform()
		}
	},
	mounted() {
		this.updateUserCreditReportStatus()
	},
	methods: {
		// confirm() {
		// switch (this.utils.getCookie("creditType")) {
		//   case "operator":
		//     this.report = "operator";
		//     break;
		//   case "jd":
		//     this.report = "jingdong";
		//     break;
		//   case "helloBike":
		//     this.report = "Haluo";
		//     break;
		//   case "eleme":
		//     this.report = "Eleme";
		//     break;
		// }
		//   this.$router.push({ name: this.report });
		// },
		isWait() {
			// 继续等待
			// this.CheckCreditResult();
			window.location.reload()
			// this.isShow = false;
		},
		updateUserCreditReportStatus() {
			// 改变状态
			let obj = {}
			obj.userName = this.userName
			obj.reportType = this.utils.getCookie("creditType")
			this.common.UpdateUserCreditReportStatus(obj).then(() => {
				this.getUserCreditReports()
			})
		},
		goAuthentication(val) {
			this.utils.setCookie("creditType", this.creditType)
			// 去认证
			let obj = {}
			obj.userName = this.userName
			obj.creditType = this.creditType

			this.common.queryCreditUrl(obj).then(res => {
				let data = res.data
				// console.info("data", data);
				// console.log(this.$router)
				if (data.userInfo) {
					this.$router.push({ name: "PandoraAuth" })
				} else {
					this.$router.push({ name: "IdentityAuth" })
				}
			})
		},
		// CheckCreditResult() {
		// let obj = {};
		// obj.userName = this.utils.getCookie("userName");
		// obj.creditType = this.utils.getCookie("creditType");
		// let checkCreditResultTimer = setInterval(() => {
		//   this.common.CheckCreditResult(obj).then(res => {
		//     if (res.data.data.status == 2) {
		//       clearInterval(checkCreditResultTimer);
		//       // this.isShowDialog = true;
		//     }
		//     if(res.data.resultCode==-1){
		//       this.$router.push({name:"FailedLoad"})
		//     }
		//   });
		// }, 5000);
		// },
		getUserCreditReports() {
			//获取征信状态列表
			if (this.userName) {
				this.common.getUserCreditReports(this.userName).then(res => {
					// console.log(res.data);
					let arr = res.data.data
					let arr1 = []
					arr.map(item => {
						if (item.status == 0) {
							arr1.push(item)
							this.isDisappear = true
						}
						if (item.reportName == "饿了么") {
							item.reportName = "饿了么外卖"
						}
					})
					if (arr1.length != 0) {
						let number = Math.round(Math.random() * (arr1.length - 1))
						this.msg = arr1[number].reportName //随机推荐
						this.creditType = arr1[number].reportType
					}
				})
			}
		},
		others() {
			//看看别的
			this.$router.push({ name: "Inquiry" })
		}
	}
	// mounted() {
	//   // setTimeout(() => {
	//   //   this.complete = true;
	//   // }, 2000);
	// }
}
</script>
<style lang="scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";
@import "./fonts/iconfont.scss";

.iconfont {
	color: #ff7640;
	font-size: rem(66px);
}
.content {
	font-family: PingFangSC-Medium;
	padding-top: 2.2rem;
	width: 100%;
	height: auto;
	min-height: 100%;
	overflow-y: auto;
	background: rgb(241, 241, 241);
	.box {
		.box-top {
			background: #fff;
			padding-bottom: rem(60px);
			padding-top: rem(60px);
			.warn {
				width: rem(66px);
				height: rem(66px);
				margin: 0 auto;
				img {
					width: 100%;
				}
			}
			.tips {
				font-size: rem(15px);
				color: #666666;
				letter-spacing: rem(0.38px);
				text-align: center;
				line-height: rem(30px);
				margin-top: rem(36px);
			}
		}
		.btn-box {
			.authentication {
				margin-top: rem(10px);
				background: #fff;
				padding-top: rem(32.6px);
				padding-bottom: rem(32px);
				.recommend {
					text-align: center;
					font-size: rem(18px);
					color: #ff7640;
					letter-spacing: rem(0.45px);
					line-height: rem(25px);
					margin-bottom: rem(24px);
				}
				.btn {
					width: rem(282px);
					display: flex;
					justify-content: space-around;
					margin: 0 auto;
					.buttons {
						border-radius: 6px;
						font-size: rem(14px);
						letter-spacing: rem(0.35px);
						text-align: center;
						width: rem(125px);
						height: rem(35px);
						line-height: rem(35px);
						border: 1px solid #ff7640;
					}
					.waiting {
						background: #fff;
						color: #ff7640;
					}
					.go_authentication {
						background: #ff7640;
						color: #ffffff;
					}
				}
			}
			.no {
				margin-top: 0;
				padding-top: 0;
			}
		}
	}
	// .dialog {
	//   position: absolute;
	//   left: 0;
	//   right: 0;
	//   top: 0;
	//   bottom: 0;
	//   margin: auto;
	//   height: rem(180px);
	//   width: 80%;
	//   background: #fff;
	//   text-align: center;
	//   border: 1px solid #666;
	//   border-radius: rem(10px);
	//   h3 {
	//     font-size: rem(18px);
	//     color: #444;
	//     margin-top: rem(28px);
	//     letter-spacing: rem(0.38px);
	//   }
	//   .dialog-p {
	//     font-size: rem(15px);
	//     line-height: rem(60px);
	//     color: #666666;
	//     letter-spacing: rem(0.38px);
	//     text-align: center;
	//   }
	//   .dialog-btn {
	//     display: flex;
	//     justify-content: space-around;
	//     margin: 0 auto;
	//     .buttons {
	//       border-radius: 6px;
	//       font-size: rem(14px);
	//       letter-spacing: rem(0.35px);
	//       text-align: center;
	//       width: rem(100px);
	//       height: rem(35px);
	//       line-height: rem(35px);
	//       border: 1px solid #ff7640;
	//     }
	//     .cancel {
	//       background: #fff;
	//       color: #ff7640;
	//     }
	//     .confirm {
	//       background: #ff7640;
	//       color: #ffffff;
	//     }
	//   }
	// }
}
.contents {
	padding-top: 0;
}
</style>
