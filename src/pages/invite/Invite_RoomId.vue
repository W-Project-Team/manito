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
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()

const { getPersistenceFirebaseUser } = useAuthStore()
const { fetchMyInfo } = useMyInfoStore()
const { user } = storeToRefs(useAuthStore())
const { myInfo } = storeToRefs(useMyInfoStore())
const { showDialog } = useDialog()

onMounted(async () => {
  const roomId = route.params.roomId as string

  try {

    if (!roomId) {
      await useAsync(() => Promise.reject(new Error('잘못된 방번호 입니다.')))
      return
    }

    if (!user.value) {
      throw new Error('Need Login')
    }
  } catch (e) {
    await router.push({
      path: '/auth/login',
      query: {
        invite: roomId
      }
    })
    return
  }

  try {
    await useAsync(() => fetchMyInfo())
    if (!myInfo.value || !user.value) {
      await router.push({
        path: '/Register',
        query: {
          invite: roomId
        }
      })
      return
    }

    const userId = user.value.userId
    const isParticipated = await useAsync(() => isParticipatedInRoom(roomId, userId))

    if (isParticipated) {
      await showDialog('이미 참여한 방입니다.')
      await router.push({
        name: 'Room',
        params: {
          roomId: roomId
        }
      })
    } else {
      await useAsync(() => registerUserOnRoom(roomId, userId))
      await showDialog('등록에 성공했습니다.')
      await router.push({
        name: 'Room',
        params: {
          roomId: roomId
        }
      })
    }
  } catch (e) {
    await router.push({
      path: '/register',
      query: {
        invite: roomId
      }
    })
  }
})
</script>

<style scoped>

</style>
