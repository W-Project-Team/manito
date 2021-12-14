<template>
  <button
    class="text-white font-bold py-2 px-4 rounded transition-colors"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  width?: number,
  height?: number
}>()

</script>

<style scoped>

</style>
