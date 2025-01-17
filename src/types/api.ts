export interface ApiResponse<T> {
  data: T | null
  error: string | null
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  params?: Record<string, string>
  data?: Record<string, unknown> | FormData
}

export interface BuildRequest {
  url: string
  options: RequestOptions
}
