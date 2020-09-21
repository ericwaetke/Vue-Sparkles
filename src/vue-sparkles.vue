<template>
  <div id="sparkleWrapper" ref="wrapper" class="vue-sparkles">
    <div class="sparkleChildWrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import SparkleInstance from './sparkle-instance.vue'

export default {
  name: 'VueSparkles',
  data () {
    return {
      color: 'hsl(50deg, 100%, 50%)',
      instances: []
    }
  },
  methods: {
    generateSparkle () {
      return {
        id: String(this.random(10000, 99999)),
        createdAt: Date.now(),
        color: this.color,
        size: this.random(10, 20),
        style: {
          // Pick a random spot in the available space
          top: this.random(0, 100) + '%',
          left: this.random(0, 100) + '%',
          // Float sparkles above sibling content
          zIndex: this.random(1, 3)
        }
      }
    },
    random (min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    },
    addSparkle () {
      const parent = this.$refs.wrapper
      const sparkle = this.generateSparkle()
      var SparkleClass = Vue.extend(SparkleInstance)
      var instance = new SparkleClass({
        propsData: {
          color: sparkle.color,
          size: sparkle.size,
          appliedStyle: sparkle.style,
          key: sparkle.appliedKey,
          createdAt: sparkle.createdAt
        }
      })
      instance.$mount()
      parent.appendChild(instance.$el)
      this.instances.push(instance)
    },
    tick () {
      this.addSparkle()
      window.setTimeout(this.tick, this.random(50, 500))
    }
  },
  mounted () {
    this.addSparkle()
    this.tick()
  }
}
</script>

<style>
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
