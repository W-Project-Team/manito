<template>
  <div>
    .
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/store/auth'
import { useRoomStore } from '@/store/room'
import { useRoute, useRouter } from 'vue-router'
import { useMyInfoStore } from '@/store/myInfo'
import { onMounted, watch } from 'vue'
import useStorage from '@/hooks/useStorage'
import { Provider } from '@/types/auth'
import useAsync from '@/hooks/useAsync'

const router = useRouter()
const { user } = storeToRefs(useAuthStore())
const { roomList } = storeToRefs(useRoomStore())
const infoStore = useMyInfoStore()
const { myInfo } = storeToRefs(infoStore)
const { fetchMyInfo } = infoStore

const query = useRoute().query

async function goRoom () {
  if (query.invite) {
    router.push(`/invite/${query.invite}`)
    return
  }
  await useAsync(() => fetchMyInfo())
  if (!myInfo.value) {
    router.push({ path: '/register', query })
    return
  }

  if (myInfo.value.participated.length > 0) {
    router.push({ name: 'Room', params: { roomId: myInfo.value.participated[0] } })
  }
}

onMounted(async () => {
  if (user.value) {
    goRoom()
    return
  }

  const { localStorage } = useStorage()
  const providedBy = localStorage.getItem<Provider>('provider')

  let success = false

  if (providedBy === 'Google' || providedBy === 'Github') {
    success = await useAsync(() => useAuthStore().getPersistenceFirebaseUser(providedBy))
  }

  if (!success) {
    router.push({ path: '/auth/login', query })
    return
  }

  goRoom()
})
</script>

<style scoped>

</style>
