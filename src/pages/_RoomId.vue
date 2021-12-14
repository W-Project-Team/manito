<template>
  <div class="wrap_room text-center text-xl font-bold">
    <span class="tit_paticipants">참가인원</span>
    <div class="area_participant">
      <ul class="list_participant">
        <li v-for="participant in participants">{{ participant.name }}</li>
      </ul>
    </div>
    <div class="img_box mt-6">
      <span class="txt_matching">정주리</span>
    </div>
    <Button class="btn-success mt-6">마니또 매칭 시작</Button>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { storeToRefs } from 'pinia'
import { fetchMockRoom } from '@/utils/api'
import Button from '@/components/atoms/Button.vue'

const { user } = storeToRefs(useAuthStore())
const route = useRoute()
const fetchData = ref([])
const participants = ref([])

const roomId = computed(() => route.params.roomId)
const params = computed(() => route)

onMounted(() => {
  const result = fetchMockRoom('sadasd')
  console.log(result)
  console.log(result.participants)
  console.log(fetchData.value)
  fetchData.value = result
  participants.value = result.participants
})
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