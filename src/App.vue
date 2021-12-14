<template>
  <Dialog />
  <FadeInEl>
    <Loading />
  </FadeInEl>
  <router-view />
</template>

<script lang="ts" setup>
import Loading from '@/components/organisms/Loading.vue'
import Dialog from '@/components/organisms/Dialog.vue'
import FadeInEl from '@/components/atoms/FadeInEl.vue'
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Anonymous+Pro);

body {
  font-family: 'Anonymous Pro', monospace;
}
</style>
