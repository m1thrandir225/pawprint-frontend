import { defineStore } from 'pinia'
import { useNetworkStore } from './network-store'
import { useTokenStore } from './token-store'
import { useUserStore } from './user-store'
import { computed, ref } from 'vue'
import authService from '@/services/auth-service'
import { type LoginResponse, type AuthTokens } from '@/types/requests/loginRequests'
import type { RefreshTokenResponse } from '@/types/requests/refreshTokenRequest'

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

  async function login(email: string, password: string) {
    const { options, url } = authService.login(email, password)

    const { data, error } = await networkStore.fetchData<LoginResponse>(url, options)

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

    if (!userEmail || !refreshToken) {
      return
    }
    const request = authService.refreshTokens(refreshToken, userEmail)

    const { data, error } = await networkStore.fetchData<RefreshTokenResponse>(
      request.url,
      request.options,
    )
    if (error || !data) {
      return
    }

    const { accessToken, accessTokenExpirationTime } = data
    tokenStore.setAccessToken(accessToken, accessTokenExpirationTime)
    setRefreshTimer()
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

  return { login, isLoading, errorMessage, isAuthenticated, refreshTokens, logout }
})

export default useAuthStore
