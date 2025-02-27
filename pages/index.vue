<!-- pages/index.vue -->
<template>
  <div class="container my-4">
    <h1 class="mb-4">Smart Home Rooms</h1>
    <div v-if="loading" class="text-center">
      <span class="spinner-border" role="status" aria-hidden="true"></span>
      <span class="visually-hidden">Loading...</span>
    </div>
    <RoomList v-if="!loading" :rooms="store.roomList" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import RoomList from '@/components/Molecules/RoomList.vue'
import { useRoomsStore } from '@/stores/rooms'

const store = useRoomsStore()
const loading = ref(true)

onMounted(async () => {
  await store.fetchRooms()
  loading.value = false
})
</script>
