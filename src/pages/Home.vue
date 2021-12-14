<template>
  <div v-show="show">
    Hello {{ user?.userId }}
    <Button class="btn-success" @click="onClickBtn">
      Hello World
    </Button>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/store/auth'
import { storeToRefs } from 'pinia'
import { checkRegisteredUser } from '@/hooks/middlewares/useAccessGuard'
import { addNewRoom, fetchRoom, registerUserOnRoom } from '@/utils/api'
import Button from '@/components/atoms/Button.vue'
const { user } = storeToRefs(useAuthStore())

const { show } = checkRegisteredUser()

import { fetchMockRoom } from '@/utils/api'
import { onMounted } from 'vue'

onMounted(() => {
  const result = fetchMockRoom('sadasd')
  console.log(result)
})

const onClickBtn = async () => {
  // const roomId = await addNewRoom('hello title', 'hello description', 12, new Date())
  const zxc = await registerUserOnRoom('n9QSwirNxarwXMzD2Vtw', user.value?.userId ?? 'no-user')
  console.log(zxc)
}
</script>

<style scoped>

</style>
