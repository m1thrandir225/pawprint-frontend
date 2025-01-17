import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTokenStore = defineStore('token', () => {
  const accessToken = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)

  function setTokens({
    newAccess,
    newRefresh,
  }: {
    newAccess: string | null
    newRefresh: string | null
  }) {
    accessToken.value = newAccess
    refreshToken.value = newRefresh
  }

  function clearTokens() {
    accessToken.value = null
    refreshToken.value = null
  }

  return { accessToken, refreshToken, clearTokens, setTokens }
})
