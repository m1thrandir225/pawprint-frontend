import { defineStore } from 'pinia'
import { useTokenStore } from './token-store'
import { useUserStore } from './user-store'
import { computed, ref } from 'vue'
import type { AuthTokens, LoginResponse } from '@/types/services/auth'
import authService from '@/services/auth-service'

/**
 * @name useAuthStore
 * @description
 * This store is responsible for handling the authentication logic.
 */
const useAuthStore = defineStore('auth', () => {
  const tokenStore = useTokenStore()
  const userStore = useUserStore()

  const refreshTimer = ref<number | null>(null)

  const isAuthenticated = computed(() => {
    return !tokenStore.needsRefresh && userStore.user != null
  })

  const accessToken = computed(() => tokenStore.getAccessToken())
  const refreshToken = computed(() => tokenStore.getRefreshToken())

  async function login(response: LoginResponse) {
    const {
      shelter,
      user,
      accessToken,
      refreshToken,
      accessTokenExpirationTime,
      refreshTokenExpirationTime,
    } = response

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
    const request = await authService.refreshToken({
      email: userEmail!,
      refreshToken: refreshToken!,
    })

    if (!request) {
      logout()
    }

    const { accessToken, accessTokenExpirationTime } = request

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

  return {
    login,
    isAuthenticated,
    accessToken,
    refreshToken,
    refreshTokens,
    logout,
  }
})

export default useAuthStore
