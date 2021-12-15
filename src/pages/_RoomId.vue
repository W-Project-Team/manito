<template>
  <transition name="fade">
    <div class="wrap_room text-center text-xl font-bold" v-if="!loading">
      <template v-if="currentRoom">
        <h2 class="text-white">
          {{ currentRoom.title }}
        </h2>
        <div class="mt-6">
          <Button class="btn-success" v-if="showStartBtn" @click="onClickStart">
            마니또 매칭 시작
          </Button>
        </div>
        <div v-if="!myManito">
          <span class="tit_paticipants text-white text-lg">참가인원</span>
          <List>
            <template v-for="participant in currentRoom.participants" :key="participant.id">
              <ListItem>
                <div class="flex items-center">
                  <img :src="participant.profileImage" class="w-6 h-6 rounded-full" />
                  <span class="ml-4 text-sm font-normal text-white">{{ participant.name }}</span>
                </div>
              </ListItem>
            </template>
          </List>
        </div>
        <div v-else class="img_box mt-6">
          <!-- 하드코딩임 -->
          <span class="txt_matching">{{ myManito ? myManito.name : '선택되지 않았어요' }}</span>
        </div>
      </template>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import useAsync from '@/hooks/useAsync'
import { storeToRefs } from 'pinia'
import { useMyInfoStore } from '@/store/myInfo'
import { useRoomStore } from '@/store/room'
import { useAuthStore } from '@/store/auth'
import { Room } from '@/types/manito'
import Button from '@/components/atoms/Button.vue'
import List from '@/components/atoms/List.vue'
import ListItem from '@/components/atoms/ListItem.vue'
import { startManito } from '@/utils/api'

const { user } = storeToRefs(useAuthStore())
const { myInfo } = storeToRefs(useMyInfoStore())
const { roomList } = storeToRefs(useRoomStore())
const myInfoStore = useMyInfoStore()
const roomStore = useRoomStore()

const loading = ref(true)

const currentRoom = computed<Room>(() => roomList.value.filter(x => x.id === roomId.value)[0] ?? null)
const showStartBtn = computed(() => currentRoom.value.presidentId === user.value?.userId && currentRoom.value.status === 'Waiting')

watch(user, async u => {
  if (u) {
    await useAsync(() =>
      myInfoStore.fetchMyInfo().then(() =>
          roomStore.fetchRoomList(myInfo.value?.participated ?? [])
      )
    )

    loading.value = false
  }
}, {
  immediate: true
})

const route = useRoute()

const roomId = computed(() => route.params.roomId)
const myManito = computed(() => {
  const me = currentRoom.value.participants.find(x => x.id === user.value?.userId)
  if (!me) {
    return null
  }

  return me.connectTo ?? null
})

const onClickStart = async () => {
  await useAsync(() => startManito('RP4VGHt0UX58FDRpkRBc'))
  location.reload()
}
</script>
<style scoped lang="scss">
.wrap_room{
  min-width: 320px;
  z-index: 100;
  background: transparent;
}
.tit_paticipants{
  display: inline-block;
  margin-bottom: 10px;
  padding: 18px 0 15px;
  border-bottom: 1px dashed #fff;
  width: 100%;
  text-align: left;
  line-height: 1;
}
.area_participant{
  padding: 0 0 15px;
  border-bottom: 1px dashed #fff;
  .list_participant{
    text-align: left;
    font-weight: 400;
  }
}
.img_box{
  width : 100%;
  height : 0;
  padding-top : calc(414 / 576 * 100%);
  background: url(@/assets/image/img_santaclaus.png)center center / cover no-repeat;
  .txt_matching{
    display: block;
    font-size: 50px;
    margin-top: -23%;
  }
}

</style>
