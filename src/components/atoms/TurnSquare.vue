<template>
  <div id="main-logo">
    <section>
      <div class="square"> </div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
    </section>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
#main-logo {
  width: 200px;
  margin: 200px auto;
  height: 100px;
  /* 원근법  */
  /* -webkit-perspective: 400; */
}

section {
  width: 200px;
  height: 200px;
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
  width: 200px;
  height: 200px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.3;
}

/* 옆면 */
.square:nth-child(1) {
  transform: rotateY(0deg) translate3d(0px, 0px, 100px);
  background: red;
}
.square:nth-child(2) {
  transform: rotateY(90deg) translate3d(0px, 0px, 100px);
  background: green;
}
.square:nth-child(3) {
  transform: rotateY(180deg) translate3d(0px, 0px, 100px);
  background: blue;
}
.square:nth-child(4) {
  transform: rotateY(270deg) translate3d(0px, 0px, 100px);
  background: yellow;
}

/* 윗면과 아랫면 */
.square:nth-child(5) {
  transform: rotateX(90deg) translate3d(0px, 0px, 100px);
  background: brown;
}
.square:nth-child(6) {
  transform: rotateX(270deg) translate3d(0px, 0px, 100px);
  background: pink;
}

</style>
