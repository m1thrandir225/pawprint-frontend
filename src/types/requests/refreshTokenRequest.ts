export type RefreshTokenRequest = {
  refreshToken: string
  email: string
}

export type RefreshTokenResponse = {
  accessToken: string
  accessTokenExpirationTime: string
}
