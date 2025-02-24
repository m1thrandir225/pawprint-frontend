import { defineStore } from 'pinia'
import { computed } from 'vue'
import type { AuthTokens, LoginResponse } from '@/types/services/auth'
import { useStorage } from '@vueuse/core'
import type { UserDTO } from '@/types/dto/UserDTO'
import type { ShelterDTO } from '@/types/dto/ShelterDTO'

/**
 * @name useAuthStore
 * @description
 * This store is responsible for handling the authentication logic.
 */
const useAuthStore = defineStore('auth', () => {
  const user = useStorage<UserDTO | ShelterDTO | null>('user', null, localStorage, {
    serializer: {
      read: (v: string) => (v ? JSON.parse(v) : null),
      write: (v: UserDTO | ShelterDTO | null) => JSON.stringify(v),
    },
  })

  const userType = computed(() => {
    if (!user.value) return null

    if (user.value.hasOwnProperty('isNoKill')) return 'shelter'
    else return 'user'
  })

  const userIsAdmin = computed(() => {
    if (!user.value) return false
    if (userType.value !== 'user') return false
    return (user.value as UserDTO).isAdmin
  })

  const tokens = useStorage<AuthTokens | null>('authTokens', null, localStorage, {
    serializer: {
      read: (v: string) => (v ? JSON.parse(v) : null),
      write: (v: AuthTokens | null) => JSON.stringify(v),
    },
  })

  const accessToken = computed(() => tokens.value?.accessToken)
  const refreshToken = computed(() => tokens.value?.refreshToken)

  const isAuthenticated = computed(() => !!user.value && !!tokens.value)

  function setTokens(newTokens: AuthTokens) {
    tokens.value = newTokens
  }

  function setAccessToken(newToken: string, newExpirationTime: string) {
    if (!tokens.value?.refreshToken || !tokens.value?.refreshTokenExpirationTime) return
    console.log(newToken, newExpirationTime)
    tokens.value = {
      accessToken: newToken,
      accessTokenExpirationTime: newExpirationTime,
      refreshToken: tokens.value.refreshToken,
      refreshTokenExpirationTime: tokens.value.refreshTokenExpirationTime,
    }
  }

  function setUser(newUser: ShelterDTO | UserDTO | null) {
    user.value = newUser
  }

  function logout() {
    tokens.value = null
    user.value = null
  }

  function login(response: LoginResponse) {
    const {
      accessToken,
      accessTokenExpirationTime,
      refreshToken,
      refreshTokenExpirationTime,
      user,
      shelter,
    } = response

    setTokens({ accessToken, accessTokenExpirationTime, refreshToken, refreshTokenExpirationTime })
    if (user) {
      setUser(user)
      return
    }

    if (shelter) {
      setUser(shelter)
      return
    }

    throw new Error('No user or shelter in login response')
  }

  return {
    user,
    userType,
    userIsAdmin,
    accessToken,
    refreshToken,
    isAuthenticated,
    setUser,
    setTokens,
    setAccessToken,
    login,
    logout,
  }
})

export default useAuthStore
