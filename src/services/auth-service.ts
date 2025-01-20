import {
  type LoginRequest,
  type LoginResponse,
  type RegisterShelterRequest,
  type RegisterShelterResponse,
  type RegisterUserRequest,
  type RegisterUserResponse,
} from '@/types/services/auth'
import { apiRequest } from './api-service'
import { Config } from '@/utils/config'

const AUTH_API_URL = Config.apiURL + '/auth'

const authService = {
  login: (input: LoginRequest) =>
    apiRequest<LoginResponse>({
      _retry: false,
      data: input,
      url: `${AUTH_API_URL}/login`,
      method: 'POST',
    }),
  registerShelter: (input: RegisterShelterRequest) =>
    apiRequest<RegisterShelterResponse>({
      _retry: false,
      data: input,
      url: `${AUTH_API_URL}/register/shelter`,
      method: 'POST',
    }),
  registerAdopter: (input: RegisterUserRequest) =>
    apiRequest<RegisterUserResponse>({
      _retry: false,
      data: input,
      url: `${AUTH_API_URL}/register/user`,
      method: 'POST',
    }),
}
export default authService
