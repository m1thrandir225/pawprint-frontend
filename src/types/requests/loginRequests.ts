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

export type LoginUserResponse = {
  accessToken: string
  refreshToken: string
  accessTokenExpirationTime: string
  refreshTokenExpirationTime: string
  user: UserDTO
}

export type LoginShelterResponse = {
  accessToken: string
  refreshToken: string
  accessTokenExpirationTime: string
  refreshTokenExpirationTime: string
  shelter: ShelterDTO
}
