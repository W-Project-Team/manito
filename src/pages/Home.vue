<template>
  <div v-show="show">
    Hello {{ user?.nickName }}
    <List>
      <template v-for="room in roomList" :key="room.id">
        <ListItem @click="onClickRoom(room)">
          <p class="text-xl font-bold">
            {{ room.title }}
          </p>
          <p class="text-md text-gray-600">
            {{ room.description }}
          </p>
        </ListItem>
      </template>
    </List>
    <Button v-if="false" class="btn-success" @click="onClickBtn">
      Make Room
    </Button>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { checkRegisteredUser } from '@/hooks/middlewares/useAccessGuard'
import { useDialog } from '@/store/useDialog'
import { useAuthStore } from '@/store/auth'
import { watch } from 'vue'
import { useRoomStore } from '@/store/room'
import { useMyInfoStore } from '@/store/myInfo'
import List from '@/components/atoms/List.vue'
import ListItem from '@/components/atoms/ListItem.vue'
import useAsync from '@/hooks/useAsync'
import { Room } from '@/types/manito'
import { useRouter } from 'vue-router'
import moment from 'moment'
import { addNewRoom, registerUserOnRoom } from '@/utils/api'
import Button from '@/components/atoms/Button.vue'

const router = useRouter()
const { user } = storeToRefs(useAuthStore())
const { showDialog } = useDialog()
const { show } = checkRegisteredUser()

const { myInfo } = storeToRefs(useMyInfoStore())
const { roomList } = storeToRefs(useRoomStore())
const myInfoStore = useMyInfoStore()
const roomStore = useRoomStore()

watch(user, async u => {
  if (u) {
    await useAsync(() =>
      myInfoStore.fetchMyInfo().then(() =>
        roomStore.fetchRoomList(myInfo.value?.participated ?? [])
      )
    )
  }
}, {
  immediate: true
})

const onClickBtn = async () => {
  const userId = user.value?.userId
  if (!userId) {
    return
  }

  const dueDate = moment().add(10, 'day').toDate()
  const roomId = await addNewRoom(userId, '2021 W 마니또', '2021 W 마니또 🙂', 20, dueDate)

  await useAsync(() => registerUserOnRoom(roomId, userId))
  await showDialog('참여에 성공했습니다.')
}

const onClickRoom = (room: Room) => {
  router.push(`/${room.id}`)
}
</script>

<style scoped>

</style>
