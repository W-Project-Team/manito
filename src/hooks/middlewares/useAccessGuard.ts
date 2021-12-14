import { useAuthStore } from '@/store/auth'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { RoomId, UserId } from '@/types/manito'
import { isRegisteredUser } from '@/utils/api'
import { Provider } from '@/types/auth'
import useStorage from '@/hooks/useStorage'
import { storeToRefs } from 'pinia'

async function autoLogin () {
  const { isAuthenticated } = storeToRefs(useAuthStore())

  if (isAuthenticated.value) {
    return true
  }

  const { localStorage } = useStorage()
  const { getPersistenceFirebaseUser } = useAuthStore()

  let success = false
  const providedBy = localStorage.getItem<Provider>('provider')
  if (providedBy === 'Google' || providedBy === 'Github') {
    success = await getPersistenceFirebaseUser(providedBy)
  }

  return success
}

export function checkRegisteredUser () {
  const { user } = storeToRefs(useAuthStore())
  const router = useRouter()
  const route = useRoute()

  const show = ref(false)

  onMounted(async () => {
    const success = await autoLogin()

    if (!success || !user.value?.userId) {
      await router.replace('/auth/login')
      return
    }

    const registered = await isRegisteredUser(user.value.userId)

    if (!registered) {
      await router.replace('/register')
      return
    }

    const invite = route.query.invite
    if (invite) {
      await router.replace(`/invite/${invite}`)
      return
    }

    show.value = true
  })

  return { show }
}

export function checkParticipant (roomId: RoomId) {
  const authStore = useAuthStore()
  const router = useRouter()

  onMounted(async () => {
    if (!authStore.isAuthenticated) {
      router.push('/auth/login')
      return
    }
  })
}
