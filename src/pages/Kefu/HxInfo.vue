<template>
	<div class="content">
		<div class="wrap">
			<h2>用户信息</h2>
			<table cellpadding="0" cellspacing="0" border="1">
				<tr>
					<th>用户名</th>
					<th>{{ userName }}</th>
					<th>真实姓名</th>
					<th>{{ realName }}</th>
					<th>身份证号码</th>
					<th>{{ identityNo }}</th>
					<th>最高学历</th>
					<th>{{ education }}</th>
				</tr>
				<tr>
					<th>现居地址省市区</th>
					<th colspan="2">{{ address }}</th>
					<th>现居详细地址</th>
					<th colspan="4">{{ addressDetail }}</th>
				</tr>
				<tr>
					<th>单位地址省市区</th>
					<th colspan="2">{{ workAddress }}</th>
					<th>单位详细地址</th>
					<th colspan="4">{{ workAddressDetail }}</th>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
export default {
	name: "hxInfo",
	data() {
		return {
			userName: "",
			realName: "",
			identityNo: "",
			education: "",
			address: "",
			addressDetail: "",
			workAddress: "",
			workAddressDetail: ""
		}
	},
	mounted: function() {
		console.log(this.$route.query)
		let visitorImId = this.$route.query.visitorImId
		console.log("visitorImId===", visitorImId)
		// var postData = {
		//   visitorImId: visitorImId
		// }
		let postData = new URLSearchParams()
		postData.append("visitorImId", visitorImId)
		this.common.userInfoHx(postData).then(res => {
			let data = res.data
			let userInfo = new URLSearchParams()
			userInfo.append("userName", data.username)
			userInfo.append("uuid", "0c8297d7-6d3a-46da-b782-0df2434f88b1")
			this.common.UserInfo(userInfo).then(res => {
				let result = res.data
				if (result.resultCode === "1") {
					this.userName = result.userName
					this.realName = result.realName
					this.identityNo = result.identityNo
					//this.education = data.education;
					switch (result.education) {
						case "EDC2":
							this.education = "专科"
							break
						case "EDC3":
							this.education = "本科"
							break
						case "EDC4":
							this.education = "硕士"
							break
						case "EDC5":
							this.education = "博士"
							break
						case "EDC6":
							this.education = "专科以下"
							break
					}
					this.address = result.province_name + result.city_name + result.area_name
					this.addressDetail = result.address
					this.workAddress =
						result.workProvinceName + result.workCityName + result.workAreaName
					this.workAddressDetail = result.workRoad
				} else {
					//alert(result.resultMsg)
				}
			})
		})
	}
}
</script>

<style lang="scss" scoped>
#hxInfo {
	width: 100%;
	height: 100%;
	background: #fff;
	min-width: 980px;
}
.wrap {
	padding-top: 200px;
	max-width: 980px;
	margin: 0 auto;
}
h2 {
	font-size: 18px;
	font-family: PingFangSC-Medium;
	font-weight: 500;
}
table {
	width: 100%;
	height: 128px;
	margin-top: 20px;
	border: 1px solid rgba(238, 238, 238, 1);
}
table tr th {
	height: 22px;
	line-height: 22px;
	font-size: 16px;
	font-family: PingFangSC-Regular;
	font-weight: 400;
	border: 1px solid rgba(238, 238, 238, 1);
	padding: 10px 15px;
}
</style>
