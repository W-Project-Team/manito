<template>
  <transition name="fade">
    <div
      v-show="value === true"
      class="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-50"
      :class="[computedClass]"
    >
      <div class="flex items-center justify-center space-x-2 animate-bounce">
        <TurnSquare :size="100" isPerspective />
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { useLoading } from '@/store/useLoading'
import { computed } from 'vue'
import TurnSquare from '@/components/atoms/TurnSquare.vue'

const loading = useLoading()

const value = computed(() => loading.value)
const computedClass = computed(() => [loading.transparent ? 'bg-transparent' : 'bg-transparent'])
</script>

<style scoped lang="scss">

</style>
