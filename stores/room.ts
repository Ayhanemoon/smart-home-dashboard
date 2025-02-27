// stores/room.ts
import { defineStore } from 'pinia'
import { useRoomApi } from '@/composables/room'

export const useRoomStore = defineStore('room', {
  state: () => ({
    currentRoom: null as any | null,
    pending: false,
    error: null as any
  }),
  actions: {
    async fetchRoom(roomId: string | number) {
      this.pending = true
      this.error = null
      try {
        const { getRoom } = useRoomApi(roomId)
        const room = await getRoom()
        this.currentRoom = room
        return room
      } catch (err) {
        this.error = err
        console.error('Error fetching room:', err)
        throw err
      } finally {
        this.pending = false
      }
    },
    async updateDevice(deviceId: number, newStatus: string) {
      if (!this.currentRoom || !Array.isArray(this.currentRoom.devices)) {
        console.warn('No currentRoom set or devices not available')
        return null
      }
      try {
        const { updateDevice } = useRoomApi(this.currentRoom.id)
        const updatedDevice = await updateDevice(deviceId, newStatus)
        const idx = this.currentRoom.devices.findIndex((d: any) => d.id === deviceId)
        if (idx !== -1) {
          this.currentRoom.devices[idx] = { ...this.currentRoom.devices[idx], ...updatedDevice }
        }
        return updatedDevice
      } catch (err) {
        console.error('Error updating device:', err)
        return null
      }
    }
  }
})
