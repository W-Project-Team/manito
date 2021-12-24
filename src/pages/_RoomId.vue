<template>
  <transition name="fade">
    <div class="wrap_room text-center text-xl font-bold" v-if="!loading && !showDugudugu">
      <template v-if="currentRoom">
        <h2 class="focus-in-expand text-white text-2xl">
          {{ currentRoom.title }}
        </h2>
        <p class="text-right text-base text-white font-bold mt-4">
          {{ dueDate }} 까지
        </p>
        <div class="mt-6">
          <Button class="btn-success" v-if="showStartBtn" @click="onClickStart">
            마니또 매칭 시작
          </Button>
        </div>
        <div v-if="!myManito">
          <span class="tit_paticipants text-white text-lg">참가인원</span>
          <List class="list_parti">
            <template v-for="participant in currentRoom.participants" :key="participant.id">
              <ListItem>
                <div class="flex items-center">
                  <img :src="participant.profileImage" class="w-6 h-6 rounded-full" />
                  <span class="ml-4 text-lg font-normal text-white">{{ participant.name }}</span>
                </div>
              </ListItem>
            </template>
          </List>
        </div>
        <div v-else class="img_box mt-6 rounded-xl">
          <!-- 하드코딩임 -->
          <span class="txt_matching">{{ myManito ? myManito.name : '선택되지 않았어요' }}</span>
        </div>
      </template>
      <ul class="mt-6 mb-20 text-white text-left font-normal mission-list">
        <li class="text-base">&#128154; 만원이하 선물</li>
        <li class="text-base">&#128155; 팀즈 좋아요 눌러주기</li>
        <li class="text-base">&#129505; 쓸데없이 말걸기</li>
        <li class="text-base">&#128156; 리액션 잘해주기</li>
        <li class="text-base">&#128153; 눈인사 찡끗 😜</li>
      </ul>
      <span></span>

    </div>
  </transition>
  <transition name="fade">
    <div class="mt-6 text-white" v-if="showDugudugu">
      <div class="text-2xl text-center">
        과연 누가 뽑힐까요!!
      </div>
      <div class="area_turnSquare flex justify-center mb-20">
        <TurnSquare />
      </div>
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
import moment from 'moment'
import delay from '@/utils/delay'
import TurnSquare from '@/components/atoms/TurnSquare.vue'
import music from '@/assets/audio/music.mp3'

const { user } = storeToRefs(useAuthStore())
const { myInfo } = storeToRefs(useMyInfoStore())
const { roomList } = storeToRefs(useRoomStore())
const myInfoStore = useMyInfoStore()
const roomStore = useRoomStore()

const loading = ref(true)

const dueDate = computed(() => moment(currentRoom.value.dueDate).format('YYYY년 M월 D일'))
const currentRoom = computed<Room>(() => roomList.value.filter(x => x.id === roomId.value)[0] ?? null)
const showStartBtn = computed(() => currentRoom.value.presidentId === user.value?.userId && currentRoom.value.status === 'Waiting')

const showDugudugu = ref(false)

watch(user, async u => {
  if (u) {
    await useAsync(() =>
      myInfoStore
        .fetchMyInfo()
        .then(() =>
          roomStore
            .fetchRoomList(myInfo.value?.participated ?? [])
        )
    )
    const initiated = localStorage.getItem(roomId.value.toString()) !== null
    if (!initiated && currentRoom.value.status === 'Done') {
      localStorage.setItem(roomId.value.toString(), 'test-1')
      showDugudugu.value = true
      await delay(5000)
      showDugudugu.value = false
    }
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

onMounted(() => {
  const audio = new Audio(music)
  audio.play()
})
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
.list_parti {
  padding: 0 0 15px;
  border-bottom: 1px dashed #fff;
}
.img_box{
  width : 100%;
  height : 0;
  padding-top : calc(414 / 576 * 100%);
  background: url(@/assets/image/img_santaclaus.png) center center / cover no-repeat;
  .txt_matching{
    display: block;
    font-size: 50px;
    margin-top: -23%;
  }
}
.mission-list {
  padding: 10px 0;
  li {
    margin: 5px 0;
  }
}


.focus-in-expand {
  background-color: #00185c;
	-webkit-animation: focus-in-expand 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: focus-in-expand 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
@-webkit-keyframes focus-in-expand {
  0% {
    letter-spacing: -0.5em;
    -webkit-filter: blur(12px);
            filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
}
@keyframes focus-in-expand {
  0% {
    letter-spacing: -0.5em;
    -webkit-filter: blur(12px);
            filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
}
.area_turnSquare{
  margin-top: -50px;
}
</style>
