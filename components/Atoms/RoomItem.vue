<!-- components/RoomItem.vue -->
<template>
  <div class="room-item neumorphic card">
    <div class="room-item__body card-body">
      <h5 class="room-item__title card-title">{{ room.name }}</h5>
      <NuxtLink :to="`/rooms/${room.id}`" class="room-item__button btn btn-info">
        View Details
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Room {
  id: number
  name: string
  devices: any[]
}

const props = defineProps<{
  room: Room
}>()
</script>

<style scoped lang="scss">
.room-item {
  &__body {
    padding: 1rem;
  }
  &__title {
    font-weight: bold;
  }
  &__button {
    margin-top: 0.5rem;
  }
}
</style>