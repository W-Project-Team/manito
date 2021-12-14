<template>
  <div class="container flex justify-center items-center">
    <div class="p-8 max-w-6xl">
      <h1 class="font-bold text-indigo-800 dark:text-indigo-200 text-3xl text-center mb-8">회원가입</h1>
      <h2 class="font-bold text-2xl text-center dark:text-gray-50 mb-8">W 마니또</h2>
      <List>
        <ListItem>
          <Input v-model="nickName" label="닉네임" />
        </ListItem>
      </List>
      <div class="w-full flex justify-end">
        <Button class="btn-success" @click="onClickRegister">
          회원가입
        </Button>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { useDialog } from '@/store/useDialog'

import List from '@/components/atoms/List.vue'
import ListItem from '@/components/atoms/ListItem.vue'
import Input from '@/components/atoms/Input.vue'
import Button from '@/components/atoms/Button.vue'
import { useAuthStore } from '@/store/auth'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { registerNewUser } from '@/utils/api'

const { user, isAuthenticated } = storeToRefs(useAuthStore())
const { showConfirm, showDialog } = useDialog()
const router = useRouter()
const route = useRoute()
const query = route.query

const nickName = ref<string>('')

onBeforeMount(() => {
  if (!isAuthenticated) {
    router.push('/auth/login')
  }
})

const onClickRegister = () => {
  if (nickName.value.length === 0) {
    showDialog('닉네임을 입력해주세요 😖')
    return
  }

  showConfirm(`닉네임 "${nickName.value}" 가 맞나요?`, async (v) => {
    if (v && user.value) {
      await registerNewUser(user.value.userId, nickName.value, user.value.profileImage)
      await router.push({
        path: '/',
        query
      })
    }
  }, '확인')
}
</script>

<style scoped>

</style>
