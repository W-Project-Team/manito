<template>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import useAsync from '@/hooks/useAsync'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useMyInfoStore } from '@/store/myInfo'
import { isParticipatedInRoom, registerUserOnRoom } from '@/utils/api'
import { useDialog } from '@/store/useDialog'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const myInfoStore = useMyInfoStore()
const { showDialog } = useDialog()

onMounted(async () => {
  const roomId = route.params.roomId as string

  try {

    if (!roomId) {
      await useAsync(() => Promise.reject(new Error('잘못된 방번호 입니다.')))
      return
    }
    await useAsync(() => authStore.getPersistenceFirebaseUser('Google'))
    await useAsync(() => myInfoStore.fetchMyInfo())

    if (!myInfoStore.myInfo || !authStore.user) {
      await router.replace({
        path: '/Register',
        query: {
          invite: roomId
        }
      })
      return
    }

    const userId = authStore.user.userId

    const isParticipated = await useAsync(() => isParticipatedInRoom(roomId, userId))

    if (isParticipated) {
      await showDialog('이미 참여한 방입니다.')
      await router.replace(`/${roomId}`)
    } else {
      await useAsync(() => registerUserOnRoom(roomId, userId))
      await showDialog('등록에 성공했습니다.')
      await router.replace(`/${roomId}`)
    }
  } catch (e) {
    await router.replace({
      path: '/auth/login',
      query: {
        invite: roomId
      }
    })
  }
})
</script>

<style scoped>

</style>
