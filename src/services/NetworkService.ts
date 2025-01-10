import axios, { type AxiosInstance, type AxiosResponse, type AxiosError } from 'axios'
import type { ApiResponse, RequestOptions } from '@/types/api.ts'
import { useRouter } from 'vue-router'

export default class NetworkService {
  private axiosInstance: AxiosInstance
  private readonly router: ReturnType<typeof useRouter>

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    this.router = useRouter()
    this.setupInterceptors()
  }

  private setupInterceptors(): void {}

  private handleUnauthorized() {
    localStorage.removeItem('token')
    if (this.router) {
      this.router.push('/login')
    } else {
      console.warn('Router not initialized, falling back to window.location')
      window.location.href = '/login'
    }
  }

  async request<T>(url: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    try {
      const { method = 'GET', headers = {}, params } = options

      const response: AxiosResponse<T> = await this.axiosInstance.request({
        url,
        method,
        headers,
        params,
      })

      return {
        data: response.data,
        error: null,
      }
    } catch (error) {
      const axiosError = error as AxiosError
      return {
        data: null,
        error:
          (axiosError.response?.data as string) ||
          axiosError.message ||
          'An unexpected error occurred',
      }
    }
  }
}
