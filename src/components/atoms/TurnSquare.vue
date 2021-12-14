<template>
  <div id="main-logo" :style="{ ...perspectiveStyle }">
    <section :style="sizeStyle">
      <div 
        v-for="i of 4"
        :key="i"
        :style="{ ...sizeStyle, ...transLate3dSizeY(i) }"
        class="square"
      />
      <div 
        v-for="i of 2"
        :key="i"
        :style="{ ...sizeStyle, ...transLate3dSizeX(i) }"
        class="square"
      />
    </section>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from 'vue'
const prop = defineProps({
  size: {
    type: Number,
    default: 200,
  },
  isPerspective: {
    type: Boolean,
    default: false
  }
})

const perspectiveStyle = prop.isPerspective ? { '-webkit-perspective': 400 } : {}

const sizeStyle = reactive({
  width: `${prop.size}px`,
  height: `${prop.size}px`,
})
const transLate3dSizeY = (i: number) => reactive({
  transform: `rotateY(${i * 90}deg) translate3d(0px, 0px, ${prop.size / 2}px)`,
})
const transLate3dSizeX = (i: number) => reactive({
  transform: `rotateX(${i * 180 + 90}deg) translate3d(0px, 0px, ${prop.size / 2}px)`,
})
</script>

<style lang="scss" scoped>
#main-logo {
  width: 200px;
  margin: 200px auto;
  height: 100px;
  /* 원근법  */
  //  -webkit-perspective: 400;
}

section {
  position: relative;
  animation: rint 3s linear 0s infinite;
  transform-style: preserve-3d;
}

@keyframes rint {
  from {
    transform: rotateX(0) rotateY(0) rotateZ(0);
  }
  to {
    transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
  }
}

.square {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.3;
}

/* 옆면 */
.square:nth-child(1) {
  // transform: rotateY(0deg) translate3d(0px, 0px, 50px);
  background: red;
}
.square:nth-child(2) {
  // transform: rotateY(90deg) translate3d(0px, 0px, 50px);
  background: green;
}
.square:nth-child(3) {
  // transform: rotateY(180deg) translate3d(0px, 0px, 50px);
  background: blue;
}
.square:nth-child(4) {
  // transform: rotateY(270deg) translate3d(0px, 0px, 50px);
  background: yellow;
}

/* 윗면과 아랫면 */
.square:nth-child(5) {
  // transform: rotateX(90deg) translate3d(0px, 0px, 50px);
  background: brown;
}
.square:nth-child(6) {
  // transform: rotateX(270deg) translate3d(0px, 0px, 50px);
  background: pink;
}
</style>
