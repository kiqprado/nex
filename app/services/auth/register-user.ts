import { API_URL } from "@/app/config/api"

import { AuthResponse, RegisterUserRequest } from "@/app/types/auth-api"

export async function RegisterUser(data: RegisterUserRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/register`,
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
    throw new Error(`Failed to Register user ${response.status}`)
  }

  return response.json() as Promise<AuthResponse>
}