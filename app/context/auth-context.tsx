'use client'

import { createContext, useEffect, useCallback, useState} from 'react'

import type { AuthUserResponse } from '../types/auth-api'

import { GetAuthenticatedUser } from '../services/auth/get-authenticated-user'

interface IAuthContextData {
  user: AuthUserResponse | null
  loading: boolean
  profileCompleted: boolean
  SetUser: (user: AuthUserResponse | null) => void
  RefreshUser: () => Promise<void>
}

export const AuthContext = createContext<IAuthContextData | null>(null)

interface IAuthProvider {
  children: React.ReactNode
}

export function AuthProvider({ children }: IAuthProvider) {
  const [ user, setUser ] = useState<AuthUserResponse | null>(null)
  const [ loading, setLoading ] = useState(true)

  function SetUser(user: AuthUserResponse | null) {
    setUser(user)
  }

  const profileCompleted = Boolean(user?.name && user?.username)

  const RefreshUser = useCallback( async() => {
    try {
      const response = await GetAuthenticatedUser()

      setUser(response?.user ?? null)
    } catch (error) {
      console.error("Failed To Authenticated user", error)

      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void RefreshUser()
  }, [RefreshUser])

  return(
    <AuthContext.Provider
      value={{
        user,
        loading,
        profileCompleted,
        SetUser,
        RefreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}