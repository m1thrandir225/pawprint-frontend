import axios, { type AxiosInstance, type AxiosResponse, type AxiosError } from 'axios'
import type { ApiResponse, ErrorResponse, RequestOptions } from '@/types/api.ts'
import type { AuthTokens } from '@/types/services/auth-service.types'

export default class NetworkService {
  private axiosInstance: AxiosInstance

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async request<T>(url: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    try {
      const { method = 'GET', headers = {}, params, data } = options

      if (options.isProtected) {
        const tokens = localStorage.getItem('authTokens')
        const { accessToken } = tokens ? (JSON.parse(tokens) as AuthTokens) : {}

        if (!accessToken) {
          localStorage.removeItem('authTokens')
          localStorage.removeItem('user')
          return {
            data: null,
            error: 'Unauthorized',
          }
        }
        headers.Authorization = `Bearer ${accessToken}`
      }

      const response: AxiosResponse<T> = await this.axiosInstance.request({
        url,
        method,
        headers,
        params,
        data,
      })

      return {
        data: response.data,
        error: null,
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>
      console.log(axiosError.response?.data.message)
      return {
        data: null,
        error: axiosError.response?.data.message || 'An unexpected error occurred',
      }
    }
  }
}
