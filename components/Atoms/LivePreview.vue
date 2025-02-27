<template>
  <div class="live-preview neumorphic">
    <h3 class="live-preview__title">{{ device.name }} Preview</h3>
    <div class="live-preview__icon">
      <!-- Render an icon based on the device type -->
      <i v-if="device.type === 'light'" :class="lightIconClass"></i>
      <i v-else-if="device.type === 'ac'" :class="acIconClass"></i>
      <i v-else-if="device.type === 'switch'" :class="switchIconClass"></i>
      <!-- Fallback icon -->
      <i v-else class="fas fa-question-circle live-preview__icon--fallback"></i>
    </div>
    <div class="live-preview__details">
      <p class="live-preview__status">
        Status: <span :class="statusClass">{{ device.status }}</span>
      </p>
      <p v-if="device.type === 'light'" class="live-preview__brightness">
        Brightness: {{ device.brightness }}%
      </p>
      <p v-if="device.type === 'ac'" class="live-preview__temperature">
        Temperature: {{ device.temperature }}°C
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'

interface Device {
  id: number
  name: string
  type: string   // e.g. 'light', 'ac', 'switch'
  status: string // 'on' or 'off'
  brightness?: number
  temperature?: number
}

const props = defineProps<{ device: Device }>()

// For light devices, use a solid lightbulb icon if on, an outlined one if off.
const lightIconClass = computed(() => {
  return props.device.status === 'on'
    ? 'fas fa-lightbulb text-warning'
    : 'far fa-lightbulb text-muted'
})

// For AC devices, use a snowflake icon; color bright if on, muted if off.
const acIconClass = computed(() => {
  return props.device.status === 'on'
    ? 'fas fa-snowflake text-info'
    : 'fas fa-snowflake text-muted'
})

// For switch devices, use toggle icons
const switchIconClass = computed(() => {
  return props.device.status === 'on'
    ? 'fas fa-toggle-on text-success'
    : 'fas fa-toggle-off text-secondary'
})

// Set a text color class for the status label
const statusClass = computed(() => {
  return props.device.status === 'on' ? 'text-success' : 'text-danger'
})
</script>

<style lang="scss" scoped>
.live-preview {
  &.neumorphic {
    padding: 1rem;
    margin-top: 1rem;
    text-align: center;
  }
  &__title {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
  }
  &__icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  &__icon--fallback {
    color: #ccc;
  }
  &__details {
    p {
      margin: 0.25rem 0;
    }
  }
  &__status {
    font-size: 1rem;
  }
  &__brightness,
  &__temperature {
    font-size: 0.9rem;
  }
}
</style>
