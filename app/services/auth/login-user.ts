import { API_URL } from "@/app/config/api"

import { AuthResponse, LoginUserRequest } from "@/app/types/auth-api"

export async function LoginUser(data: LoginUserRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/login`,
    {
      method: "POST", 
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  )

  if(!response.ok) {
    throw new Error(`Failed to Log user: ${response.status}`)
  }

  return response.json() as Promise<AuthResponse>
}