import { API_URL } from "@/app/config/api"

import { AuthResponse } from "@/app/types/auth-api"

export async function GetAuthenticatedUser(): Promise<AuthResponse | null> {
  const response = await fetch(`${API_URL}/auth/me`, 
    {credentials: "include"}
  )

  if(response.status === 401) {
    return null
  }

  if(!response.ok) {
    throw new Error(`Failed to Authenticated user: ${response.status}`)
  }

  return response.json() as Promise<AuthResponse>
} 