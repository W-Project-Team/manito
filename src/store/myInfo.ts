import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { MyInfo } from '@/types/manito'
import { Nullable } from '@/types/base'
import { fetchMyInfo as fetchMyInfoApi } from '@/utils/api'
import { useAuthStore } from '@/store/auth'

export const useMyInfoStore = defineStore('myInfo', () => {
  const myInfoRef = ref<Nullable<MyInfo>>(null)
  const { user } = storeToRefs(useAuthStore())

  const isRegisteredUser = computed(() => !!myInfoRef.value)

  async function fetchMyInfo () {
    if (!user.value) {
      throw new Error('로그인 되어있지 않습니다.')
    }

    myInfoRef.value = await fetchMyInfoApi(user.value.userId)
  }

  return {
    myInfo: myInfoRef,
    isRegisteredUser,
    fetchMyInfo
  }
})
