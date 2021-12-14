<template>
  <div class="text-center text-xl font-bold">
    {{ roomId }}
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const roomId = computed(() => route.params.roomId)

</script>