<template>
  <p :style="style">{{ prop.text }}</p>
</template>

<script lang="ts" setup>
import { reactive } from "vue-demi"

const prop = defineProps({
  text: String,
  size: Number,
  duration: {
    type: Number,
    default: 4,
  },
  isInfinite: {
    type: Boolean,
    default: false,
  },
})

const style = reactive({
  fontSize: `${prop.size}px`,
  animationDuration: `${prop.duration}s`,
  animationIterationCount: `${prop.isInfinite ? 'infinite' : 'unset'}`,
})
</script>

<style lang="scss" scoped>
p {
  animation-name: rint;
  // animation-duration: 4s;
  animation-timing-function: linear;
  // animation-iteration-count: infinite;
  animation-direction: alternate;
}

#box:hover {
  animation-play-state: paused;
}

#box > h1 {
  line-height: 200px;
}

@keyframes rint {
  from {
    left: 0;
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  to {
    left: 80%;
    opacity: 1;
  }
}
</style>
