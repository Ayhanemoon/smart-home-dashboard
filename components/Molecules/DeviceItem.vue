<template>
  <div class="device-item neumorphic">
    <div class="device-item__header">
      <h4 class="device-item__title">{{ device.name }}</h4>
    </div>
    <div class="device-item__controls d-flex flex-wrap gap-3">
      <control-panel :device="device" />
      <live-preview :device="device" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import ControlPanel from '~/components/Atoms/ControlPanel.vue'
import LivePreview from '~/components/Atoms/LivePreview.vue'

interface Device {
  id: number
  name: string
  type: string
  status: string
  brightness?: number
  temperature?: number
}

const props = defineProps<{
  device: Device
}>()
</script>

<style scoped>
.device-item {
  padding: 1rem;
  margin-bottom: 1.5rem;
  /* You can add additional BEM-based styling here */
}
.device-item__header {
  margin-bottom: 0.75rem;
}
.device-item__title {
  font-size: 1.25rem;
  margin: 0;
}
</style>
