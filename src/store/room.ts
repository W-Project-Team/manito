import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { MyInfo, Room, RoomId } from '@/types/manito'
import { fetchRoom as fetchRoomApi } from '@/utils/api'

export const useRoomStore  = defineStore('room', () => {
  const roomListRef = ref<Room[]>([])
  // const { user } = storeToRefs(useAuthStore())

  async function fetchRoomList (roomIdList: RoomId[]) {
    const roomList = await Promise.all(roomIdList.map(id => fetchRoomApi(id)))
    roomListRef.value.splice(0, roomListRef.value.length, ...roomList)
  }

  return {
    fetchRoomList,
    roomList: roomListRef
  }
})
