import {
  type LoginRequest,
  type LoginResponse,
  type RefreshTokenRequest,
  type RefreshTokenResponse,
  type RegisterShelterRequest,
  type RegisterShelterResponse,
  type RegisterUserRequest,
  type RegisterUserResponse,
} from '@/types/services/auth'
import { Config } from '@/utils/config'
import { api } from './api-service'

const AUTH_API_URL = Config.apiURL + '/auth'

const authService = {
  login: (input: LoginRequest) =>
    api<LoginResponse>({ url: `${AUTH_API_URL}/login`, method: 'POST', data: input }),
  refreshToken: (input: RefreshTokenRequest) =>
    api<RefreshTokenResponse>({
      url: `${AUTH_API_URL}/refresh`,
      method: 'POST',
      data: input,
    }),
  registerShelter: (input: RegisterShelterRequest) =>
    api<RegisterShelterResponse>({
      url: `${AUTH_API_URL}/register/shelter`,
      method: 'POST',
      data: input,
    }),
  registerAdopter: (input: RegisterUserRequest) =>
    api<RegisterUserResponse>({
      url: `${AUTH_API_URL}/register/adopter`,
      method: 'POST',
      data: input,
    }),
}
export default authService
