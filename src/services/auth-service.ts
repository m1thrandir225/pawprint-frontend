import type { BuildRequest } from '@/types/api'
import type {
  LoginResponse,
  RegisterShelterResponse,
  RegisterUserResponse,
  RefreshTokenResponse,
} from '@/types/services/auth-service.types'

const login = (email: string, password: string): BuildRequest<LoginResponse> => {
  return {
    url: '/auth/login',
    options: {
      method: 'POST',
      data: {
        email,
        password,
      },
    },
  }
}

const registerShelter = (): BuildRequest<RegisterShelterResponse> => {
  return {
    url: '/auth/register/shelter',
    options: {
      method: 'POST',
    },
  }
}
const registerAdopter = (): BuildRequest<RegisterUserResponse> => {
  return {
    url: '/auth/register/adopter',
    options: {
      method: 'POST',
    },
  }
}

const refreshTokens = (refreshToken: string, email: string): BuildRequest<RefreshTokenResponse> => {
  return {
    url: '/auth/refresh',
    options: {
      method: 'POST',
      data: {
        refreshToken,
        email,
      },
    },
  }
}

export default {
  login,
  registerShelter,
  registerAdopter,
  refreshTokens,
}
