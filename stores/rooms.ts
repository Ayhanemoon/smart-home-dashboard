// stores/rooms.ts
import { defineStore } from 'pinia'
import { useRoomsApi } from '@/composables/rooms'

export const useRoomsStore = defineStore('rooms', {
  state: () => ({
    roomList: [] as any[],
    currentRoom: null as any | null
  }),
  actions: {
    async fetchRooms() {
      console.log('fetching rooms');
      
      const { getRooms } = useRoomsApi()
      const rooms = await getRooms()
      this.roomList = rooms as any[]
    },
    setCurrentRoom(room: any) {
      this.currentRoom = room
    },
    updateRoomDevice(roomId: string | number, deviceId: number, updatedData: any) {
      const roomIndex = this.roomList.findIndex(room => room.id === roomId)
      if (roomIndex !== -1) {
        const deviceIndex = this.roomList[roomIndex].devices.findIndex((d: any) => d.id === deviceId)
        if (deviceIndex !== -1) {
          this.roomList[roomIndex].devices[deviceIndex] = {
            ...this.roomList[roomIndex].devices[deviceIndex],
            ...updatedData
          }
        }
      }
    }
  }
})
