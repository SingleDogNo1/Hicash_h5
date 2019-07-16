<template>
	<div class="wrapper">
		<canvas id="canvas" :width="width + 'px'" :height="height + 'px'"> </canvas>
	</div>
</template>

<script>
import ProgressRing from "./progressRing.js"
export default {
	name: "progressRing",
	data() {
		return {
			current: 0,
			t: null,
			canvas: null
		}
	},
	props: {
		width: {
			type: Number,
			default: 375
		},
		height: {
			type: Number,
			default: 200
		},
		lineWidth: {
			type: Number,
			default: 5
		},
		complete: {
			type: Boolean,
			default: false
		}
	},
	methods: {},
	watch: {
		current(newVal) {
			this.$emit("change", newVal)
		},
		complete(newVal) {
			if (newVal) {
				window.clearInterval(this.t)
				this.canvas.drawChart(100)
				this.current = 100
			}
		}
	},
	mounted() {
		this.canvas = new ProgressRing({
			selector: "#canvas",
			lineWidth: this.lineWidth
		})
		this.t = window.setInterval(() => {
			if (this.current < 99) {
				this.current++
				this.canvas.drawChart(this.current)
			} else {
				window.clearInterval(this.t)
			}
		}, 1000)
	}
}
</script>

<style scoped lang="scss">
.wrapper {
	position: relative;
	.content {
		position: absolute;
		top: 50%;
		left: 50%;
	}
}
</style>
