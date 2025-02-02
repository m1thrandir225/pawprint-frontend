import useAuthStore from '@/stores/auth-store'
import type { ApiRequestConfig, RefreshTokenResponse } from '@/types/services/auth'
import { Config } from '@/utils/config'
import axios, { AxiosError, type AxiosInstance } from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    _retry?: boolean
  }
}

const handleRefreshToken = async (refreshToken: string, email: string) => {
  const response = await axios.post<RefreshTokenResponse>(`${Config.apiURL}/auth/refresh`, {
    refreshToken,
    email,
  })

  const { accessToken, accessTokenExpirationTime } = response.data

  return { accessToken, accessTokenExpirationTime }
}

const createApiInstance = (): AxiosInstance => {
  const api = axios.create({
    baseURL: Config.apiURL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Request interceptor
  api.interceptors.request.use(
    (config) => {
      const authStore = useAuthStore()
      const accessToken = authStore.accessToken

      // Check if route is protected (default to true for backward compatibility)
      const isProtected = config.headers?.protected !== false

      // Only add token for protected routes
      if (isProtected && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }

      // Clean up our custom header
      if (config.headers?.protected !== undefined) {
        delete config.headers.protected
      }

      return config
    },
    (error: unknown) => {
      return Promise.reject(error)
    },
  )

  // Response interceptor
  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const authStore = useAuthStore()
      const refreshToken = authStore.refreshToken
      const userEmail = authStore.user?.email

      const originalRequest = error.config
      if (!originalRequest) {
        return Promise.reject(error)
      }

      // Only attempt refresh if it's a protected route
      const isProtected = originalRequest?.headers?.protected !== false

      if (isProtected && error.response?.status === 401 && !originalRequest?._retry) {
        originalRequest._retry = true

        try {
          if (!refreshToken || !userEmail) {
            throw new Error('No refresh token or user email available')
          }
          const { accessToken, accessTokenExpirationTime } = await handleRefreshToken(
            refreshToken,
            userEmail,
          )

          authStore.setAccessToken(accessToken, accessTokenExpirationTime)

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`
          }
          return api(originalRequest)
        } catch (refreshError) {
          authStore.logout()
          throw refreshError
        }
      }

      return Promise.reject(error)
    },
  )
  return api
}

const api = createApiInstance()

export const apiRequest = async <T>(config: ApiRequestConfig) => {
  try {
    const response = await api.request<T>({
      url: config.url,
      method: config.method,
      data: config.data,
      headers: {
        ...config.headers,
        protected: config.protected,
      },
      params: config.params,
      _retry: config._retry,
    })

    return response.data
  } catch {
    throw new Error('Failed to fetch data')
  }
}

export default api
