import { useTokenStore } from '@/stores/token-store'
import { useUserStore } from '@/stores/user-store'
import type { ApiError } from '@/types/api'
import { Config } from '@/utils/config'
import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import authService from './auth-service'

const axiosInstance = axios.create({
  baseURL: Config.apiURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const handleRefreshToken = async (refreshToken: string, email: string) => {
  const tokenStore = useTokenStore()
  const tokens = await authService.refreshToken({ refreshToken: refreshToken, email: email })

  if (!tokens) {
    tokenStore.clearTokens()
    return Promise.reject(new Error('Unauthorized'))
  }

  tokenStore.setAccessToken(tokens.accessToken, tokens.accessTokenExpirationTime)
}

export async function api<T>(options: AxiosRequestConfig): Promise<T> {
  const tokenStore = useTokenStore()
  const userStore = useUserStore()
  const accessToken = tokenStore.getAccessToken()
  try {
    const response = await axiosInstance.request<T>({
      ...options,
      headers: {
        ...options.headers,
        ...(options.headers?.Authorization ? {} : { Authorization: `Bearer ${accessToken}` }),
      },
    })
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>
    if (axiosError.response?.status === 401) {
      // Handle refresh token logic here
      const userEmail = userStore.getUserEmail()
      const refreshToken = tokenStore.getRefreshToken()
      if (!refreshToken || !userEmail) {
        userStore.clearUser()
        tokenStore.clearTokens()
        return Promise.reject(new Error('Unauthorized'))
      }
      await handleRefreshToken(refreshToken, userEmail)

      return api<T>(options)
    }
    throw new Error(axiosError.response?.data?.message || 'An error occurred')
  }
}
