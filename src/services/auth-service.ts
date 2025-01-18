import type { BuildRequest } from '@/types/api'

const login = (email: string, password: string): BuildRequest => {
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

const registerShelter = (): BuildRequest => {
  return {
    url: '/auth/register/shelter',
    options: {
      method: 'POST',
    },
  }
}
const registerAdopter = (): BuildRequest => {
  return {
    url: '/auth/register/adopter',
    options: {
      method: 'POST',
    },
  }
}

const refreshTokens = (refreshToken: string, email: string): BuildRequest => {
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
