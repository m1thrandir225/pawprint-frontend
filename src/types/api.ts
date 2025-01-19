export type ApiError = {
  message: string
  status: number
}

export interface ErrorResponse {
  message: string
}
export interface ApiResponse<T> {
  data: T | null
  error: string | null
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  isProtected?: boolean
  headers?: Record<string, string>
  params?: Record<string, string>
  data?: Record<string, unknown> | FormData
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface BuildRequest<TResponse> {
  url: string
  options: RequestOptions
}

export type ExtractResponseType<T> = T extends BuildRequest<infer U> ? U : never
