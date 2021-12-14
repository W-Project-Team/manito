<template>
  <transition name="fade">
    <div class="text-center text-xl font-bold" v-if="!loading">
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
