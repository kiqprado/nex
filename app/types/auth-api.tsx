export interface AuthUserResponse {
  id: string
  name: string | null
  username: string | null
  email: string | null
  phone: string | null
  avatarUrl: string | null
}

export interface AuthResponse {
  user: AuthUserResponse
}

export interface RegisterUserRequest {
  email?: string
  phone?: string
  password: string
}

export interface LoginUserRequest {
  identifier: string
  password: string
}

export interface CompleteUserProfile {
  name: string
  username: string
}