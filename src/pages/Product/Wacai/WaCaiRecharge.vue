<template>
	<div v-cloak>
		<!-- <page-header
      v-if="this.platform!= 'APP'"
      :title="title"
      :showBack="showBack"
      :showBtnClose="showBtnClose"
      :jumpRouteName="jumpRouteName"
      @value="appJump"
    ></page-header> -->
		<div
			id="content"
			class="content"
			:style="{
				'padding-top': this.platform == 'APP' ? 0 : '2.26667rem'
			}"
		>
			<dd>当前应还总金额</dd>
			<group>
				<div class="amount">
					<span class="yuan">￥</span>
					<input type="text" @input="clearNoNum($event)" :value="currentAmt" />
				</div>
			</group>
			<group>
				<cell
					title="还款方式"
					@click.native=";(methodType = true), (arrowDirection = 'right')"
					:border-intent="false"
					is-link
					:arrow-direction="arrowDirection"
					>{{ currentRechargeMenu.label }}</cell
				>
				<cell title="优惠" class="coupon-cell">
					<div v-if="!availableCoupon">
						<span style="color: #999">无可用优惠券</span>
					</div>
					<div
						v-else
						style="display: flex; align-items: center;"
						@click="jumpToCoupon"
					>
						<span class="coupon-amount">{{ couponTotalAmount }}</span>
						<x-icon type="ios-arrow-right" size="18" style="fill: #9d9d9d"></x-icon>
					</div>
				</cell>
				<cell title="实际充值金额（元）" class="actual-recharge-amount">
					<div>
						<span style="color: #FF7640">{{ rechargeAmount }}</span>
					</div>
				</cell>
			</group>
		</div>
		<div class="use-balance">
			<check-icon
				:value.sync="isUseBalance"
				:class="{ disabled: isUseBalanceDisabled }"
				>使用余额</check-icon
			>
			<!--<checker
        v-model="isUseBalance"
        default-item-class="demo1-item"
        selected-item-class="demo1-item-selected"
      >
        <checker-item value="1">使用余额</checker-item>
      </checker>-->
			<div class="right r15" :class="{ disabled: isUseBalanceDisabled }">
				{{ balance }}
			</div>
		</div>
		<p class="notice">当充值金额小于当前应还总金额时，平台优先使用余额部分</p>
		<x-button type="primary" @click.native="confirmRecharge">确认充值</x-button>
		<p class="foot-notcie">客服电话 <span>（400-020-5566）</span></p>
		<actionsheet
			v-model="methodType"
			:menus="menus"
			:show-cancel="true"
			@on-click-menu="clickMenu"
			@on-after-hide="arrowDirection = 'down'"
		>
			<p slot="header">选择付款方式</p>
		</actionsheet>
	</div>
</template>

<script type="text/javascript">
import { Group, Cell, CheckIcon, XButton, Actionsheet } from "vux"
import PageHeader from "@/components/PageHeader.vue"
import RechargePay from "@/api/rechargePay"
import JumpBank from "@/assets/js/jumpBank"
let moment = require("moment")

export default {
	components: {
		Group,
		Cell,
		PageHeader,
		CheckIcon,
		XButton,
		Actionsheet
	},
	data() {
		return {
			title: this.$router.history.current.meta.title,
			showBtnClose: false,
			showBack: true,
			isUseBalance: false,
			isUseBalanceDisabled: false,
			methodType: false,
			arrowDirection: "down",
			menus: [],
			amount: "",
			currentAmt: "",
			oldAmount: "",
			balanceNum: 0,
			rechargeAmount: "",
			currentRechargeMenu: {
				label: "快钱",
				value: "KQ"
			},
			rechargeData: {},
			balance: "0.00",
			totalTerm: "", // 总期数
			term: "", // 当前期数,
			couponAmount:
				this.$route.query.couponAmount && this.$route.query.couponAmount != "null"
					? this.$route.query.couponAmount
					: "",
			couponNum: this.$route.query.couponNum ? this.$route.query.couponNum : "",
			availableCoupon: false,
			couponTotalAmount: "",
			appNo: this.$route.query.appNo ? this.$route.query.appNo : "",
			platform: this.utils.getPlatform(),
			userName: this.utils.getCookie("userName"),
			jumpRouteName: "Recharge",
			couponRuleId: this.$route.query.couponRuleId
				? this.$route.query.couponRuleId
				: ""
		}
	},
	mounted() {
		if (this.platform === "APP") {
			this.setToken()
		} else {
			this.navigateToRecharge()
		}
	},
	methods: {
		// ! 点击选择充值方式
		clickMenu: function(menuKey, menuItem) {
			if (!menuItem) return
			this.currentRechargeMenu = menuItem
		},
		// ! 输入金额数字转换
		clearNoNum: function(obj) {
			obj.currentTarget.value = obj.currentTarget.value.replace(/[^\d.]/g, "") //清除“数字”和“.”以外的字符
			obj.currentTarget.value = obj.currentTarget.value.replace(/\.{2,}/g, ".") //只保留第一个. 清除多余的
			obj.currentTarget.value = obj.currentTarget.value
				.replace(".", "$#$")
				.replace(/\./g, "")
				.replace("$#$", ".")
			obj.currentTarget.value = obj.currentTarget.value.replace(
				/^(\-)*(\d+)\.(\d\d).*$/,
				"$1$2.$3"
			) //只能输入两个小数

			if (
				obj.currentTarget.value.indexOf(".") < 0 &&
				obj.currentTarget.value != ""
			) {
				//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
				obj.currentTarget.value = parseFloat(obj.currentTarget.value)
			}
			this.currentAmt = obj.currentTarget.value
			const lastStr = this.currentAmt.substr(this.currentAmt.length - 1, 1)
			if (this.oldAmount == this.currentAmt || lastStr == ".") {
				return false
			}

			let moneyNum = this.currentAmt - this.balanceNum
			this.rechargeAmount = this.formatMoneyNum(moneyNum)
			this.oldAmount = this.currentAmt
			this.couponAmount = ""
			this.rechargeCoupon()
		},
		navigateToRecharge: function() {
			let postData = new URLSearchParams()
			postData.append("appNo", this.appNo)
			postData.append("requestSource", "H5")
			postData.append("userName", this.userName)
			postData.append("comeFrom", this.platform)
			postData.append("uuid", this.utils.uuid())

			RechargePay.navigateToRecharge(postData).then(res => {
				let data = res.data
				if (data.resultCode === "1") {
					this.balance = data.balance ? data.balance : "0.00"
					this.currentAmt = data.currentAmt ? data.currentAmt : ""
					this.rechargeAmount = data.currentAmt ? data.currentAmt : ""
					this.amount = data.amount ? data.amount : "0.00"
					this.totalTerm = data.totalTerm ? data.totalTerm : ""
					this.term = data.currentTerm ? data.currentTerm : ""
					_.each(data.paymentWays, v => {
						this.menus.push({ label: v.name, value: v.key })
					})
					this.rechargeCoupon()
				} else {
					setTimeout(() => {
						this.$router.push({ name: "Login" })
					}, 1000)
				}
			})
		},
		rechargeCoupon() {
			if (this.couponAmount) {
				this.couponTotalAmount = "-" + this.couponAmount * this.couponNum
				if (this.couponAmount * this.couponNum > 0) {
					this.availableCoupon = true
					this.isUseBalanceDisabled = true
				}
				let rechargeAmount = this.$route.query.rechargeAmount
				this.currentAmt = rechargeAmount
				this.rechargeAmount = rechargeAmount - this.couponAmount * this.couponNum
				return
			}
			let rechargeAmount = this.currentAmt || 0
			if (rechargeAmount === 0) {
				this.rechargeAmount = "0.00"
			}
			let rechargeCouponObj = new URLSearchParams()
			rechargeCouponObj.append("uuid", this.utils.uuid())
			rechargeCouponObj.append("userName", this.userName)
			rechargeCouponObj.append("rechargeAmount", rechargeAmount)
			rechargeCouponObj.append("appNo", this.appNo)
			RechargePay.rechargeCoupon(rechargeCouponObj).then(res => {
				let data = res.data
				if (data.resultCode === "1") {
					if (parseInt(data.isHaveCanUseCoupon) === 0) {
						this.availableCoupon = false
					} else {
						this.availableCoupon = true
						this.couponTotalAmount = "有可用优惠券"
					}
				} else {
					this.$vux.toast.show({
						type: "text",
						position: "middle",
						text: data.resultMsg
					})
				}
			})
		},
		setToken() {
			let userInfoObj = new URLSearchParams()
			userInfoObj.append("userName", this.userName)
			userInfoObj.append("uuid", this.utils.uuid())
			RechargePay.userInfo(userInfoObj).then(res => {
				let data = res.data
				if (data.resultCode == "1") {
					this.utils.setCookie("userName", data.userName)
					this.utils.setCookie("realName", escape(data.realName))
					this.utils.setCookie("mobile", data.mobile)
					this.utils.setCookie("identityCode", data.identityNo)
					this.utils.setCookie("custType", data.custType)
					this.utils.setCookie("isDoubleSales", data.isDoubleSales)
					this.utils.setCookie("inOneMonthReg", data.inOneMonthReg)
					this.utils.setCookie("isLanUserFlag", data.isLanUserFlag)
					this.utils.setCookie("isVip", data.isVip)
				} else {
					this.$vux.toast.show({
						type: "text",
						position: "middle",
						text: data.resultMsg
					})
				}
			})
		},
		appJump(value) {
			//跳转到个人中心
			let obj = { type: "h5_user_center" }
			this.jsCommon.jumpPage(JSON.stringify(obj))
		},
		confirmRecharge() {
			let money = this.rechargeAmount
			let errorMsg = ""
			if (!money) {
				errorMsg = "请填写充值金额"
			} else if (!this.utils.checkNumber(money)) {
				errorMsg = "充值金额非数字"
			} else if (parseFloat(money) > parseFloat(this.amount)) {
				errorMsg = "充值金额不能超过 " + this.amount + " 元"
			}
			if (errorMsg !== "") {
				this.$vux.toast.show({
					type: "text",
					position: "middle",
					text: errorMsg
				})
			}
			this.utils.setCookie("rechargeAmount", this.rechargeAmount)
			this.utils.setCookie("rechargeAppNo", this.appNo)
			window.sessionStorage.setItem("rechargeAmount", this.rechargeAmount)
			window.sessionStorage.setItem("comeFrom", this.platform)
			window.sessionStorage.setItem("rechargeAppNo", this.appNo)
			if (this.couponRuleId) {
				money = this.currentAmt
			}
			var applyRechargeObj = new URLSearchParams()
			applyRechargeObj.append("userName", this.userName)
			applyRechargeObj.append("uuid", this.utils.uuid())
			applyRechargeObj.append("amount", money)
			applyRechargeObj.append("rechargeType", this.currentRechargeMenu.value)
			applyRechargeObj.append("returnUrl", this.utils.getCookie("backUrl"))
			applyRechargeObj.append("couponRuleId", this.couponRuleId)
			applyRechargeObj.append("couponNum", this.couponNum)
			applyRechargeObj.append("appNo", this.appNo)
			applyRechargeObj.append("totalTerm", this.totalTerm)
			applyRechargeObj.append("currentTerm", this.term)
			applyRechargeObj.append("platform", this.$route.query.channel)
			this.$vux.loading.show({
				text: "加载中，请稍等……"
			})
			RechargePay.applyRecharge(applyRechargeObj).then(res => {
				let data = res.data
				this.$vux.loading.hide()
				if (data.resultCode === "1" || data.resultCode === "6014") {
					let map = data.map

					if (data.rechargeType == "UCF") {
						let ucfUrl = map.ucfUrl
						delete map.ucfUrl
						let postData = {
							service: map.service,
							secId: map.secId,
							version: map.version,
							merchantId: map.merchantId,
							sign: decodeURIComponent(map.sign),
							data: decodeURIComponent(map.data),
							reqSn: map.reqSn
						}
						JumpBank.postcall(ucfUrl, postData)
						return
					}

					let url = map.bill99MerUrl
					let h = []
					for (var i in map) {
						if (i !== "bill99MerUrl") {
							if (map[i] !== "") {
								h[h.length] = i + "=" + map[i]
							}
						}
					}
					let orderTimestamp = map.orderTimestamp
					if (!orderTimestamp) {
						window.location = url + "?" + h.join("&")
						return
					}
					if (orderTimestamp && orderTimestamp != "") {
						let orderTimestampFormat = new Date(
							orderTimestamp.substring(0, 4) +
								"-" +
								orderTimestamp.substring(4, 6) +
								"-" +
								orderTimestamp.substring(6, 8) +
								" 00:00:00"
						).getTime()
						let nowTime = moment().format("YYYY-MM-DD 00:00:00")
						let nowTimestamp = parseInt(moment(nowTime).format("x"))
						console.log(orderTimestampFormat, nowTimestamp)
						if (orderTimestampFormat >= nowTimestamp) {
							window.location = url + "?" + h.join("&")
						}
					}
				} else if (data.resultCode === "50120") {
				} else if (data.resultCode === "60100") {
					this.$vux.toast.show({
						type: "text",
						position: "middle",
						text: data.resultMsg
					})
					setTimeout(() => {
						this.$router.push({ name: "Login" })
					}, 1000)
				} else {
					if (data.resultMsg) {
						this.$vux.toast.show({
							type: "text",
							position: "middle",
							text: data.resultMsg
						})
					} else {
						this.$vux.toast.show({
							type: "text",
							position: "middle",
							text: "充值异常"
						})
					}
				}
			})
		},
		formatMoneyNum(moneyNum) {
			if (moneyNum < 0) {
				moneyNum = 0
			}
			if (!/\./.test(moneyNum)) {
				//为整数字符串在末尾添加.00
				moneyNum += ".00"
			}
			return moneyNum
		},
		jumpToCoupon() {
			let moneyNum = parseFloat(this.currentAmt)
			let rechargeAmount = this.formatMoneyNum(moneyNum)
			this.$router.push({
				name: "Coupon",
				query: {
					userName: this.userName,
					rechargeAmount: rechargeAmount,
					source: "1",
					appNo: this.appNo,
					oldCurrentAmt: this.utils.getCookie("oldCurrentAmt")
				}
			})
		}
	},
	watch: {
		isUseBalance: function(val, old) {
			if (val) {
				let moneyNum = this.rechargeAmount - this.balance
				this.rechargeAmount = this.formatMoneyNum(moneyNum)
			} else {
				this.rechargeAmount = this.currentAmt
				this.balanceNum = 0.0
			}
		}
	}
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import "~bowerComponents/sass-rem/_rem.scss";
.WaCaiRecharge {
	color: #3f3f3f;
	background: rgb(241, 241, 241);
	.content {
		padding-left: rem(15px);
		background-color: #fff;
	}
	.appContent {
		padding-top: 0;
	}
	dd {
		font-size: rem(12px);
	}
	.r15 {
		padding-right: rem(15px);
	}
	.amount {
		height: rem(60px);
		line-height: rem(60px);
		font-size: rem(32px);
		display: block;
		border-bottom: 1px solid #d9d9d9;
		.yuan {
			height: rem(60px);
			line-height: rem(60px);
			display: block;
			float: left;
		}
		input {
			height: rem(60px);
			line-height: rem(60px);
			width: 70%;
			border: 0;
			float: left;
		}
	}
	.use-balance {
		display: flex;
		justify-content: space-between;
		margin-top: rem(15px);
		font-size: rem(14px);
		padding-left: rem(15px);
		div {
			color: #ff7640;
		}
		.disabled {
			pointer-events: none;
			color: #999;
		}
	}
	.notice {
		padding: rem(10px 15px);
		font-size: rem(12px);
		color: red;
	}
	.foot-notcie {
		width: 100%;
		text-align: center;
		font-size: rem(12px);
		margin-top: rem(20px);
		span {
			color: #feb948;
		}
	}
	.weui-cells:before {
		border: 0;
	}
	.weui-cells:after {
		border-bottom: 1px solid #dadada;
		transform: inherit;
		border: 0;
	}
	.weui-cell {
		padding: rem(15px);
		padding-left: 0;
		&:before {
			left: 0;
			border-top: 1px solid #dadada;
			transform: inherit;
		}
	}
	.coupon-cell {
		.coupon-amount {
			color: #ff7640;
			margin-right: rem(6px);
		}
	}
	.weui-cells {
		margin-top: 0;
		font-size: rem(14px);
	}
	.weui-cell_access .weui-cell__ft {
		padding-right: rem(20px);
		&:after {
			margin-top: rem(-5px);
		}
	}
	.weui-icon-circle {
		font-size: 18px;
		&:before {
			content: "\EA06";
			color: #dddddd;
		}
	}
	.weui-icon-success {
		font-size: 18px;
		color: #ff7640;
	}
	.weui-btn_primary {
		width: 90%;
		background-color: #333;
		font-size: rem(18px);
		margin-top: rem(10px);
	}
	.weui-btn_primary:not(.weui-btn_disabled):active {
		background-color: darken(#333, 5%);
		color: #fff;
	}
}
.vux-check-icon > .weui-icon-success:before,
.vux-check-icon > .weui-icon-success-circle:before {
	color: #ff7640 !important;
}
.weui-toast_text .weui-toast__content {
	padding-bottom: 12px;
}
</style>
