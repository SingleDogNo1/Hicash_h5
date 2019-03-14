<template>
	<div>
		<x-header
		:left-options="{
			backText: '',
			showBack: showBack,
			preventGoBack: preventGoBack
		}"
			@on-click-back="jump"
			>{{ title }}<a @click="isShowDialog=true" class="btn-close" slot="right" v-if="showBtnClose"></a
		></x-header>
		<Confirm
			v-model="isShowDialog"
			:title="closeDialogTitle"
			:confirm-text="closeDialogConfirmText"
			:cancel-text="closeDialogCancelText"
			@on-confirm="closePage"
			class="confirmDialog"
			>
			<div class="dialog-content">{{closeDialogContent}}</div>
		</Confirm>
	</div>
</template>

<style lang="scss" scoped>
.vux-header {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	background-color: #fff;
	z-index: 100;
	/deep/ .vux-header-left {
		/deep/ .left-arrow:before {
			border-left: 1px solid #333;
			border-top: 1px solid #333;
		}
	}
	/deep/ .vux-header-title {
		height: 1.955556rem /* 44/22.5 */;
		line-height: 1.955556rem /* 44/22.5 */;
		color: #333;
	}
	/deep/ .vux-header-right {
		right: 0.444444rem /* 10/22.5 */;
	}
	.btn-close:before {
		font-family: "iconfont";
		position: absolute;
		content: "\e6a0";
		top: 0.444444rem /* 10/22.5 */;
		right: 0;
		font-size: 0.85rem;
		color: #3f3f3f;
		-webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		-o-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}
}
.confirm-dialog {
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
          height: 88px;
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #333333;
          letter-spacing: -0.08px;
          text-align: center;
          line-height: 88px;
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
</style>

<script>
import { XHeader, Confirm } from "vux";
export default {
	props: {
		title: String,
		showBack: Boolean,
		showBtnClose: Boolean,
		isShowCloseDialog: Boolean,
		closeDialogTitle: String,
		closeDialogContent: String,
		closeDialogConfirmText: String,
		closeDialogCancelText: String,
		jumpRouteName: String,
		closeJumpRouteName: String,
		query: Object
	},
	components: {
		XHeader,
		Confirm
	},
	data() {
		return {
			preventGoBack: false,
			isShowDialog: this.isShowCloseDialog
		};
	},
	methods: {
		jump: function() {
			if (this.jumpRouteName == 'popOutAuth') {
				this.$emit("onDiologStatus", this.jumpRouteName);
			}else if (this.jumpRouteName) {
				
				const params = {
					name: this.jumpRouteName,
				}

				if(!_.isEmpty(this.query)){
					params.query = this.query;
				}

				this.$router.push(params);
			}
		},
		closePage: function(params) {
			this.$router.push({name:'Home'});
		}
	},
	mounted() {
		this.preventGoBack = this.jumpRouteName ? true : false;
	}
};
</script>
