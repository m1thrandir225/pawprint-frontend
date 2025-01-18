import type { ShelterDTO } from '../dto/ShelterDTO'
import type { UserDTO } from '../dto/UserDTO'

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

export type RegisterUserResponse = {
  accessToken: string
  refreshToken: string
  accessTokenExpirationTime: string
  refreshTokenExpirationTime: string
  user: UserDTO
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
