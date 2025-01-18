import { defineStore } from 'pinia'
import { useNetworkStore } from './network-store'
import { useTokenStore } from './token-store'
import { useUserStore } from './user-store'
import { computed, ref } from 'vue'
import authService from '@/services/auth-service'
import type { AuthTokens } from '@/types/services/auth-service.types'
import type { ExtractResponseType } from '@/types/api'

/**
 * @name useAuthStore
 * @description
 * This store is responsible for handling the authentication logic.
 */
const useAuthStore = defineStore('auth', () => {
  const networkStore = useNetworkStore()
  const tokenStore = useTokenStore()
  const userStore = useUserStore()

  const isLoading = computed(() => networkStore.isLoading)
  const errorMessage = computed(() => networkStore.error)

  const isAuthenticated = computed(() => {
    return !tokenStore.needsRefresh && userStore.user != null
  })

  const refreshTimer = ref<number | null>(null)

  const accessToken = computed(() => tokenStore.getAccessToken())
  const refreshToken = computed(() => tokenStore.getRefreshToken())

  async function login(email: string, password: string) {
    const request = authService.login(email, password)
    const { options, url } = request

    const { data, error } = await networkStore.fetchData<ExtractResponseType<typeof request>>(
      url,
      options,
    )

    if (error || !data) {
      return null
    }

    const {
      shelter,
      user,
      accessToken,
      refreshToken,
      accessTokenExpirationTime,
      refreshTokenExpirationTime,
    } = data

    const tokens: AuthTokens = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      accessTokenExpirationTime: accessTokenExpirationTime,
      refreshTokenExpirationTime: refreshTokenExpirationTime,
    }

    if (shelter != null) {
      tokenStore.setTokens(tokens)
      userStore.setUser(shelter)
      setRefreshTimer()
      return
    }

    if (user != null) {
      tokenStore.setTokens(tokens)
      userStore.setUser(user)
      setRefreshTimer()
      return
    }

    if (user == null && shelter == null) {
      return null
    }
  }

  function logout() {
    tokenStore.clearTokens()
    userStore.clearUser()
    if (refreshTimer.value) {
      clearTimeout(refreshTimer.value)
    }
  }

  async function refreshTokens() {
    const userEmail = userStore.getUserEmail()
    const refreshToken = tokenStore.getRefreshToken()

    if (isAuthenticated.value) {
      if (!refreshToken || !userEmail) {
        logout()
      }
    }
    const request = authService.refreshTokens(refreshToken!, userEmail!)

    const { url, options } = request

    const { data, error } = await networkStore.fetchData<ExtractResponseType<typeof request>>(
      url,
      options,
    )
    if (error || !data) {
      return false
    }

    const { accessToken, accessTokenExpirationTime } = data
    tokenStore.setAccessToken(accessToken, accessTokenExpirationTime)
    setRefreshTimer()

    return true
  }

  function setRefreshTimer() {
    const expirationTime = tokenStore.getAccessTokenExpirationTime()

    if (!expirationTime) {
      return
    }
    if (refreshTimer.value) {
      clearTimeout(refreshTimer.value)
    }

    const timeToRefresh = expirationTime - Date.now() - 10000

    refreshTimer.value = setTimeout(refreshTokens, timeToRefresh)
  }

  return {
    login,
    isLoading,
    errorMessage,
    isAuthenticated,
    accessToken,
    refreshToken,
    refreshTokens,
    logout,
  }
})

export default useAuthStore
