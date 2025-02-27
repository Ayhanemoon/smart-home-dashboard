import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useRoomApi } from '@/composables/room'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const paramId = to.params.id
  const roomId = Array.isArray(paramId) ? paramId[0] : (paramId as string)

  if (!roomId) {
    return navigateTo('/404')
  }
  
  const { getRoom } = useRoomApi(roomId)
  try {
    const room = await getRoom()
    
    // Check if room is a non-null object and has an id property
    if (!room || typeof room !== 'object' || !(room as any).id) {
      return navigateTo('/404')
    }
  } catch (error) {
    return navigateTo('/404')
  }
})
