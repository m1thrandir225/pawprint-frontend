import type { AuthTokens } from '@/types/services/auth'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed } from 'vue'

/**
 * @name useTokenStore
 * @description
 * This store is responsible for managing the tokens used for authentication.
 */

export const useTokenStore = defineStore('token', () => {
  const tokens = useStorage<AuthTokens | null>('authTokens', null, localStorage, {
    serializer: {
      read: (v: string) => (v ? JSON.parse(v) : null),
      write: (v: AuthTokens | null) => JSON.stringify(v),
    },
  })
  const accessExpiresAt = computed(() => Date.parse(tokens.value?.accessTokenExpirationTime || ''))
  const refreshExpiresAt = computed(() =>
    Date.parse(tokens.value?.refreshTokenExpirationTime || ''),
  )
  const needsRefresh = computed(
    () => Date.now() > refreshExpiresAt.value && Date.now() < accessExpiresAt.value,
  )
  function setTokens(newTokens: AuthTokens) {
    tokens.value = newTokens
  }
  function setAccessToken(accessToken: string, accessTokenExpirationTime: string) {
    if (!tokens.value?.refreshToken || !tokens.value?.refreshTokenExpirationTime) return
    tokens.value = {
      accessToken,
      accessTokenExpirationTime,
      refreshToken: tokens.value.refreshToken,
      refreshTokenExpirationTime: tokens.value.refreshTokenExpirationTime,
    }
  }
  function getAccessToken(): string | undefined {
    return tokens.value?.accessToken
  }
  function getRefreshToken(): string | undefined {
    return tokens.value?.refreshToken
  }
  function getAccessTokenExpirationTime(): number | undefined {
    return accessExpiresAt.value
  }
  function getRefreshTokenExpirationTime(): number | undefined {
    return refreshExpiresAt.value
  }
  function clearTokens() {
    tokens.value = null
  }

  return {
    tokens,
    accessExpiresAt,
    refreshExpiresAt,
    clearTokens,
    setTokens,
    getAccessToken,
    getRefreshToken,
    needsRefresh,
    setAccessToken,
    getAccessTokenExpirationTime,
    getRefreshTokenExpirationTime,
  }
})
