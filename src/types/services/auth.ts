import type { ShelterDTO } from '../dto/ShelterDTO'
import type { UserDTO } from '../dto/UserDTO'

export type ApiRequestConfig = {
  _retry?: boolean
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  protected?: boolean
  headers?: Record<string, string>
  params?: Record<string, string>
  data?: Record<string, unknown> | FormData
}

export type MultipartApiRequestConfig<T extends Record<string, unknown>> = {
  url: string
  method: string
  data: T
  headers?: Record<string, string>
  protected?: boolean
  params?: Record<string, string>
  retry?: boolean
}

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  accessToken: string
  refreshToken: string
  accessTokenExpirationTime: string
  refreshTokenExpirationTime: string
  shelter: ShelterDTO | null
  user: UserDTO | null
}

export type AuthTokens = {
  accessToken: string
  refreshToken: string
  accessTokenExpirationTime: string
  refreshTokenExpirationTime: string
}

export type RegisterUserRequest = {
  email: string
  password: string
  address: string
  firstName: string
  lastName: string
  homeType: 'House' | 'Flat'
  hasChildren: boolean
  hasOtherPets: boolean
}

export type RegisterUserResponse = {
  accessToken: string
  refreshToken: string
  accessTokenExpirationTime: string
  refreshTokenExpirationTime: string
  user: UserDTO
}

export type RegisterShelterRequest = {
  email: string
  name: string
  password: string
  address: string
  capacity: number
  isNoKill: boolean
  website: string | null
  phoneNumber: string
}

export type RegisterShelterResponse = {
  accessToken: string
  refreshToken: string
  accessTokenExpirationTime: string
  refreshTokenExpirationTime: string
  shelter: ShelterDTO
}

export type RefreshTokenRequest = {
  refreshToken: string
  email: string
}

export type RefreshTokenResponse = {
  accessToken: string
  accessTokenExpirationTime: string
}
