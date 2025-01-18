import type { ShelterDTO } from '@/types/dto/ShelterDTO'
import type { UserDTO } from '@/types/dto/UserDTO'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

/**
 * @name useUserStore
 * @description
 * This store is responsible for handling the user data.
 */

export const useUserStore = defineStore('user', () => {
  const user = useStorage<UserDTO | ShelterDTO | null>('user', null, localStorage, {
    serializer: {
      read: (v: string) => (v ? JSON.parse(v) : null),
      write: (v: UserDTO | ShelterDTO | null) => JSON.stringify(v),
    },
  })

  function setUser(newUser: ShelterDTO | UserDTO | null) {
    console.log('newUser', newUser)
    user.value = newUser
  }

  function getUserEmail(): string | undefined {
    return user.value?.email
  }

  function getUser(): ShelterDTO | UserDTO | null {
    return user.value
  }

  function clearUser() {
    user.value = null
  }
  return { user, setUser, clearUser, getUser, getUserEmail }
})
