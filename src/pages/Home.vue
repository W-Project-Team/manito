<template>
  <div v-show="show">
    Hello {{ user?.nickName }}
    <Button class="btn-success" @click="onClickBtn">
      참여하기
    </Button>
  </div>
</template>

<script lang="ts" setup>
import moment from 'moment'
import Button from '@/components/atoms/Button.vue'
import useAsync from '@/hooks/useAsync'
import { storeToRefs } from 'pinia'
import { checkRegisteredUser } from '@/hooks/middlewares/useAccessGuard'
import { addNewRoom, fetchRoom, registerUserOnRoom } from '@/utils/api'
import { useDialog } from '@/store/useDialog'
import { useAuthStore } from '@/store/auth'

const { user } = storeToRefs(useAuthStore())
const { showDialog } = useDialog()
const { show } = checkRegisteredUser()


const onClickBtn = async () => {
  // const dueDate = moment().add(10, 'day').toDate()
  // const roomId = await addNewRoom('2021 W 마니또', '2021 W 마니또 🙂', 20, dueDate)
  const roomId = '4kw83JJQIMmaYGEQ6raq'
  const userId = user.value?.userId

  if (!userId) {
    return
  }

  await useAsync(() => registerUserOnRoom(roomId, userId))
  await showDialog('참여에 성공했습니다.')
}

</script>

<style scoped>

</style>
