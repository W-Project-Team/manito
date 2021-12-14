<template>
  <transition name="fade">
    <div class="wrap_room text-center text-xl font-bold" v-if="!loading">
      <span class="tit_paticipants">참가인원</span>
      <template v-if="currentRoom">
        <h2 class="text-gray-700">
          {{ currentRoom.title }}
        </h2>
        <List>
          <template v-for="participant in currentRoom.participants" :key="participant.id">
            <ListItem>
              <div class="flex items-center">
                <img :src="participant.profileImage" class="w-12 h-12 rounded-full" />
                <span class="ml-4">{{ participant.name }}</span>
              </div>
            </ListItem>
          </template>
        </List>
      </template>
      <template>
        <div class="img_box mt-6">
          <!-- 하드코딩임 -->
          <span class="txt_matching">currentRoom.participants[0].name</span>
        </div>
        <Button class="btn-success mt-6">마니또 매칭 시작</Button>
      </template>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import useAsync from '@/hooks/useAsync'
import { storeToRefs } from 'pinia'
import { useMyInfoStore } from '@/store/myInfo'
import { useRoomStore } from '@/store/room'
import { useAuthStore } from '@/store/auth'
import { Room } from '@/types/manito'
import List from '@/components/atoms/List.vue'
import ListItem from '@/components/atoms/ListItem.vue'

const { user } = storeToRefs(useAuthStore())
const { myInfo } = storeToRefs(useMyInfoStore())
const { roomList } = storeToRefs(useRoomStore())
const myInfoStore = useMyInfoStore()
const roomStore = useRoomStore()

const loading = ref(true)

const currentRoom = computed<Room>(() => roomList.value.filter(x => x.id === roomId.value)[0] ?? null)

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

</script>
<style scoped lang="scss">
.wrap_room{
  min-width: 320px
}
.tit_paticipants{
  display: inline-block;
  margin-bottom: 10px;
  padding: 18px 0 15px;
  border-bottom: 3px solid #333;
  width: 100%;
  text-align: left;
  line-height: 1;
}
.area_participant{
  padding: 0 0 15px;
  border-bottom: 3px solid #333;
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