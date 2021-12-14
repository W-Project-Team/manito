<template>
  <div class="relative w-full h-full">
    <main class="mx-auto max-w-xl w-full h-full px-4 py-4">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
import useScrollObserver from '@/hooks/useScrollObserver'

// const { loading } = useAuth()
const { isScrolledY } = useScrollObserver({
  threshold: 10
})
</script>

<style scoped lang="scss">

</style>
