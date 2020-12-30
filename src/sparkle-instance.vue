<template>
  <div class="sparkleWrapper"
  :style="appliedStyle"
  :key="appliedKey"
  :createdAt="createdAt">
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 160 160"
      fill="none">
      <path
        :d="path"
        :fill="color" />
    </svg>
  </div>
</template>

<script>
export default {
	name: "SparkleInstance",
	props: {
		size: Number,
		appliedStyle: Object,
		color: String,
		createdAt: Number,
		appliedKey: String,
		path: String
	},
	mounted () {
		window.setTimeout(() => {
			this.$destroy();
			this.$el.parentNode.removeChild(this.$el);
		}, 600);
	}
};
</script>

<style scoped>
.sparkleWrapper{
  position: absolute;
  pointer-events: none;
  z-index: 2;
  animation: growAndShrink 600ms ease-in-out forwards;
}
.sparkleWrapper svg{
  animation: spin 600ms linear forwards;
}

@keyframes growAndShrink {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
}
@keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(180deg);
    }
}
</style>
