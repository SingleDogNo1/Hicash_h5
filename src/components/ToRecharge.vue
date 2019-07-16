<template>
	<input
		type="button"
		class="toRecharge btn"
		value="立即还款"
		@click="toRecharge"
	/>
</template>

<style lang="scss" scoped>
.toRecharge {
	width: 100%;
	height: 44px;
	background: #f28bb1;
	color: #fff;
	font-size: 15px;
	display: block;
	border-radius: 5px;
	margin: 0 auto;
	margin-top: 0.5rem;
	border: 0;
}
</style>

<script>
export default {
	props: {
		type: String
	},
	methods: {
		toRecharge: function() {
			if (this.type) {
				if (this.type === 1) {
					_czc.push([
						"_trackEvent",
						"诉讼还款",
						"统计“诉讼详情”页的“立即还款”按钮点击量",
						"",
						"",
						"SSHK"
					])
				} else {
					_czc.push([
						"_trackEvent",
						"仲裁还款",
						"统计“仲裁详情”页的“立即还款”按钮点击量",
						"",
						"",
						"ZCHK"
					])
				}
			} else {
				_czc.push([
					"_trackEvent",
					"查询还款",
					"统计“查询结果页面”的“立即还款”按钮点击量",
					"",
					"",
					"CXHK"
				])
			}

			let appNo = this.$route.query.hyApplicationNo || ""
			let platform = this.utils.getPlatform()
			let userName = this.utils.getCookie("userName")
			if (platform == "APP") {
				window.hicashJSCommunication.onCallApp(
					JSON.stringify({ type: "h5_chargerepay", app_no: appNo })
				)
				return false
			}
			if (userName) {
				let postData = new URLSearchParams()
				postData.append("appNo", appNo)
				postData.append("userName", userName)
				postData.append("uuid", "0c8297d7-6d3a-46da-b782-0df2434f88b1")
				postData.append("requestSource", "H5")
				this.common.navigateToRecharge(postData).then(res => {
					window.location.href = res.data.rechargeUrl
				})
			} else {
				this.$router.push({
					path: "/login",
					query: { from: "shixin", appNo: appNo }
				})
			}
		}
	}
}
</script>
