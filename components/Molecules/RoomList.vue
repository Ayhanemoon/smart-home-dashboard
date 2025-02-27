<!-- components/RoomList.vue -->
<template>
  <div class="room-list">
    <div class="room-list__container row">
      <div class="room-list__item col-md-4" v-for="room in rooms" :key="room.id">
        <RoomItem :room="room" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RoomItem from '@/components/Atoms/RoomItem.vue'

interface Room {
  id: number
  name: string
  devices: any[]
}

const props = withDefaults(defineProps<{
  rooms?: Room[]
}>(), {
  rooms: () => []
})
</script>

<style lang="scss" scoped>
.room-list {
  &__container {
    margin: 0 auto;
  }
  
  &__item {
    margin-bottom: 1.5rem;
  }
}
</style>