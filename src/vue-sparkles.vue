<template>
  <div id="sparkleWrapper" ref="wrapper" class="vue-sparkles">
    <div class="sparkleChildWrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Vue, {ref} from "vue";
import SparkleInstance from "./sparkle-instance.vue";

export default {
	name: "VueSparkles",
	props: {
		path: [String, Array],
		color: [String, Array]
	},
	setup(props) {
		const parent = ref(null);

		function addSparkle () {
			// Setting Path Values
			const sparklePath = (Array.isArray(props.path) ? props.path[random(0, props.path.length - 1)] : (props.path ?? "M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"));

			// Setting Color Values
			const sparkleColor = (Array.isArray(props.color) ? "hsl(" + random(parseInt(props.color[0].h), parseInt(props.color[1].h)) + "deg, " + random(parseInt(props.color[0].s), parseInt(props.color[1].s)) + "%, " + random(parseInt(props.color[0].l), parseInt(props.color[1].l)) + "%)" : (props.color ?? "hsl(50deg, 100%, 50%)"));

			const sparkle = generateSparkle();
			var SparkleClass = Vue.extend(SparkleInstance);
			var instance = new SparkleClass({
				propsData: {
					color: sparkleColor,
					size: sparkle.size,
					appliedStyle: sparkle.style,
					key: sparkle.appliedKey,
					createdAt: sparkle.createdAt,
					path: sparklePath
				}
			});
			instance.$mount();
			parent.value.appendChild(instance.$el);
		}
		function generateSparkle () {
			return {
				id: String(random(10000, 99999)),
				createdAt: Date.now(),
				color: props.color,
				size: random(10, 20),
				style: {
					// Pick a random spot in the available space
					top: random(0, 100) + "%",
					left: random(0, 100) + "%",
					// Random Z-Index => Sparkles are either in Front or behind the Slotted Child
					zIndex: random(1, 3)
				}
			};
		}

		function tick () {
			addSparkle();
			window.setTimeout(tick, random(50, 500));
		}
		function random (min, max) {
			if (min === 0 && max === 1) {
				return Math.round(Math.random())
			}
			return Math.floor(Math.random() * (max - min)) + min;
		}

		tick();
	}
};
</script>

<style scoped>
#sparkleWrapper{
  position: relative;
  display: inline-block;
}
.sparkleChildWrapper{
  position: relative;
  z-index: 2;
  font-weight: bold;
}
</style>
