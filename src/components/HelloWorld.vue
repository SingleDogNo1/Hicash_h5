<template> </template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
	font-weight: normal;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>

<script>
import { Group, Cell } from "vux";
import { ViewBox } from "vux";
import common from "@/api/common";

//样例
var params = {};
common.ShowPI(params).then(res => {
	console.info("ShowPI res", res);
});

export default {
	components: {
		ViewBox
	}
};
</script>
