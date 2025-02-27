<template>
  <div class="control-panel">
    <h3 class="control-panel__title">Control Panel for {{ device.name }}</h3>
    <form @submit.prevent="submitForm" class="control-panel__form">
      <!-- Common: Status selector -->
      <div class="control-panel__field">
        <label :for="`status-${device.id}`" class="control-panel__label">Status</label>
        <select :id="`status-${device.id}`" v-model="form.status" class="control-panel__input">
          <option value="on">On</option>
          <option value="off">Off</option>
        </select>
      </div>
      
      <!-- If device type is 'light', show brightness control -->
      <div v-if="device.type === 'light'" class="control-panel__field">
        <label :for="`brightness-${device.id}`" class="control-panel__label">Brightness</label>
        <input
          type="range"
          :id="`brightness-${device.id}`"
          min="0"
          max="100"
          v-model.number="form.brightness"
          class="control-panel__input"
        />
        <span class="control-panel__value">{{ form.brightness }}%</span>
      </div>
      
      <!-- If device type is 'ac', show temperature control -->
      <div v-else-if="device.type === 'ac'" class="control-panel__field">
        <label :for="`temperature-${device.id}`" class="control-panel__label">Temperature</label>
        <input
          type="number"
          :id="`temperature-${device.id}`"
          v-model.number="form.temperature"
          class="control-panel__input"
          min="16"
          max="30"
        />
        <span class="control-panel__value">{{ form.temperature }}°C</span>
      </div>
      
      <!-- For device type 'switch', no additional input is needed -->
      <div v-if="errorMessage" class="control-panel__error">
        {{ errorMessage }}
      </div>
      <button type="submit" class="control-panel__submit btn btn-info">
        Update Device
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { useRoomStore } from '@/stores/room'
import { useToast } from '~/composables/toast'

interface Device {
  id: number
  name: string
  type: string // 'light', 'ac', 'switch'
  status: string
  brightness?: number
  temperature?: number
}

const props = defineProps<{ device: Device }>()
const roomStore = useRoomStore()
const toast = useToast()

const form = ref({
  status: props.device.status,
  brightness: props.device.type === 'light' ? props.device.brightness ?? 50 : undefined,
  temperature: props.device.type === 'ac' ? props.device.temperature ?? 22 : undefined
})

const errorMessage = ref<string>('')

const submitForm = async () => {
  errorMessage.value = ''
  // Validation
  if (props.device.type === 'light') {
    if (form.value.brightness === undefined || form.value.brightness < 0 || form.value.brightness > 100) {
      errorMessage.value = 'Brightness must be between 0 and 100'
      return
    }
  }
  if (props.device.type === 'ac') {
    if (form.value.temperature === undefined || form.value.temperature < 16 || form.value.temperature > 30) {
      errorMessage.value = 'Temperature must be between 16°C and 30°C'
      return
    }
  }
  
  // Backup current values in case we need to revert.
  const backup = {
    status: props.device.status,
    brightness: props.device.brightness,
    temperature: props.device.temperature
  }
  
  // Build payload
  const updatedData: any = { status: form.value.status }
  if (props.device.type === 'light') {
    updatedData.brightness = form.value.brightness
  }
  if (props.device.type === 'ac') {
    updatedData.temperature = form.value.temperature
  }
  
  try {
    await roomStore.updateDevice(props.device.id, updatedData)
    toast.success(`Updated ${props.device.name} successfully.`)
  } catch (err) {
    // Revert changes if error occurs
    form.value.status = backup.status
    if (props.device.type === 'light') {
      form.value.brightness = backup.brightness
    }
    if (props.device.type === 'ac') {
      form.value.temperature = backup.temperature
    }
    toast.error(`Failed to update ${props.device.name}. Please try again.`)
  }
}
</script>


<style lang="scss" scoped>
.control-panel {
  &__title {
    margin-bottom: 1rem;
  }
  &__form {
    display: flex;
    flex-direction: column;
  }
  &__field {
    margin-bottom: 1rem;
  }
  &__label {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  &__input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }
  &__value {
    margin-left: 0.5rem;
  }
  &__error {
    color: red;
    margin-bottom: 1rem;
  }
  &__submit {
    align-self: flex-start;
  }
}
</style>