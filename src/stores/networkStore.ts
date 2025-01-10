import { defineStore} from 'pinia'
import { ref } from 'vue'
import NetworkService from "@/services/NetworkService"
import type { ApiResponse, RequestOptions} from '@/types/api.ts'
import { Config } from '@/utils/config'

const networkService = new NetworkService(Config.baseURL)

export const useNetworkStore = defineStore('network', () => {
  const isLoading = ref(false)

  const error = ref<string | null>(null)

  async function fetchData<T>(
    url: string,
    options: RequestOptions = {},
  ) : Promise<ApiResponse<T>> {
    error.value = null

    isLoading.value = true
    try {
      const result = await networkService.request<T>(url, options)
      if (result.error) {
        error.value = result.error
      }
      return result
    } catch {
      error.value = 'An unexpected network error occurred';
      return {
        data: null,
        error: error.value
      };
    } finally {
      isLoading.value = false
    }
  }
  return { isLoading, error, fetchData}
})
