<template>
  <Dialog />
  <Loading />
  <router-view />
</template>

<script lang="ts" setup>
import Loading from '@/components/organisms/Loading.vue'
import Dialog from '@/components/organisms/Dialog.vue'
</script>

<style lang="scss">
</style>
