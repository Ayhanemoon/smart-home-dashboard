<template>
  <div class="room-detail container my-4">
    <div v-if="roomStore.pending" class="room-detail__loading text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else-if="roomStore.error" class="room-detail__error alert alert-danger">
      Failed to load room details. Please try again later.
    </div>
    <div v-else-if="roomStore.currentRoom" class="room-detail__content">
      <h1 class="room-detail__title mb-4">{{ roomStore.currentRoom.name }}</h1>
      <div class="room-detail__devices">
        <h2 class="room-detail__subtitle mb-3">Devices</h2>
        <!-- Using Bootstrap grid to arrange devices -->
        <div class="row g-3">
          <div 
            v-for="device in roomStore.currentRoom.devices" 
            :key="device.id" 
            class="col-12 col-sm-6 col-lg-4">
            <DeviceItem :device="device" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="room-detail__fallback text-center">
      No room data available.
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRoomStore } from '@/stores/room'
import DeviceItem from '@/components/Molecules/DeviceItem.vue'

definePageMeta({
  middleware: 'check-room'
})

const route = useRoute()
const paramId = route.params.id
const roomId = Array.isArray(paramId) ? paramId[0] : (paramId as string)
const roomStore = useRoomStore()

const fetchRoomData = async (id: string) => {
  roomStore.currentRoom = null
  await roomStore.fetchRoom(id)
}

onMounted(async () => {
  await fetchRoomData(roomId)
})

watch(
  () => route.params.id,
  async (newId, oldId) => {
    const newRoomId = Array.isArray(newId) ? newId[0] : (newId as string)
    if (newRoomId !== oldId) {
      await fetchRoomData(newRoomId)
    }
  }
)
</script>
