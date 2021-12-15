<template>
  <div class="container relative w-full h-full">
    <main class="top bg-red-600 mx-auto max-w-xl w-full h-full px-4 py-4">
      <router-view class="z-10 bg-transparent"/>
    </main>
  </div>
</template>

<script lang="ts" setup>
import useScrollObserver from '@/hooks/useScrollObserver'

const { isScrolledY } = useScrollObserver({
  threshold: 10
})
</script>

<style scoped lang="scss">


.container {
	background-color: #00185c; 
	background-image: url('@/assets/image/snow.png'), url('@/assets/image/snow3.png'), url('@/assets/image/snow2.png');
	-webkit-animation: snow 20s linear infinite;
	-moz-animation: snow 20s linear infinite;
	-ms-animation: snow 20s linear infinite;
	animation: snow 20s linear infinite;
}
.top {
	position: relative;
	overflow: scroll;
	width: 100%;
	min-height: 100vh;
	background: transparent
}
/*Keyframes*/
@keyframes snow {
0% {background-position: 0px 0px, 0px 0px, 0px 0px;}
 100% {background-position: 500px 1000px, 400px 400px, 300px 300px;}
}

@-moz-keyframes snow {
0% {background-position: 0px 0px, 0px 0px, 0px 0px;}
100% {background-position: 500px 1000px, 400px 400px, 300px 300px;}
}

@-webkit-keyframes snow {
0% {background-position: 0px 0px, 0px 0px, 0px 0px;}
 50% {background-color:#b4cfe0;}
 100% {background-position: 500px 1000px, 400px 400px, 300px 300px; background-color:#00185c;}
}

@-ms-keyframes snow {
0% {background-position: 0px 0px, 0px 0px, 0px 0px;}
 100% {background-position: 500px 1000px, 400px 400px, 300px 300px;}
}
</style>
