import { useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useLoading } from '@/store/useLoading'
import { Provider } from '@/types/auth'
import useStorage from '@/hooks/useStorage'

export default function useAuth () {
  const router = useRouter()
  const { getPersistenceFirebaseUser, isAuthenticated } = useAuthStore()
  const { localStorage } = useStorage()
  const { value } = useLoading()

  onBeforeMount(async () => {
    if (isAuthenticated) {
      return
    }

    let success = false
    try {
      const providedBy = localStorage.getItem<Provider>('provider')
      if (providedBy === 'Google' || providedBy === 'Github') {
        success = await getPersistenceFirebaseUser(providedBy)
      }

      if (!success) {
        router.push('/auth/login')
      }
    } catch {
      await router.push('/auth/login')
    }
  })

  return {
    loading: value
  }
}
